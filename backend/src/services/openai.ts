import { AzureOpenAI } from "openai";

let _client: AzureOpenAI | null = null;

export function getClient(): AzureOpenAI {
  if (!_client) {
    _client = new AzureOpenAI({
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION ?? "2024-08-01-preview",
      deployment: process.env.AZURE_OPENAI_DEPLOYMENT ?? "gpt-4o",
    });
  }
  return _client;
}

const SYSTEM_PROMPT = `You are LoHaa, a friendly and encouraging Cantonese language tutor for beginners. Your job is to help users learn to speak Cantonese.

Guidelines:
- Always include Cantonese characters, Jyutping romanisation (e.g. nei5 hou2), and English translation for any Cantonese phrase you mention.
- Explain tones clearly — always include the tone number in Jyutping.
- Be encouraging and patient. Beginners make mistakes and need motivation.
- Keep responses concise and easy to follow. Use bullet points or numbered steps when helpful.
- If quizzing the user, ask one question at a time and give feedback on their answer.
- Focus on practical, everyday Cantonese. Prioritise spoken Cantonese over written formal Chinese.
- When correcting mistakes, be gentle: explain what was wrong and why, then give the correct form.`;

export async function getCantoneseReply(
  messages: { role: string; content: string }[]
): Promise<string> {
  const response = await getClient().chat.completions.create({
    model: process.env.AZURE_OPENAI_DEPLOYMENT ?? "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    ],
    max_tokens: 600,
    temperature: 0.7,
  });
  return response.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
}
