import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_FARMS, INITIAL_CROPS } from '../data/mockData';
import {
  Calendar,
  Sparkles,
  Download,
  Printer,
  Share2,
  CalendarDays,
  FileText,
  CheckCircle2,
  Clock,
  DollarSign,
  Package,
  AlertTriangle,
  ArrowLeft,
  QrCode,
  MapPin,
  Sprout,
  Droplets,
  ShieldCheck,
  Building2,
  Bell,
  Check,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  X
} from 'lucide-react';

interface TimelineStep {
  weekNum: number;
  dateStr: string;
  taskBn: string;
  taskEn: string;
  priority: 'High' | 'Medium' | 'Normal';
  costBn: string;
  costEn: string;
  timeEstBn: string;
  timeEstEn: string;
  materialsBn: string;
  materialsEn: string;
  aiNotesBn: string;
  aiNotesEn: string;
  category: 'prep' | 'seed' | 'planting' | 'irrigation' | 'fertilizer' | 'pest' | 'disease' | 'harvest' | 'selling';
}

export const SeasonalPlannerPage: React.FC = () => {
  const { farmId } = useParams<{ farmId?: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const farm = INITIAL_FARMS.find((f) => f.id === farmId) || INITIAL_FARMS[0];
  const crop = INITIAL_CROPS.find((c) => c.farmId === farm.id) || INITIAL_CROPS[0];

  const [showReportModal, setShowReportModal] = useState(false);
  const [syncedReminders, setSyncedReminders] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Full Timeline Steps Data
  const timelineSteps: TimelineStep[] = [
    {
      weekNum: 1,
      dateStr: '১৫ জুন ২০২৬',
      taskBn: 'জমি প্রস্তুতকরণ ও গভীর চাষ',
      taskEn: 'Land Preparation & Deep Plowing',
      priority: 'High',
      costBn: '৳ ১,২০০ / বিঘা',
      costEn: '৳ 1,200 / Bigha',
      timeEstBn: '৪ ঘণ্টা',
      timeEstEn: '4 hours',
      materialsBn: 'ট্রাক্টর বা পাওয়ার টিলার, গোবর সার',
      materialsEn: 'Tractor/Power Tiller, Organic Manure',
      aiNotesBn: 'মাটির দোআঁশ উপাদান ও আগের আমন নাড়া ভালোভাবে পচাতে ২ বার চাষ দিয়ে ১ সপ্তাহ ফেলে রাখুন।',
      aiNotesEn: 'Plow twice to incorporate previous rice stubble and enrich soil aeration.',
      category: 'prep'
    },
    {
      weekNum: 2,
      dateStr: '২২ জুন ২০২৬',
      taskBn: 'বীজ শোধন ও চারা বীজতলা তৈরি',
      taskEn: 'Seed Selection & Nursery Bed',
      priority: 'High',
      costBn: '৳ ৮০০',
      costEn: '৳ 800',
      timeEstBn: '২ দিন',
      timeEstEn: '2 days',
      materialsBn: 'বিআর-২৮ ধান বীজ, অটোভিস্টিন ছত্রাকনাশক',
      materialsEn: 'BR-28 Seeds, Autovistin Fungicide',
      aiNotesBn: 'অটোভিস্টিন ২ গ্রাম/কেজি দিয়ে বীজ শোধন করলে চারা পোড়া ও ধসা মুক্ত থাকবে।',
      aiNotesEn: 'Treat seeds with Autovistin @ 2g/kg to prevent seed-borne fungal infections.',
      category: 'seed'
    },
    {
      weekNum: 3,
      dateStr: '২৯ জুন ২০২৬',
      taskBn: 'চারা রোপণ (Transplanting)',
      taskEn: 'Planting / Transplanting',
      priority: 'High',
      costBn: '৳ ২,৫০০ / বিঘা',
      costEn: '৳ 2,500 / Bigha',
      timeEstBn: '১ দিন',
      timeEstEn: '1 day',
      materialsBn: '২৫-৩০ দিনের সতেজ চারা, সুতলি লাইন',
      materialsEn: '25-30 day seedlings, Line string',
      aiNotesBn: 'সারিবদ্ধভাবে ২০ সেমি × ১৫ সেমি দূরত্বে রোপণ করুন যাতে সমান আলোবাতাস পায়।',
      aiNotesEn: 'Maintain 20cm x 15cm spacing in straight rows for sunlight efficiency.',
      category: 'planting'
    },
    {
      weekNum: 4,
      dateStr: '০৬ জুলাই ২০২৬',
      taskBn: 'প্রথম সেচ ও পানি লেভেল নিয়ন্ত্রণ',
      taskEn: 'First Irrigation & Water Level Control',
      priority: 'Medium',
      costBn: '৳ ৫০০',
      costEn: '৳ 500',
      timeEstBn: '৩ ঘণ্টা',
      timeEstEn: '3 hours',
      materialsBn: 'টিউবওয়েল সেচ ক্যানাল',
      materialsEn: 'Tube-well Canal Water',
      aiNotesBn: 'জমি শুকিয়ে ২-৩ সেমি পাতলা পানি বজায় রাখুন, বেশি পানি দিলে শিকড় দুর্বল হতে পারে।',
      aiNotesEn: 'Keep shallow water layer of 2-3 cm; avoid deep submergence.',
      category: 'irrigation'
    },
    {
      weekNum: 5,
      dateStr: '১৩ জুলাই ২০২৬',
      taskBn: 'প্রথম কিস্তি ইউরিয়া ও ট্রাইকো-কমপোস্ট সার প্রয়োগ',
      taskEn: '1st Top Dressing Urea & Organic Compost',
      priority: 'High',
      costBn: '৳ ১,৫০০',
      costEn: '৳ 1,500',
      timeEstBn: '২ ঘণ্টা',
      timeEstEn: '2 hours',
      materialsBn: 'ইউরিয়া সার ৭ কেজি, ট্রাইকো-কমপোস্ট ২০ কেজি',
      materialsEn: 'Urea 7kg, Trichocompost 20kg',
      aiNotesBn: 'বগুড়া অঞ্চলের আবহাওয়া বিচারে গুঁড়ি ইউরিয়া ব্যবহার করলে ২৫% সার অপচয় রোধ হয়।',
      aiNotesEn: 'Granular Urea minimizes volatilization losses under local temperatures.',
      category: 'fertilizer'
    },
    {
      weekNum: 6,
      dateStr: '২০ জুলাই ২০২৬',
      taskBn: 'নাবি ধসা ও পাতা লাল হওয়া পরীক্ষা',
      taskEn: 'Disease Inspection & Leaf Monitoring',
      priority: 'Medium',
      costBn: '৳ ০ (নিজের শ্রম)',
      costEn: '৳ 0 (Self)',
      timeEstBn: '১ ঘণ্টা',
      timeEstEn: '1 hour',
      materialsBn: 'কৃষিবাজার এআই ক্যামেরা অ্যাপ',
      materialsEn: 'KrishiBazar AI Scanner',
      aiNotesBn: 'পাতার কোণায় কোনো দাগ দেখলে সাথে সাথে এআই ক্যামেরা দিয়ে রোগ স্ক্যান করুন।',
      aiNotesEn: 'Scan leaf margins immediately if yellow or brown specks are visible.',
      category: 'disease'
    },
    {
      weekNum: 7,
      dateStr: '২৭ জুলাই ২০২৬',
      taskBn: 'মাজরা পোকা দমন ও পার্চিং (ডাল পোঁতা)',
      taskEn: 'Pest Prevention & Perching',
      priority: 'Medium',
      costBn: '৳ ৩০০',
      costEn: '৳ 300',
      timeEstBn: '২ ঘণ্টা',
      timeEstEn: '2 hours',
      materialsBn: 'বাঁশের কঞ্চি / ডালপালা, আলোক ফাদ',
      materialsEn: 'Bamboo branches, Light trap',
      aiNotesBn: 'বিঘা প্রতি ৫-৬ টি বাঁশের কঞ্চি পুতে দিলে ফিঙে পাখি ক্ষতিকর পোকা খেয়ে ফেলবে।',
      aiNotesEn: 'Set up T-perches to encourage insectivorous birds to consume stem borers.',
      category: 'pest'
    },
    {
      weekNum: 8,
      dateStr: '০৩ আগস্ট ২০২৬',
      taskBn: 'কুশি বৃদ্ধি ও দ্বিতীয় কিস্তি সার প্রয়োগ',
      taskEn: 'Tillering & 2nd Top Dressing',
      priority: 'High',
      costBn: '৳ ১,২০০',
      costEn: '৳ 1,200',
      timeEstBn: '২ ঘণ্টা',
      timeEstEn: '2 hours',
      materialsBn: 'ইউরিয়া ৬ কেজি, এমওপি (পটাশ) ৪ কেজি',
      materialsEn: 'Urea 6kg, MOP Potash 4kg',
      aiNotesBn: 'পটাশ সার ব্যবহার ধানের কান্ড শক্ত করে এবং ঝড়-বৃষ্টিতে গাছ ঢলে পড়া রোধ করে।',
      aiNotesEn: 'Potash application strengthens stems against lodging during rainy spells.',
      category: 'fertilizer'
    },
    {
      weekNum: 10,
      dateStr: '১৭ আগস্ট ২০২৬',
      taskBn: 'আগাছা নিড়ানো ও ড্রেন পরিষ্কার',
      taskEn: 'Weeding & Drainage Cleaning',
      priority: 'Medium',
      costBn: '৳ ৮০০',
      costEn: '৳ 800',
      timeEstBn: '৪ ঘণ্টা',
      timeEstEn: '4 hours',
      materialsBn: 'হাত নিড়ানি, কোদাল',
      materialsEn: 'Hand Hoe, Spade',
      aiNotesBn: 'আগাছা সার ও আলোর প্রতিযোগী হয়, তাই কুশি আসার সময় জমি পরিষ্কার রাখা জরুরি।',
      aiNotesEn: 'Remove invasive weeds to ensure maximum nutrient intake for tillers.',
      category: 'prep'
    },
    {
      weekNum: 12,
      dateStr: '৩১ আগস্ট ২০২৬',
      taskBn: 'শীষ বের হওয়া পর্যায় ও পানি বজায় রাখা',
      taskEn: 'Panicle Initiation & Flooding',
      priority: 'High',
      costBn: '৳ ৬০০',
      costEn: '৳ 600',
      timeEstBn: '৩ ঘণ্টা',
      timeEstEn: '3 hours',
      materialsBn: 'পানি সেচ পাম্প',
      materialsEn: 'Irrigation Pump',
      aiNotesBn: 'ফুল ও শীষ আসার সময় জমিতে ২-৩ ইঞ্চি পানি রাখা অতি জরুরি, নতুবা চিটা হতে পারে।',
      aiNotesEn: 'Maintain continuous moisture during flowering to prevent chaffy grains.',
      category: 'irrigation'
    },
    {
      weekNum: 14,
      dateStr: '১৪ সেপ্টেম্বর ২০২৬',
      taskBn: 'প্রি-হারভেস্ট পরীক্ষা ও সেচ বন্ধকরণ',
      taskEn: 'Pre-Harvest Inspection & Drainage',
      priority: 'Normal',
      costBn: '৳ ০',
      costEn: '৳ 0',
      timeEstBn: '১ ঘণ্টা',
      timeEstEn: '1 hour',
      materialsBn: 'ড্রেনেজ নালা কেটে দেওয়া',
      materialsEn: 'Drain outlet',
      aiNotesBn: 'কাটার ১০-১২ দিন আগে সেচ বন্ধ করুন যাতে জমি শক্ত হয় এবং ফসল কাটা সহজ হয়।',
      aiNotesEn: 'Drain field 10 days prior to harvest for soil firming and mechanical harvesting.',
      category: 'harvest'
    },
    {
      weekNum: 16,
      dateStr: '২৮ সেপ্টেম্বর ২০২৬',
      taskBn: 'ফসল কাটা, মাড়াই ও ধান শুকানো',
      taskEn: 'Harvesting, Threshing & Drying',
      priority: 'High',
      costBn: '৳ ৩,৫০০ / বিঘা',
      costEn: '৳ 3,500 / Bigha',
      timeEstBn: '২ দিন',
      timeEstEn: '2 days',
      materialsBn: 'কম্বাইন হারভেস্টার বা কাটানি শ্রমিক',
      materialsEn: 'Combine Harvester / Laborers',
      aiNotesBn: 'ধানের শতকরা ৮০ ভাগ সোনালী হলে ফসল কাটুন। রোদে শুকিয়ে ১২% আর্দ্রতায় আনুন।',
      aiNotesEn: 'Harvest when 80% grains turn golden; dry down to 12% moisture level.',
      category: 'harvest'
    },
    {
      weekNum: 18,
      dateStr: '১২ অক্টোবর ২০২৬',
      taskBn: 'পাইকারি আড়তে বিক্রয় ও এআই মার্কেটপ্লেস সংযোগ',
      taskEn: 'Marketplace Selling & Haat Dispatch',
      priority: 'High',
      costBn: '৳ ৫০০ (পরিবহন)',
      costEn: '৳ 500 (Transport)',
      timeEstBn: '১ দিন',
      timeEstEn: '1 day',
      materialsBn: 'কৃষিবাজার ডিজিটাল মার্কেটপ্লেস',
      materialsEn: 'KrishiBazar App Marketplace',
      aiNotesBn: 'মহাস্থান পাইকারি আড়ত বা সরাসরি কৃ্ষিবাজার অ্যাপের সেরা খরিদ্দারের কাছে বিক্রি করুন।',
      aiNotesEn: 'Sell at Mahasthan Haat or match with direct corporate buyers on KrishiBazar.',
      category: 'selling'
    }
  ];

  const handleSyncNotifications = () => {
    setSyncedReminders(true);
    showToast(isBn ? 'সিজনাল প্ল্যানের সকল টাস্ক নোটিফিকেশনে রিমাইন্ডার হিসেবে যুক্ত হয়েছে!' : 'All seasonal tasks synchronized to App Notifications!');
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

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-base font-extrabold text-gray-900 flex items-center justify-center gap-1.5">
            <CalendarDays className="w-5 h-5 text-[#2E7D32]" />
            <span>{isBn ? 'এআই সিজনাল প্ল্যানার' : 'AI Seasonal Farming Planner'}</span>
          </h2>
          <p className="text-[10px] text-gray-500">
            {isBn ? 'বীজ রোপণ থেকে বাজারজাতকরণ সম্পূর্ণ রোডম্যাপ' : 'End-to-End Farming Roadmap & Action Plan'}
          </p>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="bg-[#2E7D32] text-white p-2 rounded-full shadow-xs hover:bg-green-800 transition-colors"
          title={isBn ? 'রিপোর্ট জেনারেট করুন' : 'Generate Full Report'}
        >
          <Printer className="w-5 h-5" />
        </button>
      </div>

      {/* Farm & Crop Header Pill */}
      <div className="bg-[#2E7D32] text-white p-4 rounded-3xl shadow-md border border-green-600 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full font-bold text-green-100">
            {farm.district}, {farm.upazila}
          </span>
          <span className="text-[10px] bg-[#F9A825] text-gray-900 font-extrabold px-2.5 py-0.5 rounded-full">
            {isBn ? '১৮ সপ্তাহের সম্পূর্ণ রোডম্যাপ' : '18-Week Roadmap'}
          </span>
        </div>

        <h3 className="text-lg font-black text-white">
          {isBn ? farm.nameBn : farm.nameEn}
        </h3>
        <p className="text-xs text-green-100 flex items-center gap-1 font-semibold">
          <Sprout className="w-3.5 h-3.5 text-[#F9A825]" />
          <span>
            {isBn ? crop.cropNameBn : crop.cropNameEn} ({isBn ? crop.varietyBn : crop.varietyEn}) • {farm.areaDecimal} {isBn ? 'শতক' : 'Decimal'}
          </span>
        </p>
      </div>

      {/* SMART RECOMMENDATIONS MULTI-VARIABLE INPUT BOX */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-[#1B5E20] text-white p-4 rounded-3xl shadow-lg border border-emerald-500/30 space-y-2.5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-28 h-28 bg-yellow-400/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-center gap-2 relative z-10">
          <div className="w-7 h-7 rounded-xl bg-[#F9A825] text-gray-900 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white">
              {isBn ? 'এআই স্মার্ট প্যারামিটার বিশ্লেষণ Engine' : 'AI Multi-Variable Engine Inputs'}
            </h4>
            <p className="text-[10px] text-emerald-200">
              {isBn ? '১৫টি রিয়েল-টাইম উপাদান বিশ্লেষণ করে এই টাইমলাইন জেনারেট করা হয়েছে' : '15 real-time parameters calculated'}
            </p>
          </div>
        </div>

        {/* Input variables grid badges */}
        <div className="grid grid-cols-3 gap-1.5 text-[9px] font-bold text-emerald-100 relative z-10 pt-1">
          <span className="bg-white/10 px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-[#F9A825]" /> {farm.district} (GPS)
          </span>
          <span className="bg-white/10 px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <Droplets className="w-2.5 h-2.5 text-blue-300" /> {farm.soilTypeBn}
          </span>
          <span className="bg-white/10 px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <Building2 className="w-2.5 h-2.5 text-amber-300" /> সরকারি বিএসআরআই
          </span>
          <span className="bg-white/10 px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <Sprout className="w-2.5 h-2.5 text-green-300" /> পার্শ্ববর্তী খামার টপোলজি
          </span>
          <span className="bg-white/10 px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <DollarSign className="w-2.5 h-2.5 text-[#F9A825]" /> আড়ত বাজার পূর্বাভাস
          </span>
          <span className="bg-white/10 px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 text-emerald-300" /> আবহাওয়া ও আর্দ্রতা
          </span>
        </div>
      </div>

      {/* QUICK ACTION DOWNLOAD / PRINT / SHARE BUTTONS */}
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs space-y-2">
        <h4 className="text-xs font-black text-gray-900 flex items-center justify-between">
          <span>{isBn ? 'প্ল্যান এক্সপোর্ট ও শেয়ার অপশন:' : 'Export & Download Actions:'}</span>
          <span className="text-[10px] text-emerald-700 font-bold">{isBn ? 'PDF • প্রিন্ট • শেয়ার' : 'PDF • Print'}</span>
        </h4>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => setShowReportModal(true)}
            className="bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all text-xs"
          >
            <Download className="w-4 h-4 text-[#F9A825]" />
            <span>{isBn ? 'PDF ডাউনলোড' : 'Download PDF'}</span>
          </button>

          <button
            onClick={() => setShowReportModal(true)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all text-xs"
          >
            <Printer className="w-4 h-4 text-gray-600" />
            <span>{isBn ? 'প্রিন্ট ও রিপোর্ট' : 'Print Plan'}</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My KrishiBazar Farming Roadmap',
                  text: 'Check out my AI Seasonal Farming Plan on KrishiBazar!',
                  url: window.location.href,
                }).catch(() => {});
              } else {
                showToast(isBn ? 'প্ল্যান লিঙ্ক কপি করা হয়েছে!' : 'Plan link copied!');
              }
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs"
          >
            <Share2 className="w-3.5 h-3.5 text-gray-600" />
            <span>{isBn ? 'শেয়ার করুন' : 'Share Plan'}</span>
          </button>

          <button
            onClick={handleSyncNotifications}
            className={`font-extrabold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all ${
              syncedReminders
                ? 'bg-emerald-100 text-[#2E7D32] border border-emerald-300'
                : 'bg-emerald-50 text-[#2E7D32] hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>{syncedReminders ? (isBn ? '✓ সিঙ্ক সম্পন্ন' : '✓ Synced') : (isBn ? 'ক্যালেন্ডারে সিঙ্ক' : 'Sync Calendar')}</span>
          </button>
        </div>
      </div>

      {/* SEASON TIMELINE SECTION */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#2E7D32]" />
            <h3 className="text-sm font-extrabold text-gray-900">
              {isBn ? 'সিজন টাইমলাইন (Season Timeline Roadmap)' : 'Season Timeline Roadmap'}
            </h3>
          </div>
          <span className="text-[10px] text-gray-500 font-bold">
            {timelineSteps.length} {isBn ? 'টি ধাপ' : 'Steps'}
          </span>
        </div>

        {/* Vertical Timeline Items */}
        <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
          {timelineSteps.map((step, index) => {
            return (
              <div key={index} className="relative group">
                {/* Bullet indicator */}
                <div
                  className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-black shadow-xs ${
                    step.category === 'harvest' || step.category === 'selling'
                      ? 'bg-[#F9A825] text-gray-900 ring-2 ring-yellow-200'
                      : step.priority === 'High'
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-emerald-200 text-emerald-900'
                  }`}
                >
                  {step.weekNum}
                </div>

                {/* Step Card Content */}
                <div className="bg-gray-50/80 hover:bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-md transition-all space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md inline-block mb-1">
                        সপ্তাহ {step.weekNum} • {step.dateStr}
                      </span>
                      <h4 className="text-xs font-black text-gray-900 leading-snug">
                        {isBn ? step.taskBn : step.taskEn}
                      </h4>
                    </div>

                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                        step.priority === 'High'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : step.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {step.priority === 'High'
                        ? isBn ? 'জরুরি' : 'High'
                        : step.priority === 'Medium'
                        ? isBn ? 'মাঝারি' : 'Medium'
                        : isBn ? 'স্বাভাবিক' : 'Normal'}
                    </span>
                  </div>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold block">{isBn ? 'আনুমানিক খরচ:' : 'Est. Cost:'}</span>
                      <span className="font-extrabold text-[#2E7D32]">{isBn ? step.costBn : step.costEn}</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-gray-400 font-bold block">{isBn ? 'প্রয়োজনীয় সময়:' : 'Est. Time:'}</span>
                      <span className="font-bold text-gray-800">{isBn ? step.timeEstBn : step.timeEstEn}</span>
                    </div>

                    <div className="col-span-2">
                      <span className="text-[9px] text-gray-400 font-bold block">{isBn ? 'প্রয়োজনীয় উপকরণ:' : 'Required Materials:'}</span>
                      <span className="font-semibold text-gray-800">{isBn ? step.materialsBn : step.materialsEn}</span>
                    </div>
                  </div>

                  {/* AI Note */}
                  <div className="p-2 bg-emerald-50/80 rounded-xl border border-emerald-100 text-[10px] text-emerald-950 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F9A825] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">{isBn ? 'এআই নোট: ' : 'AI Note: '}</strong>
                      <span>{isBn ? step.aiNotesBn : step.aiNotesEn}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL DOWNLOADABLE FARM PLAN & REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto text-xs animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center font-bold">
                  KB
                </div>
                <div>
                  <h3 className="font-black text-sm text-gray-900">
                    {isBn ? 'কৃষিবাজার এআই ফার্মিং প্ল্যান রিপোর্ট' : 'KrishiBazar AI Farming Report'}
                  </h3>
                  <span className="text-[10px] text-gray-500">
                    {isBn ? 'অফিসিয়াল ফার্ম ম্যানেজমেন্ট অ্যান্ড অ্যাডভাইজরি' : 'Official Farm Advisory & Season Plan'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowReportModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PRINTABLE CONTENT AREA */}
            <div className="space-y-4 border border-gray-200 p-4 rounded-2xl bg-gray-50/50">
              {/* Header Box */}
              <div className="bg-[#2E7D32] text-white p-3 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-black text-sm">{isBn ? farm.nameBn : farm.nameEn}</h4>
                  <p className="text-[10px] text-emerald-100">{farm.upazila}, {farm.district} • {farm.areaDecimal} শতক</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] bg-[#F9A825] text-gray-900 font-extrabold px-2 py-0.5 rounded-full">
                    VERIFIED PLAN
                  </span>
                  <span className="block text-[9px] text-emerald-200 mt-0.5">ID: #KB-89204</span>
                </div>
              </div>

              {/* Crop Recommendation Summary */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-1">
                <span className="text-[10px] text-gray-400 font-bold block">{isBn ? 'সুপারিশকৃত ফসল' : 'Recommended Crop'}</span>
                <span className="font-black text-xs text-gray-900 block">{isBn ? crop.cropNameBn : crop.cropNameEn} ({crop.varietyBn})</span>
                <span className="text-[10px] text-[#2E7D32] font-extrabold block">{isBn ? 'প্রত্যাশিত লাভ: ৳৪৮,৫০০ / একর' : 'Est. Profit: ৳48,500 / Acre'}</span>
              </div>

              {/* Task Checklist Table */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-2">
                <h5 className="font-extrabold text-xs text-gray-900 border-b pb-1">
                  {isBn ? 'মৌসুমি টাস্ক চেকলিস্ট' : 'Season Task Checklist'}
                </h5>
                <ul className="space-y-1 text-[11px] text-gray-700">
                  <li className="flex items-center gap-1.5">✓ জমি চাষ ও জৈব সার প্রয়োগ (সপ্তাহ ১)</li>
                  <li className="flex items-center gap-1.5">✓ বীজ শোধন ও চারা রোপণ (সপ্তাহ ২-৩)</li>
                  <li className="flex items-center gap-1.5">✓ সুষম ইউরিয়া ও পটাশ উপরিপ্রয়োগ (সপ্তাহ ৫-৮)</li>
                  <li className="flex items-center gap-1.5">✓ AWD সেচ ও ড্রেনেজ পয়েন্ট নিশ্চিতকরণ (সপ্তাহ ৪-১২)</li>
                  <li className="flex items-center gap-1.5">✓ ফসল কাটা, শুকানো ও আড়তে বিক্রয় (সপ্তাহ ১৬-১৮)</li>
                </ul>
              </div>

              {/* Disease & Pest Prevention Checklist */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-1.5">
                <h5 className="font-extrabold text-xs text-gray-900 border-b pb-1">
                  {isBn ? 'রোগ ও বালাই প্রতিরোধ ব্যবস্থা' : 'Pest & Disease Protocols'}
                </h5>
                <p className="text-[10px] text-gray-600">
                  • ধানের ব্লাস্ট রোধে নাটিভো বা ট্রাইসাইক্লাজল ০.৬ গ্রাম/লিটার প্রয়োগ রাখুন।<br />
                  • মাজরা পোকা দমনে আলোক ফাদ ও ডাল পোঁতা (পার্চিং) অব্যাহত রাখুন।
                </p>
              </div>

              {/* Govt Advisory & QR Code Box */}
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-between text-[10px]">
                <div>
                  <span className="font-extrabold text-emerald-900 block">🏛️ সরকারি কৃষি সম্প্রসারণ তথ্য</span>
                  <span className="text-gray-600 block mt-0.5">ডিএই বগুড়া ও রংপুর আঞ্চলিক শস্য অ্যাডভাইজরি ৩.০</span>
                </div>
                {/* QR Code Placeholder */}
                <div className="w-12 h-12 bg-white border border-emerald-300 rounded-lg p-1 shrink-0 flex flex-col items-center justify-center">
                  <QrCode className="w-8 h-8 text-gray-800" />
                  <span className="text-[7px] text-gray-500 font-bold">VERIFY</span>
                </div>
              </div>
            </div>

            {/* Action Buttons inside modal */}
            <div className="flex gap-2 pt-1 border-t">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 bg-[#2E7D32] hover:bg-green-800 text-white font-extrabold py-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 text-xs"
              >
                <Printer className="w-4 h-4" />
                <span>{isBn ? 'প্রিন্ট / PDF সেভ' : 'Print / Save PDF'}</span>
              </button>

              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-xs"
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
