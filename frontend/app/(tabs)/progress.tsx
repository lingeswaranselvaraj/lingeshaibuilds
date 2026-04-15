import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProgressStore } from "../../store/progressStore";
import { LESSONS } from "../../data/lessons";

export default function ProgressScreen() {
  const { completedLessons, practiceCount, streak } = useProgressStore();
  const pct = LESSONS.length > 0 ? Math.round((completedLessons.length / LESSONS.length) * 100) : 0;

  return (
    <SafeAreaView className="flex-1 bg-[#1a0a2e]" edges={["bottom"]}>
      <ScrollView className="flex-1 px-5 pt-5">
        <Text className="text-white text-2xl font-bold mb-5">Your Progress</Text>

        <View className="flex-row gap-x-3 mb-5">
          {[
            { label: "Lessons done", value: completedLessons.length, emoji: "📚" },
            { label: "Day streak", value: streak, emoji: "🔥" },
            { label: "Practices", value: practiceCount, emoji: "🎤" },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 bg-[#2d1457] rounded-2xl p-4 items-center">
              <Text className="text-2xl mb-1">{stat.emoji}</Text>
              <Text className="text-white text-2xl font-bold">{stat.value}</Text>
              <Text className="text-[#9c7dc0] text-xs text-center mt-1">{stat.label}</Text>
            </View>
          ))}
        </View>

        <View className="bg-[#2d1457] rounded-2xl p-5 mb-5">
          <View className="flex-row justify-between mb-2">
            <Text className="text-white font-semibold">Overall Progress</Text>
            <Text className="text-[#f5a623] font-bold">{pct}%</Text>
          </View>
          <View className="h-3 bg-[#1a0a2e] rounded-full overflow-hidden">
            <View className="h-3 bg-[#f5a623] rounded-full" style={{ width: `${pct}%` }} />
          </View>
          <Text className="text-[#9c7dc0] text-xs mt-2">{completedLessons.length} of {LESSONS.length} lessons completed</Text>
        </View>

        <View className="bg-[#2d1457] rounded-2xl p-5">
          <Text className="text-white font-semibold mb-3">Lesson Completion</Text>
          {LESSONS.map((lesson) => {
            const done = completedLessons.includes(lesson.id);
            return (
              <View key={lesson.id} className="flex-row items-center mb-3">
                <Text className="text-base mr-2">{lesson.emoji}</Text>
                <Text className="text-[#d4aaec] text-sm flex-1">{lesson.title}</Text>
                <Text className={`text-xs font-semibold ${done ? "text-[#4caf50]" : "text-[#9c7dc0]"}`}>
                  {done ? "Done ✓" : "Pending"}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
