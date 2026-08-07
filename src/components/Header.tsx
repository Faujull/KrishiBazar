import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Globe, PhoneCall, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-[#2E7D32] text-white shadow-md">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 group-active:scale-95 transition-transform">
            <Sprout className="w-6 h-6 text-[#F9A825]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none text-white">
              {t('appName')}
            </h1>
            <p className="text-[11px] text-green-100 font-medium">
              {language === 'bn' ? 'স্মার্ট কৃষি প্ল্যাটফর্ম' : 'Smart Agriculture Platform'}
            </p>
          </div>
        </Link>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 border border-white/20 text-xs font-semibold text-white transition-all"
            title="Toggle Language / ভাষা পরিবর্তন করুন"
          >
            <Globe className="w-3.5 h-3.5 text-[#F9A825]" />
            <span>{t('toggleLang')}</span>
          </button>

          {/* Agri Hotline Call Shortcut */}
          <a
            href="tel:16123"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-95 transition-transform"
            title="কৃষি কল সেন্টার ১৬১২৩"
          >
            <PhoneCall className="w-4 h-4 text-green-200" />
          </a>

          {/* Notification Icon */}
          <Link 
            to="/notifications"
            className="relative w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-95 transition-transform"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F9A825] ring-2 ring-[#2E7D32]"></span>
          </Link>
        </div>
      </div>
    </header>
  );
};
