import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SAMPLE_DISEASE_CASES } from '../data/mockData';
import {
  ScanLine,
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const DiseaseDetectionPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedCrop, setSelectedCrop] = useState('ধান (Rice)');

  // Handle uploaded image file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        // Navigate to Image Preview screen with image data
        navigate('/image-preview', {
          state: { imageBase64: base64Data, cropName: selectedCrop },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle sample photo select
  const handleSampleSelect = (sampleCase: typeof SAMPLE_DISEASE_CASES[0]) => {
    navigate('/image-preview', {
      state: {
        imageBase64: sampleCase.imageBase64,
        cropName: sampleCase.cropNameBn,
        presetResult: sampleCase, // Fast fallback data if offline/testing
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-5">
      {/* Page Title Header */}
      <div className="bg-[#2E7D32] text-white p-4 rounded-2xl shadow-md space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <ScanLine className="w-6 h-6 text-[#F9A825]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold flex items-center gap-1.5">
              <span>{t('diseaseDetectionTitle')}</span>
              <Sparkles className="w-4 h-4 text-[#F9A825]" />
            </h2>
            <p className="text-[11px] text-green-100">
              {t('diseaseDetectionSub')}
            </p>
          </div>
        </div>
      </div>

      {/* Step 1: Crop Selection Dropdown */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-2">
        <label className="text-xs font-bold text-gray-800 block">
          ১. {t('selectCropType')}
        </label>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
        >
          <option value="ধান (Rice)">🌾 ধান (Rice)</option>
          <option value="আলু (Potato)">🥔 আলু (Potato)</option>
          <option value="টমেটো (Tomato)">🍅 টমেটো (Tomato)</option>
          <option value="আম (Mango)">🥭 আম (Mango)</option>
          <option value="পাট (Jute)">🌿 পাট (Jute)</option>
          <option value="ভুট্টা (Maize)">🌽 ভুট্টা (Maize)</option>
          <option value="বেগুন (Eggplant)">🍆 বেগুন (Eggplant)</option>
          <option value="মরিচ (Chili)">🌶️ মরিচ (Chili)</option>
        </select>
      </div>

      {/* Step 2: Camera or File Upload Buttons */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
        <label className="text-xs font-bold text-gray-800 block">
          ২. {t('uploadPhoto')}
        </label>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="grid grid-cols-2 gap-3">
          {/* Camera Capture Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#2E7D32] hover:bg-green-800 text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-all shadow-md group"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6 text-[#F9A825]" />
            </div>
            <span className="text-xs font-bold text-center">
              {t('takePhoto')}
            </span>
          </button>

          {/* Gallery Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-50 border-2 border-dashed border-green-300 text-[#2E7D32] hover:bg-green-100 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-green-200/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-[#2E7D32]" />
            </div>
            <span className="text-xs font-bold text-center">
              {t('uploadPhoto')}
            </span>
          </button>
        </div>

        {/* Helpful Tips Banner */}
        <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 flex items-center gap-2 text-[11px] text-amber-900">
          <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t('cameraPrompt')}</span>
        </div>
      </div>

      {/* Step 3: Preset Sample Leaves for Quick Test */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-gray-800 block">
          ৩. {t('samplePhotos')}
        </label>

        <div className="grid grid-cols-2 gap-3">
          {SAMPLE_DISEASE_CASES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSampleSelect(sample)}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-all active:scale-95 text-left group"
            >
              <div className="relative h-28">
                <img
                  src={sample.imageBase64}
                  alt={sample.diseaseNameBn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <span
                  className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full text-white ${
                    sample.diseaseDetected ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}
                >
                  {sample.diseaseDetected ? (language === 'bn' ? 'আক্রান্ত' : 'Infected') : (language === 'bn' ? 'সুস্থ' : 'Healthy')}
                </span>
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="text-xs font-bold leading-tight line-clamp-1">
                    {language === 'bn' ? sample.diseaseNameBn : sample.diseaseNameEn}
                  </h4>
                </div>
              </div>
              <div className="p-2.5 flex items-center justify-between text-[10px] text-gray-500 bg-gray-50/50">
                <span>{sample.cropNameBn}</span>
                <span className="text-[#2E7D32] font-bold flex items-center gap-0.5">
                  স্ক্যান করুন <CheckCircle2 className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
