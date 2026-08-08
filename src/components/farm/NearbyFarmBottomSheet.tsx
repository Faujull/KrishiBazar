import React, { useState } from 'react';
import { X, Check, Search, PlusCircle, HelpCircle, Compass, Droplet, Sprout } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface NearbyFarmInfo {
  direction: 'north' | 'south' | 'east' | 'west';
  status: 'filled' | 'unknown' | 'empty';
  farmName?: string;
  crop?: string;
  cropBn?: string;
  distance?: string;
  irrigationMethod?: string;
  waterLevel?: string;
  farmSize?: string;
}

interface NearbyFarmBottomSheetProps {
  isOpen: boolean;
  direction: 'north' | 'south' | 'east' | 'west';
  initialData?: NearbyFarmInfo;
  onClose: () => void;
  onSave: (info: NearbyFarmInfo) => void;
}

const DEMO_NEARBY_FARMS = [
  {
    id: '1',
    nameBn: 'রহমান এগ্রো খামার',
    nameEn: 'Rahman Agro Farm',
    distance: '120m',
    cropBn: 'বোরো ধান (BRRI Dhan-89)',
    cropEn: 'Boro Rice (BRRI-89)',
    cropType: 'rice',
    irrigation: 'ক্যানাল / প্লাবন',
    waterLevel: 'উচ্চ (Flooded)',
    size: '৪০ শতক'
  },
  {
    id: '2',
    nameBn: 'আলম গ্রীন ফার্ম',
    nameEn: 'Alam Green Farm',
    distance: '80m',
    cropBn: 'আলু (গ্র্যানোলা)',
    cropEn: 'Potato (Granola)',
    cropType: 'potato',
    irrigation: 'শ্যালো পাম্প',
    waterLevel: 'মাঝারি (Moderate)',
    size: '৫০ শতক'
  },
  {
    id: '3',
    nameBn: 'রহিম মাটির খামার',
    nameEn: 'Rahim Soil Farm',
    distance: '150m',
    cropBn: 'ভুট্টা (হাইব্রিড)',
    cropEn: 'Hybrid Maize',
    cropType: 'maize',
    irrigation: 'ড্রিপ সেচ',
    waterLevel: 'স্বাভাবিক (Normal)',
    size: '৬০ শতক'
  },
  {
    id: '4',
    nameBn: 'কবীর সরিষা খেত',
    nameEn: 'Kabir Mustard Field',
    distance: '90m',
    cropBn: 'সরিষা (বারি-১৪)',
    cropEn: 'Mustard (Bari-14)',
    cropType: 'mustard',
    irrigation: 'বৃষ্টি নির্ভর',
    waterLevel: 'কম (Dry)',
    size: '৩০ শতক'
  }
];

