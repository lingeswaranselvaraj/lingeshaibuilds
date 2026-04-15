import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTutorStore } from "../../store/tutorStore";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";

export default function TutorScreen() {
  const { messages, addMessage, isLoading, setLoading } = useTutorStore();
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    addMessage({ role: "user", content: text });
    setLoading(true);
    try {
      const { sendTutorMessage } = await import("../../services/api");
      const reply = await sendTutorMessage([...messages, { role: "user", content: text }]);
      addMessage({ role: "assistant", content: reply });
    } catch {
      addMessage({ role: "assistant", content: "Sorry, I couldn't connect to the tutor right now. Make sure the backend server is running." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1a0a2e]" edges={["bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        {messages.length === 0 && (
          <View className="flex-1 items-center justify-center px-8">
            <Text className="text-4xl mb-4">🐉</Text>
            <Text className="text-white text-xl font-bold mb-2 text-center">AI Cantonese Tutor</Text>
            <Text className="text-[#9c7dc0] text-sm text-center leading-relaxed mb-6">
              Ask me anything about Cantonese! I can explain phrases, tones, grammar, help you practise conversations, or quiz you on vocabulary.
            </Text>
            <View className="w-full gap-y-2">
              {[
                "How do I say 'thank you' in Cantonese?",
                "Explain the 6 tones with examples",
                "Quiz me on basic greetings",
                "What's the difference between 你好 and 你好嗎?",
              ].map((suggestion) => (
                <TouchableOpacity
                  key={suggestion}
                  className="bg-[#2d1457] rounded-xl px-4 py-3"
                  onPress={() => { setInput(suggestion); }}
                >
                  <Text className="text-[#d4aaec] text-sm">{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {messages.length > 0 && (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, i) => String(i)}
            className="flex-1 px-4 pt-4"
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            renderItem={({ item }) => (
              <View
                className={`mb-3 max-w-[85%] px-4 py-3 rounded-2xl ${
                  item.role === "user"
                    ? "self-end bg-[#4f2d8a]"
                    : "self-start bg-[#2d1457]"
                }`}
              >
                <Text className="text-white text-sm leading-relaxed">{item.content}</Text>
              </View>
            )}
          />
        )}

        {isLoading && (
          <View className="px-4 pb-2 self-start">
            <ActivityIndicator color="#f5a623" />
          </View>
        )}

        <View className="flex-row items-end px-4 pb-4 pt-2 gap-x-2">
          <TextInput
            className="flex-1 bg-[#2d1457] text-white rounded-2xl px-4 py-3 text-sm"
            placeholder="Ask your tutor..."
            placeholderTextColor="#9c7dc0"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={send}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            className="w-11 h-11 bg-[#f5a623] rounded-full items-center justify-center"
            onPress={send}
            disabled={isLoading}
          >
            <Ionicons name="send" size={18} color="#1a0a2e" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
