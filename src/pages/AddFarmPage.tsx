import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Tractor, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const AddFarmPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [farmName, setFarmName] = useState('');
  const [district, setDistrict] = useState('বগুড়া');
  const [upazila, setUpazila] = useState('শিবগঞ্জ');
  const [areaDecimal, setAreaDecimal] = useState('50');
  const [soilType, setSoilType] = useState('দোআঁশ মাটি');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(language === 'bn' ? 'নতুন খামার সফলভাবে নিবন্ধিত হয়েছে!' : 'New Farm successfully registered!');
    navigate('/my-farm');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
            <Tractor className="w-5 h-5 text-[#2E7D32]" />
            <span>{t('addFarmBtn')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {language === 'bn' ? 'আপনার নতুন জমির নাম ও তথ্য প্রদান করুন' : 'Provide details for your new land entry'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">
            {t('farmName')} *
          </label>
          <input
            type="text"
            required
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            placeholder={language === 'bn' ? 'যেমন: সোনার বাংলা উত্তর খামার' : 'e.g. North Green Agro'}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">
              {t('districtLabel')} *
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            >
              <option value="বগুড়া">বগুড়া (Bogura)</option>
              <option value="রংপুর">রংপুর (Rangpur)</option>
              <option value="যশোর">যশোর (Jessore)</option>
              <option value="দিনাজপুর">দিনাজপুর (Dinajpur)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">
              {t('upazilaLabel')} *
            </label>
            <input
              type="text"
              required
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">
            {t('areaInDecimal')} *
          </label>
          <div className="relative">
            <input
              type="number"
              required
              value={areaDecimal}
              onChange={(e) => setAreaDecimal(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
            <span className="absolute right-3 top-2.5 text-xs text-gray-500 font-medium">
              {language === 'bn' ? 'শতক / ডিসিমাল' : 'Decimal'}
            </span>
          </div>
          <p className="text-[10px] text-gray-400">
            {language === 'bn' ? '১ বিঘা = ৩৩ শতক • ১ একর = ১০০ শতক' : '1 Bigha = 33 Decimal • 1 Acre = 100 Decimal'}
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">
            {t('soilType')} *
          </label>
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
          >
            <option value="দোআঁশ মাটি">দোআঁশ মাটি (Loamy Soil)</option>
            <option value="এটেল মাটি">এটেল মাটি (Clay Soil)</option>
            <option value="বেলে দোআঁশ">বেলে দোআঁশ (Sandy Loam)</option>
            <option value="পলি মাটি">পলি মাটি (Alluvial Soil)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all text-sm mt-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{t('saveFarm')}</span>
        </button>
      </form>
    </div>
  );
};
