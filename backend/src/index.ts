import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tutorRouter from "./routes/tutor";
import liveTutorRouter from "./routes/liveTutor";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.use("/api/tutor", tutorRouter);
app.use("/api/live-tutor", liveTutorRouter);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`LoHaa backend running on http://localhost:${PORT}`);
});
