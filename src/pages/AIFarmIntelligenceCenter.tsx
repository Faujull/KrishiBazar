import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_FARMS, INITIAL_CROPS } from '../data/mockData';
import {
  Sparkles,
  HeartPulse,
  CloudSun,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Bug,
  Droplets,
  Sprout,
  TrendingUp,
  DollarSign,
  Award,
  Bell,
  ArrowLeft,
  ChevronRight,
  Info,
  CalendarDays,
  FileText,
  Clock,
  Compass,
  Check,
  Zap,
  Target
} from 'lucide-react';

export const AIFarmIntelligenceCenter: React.FC = () => {
  const { farmId } = useParams<{ farmId?: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Selected Farm state
  const selectedFarmId = farmId || 'f1';
  const farm = INITIAL_FARMS.find((f) => f.id === selectedFarmId) || INITIAL_FARMS[0];
  const crop = INITIAL_CROPS.find((c) => c.farmId === farm.id) || INITIAL_CROPS[0];

  // Active Tab state: 'disease' | 'pest' | 'fertilizer' | 'irrigation' | 'yield' | 'profit' | 'market' | 'calendar'
  const [activeTab, setActiveTab] = useState<
    'disease' | 'pest' | 'fertilizer' | 'irrigation' | 'yield' | 'profit' | 'market' | 'calendar'
  >('disease');

  // Reminders Toast notification feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Tabs List config
  const tabsConfig = [
    { id: 'disease', nameBn: 'রোগ ব্যাধি', nameEn: 'Disease', icon: ShieldAlert },
    { id: 'pest', nameBn: 'পোকা মাকড়', nameEn: 'Pest', icon: Bug },
    { id: 'fertilizer', nameBn: 'সার ব্যবস্থাপনা', nameEn: 'Fertilizer', icon: Sprout },
    { id: 'irrigation', nameBn: 'সেচ প্রযুক্তি', nameEn: 'Irrigation', icon: Droplets },
    { id: 'yield', nameBn: 'ফলন পূর্বাভাস', nameEn: 'Yield', icon: Award },
    { id: 'profit', nameBn: 'লাভ ক্ষতি বিশ্লেষণ', nameEn: 'Profit', icon: DollarSign },
    { id: 'market', nameBn: 'বাজার বুদ্ধিমত্তা', nameEn: 'Market', icon: TrendingUp },
    { id: 'calendar', nameBn: 'ফসল জীবনচক্র', nameEn: 'Calendar', icon: CalendarDays },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-28 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2E7D32] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#F9A825]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/my-farm')}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#2E7D32] font-extrabold">
            <Sparkles className="w-4 h-4 text-[#F9A825] animate-spin-slow" />
            <span>{isBn ? 'এআই ক্রপ ইন্টেলিজেন্স সেন্টার' : 'AI Crop Intelligence Center'}</span>
          </div>
          <p className="text-[10px] text-gray-500">
            {isBn ? 'ইউনিফাইড ডিজিটাল সিদ্ধান্ত কেন্দ্র' : 'Unified Decision-Support Dashboard'}
          </p>
        </div>

        <Link
          to={`/seasonal-planner/${farm.id}`}
          className="bg-emerald-100 text-[#2E7D32] p-2 rounded-full border border-emerald-200 hover:bg-emerald-200 transition-colors"
          title={isBn ? 'সিজনাল প্ল্যানার' : 'Seasonal Planner'}
        >
          <CalendarDays className="w-5 h-5" />
        </Link>
      </div>

      {/* FARM HEADER SUMMARY CARD */}
      <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white p-4.5 rounded-3xl shadow-lg border border-emerald-400/30 space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Farm Selector & Status Badge */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-bold text-emerald-100 border border-white/20">
              {isBn ? farm.soilTypeBn : farm.soilTypeEn} • {farm.district}
            </span>
          </div>

          {/* Overall Farm Status Badge */}
          <span
            className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-2xs ${
              farm.healthScore > 90
                ? 'bg-emerald-400 text-emerald-950'
                : farm.healthScore > 75
                ? 'bg-amber-400 text-gray-900'
                : 'bg-red-400 text-white'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>
              {farm.healthScore > 90
                ? isBn ? 'সুস্থ খামার (Healthy)' : 'Healthy'
                : isBn ? 'পর্যবেক্ষণ (Monitor)' : 'Monitor'}
            </span>
          </span>
        </div>

        {/* Title & Crop Details */}
        <div className="relative z-10">
          <h2 className="text-xl font-black text-white tracking-tight">
            {isBn ? farm.nameBn : farm.nameEn}
          </h2>
          <div className="flex items-center gap-2 text-xs text-emerald-100 font-semibold mt-0.5">
            <Sprout className="w-3.5 h-3.5 text-[#F9A825]" />
            <span>
              {isBn ? crop.cropNameBn : crop.cropNameEn} ({isBn ? crop.varietyBn : crop.varietyEn})
            </span>
          </div>
        </div>

        {/* Quick Attributes Row */}
        <div className="grid grid-cols-4 gap-1.5 bg-black/20 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 text-center text-xs relative z-10">
          <div>
            <span className="text-[9px] text-emerald-200 block">{isBn ? 'বৃদ্ধি পর্যায়' : 'Growth Stage'}</span>
            <span className="text-[10px] font-bold text-white block truncate">{isBn ? 'কুশি গজানো' : 'Tillering'}</span>
          </div>

          <div>
            <span className="text-[9px] text-emerald-200 block">{isBn ? 'চলতি মৌসুম' : 'Season'}</span>
            <span className="text-[10px] font-bold text-white block">{isBn ? 'আমন মৌসুম' : 'Amon Season'}</span>
          </div>

          <div>
            <span className="text-[9px] text-emerald-200 block">{isBn ? 'আবহাওয়া' : 'Weather'}</span>
            <span className="text-[10px] font-bold text-white block">৩৪° সে • মেঘলা</span>
          </div>

          <div>
            <span className="text-[9px] text-emerald-200 block">{isBn ? 'এআই স্কোর' : 'AI Score'}</span>
            <span className="text-[10px] font-black text-[#F9A825] block flex items-center justify-center gap-0.5">
              <HeartPulse className="w-3 h-3 text-[#F9A825]" />
              {farm.healthScore}%
            </span>
          </div>
        </div>

        {/* Action button to open AI Seasonal Planner */}
        <Link
          to={`/seasonal-planner/${farm.id}`}
          className="w-full bg-[#F9A825] hover:bg-yellow-500 text-gray-900 font-extrabold py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs active:scale-98 transition-all"
        >
          <CalendarDays className="w-4 h-4" />
          <span>{isBn ? 'এআই সিজনাল প্ল্যানার ও টাইমলাইন দেখুন' : 'View AI Seasonal Farming Roadmap'}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* AI ANALYSIS TABS BAR */}
      <div className="bg-white p-1.5 rounded-2xl border border-gray-100 shadow-xs flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
        {tabsConfig.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F9A825]' : 'text-gray-500'}`} />
              <span>{isBn ? tab.nameBn : tab.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT CARDS */}

      {/* TAB 1: DISEASE */}
      {activeTab === 'disease' && (
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-gray-900">
                  {isBn ? 'শনাক্তকৃত রোগ: ধানের পাতা ব্লাস্ট রোগ' : 'Detected: Rice Leaf Blast'}
                </h3>
                <span className="text-[10px] text-gray-500">
                  {isBn ? 'ছত্রাকজনিত রোগের পূর্বাভাস' : 'Fungal Blast Prediction'}
                </span>
              </div>
            </div>

            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300">
              ৯৪% {isBn ? 'কনফিডেন্স' : 'Confidence'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-400 block font-bold">{isBn ? 'আক্রান্ত এলাকা' : 'Affected Area'}</span>
              <span className="font-extrabold text-gray-900">{isBn ? '১২% পাতা (দক্ষিণ পাশে)' : '12% Leaves (South side)'}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-400 block font-bold">{isBn ? 'তীব্রতা (Severity)' : 'Severity'}</span>
              <span className="font-extrabold text-amber-700 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {isBn ? 'মাঝারি (Medium)' : 'Medium'}
              </span>
            </div>

            <div className="col-span-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-400 block font-bold">{isBn ? 'রোগের মূল কারণ' : 'Cause'}</span>
              <span className="font-semibold text-gray-800">
                {isBn ? 'অতিরিক্ত ইউরিয়া সার প্রয়োগ ও রাতে উচ্চ বাতাসে আর্দ্রতা (>৮৫%)।' : 'Excess Urea application & high nocturnal humidity (>85%).'}
              </span>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-gray-900">{isBn ? 'সুপারিশকৃত সমাধান:' : 'Recommended Treatment:'}</h4>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-[#2E7D32] flex items-center gap-1 text-[11px]">
                🌱 {isBn ? 'জৈব সমাধান (Organic Solution):' : 'Organic Solution:'}
              </span>
              <p className="text-gray-700 leading-snug">
                {isBn ? 'ট্রাইকোডার্মা ভিরিডি (Trichoderma Viride) ৫ গ্রাম/লিটার পানিতে মিশিয়ে বিকেলে প্রয়োগ করুন।' : 'Apply Trichoderma Viride bio-fungicide @ 5g/L during late afternoon.'}
              </p>
            </div>

            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs space-y-1">
              <span className="font-bold text-blue-900 flex items-center gap-1 text-[11px]">
                🧪 {isBn ? 'রাসায়নিক প্রতিকার (Chemical Solution):' : 'Chemical Solution:'}
              </span>
              <p className="text-gray-700 leading-snug">
                {isBn ? 'ট্রাইসাইক্লাজল (Tricyclazole - Trooper) ০.৬ গ্রাম/লিটার অথবা নাটিভো ০.৪ গ্রাম/লিটার স্প্রে করুন।' : 'Spray Tricyclazole (Trooper) @ 0.6g/L or Nativo @ 0.4g/L.'}
              </p>
            </div>
          </div>

          {/* Preventive Measures */}
          <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs space-y-1">
            <span className="font-extrabold text-amber-900 flex items-center gap-1">
              🛡️ {isBn ? 'প্রতিরোধমূলক ব্যবস্থা:' : 'Preventive Measures:'}
            </span>
            <ul className="list-disc list-inside text-gray-700 space-y-0.5 text-[11px]">
              <li>{isBn ? 'ইউরিয়া সারের উপরিপ্রয়োগ আপাতত বন্ধ রাখুন।' : 'Pause Urea top dressing temporarily.'}</li>
              <li>{isBn ? 'পটাশ সার প্রয়োগ নিশ্চিত করুন।' : 'Ensure adequate Potash application.'}</li>
            </ul>
          </div>

          {/* Expert Note & Add Reminder */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-[10px] text-gray-500 italic max-w-[220px]">
              {isBn ? 'কৃষি সম্প্রসারণ অফিস অনুমোদিত এআই মডেল দ্বারা যাচাইকৃত' : 'Verified by DAE Agriculture AI Model'}
            </div>
            <button
              onClick={() => showToast(isBn ? 'রোগ প্রতিকার রিমাইন্ডার যোগ করা হয়েছে!' : 'Disease treatment reminder added!')}
              className="bg-[#2E7D32] hover:bg-green-800 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-transform"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{isBn ? 'রিমাইন্ডার দিন' : 'Add Reminder'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PEST */}
      {activeTab === 'pest' && (
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Bug className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-gray-900">
                  {isBn ? 'শনাক্তকৃত পোকা: ধানের মাজরা পোকা' : 'Detected: Yellow Stem Borer'}
                </h3>
                <span className="text-[10px] text-gray-500">
                  {isBn ? 'কীটপতঙ্গ ঝুঁকি মনিটরিং' : 'Insect Infestation Risk'}
                </span>
              </div>
            </div>

            <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
              {isBn ? 'ঝুঁকি: মাঝারি' : 'Risk: Medium'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-400 block font-bold">{isBn ? 'বর্তমান অ্যাক্টিভিটি' : 'Current Activity'}</span>
              <span className="font-extrabold text-gray-900">{isBn ? 'কচি পাতায় ডিমের পুঞ্জ' : 'Egg Masses on Leaves'}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-400 block font-bold">{isBn ? 'পরবর্তী পরিদর্শন' : 'Next Inspection'}</span>
              <span className="font-extrabold text-[#2E7D32]">{isBn ? '১২ আগস্ট ২০২৬' : 'Aug 12, 2026'}</span>
            </div>
          </div>

          {/* Organic & Chemical Pesticide */}
          <div className="space-y-2">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-[#2E7D32] flex items-center gap-1 text-[11px]">
                🌿 {isBn ? 'জৈব ও প্রাকৃতিক পদ্ধতি:' : 'Organic Control Method:'}
              </span>
              <p className="text-gray-700 leading-snug">
                {isBn ? 'সন্ধ্যায় জমিতে লাইট ট্র্যাপ (আলোক ফাদ) স্থাপন করুন এবং বাঁশের ডাল পুঁতে পাখি বসার ব্যবস্থা (পার্চিং) করুন।' : 'Install evening light traps and bamboo perches for insectivorous birds.'}
              </p>
            </div>

            <div className="p-3 bg-[#FFF3E0] rounded-2xl border border-amber-200 text-xs space-y-1">
              <span className="font-bold text-amber-900 flex items-center gap-1 text-[11px]">
                ⚠️ {isBn ? 'সুপারিশকৃত বালাইনাশক:' : 'Recommended Pesticide:'}
              </span>
              <p className="text-gray-700 leading-snug">
                {isBn ? 'কার্টাপ (Cartap - Sunfuran 4G) বিঘা প্রতি ২ কেজি উপরিপ্রয়োগ করুন।' : 'Apply Cartap (Sunfuran 4G) @ 2kg per Bigha.'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-xs space-y-1">
            <span className="font-extrabold text-blue-900 flex items-center gap-1">
              📅 {isBn ? 'স্প্রে সময়সূচি:' : 'Spraying Schedule:'}
            </span>
            <p className="text-gray-700">
              {isBn ? 'পরবর্তী ৩ দিনের মধ্যে সকাল ৯টার আগে অথবা বিকেলে স্প্রে সম্পন্ন করুন।' : 'Spray before 9 AM or in late afternoon within next 3 days.'}
            </p>
          </div>

          <button
            onClick={() => showToast(isBn ? 'স্প্রে করার রিমাইন্ডার সেট করা হয়েছে!' : 'Spraying schedule reminder set!')}
            className="w-full bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-2.5 rounded-2xl text-xs shadow-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all"
          >
            <Bell className="w-4 h-4 text-[#F9A825]" />
            <span>{isBn ? 'স্প্রে রিমাইন্ডার নোটিফিকেশনে যুক্ত করুন' : 'Add Spray Schedule to Reminders'}</span>
          </button>
        </div>
      )}

      {/* TAB 3: FERTILIZER */}
      {activeTab === 'fertilizer' && (
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-green-100 text-[#2E7D32] flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-gray-900">
                  {isBn ? 'মাটির পুষ্টি ও সার ব্যবস্থাপনা' : 'Soil Nutrient & Fertilizer Plan'}
                </h3>
                <span className="text-[10px] text-gray-500">
                  {isBn ? 'সুষম NPK সার প্রয়োগ গাইড' : 'Balanced NPK Nutrition Guide'}
                </span>
              </div>
            </div>

            <span className="bg-emerald-100 text-[#2E7D32] text-[10px] font-black px-2.5 py-0.5 rounded-full">
              {isBn ? 'মাটি: দোআঁশ' : 'Loamy Soil'}
            </span>
          </div>

          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 space-y-1.5 text-xs">
            <span className="font-bold text-gray-800 block">{isBn ? 'বর্তমান মাটির অবস্থা:' : 'Soil Nutrient Status:'}</span>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="bg-white p-2 rounded-xl border border-gray-200">
                <span className="text-gray-400 block font-bold">N (নাইট্রোজেন)</span>
                <span className="font-bold text-amber-600">{isBn ? 'ঘাটতি আছে' : 'Low'}</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-gray-200">
                <span className="text-gray-400 block font-bold">P (ফসফরাস)</span>
                <span className="font-bold text-emerald-600">{isBn ? 'পর্যাপ্ত' : 'Sufficient'}</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-gray-200">
                <span className="text-gray-400 block font-bold">K (পটাশিয়াম)</span>
                <span className="font-bold text-emerald-600">{isBn ? 'পর্যাপ্ত' : 'Good'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-extrabold text-gray-900">{isBn ? 'সুপারিশকৃত সার প্রয়োগ মাত্রা (বিঘা প্রতি):' : 'Recommended Application (Per Bigha):'}</h4>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-[10px] text-emerald-800 font-bold block">{isBn ? 'জৈব সার' : 'Organic Fertilizer'}</span>
                <span className="font-black text-gray-900 text-xs block mt-0.5">
                  {isBn ? 'ট্রাইকো-কমপোস্ট ৩০০ কেজি' : 'Trichocompost 300kg'}
                </span>
              </div>

              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                <span className="text-[10px] text-blue-800 font-bold block">{isBn ? 'রাসায়নিক সার' : 'Chemical Fertilizer'}</span>
                <span className="font-black text-gray-900 text-xs block mt-0.5">
                  {isBn ? 'ইউরিয়া ১৮কেজি • ডিএপি ১২কেজি' : 'Urea 18kg • DAP 12kg'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-900 text-white rounded-2xl flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-emerald-200 block">{isBn ? 'আনুমানিক সারের খরচ' : 'Est. Fertilizer Cost'}</span>
              <span className="text-sm font-black text-[#F9A825]">৳ ১,৮৫০ / বিঘা</span>
            </div>
            <button
              onClick={() => showToast(isBn ? 'সার প্রয়োগ রিমাইন্ডার যোগ করা হয়েছে!' : 'Fertilizer schedule added!')}
              className="bg-[#F9A825] hover:bg-yellow-500 text-gray-900 font-extrabold px-3 py-1.5 rounded-xl text-xs active:scale-95 transition-transform"
            >
              {isBn ? '+ রিমাইন্ডার' : '+ Reminder'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: IRRIGATION */}
      {activeTab === 'irrigation' && (
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-gray-900">
                  {isBn ? 'স্মার্ট সেচ ও পানি ব্যবস্থাপনা' : 'Smart Irrigation & Water Intelligence'}
                </h3>
                <span className="text-[10px] text-gray-500">
                  {isBn ? 'মাটির আর্দ্রতা ও সেচ সময়সূচি' : 'Soil Moisture & Watering Schedule'}
                </span>
              </div>
            </div>

            <span className="bg-blue-100 text-blue-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
              {isBn ? 'আর্দ্রতা: ৩৫%' : 'Moisture: 35%'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[10px] text-gray-400 block font-bold">{isBn ? 'পানি চাহিদা' : 'Water Need'}</span>
              <span className="font-extrabold text-blue-700">{isBn ? 'মাঝারি (২ ইঞ্চি সেচ)' : 'Medium (2 inch)'}</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[10px] text-gray-400 block font-bold">{isBn ? 'পরবর্তী সেচের তারিখ' : 'Next Irrigation'}</span>
              <span className="font-extrabold text-gray-900">{isBn ? '১৫ আগস্ট ২০২৬' : 'Aug 15, 2026'}</span>
            </div>
          </div>

          <div className="p-3 bg-[#E8F5E9] rounded-2xl border border-green-200 text-xs space-y-1">
            <span className="font-extrabold text-[#2E7D32] flex items-center gap-1">
              💧 {isBn ? 'সুপারিশকৃত সেচ পদ্ধতি:' : 'Recommended Method:'}
            </span>
            <p className="font-bold text-gray-900">
              {isBn ? 'পর্যায়ক্রমে ভেজানো ও শুকানো (AWD) পদ্ধতি' : 'Alternate Wetting & Drying (AWD) Method'}
            </p>
            <p className="text-[11px] text-gray-600">
              {isBn ? 'এই পদ্ধতিতে ২৫% পানি এবং ১৫% ডিজেল সেভ করা সম্ভব।' : 'Saves up to 25% water and 15% fuel cost.'}
            </p>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
            <span className="font-bold text-amber-900 block">{isBn ? '💡 পানি সাশ্রয়ী পরামর্শ:' : '💡 Water Saving Tip:'}</span>
            <p className="text-gray-700 text-[11px]">
              {isBn ? 'প্রখর রোদে সেচ না দিয়ে সকালে বা সন্ধ্যায় সেচ দিন যাতে বাষ্পীভবন কম হয়।' : 'Irrigate during early morning or late evening to minimize evaporation loss.'}
            </p>
          </div>
        </div>
      )}

      {/* TAB 5: YIELD PREDICTION */}
      {activeTab === 'yield' && (
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-gray-900">
                  {isBn ? 'এআই ফলন পূর্বাভাস' : 'AI Yield Prediction'}
                </h3>
                <span className="text-[10px] text-gray-500">
                  {isBn ? 'আনুমানিক উৎপাদন ও মান বিশ্লেষণ' : 'Estimated Production Analysis'}
                </span>
              </div>
            </div>

            <span className="bg-[#F9A825] text-gray-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
              ৯৬% {isBn ? 'সঠিকতা' : 'Accuracy'}
            </span>
          </div>

          {/* Main Yield Metric */}
          <div className="bg-gradient-to-r from-emerald-800 to-[#2E7D32] text-white p-4 rounded-2xl text-center space-y-1 shadow-sm">
            <span className="text-xs text-emerald-200 font-bold">{isBn ? 'প্রত্যাশিত ফলন (একরে)' : 'Expected Yield (per Acre)'}</span>
            <h3 className="text-2xl font-black text-[#F9A825]">
              {isBn ? '২,৪০০ কেজি (৭২ মণ)' : '2,400 kg (72 Mounds)'}
            </h3>
            <p className="text-[10px] text-emerald-100">
              {isBn ? 'আঞ্চলিক গড় অপেক্ষা +১৮% বেশি ফলন' : '+18% higher than regional average'}
            </p>
          </div>

          {/* Best / Avg / Worst Case Breakdown */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-green-50 rounded-2xl border border-green-200">
              <span className="text-[10px] text-gray-500 block font-bold">{isBn ? 'সর্বোচ্চ (Best)' : 'Best Case'}</span>
              <span className="font-extrabold text-[#2E7D32] block mt-0.5">{isBn ? '৭৮ মণ' : '78 Mounds'}</span>
            </div>

            <div className="p-2.5 bg-blue-50 rounded-2xl border border-blue-200">
              <span className="text-[10px] text-gray-500 block font-bold">{isBn ? 'গড় (Average)' : 'Average Case'}</span>
              <span className="font-extrabold text-blue-900 block mt-0.5">{isBn ? '৭২ মণ' : '72 Mounds'}</span>
            </div>

            <div className="p-2.5 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="text-[10px] text-gray-500 block font-bold">{isBn ? 'সর্বনিম্ন (Worst)' : 'Worst Case'}</span>
              <span className="font-extrabold text-amber-800 block mt-0.5">{isBn ? '৬২ মণ' : '62 Mounds'}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-1">
            <span className="font-bold text-gray-900 block">{isBn ? 'আনুমানিক ফসল কাটার তারিখ:' : 'Expected Harvest Window:'}</span>
            <span className="font-extrabold text-[#2E7D32] block">{isBn ? '২০ অক্টোবর - ৩০ অক্টোবর ২০২৬' : 'Oct 20 - Oct 30, 2026'}</span>
          </div>
        </div>
      )}

      {/* TAB 6: PROFIT ANALYSIS */}
      {activeTab === 'profit' && (
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-gray-900">
                  {isBn ? 'লাভ ক্ষতি ও অর্থনীতি বিশ্লেষণ' : 'Profitability & Financial Economics'}
                </h3>
                <span className="text-[10px] text-gray-500">
                  {isBn ? 'উৎপাদন খরচ বনাম প্রত্যাশিত লাভ' : 'Production Cost vs Net Return'}
                </span>
              </div>
            </div>

            <span className="bg-emerald-100 text-[#2E7D32] text-[10px] font-black px-2.5 py-0.5 rounded-full">
              ROI: ১৬৪%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-red-50 rounded-2xl border border-red-100">
              <span className="text-[10px] text-red-600 font-bold block">{isBn ? 'আনুমানিক মোট খরচ' : 'Est. Total Cost'}</span>
              <span className="text-sm font-black text-red-700">৳ ১৮,৫০০ / বিঘা</span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-[#2E7D32] font-bold block">{isBn ? 'প্রত্যাশিত শুদ্ধ লাভ' : 'Est. Net Profit'}</span>
              <span className="text-sm font-black text-[#2E7D32]">৳ ৪৮,৫০০ / একর</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-2">
            <h4 className="font-bold text-gray-900">{isBn ? 'উৎপাদন খরচের বিন্যাস (Cost Breakdown):' : 'Cost Breakdown:'}</h4>

            {/* Visual Progress Bar Breakdown */}
            <div className="space-y-1.5 text-[11px]">
              <div>
                <div className="flex justify-between text-gray-600 font-medium mb-0.5">
                  <span>{isBn ? 'বীজ ও চারা' : 'Seed & Nursery'}</span>
                  <span className="font-bold text-gray-800">১৫%</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[15%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 font-medium mb-0.5">
                  <span>{isBn ? 'সার ও সেচ' : 'Fertilizer & Irrigation'}</span>
                  <span className="font-bold text-gray-800">৫০%</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[50%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 font-medium mb-0.5">
                  <span>{isBn ? 'শ্রমিক ও চাষ' : 'Labor & Tillage'}</span>
                  <span className="font-bold text-gray-800">৩৫%</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[35%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs space-y-1">
            <span className="font-bold text-[#2E7D32] block">{isBn ? 'লাভজনক বিক্রয় পয়েন্ট (Break-even):' : 'Break-even Point:'}</span>
            <p className="text-gray-700 text-[11px]">
              {isBn ? 'বিঘা প্রতি ১৪ মণ ধান বিক্রয় করলে উৎপাদন খরচ উঠে আসবে।' : 'Selling 14 Mounds per Bigha recovers total production expenditure.'}
            </p>
          </div>
        </div>
      )}

      {/* TAB 7: MARKET INTELLIGENCE */}
      {activeTab === 'market' && (
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-gray-900">
                  {isBn ? 'পাইকারি বাজার বুদ্ধিমত্তা' : 'Wholesale Market Intelligence'}
                </h3>
                <span className="text-[10px] text-gray-500">
                  {isBn ? 'দাম পূর্বাভাস ও সেরা বিক্রয় মাধ্যম' : 'Price Trend & Selling Time'}
                </span>
              </div>
            </div>

            <span className="bg-emerald-100 text-[#2E7D32] text-[10px] font-black px-2.5 py-0.5 rounded-full">
              {isBn ? 'চাহিদা: উচ্চ' : 'Demand: High'}
            </span>
          </div>

          <div className="p-3.5 bg-[#E8F5E9] rounded-2xl border border-green-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-500 font-bold block">{isBn ? 'বর্তমান পাইকারি দর' : 'Current Market Price'}</span>
              <span className="text-lg font-black text-[#2E7D32]">৳ ১,৩৫০ <span className="text-xs text-gray-600 font-normal">/ মণ</span></span>
            </div>
            <span className="text-xs font-black text-emerald-700 bg-white px-2.5 py-1 rounded-xl shadow-2xs border border-green-200 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              ↑ ৳৫০ {isBn ? 'বৃদ্ধি' : 'Rise'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-extrabold text-gray-900">{isBn ? 'পার্শ্ববর্তী প্রধান বাজার দর:' : 'Nearby Market Rates:'}</h4>

            <div className="space-y-1.5">
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                <span className="font-bold text-gray-800">{isBn ? 'মহাস্থানগড় হাট (শিবগঞ্জ)' : 'Mahasthangarh Haat'}</span>
                <span className="font-extrabold text-gray-900">৳ ১,৩৫০ / মণ</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                <span className="font-bold text-gray-800">{isBn ? 'কারওয়ান বাজার (ঢাকা)' : 'Karwan Bazar (Dhaka)'}</span>
                <span className="font-extrabold text-[#2E7D32]">৳ ১,৪২০ / মণ</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
            <span className="font-extrabold text-amber-900 flex items-center gap-1">
              💡 {isBn ? 'এআই বিক্রয় পরামর্শ (AI Selling Recommendation):' : 'AI Selling Strategy:'}
            </span>
            <p className="text-gray-700 text-[11px] leading-snug">
              {isBn ? 'ফসল কাটার পর প্রথম ২ সপ্তাহ গুদামজাত করে অক্টোবর ৩০ এর পর বিক্রি করলে সর্বোচ্চ দর (৳ ১,৪৫০+) পাওয়ার সম্ভাবনা ৯২%।' : 'Storing grain for 2 weeks post-harvest boosts sales value to ৳1,450+/mon.'}
            </p>
          </div>
        </div>
      )}

      {/* TAB 8: CROP CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-gray-900">
                  {isBn ? 'ফসল জীবনচক্র ও স্টেজ ট্র্যাকার' : 'Crop Lifecycle Tracker'}
                </h3>
                <span className="text-[10px] text-gray-500">
                  {isBn ? 'বীজ থেকে বিক্রয় পর্যন্ত পর্যায়ক্রমিক বিবরণ' : 'From Seed Selection to Market Selling'}
                </span>
              </div>
            </div>

            <span className="bg-blue-100 text-blue-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
              {isBn ? 'ধাপ ৩ / ৯' : 'Step 3 / 9'}
            </span>
          </div>

          {/* Complete Lifecycle list */}
          <div className="space-y-2 text-xs">
            {[
              { titleBn: '১. উন্নত বীজ নির্বাচন', titleEn: '1. Seed Selection', status: 'completed' },
              { titleBn: '২. জমি চাষ ও প্রস্তুতি', titleEn: '2. Land Preparation', status: 'completed' },
              { titleBn: '৩. রোপণ ও চারা স্থাপন', titleEn: '3. Planting', status: 'current' },
              { titleBn: '৪. প্রথম সেচ ও বালাই পর্যবেক্ষণ', titleEn: '4. First Irrigation', status: 'upcoming' },
              { titleBn: '৫. সারের উপরিপ্রয়োগ (ইউরিয়া/পটাশ)', titleEn: '5. Fertilizer Application', status: 'upcoming' },
              { titleBn: '৬. পোকা ও রোগ নিয়ন্ত্রণ', titleEn: '6. Pest & Disease Control', status: 'upcoming' },
              { titleBn: '৭. কুশি ও শীষ আসার মনিটরিং', titleEn: '7. Tillering & Flowering', status: 'upcoming' },
              { titleBn: '৮. ফসল কাটা ও মাড়াই', titleEn: '8. Harvest & Threshing', status: 'upcoming' },
              { titleBn: '৯. বাজারে বিক্রয় ও সংরক্ষণ', titleEn: '9. Market Selling', status: 'upcoming' },
            ].map((step, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                  step.status === 'completed'
                    ? 'bg-emerald-50/70 border-emerald-200 text-[#2E7D32]'
                    : step.status === 'current'
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200 text-gray-900 font-extrabold'
                    : 'bg-gray-50 border-gray-100 text-gray-500'
                }`}
              >
                <span className="font-bold text-xs">{isBn ? step.titleBn : step.titleEn}</span>

                {step.status === 'completed' && (
                  <span className="text-[10px] font-extrabold bg-emerald-200 text-[#2E7D32] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {isBn ? 'সম্পন্ন' : 'Done'}
                  </span>
                )}
                {step.status === 'current' && (
                  <span className="text-[10px] font-black bg-[#F9A825] text-gray-900 px-2.5 py-0.5 rounded-full animate-pulse">
                    {isBn ? 'চলতি পর্যায়' : 'Current'}
                  </span>
                )}
                {step.status === 'upcoming' && (
                  <span className="text-[10px] font-semibold text-gray-400">
                    {isBn ? 'আসন্ন' : 'Upcoming'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI SUMMARY BOX AT THE BOTTOM */}
      <div className="bg-white p-4.5 rounded-3xl border-2 border-emerald-200 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-[#F9A825]" />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900">
                {isBn ? 'এআই খামার সামারি (AI Farm Summary)' : 'AI Overall Farm Summary'}
              </h3>
              <p className="text-[10px] text-gray-500">
                {isBn ? 'আজকের দিনে আপনার খামারের সার্বিক অবস্থা' : 'Daily holistic farm status report'}
              </p>
            </div>
          </div>
        </div>

        {/* 6 Key Overview Pills */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500 font-bold">{isBn ? 'খামারের স্বাস্থ্য:' : 'Farm Health:'}</span>
            <span className="font-extrabold text-[#2E7D32]">৯২% ({isBn ? 'উৎকৃষ্ট' : 'Good'})</span>
          </div>

          <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500 font-bold">{isBn ? 'প্রত্যাশিত লাভ:' : 'Expected Profit:'}</span>
            <span className="font-extrabold text-[#2E7D32]">৳ ৫২,০০০</span>
          </div>

          <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500 font-bold">{isBn ? 'ঝুঁকির মাত্রা:' : 'Risk Level:'}</span>
            <span className="font-extrabold text-emerald-700">{isBn ? 'কম (Low)' : 'Low'}</span>
          </div>

          <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500 font-bold">{isBn ? 'পানির অবস্থা:' : 'Water Status:'}</span>
            <span className="font-extrabold text-blue-700">{isBn ? 'ভালো (Good)' : 'Good'}</span>
          </div>

          <div className="col-span-2 p-2.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-500 font-bold">{isBn ? 'বাজার দৃষ্টিভঙ্গি:' : 'Market Outlook:'}</span>
            <span className="font-extrabold text-emerald-800">{isBn ? 'উচ্চ চাহিদা (High Demand)' : 'High Demand'}</span>
          </div>
        </div>

        {/* Recommended Action Today */}
        <div className="p-3 bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-100">
            <Zap className="w-4 h-4 text-[#F9A825]" />
            <span>{isBn ? 'আজকের প্রধান প্রয়োজনীয় পদক্ষেপ (Action Today):' : 'Recommended Action Today:'}</span>
          </div>
          <p className="text-xs font-extrabold text-white">
            {isBn ? 'নাইট্রোজেন সার (ইউরিয়া) প্রয়োগ করুন ও বিকেলের সেচ হালকা রাখুন।' : 'Apply Nitrogen Fertilizer (Urea) & keep afternoon irrigation light.'}
          </p>
        </div>
      </div>
    </div>
  );
};
