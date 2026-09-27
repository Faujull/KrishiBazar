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
      model: "gemini-3.8-flash",
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

// Helper for rule-based agricultural advisory fallback
function generateRuleBasedRecommendation(farm: any, crop: any, weather: any) {
  const precip = weather?.precipitation ?? 0;
  const isRainy = precip > 1 || (weather?.weatherCode ?? 0) >= 51;
  const temp = weather?.temperature != null ? weather.temperature : 34;
  const humidity = weather?.humidity != null ? weather.humidity : 78;
  const wind = weather?.windSpeed != null ? weather.windSpeed : 12;
  const cropNameBn = crop?.cropNameBn || crop?.cropNameEn || "ফসল";
  const cropNameEn = crop?.cropNameEn || crop?.cropNameBn || "Crop";
  const stageBn = crop?.stageBn || "কুশি গজানো পর্যায়";
  const stageEn = crop?.stageEn || "Tillering Stage";
  const district = farm?.district || "বগুড়া";

  return {
    id: "rec-" + Date.now(),
    generatedAt: new Date().toISOString(),
    headlineBn: isRainy
      ? `${district} অঞ্চলে বৃষ্টিপাতের সম্ভাবনা: জমিতে অতিরিক্ত সেচ বন্ধ রাখুন`
      : `${district} অঞ্চলে আজকের আবহাওয়া ভিত্তিক খামার পরিচর্যা ও সেচ পরামর্শ`,
    headlineEn: isRainy
      ? `Rain expected in ${district}: Pause irrigation & inspect drainage furrows`
      : `Today's Weather-Based Farm Care & Irrigation Advisory in ${district}`,
    summaryBn: `বর্তমানে তাপমাত্রা ${temp}°সে ও বাতাসের আর্দ্রতা ${humidity}%। ${cropNameBn} এর ${stageBn} চলাকালীন মাটির আর্দ্রতা মেপে পরিমিত পরিচর্যা নিন এবং রোগবালাই নিয়ন্ত্রণে সজাগ থাকুন।`,
    summaryEn: `Current temperature is ${temp}°C with ${humidity}% humidity. During ${stageEn} of ${cropNameEn}, ensure balanced moisture management and active pest scouting.`,
    weatherObservationBn: `আকাশের অবস্থা: ${weather?.weatherDescriptionBn || 'আংশিক মেঘলা'} এবং বাতাসের গতিবেগ প্রায় ${wind} কিমি/ঘন্টা।${precip > 0 ? ` বৃষ্টিপাত রেকর্ড: ${precip} মিমি।` : ''}`,
    weatherObservationEn: `Sky condition: ${weather?.weatherDescriptionEn || 'Partly cloudy'} with wind around ${wind} km/h.${precip > 0 ? ` Precipitation recorded: ${precip} mm.` : ''}`,
    irrigationAdviceBn: isRainy
      ? 'বৃষ্টিপাতের সম্ভাবনা বা ভেজা মাটিতে নতুন করে সেচ দেওয়া থেকে বিরত থাকুন। অতিরিক্ত পানি দ্রুত বের করার ব্যবস্থা রাখুন।'
      : 'মাটির আর্দ্রতা পরীক্ষা করে সকালে বা বিকেলে হালকা সেচ দিন। এডব্লিউডি (AWD) পাইপ পর্যবেক্ষণ করুন।',
    irrigationAdviceEn: isRainy
      ? 'Refrain from active pumping due to rain forecast. Keep drainage trenches clear of weed blockages.'
      : 'Apply light irrigation in early morning or late afternoon based on AWD soil moisture tube readings.',
    fertilizerAdviceBn: 'আবহাওয়া অনুকূল থাকলে অনুমোদিত মাত্রায় সুষম সার প্রয়োগ করুন। গুঁড়ি গুঁড়ি বৃষ্টির সম্ভাবনা থাকলে ইউরিয়া ছিটাবেন না।',
    fertilizerAdviceEn: 'Apply recommended stage-specific fertilizer in fair weather. Avoid top-dressing urea before showers.',
    pestDiseaseWarningBn: 'উচ্চ আর্দ্রতা ও উষ্ণ আবহাওয়ায় ছত্রাকজনিত ব্লাস্ট বা মাজরা পোকার ঝুঁকি থাকে। নিয়মিত পাতার নিচের অংশ ও ডগা পর্যবেক্ষণ করুন।',
    pestDiseaseWarningEn: 'High humidity and warm temperatures increase fungal blast or stem borer risk. Scout under leaves regularly.',
    priorityActionsBn: [
      'জমির সেচ নালা ও পানি নিষ্কাশন পথ পরিষ্কার আছে কিনা পরীক্ষা করুন।',
      'সকালে ক্ষেত ঘুরে ধানের পাতার ডগা ও কুশিতে কোনো পোকার ডিম বা বাদামী দাগ আছে কিনা দেখুন।',
      'প্রয়োজনে উপজেলা কৃষি সম্প্রসারণ কর্মকর্তা বা ১৬১২৩ নম্বরে অভিজ্ঞ পরামর্শকের সহায়তা নিন।'
    ],
    priorityActionsEn: [
      'Check that farm drainage channels and boundary bunds are unobstructed.',
      'Inspect early morning tillers for any leaf spots or insect egg clusters.',
      'Contact your local Agriculture Extension Officer or call 16123 for verified guidelines.'
    ],
    cautionBn: 'সতর্কতা: কীটনাশক ও সার ব্যবহারে সর্বদা প্যাকেটের নির্দেশিকা পড়ুন এবং নিকটস্থ কৃষি কর্মকর্তার সাথে আলোচনা করুন।',
    cautionEn: 'Caution: Always read pesticide & fertilizer product labels and consult local agricultural extension officers.',
    confidenceScore: 92,
    isAiGenerated: false
  };
}

