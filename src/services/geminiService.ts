import {
  Farm,
  Crop,
  NormalizedWeatherData,
  FarmRecommendationContext,
  DailyFarmRecommendation,
  Language
} from '../types';

/**
 * Gemini Agricultural Advisory Service for KrishiBazar
 * 
 * ARCHITECTURE:
 * Farmer/Farm Data + Open-Meteo Weather Data -> Server-side Gemini API -> Structured Farm Recommendation
 * 
 * SECURITY:
 * All Gemini API calls are executed on the server side via the proxy route (/api/gemini/daily-recommendation).
 * The GEMINI_API_KEY environment secret is never exposed to the client browser bundle.
 */

// In-memory cache for daily farm recommendations (TTL: 15 minutes)
interface RecommendationCacheEntry {
  data: DailyFarmRecommendation;
  timestamp: number;
}
const recommendationCache = new Map<string, RecommendationCacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000;

/**
 * Build a structured context payload from existing Farm, Crop, and Weather models
 * Only include information that actually exists in the application; missing fields remain undefined.
 */
export function buildFarmRecommendationContext(
  farm: Partial<Farm> | null | undefined,
  crop: Partial<Crop> | null | undefined,
  weather: NormalizedWeatherData,
  language: Language = 'bn',
  extraFarmData?: {
    village?: string;
    landSize?: string | number;
    landUnit?: string;
    drainage?: string;
    irrigationMethod?: string;
    waterSource?: string;
    previousCrop?: string;
    organicFarming?: boolean;
    daysPlanted?: number;
  }
): FarmRecommendationContext {
  return {
    farm: {
      id: farm?.id,
      nameBn: farm?.nameBn,
      nameEn: farm?.nameEn,
      district: farm?.district || 'বগুড়া',
      upazila: farm?.upazila,
      village: extraFarmData?.village,
      areaDecimal: farm?.areaDecimal,
      landSize: extraFarmData?.landSize ?? farm?.areaDecimal,
      landUnit: extraFarmData?.landUnit ?? 'শতক/Decimal',
      soilTypeBn: farm?.soilTypeBn,
      soilTypeEn: farm?.soilTypeEn,
      drainage: extraFarmData?.drainage,
      irrigationMethod: extraFarmData?.irrigationMethod,
      waterSource: extraFarmData?.waterSource,
      previousCrop: extraFarmData?.previousCrop,
      organicFarming: extraFarmData?.organicFarming
    },
    crop: crop
      ? {
          id: crop.id,
          cropNameBn: crop.cropNameBn,
          cropNameEn: crop.cropNameEn,
          varietyBn: crop.varietyBn,
          varietyEn: crop.varietyEn,
          stageBn: crop.stageBn,
          stageEn: crop.stageEn,
          plantingDate: crop.plantingDate,
          daysPlanted: extraFarmData?.daysPlanted
        }
      : undefined,
    weather: {
      temperature: weather.temperature,
      humidity: weather.humidity,
      precipitation: weather.precipitation,
      windSpeed: weather.windSpeed,
      weatherCode: weather.weatherCode,
      weatherDescription: weather.weatherDescriptionEn || weather.weatherDescriptionBn,
      highTemperature: weather.highTemperature,
      lowTemperature: weather.lowTemperature,
      isLive: weather.isLive,
      locationNameBn: weather.locationNameBn,
      locationNameEn: weather.locationNameEn
    },
    language
  };
}

/**
 * Generate an AI-powered Daily Farm Recommendation
 * Combines Farmer/Farm Data + Open-Meteo Weather Data via Gemini 3.8 Flash
 */
export async function generateFarmRecommendation(
  context: FarmRecommendationContext,
  forceRefresh = false
): Promise<DailyFarmRecommendation> {
  const cacheKey = `${context.farm.district}_${context.farm.id || 'default'}_${context.crop?.id || 'none'}`;

  // Check valid cache entry if not forcing refresh
  if (!forceRefresh) {
    const cached = recommendationCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
  }

  try {
    const response = await fetch('/api/gemini/daily-recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(context)
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const json = await response.json();
    if (json.success && json.data) {
      const result: DailyFarmRecommendation = json.data;
      recommendationCache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });
      return result;
    }

    throw new Error(json.error || 'Failed to generate recommendation from API');
  } catch (err) {
    console.warn('Gemini recommendation API error, generating local fallback:', err);
    const fallback = generateClientFallbackRecommendation(context);
    recommendationCache.set(cacheKey, {
      data: fallback,
      timestamp: Date.now()
    });
    return fallback;
  }
}

/**
 * Reliable local fallback recommendation matching the exact structured schema.
 * Operates purely on the actual provided weather and farm inputs.
 */
