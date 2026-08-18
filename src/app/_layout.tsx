import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { RecoveryProvider } from "@/state/RecoveryContext";

export default function RootLayout() {
  return (
    <RecoveryProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
    </RecoveryProvider>
  );
}
