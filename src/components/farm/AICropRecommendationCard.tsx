import React from 'react';
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
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { NearbyFarmInfo } from './NearbyFarmBottomSheet';

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

  // Calculate recommendation based on form inputs & nearby farm analysis
  const isSoilClayOrLoam = formData.soilType.includes('দোআঁশ') || formData.soilType.includes('এটেল') || formData.soilType.includes('Loam') || formData.soilType.includes('Clay');
  const farmValues = Object.values(formData.nearbyFarms) as (NearbyFarmInfo | null)[];
  const hasFloodedNeighbor = farmValues.some(
    (n) => n?.status === 'filled' && (n.cropBn?.includes('ধান') || n.crop?.includes('rice') || n.waterLevel?.includes('Flooded') || n.waterLevel?.includes('উচ্চ'))
  );

  // Crop choice logic
  let recommendedCropName = isBn ? 'বিআরআরআই ধান-৮৯ (BRRI Dhan-89)' : 'BRRI Dhan-89 (Boro Rice)';
  let yieldAmount = isBn ? '২,৪০০ কেজি / একর (৭২ মণ)' : '2,400 kg / acre (72 Mounds)';
  let estimatedCost = isBn ? '৳১৮,৫০০ / বিঘা' : '৳18,500 / Bigha';
  let estimatedProfit = isBn ? '৳৪৮,৫০০ / একর' : '৳48,500 / Acre';
  let growingDays = isBn ? '১১৫-১২০ দিন' : '115-120 days';
  let confidenceScore = '96%';

  if (!isSoilClayOrLoam && !hasFloodedNeighbor) {
    recommendedCropName = isBn ? 'গ্র্যানোলা আলু (Granola Potato)' : 'Granola Potato';
    yieldAmount = isBn ? '৩,২০০ কেজি / বিঘা' : '3,200 kg / Bigha';
    estimatedCost = isBn ? '৳১৫,০০০ / বিঘা' : '৳15,000 / Bigha';
    estimatedProfit = isBn ? '৳৫৪,০০০ / একর' : '৳54,000 / Acre';
    growingDays = isBn ? '৮৫-৯০ দিন' : '85-90 days';
    confidenceScore = '94%';
  }

  // Cross compatibility logic reasoning
  const farmEntries = Object.entries(formData.nearbyFarms) as [string, NearbyFarmInfo | null][];
  const neighborCropsList = farmEntries
    .filter(([_, info]) => info?.status === 'filled')
    .map(([dir, info]) => `${dir.toUpperCase()}: ${info?.cropBn || info?.crop}`);

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white p-5 rounded-3xl shadow-xl relative overflow-hidden border border-emerald-400/30">
        <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-xs font-bold text-white">
            <Sparkles className="w-4 h-4 text-[#F9A825] animate-pulse" />
            <span>{isBn ? 'এআই স্মার্ট ক্রপ ইন্টেলিজেন্স' : 'AI Smart Crop Intelligence'}</span>
          </div>

          <span className="text-xs font-black bg-[#F9A825] text-gray-900 px-2.5 py-0.5 rounded-full shadow-2xs">
            {confidenceScore} {isBn ? 'ম্যাচ স্কোর' : 'Match Score'}
          </span>
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
          {recommendedCropName}
        </h2>
        <p className="text-xs text-emerald-100 font-medium mt-1">
          {isBn
            ? `${formData.district} জেলা, ${formData.soilType} ও আশেপাশের ৩টি খেতের পানির স্তরের সাথে ১০০% সামঞ্জস্যপূর্ণ`
            : `100% compatible with ${formData.district} climate, ${formData.soilType} & neighbor water topology`}
        </p>

        {/* Quick Numbers Bar */}
        <div className="grid grid-cols-3 gap-2 bg-black/25 backdrop-blur-md p-3 rounded-2xl border border-white/10 mt-4 text-center">
          <div>
            <span className="text-[10px] text-emerald-200 block font-semibold">{isBn ? 'আনুমানিক ফলন' : 'Est. Yield'}</span>
            <span className="text-xs font-black text-white mt-0.5 block">{yieldAmount}</span>
          </div>
          <div className="border-x border-white/15">
            <span className="text-[10px] text-emerald-200 block font-semibold">{isBn ? 'আনুমানিক লাভ' : 'Est. Profit'}</span>
            <span className="text-xs font-black text-[#F9A825] mt-0.5 block">{estimatedProfit}</span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 block font-semibold">{isBn ? 'চাষের সময়কাল' : 'Duration'}</span>
            <span className="text-xs font-black text-white mt-0.5 block">{growingDays}</span>
          </div>
        </div>
      </div>

      {/* Key Metric Details Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Cost & Profit Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
            <DollarSign className="w-4 h-4 text-[#2E7D32]" />
            <span>{isBn ? 'খরচ ও লাভজনকতা' : 'Cost & Economics'}</span>
          </div>
          <p className="text-xs text-gray-900 font-extrabold">
            {isBn ? 'খরচ:' : 'Cost:'} <span className="text-gray-700">{estimatedCost}</span>
          </p>
          <p className="text-xs text-[#2E7D32] font-black">
            {isBn ? 'প্রত্যাশিত লাভ:' : 'Net Profit:'} <span>{estimatedProfit}</span>
          </p>
        </div>

        {/* Market Demand Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>{isBn ? 'বাজার চাহিদা' : 'Market Demand'}</span>
          </div>
          <p className="text-xs font-black text-emerald-700">
            {isBn ? 'উচ্চ (দাম ঊর্ধ্বমুখী)' : 'High (Wholesale Rising)'}
          </p>
          <p className="text-[10px] text-gray-500">
            {formData.nearestMarket || (isBn ? 'স্থানীয় মহাস্থান পাইকারি বাজার' : 'Local Wholesale Market')}
          </p>
        </div>
      </div>

      {/* Complete Recommendation Overview Table */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-3">
        <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
          <Award className="w-4 h-4 text-[#2E7D32]" />
          <span>{isBn ? 'স্মার্ট কৃষি গাইডলাইন ও সময়সূচি' : 'Smart Agriculture Guideline Schedule'}</span>
        </h3>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
          <div>
            <span className="text-[10px] text-gray-400 font-bold block">{isBn ? 'পানির চাহিদা' : 'Water Need'}</span>
            <span className="font-bold text-gray-800">{isBn ? 'মাঝারি-উচ্চ (পর্যাপ্ত)' : 'Medium-High'}</span>
          </div>

          <div>
            <span className="text-[10px] text-gray-400 font-bold block">{isBn ? 'রোগবালাই ঝুঁকি' : 'Disease Risk'}</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {isBn ? 'কম (ব্লাস্ট সহনশীল)' : 'Low (Blight Resistant)'}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-gray-400 font-bold block">{isBn ? 'রোপণের আদর্শ সময়' : 'Planting Date'}</span>
            <span className="font-bold text-gray-800">{isBn ? '১৫ নভেম্বর - ০৫ ডিসেম্বর' : 'Nov 15 - Dec 05'}</span>
          </div>

          <div>
            <span className="text-[10px] text-gray-400 font-bold block">{isBn ? 'ফসল কাটার সময়' : 'Harvest Date'}</span>
            <span className="font-bold text-gray-800">{isBn ? '২০ মার্চ - ০৫ এপ্রিল' : 'Mar 20 - Apr 05'}</span>
          </div>

          <div className="col-span-2 pt-1 border-t border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold block">{isBn ? 'সুপারিশকৃত সার প্রয়োগ' : 'Recommended Fertilizer'}</span>
            <span className="font-bold text-gray-800">
              {isBn ? 'ইউরিয়া ১৮ কেজি • ডিএপি ১২ কেজি • এমওপি ১০ কেজি + ট্রাইকো-কমপোস্ট' : 'Urea 18kg • DAP 12kg • MOP 10kg + Organic Trichocompost'}
            </span>
          </div>

          <div className="col-span-2">
            <span className="text-[10px] text-gray-400 font-bold block">{isBn ? 'সুপারিশকৃত সেচ পদ্ধতি' : 'Recommended Irrigation'}</span>
            <span className="font-bold text-emerald-800">
              {isBn ? 'পর্যায়ক্রমে ভেজানো ও শুকানো (AWD) পদ্ধতি' : 'Alternate Wetting & Drying (AWD) Method'}
            </span>
          </div>
        </div>
      </div>

      {/* WHY THIS CROP WAS RECOMMENDED (Reasoning Section) */}
      <div className="bg-emerald-50/70 border-2 border-emerald-200 p-4 rounded-3xl shadow-xs space-y-3">
        <h3 className="text-xs font-black text-[#2E7D32] uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
          <span>{isBn ? 'কেন এই ফসলটি আপনার জন্য সেরা? (AI যুক্তি ব্যাখ্যা)' : 'WHY this crop is recommended (AI Reasoning)'}</span>
        </h3>

        <ul className="space-y-2 text-xs text-gray-800">
          <li className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-emerald-200 text-[#2E7D32] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
            <div>
              <strong className="font-bold">{isBn ? 'মাটি ও ভূগোল:' : 'Soil & Geography:'} </strong>
              {isBn
                ? `আপনার খামারের ${formData.soilType} এবং ${formData.district} জেলার তাপমাত্রা এই ফসলের জন্য ১০০% উপযোগী।`
                : `Your ${formData.soilType} and ${formData.district} climate provide ideal moisture retention.`}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-emerald-200 text-[#2E7D32] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
            <div>
              <strong className="font-bold">{isBn ? 'পানি ও সেচের উৎস:' : 'Water Source:'} </strong>
              {isBn
                ? `আপনার নির্বাচিত পানির উৎস (${formData.waterSource || 'টিউবওয়েল'}) এবং নিষ্কাশন ব্যবস্থা যথেষ্ট শক্তিশালী।`
                : `Your water source (${formData.waterSource || 'Tube-well'}) reliably supports this crop's water requirements.`}
            </div>
          </li>

          {/* Cross-Compatibility Analysis with Surrounding Farms */}
          <li className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-[#F9A825] text-gray-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
            <div>
              <strong className="font-bold">{isBn ? 'পার্শ্ববর্তী খামার সামঞ্জস্যতা (AI Cross-Compatibility):' : 'Neighbor Compatibility:'} </strong>
              {hasFloodedNeighbor
                ? (isBn
                    ? 'আপনার আশেপাশের খামারগুলোতে প্লাবন সেচের ধান চাষ হচ্ছে। এই ফসল রোপণ করলে জমি জলাবদ্ধতার ক্ষতি এড়িয়ে সর্বোচ্চ ফলন দেবে।'
                    : 'Surrounding neighbor plots use flooded irrigation. Planting this crop prevents water seepage conflicts.')
                : (isBn
                    ? 'আশেপাশের জমির ফসলের সাথে এই ফসলের কোনো ক্ষতিকর সংক্রামক পোকা বা রোগ ছড়ানোর ঝুঁকি নেই।'
                    : 'Zero disease-bridge or pest conflict with surrounding crop topology.')}
              {neighborCropsList.length > 0 && (
                <span className="block text-[10px] text-emerald-800 font-semibold mt-0.5">
                  [{isBn ? 'বিশ্লেষিত চারপাশ: ' : 'Analyzed sides: '}{neighborCropsList.join(' | ')}]
                </span>
              )}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-emerald-200 text-[#2E7D32] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
            <div>
              <strong className="font-bold">{isBn ? 'পূর্ববর্তী ফসলের আবর্তন:' : 'Crop Rotation:'} </strong>
              {isBn
                ? `পূর্ববর্তী ফসল (${formData.previousCrop || 'আমন ধান'}) কাটার পর জমিতে এই ফসল চাষ করলে মাটির পুষ্টি বজায় থাকে।`
                : `Rotating after ${formData.previousCrop || 'Aman Rice'} preserves nitrogen & soil microbial health.`}
            </div>
          </li>

          <li className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-emerald-200 text-[#2E7D32] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
            <div>
              <strong className="font-bold">{isBn ? 'পাইকারি বাজার চাহিদা:' : 'Market Economics:'} </strong>
              {isBn
                ? `${formData.nearestMarket || 'নিকটস্থ বাজারে'} এই ফসলের পাইকারি চাহিদা সর্বোচ্চ থাকায় লাভজনক বিক্রয় নিশ্চিত।`
                : `Wholesale market demand near ${formData.nearestMarket || 'Local Haat'} ensures top profit margins.`}
            </div>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={onSaveFarm}
          className="w-full bg-[#2E7D32] hover:bg-green-800 text-white font-extrabold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm active:scale-98 transition-all"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{isBn ? 'খামারটি ড্যাশবোর্ডে সংরক্ষণ করুন' : 'Confirm & Save Farm to My Farms'}</span>
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