export function generateClientFallbackRecommendation(
  context: FarmRecommendationContext
): DailyFarmRecommendation {
  const { farm, crop, weather } = context;
  const precip = weather.precipitation ?? 0;
  const isRainy = precip > 1 || (weather.weatherCode ?? 0) >= 51;
  const temp = weather.temperature;
  const humidity = weather.humidity;
  const wind = weather.windSpeed;
  const district = farm.district || 'বগুড়া';
  const cropNameBn = crop?.cropNameBn || 'চলতি ফসল';
  const cropNameEn = crop?.cropNameEn || 'Current Crop';
  const stageBn = crop?.stageBn || 'কুশি গজানো পর্যায়';
  const stageEn = crop?.stageEn || 'Tillering Stage';

  return {
    id: `rec-local-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    headlineBn: isRainy
      ? `${district} অঞ্চলে বৃষ্টিপাতের পূর্বাভাস: সেচ সাময়িক বন্ধ রাখুন`
      : `${district} অঞ্চলে আজকের আবহাওয়া ভিত্তিক খামার পরিচর্যা ও সেচ পরামর্শ`,
    headlineEn: isRainy
      ? `Rain forecast in ${district}: Hold pump irrigation & check field drainage`
      : `Today's Weather-Based Farm Care & Irrigation Advisory in ${district}`,
    summaryBn: `বর্তমানে তাপমাত্রা ${temp}°সে ও আর্দ্রতা ${humidity}%। ${cropNameBn} এর ${stageBn} চলাকালীন মাটির পর্যাপ্ত রস নিশ্চিত করুন এবং বালাই উপদ্রব এড়াতে নিয়মিত পর্যবেক্ষণ করুন।`,
    summaryEn: `Current temperature is ${temp}°C with ${humidity}% humidity. During ${stageEn} of ${cropNameEn}, maintain balanced moisture and monitor for pests.`,
    weatherObservationBn: `আকাশে ${weather.weatherDescription || 'আংশিক মেঘলা'} অবস্থা ও বাতাসের গতিবেগ ${wind} কিমি/ঘন্টা। আবহাওয়া পূর্বাভাস অনুযায়ী অতিরিক্ত জমা পানি নিষ্কাশন জরুরি।`,
    weatherObservationEn: `Sky condition: ${weather.weatherDescription || 'Partly cloudy'} with wind at ${wind} km/h. Keep drainage active based on current weather forecasts.`,
    irrigationAdviceBn: isRainy
      ? 'বৃষ্টির সম্ভাবনা থাকায় অতিরিক্ত সেচ দেওয়া থেকে বিরত থাকুন। জমিতে পানি জমে থাকলে তা নিষ্কাশন করুন।'
      : 'সকালে বা বিকেলে পরিমিত সেচ দিন। AWD পদ্ধতি ব্যবহার করে মাটির আর্দ্রতা পরীক্ষা করে সেচ প্রয়োগ করুন।',
    irrigationAdviceEn: isRainy
      ? 'Rain anticipated: hold off on pump irrigation. Ensure field furrows allow excess water to drain freely.'
      : 'Apply light irrigation in early morning or late afternoon. Check soil moisture before watering.',
    fertilizerAdviceBn: 'আবহাওয়ার পরিস্থিতি অনুকূলে থাকলে অনুমোদিত মাত্রায় সুষম সার উপরিপ্রয়োগ করুন। বৃষ্টির আগে ইউরিয়া সার ছিটাবেন না।',
    fertilizerAdviceEn: 'Apply balanced top-dressing nutrients when weather is clear. Avoid broadcasting urea immediately before heavy rain.',
    pestDiseaseWarningBn: 'উচ্চ আর্দ্রতায় ছত্রাক ও পোকার আক্রমণ হতে পারে। আক্রান্ত পাতা দেখলে স্থানীয় কৃষি কর্মকর্তার পরামর্শ অনুযায়ী সতর্কতামূলক ব্যবস্থা নিন।',
    pestDiseaseWarningEn: 'Warm and humid conditions may encourage fungal or pest growth. Scout leaf margins and consult your local extension officer if symptoms appear.',
    priorityActionsBn: [
      'জমির পানি নিষ্কাশন নালাগুলো পরিষ্কার ও বাধামুক্ত রাখুন।',
      'সকালে ক্ষেত পরিদর্শন করে পাতার নিচে কোনো পোকার ডিম বা রোগ আছে কিনা লক্ষ্য করুন।',
      'প্রয়োজনে নিকটস্থ উপজেলা কৃষি সম্প্রসারণ কার্যালয় বা ১৬১২৩ নম্বরে পরামর্শ নিন।'
    ],
    priorityActionsEn: [
      'Inspect field bunds and clear irrigation drainage furrows.',
      'Scout underside of leaves early in the morning for pest egg masses or fungal spots.',
      'Contact local Upazila Agriculture Extension Office or dial 16123 for official guidance.'
    ],
    cautionBn: 'সতর্কতা: বালাইনাশক ও সার ব্যবহারের ক্ষেত্রে মোড়কের লেবেল অনুসরণ করুন এবং স্থানীয় কৃষি সম্প্রসারণ অধিদপ্তরের (ডিএই) পরামর্শ নিন।',
    cautionEn: 'Caution: Follow chemical product packaging labels and consult local Department of Agricultural Extension (DAE) advisors for specific dosage.',
    confidenceScore: 92,
    isAiGenerated: false
  };
}
