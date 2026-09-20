import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "@/components/Controls";
import { Inventory, RecoveryAction, RecoveryProfile } from "@/types/recovery";
import { createStateWriter, decodeState, emptyState, RecoveryState, STORAGE_KEY } from "./persistence";

type RecoveryContextValue = RecoveryState & {
  setProfile: (patch: Partial<RecoveryProfile>) => void;
  setInventory: (patch: Partial<Inventory>) => void;
  setCurrentAction: (action?: RecoveryAction) => void;
  resetInventory: () => void;
};
const RecoveryContext = createContext<RecoveryContextValue | null>(null);

export function RecoveryProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(emptyState);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const writer = useMemo(() => createStateWriter((value) => AsyncStorage.setItem(STORAGE_KEY, value)), []);
  const revision = useRef(0);
  const hydratedState = useRef<RecoveryState | null>(null);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      const restored = decodeState(raw);
      if (active) {
        hydratedState.current = restored;
        setState(restored);
        setLoaded(true);
      }
    }).catch(() => { if (active) setLoadError(true); });
    return () => { active = false; };
  }, [attempt]);

  useEffect(() => {
    if (!loaded || state === hydratedState.current) return;
    const current = ++revision.current;
    writer(state).then(
      () => { if (current === revision.current) setSaveError(false); },
      () => { if (current === revision.current) setSaveError(true); },
    );
  }, [state, loaded, writer]);

  const value = useMemo<RecoveryContextValue>(() => ({
    ...state,
    setProfile: (patch) => setState((previous) => ({ ...previous, profile: { ...previous.profile, ...patch } })),
    setInventory: (patch) => setState((previous) => ({ ...previous, inventory: { ...previous.inventory, ...patch } })),
    setCurrentAction: (currentAction) => setState((previous) => ({ ...previous, currentAction })),
    resetInventory: () => setState((previous) => ({ profile: previous.profile, inventory: { affectedPeople: [] } })),
  }), [state]);

  if (!loaded) return (
    <View style={styles.loading}>
      {loadError ? <>
        <Text style={styles.message}>We couldn’t load your saved progress. Your saved data has not been changed.</Text>
        <PrimaryButton label="TRY AGAIN" onPress={() => { setLoadError(false); setAttempt((value) => value + 1); }} />
      </> : <ActivityIndicator accessibilityLabel="Loading saved progress" color="#2D5A49" />}
    </View>
  );
  return (
    <RecoveryContext.Provider value={value}>
      <View style={styles.container}>
        {children}
        {saveError ? <View style={styles.notice} accessibilityRole="alert">
          <Text style={styles.message}>Your latest progress hasn’t been saved. Keep the app open and try again.</Text>
          <PrimaryButton label="TRY SAVING AGAIN" onPress={() => setState((previous) => ({ ...previous }))} />
        </View> : null}
      </View>
    </RecoveryContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#F4F1EA" },
  notice: { padding: 24, backgroundColor: "#F4F1EA" },
  message: { color: "#20352D", fontSize: 16, marginBottom: 16 },
});
export function useRecovery() {
  const context = useContext(RecoveryContext);
  if (!context) throw new Error("useRecovery must be used inside RecoveryProvider");
  return context;
}
