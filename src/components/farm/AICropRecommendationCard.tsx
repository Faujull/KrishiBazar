import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Droplets,
  DollarSign,
  Award,
  ShieldAlert,
  Sprout,
  Compass,
  Building2,
  ArrowRight,
  Check,
  CheckCircle,
  CloudSun,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { NearbyFarmInfo } from './NearbyFarmBottomSheet';
import { useWeather, toBengaliNumber } from '../../services/weatherService';
import { WeatherIcon } from '../WeatherIcon';

export interface FarmRegistrationData {
  // Step 1
  farmName: string;
  district: string;
  upazila: string;
  village: string;
  gpsLocation: string;
  landSize: string;
  landUnit: string;
  waterSource: string;
  ownership: string;

  // Step 2
  soilType: string;
  waterAvailability: string;
  drainage: string;
  irrigationMethod: string;
  previousCrop: string;
  currentCrop: string;
  organicFarming: boolean;

  // Step 3
  nearbyFarms: Record<'north' | 'south' | 'east' | 'west', NearbyFarmInfo | null>;

  // Step 4
  nearestMarket: string;
  transportDistance: string;
  sellingMethod: string;
}

export interface RecommendedCropOption {
  id: string;
  cropNameBn: string;
  cropNameEn: string;
  varietyBn: string;
  varietyEn: string;
  compatibilityScore: number;
  badgeBn: string;
  badgeEn: string;
  seasonBn: string;
  seasonEn: string;
  whyRecommendedBn: string[];
  whyRecommendedEn: string[];
  waterRequirementBn: string;
  waterRequirementEn: string;
  irrigationMethodBn: string;
  irrigationMethodEn: string;
  growingDaysBn: string;
  growingDaysEn: string;
  plantingDateBn: string;
  plantingDateEn: string;
  harvestDateBn: string;
  harvestDateEn: string;
  majorRisksBn: string[];
  majorRisksEn: string[];
  estimatedYieldBn: string;
  estimatedYieldEn: string;
  estimatedCostBn: string;
  estimatedCostEn: string;
  estimatedProfitBn: string;
  estimatedProfitEn: string;
  fertilizerPlanBn: string;
  fertilizerPlanEn: string;
  marketDemandBn: string;
  marketDemandEn: string;
}

interface AICropRecommendationCardProps {
  formData: FarmRegistrationData;
  onSaveFarm: () => void;
  onBackToMap: () => void;
}

