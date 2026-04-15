import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LESSONS } from "../../data/lessons";
import { useProgressStore } from "../../store/progressStore";
import { Ionicons } from "@expo/vector-icons";

export default function LessonsScreen() {
  const router = useRouter();
  const { completedLessons } = useProgressStore();

  return (
    <SafeAreaView className="flex-1 bg-[#1a0a2e]" edges={["bottom"]}>
      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="text-white text-2xl font-bold mb-1">Lessons</Text>
        <Text className="text-[#9c7dc0] text-sm mb-5">
          {completedLessons.length} / {LESSONS.length} completed
        </Text>

        {LESSONS.map((lesson) => {
          const done = completedLessons.includes(lesson.id);
          return (
            <TouchableOpacity
              key={lesson.id}
              className="bg-[#2d1457] rounded-2xl p-4 mb-3 flex-row items-center"
              onPress={() => router.push(`/lesson/${lesson.id}`)}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: done ? "#4caf50" : "#4f2d8a" }}
              >
                {done ? (
                  <Ionicons name="checkmark" size={22} color="#fff" />
                ) : (
                  <Text className="text-white text-xl">{lesson.emoji}</Text>
                )}
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold text-base">{lesson.title}</Text>
                <Text className="text-[#9c7dc0] text-xs mt-0.5">{lesson.subtitle}</Text>
                <Text className="text-[#d4aaec] text-xs mt-1">{lesson.phrases.length} phrases</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9c7dc0" />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
