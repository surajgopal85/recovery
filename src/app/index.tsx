import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { FlowScreen } from "@/components/FlowScreen";
import { PrimaryButton } from "@/components/Controls";

export default function Arrival() {
  const router = useRouter();
  return (
    <FlowScreen
      title="You are not alone."
      footer={
        <PrimaryButton label="START" onPress={() => router.push("/struggle")} />
      }
    >
      <View style={styles.mark}>
        <Text style={styles.path}>GENTLE PATH</Text>
      </View>
      <Text style={styles.promise}>
        A life you don&apos;t need to escape from.
      </Text>
    </FlowScreen>
  );
}
const styles = StyleSheet.create({
  mark: {
    borderColor: "#9EAA9F",
    borderRadius: 40,
    borderWidth: 1,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  path: {
    color: "#52675C",
    fontSize: 9,
    fontWeight: "700",
    textAlign: "center",
  },
  promise: {
    color: "#55645C",
    fontSize: 22,
    lineHeight: 31,
    marginTop: 32,
    maxWidth: 280,
  },
});