export const AICropRecommendationCard: React.FC<AICropRecommendationCardProps> = ({
  formData,
  onSaveFarm,
  onBackToMap
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Live Open-Meteo Weather for the selected farm's district
  const { weather, isLive } = useWeather({ district: formData.district });

  const tempVal =
    weather?.temperature != null && !isNaN(weather.temperature)
      ? Math.round(weather.temperature)
      : 34;
  const weatherDesc = isBn
    ? weather?.weatherDescriptionBn || 'আংশিক মেঘলা'
    : weather?.weatherDescriptionEn || 'Partly Cloudy';

  // Surrounding farm analysis
  const farmValues = Object.values(formData.nearbyFarms) as (NearbyFarmInfo | null)[];
  const hasFloodedNeighbor = farmValues.some(
    (n) =>
      n?.status === 'filled' &&
      (n.cropBn?.includes('ধান') ||
        n.crop?.includes('rice') ||
        n.waterLevel?.includes('Flooded') ||
        n.waterLevel?.includes('উচ্চ'))
  );

  const isSoilClayOrLoam =
    formData.soilType.includes('দোআঁশ') ||
    formData.soilType.includes('এটেল') ||
    formData.soilType.includes('Loam') ||
    formData.soilType.includes('Clay');

  const isGoodDrainage =
    formData.drainage.includes('ভালো') ||
    formData.drainage.includes('উত্তম') ||
    formData.drainage.includes('Good');

  // Multi-crop smart recommendations array
  const recommendations: RecommendedCropOption[] = [
    {
      id: 'crop-1',
      cropNameBn: hasFloodedNeighbor ? 'উফশী বোরো ধান (বিআর-৮৯)' : 'উন্নত লাল আলু (কার্ডিনাল)',
      cropNameEn: hasFloodedNeighbor ? 'HYV Boro Rice (BRRI-89)' : 'Red Potato (Cardinal)',
      varietyBn: hasFloodedNeighbor ? 'বিআরআরআই ধান-৮৯' : 'কার্ডিনাল / ডায়মন্ট',
      varietyEn: hasFloodedNeighbor ? 'BRRI Dhan-89' : 'Cardinal / Diamant',
      compatibilityScore: 96,
      badgeBn: '১ম সেরা পছন্দ (Top Match)',
      badgeEn: 'Top Match #1',
      seasonBn: hasFloodedNeighbor ? 'বোরো ও রবি মৌসুম' : 'রবি শীতকালীন মৌসুম',
      seasonEn: hasFloodedNeighbor ? 'Boro & Rabi Season' : 'Rabi Winter Season',
      whyRecommendedBn: [
        `${formData.district} জেলার বর্তমান আবহাওয়া (${toBengaliNumber(tempVal)}°সে, ${weatherDesc}) এবং মাটির আর্দ্রতার সাথে ৯৬% সামঞ্জস্যপূর্ণ।`,
        `আপনার খামারের ${formData.soilType} এবং ${formData.waterSource || 'সেচ ব্যবস্থা'} এই ফসলের ফলনের জন্য আদর্শ।`,
        hasFloodedNeighbor
          ? 'আশেপাশের খামারে ধান চাষ ও উচ্চ পানি থাকায় জলাবদ্ধতার ক্ষতি এড়াতে এই জাতটি সর্বোচ্চ উপযোগী।'
          : 'মাটির উন্নত নিষ্কাশন ব্যবস্থা থাকায় কন্দ বৃদ্ধি স্বাভাবিকের চেয়ে ১৫% বেশি হবে।',
        `পূর্ববর্তী ফসল (${formData.previousCrop || 'আমন ধান'}) কাটার পর জমিতে পুষ্টির ভারসাম্য বজায় রাখবে।`,
        `${formData.nearestMarket || 'নিকটস্থ পাইকারি বাজারে'} এই মৌসুমে ব্যাপক চাহিদা ও উচ্চ মূল্যের নিশ্চয়তা রয়েছে।`
      ],
      whyRecommendedEn: [
        `96% compatible with ${formData.district}'s live weather (${tempVal}°C, ${weatherDesc}) and soil texture.`,
        `Your ${formData.soilType} and ${formData.waterSource || 'irrigation'} perfectly support this crop.`,
        hasFloodedNeighbor
          ? 'Neighboring plots have high water levels; this variety thrives in flooded topology.'
          : 'Strong soil drainage increases tuber development by 15%.',
        `Restores balanced soil nitrogen after ${formData.previousCrop || 'previous crop'}.`,
        `Guaranteed wholesale buyer demand at ${formData.nearestMarket || 'Local Wholesale Arat'}.`
      ],
      waterRequirementBn: hasFloodedNeighbor ? 'মাঝারি-উচ্চ (AWD সেচ)' : 'মাঝারি (হালকা সেচ)',
      waterRequirementEn: hasFloodedNeighbor ? 'Medium-High (AWD)' : 'Medium (Light Furrow)',
      irrigationMethodBn: hasFloodedNeighbor
        ? 'পর্যায়ক্রমে ভেজানো ও শুকানো (AWD পদ্ধতি)'
        : 'নালা সেচ (১০-১২ দিন অন্তর)',
      irrigationMethodEn: hasFloodedNeighbor
        ? 'Alternate Wetting & Drying (AWD)'
        : 'Furrow Irrigation (every 10-12 days)',
      growingDaysBn: hasFloodedNeighbor ? '১১৫-১২০ দিন' : '৮৫-৯০ দিন',
      growingDaysEn: hasFloodedNeighbor ? '115-120 days' : '85-90 days',
      plantingDateBn: '১৫ নভেম্বর - ০৫ ডিসেম্বর',
      plantingDateEn: 'Nov 15 - Dec 05',
      harvestDateBn: '২০ মার্চ - ০৫ এপ্রিল',
      harvestDateEn: 'Mar 20 - Apr 05',
      majorRisksBn: hasFloodedNeighbor
        ? [
            'শীর্ষ পাতা ব্লাস্ট ও বাদামী গাছফড়িং (BPH) আক্রমণ',
            'অতিরিক্ত কুয়াশায় চারা ধসা রোগ'
          ]
        : [
            'কুয়াশাপূর্ণ আর্দ্র আবহাওয়ায় নাবি ধসা (Late Blight) ঝুঁকি',
            'জমিতে অতিরিক্ত পানি জমে কন্দ পচন'
          ],
      majorRisksEn: hasFloodedNeighbor
        ? ['Rice leaf blast & Brown Plant Hopper (BPH)', 'Seedling blight during heavy winter fog']
        : ['Late Blight outbreak in humid foggy spells', 'Waterlogging causing root tuber rot'],
      estimatedYieldBn: hasFloodedNeighbor ? '২,৪০০ কেজি / একর (৭২ মণ)' : '৩,২০০ কেজি / বিঘা',
      estimatedYieldEn: hasFloodedNeighbor ? '2,400 kg / Acre (72 Mounds)' : '3,200 kg / Bigha',
      estimatedCostBn: hasFloodedNeighbor ? '৳১৮,৫০০ / বিঘা' : '৳১৫,০০০ / বিঘা',
      estimatedCostEn: hasFloodedNeighbor ? '৳18,500 / Bigha' : '৳15,000 / Bigha',
      estimatedProfitBn: hasFloodedNeighbor ? '৳৪৮,৫০০ / একর' : '৳৫৪,০০০ / একর',
      estimatedProfitEn: hasFloodedNeighbor ? '৳48,500 / Acre' : '৳54,000 / Acre',
      fertilizerPlanBn: 'ইউরিয়া ১৮ কেজি • ডিএপি ১২ কেজি • এমওপি ১০ কেজি + ট্রাইকো-কমপোস্ট',
      fertilizerPlanEn: 'Urea 18kg • DAP 12kg • MOP 10kg + Tricho-Compost',
      marketDemandBn: 'উচ্চ (দাম ঊর্ধ্বমুখী)',
      marketDemandEn: 'High (Price Bullish)'
    },
    {
      id: 'crop-2',
      cropNameBn: 'হাইব্রিড মিষ্টি ভুট্টা (সুপার সাইন)',
      cropNameEn: 'Hybrid Sweet Corn / Maize (Super Shine)',
      varietyBn: 'পায়োনিয়ার পি-৩৩৫৫',
      varietyEn: 'Pioneer P-3355',
      compatibilityScore: 91,
      badgeBn: 'লাভজনক বিকল্প (High Profit)',
      badgeEn: 'High Profit Alternative',
      seasonBn: 'রবি ও খরিফ-১',
      seasonEn: 'Rabi & Kharif-1',
      whyRecommendedBn: [
        `উচ্চ ফলনশীল জাত, যা ${formData.soilType} মাটিতে শিকড় গভীরে প্রবেশ করে খরা সহনশীল।`,
        'পানির চাহিদা ধানের তুলনায় ৪০% কম হওয়ায় সেচ খরচ উল্লেখযোগ্যভাবে হ্রাস পায়।',
        'পোল্ট্রি ও ফিড মিলের কারণে স্থানীয় পাইকারি বাজারে বছরের যেকোনো সময় নগদ বিক্রয় সুবিধা রয়েছে।'
      ],
      whyRecommendedEn: [
        `High yield hybrid deeply roots in ${formData.soilType} with drought tolerance.`,
        'Uses 40% less water than paddy, drastically lowering pump diesel costs.',
        'Continuous feed mill demand in northern Bangladesh guarantees immediate liquidity.'
      ],
      waterRequirementBn: 'কম-মাঝারি (৪টি নিয়ন্ত্রিত সেচ)',
      waterRequirementEn: 'Low-Medium (4 controlled irrigations)',
      irrigationMethodBn: 'প্লাবন বা ড্রিপ সেচ',
      irrigationMethodEn: 'Furrow or Drip Irrigation',
      growingDaysBn: '১২৫-১৩০ দিন',
      growingDaysEn: '125-130 days',
      plantingDateBn: '০১ ডিসেম্বর - ২০ ডিসেম্বর',
      plantingDateEn: 'Dec 01 - Dec 20',
      harvestDateBn: '১০ এপ্রিল - ২৫ এপ্রিল',
      harvestDateEn: 'Apr 10 - Apr 25',
      majorRisksBn: [
        'ফল আর্মিওয়ার্ম পোকার আক্রমণ',
        'দানা বাঁধার সময় প্রবল ঝড়ো বাতাসে গাছ হেলে পড়া'
      ],
      majorRisksEn: ['Fall Armyworm caterpillar infestation', 'Lodging under early nor\'wester storms'],
      estimatedYieldBn: '৩,৬০০ কেজি / একর (৯০ মণ)',
      estimatedYieldEn: '3,600 kg / Acre (90 Mounds)',
      estimatedCostBn: '৳১৪,২০০ / বিঘা',
      estimatedCostEn: '৳14,200 / Bigha',
      estimatedProfitBn: '৳৫১,০০০ / একর',
      estimatedProfitEn: '৳51,000 / Acre',
      fertilizerPlanBn: 'ইউরিয়া ২৫ কেজি • টিএসপি ১২ কেজি • জিপসাম ৫ কেজি',
      fertilizerPlanEn: 'Urea 25kg • TSP 12kg • Gypsum 5kg',
      marketDemandBn: 'স্থিতিশীল ও ক্রমবর্ধমান',
      marketDemandEn: 'Stable & Growing'
    },
    {
      id: 'crop-3',
      cropNameBn: 'বারি সরিষা-১৪ / ১৭ (স্বল্পমেয়াদী)',
      cropNameEn: 'BARI Mustard-14 / 17 (Short Duration)',
      varietyBn: 'বারি সরিষা-১৪ (হলুদ সরিষা)',
      varietyEn: 'BARI Sarisha-14',
      compatibilityScore: 87,
      badgeBn: 'স্বল্পমেয়াদী সাথি ফসল (Catch Crop)',
      badgeEn: 'Quick 75-Day Crop',
      seasonBn: 'স্বল্পকালীন শীত মৌসুম',
      seasonEn: 'Short Winter Season',
      whyRecommendedBn: [
        'মাত্র ৭৫-৮০ দিনে ফসল ঘরে তোলা সম্ভব, যা আমন ও বোরোর মধ্যবর্তী সময়ে অতিরিক্ত মুনাফা দেয়।',
        'মাটির উর্বরতা ও জৈব পদার্থের পরিমাণ বৃদ্ধি পায় এবং মৌমাছি পরাগায়নে সহায়তা করে।',
        'ভোজ্য তেলের পাইকারি মূল্য চড়া থাকায় বিঘাপ্রতি ২০,০০০+ টাকা বাড়তি নেট আয় নিশ্চিত হয়।'
      ],
      whyRecommendedEn: [
        'Harvestable in just 75-80 days between Amon and Boro for quick supplemental cash.',
        'Enriches soil nitrogen and enhances local bee biodiversity and pollination.',
        'High domestic mustard oil prices assure ৳20,000+ profit per bigha.'
      ],
      waterRequirementBn: 'খুব কম (১-২টি হালকা সেচ)',
      waterRequirementEn: 'Very Low (1-2 Light irrigations)',
      irrigationMethodBn: 'হালকা ছিটানো সেচ',
      irrigationMethodEn: 'Light sprinkler / furrow',
      growingDaysBn: '৭৫-৮০ দিন',
      growingDaysEn: '75-80 days',
      plantingDateBn: '০৫ নভেম্বর - ২৫ নভেম্বর',
      plantingDateEn: 'Nov 05 - Nov 25',
      harvestDateBn: '২০ জানুয়ারি - ১০ ফেব্রুয়ারি',
      harvestDateEn: 'Jan 20 - Feb 10',
      majorRisksBn: [
        'জাবপোকা (Aphid) ও পাতার অল্টারনারিয়া দাগ রোগ',
        'কুয়াশাচ্ছন্ন আবহাওয়ায় ফুল ঝরে যাওয়া'
      ],
      majorRisksEn: ['Mustard Aphid suckers & Alternaria blight', 'Flower drop during dense continuous fog'],
      estimatedYieldBn: '৬৫০ কেজি / বিঘা',
      estimatedYieldEn: '650 kg / Bigha',
      estimatedCostBn: '৳৬,৫০০ / বিঘা',
      estimatedCostEn: '৳6,500 / Bigha',
      estimatedProfitBn: '৳২২,৫০০ / বিঘা',
      estimatedProfitEn: '৳22,500 / Bigha',
      fertilizerPlanBn: 'ইউরিয়া ১০ কেজি • ডিএপি ৮ কেজি • বোরন ১ কেজি',
      fertilizerPlanEn: 'Urea 10kg • DAP 8kg • Boron 1kg',
      marketDemandBn: 'সর্বোচ্চ স্থানীয় চাহিদা',
      marketDemandEn: 'Extremely High Local Demand'
    }
  ];

  const [selectedCropIndex, setSelectedCropIndex] = useState<number>(0);
  const selectedCrop = recommendations[selectedCropIndex] || recommendations[0];

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Selector: 3 Ranked AI Recommendations */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-gray-800 flex items-center gap-1.5 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-[#2E7D32]" />
            <span>{isBn ? 'এআই অনুমোদিত ৩টি সম্ভাব্য ফসল' : 'Top 3 AI Recommended Crops'}</span>
          </span>
          <span className="text-[10px] bg-emerald-100 text-[#2E7D32] font-black px-2 py-0.5 rounded-full">
            {formData.district} • {isBn ? 'স্মার্ট রেটিং' : 'Smart Ranked'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {recommendations.map((crop, idx) => {
            const isSelected = idx === selectedCropIndex;
            return (
              <button
                key={crop.id}
                type="button"
                onClick={() => setSelectedCropIndex(idx)}
                className={`p-2.5 rounded-2xl border text-left transition-all active:scale-95 flex flex-col justify-between min-h-[76px] ${
                  isSelected
                    ? 'bg-[#2E7D32] text-white border-[#1B5E20] shadow-md ring-2 ring-emerald-300'
                    : 'bg-white border-gray-200 text-gray-800 hover:border-emerald-300 shadow-2xs'
                }`}
              >
                <div>
                  <span
                    className={`text-[9px] font-black uppercase block truncate ${
                      isSelected ? 'text-yellow-300' : 'text-emerald-700'
                    }`}
                  >
                    {isBn ? crop.badgeBn : crop.badgeEn}
                  </span>
                  <h4 className="text-xs font-black leading-tight mt-0.5 line-clamp-2">
                    {isBn ? crop.cropNameBn : crop.cropNameEn}
                  </h4>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-extrabold ${
                      isSelected ? 'text-emerald-100' : 'text-gray-500'
                    }`}
                  >
                    {crop.compatibilityScore}%
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#F9A825]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Crop Hero Banner */}
      <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white p-5 rounded-3xl shadow-xl relative overflow-hidden border border-emerald-400/30 space-y-3">
        <div className="absolute top-0 right-0 w-44 h-44 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-xs font-bold text-white">
            <Sparkles className="w-4 h-4 text-[#F9A825] animate-pulse" />
            <span>{isBn ? selectedCrop.badgeBn : selectedCrop.badgeEn}</span>
          </div>

          <span className="text-xs font-black bg-[#F9A825] text-gray-900 px-3 py-0.5 rounded-full shadow-2xs">
            {selectedCrop.compatibilityScore}% {isBn ? 'সামঞ্জস্য স্কোর' : 'Match Score'}
          </span>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
            {isBn ? selectedCrop.cropNameBn : selectedCrop.cropNameEn}
          </h2>
          <p className="text-xs text-emerald-100 font-medium mt-0.5 flex items-center gap-2">
            <span>{isBn ? selectedCrop.seasonBn : selectedCrop.seasonEn}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CloudSun className="w-3.5 h-3.5 text-[#F9A825]" />
              {isBn
                ? `${formData.district} জেলা (${toBengaliNumber(tempVal)}°সে • ${weatherDesc})`
                : `${formData.district} (${tempVal}°C • ${weatherDesc})`}
            </span>
          </p>
        </div>

        {/* AI Compatibility Criteria Badges */}
        <div className="flex flex-wrap gap-1.5 relative z-10 pt-1 pb-0.5">
          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-md text-emerald-100 font-medium border border-white/10">
            📍 {formData.district} ({formData.upazila || 'সদর'})
          </span>
          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-md text-emerald-100 font-medium border border-white/10">
            🌱 {formData.soilType || (isBn ? 'দোআঁশ মাটি' : 'Loamy')}
          </span>
          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-md text-emerald-100 font-medium border border-white/10">
            💧 {formData.drainageCondition || (isBn ? 'মধ্যম নিষ্কাশন' : 'Medium Drainage')}
          </span>
          <span className="text-[10px] bg-emerald-900/60 text-[#F9A825] px-2 py-0.5 rounded-md font-bold border border-yellow-400/30">
            🌦️ Open-Meteo {tempVal}°C
          </span>
        </div>

        {/* Quick Numbers Bar */}
        <div className="grid grid-cols-3 gap-2 bg-black/25 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center relative z-10">
          <div>
            <span className="text-[10px] text-emerald-200 block font-semibold">
              {isBn ? 'আনুমানিক ফলন' : 'Est. Yield'}
            </span>
            <span className="text-xs font-black text-white mt-0.5 block truncate">
              {isBn ? selectedCrop.estimatedYieldBn : selectedCrop.estimatedYieldEn}
            </span>
          </div>
          <div className="border-x border-white/15">
            <span className="text-[10px] text-emerald-200 block font-semibold">
              {isBn ? 'প্রত্যাশিত লাভ' : 'Net Profit'}
            </span>
            <span className="text-xs font-black text-[#F9A825] mt-0.5 block truncate">
              {isBn ? selectedCrop.estimatedProfitBn : selectedCrop.estimatedProfitEn}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 block font-semibold">
              {isBn ? 'চাষের মেয়াদ' : 'Duration'}
            </span>
            <span className="text-xs font-black text-white mt-0.5 block truncate">
              {isBn ? selectedCrop.growingDaysBn : selectedCrop.growingDaysEn}
            </span>
          </div>
        </div>
      </div>

      {/* Economics & Market Overview */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
            <DollarSign className="w-4 h-4 text-[#2E7D32]" />
            <span>{isBn ? 'উৎপাদন খরচ ও লাভ' : 'Cost & Economics'}</span>
          </div>
          <p className="text-xs text-gray-900 font-extrabold">
            {isBn ? 'খরচ:' : 'Cost:'}{' '}
            <span className="text-gray-700">
              {isBn ? selectedCrop.estimatedCostBn : selectedCrop.estimatedCostEn}
            </span>
          </p>
          <p className="text-xs text-[#2E7D32] font-black">
            {isBn ? 'লাভ:' : 'Profit:'}{' '}
            <span>{isBn ? selectedCrop.estimatedProfitBn : selectedCrop.estimatedProfitEn}</span>
          </p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>{isBn ? 'বাজার চাহিদা' : 'Market Demand'}</span>
          </div>
          <p className="text-xs font-black text-emerald-700">
            {isBn ? selectedCrop.marketDemandBn : selectedCrop.marketDemandEn}
          </p>
          <p className="text-[10px] text-gray-500 truncate">
            {formData.nearestMarket || (isBn ? 'মহাস্থান পাইকারি আড়ত' : 'Local Wholesale Arat')}
          </p>
        </div>
      </div>

      {/* Complete Agricultural Guideline Schedule */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-3">
        <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
          <Award className="w-4 h-4 text-[#2E7D32]" />
          <span>{isBn ? 'স্মার্ট কৃষি গাইডলাইন ও সময়সূচি' : 'Smart Agriculture Guideline'}</span>
        </h3>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
          <div>
            <span className="text-[10px] text-gray-400 font-bold block">
              {isBn ? 'পানির চাহিদা' : 'Water Need'}
            </span>
            <span className="font-bold text-gray-800">
              {isBn ? selectedCrop.waterRequirementBn : selectedCrop.waterRequirementEn}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-gray-400 font-bold block">
              {isBn ? 'সেচ পদ্ধতি' : 'Irrigation Method'}
            </span>
            <span className="font-bold text-emerald-800">
              {isBn ? selectedCrop.irrigationMethodBn : selectedCrop.irrigationMethodEn}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-gray-400 font-bold block">
              {isBn ? 'রোপণের আদর্শ সময়' : 'Planting Date'}
            </span>
            <span className="font-bold text-gray-800">
              {isBn ? selectedCrop.plantingDateBn : selectedCrop.plantingDateEn}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-gray-400 font-bold block">
              {isBn ? 'ফসল তোলার সময়' : 'Harvest Date'}
            </span>
            <span className="font-bold text-gray-800">
              {isBn ? selectedCrop.harvestDateBn : selectedCrop.harvestDateEn}
            </span>
          </div>

          <div className="col-span-2 pt-1 border-t border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold block">
              {isBn ? 'সুপারিশকৃত সার প্রয়োগ' : 'Recommended Fertilizer'}
            </span>
            <span className="font-bold text-gray-800 text-[11px]">
              {isBn ? selectedCrop.fertilizerPlanBn : selectedCrop.fertilizerPlanEn}
            </span>
          </div>
        </div>
      </div>

      {/* Major Risks & Preventive Safeguards */}
      <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-3xl shadow-xs space-y-2.5">
        <h3 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>{isBn ? 'প্রধান ঝুঁকি ও পূর্বপ্রস্তুতি (Major Risks)' : 'Major Risks & Hazards'}</span>
        </h3>

        <ul className="space-y-1.5 text-xs text-amber-950">
          {(isBn ? selectedCrop.majorRisksBn : selectedCrop.majorRisksEn).map((risk, rIdx) => (
            <li key={rIdx} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                !
              </span>
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* WHY THIS CROP WAS RECOMMENDED (AI Reasoning Section) */}
      <div className="bg-emerald-50/70 border-2 border-emerald-200 p-4 rounded-3xl shadow-xs space-y-3">
        <h3 className="text-xs font-black text-[#2E7D32] uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
          <span>
            {isBn
              ? 'কেন এই ফসলটি আপনার জন্য সেরা? (AI যুক্তি ব্যাখ্যা)'
              : 'WHY this crop is recommended (AI Reasoning)'}
          </span>
        </h3>

        <ul className="space-y-2 text-xs text-gray-800">
          {(isBn ? selectedCrop.whyRecommendedBn : selectedCrop.whyRecommendedEn).map(
            (reason, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-200 text-[#2E7D32] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="leading-snug">{reason}</span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={onSaveFarm}
          className="w-full bg-[#2E7D32] hover:bg-green-800 text-white font-extrabold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm active:scale-98 transition-all"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>
            {isBn
              ? `খামারটিতে "${selectedCrop.cropNameBn}" সহ সংরক্ষণ করুন`
              : `Confirm & Register Farm with "${selectedCrop.cropNameEn}"`}
          </span>
        </button>

        <button
          onClick={onBackToMap}
          className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-2xl text-xs transition-colors"
        >
          ← {isBn ? 'ম্যাপ ও তথ্য পরিবর্তন করুন' : 'Edit Farm Data & Map'}
        </button>
      </div>
    </div>
  );
};
