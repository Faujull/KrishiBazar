import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  User,
  Phone,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  PhoneCall,
  Globe,
  LogOut,
  ChevronRight,
  Edit3,
  Settings,
  HelpCircle,
  Bell,
  ShoppingBag,
  Moon,
  Calendar,
  Tractor,
  Sprout,
  Store,
  Check
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { language, toggleLanguage, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Profile Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4 relative overflow-hidden">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1 bg-[#2E7D32]/10 text-[#2E7D32] border border-green-200 px-2.5 py-0.5 rounded-full text-[11px] font-black">
            <Sprout className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>{language === 'bn' ? 'স্মার্ট কৃষক' : 'Smart Farmer'}</span>
          </div>

          <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F9A825]" />
            <span>{language === 'bn' ? 'যাচাইকৃত আইডি' : 'Verified ID'}</span>
          </div>
        </div>

        {/* User Info Avatar & Title */}
        <div className="flex items-center gap-4 pt-1">
          <div className="relative w-16 h-16 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
              alt="Farmer Avatar"
              className="w-full h-full rounded-full object-cover border-2 border-green-200 shadow-md"
            />
            <div
              className="absolute bottom-0 right-0 bg-[#2E7D32] text-white p-0.5 rounded-full shadow-md"
              title="Verified Farmer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F9A825]" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-extrabold text-gray-900 truncate">
              {t('welcomeFarmer')}
            </h2>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5 font-medium">
              <Phone className="w-3 h-3 text-[#2E7D32]" />
              <span>01712345678</span>
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#2E7D32]" />
              <span>{t('locationTag')}</span>
            </p>
          </div>
        </div>

        {/* Meta badges (Farms count & Member since) */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
          <div className="bg-gray-50 p-2 rounded-xl flex items-center gap-2">
            <Tractor className="w-4 h-4 text-[#2E7D32]" />
            <div>
              <span className="text-[10px] text-gray-400 block font-medium">
                {language === 'bn' ? 'বর্তমান খামার' : 'Current Farms'}
              </span>
              <span className="font-bold text-gray-900">
                {language === 'bn' ? '৩ টি খামার' : '3 Farms'}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-2 rounded-xl flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#F9A825]" />
            <div>
              <span className="text-[10px] text-gray-400 block font-medium">
                {language === 'bn' ? 'সদস্য হয়েছেন' : 'Member Since'}
              </span>
              <span className="font-bold text-gray-900">
                {language === 'bn' ? 'জানুয়ারি ২০২৪' : 'Jan 2024'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Statistics Grid */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {language === 'bn' ? 'খামার ও লেনদেন পরিসংখ্যান' : 'Quick Statistics'}
        </h3>

        <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
          <div className="bg-green-50/70 p-2.5 rounded-2xl border border-green-100">
            <span className="text-base font-black text-[#2E7D32] block">৩</span>
            <span className="text-[10px] text-gray-600 font-bold block mt-0.5">
              {language === 'bn' ? 'মোট খামার' : 'Total Farms'}
            </span>
          </div>

          <div className="bg-amber-50/70 p-2.5 rounded-2xl border border-amber-100">
            <span className="text-base font-black text-amber-800 block">৫</span>
            <span className="text-[10px] text-gray-600 font-bold block mt-0.5">
              {language === 'bn' ? 'চলতি ফসল' : 'Active Crops'}
            </span>
          </div>

          <div className="bg-blue-50/70 p-2.5 rounded-2xl border border-blue-100">
            <span className="text-base font-black text-blue-800 block">২</span>
            <span className="text-[10px] text-gray-600 font-bold block mt-0.5">
              {language === 'bn' ? 'পোস্ট বিক্রয়' : 'Listed'}
            </span>
          </div>

          <div className="bg-purple-50/70 p-2.5 rounded-2xl border border-purple-100">
            <span className="text-base font-black text-purple-800 block">১৪</span>
            <span className="text-[10px] text-gray-600 font-bold block mt-0.5">
              {language === 'bn' ? 'অর্ডার সম্পন্ন' : 'Orders'}
            </span>
          </div>
        </div>
      </div>

      {/* Toggles Bar: Language & Dark Mode UI */}
      <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-3 text-xs">
        {/* Language selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-[#2E7D32]" />
            <span className="font-bold text-gray-900">
              {language === 'bn' ? 'ভাষা (Language)' : 'Language'}
            </span>
          </div>

          <button
            onClick={toggleLanguage}
            className="bg-green-50 border border-green-200 text-[#2E7D32] px-3 py-1 rounded-xl text-xs font-black hover:bg-green-100 transition-colors"
          >
            {t('toggleLang')}
          </button>
        </div>

        {/* Dark mode UI toggle */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2.5">
            <Moon className="w-4 h-4 text-[#2E7D32]" />
            <span className="font-bold text-gray-900">
              {language === 'bn' ? 'ডার্ক থিম (UI)' : 'Dark Mode (UI)'}
            </span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              darkMode ? 'bg-[#2E7D32]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                darkMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Account Navigation List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs divide-y divide-gray-100 text-xs font-bold">
        {/* Edit Profile */}
        <Link
          to="/edit-profile"
          className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-50 text-[#2E7D32] flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <span className="text-gray-900">{language === 'bn' ? 'প্রোফাইল সম্পাদনা' : 'Edit Profile'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Link>

        {/* Verification */}
        <Link
          to="/verification"
          className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-gray-900 block">{language === 'bn' ? 'কৃষক কার্ড ও ভেরিফিকেশন' : 'Verification Status'}</span>
              <span className="text-[10px] text-emerald-700 font-normal">✓ 100% Verified</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Link>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
            </div>
            <span className="text-gray-900">{language === 'bn' ? 'নোটিফিকেশন সমুহ' : 'Notifications'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Link>

        {/* My Orders */}
        <Link
          to="/orders"
          className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-gray-900">{language === 'bn' ? 'আমার অর্ডার ও বিক্রয় রেকর্ড' : 'My Orders & Sales'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Link>

        {/* Settings */}
        <Link
          to="/settings"
          className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-gray-900">{language === 'bn' ? 'অ্যাপ সেটিংস' : 'Settings'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Link>

        {/* Help & Support */}
        <Link
          to="/help-support"
          className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="text-gray-900">{language === 'bn' ? 'সাহায্য ও কাস্টমার সাপোর্ট' : 'Help & Support'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Link>

        {/* Logout */}
        <Link
          to="/auth"
          className="p-4 flex items-center justify-between text-red-600 hover:bg-red-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span>{language === 'bn' ? 'লগআউট করুন' : 'Log Out'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-red-400" />
        </Link>
      </div>
    </div>
  );
};
