import { create } from "zustand";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TutorState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (msg: Message) => void;
  setLoading: (v: boolean) => void;
  clearChat: () => void;
}

export const useTutorStore = create<TutorState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  setLoading: (v) => set({ isLoading: v }),
  clearChat: () => set({ messages: [] }),
}));
