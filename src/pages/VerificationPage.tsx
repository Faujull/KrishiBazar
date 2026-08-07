import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Upload,
  Camera,
  CreditCard,
  Building2,
  Clock,
  ChevronRight,
  Gift,
  X,
  FileCheck
} from 'lucide-react';

export const VerificationPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [idType, setIdType] = useState<'nid' | 'krishok'>('nid');
  const [docPreview, setDocPreview] = useState<string | null>(null);
  const [docName, setDocName] = useState<string>('');
  const [status, setStatus] = useState<'verified' | 'pending' | 'unverified'>('verified');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResubmit = () => {
    if (!docPreview) {
      alert(language === 'bn' ? 'অনুগ্রহ করে নতুন আইডি বা কৃষক কার্ড আপলোড করুন' : 'Please upload a new ID or Krishok card image');
      return;
    }
    setStatus('pending');
    alert(language === 'bn' ? 'আপনার পুনঃযাচাইকরণ আবেদন সফলভাবে জমা দেওয়া হয়েছে!' : 'Resubmission request submitted successfully!');
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
          {language === 'bn' ? 'কৃষক পরিচয়পত্র যাচাইকরণ' : 'Farmer Verification'}
        </h2>
        <div className="w-9 h-9"></div>
      </div>

      {/* Main Status Banner */}
      <div className="bg-gradient-to-br from-[#2E7D32] to-[#1b4d1f] text-white p-5 rounded-2xl shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs ring-2 ring-white/30">
              <ShieldCheck className="w-7 h-7 text-[#F9A825]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black text-green-200 tracking-wider block">
                {language === 'bn' ? 'স্ট্যাটাস' : 'Verification Status'}
              </span>
              <h3 className="text-base font-extrabold flex items-center gap-1.5">
                <span>
                  {status === 'verified'
                    ? (language === 'bn' ? 'যাচাইকৃত স্মার্ট কৃষক' : 'Verified Smart Farmer')
                    : status === 'pending'
                    ? (language === 'bn' ? 'পর্যালোচনায় রয়েছে' : 'Under Review')
                    : (language === 'bn' ? 'যাচাই করা হয়নি' : 'Not Verified')}
                </span>
              </h3>
            </div>
          </div>

          <span className="bg-[#F9A825] text-gray-900 font-extrabold text-xs px-2.5 py-1 rounded-full shadow-xs">
            {status === 'verified' ? '100%' : '50%'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden relative z-10">
          <div
            className="bg-[#F9A825] h-full rounded-full transition-all duration-500"
            style={{ width: status === 'verified' ? '100%' : '50%' }}
          ></div>
        </div>

        <p className="text-xs text-green-100 relative z-10 leading-relaxed">
          {language === 'bn'
            ? 'আপনার জাতীয় পরিচয়পত্র (NID) এবং জেলা কৃষি কর্মকর্তার তথ্যের সাথে তথ্য মিলেছে।'
            : 'Your National ID & Department of Agricultural Extension records match successfully.'}
        </p>
      </div>

      {/* Government Verification Info Box */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-900 border-b border-gray-100 pb-2">
          <Building2 className="w-4 h-4 text-[#2E7D32]" />
          <span>{language === 'bn' ? 'সরকারি খতিয়ান তথ্য' : 'Govt Verification Record'}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2.5 rounded-xl">
            <span className="text-[10px] text-gray-400 block font-medium">
              {language === 'bn' ? 'কৃষক কার্ড নম্বর' : 'Krishok Card ID'}
            </span>
            <span className="font-bold text-gray-800">KC-88492019</span>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-xl">
            <span className="text-[10px] text-gray-400 block font-medium">
              {language === 'bn' ? 'মন্ত্রণালয় অনুমোদন' : 'Ministry Approval'}
            </span>
            <span className="font-bold text-emerald-700">✓ DAE Verified</span>
          </div>
        </div>
      </div>

      {/* Verification Timeline */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#2E7D32]" />
          <span>{language === 'bn' ? 'যাচাইকরণের সময়সূচী' : 'Verification Timeline'}</span>
        </h4>

        <div className="space-y-3 relative pl-4 border-l-2 border-emerald-500 text-xs ml-2">
          <div className="relative">
            <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-[#2E7D32] ring-4 ring-white"></div>
            <p className="font-bold text-gray-900">{language === 'bn' ? 'আবেদন জমা দেওয়া হয়েছে' : 'Application Submitted'}</p>
            <p className="text-[10px] text-gray-400">১৫ জানুয়ারি ২০২৪</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-[#2E7D32] ring-4 ring-white"></div>
            <p className="font-bold text-gray-900">{language === 'bn' ? 'নথি ও এনআইডি পর্যালোচনা' : 'NID & Document Review'}</p>
            <p className="text-[10px] text-gray-400">১৬ জানুয়ারি ২০২৪</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-[#2E7D32] ring-4 ring-white"></div>
            <p className="font-bold text-emerald-700">{language === 'bn' ? 'যাচাইকরণ সম্পন্ন ও সুবিধা চালু' : 'Verification Approved'}</p>
            <p className="text-[10px] text-gray-400">১৮ জানুয়ারি ২০২৪</p>
          </div>
        </div>
      </div>

      {/* Upload Document / Resubmit Section */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-gray-900">
          {language === 'bn' ? 'নথি আপলোড বা পুনঃযাচাইকরণ' : 'Re-verify or Update Documents'}
        </h4>

        {/* Option Tabs */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setIdType('nid')}
            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              idType === 'nid'
                ? 'bg-emerald-50 border-[#2E7D32] text-[#2E7D32]'
                : 'bg-white border-gray-200 text-gray-600'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>NID Card</span>
          </button>

          <button
            type="button"
            onClick={() => setIdType('krishok')}
            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              idType === 'krishok'
                ? 'bg-emerald-50 border-[#2E7D32] text-[#2E7D32]'
                : 'bg-white border-gray-200 text-gray-600'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Krishok Card</span>
          </button>
        </div>

        {/* File Dropzone */}
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

        {docPreview ? (
          <div className="relative bg-emerald-50 border-2 border-dashed border-[#2E7D32] rounded-2xl p-3 flex items-center gap-3">
            <img src={docPreview} alt="Doc preview" className="w-12 h-12 rounded-lg object-cover border" />
            <div className="flex-1 min-w-0 text-xs">
              <span className="font-bold text-gray-900 block truncate">{docName || 'Document.png'}</span>
              <span className="text-[10px] text-emerald-700">✓ Ready to resubmit</span>
            </div>
            <button
              onClick={() => setDocPreview(null)}
              className="w-7 h-7 rounded-full bg-white text-gray-500 hover:text-red-600 flex items-center justify-center border"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center space-y-2 bg-gray-50">
            <Upload className="w-6 h-6 text-[#2E7D32] mx-auto" />
            <p className="text-xs font-bold text-gray-800">
              {language === 'bn' ? 'নতুন কার্ডের স্পষ্ট ছবি আপলোড করুন' : 'Upload clear image of card'}
            </p>
            <div className="flex justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-gray-800 text-xs font-bold"
              >
                {language === 'bn' ? 'ফাইল সিলেক্ট' : 'Browse File'}
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-[#2E7D32] text-white text-xs font-bold flex items-center gap-1"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ক্যামেরা' : 'Camera'}</span>
              </button>
            </div>
          </div>
        )}

        {docPreview && (
          <button
            onClick={handleResubmit}
            className="w-full bg-[#2E7D32] hover:bg-green-800 text-white text-xs font-extrabold py-3 rounded-xl shadow-md transition-all"
          >
            {language === 'bn' ? 'পুনঃযাচাইকরণের জন্য পাঠান' : 'Submit for Re-verification'}
          </button>
        )}
      </div>

      {/* Future Benefits List */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
          <Gift className="w-4 h-4 text-[#F9A825]" />
          <span>{language === 'bn' ? 'যাচাইকৃত কৃষকের সুবিধা সমূহ' : 'Verified Farmer Benefits'}</span>
        </h4>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-xl bg-green-50/60 border border-green-100 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-900 block">
                {language === 'bn' ? 'সরকারি সার ও বীজ ভর্তুকি' : 'Govt Fertilizer & Seed Subsidy'}
              </span>
              <span className="text-[10px] text-gray-500 block">
                {language === 'bn' ? 'সরাসরি ডিজিটাল কৃষি কার্ডের মাধ্যমে ডিলার রেটে সার পাওয়ার সুবিধা।' : 'Direct dealer rate access via digital farmer card.'}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F9A825] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-900 block">
                {language === 'bn' ? 'স্বল্প সুদে স্মার্ট কৃষি ঋণ' : 'Low Interest Agri Loan'}
              </span>
              <span className="text-[10px] text-gray-500 block">
                {language === 'bn' ? '৪% সুদে ব্যাংক ও এনজিও থেকে অগ্রাধিকার কৃষি ঋণ।' : 'Priority 4% interest rate agricultural loan.'}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-900 block">
                {language === 'bn' ? 'প্রিমিয়াম পাইকারি মার্কেট এক্সেস' : 'Premium Wholesale Access'}
              </span>
              <span className="text-[10px] text-gray-500 block">
                {language === 'bn' ? 'কৃষিবাজারে সরাসরি বড় কর্পোরেট ক্রেতাদের কাছে ফসল বিক্রয়।' : 'Sell directly to large corporate buyers without middleman.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
