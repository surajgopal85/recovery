import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "@/components/Controls";

export default function Arrival() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.upper}>
          {/* Path visual element */}
          <View style={styles.pathContainer}>
            <View style={styles.pathDot} />
            <View style={styles.pathLine} />
          </View>

          {/* Wordmark */}
          <Text style={styles.wordmark}>GENTLE PATH</Text>
        </View>

        <View style={styles.lower}>
          <Text style={styles.title}>You are not alone.</Text>
          <Text style={styles.promise}>
            A life you don&apos;t need to escape from.
          </Text>
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            label="START"
            onPress={() => router.push("/struggle")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4F1EA" },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  upper: {
    alignItems: "center",
    paddingTop: 40,
  },
  pathContainer: {
    alignItems: "center",
    height: 120,
    marginBottom: 24,
  },
  pathDot: {
    backgroundColor: "#2D5A49",
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  pathLine: {
    backgroundColor: "#C8D0C9",
    flex: 1,
    marginTop: 4,
    width: 1.5,
  },
  wordmark: {
    color: "#52675C",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 4,
    textAlign: "center",
  },
  lower: {
    marginTop: 48,
    paddingHorizontal: 4,
  },
  title: {
    color: "#20352D",
    fontSize: 38,
    fontWeight: "600",
    letterSpacing: -1,
    lineHeight: 46,
  },
  promise: {
    color: "#55645C",
    fontSize: 20,
    lineHeight: 30,
    marginTop: 20,
    maxWidth: 280,
  },
  footer: {
    marginTop: "auto",
    paddingTop: 28,
  },
});
