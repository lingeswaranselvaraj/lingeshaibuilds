import { View, Text } from "react-native";
import TTSButton from "./TTSButton";
import type { Phrase } from "../data/lessons";

export default function PhraseCard({ phrase }: { phrase: Phrase }) {
  return (
    <View className="bg-[#2d1457] rounded-2xl p-4 mb-3">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 mr-3">
          <Text className="text-white text-2xl font-bold mb-0.5">{phrase.cantonese}</Text>
          <Text className="text-[#f5a623] text-sm font-medium mb-1">{phrase.jyutping}</Text>
          <Text className="text-[#d4aaec] text-sm">{phrase.english}</Text>
          {phrase.literal && (
            <Text className="text-[#9c7dc0] text-xs mt-1">Lit: "{phrase.literal}"</Text>
          )}
        </View>
        <TTSButton text={phrase.cantonese} language="zh-HK" size="sm" />
      </View>
      {phrase.usage && (
        <View className="mt-3 bg-[#1a0a2e] rounded-xl px-3 py-2">
          <Text className="text-[#9c7dc0] text-xs">💡 {phrase.usage}</Text>
        </View>
      )}
    </View>
  );
}
