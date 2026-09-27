import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Droplets,
  Sprout,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Info,
  Calendar,
  CloudSun
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Farm, Crop, NormalizedWeatherData, DailyFarmRecommendation } from '../../types';
import {
  buildFarmRecommendationContext,
  generateFarmRecommendation
} from '../../services/geminiService';
import { toBengaliNumber } from '../../services/weatherService';

interface AIDailyRecommendationCardProps {
  farm: Partial<Farm> | null | undefined;
  crop?: Partial<Crop> | null | undefined;
  weather: NormalizedWeatherData;
  className?: string;
  compact?: boolean;
}

export const AIDailyRecommendationCard: React.FC<AIDailyRecommendationCardProps> = ({
  farm,
  crop,
  weather,
  className = '',
  compact = false
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [recommendation, setRecommendation] = useState<DailyFarmRecommendation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(!compact);
  const [completedActions, setCompletedActions] = useState<Record<number, boolean>>({});

  const fetchRecommendation = useCallback(
    async (force = false) => {
      if (!farm && !weather) return;
      setLoading(true);
      setError(null);

      try {
        const context = buildFarmRecommendationContext(farm, crop, weather, language);
        const data = await generateFarmRecommendation(context, force);
        setRecommendation(data);
      } catch (err: any) {
        console.warn('Failed to load recommendation:', err);
        setError(err?.message || 'Failed to load recommendation');
      } finally {
        setLoading(false);
      }
    },
    [farm, crop, weather, language]
  );

  useEffect(() => {
    fetchRecommendation(false);
  }, [fetchRecommendation]);

  const toggleAction = (idx: number) => {
    setCompletedActions((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const currentTemp =
    weather?.temperature != null && !isNaN(weather.temperature)
      ? Math.round(weather.temperature)
      : 34;

  const headline = isBn
    ? recommendation?.headlineBn || 'আবহাওয়া ভিত্তিক খামার পরিচর্যা ও সেচ পরামর্শ'
    : recommendation?.headlineEn || 'Weather-Based Farm Care & Irrigation Advisory';

  const summary = isBn
    ? recommendation?.summaryBn || 'বর্তমান তাপমাত্রা ও আর্দ্রতা অনুযায়ী জমিতে সুষম পরিচর্যা নিন।'
    : recommendation?.summaryEn || 'Maintain balanced field moisture and crop nutrition according to current weather.';

  const weatherObs = isBn
    ? recommendation?.weatherObservationBn
    : recommendation?.weatherObservationEn;

  const irrigationAdvice = isBn
    ? recommendation?.irrigationAdviceBn
    : recommendation?.irrigationAdviceEn;

  const fertilizerAdvice = isBn
    ? recommendation?.fertilizerAdviceBn
    : recommendation?.fertilizerAdviceEn;

  const pestWarning = isBn
    ? recommendation?.pestDiseaseWarningBn
    : recommendation?.pestDiseaseWarningEn;

  const priorityActions = isBn
    ? recommendation?.priorityActionsBn || []
    : recommendation?.priorityActionsEn || [];

  const caution = isBn
    ? recommendation?.cautionBn || 'বালাইনাশক ও সার ব্যবহারের পূর্বে প্যাকেটের নির্দেশাবলী সতর্কভাবে পড়ুন।'
    : recommendation?.cautionEn || 'Follow product label directions carefully before applying any chemical fertilizers or pesticides.';

  return (
    <div
      className={`bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden transition-all hover:shadow-md ${className}`}
    >
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-[#F9A825]">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-black tracking-wider text-emerald-200">
                  {isBn ? 'কৃষিবাজার জেমিনাই এআই' : 'KrishiBazar Gemini AI'}
                </span>
                {recommendation?.isAiGenerated && (
                  <span className="bg-emerald-400/30 text-emerald-100 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-300/40">
                    Live AI
                  </span>
                )}
              </div>
              <h3 className="text-sm font-extrabold text-white leading-tight">
                {isBn ? 'দৈনিক এআই খামার পরামর্শ' : 'Daily AI Farm Recommendation'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => fetchRecommendation(true)}
              disabled={loading}
              title={isBn ? 'নতুন পরামর্শ তৈরি করুন' : 'Refresh Recommendation'}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 active:scale-95 transition-all"
              aria-label="Refresh recommendation"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            {compact && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 active:scale-95 transition-all"
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Live Weather Source pill */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] bg-black/15 backdrop-blur-md rounded-xl px-2.5 py-1.5 border border-white/10">
          <div className="flex items-center gap-1.5 text-emerald-100 truncate">
            <CloudSun className="w-3.5 h-3.5 text-[#F9A825] shrink-0" />
            <span className="truncate">
              {isBn
                ? `${weather?.locationNameBn || farm?.district || 'বগুড়া'}: ${toBengaliNumber(currentTemp)}° সে • ${weather?.weatherDescriptionBn || 'আংশিক মেঘলা'}`
                : `${weather?.locationNameEn || farm?.district || 'Bogura'}: ${currentTemp}°C • ${weather?.weatherDescriptionEn || 'Partly Cloudy'}`}
            </span>
          </div>
          <span className="text-[10px] text-emerald-200/90 font-medium shrink-0 ml-1">
            Open-Meteo
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-3.5">
        {loading && !recommendation ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-2 text-center">
            <RefreshCw className="w-6 h-6 text-[#2E7D32] animate-spin" />
            <p className="text-xs text-gray-500 font-medium">
              {isBn
                ? 'জেমিনাই এআই আপনার খামার ও ওপেন-মেটিও আবহাওয়া বিশ্লেষণ করছে...'
                : 'Gemini AI is analyzing your farm & Open-Meteo weather...'}
            </p>
          </div>
        ) : (
          <>
            {/* Headline & Summary */}
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900 leading-snug">
                {headline}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {summary}
              </p>
            </div>

            {/* Weather Observation context */}
            {weatherObs && (
              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-2.5 text-xs text-blue-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-tight">{weatherObs}</p>
              </div>
            )}

            {/* Expanded Detailed Guidance */}
            {isExpanded && (
              <div className="space-y-3 pt-1">
                {/* 3 Pillar Guidance Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Pillar 1: Irrigation */}
                  <div className="bg-emerald-50/60 border border-emerald-100/80 rounded-2xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" />
                      <span>{isBn ? 'সেচ ব্যবস্থাপনা' : 'Irrigation Advice'}</span>
                    </div>
                    <p className="text-[11px] text-gray-700 leading-tight">
                      {irrigationAdvice || (isBn ? 'মাটির আর্দ্রতা অনুযায়ী পরিমিত সেচ দিন।' : 'Irrigate based on soil moisture.')}
                    </p>
                  </div>

                  {/* Pillar 2: Fertilizer */}
                  <div className="bg-amber-50/60 border border-amber-100/80 rounded-2xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                      <Sprout className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span>{isBn ? 'সার ও পুষ্টি' : 'Fertilizer Advice'}</span>
                    </div>
                    <p className="text-[11px] text-gray-700 leading-tight">
                      {fertilizerAdvice || (isBn ? 'অনুমোদিত মাত্রায় সুষম সার উপরিপ্রয়োগ করুন।' : 'Apply stage-appropriate fertilizer.')}
                    </p>
                  </div>

                  {/* Pillar 3: Pest & Disease */}
                  <div className="bg-rose-50/60 border border-rose-100/80 rounded-2xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                      <span>{isBn ? 'বালাই সতর্কতা' : 'Pest Watch'}</span>
                    </div>
                    <p className="text-[11px] text-gray-700 leading-tight">
                      {pestWarning || (isBn ? 'পাতার নিচে পোকার ডিম ও দাগ পর্যবেক্ষণ করুন।' : 'Scout leaf undersides for signs of pests.')}
                    </p>
                  </div>
                </div>

                {/* Priority Actions Checklist */}
                {priorityActions.length > 0 && (
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 space-y-2">
                    <h5 className="text-xs font-bold text-gray-800 flex items-center justify-between">
                      <span>{isBn ? 'আজকের জরুরি করণীয়:' : "Today's Priority Actions:"}</span>
                      <span className="text-[10px] text-gray-500 font-normal">
                        {isBn ? 'চেক করে সম্পন্ন করুন' : 'Tap to mark done'}
                      </span>
                    </h5>
                    <div className="space-y-1.5">
                      {priorityActions.map((action, idx) => {
                        const isDone = completedActions[idx];
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => toggleAction(idx)}
                            className={`w-full text-left p-2 rounded-xl border text-xs flex items-start gap-2.5 transition-all active:scale-98 ${
                              isDone
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-900 line-through opacity-75'
                                : 'bg-white border-gray-200 text-gray-800 hover:border-emerald-300'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                isDone
                                  ? 'bg-[#2E7D32] border-[#2E7D32] text-white'
                                  : 'border-gray-300 bg-white'
                              }`}
                            >
                              {isDone && <CheckCircle2 className="w-3 h-3" />}
                            </span>
                            <span className="text-[11px] leading-tight flex-1">
                              {action}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Cautious Advisory Notice */}
                <div className="pt-1 flex items-start gap-2 text-[10px] text-gray-500">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-tight">{caution}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
