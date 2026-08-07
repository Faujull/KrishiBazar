import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { DiseaseAnalysisResult } from '../types';
import {
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  CalendarPlus,
  Share2,
  Download,
  ArrowLeft,
  Sparkles,
  Leaf,
  FlaskConical,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export const DiseaseResultPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as {
    result?: DiseaseAnalysisResult;
    imageBase64?: string;
  } | null;

  const result: DiseaseAnalysisResult = state?.result || {
    id: 'res1',
    cropNameBn: 'আলু (Potato)',
    cropNameEn: 'Potato',
    imageBase64: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80',
    timestamp: new Date().toISOString(),
    diseaseDetected: true,
    diseaseNameBn: 'আলুর নাবি ধসা রোগ (Potato Late Blight)',
    diseaseNameEn: 'Potato Late Blight',
    confidenceScore: 96,
    severity: 'High',
    symptomsBn: [
      'পাতায় পানিতে ভেজা ধূসর বা বাদামী রঙের ছোপ ছোপ দাগ।',
      'আর্দ্র আবহাওয়া বা কুয়াশায় পাতার নিচে সাদা রঙের ছত্রাক জালিকা দেখা যায়।',
      'আক্রান্ত পাতা দ্রুত পচে কালো হয়ে যায়।'
    ],
    symptomsEn: [
      'Water-soaked dark lesions on upper leaf surfaces.',
      'White fungal growth under leaves during high humidity.',
      'Rapid leaf browning and rotting.'
    ],
    organicTreatmentBn: [
      'আক্রান্ত পাতা ও গাছ সাবধানে কেটে মাটিতে পুঁতে ফেলুন।',
      'ট্রাইকোডার্মা ভিরিডি (Trichoderma viride) জৈব ছত্রাকনাশক স্প্রে করুন।'
    ],
    organicTreatmentEn: [
      'Remove and bury infected leaves immediately.',
      'Spray Trichoderma viride bio-fungicide.'
    ],
    chemicalTreatmentBn: [
      'রিডোমিল গোল্ড (ম্যানকোজেব + মেটাল্যাক্সিল) ২ গ্রাম/লিটার পানিতে মিশিয়ে ৭ দিন পর পর স্প্রে করুন।'
    ],
    chemicalTreatmentEn: [
      'Spray Ridomil Gold @ 2g/L water every 7 days.'
    ],
    preventiveMeasuresBn: [
      'সারিবদ্ধভাবে আলু রোপণ করুন যাতে বাতাস চলাচল সহজ হয়।',
      'কুয়াশাপূর্ণ আবহাওয়ায় সেচ দেওয়া থেকে বিরত থাকুন।'
    ],
    preventiveMeasuresEn: [
      'Ensure proper row spacing.',
      'Avoid irrigation in foggy weather.'
    ],
    expertAdviceBn: 'আপনার আলু ক্ষেতে নাবি ধসা রোগ শনাক্ত হয়েছে। অবিলম্বে রিডোমিল গোল্ড স্প্রে করুন ও ক্ষেতের জমে থাকা পানি বের করে দিন।',
    expertAdviceEn: 'Late Blight detected. Spray Ridomil Gold immediately and drain standing water from field.'
  };

  const [activeTab, setActiveTab] = useState<'symptoms' | 'organic' | 'chemical' | 'preventive'>('chemical');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [addedReminder, setAddedReminder] = useState(false);

  // Text To Speech Voice Readout function
  const toggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingVoice) {
        window.speechSynthesis.cancel();
        setIsPlayingVoice(false);
      } else {
        const textToRead = language === 'bn'
          ? `${result.diseaseNameBn}। বিশেষজ্ঞের পরামর্শ: ${result.expertAdviceBn}`
          : `${result.diseaseNameEn}. Expert advice: ${result.expertAdviceEn}`;

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = language === 'bn' ? 'bn-BD' : 'en-US';
        utterance.onend = () => setIsPlayingVoice(false);
        utterance.onerror = () => setIsPlayingVoice(false);

        setIsPlayingVoice(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert(language === 'bn' ? 'আপনার ব্রাউজারে ভয়েস সাপোর্ট নেই।' : 'Voice synthesis not supported on browser.');
    }
  };

  const handleAddSprayReminder = () => {
    setAddedReminder(true);
    alert(language === 'bn' ? 'ক্যালেন্ডারে স্প্রে রিমাইন্ডার সফলভাবে যুক্ত করা হয়েছে!' : 'Spray reminder added to Crop Calendar!');
  };

  // Severity color mappings
  const getSeverityBadge = () => {
    switch (result.severity) {
      case 'Healthy':
        return {
          label: language === 'bn' ? 'সুস্থ' : 'Healthy',
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: CheckCircle2,
        };
      case 'Low':
        return {
          label: language === 'bn' ? 'কম আক্রমণ' : 'Low Severity',
          bg: 'bg-yellow-100 text-yellow-800 border-yellow-300',
          icon: AlertTriangle,
        };
      case 'Medium':
        return {
          label: language === 'bn' ? 'মাঝারি আক্রমণ' : 'Medium Severity',
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: AlertTriangle,
        };
      case 'High':
      case 'Critical':
      default:
        return {
          label: language === 'bn' ? 'তীব্র আক্রমণ' : 'Critical Severity',
          bg: 'bg-red-100 text-red-800 border-red-300',
          icon: ShieldAlert,
        };
    }
  };

  const SevBadge = getSeverityBadge();
  const SevIcon = SevBadge.icon;

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/disease-detection')}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#F9A825]" />
          <span>{t('diseaseResultTitle')}</span>
        </h2>
        <button
          onClick={() => alert(language === 'bn' ? 'রিপোর্ট কপি করা হয়েছে' : 'Report link copied')}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
        >
          <Share2 className="w-4.5 h-4.5 text-gray-600" />
        </button>
      </div>

      {/* Main Diagnosis Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden space-y-4 p-4">
        {/* Leaf Image + Title Block */}
        <div className="flex gap-3 items-center">
          <img
            src={result.imageBase64 || state?.imageBase64}
            alt={result.diseaseNameBn}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-100 shrink-0 shadow-xs"
          />
          <div className="space-y-1">
            <span className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${SevBadge.bg}`}>
              <SevIcon className="w-3.5 h-3.5" />
              <span>{SevBadge.label}</span>
            </span>

            <h3 className="text-base font-bold text-gray-900 leading-snug">
              {language === 'bn' ? result.diseaseNameBn : result.diseaseNameEn}
            </h3>

            <p className="text-[11px] text-gray-500 font-medium">
              {t('confidenceLabel')} <span className="font-bold text-[#2E7D32]">{result.confidenceScore}%</span>
            </p>
          </div>
        </div>

        {/* Voice Readout Button for illiterate farmers */}
        <button
          onClick={toggleSpeech}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 ${
            isPlayingVoice
              ? 'bg-amber-500 text-white shadow-md animate-pulse'
              : 'bg-green-50 text-[#2E7D32] border border-green-200 hover:bg-green-100'
          }`}
        >
          {isPlayingVoice ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>
            {isPlayingVoice
              ? (language === 'bn' ? 'ভয়েস বন্ধ করুন' : 'Stop Voice')
              : t('listenVoiceAdvice')}
          </span>
        </button>

        {/* Expert Advice Highlight Box */}
        <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200/80 space-y-1">
          <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
            <Stethoscope className="w-4 h-4 text-[#2E7D32]" />
            <span>{t('expertSummary')}</span>
          </h4>
          <p className="text-xs text-emerald-900 leading-relaxed font-medium">
            {language === 'bn' ? result.expertAdviceBn : result.expertAdviceEn}
          </p>
        </div>

        {/* Navigation Tabs for Treatment Breakdown */}
        <div className="flex border-b border-gray-200 text-xs font-bold space-x-1 no-scrollbar overflow-x-auto pt-1">
          <button
            onClick={() => setActiveTab('chemical')}
            className={`pb-2.5 px-3 whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'chemical'
                ? 'border-[#2E7D32] text-[#2E7D32]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            🧪 {t('tabChemical')}
          </button>
          <button
            onClick={() => setActiveTab('organic')}
            className={`pb-2.5 px-3 whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'organic'
                ? 'border-[#2E7D32] text-[#2E7D32]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            🌿 {t('tabOrganic')}
          </button>
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`pb-2.5 px-3 whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'symptoms'
                ? 'border-[#2E7D32] text-[#2E7D32]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            🔍 {t('tabSymptoms')}
          </button>
          <button
            onClick={() => setActiveTab('preventive')}
            className={`pb-2.5 px-3 whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'preventive'
                ? 'border-[#2E7D32] text-[#2E7D32]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            🛡️ {t('tabPrevention')}
          </button>
        </div>

        {/* Tab Panel Contents */}
        <div className="pt-1 text-xs space-y-2">
          {activeTab === 'chemical' && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <h5 className="font-bold text-gray-800 flex items-center gap-1">
                <FlaskConical className="w-4 h-4 text-purple-600" />
                <span>{language === 'bn' ? 'অনুমোদিত বালাইনাশক ও সেচ নির্দেশিকা:' : 'Approved Chemical Fungicides & Doses:'}</span>
              </h5>
              <ul className="space-y-2">
                {(language === 'bn' ? result.chemicalTreatmentBn : result.chemicalTreatmentEn).map((item, idx) => (
                  <li key={idx} className="bg-purple-50/60 p-3 rounded-xl border border-purple-100 text-gray-800 leading-relaxed flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-900 font-extrabold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'organic' && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <h5 className="font-bold text-gray-800 flex items-center gap-1">
                <Leaf className="w-4 h-4 text-[#2E7D32]" />
                <span>{language === 'bn' ? 'জৈব বালাইনাশক ও প্রাকৃতিক ব্যবস্থা:' : 'Organic & Bio Control Measures:'}</span>
              </h5>
              <ul className="space-y-2">
                {(language === 'bn' ? result.organicTreatmentBn : result.organicTreatmentEn).map((item, idx) => (
                  <li key={idx} className="bg-green-50/60 p-3 rounded-xl border border-green-100 text-gray-800 leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'symptoms' && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <h5 className="font-bold text-gray-800">
                {language === 'bn' ? 'শনাক্তকৃত লক্ষণসমূহ:' : 'Identified Symptoms:'}
              </h5>
              <ul className="space-y-2">
                {(language === 'bn' ? result.symptomsBn : result.symptomsEn).map((item, idx) => (
                  <li key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800 leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] shrink-0 mt-2"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'preventive' && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <h5 className="font-bold text-gray-800 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{language === 'bn' ? 'ভবিষ্যৎ প্রতিরোধ ব্যবস্থা:' : 'Future Prevention Tips:'}</span>
              </h5>
              <ul className="space-y-2">
                {(language === 'bn' ? result.preventiveMeasuresBn : result.preventiveMeasuresEn).map((item, idx) => (
                  <li key={idx} className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 text-gray-800 leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={handleAddSprayReminder}
          disabled={addedReminder}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all ${
            addedReminder
              ? 'bg-emerald-800 text-white cursor-default'
              : 'bg-[#2E7D32] hover:bg-green-800 text-white'
          }`}
        >
          <CalendarPlus className="w-4.5 h-4.5 text-[#F9A825]" />
          <span>
            {addedReminder
              ? (language === 'bn' ? '✓ ক্যালেন্ডারে যুক্ত করা হয়েছে' : '✓ Added to Calendar')
              : t('addReminderBtn')}
          </span>
        </button>

        <div className="flex gap-2">
          <Link
            to="/crop-calendar"
            className="flex-1 bg-white border border-gray-200 text-gray-800 py-3 rounded-xl text-xs font-bold text-center hover:bg-gray-50 active:scale-98 transition-all"
          >
            {t('navCropCalendar')}
          </Link>

          <button
            onClick={() => alert(language === 'bn' ? 'পিডিএফ রিপোর্ট তৈরি হচ্ছে...' : 'Generating PDF report...')}
            className="flex-1 bg-white border border-gray-200 text-gray-800 py-3 rounded-xl text-xs font-bold text-center hover:bg-gray-50 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <Download className="w-4 h-4 text-gray-600" />
            <span>{t('downloadReport')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
