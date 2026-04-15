import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useCallback } from "react";
import { sendLiveTutorMessage } from "../../services/api";
import { speakText, stopSpeech } from "../../utils/speech";

interface Message { role: "user" | "assistant"; content: string; }

function extractCantonese(text: string): string {
  const matches = text.match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]+/g);
  return matches ? matches.join(" ") : "";
}

function speakCantonese(text: string, onDone?: () => void) {
  const cantonese = extractCantonese(text);
  if (!cantonese) { onDone?.(); return; }
  stopSpeech();
  speakText(cantonese, { language: "zh-HK", rate: 0.8, onDone });
}

// Web Speech API types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

function useSpeechRecognition(onResult: (text: string) => void) {
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState("");

  const start = useCallback(() => {
    if (Platform.OS !== "web") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    recognitionRef.current?.stop();

    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onresult = (e: any) => {
      const last = e.results[e.results.length - 1];
      const text = last[0].transcript?.trim() ?? "";
      if (last.isFinal) {
        setInterimText("");
        if (text) {
          rec.stop();
          onResult(text);
        }
      } else {
        setInterimText(text); // show live preview
      }
    };
    rec.onend = () => { setListening(false); setInterimText(""); };
    rec.onerror = (e: any) => {
      if (e.error !== "no-speech") console.warn("Speech recognition error:", e.error);
      setListening(false);
      setInterimText("");
    };
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  }, [onResult]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
    setInterimText("");
  }, []);

  return { listening, interimText, start, stop };
}

