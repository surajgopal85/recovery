import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { FlowScreen } from "@/components/FlowScreen";
import { PrimaryButton, SecondaryButton } from "@/components/Controls";
import { useRecovery } from "@/state/RecoveryContext";

export default function NextAction() {
  const router = useRouter();
  const { profile, inventory, currentAction } = useRecovery();
  if (!currentAction) return null;

  const carrying = inventory.category?.toLowerCase() ?? "something difficult";
  const fear = inventory.honestyFear?.toLowerCase() ?? "of what comes next";
  const outcome = profile.desiredOutcome?.toLowerCase() ?? "your life back";
  const reflection = [
    `You’re carrying ${carrying}, and you’re afraid ${fear}.`,
    `You said you want ${outcome}.`,
    "You do not need to solve everything today.",
  ].join(" ");

  return (
    <FlowScreen
      title="Your next right action"
      body={reflection}
      footer={
        <>
          <PrimaryButton
            label="I'LL DO THIS"
            onPress={() => router.push("/commitment")}
          />
          <SecondaryButton
            label="HELP ME MAKE THIS SMALLER"
            onPress={() => router.push("/smaller")}
          />
        </>
      }
    >
      <View style={styles.card}>
        <Text style={styles.label}>YOUR ACTION</Text>
        <Text style={styles.title}>{currentAction.title}</Text>
        {currentAction.detail ? (
          <Text style={styles.detail}>{currentAction.detail}</Text>
        ) : null}
      </View>
    </FlowScreen>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: "#E1EAE3", borderRadius: 18, padding: 22 },
  label: {
    color: "#607167",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  title: {
    color: "#203C30",
    fontSize: 23,
    fontWeight: "600",
    lineHeight: 30,
    marginTop: 12,
  },
  detail: { color: "#53635A", fontSize: 16, lineHeight: 24, marginTop: 12 },
});