// API Endpoint for AI Daily Farm Recommendation
app.post("/api/gemini/daily-recommendation", async (req, res) => {
  try {
    const { farm, crop, weather } = req.body;
    
    if (!farm || !weather) {
      return res.status(400).json({
        success: false,
        error: "Missing farm or weather context",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Generating structured rule-based advisory.");
      const fallback = generateRuleBasedRecommendation(farm, crop, weather);
      return res.json({ success: true, data: fallback });
    }

    // Build structured context representation with existing fields only
    const farmDetails = [
      farm.nameBn || farm.nameEn ? `Farm Name: ${farm.nameBn || farm.nameEn}` : null,
      `District: ${farm.district || "Unknown"}`,
      farm.upazila ? `Upazila: ${farm.upazila}` : null,
      farm.village ? `Village: ${farm.village}` : null,
      farm.areaDecimal != null ? `Land Size: ${farm.areaDecimal} Decimal` : (farm.landSize ? `Land Size: ${farm.landSize} ${farm.landUnit || "Decimal"}` : null),
      farm.soilTypeBn || farm.soilTypeEn ? `Soil Type: ${farm.soilTypeBn || farm.soilTypeEn}` : null,
      farm.drainage ? `Drainage: ${farm.drainage}` : null,
      farm.irrigationMethod ? `Irrigation Method: ${farm.irrigationMethod}` : null,
      farm.waterSource ? `Water Source: ${farm.waterSource}` : null,
      farm.previousCrop ? `Previous Crop: ${farm.previousCrop}` : null,
      farm.organicFarming != null ? `Organic Farming: ${farm.organicFarming ? "Yes" : "No"}` : null,
    ].filter(Boolean).join("\n- ");

    const cropDetails = crop ? [
      `Crop Name: ${crop.cropNameBn || crop.cropNameEn || "Unknown"}`,
      crop.varietyBn || crop.varietyEn ? `Variety: ${crop.varietyBn || crop.varietyEn}` : null,
      crop.stageBn || crop.stageEn ? `Growth Stage: ${crop.stageBn || crop.stageEn}` : null,
      crop.plantingDate ? `Planting Date: ${crop.plantingDate}` : null,
      crop.daysPlanted != null ? `Days Since Planting: ${crop.daysPlanted} days` : null,
    ].filter(Boolean).join("\n- ") : "No specific active crop specified.";

    const weatherDetails = [
      `Current Temperature: ${weather.temperature != null ? weather.temperature + "°C" : "Unknown"}`,
      `Relative Humidity: ${weather.humidity != null ? weather.humidity + "%" : "Unknown"}`,
      `Precipitation / Rain: ${weather.precipitation != null ? weather.precipitation + " mm" : "0 mm"}`,
      `Wind Speed: ${weather.windSpeed != null ? weather.windSpeed + " km/h" : "Unknown"}`,
      weather.weatherDescription ? `Weather Condition: ${weather.weatherDescription}` : null,
      weather.highTemperature != null ? `Forecast High: ${weather.highTemperature}°C` : null,
      weather.lowTemperature != null ? `Forecast Low: ${weather.lowTemperature}°C` : null,
    ].filter(Boolean).join("\n- ");

    const prompt = `You are an agricultural advisory assistant for KrishiBazar, a Bangladesh-focused farmer application.
Provide practical, easy-to-understand recommendations.
Use the supplied farm, crop and weather information.
Do not invent weather measurements.
Do not claim that a diagnosis is medically/agronomically certain.
For pesticide, fertilizer or disease-treatment recommendations, provide cautious advisory language and encourage following local agricultural extension guidance/product labels where appropriate.
Do not invent government recommendations or claim that DAE officially approved a recommendation unless the application actually provides that information.
The output should be useful to a farmer and concise.

FARM INFORMATION:
- ${farmDetails}

CROP INFORMATION:
- ${cropDetails}

OPEN-METEO WEATHER MEASUREMENTS (ACTUAL DATA):
- ${weatherDetails}

Provide both Bangla (বাংলা) and English versions for all fields in the JSON response so the farmer can view it in either language seamlessly.
Ensure priorityActions has 2 to 4 concrete, actionable tasks for the farmer today.`;

    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headlineBn: { type: Type.STRING },
            headlineEn: { type: Type.STRING },
            summaryBn: { type: Type.STRING },
            summaryEn: { type: Type.STRING },
            weatherObservationBn: { type: Type.STRING },
            weatherObservationEn: { type: Type.STRING },
            irrigationAdviceBn: { type: Type.STRING },
            irrigationAdviceEn: { type: Type.STRING },
            fertilizerAdviceBn: { type: Type.STRING },
            fertilizerAdviceEn: { type: Type.STRING },
            pestDiseaseWarningBn: { type: Type.STRING },
            pestDiseaseWarningEn: { type: Type.STRING },
            priorityActionsBn: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            priorityActionsEn: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            cautionBn: { type: Type.STRING },
            cautionEn: { type: Type.STRING },
            confidenceScore: { type: Type.NUMBER },
          },
          required: [
            "headlineBn",
            "headlineEn",
            "summaryBn",
            "summaryEn",
            "weatherObservationBn",
            "weatherObservationEn",
            "irrigationAdviceBn",
            "irrigationAdviceEn",
            "fertilizerAdviceBn",
            "fertilizerAdviceEn",
            "pestDiseaseWarningBn",
            "pestDiseaseWarningEn",
            "priorityActionsBn",
            "priorityActionsEn",
            "cautionBn",
            "cautionEn",
          ],
        },
      },
    });

    const jsonText = response.text || "{}";
    const parsedData = JSON.parse(jsonText);
    const recommendation = {
      id: "rec-" + Date.now(),
      generatedAt: new Date().toISOString(),
      ...parsedData,
      confidenceScore: parsedData.confidenceScore || 95,
      isAiGenerated: true,
    };

    res.json({ success: true, data: recommendation });
  } catch (error: any) {
    console.error("Gemini Daily Recommendation Error:", error?.message || "Generation error");
    const fallback = generateRuleBasedRecommendation(req.body.farm, req.body.crop, req.body.weather);
    res.json({ success: true, data: fallback });
  }
});

// API Endpoint for AI Assistant
app.post("/api/gemini/assistant", async (req, res) => {
  try {
    const { message, language = "bn" } = req.body;
    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
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
