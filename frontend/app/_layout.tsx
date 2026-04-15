import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="lesson/[id]" options={{ headerShown: true, title: "Lesson", headerBackTitle: "Back" }} />
        <Stack.Screen name="practice/[id]" options={{ headerShown: true, title: "Speaking Practice", headerBackTitle: "Back" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
