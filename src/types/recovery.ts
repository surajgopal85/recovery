export type RecoveryProfile = {
  struggle?: string;
  strugglePatterns: string[];
  desiredOutcome?: string;
  soberDate?: string;
};

export type Inventory = {
  category?: string;
  description?: string;
  controllablePart?: string;
  affectedPeople: string[];
  honestyFear?: string;
};

export type ActionStatus = "proposed" | "committed" | "completed" | "revisited";

export type RecoveryAction = {
  id: string;
  title: string;
  detail?: string;
  dueAt?: string;
  status: ActionStatus;
};
