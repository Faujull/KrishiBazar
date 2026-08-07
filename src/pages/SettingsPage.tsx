import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  Globe,
  Bell,
  Moon,
  Lock,
  Eye,
  Info,
  HelpCircle,
  MessageSquare,
  PhoneCall,
  Trash2,
  LogOut,
  ChevronRight,
  Shield,
  FileText,
  X
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  // Toggles
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [shareLocation, setShareLocation] = useState(true);

  // Modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleClearCache = () => {
    alert(language === 'bn' ? 'ক্যাশ সফলভাবে পরিষ্কার করা হয়েছে!' : 'Cache cleared successfully!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) return;
    setShowPasswordModal(false);
    setOldPassword('');
    setNewPassword('');
    alert(language === 'bn' ? 'পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!' : 'Password updated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs">
        <button
          onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-extrabold text-base text-gray-900">
          {language === 'bn' ? 'অ্যাপ সেটিংস' : 'Settings'}
        </h2>
        <div className="w-9 h-9"></div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 space-y-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {language === 'bn' ? 'সাধারণ সেটিংস' : 'General Settings'}
        </h3>

        {/* Language selector */}
        <div className="flex items-center justify-between py-1 text-xs">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-[#2E7D32]" />
            <div>
              <span className="font-bold text-gray-900 block">{language === 'bn' ? 'ভাষা (Language)' : 'Language'}</span>
              <span className="text-[10px] text-gray-500">{language === 'bn' ? 'বাংলা সিলেক্টেড' : 'English selected'}</span>
            </div>
          </div>
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="px-3 py-1.5 rounded-xl bg-green-50 border border-green-200 text-[#2E7D32] font-extrabold"
          >
            {language === 'bn' ? 'English' : 'বাংলা'}
          </button>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between py-1 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-[#2E7D32]" />
            <div>
              <span className="font-bold text-gray-900 block">{language === 'bn' ? 'পুশ নোটিফিকেশন' : 'Push Notifications'}</span>
              <span className="text-[10px] text-gray-500">{language === 'bn' ? 'ফসল ও আবহাওয়ার আপডেট' : 'Crop & Weather Alerts'}</span>
            </div>
          </div>
          <button
            onClick={() => setPushNotifs(!pushNotifs)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              pushNotifs ? 'bg-[#2E7D32]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                pushNotifs ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>

        {/* Theme Dark Mode UI */}
        <div className="flex items-center justify-between py-1 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-2.5">
            <Moon className="w-4 h-4 text-[#2E7D32]" />
            <div>
              <span className="font-bold text-gray-900 block">{language === 'bn' ? 'ডার্ক মোড (UI)' : 'Dark Mode (UI)'}</span>
              <span className="text-[10px] text-gray-500">{language === 'bn' ? 'রাতের মোড' : 'Night visual mode'}</span>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              darkMode ? 'bg-[#2E7D32]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Security & Privacy */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 space-y-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {language === 'bn' ? 'নিরাপত্তা ও গোপনীয়তা' : 'Security & Privacy'}
        </h3>

        {/* Password */}
        <button
          onClick={() => setShowPasswordModal(true)}
          className="w-full flex items-center justify-between py-1 text-xs text-left"
        >
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#2E7D32]" />
            <div>
              <span className="font-bold text-gray-900 block">{language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Change Password'}</span>
              <span className="text-[10px] text-gray-500">{language === 'bn' ? 'পিন বা পাসওয়ার্ড সিকিউরিটি' : 'Update account PIN or password'}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        {/* Public Profile */}
        <div className="flex items-center justify-between py-1 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-2.5">
            <Eye className="w-4 h-4 text-[#2E7D32]" />
            <div>
              <span className="font-bold text-gray-900 block">{language === 'bn' ? 'পাবলিক প্রোফাইল' : 'Public Profile'}</span>
              <span className="text-[10px] text-gray-500">{language === 'bn' ? 'মার্কেটপ্লেসে ক্রেতারা দেখতে পাবেন' : 'Visible to buyers on Marketplace'}</span>
            </div>
          </div>
          <button
            onClick={() => setPublicProfile(!publicProfile)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              publicProfile ? 'bg-[#2E7D32]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                publicProfile ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* App Info & About */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 space-y-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {language === 'bn' ? 'অ্যাপ সম্পর্কে' : 'App Info & Legal'}
        </h3>

        <div className="flex items-center justify-between py-1 text-xs">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#2E7D32]" />
            <div>
              <span className="font-bold text-gray-900 block">KrishiBazar App</span>
              <span className="text-[10px] text-gray-500">Version 2.5.0 (Build 8820)</span>
            </div>
          </div>
          <span className="text-[10px] bg-green-100 text-[#2E7D32] px-2 py-0.5 rounded-full font-bold">
            Up to date
          </span>
        </div>

        <button
          onClick={() => setShowTermsModal(true)}
          className="w-full flex items-center justify-between py-1 border-t border-gray-100 text-xs text-left"
        >
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-[#2E7D32]" />
            <span className="font-bold text-gray-900">{language === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={() => setShowPrivacyModal(true)}
          className="w-full flex items-center justify-between py-1 border-t border-gray-100 text-xs text-left"
        >
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#2E7D32]" />
            <span className="font-bold text-gray-900">{language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Support Quick Links */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 space-y-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {language === 'bn' ? 'সহায়তা' : 'Support'}
        </h3>

        <button
          onClick={() => navigate('/help-support')}
          className="w-full flex items-center justify-between py-1 text-xs text-left"
        >
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#2E7D32]" />
            <span className="font-bold text-gray-900">{language === 'bn' ? 'হেল্প এন্ড সাপোর্ট সেন্টার' : 'Help & Support Center'}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          onClick={handleClearCache}
          className="w-full flex items-center justify-between py-1 border-t border-gray-100 text-xs text-left"
        >
          <div className="flex items-center gap-2.5">
            <Trash2 className="w-4 h-4 text-amber-600" />
            <div>
              <span className="font-bold text-gray-900 block">{language === 'bn' ? 'ক্যাশ মেমোরি ক্লিয়ার' : 'Clear App Cache'}</span>
              <span className="text-[10px] text-gray-500">{language === 'bn' ? 'মেমোরি ফাকা করুন' : 'Free temporary app memory'}</span>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 font-medium">12.4 MB</span>
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={() => navigate('/auth')}
        className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
      >
        <LogOut className="w-4 h-4" />
        <span>{language === 'bn' ? 'লগআউট করুন' : 'Log Out Account'}</span>
      </button>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-2xl p-5 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-bold text-gray-900">{language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Change Password'}</h4>
              <button onClick={() => setShowPasswordModal(false)}>
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">বর্তমান পাসওয়ার্ড</label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full bg-gray-50 border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">নতুন পাসওয়ার্ড</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-50 border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2E7D32] text-white font-bold py-2.5 rounded-xl shadow-md"
              >
                {language === 'bn' ? 'পরিবর্তন নিশ্চিত করুন' : 'Confirm Change'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-3 text-xs max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-bold text-gray-900">{language === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service'}</h4>
              <button onClick={() => setShowTermsModal(false)}>
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 text-gray-600 pr-1 text-[11px] leading-relaxed">
              <p>১. কৃষিবাজার প্ল্যাটফর্মে প্রকাশিত তথ্যের নির্ভুলতা নিশ্চিত করা কৃষকদের দায়িত্ব।</p>
              <p>২. এআই রোগ নির্ণয়ের ফলাফল শুধুমাত্র পরামর্শমূলক। চূড়ান্ত প্রয়োগের পূর্বে স্থানীয় উপ-সহকারী কৃষি কর্মকর্তার পরামর্শ গ্রহণ করুন।</p>
              <p>৩. ক্রয়-বিক্রয়ের ক্ষেত্রে সকল আর্থিক লেনদেন সরাসরি কৃষক ও ক্রেতার মাধ্যমে সম্পন্ন হবে।</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-3 text-xs max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-bold text-gray-900">{language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}</h4>
              <button onClick={() => setShowPrivacyModal(false)}>
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 text-gray-600 pr-1 text-[11px] leading-relaxed">
              <p>১. আমরা কৃষকের ব্যক্তিগত তথ্য বা ফোন নম্বর অনুমতি ব্যতীত তৃতীয় পক্ষের নিকট বিক্রি করি না।</p>
              <p>২. খামারের লোকেশন বা মাটির ছবি শুধুমাত্র এআই মডেল এবং আবহাওয়া পূর্বাভাসের কাজে ব্যবহৃত হয়।</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
