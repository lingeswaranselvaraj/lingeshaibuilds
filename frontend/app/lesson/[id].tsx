import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LESSONS } from "../../data/lessons";
import PhraseCard from "../../components/PhraseCard";
import { useProgressStore } from "../../store/progressStore";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { completeLesson, completedLessons } = useProgressStore();
  const lesson = LESSONS.find((l) => l.id === id);

  if (!lesson) return (
    <View className="flex-1 bg-[#1a0a2e] items-center justify-center">
      <Text className="text-white">Lesson not found.</Text>
    </View>
  );

  const done = completedLessons.includes(lesson.id);

  return (
    <SafeAreaView className="flex-1 bg-[#1a0a2e]" edges={["bottom"]}>
      <ScrollView className="flex-1 px-5 pt-4" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="items-center mb-6">
          <Text className="text-5xl mb-2">{lesson.emoji}</Text>
          <Text className="text-white text-2xl font-bold">{lesson.title}</Text>
          <Text className="text-[#9c7dc0] text-sm mt-1">{lesson.subtitle}</Text>
        </View>

        {lesson.notes && (
          <View className="bg-[#2d1457] rounded-2xl p-4 mb-5">
            <Text className="text-[#f5a623] font-semibold mb-1">📌 Note</Text>
            <Text className="text-[#d4aaec] text-sm leading-relaxed">{lesson.notes}</Text>
          </View>
        )}

        <Text className="text-white font-semibold text-base mb-3">Phrases</Text>
        {lesson.phrases.map((phrase, i) => (
          <PhraseCard key={i} phrase={phrase} />
        ))}

        <TouchableOpacity
          className="mt-6 rounded-2xl py-4 items-center"
          style={{ backgroundColor: done ? "#4caf50" : "#f5a623" }}
          onPress={() => {
            completeLesson(lesson.id);
            router.push(`/practice/${lesson.id}`);
          }}
        >
          <Text className="text-[#1a0a2e] font-bold text-base">
            {done ? "✓ Practice Again 🎤" : "Practice Speaking 🎤"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
