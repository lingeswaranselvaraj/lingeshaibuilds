import { TouchableOpacity, ActivityIndicator } from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface Props {
  text: string;
  language?: string;
  size?: "sm" | "md" | "lg";
}

export default function TTSButton({ text, language = "zh-HK", size = "md" }: Props) {
  const [speaking, setSpeaking] = useState(false);

  const sizePx = size === "sm" ? 36 : size === "lg" ? 56 : 44;
  const iconSize = size === "sm" ? 16 : size === "lg" ? 26 : 20;

  const speak = async () => {
    if (speaking) {
      Speech.stop();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    Speech.speak(text, {
      language,
      pitch: 1.0,
      rate: 0.85,
      onDone: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  return (
    <TouchableOpacity
      onPress={speak}
      className="rounded-full items-center justify-center bg-[#4f2d8a]"
      style={{ width: sizePx, height: sizePx }}
    >
      {speaking ? (
        <ActivityIndicator size="small" color="#f5a623" />
      ) : (
        <Ionicons name="volume-high-outline" size={iconSize} color="#f5a623" />
      )}
    </TouchableOpacity>
  );
}
