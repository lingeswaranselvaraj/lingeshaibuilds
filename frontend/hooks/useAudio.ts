import { useState, useRef } from "react";
import { Audio } from "expo-av";

export function useAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const startRecording = async () => {
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) throw new Error("Microphone permission denied");
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    recordingRef.current = recording;
    setIsRecording(true);
  };

  const stopRecording = async (): Promise<string> => {
    if (!recordingRef.current) return "";
    await recordingRef.current.stopAndUnloadAsync();
    const uri = recordingRef.current.getURI() ?? "";
    recordingRef.current = null;
    setIsRecording(false);
    return uri;
  };

  return { isRecording, startRecording, stopRecording };
}
