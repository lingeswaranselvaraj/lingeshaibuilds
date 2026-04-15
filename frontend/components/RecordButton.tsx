import { TouchableOpacity, Text, View, Alert } from "react-native";
import { Audio } from "expo-av";
import { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onRecorded: (uri: string) => void;
}

export default function RecordButton({ onRecorded }: Props) {
  const [recording, setRecording] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const start = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permission required", "Microphone access is needed for speaking practice.");
        return;
      }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
      setRecording(true);
    } catch (e) {
      Alert.alert("Error", "Could not start recording.");
    }
  };

  const stop = async () => {
    try {
      if (!recordingRef.current) return;
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI() ?? "";
      recordingRef.current = null;
      setRecording(false);
      onRecorded(uri);
    } catch {
      setRecording(false);
    }
  };

  return (
    <View className="items-center">
      <TouchableOpacity
        className="w-20 h-20 rounded-full items-center justify-center"
        style={{ backgroundColor: recording ? "#e53935" : "#4f2d8a" }}
        onPress={recording ? stop : start}
      >
        <Ionicons name={recording ? "stop" : "mic"} size={32} color="#fff" />
      </TouchableOpacity>
      <Text className="text-[#9c7dc0] text-xs mt-2">
        {recording ? "Recording… tap to stop" : "Tap to record"}
      </Text>
    </View>
  );
}
