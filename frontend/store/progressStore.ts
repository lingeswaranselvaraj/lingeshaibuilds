import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProgressState {
  completedLessons: string[];
  practiceCount: number;
  streak: number;
  lastPracticeDate: string | null;
  completeLesson: (id: string) => void;
  incrementPractice: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      practiceCount: 0,
      streak: 0,
      lastPracticeDate: null,

      completeLesson: (id) => {
        const { completedLessons } = get();
        if (!completedLessons.includes(id)) {
          set({ completedLessons: [...completedLessons, id] });
        }
      },

      incrementPractice: () => {
        const today = new Date().toDateString();
        const { lastPracticeDate, streak } = get();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newStreak =
          lastPracticeDate === yesterday ? streak + 1
          : lastPracticeDate === today ? streak
          : 1;
        set({
          practiceCount: get().practiceCount + 1,
          streak: newStreak,
          lastPracticeDate: today,
        });
      },
    }),
    {
      name: "lohaa-progress",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
