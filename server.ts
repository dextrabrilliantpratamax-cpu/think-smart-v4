import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import {
  searchSchools,
  getCachedFilters,
  getSchoolStats,
  getSchoolById,
  importDapodikSchools,
} from "./server/schoolDb";

dotenv.config();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Health check endpoint for Cloud Run and monitoring
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==========================================
// School Search & Kemendikdasmen Database API
// ==========================================

// API: Cached filter options (Provinsi, Kabupaten, Kecamatan)
app.get("/api/schools/filters", (req, res) => {
  try {
    const filters = getCachedFilters();
    res.json({ success: true, ...filters });
  } catch (err: any) {
    console.error("Error fetching school filters:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Aggregated school statistics
app.get("/api/schools/stats", (req, res) => {
  try {
    const { provinsi, kabupaten, bentuk } = req.query;
    const stats = getSchoolStats(
      provinsi as string | undefined,
      kabupaten as string | undefined,
      bentuk as string | undefined
    );
    res.json({ success: true, ...stats });
  } catch (err: any) {
    console.error("Error fetching school stats:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Search schools with full-text search, filters, and relevance ranking
app.get("/api/schools", (req, res) => {
  try {
    const {
      q,
      query,
      provinsi,
      kabupaten,
      kabupaten_kota,
      kecamatan,
      bentuk,
      status,
      page,
      limit,
      sortBy,
    } = req.query;

    const results = searchSchools({
      query: (q as string) || (query as string) || "",
      provinsi: (provinsi as string) || "",
      kabupaten: (kabupaten as string) || (kabupaten_kota as string) || "",
      kecamatan: (kecamatan as string) || "",
      bentuk: (bentuk as string) || "",
      status: (status as string) || "",
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 20,
      sortBy: sortBy as any,
    });

    res.json(results);
  } catch (err: any) {
    console.error("Error querying schools database:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Get school details by ID, NPSN, or Slug
app.get("/api/schools/:id", (req, res) => {
  try {
    const school = getSchoolById(req.params.id);
    if (!school) {
      return res.status(404).json({ success: false, error: "Sekolah tidak ditemukan" });
    }
    res.json({ success: true, data: school });
  } catch (err: any) {
    console.error("Error fetching school detail:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Batch import raw Dapodik API JSON
app.post("/api/schools/import-dapodik", (req, res) => {
  try {
    const data = req.body.data || (Array.isArray(req.body) ? req.body : []);
    const result = importDapodikSchools(data);
    res.json(result);
  } catch (err: any) {
    console.error("Error importing Dapodik data:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Server-side Gemini API initialization
const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API: Check Grammar & Academic Polishing
app.post("/api/ai/grammar-check", async (req, res) => {
  try {
    const { text, level } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const ai = getAi();
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Perform a thorough academic grammar and style check for a high school English student (Class ${level || "SMA"}).
Input Text: "${text}"

Provide a JSON object with:
1. "correctedText": string (the corrected and refined sentence)
2. "isCorrect": boolean (true if original had no major errors)
3. "grammarExplanation": string (explaining the rules in clear Indonesian, e.g. Tense usage, Subject-Verb Agreement, Preposition)
4. "academicVocabularyTips": array of string (2-3 suggestions to make the vocabulary more formal/academic)`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error checking grammar:", error);
    res.status(500).json({
      error: error.message || "Failed to process grammar check",
      fallback: {
        correctedText: req.body?.text || "",
        isCorrect: false,
        grammarExplanation: "Gagal terhubung ke layanan AI. Pastikan GEMINI_API_KEY terkonfigurasi.",
        academicVocabularyTips: ["Periksa kembali tata bahasa Anda secara manual."],
      },
    });
  }
});

// API: AI Essay & Writing Evaluation
app.post("/api/ai/writing-feedback", async (req, res) => {
  try {
    const { prompt, essay, level } = req.body;
    if (!essay) {
      return res.status(400).json({ error: "Essay text is required" });
    }

    const ai = getAi();
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `You are an expert English academic reviewer for Indonesian high school students (Class ${level || "SMA"}).
Evaluate this student essay/writing submission based on the prompt: "${prompt || "General Essay"}".
Student Text:
"${essay}"

Return a JSON object with:
1. "score": number (0 to 100)
2. "summaryFeedback": string (In encouraging Indonesian, summary of strengths and areas for growth)
3. "grammarScore": number (0 to 100)
4. "vocabularyScore": number (0 to 100)
5. "coherenceScore": number (0 to 100)
6. "strengths": array of string (2-3 bullet points in Indonesian)
7. "improvements": array of string (2-3 concrete suggestions in Indonesian)
8. "academicRewrite": string (a polished academic paragraph version of their text)`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error evaluating writing:", error);
    res.status(500).json({
      error: error.message || "Failed to evaluate writing submission",
    });
  }
});

// API: Sentence Builder & Tense Explainer
app.post("/api/ai/explain-tense", async (req, res) => {
  try {
    const { tenseName, sentence } = req.body;
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Explain the English tense "${tenseName}" for Indonesian SMA students with high academic standards.
Example sentence context: "${sentence || ""}"

Return JSON:
1. "formula": string (e.g. Subject + Have/Has + V3)
2. "usage": string (in Indonesian, clear & concise explanation)
3. "examples": array of objects [{ "english": string, "indonesian": string }]
4. "commonMistakes": array of string (in Indonesian)
5. "academicTip": string (how to use this tense effectively in formal essays or UTBK questions)`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error explaining tense:", error);
    res.status(500).json({ error: error.message || "Failed to fetch tense explanation" });
  }
});

// API: UTBK Question Generator & AI Tutor
app.post("/api/ai/utbk-explain", async (req, res) => {
  try {
    const { question, options, selectedAnswer, correctAnswer } = req.body;
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Explain this UTBK Bahasa Inggris (Literasi dalam Bahasa Inggris / SNBT) question to an Indonesian high school student.
Question: "${question}"
Options: ${JSON.stringify(options)}
Student Selected: "${selectedAnswer}"
Correct Key: "${correctAnswer}"

Return JSON:
1. "isCorrect": boolean
2. "explanation": string (Step-by-step reasoning in Indonesian using academic Reading Comprehension strategies like scanning, skimming, finding main idea, context clues)
3. "keyVocabulary": array of objects [{ "word": string, "definition": string, "synonym": string }]
4. "utbkStrategyTip": string (Pro tip for tackling similar questions on SNBT/UTBK test)`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error explaining UTBK question:", error);
    res.status(500).json({ error: error.message || "Failed to explain UTBK question" });
  }
});

async function startServer() {
  // Explicitly serve public directory for audio/media files with range support
  const publicPath = path.join(process.cwd(), "public");
  app.use(express.static(publicPath));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.warn("Vite dev server middleware could not be loaded:", e);
    }
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
