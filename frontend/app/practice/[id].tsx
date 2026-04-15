import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LESSONS } from "../../data/lessons";
import { useState } from "react";
import TTSButton from "../../components/TTSButton";
import RecordButton from "../../components/RecordButton";
import { useProgressStore } from "../../store/progressStore";

export default function PracticeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = LESSONS.find((l) => l.id === id);
  const { incrementPractice } = useProgressStore();
  const [current, setCurrent] = useState(0);
  const [recorded, setRecorded] = useState(false);

  if (!lesson) return (
    <View className="flex-1 bg-[#1a0a2e] items-center justify-center">
      <Text className="text-white">Lesson not found.</Text>
    </View>
  );

  const phrase = lesson.phrases[current];

  const handleNext = () => {
    if (current < lesson.phrases.length - 1) {
      setCurrent((c) => c + 1);
      setRecorded(false);
    } else {
      incrementPractice();
      Alert.alert("Great job! 🎉", "You've practised all phrases in this lesson. Keep it up!", [{ text: "OK" }]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1a0a2e]" edges={["bottom"]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 }}>
        <View className="mt-4 mb-6">
          <Text className="text-[#9c7dc0] text-sm">
            Phrase {current + 1} of {lesson.phrases.length}
          </Text>
          <View className="h-1.5 bg-[#2d1457] rounded-full mt-2 overflow-hidden">
            <View
              className="h-1.5 bg-[#f5a623] rounded-full"
              style={{ width: `${((current + 1) / lesson.phrases.length) * 100}%` }}
            />
          </View>
        </View>

        <View className="bg-[#2d1457] rounded-3xl p-6 mb-6 items-center">
          <Text className="text-white text-4xl font-bold mb-2">{phrase.cantonese}</Text>
          <Text className="text-[#f5a623] text-lg mb-1">{phrase.jyutping}</Text>
          <Text className="text-[#d4aaec] text-base">{phrase.english}</Text>
          {phrase.literal && (
            <Text className="text-[#9c7dc0] text-xs mt-2">Lit: "{phrase.literal}"</Text>
          )}
        </View>

        <View className="items-center mb-6">
          <Text className="text-[#9c7dc0] text-sm mb-3">1. Listen first</Text>
          <TTSButton text={phrase.cantonese} language="zh-HK" />
        </View>

        <View className="items-center mb-6">
          <Text className="text-[#9c7dc0] text-sm mb-3">2. Now you try — tap to record</Text>
          <RecordButton onRecorded={() => setRecorded(true)} />
        </View>

        {recorded && (
          <View className="bg-[#1e3a1a] border border-[#4caf50] rounded-2xl p-4 mb-6 items-center">
            <Text className="text-[#4caf50] font-semibold">✓ Recorded!</Text>
            <Text className="text-[#a5d6a7] text-xs mt-1 text-center">
              Keep practising — consistency is key with Cantonese tones.
            </Text>
          </View>
        )}

        <TouchableOpacity
          className="bg-[#f5a623] rounded-2xl py-4 items-center"
          onPress={handleNext}
        >
          <Text className="text-[#1a0a2e] font-bold text-base">
            {current < lesson.phrases.length - 1 ? "Next Phrase →" : "Finish Practice 🎉"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
