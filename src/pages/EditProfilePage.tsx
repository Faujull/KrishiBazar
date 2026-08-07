import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Camera, Save, User, Phone, MapPin, Globe, Check, Image as ImageIcon } from 'lucide-react';

export const EditProfilePage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [name, setName] = useState(language === 'bn' ? 'মোঃ রফিকুল ইসলাম' : 'Md. Rafiqul Islam');
  const [phone, setPhone] = useState('01712345678');
  const [district, setDistrict] = useState(language === 'bn' ? 'বগুড়া' : 'Bogura');
  const [upazila, setUpazila] = useState(language === 'bn' ? 'বগুড়া সদর' : 'Bogura Sadar');
  const [address, setAddress] = useState(language === 'bn' ? 'গ্রাম: নিশিন্দারা, ওয়ার্ড নং ৫' : 'Village: Nishindara, Ward 5');
  const [selectedLang, setSelectedLang] = useState<'bn' | 'en'>(language);
  
  const [avatarPreview, setAvatarPreview] = useState<string>(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLanguage(selectedLang);
    alert(language === 'bn' ? 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে!' : 'Profile updated successfully!');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs">
        <button
          onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-extrabold text-base text-gray-900">
          {language === 'bn' ? 'প্রোফাইল এডিট করুন' : 'Edit Profile'}
        </h2>
        <div className="w-9 h-9"></div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        {/* Photo Upload Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs text-center space-y-3">
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={avatarPreview}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-green-100 shadow-md"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#2E7D32] text-white flex items-center justify-center shadow-md hover:bg-green-800 transition-transform active:scale-90"
              title="Change Photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />

          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-bold text-[#2E7D32] hover:underline"
            >
              {language === 'bn' ? 'ছবি পরিবর্তন করুন' : 'Change Profile Photo'}
            </button>
            <p className="text-[10px] text-gray-400 mt-0.5">
              JPG, PNG (Max 5MB)
            </p>
          </div>
        </div>

        {/* Input Fields Card */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">
              {language === 'bn' ? 'পূর্ণ নাম' : 'Full Name'} *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">
              {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'} *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>

          {/* District & Upazila */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">
                {language === 'bn' ? 'জেলা' : 'District'} *
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">
                {language === 'bn' ? 'উপজেলা' : 'Upazila'} *
              </label>
              <input
                type="text"
                required
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">
              {language === 'bn' ? 'বিস্তারিত ঠিকানা / গ্রাম' : 'Detailed Address'}
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>
          </div>

          {/* Preferred Language */}
          <div className="space-y-1 pt-1">
            <label className="font-bold text-gray-700 block">
              {language === 'bn' ? 'পছন্দের ভাষা (Preferred Language)' : 'Preferred Language'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedLang('bn')}
                className={`py-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                  selectedLang === 'bn'
                    ? 'bg-emerald-50 border-[#2E7D32] text-[#2E7D32] ring-1 ring-[#2E7D32]'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                <span>🇧🇩 বাংলা</span>
                {selectedLang === 'bn' && <Check className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setSelectedLang('en')}
                className={`py-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                  selectedLang === 'en'
                    ? 'bg-emerald-50 border-[#2E7D32] text-[#2E7D32] ring-1 ring-[#2E7D32]'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                <span>🇬🇧 English</span>
                {selectedLang === 'en' && <Check className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl shadow-xs active:scale-95 transition-all text-xs"
          >
            {language === 'bn' ? 'বাতিল' : 'Cancel'}
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#2E7D32] hover:bg-green-800 text-white font-extrabold py-3 rounded-xl shadow-md active:scale-95 transition-all text-xs flex items-center justify-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
