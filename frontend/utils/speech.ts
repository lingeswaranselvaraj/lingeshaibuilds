import { Platform } from "react-native";
import * as Speech from "expo-speech";

/**
 * Speaks text using the best available method.
 * On web: uses window.speechSynthesis directly with zh-HK → zh-TW → zh fallback.
 * On native: uses expo-speech.
 */
export function speakText(
  text: string,
  options: { language?: string; rate?: number; onDone?: () => void } = {}
) {
  const { language = "zh-HK", rate = 0.85, onDone } = options;

  if (Platform.OS === "web" && typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = rate;
    utter.pitch = 1.0;
    utter.onend = () => onDone?.();
    utter.onerror = () => onDone?.();

    const trySpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = ["zh-HK", "zh-TW", "zh-CN", "zh"];
      let chosen = voices.find((v) => v.lang === language);
      if (!chosen) {
        for (const lang of preferred) {
          chosen = voices.find((v) => v.lang.startsWith(lang));
          if (chosen) break;
        }
      }
      if (chosen) utter.voice = chosen;
      window.speechSynthesis.speak(utter);
    };

    // Voices may not be loaded yet on first call (especially mobile Safari)
    if (window.speechSynthesis.getVoices().length > 0) {
      trySpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        trySpeak();
      };
      // Fallback: speak anyway after 500ms if voices never fire
      setTimeout(() => {
        if (!window.speechSynthesis.speaking) trySpeak();
      }, 500);
    }
  } else {
    Speech.stop();
    Speech.speak(text, {
      language,
      rate,
      pitch: 1.0,
      onDone,
      onError: onDone,
    });
  }
}

export function stopSpeech() {
  if (Platform.OS === "web" && typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  } else {
    Speech.stop();
  }
}
