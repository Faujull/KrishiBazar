import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, Phone, MapPin, CheckCircle2, ShieldCheck, PhoneCall, Globe, LogOut, ChevronRight } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Profile Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center space-y-3">
        <div className="relative w-20 h-20 mx-auto">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
            alt="Farmer Avatar"
            className="w-full h-full rounded-full object-cover border-4 border-green-100 shadow-md"
          />
          <div className="absolute bottom-0 right-0 bg-[#2E7D32] text-white p-1 rounded-full shadow-md" title="যাচাইকৃত কৃষক">
            <CheckCircle2 className="w-4 h-4 text-[#F9A825]" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-gray-900 flex items-center justify-center gap-1.5">
            <span>{t('welcomeFarmer')}</span>
          </h2>
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>{t('locationTag')}</span>
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-green-50 text-[#2E7D32] border border-green-200 px-3 py-1 rounded-full text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
          <span>{language === 'bn' ? 'যাচাইকৃত কৃষক আইডি: BD-88291' : 'Verified Farmer ID: BD-88291'}</span>
        </div>
      </div>

      {/* Quick Settings & Actions List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs divide-y divide-gray-100 text-xs">
        <button
          onClick={toggleLanguage}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-50 text-[#2E7D32] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="font-bold text-gray-900 block">{language === 'bn' ? 'ভাষা পরিবর্তন (Language)' : 'Change Language'}</span>
              <span className="text-[10px] text-gray-500">{t('toggleLang')}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <a
          href="tel:16123"
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="font-bold text-gray-900 block">{t('callHelpline')}</span>
              <span className="text-[10px] text-gray-500">{language === 'bn' ? 'বিনামূল্যে কৃষি পরামর্শ পান' : 'Free Ag Advisory Helpline'}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </a>

        <Link
          to="/auth"
          className="w-full p-4 flex items-center justify-between text-red-600 hover:bg-red-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-bold">{language === 'bn' ? 'লগআউট করুন' : 'Log Out'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-red-400" />
        </Link>
      </div>
    </div>
  );
};
