import type { Inventory, RecoveryAction, RecoveryProfile } from "../types/recovery";

export type RecoveryState = {
  profile: RecoveryProfile;
  inventory: Inventory;
  currentAction?: RecoveryAction;
};

export const STORAGE_KEY = "gentle-path.recovery.v1";
export const emptyState = (): RecoveryState => ({
  profile: { strugglePatterns: [] },
  inventory: { affectedPeople: [] },
});

const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const strings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");
const optionalStrings = (value: Record<string, unknown>, keys: string[]) =>
  keys.every((key) => value[key] === undefined || typeof value[key] === "string");
const isSoberDate = (value: unknown) =>
  value === undefined ||
  (typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)));

// Reject unknown versions and malformed data without overwriting the original.
export function decodeState(raw: string | null): RecoveryState {
  if (raw === null) return emptyState();
  const saved: unknown = JSON.parse(raw);
  if (!record(saved) || saved.version !== 1 || !record(saved.state))
    throw new Error("Unsupported recovery data");
  const { profile, inventory, currentAction } = saved.state;
  if (
    !record(profile) || !strings(profile.strugglePatterns) ||
    !optionalStrings(profile, ["struggle", "desiredOutcome"]) ||
    !isSoberDate(profile.soberDate) ||
    !record(inventory) || !strings(inventory.affectedPeople) ||
    !optionalStrings(inventory, ["category", "description", "controllablePart", "honestyFear"])
  ) throw new Error("Invalid recovery data");
  if (currentAction !== undefined && (
    !record(currentAction) || typeof currentAction.id !== "string" ||
    typeof currentAction.title !== "string" || !currentAction.title.trim() ||
    !["proposed", "committed", "completed", "revisited"].includes(String(currentAction.status)) ||
    !optionalStrings(currentAction, ["detail", "dueAt"]) ||
    (["committed", "completed"].includes(String(currentAction.status)) &&
      (typeof currentAction.dueAt !== "string" || !currentAction.dueAt.trim()))
  )) throw new Error("Invalid recovery action");
  return { profile, inventory, currentAction } as RecoveryState;
}

export const encodeState = (state: RecoveryState) => JSON.stringify({ version: 1, state });

export function resumeRoute({ profile, inventory, currentAction }: RecoveryState) {
  if (currentAction?.status === "committed" || currentAction?.status === "completed") return "/home";
  if (currentAction?.status === "revisited") return "/honest-action";
  if (currentAction) return "/next-action";
  if (!profile.struggle) return "/";
  if (!profile.strugglePatterns.length) return "/patterns";
  if (!profile.desiredOutcome) return "/outcome";
  if (!inventory.category) return "/carrying";
  if (!inventory.controllablePart) return "/control";
  if (!inventory.affectedPeople.length) return "/impact";
  if (!inventory.honestyFear) return "/fear";
  return "/honest-action";
}

// A failed write must not poison subsequent saves. Queue snapshots in order.
export function createStateWriter(write: (value: string) => Promise<void>) {
  let pending = Promise.resolve();
  return (state: RecoveryState) => {
    const snapshot = encodeState(state);
    const result = pending.then(() => write(snapshot));
    pending = result.catch(() => {});
    return result;
  };
}
