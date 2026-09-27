import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_FARMS, INITIAL_CROPS } from '../data/mockData';
import { Farm, Crop } from '../types';
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
  Target,
  Radio
} from 'lucide-react';
import { useWeather, toBengaliNumber } from '../services/weatherService';
import { AIDailyRecommendationCard } from '../components/farm/AIDailyRecommendationCard';

export const AIFarmIntelligenceCenter: React.FC = () => {
  const { farmId } = useParams<{ farmId?: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Selected Farm state with resilient fallback guarantees
  const selectedFarmId = farmId || 'f1';
  const defaultFarm: Farm = INITIAL_FARMS[0] || {
    id: 'f1',
    nameBn: 'সোনার বাংলা কৃষি খামার',
    nameEn: 'Sonar Bangla Agro Farm',
    district: 'বগুড়া',
    upazila: 'শিবগঞ্জ',
    areaDecimal: 120,
    soilTypeBn: 'দোআঁশ মাটি',
    soilTypeEn: 'Loamy Soil',
    cropsCount: 3,
    healthScore: 92,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    latitude: 24.8481,
    longitude: 89.3730
  };
  const farm = INITIAL_FARMS.find((f) => f.id === selectedFarmId) || defaultFarm;

  const defaultCrop: Crop = INITIAL_CROPS[0] || {
    id: 'c1',
    farmId: farm.id,
    cropNameBn: 'উফশী আমন ধান',
    cropNameEn: 'High Yield Amon Rice',
    varietyBn: 'বিআর-২৮ (BR-28)',
    varietyEn: 'BR-28',
    plantingDate: '২০২৬-০৬-১৫',
    expectedHarvestDate: '২০২৬-১০-১৫',
    areaDecimal: 60,
    stageBn: 'কুশি গজানো পর্যায় (Tillering Stage)',
    stageEn: 'Tillering Stage',
    status: 'warning' as const,
    imageUrl: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=600&q=80'
  };
  const crop = INITIAL_CROPS.find((c) => c.farmId === farm.id) || defaultCrop;
  const { weather } = useWeather({ farm });

  // Safe weather display calculations
  const tempVal =
    weather?.temperature != null && !isNaN(weather.temperature)
      ? Math.round(weather.temperature)
      : 34;
  const weatherDesc = isBn
    ? weather?.weatherDescriptionBn || 'আংশিক মেঘলা'
    : weather?.weatherDescriptionEn || 'Partly Cloudy';
  const weatherDisplayString = isBn
    ? `${toBengaliNumber(tempVal)}° সে • ${weatherDesc}`
    : `${tempVal}°C • ${weatherDesc}`;

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

  type LifecycleStageId = 'seed' | 'germination' | 'seedling' | 'tillering' | 'flowering' | 'maturity' | 'harvest';

  const [selectedLifecycleStage, setSelectedLifecycleStage] = useState<LifecycleStageId>('tillering');
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({
    'tillering-0': true,
    'tillering-1': true,
    'seed-0': true,
    'seed-1': true,
    'germination-0': true,
    'germination-1': true,
    'seedling-0': true,
    'seedling-1': true
  });

  const toggleStageTask = (taskId: string) => {
    setCompletedTaskIds((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const LIFECYCLE_STAGES_DATA: Record<
    LifecycleStageId,
    {
      id: LifecycleStageId;
      nameBn: string;
      nameEn: string;
      stepNumber: number;
      durationBn: string;
      durationEn: string;
      badgeBn: string;
      badgeEn: string;
      waterReqBn: string;
      waterReqEn: string;
      fertilizerBn: string;
      fertilizerEn: string;
      pestRiskBn: string;
      pestRiskEn: string;
      nextStageBn: string;
      nextStageEn: string;
      checklist: { textBn: string; textEn: string }[];
    }
  > = {
    seed: {
      id: 'seed',
      nameBn: '১. বীজ পর্যায় (Seed Stage)',
      nameEn: '1. Seed Stage',
      stepNumber: 1,
      durationBn: '০-৩ দিন • অঙ্কুরোদগমের প্রস্তুতি',
      durationEn: 'Days 0-3 • Germination prep',
      badgeBn: 'বীজ শোধন',
      badgeEn: 'Seed Treatment',
      waterReqBn: 'বীজতলায় হালকা আর্দ্রতা বজায় রাখুন, কোনোভাবেই জমা পানি নয়।',
      waterReqEn: 'Keep nursery bed moist; prevent waterlogging completely.',
      fertilizerBn: 'বীজ শোধনে ট্রাইকোডার্মা ও কার্বেনডাজিম ব্যবহার করুন। জমিতে কোনো রাসায়নিক সার নয়।',
      fertilizerEn: 'Treat seeds with Trichoderma / Carbendazim. No chemical fertilizer in bed.',
      pestRiskBn: 'বীজ পচন ছত্রাক ও পাখি বা ইঁদুর কর্তৃক বীজ তুলে ফেলার ঝুঁকি।',
      pestRiskEn: 'Seed rot fungi, bird scavenging, and rodent predation risk.',
      nextStageBn: 'অঙ্কুরোদগম পর্যায় (Germination) — আনুমানিক ৪-৫ দিন পর।',
      nextStageEn: 'Germination Stage — Expected in ~4-5 days.',
      checklist: [
        { textBn: 'লবণাক্ত পানিতে ভাসিয়ে পুষ্ট ও নিরোগ বীজ নির্বাচন', textEn: 'Saltwater flotation test to select healthy seeds' },
        { textBn: 'ছত্রাকনাশক দিয়ে ২৪ ঘণ্টা বীজ শোধন ও জাগ দেওয়া', textEn: 'Fungicide seed treatment and 24h soaking' },
        { textBn: 'উঁচু ও সমতল বীজতলায় বীজ সমানভাবে ছিটানো', textEn: 'Even seed broadcasting on raised nursery bed' }
      ]
    },
    germination: {
      id: 'germination',
      nameBn: '২. অঙ্কুরোদগম পর্যায় (Germination)',
      nameEn: '2. Germination Stage',
      stepNumber: 2,
      durationBn: '৪-৭ দিন • সূক্ষ্ম ভ্রূণমূল ও ভ্রূণমুকুল উদগম',
      durationEn: 'Days 4-7 • Radicle & plumule emergence',
      badgeBn: 'অঙ্কুর বিকাশ',
      badgeEn: 'Emergence',
      waterReqBn: 'মাটির আর্দ্রতা ৬০% এ বজায় রাখতে সকালে হালকা স্প্রিঙ্কলার বা ঝাঝরি দিয়ে পানি দিন।',
      waterReqEn: 'Maintain 60% soil moisture with light morning sprinkler watering.',
      fertilizerBn: 'এখন কোনো রাসায়নিক সার প্রয়োজন নেই; মাটির প্রাকৃতিক পুষ্টিই যথেষ্ট।',
      fertilizerEn: 'No chemical fertilizer required; seedling relies on endosperm.',
      pestRiskBn: 'অতিরিক্ত আর্দ্রতায় ড্যাম্পিং অফ ও চারা ঢলে পড়া রোগ।',
      pestRiskEn: 'Damping-off fungal rot due to stagnant wetness.',
      nextStageBn: 'চারা বীজতলা পর্যায় (Seedling) — আনুমানিক ৭-১০ দিন পর।',
      nextStageEn: 'Seedling Stage — Expected in ~7-10 days.',
      checklist: [
        { textBn: 'বীজতলায় পাখির উপদ্রব ঠেকাতে উপরে জাল বা নেট স্থাপন', textEn: 'Erect bird netting over seedbed' },
        { textBn: 'অঙ্কুরোদগমের হার (৮৫%+) পরীক্ষা ও পর্যবেক্ষণ', textEn: 'Verify germination rate (85%+)' },
        { textBn: 'অতিরিক্ত কুয়াশায় পলিথিন দিয়ে বীজতলা ঢেকে রাখা', textEn: 'Cover seedbed with polythene during heavy winter fog' }
      ]
    },
    seedling: {
      id: 'seedling',
      nameBn: '৩. চারা বীজতলা পর্যায় (Seedling Stage)',
      nameEn: '3. Seedling Nursery Stage',
      stepNumber: 3,
      durationBn: '৮-২৫ দিন • মূল ক্ষেতে রোপণের জন্য সবুজ চারা প্রস্তুতকরণ',
      durationEn: 'Days 8-25 • Preparing vigorous seedlings for transplant',
      badgeBn: 'সবল চারা',
      badgeEn: 'Vigorous Shoots',
      waterReqBn: 'বীজতলায় ১-২ সেমি পাতলা পানি রাখুন যাতে চারা সহজে নরম মাটি থেকে তোলা যায়।',
      waterReqEn: 'Maintain 1-2 cm shallow water to ease uprooting without root snap.',
      fertilizerBn: 'চারা হলদে হলে প্রতি শতকে ৭০ গ্রাম ইউরিয়া ও ৮০ গ্রাম জিপসাম উপরিপ্রয়োগ করুন।',
      fertilizerEn: 'Apply 70g Urea & 80g Gypsum per decimal if seedlings yellow.',
      pestRiskBn: 'থ্রিপস ও পাতা পোড়া পোকার আক্রমণ।',
      pestRiskEn: 'Thrips and leaf folder insect attacks.',
      nextStageBn: 'কুশি গজানো পর্যায় (Tillering) — মূল জমিতে রোপণের পর।',
      nextStageEn: 'Tillering Stage — Upon transplanting into main field.',
      checklist: [
        { textBn: 'সুস্থ সবল গাঢ় সবুজ চারা বাছাই ও রোগাক্রান্ত চারা অপসারণ', textEn: 'Select robust seedlings and cull diseased rejects' },
        { textBn: 'চারা তোলার আগের দিন বিকেলে বীজতলায় সেচ প্রদান', textEn: 'Irrigate nursery bed the evening prior to uprooting' },
        { textBn: 'মূল জমিতে সারি থেকে সারি ২০ সেমি এবং চারা থেকে চারা ১৫ সেমি দূরত্বে রোপণ', textEn: 'Transplant at 20cm row & 15cm hill spacing' }
      ]
    },
    tillering: {
      id: 'tillering',
      nameBn: '৪. কুশি গজানো পর্যায় (Tillering Stage)',
      nameEn: '4. Tillering Stage',
      stepNumber: 4,
      durationBn: 'রোপণের ২৫-৪৫তম দিন • শিকড় ও সক্রিয় কুশি বিস্তার কাল',
      durationEn: 'Days 25-45 after transplanting • Root expansion',
      badgeBn: 'চলতি সক্রিয় পর্যায়',
      badgeEn: 'Active Current Stage',
      waterReqBn: 'জমিতে ২-৩ সেমি পাতলা পানি বজায় রাখুন। AWD নিয়মে নালা পর্যবেক্ষণ করুন।',
      waterReqEn: 'Maintain 2-3 cm shallow water level using Alternate Wetting & Drying.',
      fertilizerBn: '১ম কিস্তি ইউরিয়া সার প্রয়োগ (৭ কেজি/বিঘা) এবং ৩ কেজি এমওপি সার উপরিপ্রয়োগ।',
      fertilizerEn: 'Top dress 7 kg Urea and 3 kg MOP per bigha during active tillering.',
      pestRiskBn: 'মাজরা পোকা ও পাতা ব্লাস্ট রোগ। সন্ধ্যায় আলোক ফাঁদ স্থাপন করুন।',
      pestRiskEn: 'Stem borer & Leaf Blast. Deploy evening light traps in the field.',
      nextStageBn: 'ফুল ও শীষ আসা পর্যায় (Flowering) — আনুমানিক ১২-১৫ দিন পর।',
      nextStageEn: 'Flowering Stage — Expected in ~12-15 days.',
      checklist: [
        { textBn: 'নিড়ানি দিয়ে ক্ষেতের আগাছা পরিষ্কার করা যাতে আলোবাতাস পৌঁছায়', textEn: 'Hand weeding around tillers for proper aeration' },
        { textBn: 'সেচ নালা পরীক্ষা ও ২-৩ ইঞ্চি পানি লেভেল নিশ্চিতকরণ', textEn: 'Verify irrigation channels and maintain 2-3 inch water' },
        { textBn: 'ইউরিয়া সারের প্রথম কিস্তি প্রয়োগের পর হালকা সেচ প্রদান', textEn: 'Apply 1st top dressing Urea followed by light watering' },
        { textBn: 'পাতার ডগায় মাজরা পোকার ডিম ও ব্লাস্ট রোগের দাগ পর্যবেক্ষণ', textEn: 'Scout leaf tips for stem borer egg masses & blast lesions' }
      ]
    },
    flowering: {
      id: 'flowering',
      nameBn: '৫. ফুল ও শীষ আসা পর্যায় (Flowering & Heading)',
      nameEn: '5. Flowering & Heading Stage',
      stepNumber: 5,
      durationBn: '৪৬-৭৫ দিন • থোর ও শীষ বের হওয়ার সর্বোচ্চ সংবেদনশীল কাল',
      durationEn: 'Days 46-75 • Heading, anthesis & maximum water dependency',
      badgeBn: 'সর্বোচ্চ সেচ চাহিদা',
      badgeEn: 'Critical Water Peak',
      waterReqBn: 'সর্বোচ্চ পানির চাহিদা (জমিতে সবসময় ৩-৫ সেমি পানি থাকা আবশ্যক, কখনোই শুকানো যাবে না)।',
      waterReqEn: 'Critical water peak: maintain 3-5 cm standing water without drying.',
      fertilizerBn: '২য় কিস্তি পটাশ (এমওপি) ও বোরন স্প্রে করুন। ফুল ফোটার মধ্যাহ্নে কোনো সার/কীটনাশক ছিটাবেন না।',
      fertilizerEn: 'Foliar spray MOP & Solubor Boron. Avoid spraying during peak noon anthesis.',
      pestRiskBn: 'শীষ ব্লাস্ট (Neck Blast), গান্ধী পোকা ও বাদামী গাছফড়িং (BPH)।',
      pestRiskEn: 'Neck Blast, Rice Bug (Gandhi bug), and Brown Plant Hopper (BPH).',
      nextStageBn: 'দানা পরিপক্কতা পর্যায় (Maturity) — আনুমানিক ২০-২৫ দিন পর।',
      nextStageEn: 'Grain Filling & Maturity — Expected in ~20-25 days.',
      checklist: [
        { textBn: 'পানিশূন্যতা যাতে না ঘটে সেজন্য সার্বক্ষণিক সেচ পাম্প প্রস্তুত রাখা', textEn: 'Keep pumps ready to prevent drought shock at anthesis' },
        { textBn: 'ক্ষেতে বাঁশের কঞ্চি পুতে গান্ধী পোকা তাড়াতে আলোর ফাঁদ ব্যবহার', textEn: 'Deploy bamboo perches and light traps for insect scouts' },
        { textBn: 'শীষ ব্লাস্ট প্রতিরোধে ট্রাইসাইক্লাজল জাতীয় ওষুধ পূর্বপ্রতিরোধক স্প্রে', textEn: 'Preventative Tricyclazole spray against neck blast' }
      ]
    },
    maturity: {
      id: 'maturity',
      nameBn: '৬. দানা পরিপক্কতা পর্যায় (Maturity Stage)',
      nameEn: '6. Grain Filling & Ripening Stage',
      stepNumber: 6,
      durationBn: '৭৬-১০৫ দিন • দুধ পর্যায় থেকে সোনালী শক্ত দানায় রূপান্তর',
      durationEn: 'Days 76-105 • Milk to dough to golden hard grain',
      badgeBn: 'পানি শুকানো কাল',
      badgeEn: 'Pre-Harvest Drain',
      waterReqBn: 'ফসল কাটার ১০-১২ দিন পূর্বে ক্ষেতের সমস্ত পানি নিষ্কাশন করে জমি শুকাতে দিন।',
      waterReqEn: 'Drain all standing water 10-12 days prior to harvest to firm soil.',
      fertilizerBn: 'এখন কোনো ধরনের সার বা কীটনাশক প্রয়োগ সম্পূর্ণ নিষিদ্ধ।',
      fertilizerEn: 'Chemical fertilizers and pesticides strictly forbidden at ripening.',
      pestRiskBn: 'ইঁদুরের আক্রমণ ও দেরিতে ছত্রাকের দাগ।',
      pestRiskEn: 'Rodent damage and sooty mold on lodging plants.',
      nextStageBn: 'ফসল কাটা পর্যায় (Harvest) — আনুমানিক ৭-১০ দিন পর।',
      nextStageEn: 'Harvest Stage — Expected in ~7-10 days.',
      checklist: [
        { textBn: 'ক্ষেতের অতিরিক্ত পানি নালা কেটে দ্রুত বের করে দেওয়া', textEn: 'Open drainage channels to drain residual paddy water' },
        { textBn: 'ইঁদুর দমনে জিঙ্ক ফসফাইড বিষটোপ বা ফাঁদ ব্যবহার', textEn: 'Deploy rodent traps and bait stations around bunds' },
        { textBn: 'দানার শতকরা ৮০ ভাগ সোনালী রঙ ধারণ করেছে কিনা পরীক্ষা', textEn: 'Check that 80%+ grains have turned golden straw color' }
      ]
    },
    harvest: {
      id: 'harvest',
      nameBn: '৭. ফসল কাটা ও মাড়াই পর্যায় (Harvest Stage)',
      nameEn: '7. Harvest & Post-Harvest Stage',
      stepNumber: 7,
      durationBn: '১০৬-১১৫ দিন • ফসল সংগ্রহ, মাড়াই, শুকানো ও গুদামজাতকরণ',
      durationEn: 'Days 106-115 • Reaping, threshing, drying & storage',
      badgeBn: 'ফসল ঘরে তোলা',
      badgeEn: 'Reaping & Selling',
      waterReqBn: 'জমি সম্পূর্ণ শুষ্ক থাকবে। শুকনো দিনে রোদ দেখে ফসল কাটুন।',
      waterReqEn: 'Dry field conditions. Harvest on bright sunny forecast days.',
      fertilizerBn: 'কোনো সার নেই। সংরক্ষণ পাত্রে নিমপাতা বা শুকনো ছাই ব্যবহার করুন।',
      fertilizerEn: 'No fertilizer. Use neem leaves in storage silos to repel weevils.',
      pestRiskBn: 'বৃষ্টিজনিত ভেজা দানার ছাতা পড়া ও গুদামজাত পোকা (Weevil)।',
      pestRiskEn: 'Aflatoxin mold from rain dampness and grain weevils.',
      nextStageBn: 'পরবর্তী রবি ফসল (আলু/সরিষা) রোপণ প্রস্তুতি।',
      nextStageEn: 'Next Rabi crop (Potato/Mustard) land preparation.',
      checklist: [
        { textBn: 'সকালে শিশির শুকানোর পর কম্বাইন হারভেস্টার বা কাঁচি দিয়ে কাটা', textEn: 'Reap after morning dew evaporates using harvester or sickles' },
        { textBn: 'খোলা রোদে ২-৩ দিন শুকিয়ে আর্দ্রতা ১২% বা তার নিচে নামানো', textEn: 'Sun dry paddy for 2-3 days to reach 12% storage moisture' },
        { textBn: 'কৃষিবাজার ডিজিটাল মার্কেটপ্লেসে পাইকারি বিক্রির লিস্টিং পোস্ট করা', textEn: 'Publish produce on KrishiBazar Wholesale Marketplace' }
      ]
    }
  };

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
            <span className="text-[10px] font-bold text-white block truncate">
              {weatherDisplayString}
            </span>
          </div>

          <div>
            <span className="text-[9px] text-emerald-200 block">{isBn ? 'এআই স্কোর' : 'AI Score'}</span>
            <span className="text-[10px] font-black text-[#F9A825] block flex items-center justify-center gap-0.5">
              <HeartPulse className="w-3 h-3 text-[#F9A825]" />
              {farm.healthScore}%
            </span>
          </div>
        </div>

        {/* Action buttons to open AI Seasonal Planner and IoT Farm Monitoring */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/seasonal-planner/${farm.id}`}
            className="bg-[#F9A825] hover:bg-yellow-500 text-gray-900 font-extrabold py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 text-xs active:scale-98 transition-all"
          >
            <CalendarDays className="w-4 h-4" />
            <span>{isBn ? 'সিজনাল প্ল্যানার' : 'Seasonal Roadmap'}</span>
          </Link>
          <Link
            to={`/farm-monitoring/${farm.id}`}
            className="bg-emerald-900 hover:bg-emerald-800 text-white font-extrabold py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 text-xs active:scale-98 transition-all border border-emerald-600/40"
          >
            <Radio className="w-4 h-4 text-[#F9A825] animate-pulse" />
            <span>{isBn ? 'আইওটি মনিটরিং' : 'IoT Monitoring'}</span>
          </Link>
        </div>
      </div>

      {/* AI DAILY FARM RECOMMENDATION */}
      <AIDailyRecommendationCard
        farm={farm}
        crop={crop}
        weather={weather}
        compact={false}
      />

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

      {/* TAB 8: CROP CALENDAR / LIFECYCLE */}
      {activeTab === 'calendar' && (() => {
        const activeStage = LIFECYCLE_STAGES_DATA[selectedLifecycleStage] || LIFECYCLE_STAGES_DATA.tillering;
        const currentFieldStageId: LifecycleStageId = 'tillering';

        return (
          <div className="bg-white p-4.5 rounded-3xl border border-gray-100 shadow-xs space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-gray-900">
                    {isBn ? 'ফসল জীবনচক্র ট্র্যাকার (Crop Lifecycle)' : 'Crop Lifecycle Stage Tracker'}
                  </h3>
                  <span className="text-[10px] text-gray-500">
                    {isBn ? 'বীজ থেকে ফসল কাটা পর্যন্ত প্রতিটি পর্যায়ের গভীর বিশ্লেষণ' : 'Seed to Harvest Stage Progression'}
                  </span>
                </div>
              </div>

              <span className="bg-emerald-100 text-[#2E7D32] border border-emerald-200 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-ping" />
                <span>{isBn ? 'চলতি পর্যায়: কুশি গজানো' : 'Current: Tillering'}</span>
              </span>
            </div>

            {/* Stepper Progression: Seed → Germination → Seedling → Tillering → Flowering → Maturity → Harvest */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold px-0.5">
                <span>{isBn ? '৭টি ধারাবাহিক পর্যায় (ক্লিক করে বিস্তারিত দেখুন):' : '7 Lifecycle Stages (Click to inspect):'}</span>
                <span>{isBn ? 'ধাপ ' + toBengaliNumber(activeStage.stepNumber) + ' / ৭' : `Stage ${activeStage.stepNumber} of 7`}</span>
              </div>
              <div className="overflow-x-auto pb-2 scrollbar-none">
                <div className="flex items-center gap-1.5 min-w-[580px]">
                  {[
                    { stage: 'seed' as const, nameBn: '১. বীজ', nameEn: 'Seed', isPast: true },
                    { stage: 'germination' as const, nameBn: '২. অঙ্কুরোদগম', nameEn: 'Germination', isPast: true },
                    { stage: 'seedling' as const, nameBn: '৩. চারা বীজতলা', nameEn: 'Seedling', isPast: true },
                    { stage: 'tillering' as const, nameBn: '৪. কুশি গজানো', nameEn: 'Tillering', isCurrentFieldStage: true },
                    { stage: 'flowering' as const, nameBn: '৫. ফুল ও শীষ', nameEn: 'Flowering', isUpcoming: true },
                    { stage: 'maturity' as const, nameBn: '৬. পরিপক্কতা', nameEn: 'Maturity', isUpcoming: true },
                    { stage: 'harvest' as const, nameBn: '৭. ফসল কাটা', nameEn: 'Harvest', isUpcoming: true },
                  ].map((step, sIdx) => {
                    const isSelected = selectedLifecycleStage === step.stage;
                    const isFieldCurrent = step.stage === currentFieldStageId;
                    const isCompleted = step.isPast;

                    return (
                      <div key={sIdx} className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedLifecycleStage(step.stage)}
                          className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#2E7D32] text-white shadow-md ring-2 ring-emerald-400 scale-102'
                              : isFieldCurrent
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold'
                              : isCompleted
                              ? 'bg-emerald-50 text-[#2E7D32] border border-emerald-200'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {isCompleted && !isSelected && <Check className="w-3 h-3 text-[#2E7D32]" />}
                          {isFieldCurrent && !isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#F9A825] animate-ping" />}
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#F9A825]" />}
                          <span>{isBn ? step.nameBn : step.nameEn}</span>
                        </button>
                        {sIdx < 6 && (
                          <span className={`text-[10px] font-bold ${isCompleted ? 'text-emerald-500' : 'text-gray-300'}`}>
                            →
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Stage Deep-Dive Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50/60 p-4 rounded-2xl border-2 border-emerald-300 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {toBengaliNumber(activeStage.stepNumber)}
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-gray-900">
                      {isBn ? activeStage.nameBn : activeStage.nameEn}
                    </h4>
                    <p className="text-[10px] text-gray-600 font-medium">
                      {isBn ? activeStage.durationBn : activeStage.durationEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {selectedLifecycleStage === currentFieldStageId ? (
                    <span className="text-[10px] font-black bg-[#F9A825] text-gray-900 px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-900 animate-ping" />
                      <span>{isBn ? 'চলতি সক্রিয় পর্যায়' : 'Field Active'}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-black bg-white/80 text-gray-700 px-2 py-0.5 rounded-full border border-gray-200">
                      {isBn ? activeStage.badgeBn : activeStage.badgeEn}
                    </span>
                  )}
                </div>
              </div>

              {/* Stage Requirements Matrix */}
              <div className="grid grid-cols-2 gap-2.5 text-xs pt-1">
                <div className="p-2.5 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span>{isBn ? 'পানির চাহিদা ও সেচ নির্দেশিকা:' : 'Water Requirement:'}</span>
                  </span>
                  <p className="text-gray-900 font-bold text-[11px] leading-tight">
                    {isBn ? activeStage.waterReqBn : activeStage.waterReqEn}
                  </p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                    <Sprout className="w-3 h-3 text-emerald-600" />
                    <span>{isBn ? 'সুপারিশকৃত সার প্রয়োগ:' : 'Fertilizer Recommendation:'}</span>
                  </span>
                  <p className="text-gray-900 font-bold text-[11px] leading-tight">
                    {isBn ? activeStage.fertilizerBn : activeStage.fertilizerEn}
                  </p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-amber-600" />
                    <span>{isBn ? 'কীটপতঙ্গ ও বালাই ঝুঁকি:' : 'Disease & Pest Risk:'}</span>
                  </span>
                  <p className="text-amber-900 font-bold text-[11px] leading-tight">
                    {isBn ? activeStage.pestRiskBn : activeStage.pestRiskEn}
                  </p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#F9A825]" />
                    <span>{isBn ? 'পরবর্তী সম্ভাব্য পর্যায়:' : 'Next Expected Stage:'}</span>
                  </span>
                  <p className="text-[#2E7D32] font-black text-[11px] leading-tight">
                    {isBn ? activeStage.nextStageBn : activeStage.nextStageEn}
                  </p>
                </div>
              </div>

              {/* Current Stage Tasks Checklist */}
              <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-2 shadow-2xs">
                <span className="text-[10px] font-extrabold text-gray-700 uppercase tracking-wide block">
                  {isBn ? 'এই পর্যায়ের আবশ্যিক পরিচর্যা কাজসমূহ (Checklist):' : 'Stage Action Checklist (Interactive):'}
                </span>
                <div className="space-y-1.5 text-xs">
                  {activeStage.checklist.map((task, tIdx) => {
                    const taskId = `${selectedLifecycleStage}-${tIdx}`;
                    const isDone = !!completedTaskIds[taskId];

                    return (
                      <div
                        key={tIdx}
                        onClick={() => toggleStageTask(taskId)}
                        className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span
                          className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-bold transition-all ${
                            isDone ? 'bg-[#2E7D32] text-white shadow-2xs' : 'border border-gray-300 text-transparent'
                          }`}
                        >
                          ✓
                        </span>
                        <span className={`text-[11px] ${isDone ? 'line-through text-gray-400' : 'text-gray-800 font-semibold'}`}>
                          {isBn ? task.textBn : task.textEn}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* DYNAMIC AI FARM DAILY SUMMARY */}
      {(() => {
        const isHighPrecip = (weather?.precipitation ?? 0) > 1.0;
        const isHighTemp = tempVal >= 33;
        const isHighHumidity = (weather?.humidity ?? 78) > 75;

        const importantAlertTextBn = isHighPrecip
          ? 'আজ বৃষ্টিপাত পরিলক্ষিত হয়েছে। জমিতে সেচ দেওয়া স্থগিত রাখুন এবং অতিরিক্ত পানি বের করে দেওয়ার নালা উন্মুক্ত রাখুন।'
          : isHighHumidity
          ? 'বাতাসে উচ্চ আর্দ্রতা (' + toBengaliNumber(weather?.humidity ?? 78) + '%) থাকায় নাবি ধসা ও পাতা ব্লাস্ট রোগের ঝুঁকি বেশি। আজই এআই রোগ স্ক্যান করুন।'
          : isHighTemp
          ? 'আজকের তাপমাত্রা ' + toBengaliNumber(tempVal) + '° সে হওয়ায় মাটির আর্দ্রতা কমে যেতে পারে। বিকেলে জমিতে হালকা সেচ প্রদান করুন।'
          : farm.healthScore < 85
          ? 'খামারের সার্বিক স্বাস্থ্য সুরক্ষায় আগাছা পরিষ্কার করুন এবং আক্রান্ত অংশ আলাদা করুন।'
          : 'কুশি গজানো পর্যায়ের স্বাস্থ্য সুরক্ষায় আগামী ৪৮ ঘণ্টার মধ্যে এআই রোগ স্ক্যান করুন এবং আগাছা পরিষ্কার রাখুন।';

        const importantAlertTextEn = isHighPrecip
          ? 'Rainfall recorded. Suspend irrigation today and ensure clear field drainage outlets.'
          : isHighHumidity
          ? 'High humidity (' + (weather?.humidity ?? 78) + '%) elevates late blight and blast vulnerability. Execute AI Leaf Disease Scan today.'
          : isHighTemp
          ? 'High temperature (' + tempVal + '°C) detected. Apply light irrigation in late afternoon to maintain soil cool.'
          : farm.healthScore < 85
          ? 'Weed active tillers and inspect spots to improve farm health score.'
          : 'Execute AI Leaf Disease Scan within 48 hours and weed active tillers for maximum sunlight exposure.';

        return (
          <div className="bg-white p-4.5 rounded-3xl border-2 border-emerald-300 shadow-md space-y-3.5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4.5 h-4.5 text-[#F9A825]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900">
                    {isBn ? 'দৈনিক এআই খামার সামারি (AI Daily Farm Summary)' : 'AI Daily Farm Summary'}
                  </h3>
                  <p className="text-[10px] text-gray-500">
                    {isBn
                      ? `${farm.nameBn} • ওপেন-মেটিও লাইভ আবহাওয়া ও ফসল বিশ্লেষণ`
                      : `${farm.nameEn} • Real-time Open-Meteo & Crop Telemetry`}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-black bg-emerald-100 text-[#2E7D32] px-2.5 py-0.5 rounded-full border border-emerald-200">
                {isBn ? 'আজকের সার্বিক রিপোর্ট' : 'Today\'s Report'}
              </span>
            </div>

            {/* 6 Dynamic Overview Cards */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* 1. Today's Weather */}
              <div className="p-2.5 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-0.5">
                <span className="text-[10px] text-gray-500 font-bold block flex items-center gap-1">
                  <CloudSun className="w-3 h-3 text-[#F9A825]" />
                  <span>{isBn ? 'আজকের আবহাওয়া:' : 'Today\'s Weather:'}</span>
                </span>
                <span className="font-extrabold text-gray-900 block truncate">
                  {toBengaliNumber(tempVal)}°সে • {weatherDesc}
                </span>
                <span className="text-[9px] text-gray-500 block truncate">
                  {isBn
                    ? `আর্দ্রতা ${toBengaliNumber(weather?.humidity ?? 78)}% • বৃষ্টি ${toBengaliNumber(weather?.precipitation ?? 0)} মিমি`
                    : `Humidity ${weather?.humidity ?? 78}% • Rain ${weather?.precipitation ?? 0}mm`}
                </span>
              </div>

              {/* 2. Crop Health Status */}
              <div className="p-2.5 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-0.5">
                <span className="text-[10px] text-gray-500 font-bold block flex items-center gap-1">
                  <HeartPulse className="w-3 h-3 text-emerald-500" />
                  <span>{isBn ? 'ফসল স্বাস্থ্য স্কোর:' : 'Crop Health Status:'}</span>
                </span>
                <span className="font-extrabold text-[#2E7D32] block">
                  {toBengaliNumber(farm.healthScore)}% ({farm.healthScore > 90 ? (isBn ? 'উৎকৃষ্ট' : 'Healthy') : (isBn ? 'পর্যবেক্ষণ' : 'Monitor')})
                </span>
                <span className="text-[9px] text-gray-500 block truncate">
                  {isBn ? crop.cropNameBn : crop.cropNameEn} • {isBn ? crop.stageBn : crop.stageEn}
                </span>
              </div>

              {/* 3. Irrigation Recommendation */}
              <div className="col-span-2 p-2.5 bg-blue-50/60 rounded-2xl border border-blue-200/60 space-y-0.5">
                <span className="text-[10px] text-blue-900 font-extrabold flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-600" />
                  <span>{isBn ? 'সেচ ব্যবস্থাপনা পরামর্শ (Irrigation Recommendation):' : 'Irrigation Recommendation:'}</span>
                </span>
                <p className="text-[11px] text-blue-950 font-bold leading-snug">
                  {isHighPrecip
                    ? (isBn
                        ? 'আজ বৃষ্টিপাত হওয়ায় জমিতে সেচ দেওয়া স্থগিত রাখুন। অতিরিক্ত পানি নিষ্কাশনের নালা খুলে দিন।'
                        : 'Rainfall recorded/expected; suspend irrigation today and check drainage channels.')
                    : isHighTemp
                    ? (isBn
                        ? 'উচ্চ তাপমাত্রা ও প্রখর রোদের কারণে সকাল বা বিকেলে জমিতে হালকা AWD সেচ দিয়ে মাটি ভিজিয়ে রাখুন।'
                        : 'High heat today; apply light AWD watering early morning or late afternoon.')
                    : (isBn
                        ? 'মাটির আর্দ্রতা অনুকূল রয়েছে। আগামী ২ দিন পর নিয়মিত সেচসূচী অনুসরণ করুন।'
                        : 'Soil moisture is optimal. Follow regular watering schedule in 2 days.')}
                </p>
              </div>

              {/* 4. Fertilizer / Task Recommendation */}
              <div className="col-span-2 p-2.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-0.5">
                <span className="text-[10px] text-emerald-900 font-extrabold flex items-center gap-1">
                  <Sprout className="w-3 h-3 text-[#2E7D32]" />
                  <span>{isBn ? 'সার ও পরিচর্যা সুপারিশ (Fertilizer / Tasks):' : 'Fertilizer & Task Recommendation:'}</span>
                </span>
                <p className="text-[11px] text-emerald-950 font-bold leading-snug">
                  {(weather?.precipitation ?? 0) > 2.0
                    ? (isBn
                        ? 'বৃষ্টি শেষ না হওয়া পর্যন্ত ইউরিয়া সার প্রয়োগ বন্ধ রাখুন যাতে সার ধুয়ে না যায়।'
                        : 'Halt top-dressing Urea until rainfall clears to prevent chemical runoff.')
                    : (isBn
                        ? 'কুশি বৃদ্ধির এই গুরুত্বপূর্ণ সময়ে বিঘা প্রতি ৭ কেজি ইউরিয়া ও ৩ কেজি এমওপি সার উপরিপ্রয়োগ করুন।'
                        : 'Apply 7kg Urea and 3kg MOP per bigha to accelerate tiller shoot density.')}
                </p>
              </div>

              {/* 5. Disease & Pest Risk */}
              <div className="col-span-2 p-2.5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-0.5">
                <span className="text-[10px] text-amber-900 font-extrabold flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-amber-600" />
                  <span>{isBn ? 'রোগ ও বালাই ঝুঁকি স্তর (Disease / Pest Risk):' : 'Disease / Pest Risk Level:'}</span>
                </span>
                <p className="text-[11px] text-amber-950 font-bold leading-snug">
                  {isHighHumidity
                    ? (isBn
                        ? 'বাতাসে উচ্চ আর্দ্রতা (' + toBengaliNumber(weather?.humidity ?? 78) + '%) থাকায় আলুর নাবি ধসা ও ধানের পাতা ব্লাস্ট রোগের ঝুঁকি বেশি। পাতা পর্যবেক্ষণ করুন।'
                        : 'High humidity (' + (weather?.humidity ?? 78) + '%) elevates late blight and blast vulnerability. Inspect leaf tips.')
                    : (isBn
                        ? 'বর্তমান আবহাওয়া কীটপতঙ্গের জন্য কম ঝুঁকিপূর্ণ। স্বাভাবিক জৈব বালাই নিয়ন্ত্রণ বজায় রাখুন।'
                        : 'Mild weather; pest pressure is low and normal biological control is sufficient.')}
                </p>
              </div>
            </div>

            {/* 6. Important Alert Banner */}
            <div className="p-3 bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white rounded-2xl shadow-xs space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-100">
                  <Zap className="w-4 h-4 text-[#F9A825]" />
                  <span>{isBn ? 'আজকের জরুরি নির্দেশনা (Important Alert):' : 'Important Farm Alert:'}</span>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-black text-yellow-300">
                  {isBn ? 'জরুরি পদক্ষেপ' : 'Priority'}
                </span>
              </div>
              <p className="text-xs font-extrabold text-white leading-snug">
                {isBn ? importantAlertTextBn : importantAlertTextEn}
              </p>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
