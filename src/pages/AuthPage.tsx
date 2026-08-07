import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  Circle,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Upload,
  Camera,
  X,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { language, toggleLanguage, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  // Screen view state: 'login' | 'register' | 'otp'
  const [view, setView] = useState<'login' | 'register' | 'otp'>('login');

  // Form states
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [idType, setIdType] = useState<'nid' | 'krishok'>('nid');
  
  // File upload / Camera capture states
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // OTP state
  const [otpCode, setOtpCode] = useState(['5', '2', '8', '0']);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedFile = () => {
    setUploadedFilePreview(null);
    setUploadedFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim()) {
      alert(language === 'bn' ? 'অনুগ্রহ করে মোবাইল নম্বর প্রদান করুন' : 'Please enter your mobile number');
      return;
    }
    // Set simulated session
    localStorage.setItem('krishibazar_auth', 'true');
    // Navigate straight to dashboard
    navigate('/dashboard');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim()) {
      alert(language === 'bn' ? 'অনুগ্রহ করে মোবাইল নম্বর প্রদান করুন' : 'Please enter your mobile number');
      return;
    }
    if (password.length < 6) {
      alert(language === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' : 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      alert(language === 'bn' ? 'পাসওয়ার্ড দুটি মিলছে না' : 'Passwords do not match');
      return;
    }
    // Show OTP screen before entering dashboard
    setView('otp');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('krishibazar_auth', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-gray-900 pb-12 pt-3 px-4 max-w-md mx-auto flex flex-col justify-between">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        {/* Left Action / Back Button */}
        <div>
          {view !== 'login' ? (
            <button
              onClick={() => setView('login')}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9 h-9"></div>
          )}
        </div>

        {/* Center Title for Register/OTP view */}
        {view === 'register' && (
          <h2 className="text-base font-bold text-gray-900">
            {language === 'bn' ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create your account'}
          </h2>
        )}

        {/* Right Language Selector Pill */}
        <div className="bg-[#E8F5E9] p-1 rounded-full border border-green-200 flex items-center gap-1 shadow-xs">
          <button
            onClick={() => setLanguage('bn')}
            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
              language === 'bn'
                ? 'bg-[#2E7D32] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>🇧🇩</span>
            <span>বাংলা</span>
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
              language === 'en'
                ? 'bg-[#2E7D32] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>🇬🇧</span>
            <span>English</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: WELCOME BACK (LOGIN) */}
      {view === 'login' && (
        <div className="my-auto space-y-6 pt-4 animate-in fade-in duration-200">
          {/* Logo & Welcome Header */}
          <div className="text-center space-y-3">
            <div className="w-20 h-20 bg-[#2E7D32] rounded-3xl mx-auto flex items-center justify-center shadow-lg ring-4 ring-green-100">
              <Sprout className="w-11 h-11 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {language === 'bn' ? 'স্বাগতম' : 'Welcome back'}
              </h1>
              <p className="text-xs text-gray-500 font-medium mt-1">
                {language === 'bn' ? 'কৃষিবাজারে প্রবেশ করতে লগইন করুন' : 'Log in to continue to KrishiBazar'}
              </p>
            </div>
          </div>

          {/* Form Controls */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
            {/* Mobile Number Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                {language === 'bn' ? 'মোবাইল নম্বর' : 'Mobile number'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'bn' ? 'পাসওয়ার্ড লিখুন' : 'Enter your password'}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => alert(language === 'bn' ? 'আপনার নিবন্ধিত নম্বরে এসএমএস রিসেট লিঙ্ক পাঠানো হয়েছে।' : 'Password reset link sent to your phone.')}
                className="text-xs font-bold text-[#2E7D32] hover:underline"
              >
                {language === 'bn' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot password?'}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full bg-[#2E7D32] hover:bg-green-800 text-white font-extrabold py-3.5 rounded-xl shadow-md active:scale-98 transition-all text-sm"
              >
                {language === 'bn' ? 'লগইন করুন' : 'Login'}
              </button>

              <button
                type="button"
                onClick={() => setView('register')}
                className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold py-3.5 rounded-xl shadow-xs active:scale-98 transition-all text-sm"
              >
                {language === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW 2: CREATE YOUR ACCOUNT (REGISTER) */}
      {view === 'register' && (
        <div className="my-auto space-y-5 pt-3 animate-in fade-in duration-200">
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">
                {language === 'bn' ? 'মোবাইল নম্বর' : 'Mobile number'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-xs"
                />
              </div>
              <p className="text-[11px] text-gray-400 font-medium">
                {language === 'bn'
                  ? 'এই নম্বরটি যাচাই করতে একটি ওটিপি পাঠানো হবে'
                  : "We'll send an OTP to verify this number"}
              </p>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">
                {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'bn' ? 'নতুন পাসওয়ার্ড তৈরি করুন' : 'Create a password'}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-gray-400 font-medium">
                {language === 'bn' ? 'কমপক্ষে ৬ টি অক্ষর হতে হবে' : 'At least 6 characters'}
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 block">
                {language === 'bn' ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={language === 'bn' ? 'পাসওয়ার্ড পুনরায় লিখুন' : 'Re-enter your password'}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Identity Verification Options */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div>
                <h4 className="text-xs font-bold text-gray-900">
                  {language === 'bn' ? 'পরিচয়পত্র বাছাই করুন (NID বা কৃষক কার্ড)' : 'Select Identity Card (NID or Krishok Card)'}
                </h4>
                <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                  {language === 'bn'
                    ? 'আপনার জাতীয় পরিচয়পত্র (NID) অথবা স্মার্ট কৃষক কার্ড বেছে নিন'
                    : 'Choose your National ID (NID) or Smart Krishok Card'}
                </p>
              </div>

              {/* ID Type Selector Tabs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIdType('nid')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    idType === 'nid'
                      ? 'bg-emerald-50 border-[#2E7D32] text-[#2E7D32] ring-1 ring-[#2E7D32]'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{language === 'bn' ? 'জাতীয় পরিচয়পত্র (NID)' : 'National ID (NID)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIdType('krishok')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    idType === 'krishok'
                      ? 'bg-emerald-50 border-[#2E7D32] text-[#2E7D32] ring-1 ring-[#2E7D32]'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'bn' ? 'কৃষক কার্ড' : 'Krishok Card'}</span>
                </button>
              </div>

              {/* File Drop / Camera Capture Container */}
              <div className="mt-2">
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  {idType === 'nid'
                    ? (language === 'bn' ? 'NID কার্ডের ছবি আপলোড করুন' : 'Upload NID Card Photo')
                    : (language === 'bn' ? 'কৃষক কার্ডের ছবি আপলোড করুন' : 'Upload Krishok Card Photo')}
                </label>

                {/* Hidden File & Camera Inputs */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="hidden"
                />
                <input
                  type="file"
                  ref={cameraInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />

                {uploadedFilePreview ? (
                  /* Preview Box when File Attached */
                  <div className="relative bg-emerald-50/90 border-2 border-dashed border-[#2E7D32] rounded-2xl p-3 flex items-center gap-3 shadow-xs">
                    <div className="w-14 h-14 bg-white rounded-xl overflow-hidden border border-emerald-200 shrink-0 flex items-center justify-center">
                      <img
                        src={uploadedFilePreview}
                        alt="Document preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">
                        {uploadedFileName || (language === 'bn' ? 'পরিচয়পত্র সংযুক্ত হয়েছে' : 'Document attached')}
                      </p>
                      <p className="text-[10px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        {language === 'bn' ? 'যাচাইয়ের জন্য প্রস্তুত' : 'Ready for verification'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeUploadedFile}
                      className="w-7 h-7 rounded-full bg-white text-gray-500 hover:text-red-600 flex items-center justify-center border border-gray-200 shadow-xs"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* Upload Box / Dropzone with Camera and Gallery buttons */
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center hover:border-[#2E7D32] transition-colors shadow-xs">
                    <div className="w-10 h-10 bg-green-50 rounded-full mx-auto flex items-center justify-center text-[#2E7D32] mb-2">
                      <Upload className="w-5 h-5" />
                    </div>

                    <p className="text-xs font-bold text-gray-800">
                      {language === 'bn'
                        ? 'ছবি ড্রপ করুন বা কম্পিউটার/মোবাইল থেকে আপলোড করুন'
                        : 'Drop image or select file to upload'}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 mb-3">
                      JPG, PNG, WEBP (Max 10MB)
                    </p>

                    <div className="flex justify-center gap-2">
                      {/* Select File Button */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
                      >
                        <ImageIcon className="w-4 h-4 text-[#2E7D32]" />
                        <span>{language === 'bn' ? 'গ্যালারি / ফাইল' : 'Browse File'}</span>
                      </button>

                      {/* Camera Photo Click Button */}
                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-[#2E7D32] hover:bg-green-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                      >
                        <Camera className="w-4 h-4" />
                        <span>{language === 'bn' ? 'ক্যামেরা তুলুন' : 'Take Photo'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#2E7D32] hover:bg-green-800 text-white font-extrabold py-3.5 rounded-xl shadow-md active:scale-98 transition-all text-sm mt-2"
            >
              {language === 'bn' ? 'অ্যাাকাউন্ট তৈরি করুন' : 'Create account'}
            </button>

            {/* Bottom Link to Login */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                {language === 'bn' ? 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে? ' : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="font-bold text-[#2E7D32] hover:underline ml-1"
                >
                  {language === 'bn' ? 'লগইন করুন' : 'Login'}
                </button>
              </p>
            </div>
          </form>
        </div>
      )}

      {/* VIEW 3: OTP VERIFICATION */}
      {view === 'otp' && (
        <div className="my-auto space-y-6 pt-4 text-center animate-in fade-in duration-200">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center text-[#2E7D32]">
            <ShieldCheck className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-gray-900">
              {language === 'bn' ? 'ওটিপি (OTP) কোড লিখুন' : 'Verify Mobile OTP'}
            </h3>
            <p className="text-xs text-gray-500">
              {language === 'bn'
                ? `${mobileNumber || '01712345678'} নম্বরে পাঠানো ৪-ডিজিটের কোড লিখুন`
                : `Enter 4-digit code sent to ${mobileNumber || '01712345678'}`}
            </p>
          </div>

          <form onSubmit={handleOtpVerify} className="space-y-6">
            <div className="flex justify-center gap-3">
              {otpCode.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otpCode];
                    newOtp[idx] = e.target.value;
                    setOtpCode(newOtp);
                  }}
                  className="w-12 h-14 bg-white border-2 border-gray-300 rounded-2xl text-center text-2xl font-black text-gray-900 focus:outline-none focus:border-[#2E7D32] shadow-xs"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#2E7D32] hover:bg-green-800 text-white font-extrabold py-3.5 rounded-xl shadow-md active:scale-98 transition-all text-sm flex items-center justify-center gap-2"
            >
              <span>{language === 'bn' ? 'যাচাই করুন ও ড্যাশবোর্ডে যান' : 'Verify & Enter Dashboard'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <button
            type="button"
            onClick={() => setView('register')}
            className="text-xs font-bold text-gray-500 hover:text-gray-800"
          >
            ← {language === 'bn' ? 'মোবাইল নম্বর পরিবর্তন করুন' : 'Change Mobile Number'}
          </button>
        </div>
      )}

      {/* Bottom Footer watermark */}
      <div className="text-center text-[10px] text-gray-400 pt-4">
        KrishiBazar v2.5 • Smart Agriculture Bangladesh
      </div>
    </div>
  );
};
