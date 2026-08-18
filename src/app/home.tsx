import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton, SecondaryButton } from "@/components/Controls";
import { useRecovery } from "@/state/RecoveryContext";
export default function Home() {
  const router = useRouter();
  const { currentAction, setCurrentAction, resetInventory } = useRecovery();
  const start = () => {
    resetInventory();
    router.push("/carrying");
  };
  const complete = currentAction
    ? { ...currentAction, status: "completed" as const }
    : undefined;
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <Text style={styles.today}>Today</Text>
        <Pressable onPress={start} style={styles.prompt}>
          <Text style={styles.promptTitle}>What are you carrying?</Text>
          <Text style={styles.promptAction}>START AN INVENTORY →</Text>
        </Pressable>
        {currentAction ? (
          <View style={styles.action}>
            <Text style={styles.label}>YOUR NEXT ACTION</Text>
            <Text style={styles.actionTitle}>{currentAction.title}</Text>
            {currentAction.detail ? (
              <Text style={styles.detail}>{currentAction.detail}</Text>
            ) : null}
            <Text style={styles.due}>
              {currentAction.status === "completed"
                ? "Completed"
                : `Committed: ${currentAction.dueAt}`}
            </Text>
            {currentAction.status !== "completed" ? (
              <>
                <PrimaryButton
                  label="MARK COMPLETE"
                  onPress={() => complete && setCurrentAction(complete)}
                />
                <SecondaryButton
                  label="I NEED TO REVISIT THIS"
                  onPress={() => {
                    if (currentAction)
                      setCurrentAction({
                        ...currentAction,
                        status: "revisited",
                      });
                    router.push("/honest-action");
                  }}
                />
              </>
            ) : (
              <Text style={styles.done}>
                You followed through on one honest action.
              </Text>
            )}
          </View>
        ) : null}
        <View style={styles.recovery}>
          <Text style={styles.label}>RECOVERY</Text>
          <Text style={styles.recoveryText}>One day at a time.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4F1EA" },
  page: { flex: 1, padding: 24 },
  today: {
    color: "#20352D",
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 26,
  },
  prompt: { backgroundColor: "#2D5A49", borderRadius: 18, padding: 22 },
  promptTitle: { color: "#FFFFFF", fontSize: 23, fontWeight: "600" },
  promptAction: {
    color: "#DCE9E1",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 22,
  },
  action: {
    backgroundColor: "#FBFAF6",
    borderColor: "#DAD9CF",
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 18,
    padding: 20,
  },
  label: {
    color: "#68756D",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  actionTitle: {
    color: "#243D32",
    fontSize: 21,
    fontWeight: "600",
    lineHeight: 28,
    marginTop: 10,
  },
  detail: { color: "#59665F", fontSize: 15, lineHeight: 22, marginTop: 8 },
  due: {
    color: "#52675C",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 18,
    marginTop: 12,
  },
  done: { color: "#2D5A49", fontSize: 15, lineHeight: 22 },
  recovery: { marginTop: "auto", paddingTop: 22 },
  recoveryText: { color: "#3F5047", fontSize: 17, marginTop: 8 },
});
