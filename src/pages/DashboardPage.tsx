import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_CROPS, INITIAL_MARKET_PRICES } from '../data/mockData';
import {
  ScanLine,
  CalendarDays,
  TrendingUp,
  PlusCircle,
  CloudSun,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Droplets,
  MapPin,
  Tractor,
  Sparkles
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24">
      {/* Top Banner Greeting */}
      <div className="bg-[#2E7D32] text-white pt-2 pb-8 px-4 rounded-b-3xl shadow-sm">
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-green-200 font-medium">
                {language === 'bn' ? 'আসসালামু আলাইকুম' : 'Hello & Welcome'}
              </span>
              <h2 className="text-lg font-extrabold flex items-center gap-1.5">
                {t('welcomeFarmer')}
              </h2>
            </div>
            <div className="flex items-center gap-1 text-xs bg-white/15 px-2.5 py-1 rounded-full border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-[#F9A825]" />
              <span>{t('locationTag')}</span>
            </div>
          </div>

          {/* Weather Widget Card */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#F9A825]/20 flex items-center justify-center text-[#F9A825]">
                <CloudSun className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black">৩৪° সে</span>
                  <span className="text-xs bg-green-800/60 px-2 py-0.5 rounded-full text-green-100">
                    {language === 'bn' ? 'আংশিক মেঘলা' : 'Partly Cloudy'}
                  </span>
                </div>
                <p className="text-xs text-green-100 mt-0.5 flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-200" />
                  <span>{t('weatherDesc')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-4 space-y-5">
        {/* Urgent AI Disease Risk Alert */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-3.5 shadow-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1">
              <span>{language === 'bn' ? 'বিশেষ সতর্কতা: কুয়াশাচ্ছন্ন আবহাওয়া' : 'Weather Alert: Foggy Conditions'}</span>
            </h4>
            <p className="text-[11px] text-amber-800 leading-tight">
              {language === 'bn'
                ? 'বগুড়া ও রংপুর অঞ্চলে আলুর নাবি ধসা রোগের ঝুঁকি বেশি। পাতায় কোনো দাগ থাকলে এআই রোগ স্ক্যান করুন।'
                : 'High risk of Potato Late Blight in northern districts. Scan leaves if spots appear.'}
            </p>
            <Link
              to="/disease-detection"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E7D32] hover:underline pt-0.5"
            >
              <span>{t('actionScanDisease')}</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* AI CROP INTELLIGENCE CENTER BANNER */}
        <Link
          to="/ai-intelligence/f1"
          className="bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white p-4 rounded-2xl shadow-md border border-emerald-400/30 flex items-center justify-between hover:shadow-lg transition-all active:scale-98 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#F9A825] animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-emerald-200 uppercase tracking-wider block">
                {language === 'bn' ? 'ডিজিটাল সিদ্ধান্ত কেন্দ্র' : 'Digital Decision Support'}
              </span>
              <h4 className="text-sm font-extrabold text-white leading-snug">
                {language === 'bn' ? 'এআই ক্রপ ইন্টেলিজেন্স সেন্টার' : 'AI Crop Intelligence Center'}
              </h4>
              <p className="text-[10px] text-emerald-100 mt-0.5">
                {language === 'bn' ? 'রোগ, পোকা, সার, সেচ ও লাভ-ক্ষতির ৮টি এআই অ্যানালাইসিস' : '8 AI Analysis Modules for Disease, Pest, Fertilizer & Yield'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#F9A825] group-hover:translate-x-0.5 transition-transform shrink-0" />
        </Link>

        {/* Quick Action Grid */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-800 flex items-center justify-between">
            <span>{t('quickActions')}</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Primary Action: AI Disease Scan */}
            <Link
              to="/disease-detection"
              className="bg-gradient-to-br from-[#2E7D32] to-[#388E3C] text-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-98 flex flex-col justify-between h-28 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <ScanLine className="w-6 h-6 text-[#F9A825]" />
                </div>
                <Sparkles className="w-4 h-4 text-[#F9A825] animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight leading-tight">
                  {t('actionScanDisease')}
                </h4>
                <p className="text-[10px] text-green-100">
                  {language === 'bn' ? 'ছবি তুলে রোগ নির্ণয় করুন' : 'Photo based diagnosis'}
                </p>
              </div>
            </Link>

            {/* Action 2: Crop Calendar */}
            <Link
              to="/crop-calendar"
              className="bg-white border border-gray-100 p-4 rounded-2xl shadow-xs hover:shadow-md transition-all active:scale-98 flex flex-col justify-between h-28"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-900 tracking-tight">
                  {t('actionCropCalendar')}
                </h4>
                <p className="text-[10px] text-gray-500">
                  {language === 'bn' ? 'সাপ্তাহিক যত্ন ও সার' : 'Weekly care schedule'}
                </p>
              </div>
            </Link>

            {/* Action 3: Market Prices */}
            <Link
              to="/market-prices"
              className="bg-white border border-gray-100 p-4 rounded-2xl shadow-xs hover:shadow-md transition-all active:scale-98 flex flex-col justify-between h-28"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-900 tracking-tight">
                  {t('actionMarketPrice')}
                </h4>
                <p className="text-[10px] text-gray-500">
                  {language === 'bn' ? 'পাইকারি বাজার দর' : 'Wholesale market rates'}
                </p>
              </div>
            </Link>

            {/* Action 4: Add Farm / Add Crop */}
            <Link
              to="/add-farm"
              className="bg-white border border-gray-100 p-4 rounded-2xl shadow-xs hover:shadow-md transition-all active:scale-98 flex flex-col justify-between h-28"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-900 tracking-tight">
                  {t('actionAddCrop')}
                </h4>
                <p className="text-[10px] text-gray-500">
                  {language === 'bn' ? 'খামারে নতুন ফসল' : 'Register new crop'}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Active Crops Overview Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <Tractor className="w-4 h-4 text-[#2E7D32]" />
              <span>{t('activeCrops')}</span>
            </h3>
            <Link to="/my-farm" className="text-xs text-[#2E7D32] font-semibold hover:underline">
              {language === 'bn' ? 'সব দেখুন' : 'View All'}
            </Link>
          </div>

          <div className="space-y-2.5">
            {INITIAL_CROPS.map((crop) => (
              <Link
                key={crop.id}
                to={`/crop-details/${crop.id}`}
                className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between hover:shadow-md transition-all active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={crop.imageUrl}
                    alt={crop.cropNameBn}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">
                      {language === 'bn' ? crop.cropNameBn : crop.cropNameEn}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {language === 'bn' ? crop.varietyBn : crop.varietyEn} • {crop.areaDecimal} {language === 'bn' ? 'শতক' : 'Decimal'}
                    </p>
                    <span className="text-[10px] bg-green-50 text-[#2E7D32] px-2 py-0.5 rounded-md font-medium mt-1 inline-block">
                      {language === 'bn' ? crop.stageBn : crop.stageEn}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  {crop.status === 'warning' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      <AlertTriangle className="w-3 h-3" />
                      {language === 'bn' ? 'ঝুঁকি' : 'Risk'}
                    </span>
                  )}
                  {crop.status === 'healthy' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-green-100 text-[#2E7D32] px-2 py-1 rounded-full">
                      {language === 'bn' ? 'সুস্থ' : 'Healthy'}
                    </span>
                  )}
                  {crop.status === 'critical' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      <ShieldAlert className="w-3 h-3" />
                      {language === 'bn' ? 'আক্রান্ত' : 'Infected'}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400 mt-2 ml-auto" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Wholesale Market Highlights */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>{t('todayMarketHighlights')}</span>
            </h3>
            <Link to="/market-prices" className="text-xs text-[#2E7D32] font-semibold hover:underline">
              {language === 'bn' ? 'সকল বাজার' : 'View All'}
            </Link>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs divide-y divide-gray-100">
            {INITIAL_MARKET_PRICES.slice(0, 3).map((item) => (
              <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-gray-900">
                    {language === 'bn' ? item.commodityBn : item.commodityEn}
                  </h5>
                  <p className="text-[10px] text-gray-500">
                    {language === 'bn' ? item.marketNameBn : item.marketNameEn} ({item.district})
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-sm text-gray-900">
                    ৳ {item.pricePerKg} <span className="text-[10px] text-gray-500 font-normal">/ কেজি</span>
                  </span>
                  <p className="text-[10px] text-green-700 font-medium">
                    ৳ {item.pricePerMon} / মন (৪০কেজি)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
