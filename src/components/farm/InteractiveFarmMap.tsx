import React, { useState } from 'react';
import { Plus, Edit2, Compass, Sparkles, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { NearbyFarmInfo, NearbyFarmBottomSheet } from './NearbyFarmBottomSheet';

interface InteractiveFarmMapProps {
  myFarmName: string;
  nearbyFarms: Record<'north' | 'south' | 'east' | 'west', NearbyFarmInfo | null>;
  onUpdateNearbyFarm: (info: NearbyFarmInfo) => void;
  onAnalyzeFarm: () => void;
}

export const InteractiveFarmMap: React.FC<InteractiveFarmMapProps> = ({
  myFarmName,
  nearbyFarms,
  onUpdateNearbyFarm,
  onAnalyzeFarm
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [activeDirection, setActiveDirection] = useState<'north' | 'south' | 'east' | 'west' | null>(null);

  const getCropEmoji = (farmInfo: NearbyFarmInfo | null) => {
    if (!farmInfo || farmInfo.status === 'empty') return '➕';
    if (farmInfo.status === 'unknown') return '❓';
    const cropText = (farmInfo.cropBn || farmInfo.crop || '').toLowerCase();
    if (cropText.includes('ধান') || cropText.includes('rice')) return '🌾';
    if (cropText.includes('আলু') || cropText.includes('potato')) return '🥔';
    if (cropText.includes('ভুট্টা') || cropText.includes('maize')) return '🌽';
    if (cropText.includes('সরিষা') || cropText.includes('mustard')) return '🌼';
    if (cropText.includes('গম') || cropText.includes('wheat')) return '🌾';
    if (cropText.includes('সবজি') || cropText.includes('veg')) return '🍅';
    if (cropText.includes('পাট') || cropText.includes('jute')) return '🌱';
    return '🌱';
  };

  const renderSideCard = (dir: 'north' | 'south' | 'east' | 'west', labelBn: string, labelEn: string) => {
    const info = nearbyFarms[dir];
    const isFilled = info && info.status === 'filled';
    const isUnknown = info && info.status === 'unknown';

    return (
      <button
        type="button"
        onClick={() => setActiveDirection(dir)}
        className={`relative p-3 rounded-2xl border-2 transition-all active:scale-95 text-center flex flex-col items-center justify-center min-h-[92px] group ${
          isFilled
            ? 'bg-emerald-50 border-[#2E7D32] shadow-sm hover:border-emerald-700'
            : isUnknown
            ? 'bg-amber-50 border-amber-300 shadow-2xs hover:border-amber-400'
            : 'bg-white border-dashed border-gray-300 hover:border-[#2E7D32] shadow-2xs'
        }`}
      >
        <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider mb-1 flex items-center gap-1">
          <span>{isBn ? labelBn : labelEn}</span>
          {isFilled && <CheckCircle2 className="w-3 h-3 text-[#2E7D32]" />}
        </span>

        {isFilled ? (
          <div className="space-y-0.5">
            <span className="text-xl block animate-bounce-short">{getCropEmoji(info)}</span>
            <span className="text-xs font-bold text-gray-900 block truncate max-w-[110px]">
              {info.cropBn || info.farmName}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold block">
              {info.distance || '100m'}
            </span>
          </div>
        ) : isUnknown ? (
          <div className="space-y-0.5">
            <span className="text-lg block">❓</span>
            <span className="text-xs font-bold text-amber-800 block">
              {isBn ? 'তথ্য অজানা' : 'Unknown'}
            </span>
            <span className="text-[10px] text-amber-600 block">
              {isBn ? 'AI বিশ্লেষণ করবে' : 'AI estimated'}
            </span>
          </div>
        ) : (
          <div className="space-y-1 py-1">
            <div className="w-7 h-7 rounded-full bg-green-100/80 text-[#2E7D32] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[#2E7D32] block">
              {isBn ? '+ খামার যুক্ত করুন' : '+ Add Farm'}
            </span>
          </div>
        )}

        {/* Small edit badge if filled/unknown */}
        {(isFilled || isUnknown) && (
          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white text-gray-400 border border-gray-200 flex items-center justify-center opacity-80 group-hover:opacity-100">
            <Edit2 className="w-2.5 h-2.5" />
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* Map Card Header */}
      <div className="bg-emerald-900 text-white p-4 rounded-2xl shadow-md relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-emerald-500/20 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-semibold mb-0.5">
              <Compass className="w-4 h-4 text-[#F9A825] animate-spin-slow" />
              <span>{isBn ? 'ইন্টারেক্টিভ জমি ম্যাপ' : 'Interactive Farm Map'}</span>
            </div>
            <h3 className="text-base font-extrabold text-white">
              {isBn ? 'পার্শ্ববর্তী খামার চিত্রায়ন' : 'Surrounding Land Topology'}
            </h3>
          </div>
          <span className="text-[10px] bg-[#F9A825] text-gray-900 font-black px-2.5 py-1 rounded-full uppercase shadow-2xs">
            STEP 3 OF 5
          </span>
        </div>
        <p className="text-xs text-emerald-100 mt-2 leading-snug">
          {isBn
            ? 'আপনার চারপাশের চারদিকের (উত্তর, দক্ষিণ, পূর্ব, পশ্চিম) খামারে কোন ফসল চাষ হচ্ছে তা ট্যাপ করে যুক্ত করুন।'
            : 'Tap on North, South, East, and West slots to add surrounding crops and irrigation sources.'}
        </p>
      </div>

      {/* Visual Top-View Grid Map */}
      <div className="bg-emerald-950/5 border-2 border-emerald-800/20 p-4 rounded-3xl shadow-inner space-y-3">
        {/* TOP: NORTH */}
        <div className="w-2/3 mx-auto">
          {renderSideCard('north', 'উত্তর (North)', 'North')}
        </div>

        {/* MIDDLE ROW: WEST - MY FARM - EAST */}
        <div className="grid grid-cols-3 gap-2 items-center">
          {/* WEST */}
          <div>{renderSideCard('west', 'পশ্চিম (West)', 'West')}</div>

          {/* CENTER: MY FARM */}
          <div className="relative bg-gradient-to-tr from-[#2E7D32] via-[#388E3C] to-[#4CAF50] text-white p-3 rounded-2xl shadow-lg border-2 border-amber-300/80 text-center flex flex-col items-center justify-center min-h-[98px] ring-4 ring-green-100 animate-pulse-subtle">
            <span className="text-[9px] bg-[#F9A825] text-gray-900 font-extrabold px-1.5 py-0.2 rounded-full uppercase mb-1 shadow-2xs">
              {isBn ? 'আমার নতুন জমি' : 'MY FARM'}
            </span>
            <span className="text-2xl block">🌱</span>
            <h4 className="text-xs font-black text-white leading-tight truncate max-w-[100px] mt-0.5">
              {myFarmName || (isBn ? 'সোনার বাংলা খামার' : 'Sonali Farm')}
            </h4>
          </div>

          {/* EAST */}
          <div>{renderSideCard('east', 'পূর্ব (East)', 'East')}</div>
        </div>

        {/* BOTTOM: SOUTH */}
        <div className="w-2/3 mx-auto">
          {renderSideCard('south', 'দক্ষিণ (South)', 'South')}
        </div>
      </div>

      {/* Status Summary Banner */}
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#2E7D32] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#F9A825]" />
          </div>
          <div>
            <p className="font-bold text-gray-900">
              {isBn ? 'আশেপাশের খামার তথ্য অবস্থা' : 'Surrounding Data Readiness'}
            </p>
            <p className="text-[10px] text-gray-500">
              {Object.values(nearbyFarms).filter(Boolean).length} / 4 {isBn ? 'টি পার্শ্ববর্তী খামার সংযোজিত' : 'sides added'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            // Fill any empty slot as unknown for quick auto-fill if user wants
            (['north', 'south', 'east', 'west'] as const).forEach((dir) => {
              if (!nearbyFarms[dir]) {
                onUpdateNearbyFarm({
                  direction: dir,
                  status: 'unknown',
                  farmName: isBn ? 'তথ্য অজানা' : 'Unknown',
                  cropBn: isBn ? 'অজানা ফসল' : 'Unknown'
                });
              }
            });
          }}
          className="text-[11px] font-bold text-[#2E7D32] hover:underline"
        >
          {isBn ? 'সবগুলো "অজানা" হিসেবে সেট করুন' : 'Set rest as Unknown'}
        </button>
      </div>

      {/* Analyze Farm Button */}
      <button
        type="button"
        onClick={onAnalyzeFarm}
        className="w-full bg-gradient-to-r from-[#2E7D32] via-[#388E3C] to-[#4CAF50] hover:from-green-800 hover:to-green-700 text-white font-extrabold py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2.5 active:scale-98 transition-all text-sm border border-white/20"
      >
        <Sparkles className="w-5 h-5 text-[#F9A825] animate-spin-slow" />
        <span>{isBn ? 'এআই বিশ্লেষণ চালনা করুন (Analyze My Farm)' : 'Analyze My Farm with AI'}</span>
      </button>

      {/* Bottom Sheet Modal for Side Selection */}
      {activeDirection && (
        <NearbyFarmBottomSheet
          isOpen={!!activeDirection}
          direction={activeDirection}
          initialData={nearbyFarms[activeDirection] || undefined}
          onClose={() => setActiveDirection(null)}
          onSave={(info) => {
            onUpdateNearbyFarm(info);
            setActiveDirection(null);
          }}
        />
      )}
    </div>
  );
};
