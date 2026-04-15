import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const TONES = [
  { number: "1", name: "High level", example: "詩 (si1)", color: "#4f2d8a" },
  { number: "2", name: "High rising", example: "史 (si2)", color: "#7c4dba" },
  { number: "3", name: "Mid level", example: "試 (si3)", color: "#9c6dd8" },
  { number: "4", name: "Low falling", example: "時 (si4)", color: "#b88ee0" },
  { number: "5", name: "Low rising", example: "市 (si5)", color: "#d4aaec" },
  { number: "6", name: "Low level", example: "事 (si6)", color: "#e8ccf8" },
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#1a0a2e]">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="flex-1 px-6">
        <View className="items-center mt-10 mb-8">
          <Text className="text-5xl mb-2">🐉</Text>
          <Text className="text-white text-4xl font-bold tracking-wide">LoHaa</Text>
          <Text className="text-[#d4aaec] text-base mt-1">Learn Cantonese · 學廣東話</Text>
        </View>

        <View className="bg-[#2d1457] rounded-2xl p-5 mb-6">
          <Text className="text-white text-lg font-semibold mb-2">What is Cantonese?</Text>
          <Text className="text-[#d4aaec] text-sm leading-relaxed">
            Cantonese (廣東話) is spoken by ~80 million people in Hong Kong, Guangdong, and diaspora
            communities worldwide. It has 6 tones — the pitch of a word changes its meaning entirely.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-white text-lg font-semibold mb-3">The 6 Tones</Text>
          {TONES.map((tone) => (
            <View key={tone.number} className="flex-row items-center mb-2 bg-[#2d1457] rounded-xl p-3">
              <View className="w-8 h-8 rounded-full items-center justify-center mr-3" style={{ backgroundColor: tone.color }}>
                <Text className="text-white font-bold text-sm">{tone.number}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-sm font-medium">{tone.name}</Text>
                <Text className="text-[#d4aaec] text-xs">{tone.example}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className="bg-[#2d1457] rounded-2xl p-5 mb-8">
          <Text className="text-white text-lg font-semibold mb-2">What you'll learn</Text>
          {["Greetings & introductions", "Numbers & counting", "Daily phrases", "Tone pronunciation", "AI-guided conversation practice"].map((item, i) => (
            <Text key={i} className="text-[#d4aaec] text-sm mb-1">✓  {item}</Text>
          ))}
        </View>

        <TouchableOpacity
          className="bg-[#f5a623] rounded-2xl py-4 items-center"
          onPress={() => router.replace("/(tabs)/lessons")}
        >
          <Text className="text-[#1a0a2e] text-lg font-bold">Start Learning 開始!</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
