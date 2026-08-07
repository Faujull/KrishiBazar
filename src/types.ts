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
