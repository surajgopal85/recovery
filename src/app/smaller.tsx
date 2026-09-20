import { Redirect, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { FlowScreen } from "@/components/FlowScreen";
import { PrimaryButton } from "@/components/Controls";
import { useRecovery } from "@/state/RecoveryContext";
import { smallerVersion } from "@/utils/actionSuggestions";
export default function Smaller() {
  const router = useRouter();
  const { currentAction, setCurrentAction } = useRecovery();
  const smaller = currentAction ? smallerVersion(currentAction) : undefined;
  if (!smaller) return <Redirect href="/honest-action" />;
  return (
    <FlowScreen
      title="Help me make this smaller"
      body="Starting counts. Make the action small enough to do, but keep it honest."
      footer={
        <PrimaryButton
          label="I CAN DO THIS"
          onPress={() => {
            setCurrentAction(smaller);
            router.push("/commitment");
          }}
        />
      }
    >
      <Text style={styles.instead}>INSTEAD OF SOLVING EVERYTHING</Text>
      <View style={styles.card}>
        <Text style={styles.title}>{smaller.title}</Text>
        <Text style={styles.detail}>{smaller.detail}</Text>
      </View>
    </FlowScreen>
  );
}
const styles = StyleSheet.create({
  instead: {
    color: "#6C766F",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: 12,
  },
  card: { backgroundColor: "#E1EAE3", borderRadius: 18, padding: 22 },
  title: { color: "#203C30", fontSize: 22, fontWeight: "600", lineHeight: 29 },
  detail: { color: "#4D5F55", fontSize: 17, lineHeight: 25, marginTop: 14 },
});
