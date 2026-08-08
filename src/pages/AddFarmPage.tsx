import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Tractor,
  ArrowLeft,
  ChevronRight,
  MapPin,
  Compass,
  Droplets,
  Sprout,
  Store,
  Sparkles,
  CheckCircle2,
  Navigation,
  HelpCircle,
  ShieldCheck,
  Check
} from 'lucide-react';
import { InteractiveFarmMap } from '../components/farm/InteractiveFarmMap';
import { NearbyFarmInfo } from '../components/farm/NearbyFarmBottomSheet';
import { AICropRecommendationCard, FarmRegistrationData } from '../components/farm/AICropRecommendationCard';

export const AddFarmPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';
  const navigate = useNavigate();

  // Wizard Step: 1 | 2 | 3 | 4 | 5
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState<FarmRegistrationData>({
    // Step 1
    farmName: '',
    district: 'বগুড়া',
    upazila: 'শিবগঞ্জ',
    village: 'মহাস্থান উত্তরপাড়া',
    gpsLocation: '24.8481° N, 89.3730° E',
    landSize: '50',
    landUnit: 'Decimal',
    waterSource: isBn ? 'ডিপ টিউবওয়েল (Deep Tube-well)' : 'Deep Tube-well',
    ownership: isBn ? 'নিজস্ব মালিকানা (Owner)' : 'Owner',

    // Step 2
    soilType: isBn ? 'দোআঁশ মাটি (Loamy Soil)' : 'Loamy Soil',
    waterAvailability: isBn ? 'পর্যাপ্ত (Sufficient)' : 'Sufficient',
    drainage: isBn ? 'ভালো (Good)' : 'Good',
    irrigationMethod: isBn ? 'প্লাবন সেচ (Flood)' : 'Flood Irrigation',
    previousCrop: isBn ? 'আমন ধান (Aman Rice)' : 'Aman Rice',
    currentCrop: isBn ? 'কোনো ফসল নেই (Empty)' : 'None',
    organicFarming: true,

    // Step 3
    nearbyFarms: {
      north: {
        direction: 'north',
        status: 'filled',
        farmName: isBn ? 'রহমান ধান খেত' : 'Rahman Rice Field',
        crop: 'rice',
        cropBn: isBn ? 'বোরো ধান (BRRI-89)' : 'Boro Rice',
        distance: '120m',
        irrigationMethod: 'প্লাবন সেচ',
        waterLevel: 'উচ্চ (Flooded)',
        farmSize: '৪০ শতক'
      },
      south: null,
      east: {
        direction: 'east',
        status: 'filled',
        farmName: isBn ? 'আলম গ্রীন আলু ফার্ম' : 'Alam Green Potato Farm',
        crop: 'potato',
        cropBn: isBn ? 'আলু (গ্র্যানোলা)' : 'Potato',
        distance: '80m',
        irrigationMethod: 'শ্যালো পাম্প',
        waterLevel: 'মাঝারি',
        farmSize: '৫০ শতক'
      },
      west: null
    },

    // Step 4
    nearestMarket: isBn ? 'মহাস্থান পাইকারি আড়ত' : 'Mahasthangarh Wholesale Market',
    transportDistance: '3.5 km',
    sellingMethod: isBn ? 'পাইকারি আড়ত (Wholesale Arat)' : 'Wholesale Arat'
  });

  const [isDetectingGps, setIsDetectingGps] = useState(false);

  const handleDetectGps = () => {
    setIsDetectingGps(true);
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        gpsLocation: '24.8492° N, 89.3745° E (±3m)'
      }));
      setIsDetectingGps(false);
    }, 1000);
  };

  const handleUpdateNearbyFarm = (info: NearbyFarmInfo) => {
    setFormData((prev) => ({
      ...prev,
      nearbyFarms: {
        ...prev.nearbyFarms,
        [info.direction]: info
      }
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSaveFarmToSystem = () => {
    alert(isBn ? 'আপনার নতুন খামার সফলভাবে নিবন্ধিত ও এআই ট্র্যাক করা হয়েছে!' : 'New Farm successfully registered & AI tracked!');
    navigate('/my-farm');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
              <Tractor className="w-5 h-5 text-[#2E7D32]" />
              <span>{isBn ? 'স্মার্ট খামার নিবন্ধন' : 'Smart Farm Registration'}</span>
            </h2>
            <p className="text-[11px] text-gray-500">
              {isBn ? 'ধাপভিত্তিক এআই চালিত জমি ইন্টেলিজেন্স' : 'AI-powered multi-step farm intelligence wizard'}
            </p>
          </div>
        </div>

        {/* Progress Pill */}
        <span className="text-xs font-black bg-emerald-100 text-[#2E7D32] px-3 py-1 rounded-full border border-emerald-200">
          {currentStep} / 5
        </span>
      </div>

      {/* Visual Step Progress Bar */}
      <div className="bg-gray-200 h-2 rounded-full overflow-hidden flex">
        <div
          className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] h-full transition-all duration-300"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        ></div>
      </div>

      {/* STEP 1: FARM BASIC INFORMATION */}
      {currentStep === 1 && (
        <form onSubmit={handleNext} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4 animate-in fade-in duration-200">
          <div className="border-b border-gray-100 pb-2">
            <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#2E7D32]" />
              <span>{isBn ? 'ধাপ ১: খামারের প্রাথমিক তথ্য' : 'Step 1: Farm Basic Information'}</span>
            </h3>
            <p className="text-[11px] text-gray-500">
              {isBn ? 'আপনার নতুন চাষযোগ্য জমির অবস্থান ও মালিকানার বিবরণ লিখুন' : 'Enter location and ownership details'}
            </p>
          </div>

          {/* Farm Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">
              {isBn ? 'খামারের নাম *' : 'Farm Name *'}
            </label>
            <input
              type="text"
              required
              value={formData.farmName}
              onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
              placeholder={isBn ? 'যেমন: সোনার বাংলা উত্তর খামার' : 'e.g. Sonali North Agro Field'}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>

          {/* District & Upazila */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {isBn ? 'জেলা *' : 'District *'}
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              >
                <option value="বগুড়া">বগুড়া (Bogura)</option>
                <option value="রংপুর">রংপুর (Rangpur)</option>
                <option value="যশোর">যশোর (Jessore)</option>
                <option value="দিনাজপুর">দিনাজপুর (Dinajpur)</option>
                <option value="রাজশাহী">রাজশাহী (Rajshahi)</option>
                <option value="ময়মনসিংহ">ময়মনসিংহ (Mymensingh)</option>
                <option value="কুমিল্লা">কুমিল্লা (Comilla)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {isBn ? 'উপজেলা *' : 'Upazila *'}
              </label>
              <input
                type="text"
                required
                value={formData.upazila}
                onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>

          {/* Village */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">
              {isBn ? 'গ্রাম / মৌজা *' : 'Village / Mouza *'}
            </label>
            <input
              type="text"
              required
              value={formData.village}
              onChange={(e) => setFormData({ ...formData, village: e.target.value })}
              placeholder={isBn ? 'যেমন: মহাস্থান উত্তরপাড়া' : 'e.g. Mahasthan North'}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>

          {/* GPS Location Placeholder button */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 block">
              {isBn ? 'জিপিএস জিপিএস লোকেশন (GPS Coordinates)' : 'GPS Location Coordinates'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={formData.gpsLocation}
                className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-700 font-mono font-semibold"
              />
              <button
                type="button"
                onClick={handleDetectGps}
                disabled={isDetectingGps}
                className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#2E7D32] border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors active:scale-95"
              >
                <Navigation className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
                <span>{isDetectingGps ? (isBn ? 'সনাক্ত হচ্ছে...' : 'Detecting...') : (isBn ? 'GPS সনাক্ত' : 'Detect GPS')}</span>
              </button>
            </div>
          </div>

          {/* Land Size & Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {isBn ? 'জমির পরিমাণ *' : 'Land Size *'}
              </label>
              <input
                type="number"
                required
                value={formData.landSize}
                onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {isBn ? 'জমির একক *' : 'Land Unit *'}
              </label>
              <select
                value={formData.landUnit}
                onChange={(e) => setFormData({ ...formData, landUnit: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              >
                <option value="Decimal">{isBn ? 'শতক / ডিসিমাল' : 'Decimal'}</option>
                <option value="Bigha">{isBn ? 'বিঘা (৩৩ শতক)' : 'Bigha'}</option>
                <option value="Acre">{isBn ? 'একক / একর' : 'Acre'}</option>
              </select>
            </div>
          </div>

          {/* Water Source & Ownership */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {isBn ? 'প্রধান পানির উৎস *' : 'Water Source *'}
              </label>
              <select
                value={formData.waterSource}
                onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              >
                <option value="ডিপ টিউবওয়েল">{isBn ? 'ডিপ টিউবওয়েল' : 'Deep Tube-well'}</option>
                <option value="শ্যালো পাম্প">{isBn ? 'শ্যালো পাম্প' : 'Shallow Pump'}</option>
                <option value="খাল / নদী">{isBn ? 'খাল / নদী (Canal)' : 'Canal/River'}</option>
                <option value="পুকুর / জলাশয়">{isBn ? 'পুকুর (Pond)' : 'Pond'}</option>
                <option value="বৃষ্টি নির্ভর">{isBn ? 'বৃষ্টি নির্ভর (Rainfed)' : 'Rainfed'}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {isBn ? 'মালিকানা *' : 'Ownership *'}
              </label>
              <select
                value={formData.ownership}
                onChange={(e) => setFormData({ ...formData, ownership: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              >
                <option value="নিজস্ব">{isBn ? 'নিজস্ব (Owner)' : 'Owner'}</option>
                <option value="ইজারা">{isBn ? 'ইজারা (Lease)' : 'Lease'}</option>
                <option value="বর্গা">{isBn ? 'বর্গা (Sharecropper)' : 'Sharecropper'}</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all text-xs"
          >
            <span>{isBn ? 'পরবর্তী: মাটির গুণাগুণ (Step 2)' : 'Next: Soil Information (Step 2)'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* STEP 2: SOIL & IRRIGATION INFORMATION */}
      {currentStep === 2 && (
        <form onSubmit={handleNext} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4 animate-in fade-in duration-200">
          <div className="border-b border-gray-100 pb-2">
            <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-[#2E7D32]" />
              <span>{isBn ? 'ধাপ ২: মাটি ও সেচ গুণাগুণ' : 'Step 2: Soil & Drainage Information'}</span>
            </h3>
            <p className="text-[11px] text-gray-500">
              {isBn ? 'মাটির ধরন ও বিগত ফসলের তথ্য AI সঠিক ফসল বেছে নিতে সহায়তা করে' : 'Soil type & drainage properties refine crop selection'}
            </p>
          </div>

          {/* Soil Type */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">
              {isBn ? 'মাটির ধরন *' : 'Soil Type *'}
            </label>
            <select
              value={formData.soilType}
              onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            >
              <option value="দোআঁশ মাটি">দোআঁশ মাটি (Loamy Soil)</option>
              <option value="এটেল মাটি">এটেল মাটি (Clay Soil)</option>
              <option value="বেলে দোআঁশ">বেলে দোআঁশ (Sandy Loam)</option>
              <option value="পলি মাটি">পলি মাটি (Alluvial Soil)</option>
              <option value="পিট মাটি">পিট মাটি (Peat Soil)</option>
            </select>
          </div>

          {/* Water Availability & Drainage */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {isBn ? 'পানির প্রাপ্যতা *' : 'Water Availability *'}
              </label>
              <select
                value={formData.waterAvailability}
                onChange={(e) => setFormData({ ...formData, waterAvailability: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              >
                <option value="পর্যাপ্ত">{isBn ? 'পর্যাপ্ত (Sufficient)' : 'Sufficient'}</option>
                <option value="মাঝারি">{isBn ? 'মাঝারি (Moderate)' : 'Moderate'}</option>
                <option value="কম">{isBn ? 'কম (Low)' : 'Low'}</option>
                <option value="মৌসুমি খরা">{isBn ? 'মৌসুমি খরা (Seasonal)' : 'Seasonal Drought'}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {isBn ? 'পানি নিষ্কাশন *' : 'Drainage *'}
              </label>
              <select
                value={formData.drainage}
                onChange={(e) => setFormData({ ...formData, drainage: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              >
                <option value="ভালো">{isBn ? 'ভালো (Good)' : 'Good'}</option>
                <option value="মাঝারি">{isBn ? 'মাঝারি (Moderate)' : 'Moderate'}</option>
                <option value="জলাবদ্ধতা ঝুঁকিপূর্ণ">{isBn ? 'জলাবদ্ধতা ঝুঁকি (Poor)' : 'Waterlogged'}</option>
              </select>
            </div>
          </div>

          {/* Irrigation Method */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">
              {isBn ? 'সেচ পদ্ধতি *' : 'Irrigation Method *'}
            </label>
            <select
              value={formData.irrigationMethod}
              onChange={(e) => setFormData({ ...formData, irrigationMethod: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            >
              <option value="প্লাবন সেচ">{isBn ? 'প্লাবন সেচ (Flood Irrigation)' : 'Flood Irrigation'}</option>
              <option value="ড্রিপ সেচ">{isBn ? 'ড্রিপ সেচ (Drip Irrigation)' : 'Drip Irrigation'}</option>
              <option value="স্প্রিংকলার">{isBn ? 'স্প্রিংকলার সেচ (Sprinkler)' : 'Sprinkler'}</option>
              <option value="খাল / ক্যানাল">{isBn ? 'ক্যানাল / নালা (Canal)' : 'Canal'}</option>
              <option value="বৃষ্টি নির্ভর">{isBn ? 'বৃষ্টি নির্ভর (Rainfed)' : 'Rainfed'}</option>
            </select>
          </div>

          {/* Previous & Current Crop */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {isBn ? 'পূর্ববর্তী ফসল *' : 'Previous Crop *'}
              </label>
              <select
                value={formData.previousCrop}
                onChange={(e) => setFormData({ ...formData, previousCrop: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              >
                <option value="আমন ধান">আমন ধান (Aman Rice)</option>
                <option value="বোরো ধান">বোরো ধান (Boro Rice)</option>
                <option value="আলু">আলু (Potato)</option>
                <option value="গম">গম (Wheat)</option>
                <option value="ভুট্টা">ভুট্টা (Maize)</option>
                <option value="সরিষা">সরিষা (Mustard)</option>
                <option value="পাট">পাট (Jute)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {isBn ? 'বর্তমান ফসল (যদি থাকে)' : 'Current Crop (Optional)'}
              </label>
              <input
                type="text"
                value={formData.currentCrop}
                onChange={(e) => setFormData({ ...formData, currentCrop: e.target.value })}
                placeholder={isBn ? 'যেমন: কোনোটিই নয়' : 'e.g. None'}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>

          {/* Organic Farming Toggle */}
          <div className="p-3 bg-[#E8F5E9] rounded-2xl border border-green-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-extrabold text-gray-900 block">
                {isBn ? 'জৈব কৃষি চাষাবাদ (Organic Farming)?' : 'Organic Farming Practices?'}
              </span>
              <span className="text-[10px] text-gray-600 block">
                {isBn ? 'রাসায়নিক কমিয়ে জৈব ট্রাইকো-কমপোস্ট ব্যবহারে আগ্রহী' : 'Interested in low chemical organic cultivation'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, organicFarming: !formData.organicFarming })}
              className={`w-12 h-6 rounded-full transition-colors flex items-center p-1 ${
                formData.organicFarming ? 'bg-[#2E7D32] justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-xs"></div>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-2xl text-xs transition-colors"
            >
              ← {isBn ? 'পেছনে' : 'Back'}
            </button>
            <button
              type="submit"
              className="flex-[2] bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-3 rounded-2xl shadow-md flex items-center justify-center gap-1.5 active:scale-98 transition-all text-xs"
            >
              <span>{isBn ? 'পরবর্তী: ইন্টারেক্টিভ ম্যাপ (Step 3)' : 'Next: Interactive Map (Step 3)'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: INTERACTIVE FARM MAP */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <InteractiveFarmMap
            myFarmName={formData.farmName}
            nearbyFarms={formData.nearbyFarms}
            onUpdateNearbyFarm={handleUpdateNearbyFarm}
            onAnalyzeFarm={() => setCurrentStep(4)}
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-2xl text-xs transition-colors"
            >
              ← {isBn ? 'মাটির তথ্য পরিবর্তন (Step 2)' : 'Back to Soil Details (Step 2)'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: MARKET & TRANSPORT INFORMATION */}
      {currentStep === 4 && (
        <form onSubmit={handleNext} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4 animate-in fade-in duration-200">
          <div className="border-b border-gray-100 pb-2">
            <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
              <Store className="w-4 h-4 text-[#2E7D32]" />
              <span>{isBn ? 'ধাপ ৪: নিকটস্থ পাইকারি বাজার' : 'Step 4: Market & Logistics'}</span>
            </h3>
            <p className="text-[11px] text-gray-500">
              {isBn ? 'বাজারের দূরত্ব ও বিক্রয় মাধ্যম লাভজনক ফসল নির্ধারণ করে' : 'Market proximity & transport distance affect profit logic'}
            </p>
          </div>

          {/* Nearest Market */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">
              {isBn ? 'নিকটতম স্থানীয় বা পাইকারি বাজার *' : 'Nearest Wholesale Market / Haat *'}
            </label>
            <input
              type="text"
              required
              value={formData.nearestMarket}
              onChange={(e) => setFormData({ ...formData, nearestMarket: e.target.value })}
              placeholder={isBn ? 'যেমন: মহাস্থান পাইকারি বাজার' : 'e.g. Mahasthan Wholesale Haat'}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>

          {/* Transport Distance */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">
              {isBn ? 'গড় পরিবহন দূরত্ব (কিলোমিটার) *' : 'Average Transport Distance *'}
            </label>
            <input
              type="text"
              required
              value={formData.transportDistance}
              onChange={(e) => setFormData({ ...formData, transportDistance: e.target.value })}
              placeholder="e.g. 3.5 km"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>

          {/* Preferred Selling Method */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">
              {isBn ? 'পছন্দনীয় ফসল বিক্রয়ের মাধ্যম *' : 'Preferred Selling Channel *'}
            </label>
            <select
              value={formData.sellingMethod}
              onChange={(e) => setFormData({ ...formData, sellingMethod: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            >
              <option value="স্থানীয় বাজার">{isBn ? 'স্থানীয় বাজার (Local Haat)' : 'Local Market'}</option>
              <option value="পাইকারি আড়ত">{isBn ? 'পাইকারি আড়ত (Wholesale Arat)' : 'Wholesale Arat'}</option>
              <option value="সরাসরি ক্রেতা">{isBn ? 'সরাসরি করপোরেট ও কারখানা ক্রেতা' : 'Direct Corporate Buyer'}</option>
              <option value="মার্কেটপ্লেস">{isBn ? 'কৃষিবাজার ডিজিটাল মার্কেটপ্লেস' : 'KrishiBazar App Marketplace'}</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handlePrev}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-2xl text-xs transition-colors"
            >
              ← {isBn ? 'পেছনে (Step 3)' : 'Back (Step 3)'}
            </button>
            <button
              type="submit"
              className="flex-[2] bg-gradient-to-r from-[#2E7D32] to-[#388E3C] hover:from-green-800 hover:to-green-700 text-white font-extrabold py-3 rounded-2xl shadow-lg flex items-center justify-center gap-1.5 active:scale-98 transition-all text-xs"
            >
              <Sparkles className="w-4 h-4 text-[#F9A825]" />
              <span>{isBn ? 'এআই সুপারিশ জেনারেট করুন (Step 5)' : 'Generate AI Crop Recommendation (Step 5)'}</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: AI CROP RECOMMENDATION SCREEN */}
      {currentStep === 5 && (
        <AICropRecommendationCard
          formData={formData}
          onSaveFarm={handleSaveFarmToSystem}
          onBackToMap={() => setCurrentStep(3)}
        />
      )}

    </div>
  );
};
