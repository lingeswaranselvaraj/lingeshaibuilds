import { TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { speakText, stopSpeech } from "../utils/speech";

interface Props {
  text: string;
  language?: string;
  size?: "sm" | "md" | "lg";
}

export default function TTSButton({ text, language = "zh-HK", size = "md" }: Props) {
  const [speaking, setSpeaking] = useState(false);

  const sizePx = size === "sm" ? 36 : size === "lg" ? 56 : 44;
  const iconSize = size === "sm" ? 16 : size === "lg" ? 26 : 20;

  const speak = () => {
    if (speaking) {
      stopSpeech();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    speakText(text, {
      language,
      rate: 0.85,
      onDone: () => setSpeaking(false),
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
