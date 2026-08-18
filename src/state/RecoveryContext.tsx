import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Inventory, RecoveryAction, RecoveryProfile } from "@/types/recovery";

const emptyProfile: RecoveryProfile = { strugglePatterns: [] };
const emptyInventory: Inventory = { affectedPeople: [] };

type RecoveryContextValue = {
  profile: RecoveryProfile;
  inventory: Inventory;
  currentAction?: RecoveryAction;
  setProfile: (patch: Partial<RecoveryProfile>) => void;
  setInventory: (patch: Partial<Inventory>) => void;
  setCurrentAction: (action?: RecoveryAction) => void;
  resetInventory: () => void;
};

const RecoveryContext = createContext<RecoveryContextValue | null>(null);

export function RecoveryProvider({ children }: PropsWithChildren) {
  const [profile, updateProfile] = useState(emptyProfile);
  const [inventory, updateInventory] = useState(emptyInventory);
  const [currentAction, setCurrentAction] = useState<RecoveryAction>();
  const value = useMemo(
    () => ({
      profile,
      inventory,
      currentAction,
      setProfile: (patch: Partial<RecoveryProfile>) =>
        updateProfile((value) => ({ ...value, ...patch })),
      setInventory: (patch: Partial<Inventory>) =>
        updateInventory((value) => ({ ...value, ...patch })),
      setCurrentAction,
      resetInventory: () => {
        updateInventory(emptyInventory);
        setCurrentAction(undefined);
      },
    }),
    [profile, inventory, currentAction],
  );
  return (
    <RecoveryContext.Provider value={value}>
      {children}
    </RecoveryContext.Provider>
  );
}

export function useRecovery() {
  const context = useContext(RecoveryContext);
  if (!context)
    throw new Error("useRecovery must be used inside RecoveryProvider");
  return context;
}
