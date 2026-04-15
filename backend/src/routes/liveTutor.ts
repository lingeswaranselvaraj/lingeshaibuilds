import { Router, Request, Response } from "express";
import { getClient } from "../services/openai";

const router = Router();

const LIVE_SYSTEM_PROMPT = `You are LoHaa Live, a real-time Cantonese speaking coach. The user speaks to you in English and you teach them how to say it in Cantonese.

Your response format for EVERY message:
1. Acknowledge what the user said briefly (1 sentence max).
2. Give the Cantonese phrase(s) with:
   - Chinese characters (e.g. 你好)
   - Jyutping with tone numbers (e.g. nei5 hou2)
   - Literal meaning if helpful
3. One pronunciation tip (focus on tones or tricky sounds).
4. Encourage them to try saying it.

Rules:
- Keep responses SHORT — max 5 lines. This is a live conversational session.
- Always prioritise spoken, everyday Cantonese (not formal written Chinese).
- If the user asks how to say something, teach it. If they ask a grammar question, answer briefly.
- Use simple English. Be warm, fun, and encouraging.
- Never overwhelm with too much information at once.`;

router.post("/", async (req: Request, res: Response) => {
  const { messages } = req.body as { messages: { role: string; content: string }[] };
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array required" });
  }
  try {
    const response = await getClient().chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT ?? "gpt-35-turbo",
      messages: [
        { role: "system", content: LIVE_SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      ],
      max_tokens: 300,
      temperature: 0.75,
    });
    const reply = response.choices[0]?.message?.content ?? "Sorry, try again!";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get reply" });
  }
});

export default router;
