import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_CROPS } from '../data/mockData';
import { ArrowLeft, ScanLine, CalendarDays, Sprout, Calendar, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const CropDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const crop = INITIAL_CROPS.find((c) => c.id === id) || INITIAL_CROPS[0];

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Top Bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {language === 'bn' ? crop.cropNameBn : crop.cropNameEn}
          </h2>
          <p className="text-xs text-gray-500">
            {language === 'bn' ? crop.varietyBn : crop.varietyEn} • {crop.areaDecimal} {language === 'bn' ? 'শতক' : 'Decimal'}
          </p>
        </div>
      </div>

      {/* Crop Main Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="relative h-44">
          <img src={crop.imageUrl} alt={crop.cropNameBn} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-3 left-3 right-3 text-white flex justify-between items-end">
            <div>
              <span className="text-[10px] bg-[#2E7D32] px-2 py-0.5 rounded-full font-bold">
                {language === 'bn' ? crop.stageBn : crop.stageEn}
              </span>
              <h3 className="text-lg font-extrabold mt-1">
                {language === 'bn' ? crop.cropNameBn : crop.cropNameEn}
              </h3>
            </div>

            {crop.status === 'warning' && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                {language === 'bn' ? 'রোগ ঝুঁকি' : 'Disease Risk'}
              </span>
            )}
            {crop.status === 'healthy' && (
              <span className="bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {language === 'bn' ? 'সুস্থ' : 'Healthy'}
              </span>
            )}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Key Dates Grid */}
          <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl text-xs">
            <div>
              <span className="text-gray-500 text-[10px] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#2E7D32]" />
                {language === 'bn' ? 'রোপণের তারিখ:' : 'Planting Date:'}
              </span>
              <span className="font-bold text-gray-900 block mt-0.5">{crop.plantingDate}</span>
            </div>
            <div>
              <span className="text-gray-500 text-[10px] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#F9A825]" />
                {language === 'bn' ? 'আনুমানিক কাটার তারিখ:' : 'Expected Harvest:'}
              </span>
              <span className="font-bold text-gray-900 block mt-0.5">{crop.expectedHarvestDate}</span>
            </div>
          </div>

          {/* Action Shortcuts */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/disease-detection"
              className="bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white p-3.5 rounded-xl text-center shadow-xs hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center gap-1"
            >
              <ScanLine className="w-6 h-6 text-[#F9A825]" />
              <span className="text-xs font-bold">
                {language === 'bn' ? 'এআই রোগ পরীক্ষা' : 'Scan Disease'}
              </span>
            </Link>

            <Link
              to="/crop-calendar"
              className="bg-green-50 border border-green-200 text-[#2E7D32] p-3.5 rounded-xl text-center hover:bg-green-100 transition-all active:scale-95 flex flex-col items-center justify-center gap-1"
            >
              <CalendarDays className="w-6 h-6 text-[#2E7D32]" />
              <span className="text-xs font-bold">
                {language === 'bn' ? 'পরিচর্যা ক্যালেন্ডার' : 'Crop Calendar'}
              </span>
            </Link>
          </div>

          {/* Lifecycle Growth Progress Bar */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1">
              <Sprout className="w-4 h-4 text-[#2E7D32]" />
              <span>{language === 'bn' ? 'ফসলের বয়সের পর্যায়ক্রম:' : 'Crop Growth Stage Progress:'}</span>
            </h4>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[11px] text-gray-600 font-medium">
                <span>{language === 'bn' ? 'চারা রোপণ' : 'Seedling'}</span>
                <span>{language === 'bn' ? 'কুশি পর্যায় (চলতি)' : 'Tillering (Active)'}</span>
                <span>{language === 'bn' ? 'ফসল কাটা' : 'Harvest'}</span>
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#2E7D32] h-full w-[45%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
