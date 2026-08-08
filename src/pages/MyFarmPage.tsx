import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_FARMS, INITIAL_CROPS } from '../data/mockData';
import { Tractor, Plus, MapPin, HeartPulse, ChevronRight, Sprout, Sparkles, CalendarDays } from 'lucide-react';

export const MyFarmPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [farms] = useState(INITIAL_FARMS);
  const isBn = language === 'bn';

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Tractor className="w-6 h-6 text-[#2E7D32]" />
            <span>{t('myFarmsTitle')}</span>
          </h2>
          <p className="text-xs text-gray-500">
            {isBn ? 'আপনার সকল নিবন্ধিত জমি ও ফসলের তালিকা' : 'Manage your registered land and active crops'}
          </p>
        </div>

        <Link
          to="/add-farm"
          className="bg-[#2E7D32] hover:bg-green-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addFarmBtn')}</span>
        </Link>
      </div>

      {/* Farms List */}
      <div className="space-y-4">
        {farms.map((farm) => (
          <div
            key={farm.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="relative h-36">
              <img
                src={farm.imageUrl}
                alt={farm.nameBn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] bg-[#F9A825] text-gray-900 font-bold px-2 py-0.5 rounded-full uppercase">
                  {isBn ? farm.soilTypeBn : farm.soilTypeEn}
                </span>
                <h3 className="text-base font-bold leading-snug mt-1">
                  {isBn ? farm.nameBn : farm.nameEn}
                </h3>
                <p className="text-xs text-gray-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#F9A825]" />
                  <span>{farm.upazila}, {farm.district}</span>
                </p>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {/* Farm Stats Bar */}
              <div className="grid grid-cols-3 gap-2 bg-green-50/60 p-2.5 rounded-xl border border-green-100/50 text-center text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 block">{isBn ? 'জমির পরিমাণ' : 'Land Size'}</span>
                  <span className="font-extrabold text-[#2E7D32]">
                    {farm.areaDecimal} {isBn ? 'শতক' : 'Dec'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">{isBn ? 'চলতি ফসল' : 'Crops'}</span>
                  <span className="font-extrabold text-[#2E7D32]">
                    {farm.cropsCount} {isBn ? 'টি' : 'Crops'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">{isBn ? 'স্বাস্থ্য স্কোর' : 'Health Score'}</span>
                  <span className="font-extrabold text-emerald-600 flex items-center justify-center gap-1">
                    <HeartPulse className="w-3 h-3 text-emerald-500" />
                    {farm.healthScore}%
                  </span>
                </div>
              </div>

              {/* AI Intelligence Action Bar */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  to={`/ai-intelligence/${farm.id}`}
                  className="bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#F9A825]" />
                  <span>{isBn ? 'এআই ইন্টেলিজেন্স' : 'AI Intelligence'}</span>
                </Link>

                <Link
                  to={`/seasonal-planner/${farm.id}`}
                  className="bg-emerald-50 hover:bg-emerald-100 text-[#2E7D32] border border-emerald-200 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>{isBn ? 'সিজন প্ল্যানার' : 'Seasonal Planner'}</span>
                </Link>
              </div>

              {/* Active Crops in this Farm */}
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-700 flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>{isBn ? 'এই খামারের ফসলসমূহ:' : 'Crops in this farm:'}</span>
                </h4>

                {INITIAL_CROPS.filter((c) => c.farmId === farm.id).map((crop) => (
                  <Link
                    key={crop.id}
                    to={`/crop-details/${crop.id}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={crop.imageUrl} alt={crop.cropNameBn} className="w-9 h-9 rounded-lg object-cover" />
                      <div>
                        <span className="font-bold text-gray-900 block">
                          {isBn ? crop.cropNameBn : crop.cropNameEn}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {isBn ? crop.stageBn : crop.stageEn}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
