export type Language = 'bn' | 'en';

export interface FarmerProfile {
  name: string;
  phone: string;
  district: string;
  upazila: string;
  village: string;
  farmSizeDecimal: number; // in decimal / শতক
  primaryCrops: string[];
  avatarUrl?: string;
  isVerified: boolean;
}

export interface Farm {
  id: string;
  nameBn: string;
  nameEn: string;
  district: string;
  upazila: string;
  areaDecimal: number;
  soilTypeBn: string;
  soilTypeEn: string;
  cropsCount: number;
  healthScore: number;
  imageUrl: string;
  latitude?: number;
  longitude?: number;
}

export interface OpenMeteoCurrent {
  time: string;
  interval?: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface OpenMeteoDaily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
}

export interface OpenMeteoApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone: string;
  timezone_abbreviation?: string;
  elevation?: number;
  current_units?: Record<string, string>;
  current: OpenMeteoCurrent;
  daily_units?: Record<string, string>;
  daily: OpenMeteoDaily;
}

export interface DailyForecastItem {
  date: string;
  weatherCode: number;
  weatherDescriptionEn: string;
  weatherDescriptionBn: string;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
}

export interface NormalizedWeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
  weatherDescription: string;
  weatherDescriptionEn: string;
  weatherDescriptionBn: string;
  highTemperature: number;
  lowTemperature: number;
  dailyForecast: DailyForecastItem[];
  latitude: number;
  longitude: number;
  locationNameEn?: string;
  locationNameBn?: string;
  isLive: boolean;
  lastUpdated: string;
}

export interface Crop {
  id: string;
  farmId: string;
  cropNameBn: string;
  cropNameEn: string;
  varietyBn: string;
  varietyEn: string;
  plantingDate: string;
  expectedHarvestDate: string;
  areaDecimal: number;
  stageBn: string;
  stageEn: string;
  status: 'healthy' | 'warning' | 'critical';
  imageUrl: string;
}

export interface DiseaseAnalysisResult {
  id: string;
  cropNameBn: string;
  cropNameEn: string;
  imageBase64: string;
  timestamp: string;
  diseaseDetected: boolean;
  diseaseNameBn: string;
  diseaseNameEn: string;
  confidenceScore: number;
  severity: 'Healthy' | 'Low' | 'Medium' | 'High' | 'Critical';
  symptomsBn: string[];
  symptomsEn: string[];
  organicTreatmentBn: string[];
  organicTreatmentEn: string[];
  chemicalTreatmentBn: string[];
  chemicalTreatmentEn: string[];
  preventiveMeasuresBn: string[];
  preventiveMeasuresEn: string[];
  expertAdviceBn: string;
  expertAdviceEn: string;
}

export interface CropCalendarTask {
  id: string;
  cropId: string;
  cropNameBn: string;
  cropNameEn: string;
  dayNumber: number;
  weekNumber: number;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  category: 'soil_prep' | 'seedling' | 'watering' | 'fertilizer' | 'pest_control' | 'harvesting';
  completed: boolean;
  dueDate: string;
  weatherWarningBn?: string;
  weatherWarningEn?: string;
}

export interface MarketPrice {
  id: string;
  commodityBn: string;
  commodityEn: string;
  category: 'cereal' | 'vegetable' | 'fruit' | 'spice';
  pricePerMon: number; // 40 kg (মন)
  pricePerKg: number;
  marketNameBn: string;
  marketNameEn: string;
  district: string;
  trend: 'up' | 'down' | 'stable';
  changeAmount: number;
  lastUpdated: string;
}

export interface MarketplaceProduct {
  id: string;
  titleBn: string;
  titleEn: string;
  sellerName: string;
  sellerPhone: string;
  locationBn: string;
  locationEn: string;
  pricePerKg: number;
  totalQuantityKg: number;
  categoryBn: string;
  categoryEn: string;
  imageUrl: string;
  isVerifiedFarmer: boolean;
}

export interface FarmRecommendationContext {
  farm: {
    id?: string;
    nameBn?: string;
    nameEn?: string;
    district: string;
    upazila?: string;
    village?: string;
    areaDecimal?: number;
    landSize?: string | number;
    landUnit?: string;
    soilTypeBn?: string;
    soilTypeEn?: string;
    drainage?: string;
    irrigationMethod?: string;
    waterSource?: string;
    previousCrop?: string;
    organicFarming?: boolean;
  };
  crop?: {
    id?: string;
    cropNameBn?: string;
    cropNameEn?: string;
    varietyBn?: string;
    varietyEn?: string;
    stageBn?: string;
    stageEn?: string;
    plantingDate?: string;
    daysPlanted?: number;
  };
  weather: {
    temperature: number;
    humidity: number;
    precipitation: number;
    windSpeed: number;
    weatherCode?: number;
    weatherDescription?: string;
    highTemperature?: number;
    lowTemperature?: number;
    isLive?: boolean;
    locationNameBn?: string;
    locationNameEn?: string;
  };
  language?: Language;
}

export interface DailyFarmRecommendation {
  id: string;
  generatedAt: string;
  headlineBn: string;
  headlineEn: string;
  summaryBn: string;
  summaryEn: string;
  weatherObservationBn: string;
  weatherObservationEn: string;
  irrigationAdviceBn: string;
  irrigationAdviceEn: string;
  fertilizerAdviceBn: string;
  fertilizerAdviceEn: string;
  pestDiseaseWarningBn: string;
  pestDiseaseWarningEn: string;
  priorityActionsBn: string[];
  priorityActionsEn: string[];
  cautionBn: string;
  cautionEn: string;
  confidenceScore: number;
  isAiGenerated: boolean;
}

