import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Phone, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [step, setStep] = useState<'splash' | 'login' | 'otp'>('splash');
  const [phone, setPhone] = useState('01712345678');
  const [otp, setOtp] = useState(['5', '2', '8', '0']);
  const [name, setName] = useState('মোঃ রফিকুল ইসলাম');
  const [district, setDistrict] = useState('বগুড়া');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 11) {
      setStep('otp');
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful authentication
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2E7D32] via-[#388E3C] to-[#1B5E20] text-white flex flex-col justify-between p-6 max-w-md mx-auto relative overflow-hidden">
      {/* Decorative BG Accents */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#F9A825]/20 rounded-full blur-2xl pointer-events-none"></div>

      {/* Top Header Controls */}
      <div className="flex justify-between items-center z-10 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-[#F9A825]" />
          </div>
          <span className="font-bold text-lg tracking-wide">{t('appName')}</span>
        </div>
        <button
          onClick={toggleLanguage}
          className="text-xs bg-white/20 px-3 py-1.5 rounded-full border border-white/30 font-semibold active:scale-95 transition-transform"
        >
          {t('toggleLang')}
        </button>
      </div>

      {/* Main Content Area */}
      {step === 'splash' && (
        <div className="my-auto text-center space-y-6 z-10 animate-in fade-in zoom-in duration-300">
          <div className="w-24 h-24 bg-white/15 backdrop-blur-md rounded-3xl mx-auto flex items-center justify-center border border-white/30 shadow-2xl">
            <Sprout className="w-14 h-14 text-[#F9A825]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">
              {language === 'bn' ? 'কৃষিবাজারে স্বাগতম' : 'Welcome to KrishiBazar'}
            </h2>
            <p className="text-green-100 text-sm max-w-xs mx-auto">
              {language === 'bn'
                ? 'বাংলাদেশের কৃষকদের জন্য কৃত্রিম বুদ্ধিমত্তা চালিত স্মার্ট কৃষি সেবা'
                : 'AI-Powered Smart Agriculture Platform for Bangladeshi Farmers'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-left space-y-2.5 text-xs text-green-50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F9A825]" />
              <span>{language === 'bn' ? 'এআই দ্বারা ৩ সেকেন্ডে ফসলের রোগ নির্ণয়' : '3-second AI Crop Disease Identification'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F9A825]" />
              <span>{language === 'bn' ? 'সাপ্তাহিক স্মার্ট ফসল পরিচর্যা ক্যালেন্ডার' : 'Weekly Smart Crop Calendar Care'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F9A825]" />
              <span>{language === 'bn' ? 'দৈনিক পাইকারি বাজার দর ও ক্রয়-বিক্রয়' : 'Daily Wholesale Market Prices & Sales'}</span>
            </div>
          </div>

          <button
            onClick={() => setStep('login')}
            className="w-full bg-[#F9A825] hover:bg-yellow-500 text-gray-900 font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-all text-base"
          >
            <span>{language === 'bn' ? 'শুরু করুন' : 'Get Started'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === 'login' && (
        <div className="my-auto space-y-6 z-10 animate-in fade-in duration-300">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">
              {language === 'bn' ? 'মোবাইল নম্বর লিখুন' : 'Enter Phone Number'}
            </h3>
            <p className="text-xs text-green-100">
              {language === 'bn' ? 'লগইন বা নিবন্ধনের জন্য ১১ ডিজিটের মোবাইল নম্বর দিন' : 'Enter 11 digit mobile number to register or login'}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-green-100 font-medium">
                {language === 'bn' ? 'কৃষকের নাম' : 'Farmer Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-green-100 font-medium">
                {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-green-200 absolute left-4 top-3.5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01712345678"
                  required
                  className="w-full bg-white/20 border border-white/30 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-[#F9A825] font-semibold tracking-wider text-base"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-green-100 font-medium">
                {language === 'bn' ? 'জেলা' : 'District'}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F9A825] text-sm"
              >
                <option value="বগুড়া" className="text-gray-900">বগুড়া (Bogura)</option>
                <option value="রংপুর" className="text-gray-900">রংপুর (Rangpur)</option>
                <option value="যশোর" className="text-gray-900">যশোর (Jessore)</option>
                <option value="দিনাজপুর" className="text-gray-900">দিনাজপুর (Dinajpur)</option>
                <option value="ময়মনসিংহ" className="text-gray-900">ময়মনসিংহ (Mymensingh)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F9A825] hover:bg-yellow-500 text-gray-900 font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-all text-base mt-2"
            >
              <span>{language === 'bn' ? 'ওটিপি (OTP) পাঠান' : 'Send OTP'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>

          <button
            onClick={() => setStep('splash')}
            className="w-full text-center text-xs text-green-200 hover:text-white transition-colors"
          >
            ← {language === 'bn' ? 'পেছনে যান' : 'Go Back'}
          </button>
        </div>
      )}

      {step === 'otp' && (
        <div className="my-auto space-y-6 z-10 animate-in fade-in duration-300 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-[#F9A825]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">
              {language === 'bn' ? 'ওটিপি যাচাইকরণ' : 'OTP Verification'}
            </h3>
            <p className="text-xs text-green-100">
              {language === 'bn' ? `${phone} নম্বরে ৪ ডিজিটের কোড পাঠানো হয়েছে` : `4 digit OTP sent to ${phone}`}
            </p>
          </div>

          <form onSubmit={handleOtpVerify} className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value;
                    setOtp(newOtp);
                  }}
                  className="w-12 h-14 bg-white/20 border-2 border-white/40 rounded-2xl text-center text-2xl font-bold text-white focus:outline-none focus:border-[#F9A825]"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#F9A825] hover:bg-yellow-500 text-gray-900 font-bold py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 active:scale-98 transition-all text-base"
            >
              <span>{language === 'bn' ? 'যাচাই করে ড্যাশবোর্ডে প্রবেশ করুন' : 'Verify & Enter Dashboard'}</span>
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </form>

          <button
            onClick={() => setStep('login')}
            className="text-xs text-green-200 hover:text-white"
          >
            {language === 'bn' ? 'মোবাইল নম্বর পরিবর্তন করুন' : 'Change Phone Number'}
          </button>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center text-[11px] text-green-200 z-10 pt-4">
        {t('appName')} v2.5 • {language === 'bn' ? 'কৃষি মন্ত্রণালয়ের সহায়তায়' : 'Powered by AI Studio'}
      </div>
    </div>
  );
};
