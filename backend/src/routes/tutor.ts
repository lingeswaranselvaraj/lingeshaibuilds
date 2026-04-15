import { Router, Request, Response } from "express";
import { getCantoneseReply } from "../services/openai";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { messages } = req.body as { messages: { role: string; content: string }[] };
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array required" });
  }
  try {
    const reply = await getCantoneseReply(messages);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get reply from AI" });
  }
});

export default router;
