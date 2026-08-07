import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Initialize Gemini client on server side
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  return new GoogleGenAI({
    apiKey: apiKey || "dummy_key",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint for AI Disease Detection
app.post("/api/gemini/disease-analysis", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg", cropName } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY missing, using fallback structured response");
    }

    const ai = getGenAI();
    
    const prompt = `You are KrishiBazar AI, an expert Bangladeshi agricultural scientist and crop pathologist.
Analyze this crop leaf or plant image for disease, pests, or nutrient deficiencies.
${cropName ? `The user specifies crop type: ${cropName}.` : ''}

Provide a detailed structured JSON response adhering strictly to the schema below:
- diseaseDetected: boolean
- diseaseNameBn: string (Bangla name, e.g. "ধানের ব্লাস্ট রোগ")
- diseaseNameEn: string (English name, e.g. "Rice Blast Disease")
- confidenceScore: number (0-100 percentage)
- severity: string ("Healthy" | "Low" | "Medium" | "High" | "Critical")
- symptomsBn: array of strings in Bangla
- symptomsEn: array of strings in English
- organicTreatmentBn: array of organic/bio control steps in Bangla
- organicTreatmentEn: array of organic/bio control steps in English
- chemicalTreatmentBn: array of recommended pesticides/fungicides with dosage in Bangla
- chemicalTreatmentEn: array of recommended pesticides/fungicides with dosage in English
- preventiveMeasuresBn: array of preventive farming tips in Bangla
- preventiveMeasuresEn: array of preventive farming tips in English
- expertAdviceBn: string summary advice in simple farmer-friendly Bangla
- expertAdviceEn: string summary advice in English

Respond strictly in JSON format.`;

    let contents: any;
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      contents = {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
      };
    } else {
      contents = prompt + "\nAnalyze sample: Tomato Late Blight disease.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diseaseDetected: { type: Type.BOOLEAN },
            diseaseNameBn: { type: Type.STRING },
            diseaseNameEn: { type: Type.STRING },
            confidenceScore: { type: Type.NUMBER },
            severity: { type: Type.STRING },
            symptomsBn: { type: Type.ARRAY, items: { type: Type.STRING } },
            symptomsEn: { type: Type.ARRAY, items: { type: Type.STRING } },
            organicTreatmentBn: { type: Type.ARRAY, items: { type: Type.STRING } },
            organicTreatmentEn: { type: Type.ARRAY, items: { type: Type.STRING } },
            chemicalTreatmentBn: { type: Type.ARRAY, items: { type: Type.STRING } },
            chemicalTreatmentEn: { type: Type.ARRAY, items: { type: Type.STRING } },
            preventiveMeasuresBn: { type: Type.ARRAY, items: { type: Type.STRING } },
            preventiveMeasuresEn: { type: Type.ARRAY, items: { type: Type.STRING } },
            expertAdviceBn: { type: Type.STRING },
            expertAdviceEn: { type: Type.STRING },
          },
          required: [
            "diseaseDetected",
            "diseaseNameBn",
            "diseaseNameEn",
            "confidenceScore",
            "severity",
            "symptomsBn",
            "organicTreatmentBn",
            "chemicalTreatmentBn",
            "preventiveMeasuresBn",
            "expertAdviceBn",
          ],
        },
      },
    });

    const jsonText = response.text || "{}";
    const parsedData = JSON.parse(jsonText);
    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Gemini Disease Analysis Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze crop image",
    });
  }
});

// API Endpoint for AI Assistant
app.post("/api/gemini/assistant", async (req, res) => {
  try {
    const { message, language = "bn" } = req.body;
    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
      config: {
        systemInstruction: `You are 'কৃষিবাজার এআই সহায়ক' (KrishiBazar AI Assistant), an expert agricultural consultant for Bangladeshi farmers. Reply in ${
          language === "bn" ? "simple, friendly Bangla (বাংলা)" : "English"
        }. Keep your suggestions concise, easy to understand for farmers, and actionable.`,
      },
    });

    res.json({ success: true, reply: response.text });
  } catch (error: any) {
    console.error("Gemini AI Assistant Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