function MessageBubble({ msg, onSpeak }: { msg: Message; onSpeak: (text: string) => void }) {
  const isUser = msg.role === "user";
  const cantonese = !isUser ? extractCantonese(msg.content) : "";
  return (
    <View className={`mb-3 max-w-[88%] ${isUser ? "self-end" : "self-start"}`}>
      {isUser && (
        <View className="flex-row items-center mb-1 self-end gap-x-1">
          <Ionicons name="mic-outline" size={11} color="#9c7dc0" />
          <Text className="text-[#9c7dc0] text-xs">You said</Text>
        </View>
      )}
      <View className={`px-4 py-3 rounded-2xl ${isUser ? "bg-[#4f2d8a]" : "bg-[#2d1457]"}`}>
        <Text className="text-white text-sm leading-relaxed">{msg.content}</Text>
      </View>
      {cantonese.length > 0 && (
        <TouchableOpacity
          onPress={() => onSpeak(msg.content)}
          className="flex-row items-center mt-1.5 gap-x-1.5"
        >
          <Ionicons name="volume-high-outline" size={13} color="#f5a623" />
          <Text className="text-[#f5a623] text-xs">Hear Cantonese</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function LiveTutorScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  // Track if user has scrolled up — if so, don't force-scroll to bottom
  const isAtBottomRef = useRef(true);

  const isSpeechSupported = Platform.OS === "web" &&
    typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const messagesRef = useRef<Message[]>([]);
  messagesRef.current = messages;

  const scrollToBottom = useCallback(() => {
    if (isAtBottomRef.current) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, []);

  const handleUserSpeech = useCallback(async (transcript: string) => {
    const trimmed = transcript.trim();
    if (!trimmed) return; // ignore empty/noise
    const userMsg: Message = { role: "user", content: trimmed };
    const currentMessages = messagesRef.current;
    setMessages((prev) => [...prev, userMsg]);
    isAtBottomRef.current = true; // new message — scroll to bottom
    setLoading(true);
    try {
      const reply = await sendLiveTutorMessage([...currentMessages, userMsg]);
      const assistantMsg: Message = { role: "assistant", content: reply };
      setMessages((prev) => [...prev, assistantMsg]);
      setSpeaking(true);
      speakCantonese(reply, () => setSpeaking(false));
    } catch (err: any) {
      console.error("Live tutor error:", err);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: `Error: ${err?.message ?? "Unknown error"}. Check browser console for details.`,
      }]);
    } finally {
      setLoading(false);
    }
  }, []);

  const { listening, interimText, start, stop } = useSpeechRecognition(handleUserSpeech);

  const handleSpeak = (text: string) => {
    setSpeaking(true);
    speakCantonese(text, () => setSpeaking(false));
  };

  const handleMicPress = () => {
    if (loading || speaking) return;
    if (listening) stop(); else start();
  };

  const clear = () => {
    stopSpeech();
    setMessages([]);
    setSpeaking(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1a0a2e]" edges={["bottom"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-3 pb-2">
        <View>
          <Text className="text-white text-lg font-bold">🎙️ Live Tutor</Text>
          <Text className="text-[#9c7dc0] text-xs">Speak English · Learn Cantonese</Text>
        </View>
        {messages.length > 0 && (
          <TouchableOpacity onPress={clear} className="px-3 py-1.5 bg-[#2d1457] rounded-xl">
            <Text className="text-[#9c7dc0] text-xs">Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Messages or empty state */}
      {messages.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-24 h-24 rounded-full bg-[#2d1457] items-center justify-center mb-6">
            <Ionicons name="mic" size={44} color="#f5a623" />
          </View>
          <Text className="text-white text-xl font-bold mb-2 text-center">Speak to Learn</Text>
          <Text className="text-[#9c7dc0] text-sm text-center leading-relaxed mb-6">
            Tap the microphone, say something in English, and your tutor will teach you how to say it in Cantonese — then speak it aloud for you!
          </Text>
          <View className="bg-[#2d1457] rounded-2xl p-4 w-full">
            <Text className="text-[#f5a623] text-xs font-semibold mb-2">Try saying:</Text>
            {["How do I order coffee?", "I want to say hello to someone", "Teach me to count to 5", "How do I say I'm hungry?"].map((t) => (
              <Text key={t} className="text-[#d4aaec] text-sm mb-1">• {t}</Text>
            ))}
          </View>
          {!isSpeechSupported && (
            <View className="mt-4 bg-[#3d1020] rounded-xl px-4 py-3">
              <Text className="text-[#ff8a80] text-xs text-center">
                ⚠️ Voice input not supported in this browser. Try Chrome or Edge.
              </Text>
            </View>
          )}
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, i) => String(i)}
          className="flex-1 px-4 pt-2"
          onContentSizeChange={scrollToBottom}
          onScrollBeginDrag={() => { isAtBottomRef.current = false; }}
          onScrollEndDrag={(e) => {
            const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
            isAtBottomRef.current = contentOffset.y + layoutMeasurement.height >= contentSize.height - 40;
          }}
          renderItem={({ item }) => <MessageBubble msg={item} onSpeak={handleSpeak} />}
        />
      )}

      {/* Live interim transcript */}
      {listening && interimText.length > 0 && (
        <View className="mx-4 mb-2 px-4 py-2 bg-[#2d1457] rounded-xl border border-[#4f2d8a]">
          <Text className="text-[#d4aaec] text-sm italic">"{interimText}…"</Text>
        </View>
      )}

      {/* Status bar */}
      {(loading || speaking) && (
        <View className="flex-row items-center justify-center gap-x-2 py-2">
          <ActivityIndicator size="small" color="#f5a623" />
          <Text className="text-[#f5a623] text-xs">
            {loading ? "Thinking…" : "Speaking Cantonese…"}
          </Text>
        </View>
      )}

      {/* Mic button */}
      <View className="items-center pb-8 pt-3">
        <TouchableOpacity
          onPress={handleMicPress}
          disabled={loading || speaking || !isSpeechSupported}
          className="items-center justify-center rounded-full"
          style={{
            width: 80,
            height: 80,
            backgroundColor: listening ? "#e53935" : (loading || speaking || !isSpeechSupported) ? "#2d1457" : "#f5a623",
          }}
        >
          <Ionicons
            name={listening ? "stop" : "mic"}
            size={34}
            color={loading || speaking || !isSpeechSupported ? "#4f2d8a" : "#1a0a2e"}
          />
        </TouchableOpacity>
        <Text className="text-[#9c7dc0] text-xs mt-3">
          {listening ? "Listening… tap to stop" : loading ? "Processing…" : speaking ? "Speaking…" : "Tap to speak"}
        </Text>
      </View>
    </SafeAreaView>
  );
}