export const NearbyFarmBottomSheet: React.FC<NearbyFarmBottomSheetProps> = ({
  isOpen,
  direction,
  initialData,
  onClose,
  onSave
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [activeTab, setActiveTab] = useState<'registered' | 'manual' | 'unknown'>('registered');

  // Manual Form States
  const [manualName, setManualName] = useState(initialData?.farmName || '');
  const [manualCrop, setManualCrop] = useState(initialData?.cropBn || 'ধান (Rice)');
  const [manualDistance, setManualDistance] = useState(initialData?.distance || '100m');
  const [manualIrrigation, setManualIrrigation] = useState(initialData?.irrigationMethod || (isBn ? 'প্লাবন সেচ' : 'Flood Irrigation'));
  const [manualWaterLevel, setManualWaterLevel] = useState(initialData?.waterLevel || (isBn ? 'পর্যাপ্ত (High)' : 'High'));
  const [manualSize, setManualSize] = useState(initialData?.farmSize || '40');

  if (!isOpen) return null;

  const directionLabels = {
    north: isBn ? 'উত্তর দিক (North)' : 'North Side',
    south: isBn ? 'দক্ষিণ দিক (South)' : 'South Side',
    east: isBn ? 'পূর্ব দিক (East)' : 'East Side',
    west: isBn ? 'পশ্চিম দিক (West)' : 'West Side',
  };

  const handleSelectDemo = (farm: typeof DEMO_NEARBY_FARMS[0]) => {
    onSave({
      direction,
      status: 'filled',
      farmName: isBn ? farm.nameBn : farm.nameEn,
      crop: farm.cropType,
      cropBn: isBn ? farm.cropBn : farm.cropEn,
      distance: farm.distance,
      irrigationMethod: farm.irrigation,
      waterLevel: farm.waterLevel,
      farmSize: farm.size
    });
  };

  const handleManualSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      direction,
      status: 'filled',
      farmName: manualName || (isBn ? `${directionLabels[direction]} খামার` : `${direction} Farm`),
      crop: manualCrop.toLowerCase().includes('rice') || manualCrop.includes('ধান') ? 'rice' : 'other',
      cropBn: manualCrop,
      distance: manualDistance,
      irrigationMethod: manualIrrigation,
      waterLevel: manualWaterLevel,
      farmSize: `${manualSize} ${isBn ? 'শতক' : 'Decimal'}`
    });
  };

  const handleMarkUnknown = () => {
    onSave({
      direction,
      status: 'unknown',
      farmName: isBn ? 'তথ্য অজানা' : 'Unknown Farm',
      cropBn: isBn ? 'অজানা ফসল' : 'Unknown Crop',
      distance: 'N/A'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[88vh] flex flex-col border border-gray-100">
        
        {/* Header Handle */}
        <div className="pt-3 pb-2 flex justify-center bg-gray-50 border-b border-gray-100 cursor-grab">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Title & Close */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-bold text-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                {directionLabels[direction]} - {isBn ? 'পার্শ্ববর্তী খামার যুক্ত করুন' : 'Add Neighboring Farm'}
              </h3>
              <p className="text-[11px] text-gray-500">
                {isBn ? 'নিকটস্থ জমির ফসল ও পানির উৎস জানলে AI সঠিক সুপারিশ দেয়' : 'Nearby farm details improve AI crop compatibility'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Option Tabs */}
        <div className="grid grid-cols-3 gap-1 p-2 bg-gray-100/70 border-b border-gray-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('registered')}
            className={`py-2 px-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
              activeTab === 'registered'
                ? 'bg-white text-[#2E7D32] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="truncate">{isBn ? 'নিবন্ধিত খামার' : 'Select Farm'}</span>
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={`py-2 px-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
              activeTab === 'manual'
                ? 'bg-white text-[#2E7D32] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="truncate">{isBn ? 'নিজে লিখুন' : 'Manual Entry'}</span>
          </button>

          <button
            onClick={() => setActiveTab('unknown')}
            className={`py-2 px-2 rounded-xl transition-all text-center flex items-center justify-center gap-1 ${
              activeTab === 'unknown'
                ? 'bg-white text-[#2E7D32] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="truncate">{isBn ? 'জানা নেই' : 'Unknown'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: REGISTERED NEARBY FARMS */}
          {activeTab === 'registered' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600 font-medium">
                {isBn
                  ? 'আপনার এলাকার ডিজিটাল নিবন্ধিত নিকটবর্তী খামারসমূহ থেকে নির্বাচন করুন:'
                  : 'Select from nearby registered farms in your cluster:'}
              </p>

              <div className="space-y-2">
                {DEMO_NEARBY_FARMS.map((farm) => (
                  <div
                    key={farm.id}
                    onClick={() => handleSelectDemo(farm)}
                    className="p-3 bg-emerald-50/50 hover:bg-emerald-100/60 border border-emerald-100 rounded-2xl cursor-pointer transition-all active:scale-98 flex items-center justify-between group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-gray-900">
                          {isBn ? farm.nameBn : farm.nameEn}
                        </span>
                        <span className="text-[10px] bg-white text-[#2E7D32] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                          {farm.distance}
                        </span>
                      </div>
                      <p className="text-xs text-[#2E7D32] font-extrabold flex items-center gap-1">
                        <Sprout className="w-3.5 h-3.5" />
                        <span>{isBn ? farm.cropBn : farm.cropEn}</span>
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-500">
                        <span className="flex items-center gap-0.5">
                          <Droplet className="w-3 h-3 text-blue-500" />
                          {farm.irrigation}
                        </span>
                        <span>•</span>
                        <span>{farm.size}</span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white text-[#2E7D32] border border-emerald-200 flex items-center justify-center group-hover:bg-[#2E7D32] group-hover:text-white transition-colors">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MANUAL ENTRY */}
          {activeTab === 'manual' && (
            <form onSubmit={handleManualSave} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isBn ? 'খামারের নাম (ঐচ্ছিক)' : 'Farm Name (Optional)'}
                </label>
                <input
                  type="text"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder={isBn ? 'যেমন: রহিমের ধান খেত' : 'e.g. Rahim Rice Field'}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    {isBn ? 'চাষকৃত ফসল *' : 'Crop *'}
                  </label>
                  <select
                    value={manualCrop}
                    onChange={(e) => setManualCrop(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value="বোরো ধান (Boro Rice)">বোরো ধান (Boro Rice)</option>
                    <option value="আমস ধান (Aman Rice)">আমন ধান (Aman Rice)</option>
                    <option value="আলু (Potato)">আলু (Potato)</option>
                    <option value="ভুট্টা (Maize)">ভুট্টা (Maize)</option>
                    <option value="সরিষা (Mustard)">সরিষা (Mustard)</option>
                    <option value="গম (Wheat)">গম (Wheat)</option>
                    <option value="শাকসবজি (Vegetables)">শাকসবজি (Vegetables)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    {isBn ? 'দূরত্ব *' : 'Distance *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={manualDistance}
                    onChange={(e) => setManualDistance(e.target.value)}
                    placeholder="e.g. 100m"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    {isBn ? 'সেচ পদ্ধতি *' : 'Irrigation Method *'}
                  </label>
                  <select
                    value={manualIrrigation}
                    onChange={(e) => setManualIrrigation(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value={isBn ? 'প্লাবন সেচ (Flood)' : 'Flood Irrigation'}>
                      {isBn ? 'প্লাবন সেচ (Flood)' : 'Flood Irrigation'}
                    </option>
                    <option value={isBn ? 'শ্যালো পাম্প' : 'Shallow Pump'}>
                      {isBn ? 'শ্যালো পাম্প' : 'Shallow Pump'}
                    </option>
                    <option value={isBn ? 'ড্রিপ সেচ' : 'Drip Irrigation'}>
                      {isBn ? 'ড্রিপ সেচ' : 'Drip Irrigation'}
                    </option>
                    <option value={isBn ? 'বৃষ্টি নির্ভর' : 'Rainfed'}>
                      {isBn ? 'বৃষ্টি নির্ভর' : 'Rainfed'}
                    </option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    {isBn ? 'পানির স্তর / আর্দ্রতা' : 'Water Level / Moisture'}
                  </label>
                  <select
                    value={manualWaterLevel}
                    onChange={(e) => setManualWaterLevel(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  >
                    <option value={isBn ? 'পর্যাপ্ত (Flooded)' : 'Flooded'}>
                      {isBn ? 'পর্যাপ্ত (Flooded)' : 'Flooded'}
                    </option>
                    <option value={isBn ? 'স্বাভাবিক (Normal)' : 'Normal'}>
                      {isBn ? 'স্বাভাবিক (Normal)' : 'Normal'}
                    </option>
                    <option value={isBn ? 'কম / শুষ্ক (Dry)' : 'Dry'}>
                      {isBn ? 'কম / শুষ্ক (Dry)' : 'Dry'}
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">
                  {isBn ? 'আনমানিক জমির আকার (শতক)' : 'Approximate Size (Decimal)'}
                </label>
                <input
                  type="number"
                  value={manualSize}
                  onChange={(e) => setManualSize(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors"
                >
                  {isBn ? 'সংরক্ষণ করুন' : 'Save'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: UNKNOWN */}
          {activeTab === 'unknown' && (
            <div className="space-y-4 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
                <HelpCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  {isBn ? 'পার্শ্ববর্তী খামারের তথ্য জানা নেই?' : "Don't know about this neighboring farm?"}
                </h4>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  {isBn
                    ? 'কোন সমস্যা নেই! AI অন্যান্য তথ্য (মাটি, জলবায়ু, বাজার ও জেলা) ব্যবহার করে নির্ভুল ফসল সুপারিশ প্রদান করতে পারবে।'
                    : 'No problem! The AI will still calculate top crop recommendations using soil, weather, location & market data.'}
                </p>
              </div>

              <button
                onClick={handleMarkUnknown}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl shadow-md text-xs transition-colors"
              >
                {isBn ? '"আমি জানি না" হিসেবে চিহ্নিত করুন' : 'Mark as "I Don\'t Know"'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
