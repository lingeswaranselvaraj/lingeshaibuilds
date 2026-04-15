import type { Message } from "../store/tutorStore";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001";

export async function sendTutorMessage(messages: Message[]): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/tutor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  return data.reply as string;
}

export async function sendLiveTutorMessage(messages: Message[]): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/live-tutor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  return data.reply as string;
}
