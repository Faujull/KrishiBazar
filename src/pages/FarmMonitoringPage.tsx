import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_FARMS } from '../data/mockData';
import { Farm } from '../types';
import {
  Activity,
  ArrowLeft,
  Wifi,
  Droplets,
  Thermometer,
  CloudRain,
  Flame,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Zap,
  CheckCircle2,
  Cpu,
  Radio,
  Clock,
  Compass,
  BatteryCharging,
  SlidersHorizontal,
  Bell
} from 'lucide-react';
import { useWeather, toBengaliNumber } from '../services/weatherService';

export interface IoTSensorData {
  temperature: number; // in °C
  soilMoisture: number; // in %
  humidity: number; // in %
  rainfall: number; // in mm
  soilCondition: {
    ph: number;
    nitrogen: 'low' | 'optimal' | 'high';
    nitrogenPpm: number;
    phosphorusPpm: number;
    potassiumPpm: number;
    salinity: 'normal' | 'moderate' | 'high';
  };
  waterRequirement: {
    status: 'none' | 'light' | 'moderate' | 'urgent';
    waterLevelCm: number;
    litersNeededPerBigha: number;
  };
  fireStatus: {
    hasFire: boolean;
    smokeLevelPpm: number;
    flameDetected: boolean;
  };
  intrusionStatus: {
    hasIntrusion: boolean;
    sensorZone: string;
    lastMotionTimestamp: string;
  };
  batteryPercent: number;
  gatewaySignalPercent: number;
  lastSyncTime: string;
}

export const FarmMonitoringPage: React.FC = () => {
  const { farmId } = useParams<{ farmId?: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const defaultFarm = INITIAL_FARMS[0];
  const farm = INITIAL_FARMS.find((f) => f.id === farmId) || defaultFarm;

  // Integrated with Open-Meteo live weather
  const { weather } = useWeather({ farm });

  // Prototype Sensor Telemetry State
  const [sensorData, setSensorData] = useState<IoTSensorData>({
    temperature: 28.5,
    soilMoisture: 68,
    humidity: 74,
    rainfall: 0.0,
    soilCondition: {
      ph: 6.8,
      nitrogen: 'optimal',
      nitrogenPpm: 142,
      phosphorusPpm: 34,
      potassiumPpm: 185,
      salinity: 'normal'
    },
    waterRequirement: {
      status: 'none',
      waterLevelCm: 2.8,
      litersNeededPerBigha: 0
    },
    fireStatus: {
      hasFire: false,
      smokeLevelPpm: 18,
      flameDetected: false
    },
    intrusionStatus: {
      hasIntrusion: false,
      sensorZone: 'উত্তর সীমানা (North Perimeter)',
      lastMotionTimestamp: 'সবুজ সংকেত (কোনো অনুপ্রবেশ নেই)'
    },
    batteryPercent: 94,
    gatewaySignalPercent: 96,
    lastSyncTime: 'মাত্র কয়েক সেকেন্ড আগে'
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync initial temperature & humidity with Open-Meteo live weather if available
  useEffect(() => {
    if (weather?.temperature && !isNaN(weather.temperature)) {
      setSensorData((prev) => ({
        ...prev,
        temperature: Math.round(weather.temperature * 10) / 10,
        humidity: Math.round(weather.humidity),
        rainfall: weather.precipitation || 0.0
      }));
    }
  }, [weather]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate slight micro-variations in sensor reading
      const randomOffset = (Math.random() - 0.5) * 0.4;
      const moistureOffset = Math.round((Math.random() - 0.5) * 2);
      setSensorData((prev) => ({
        ...prev,
        temperature: Math.round((prev.temperature + randomOffset) * 10) / 10,
        soilMoisture: Math.min(95, Math.max(40, prev.soilMoisture + moistureOffset)),
        lastSyncTime: isBn ? 'মাত্র কয়েক মুহূর্ত আগে' : 'Just now'
      }));
      setIsRefreshing(false);
      showToast(isBn ? 'সেন্সর টেলিমেট্রি সফলভাবে রিফ্রেশ হয়েছে!' : 'Sensor telemetry updated!');
    }, 700);
  };

  // Simulation test mode for farmer QA
  const toggleHazardSimulation = () => {
    setSensorData((prev) => {
      const willHaveFire = !prev.fireStatus.hasFire;
      return {
        ...prev,
        fireStatus: {
          hasFire: willHaveFire,
          smokeLevelPpm: willHaveFire ? 340 : 18,
          flameDetected: willHaveFire
        },
        intrusionStatus: {
          hasIntrusion: willHaveFire,
          sensorZone: isBn ? 'পশ্চিম সীমানা (গেট ৩)' : 'West Fence (Gate 3)',
          lastMotionTimestamp: willHaveFire ? (isBn ? 'গতিবিধি শনাক্ত!' : 'Motion Detected!') : (isBn ? 'সুরক্ষিত' : 'Secure')
        }
      };
    });
    showToast(isBn ? 'সেন্সর টেস্ট মোড টগল করা হয়েছে!' : 'Sensor test simulation toggled!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-28 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2E7D32] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#F9A825]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#2E7D32] font-black">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>{isBn ? 'আইওটি স্মার্ট ফার্ম মনিটরিং' : 'IoT Smart Farm Monitoring'}</span>
          </div>
          <p className="text-[10px] text-gray-500">
            {isBn ? 'রিয়েল-টাইম সেন্সর ও সুরক্ষা গেটওয়ে' : 'Real-time LoRaWAN Sensor Telemetry'}
          </p>
        </div>

        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#2E7D32] hover:bg-emerald-50 active:scale-95 transition-transform shadow-xs"
          title={isBn ? 'রিফ্রেশ করুন' : 'Refresh Telemetry'}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Gateway & Node Status Bar */}
      <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white p-4.5 rounded-3xl shadow-lg border border-emerald-400/30 relative overflow-hidden space-y-3">
        <div className="absolute top-0 right-0 w-36 h-36 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-black text-white">
              {isBn ? 'গেটওয়ে অনলাইন (LoraWAN 868MHz)' : 'Gateway Online (LoRaWAN)'}
            </span>
          </div>

          <span className="text-[10px] bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-bold text-emerald-100 border border-white/20">
            {farm.district} • {isBn ? 'নোড #১' : 'Node #1'}
          </span>
        </div>

        <div className="relative z-10">
          <h2 className="text-lg font-black text-white leading-tight">
            {isBn ? farm.nameBn : farm.nameEn}
          </h2>
          <p className="text-xs text-emerald-100 mt-0.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#F9A825]" />
            <span>{isBn ? `শেষ সিঙ্ক: ${sensorData.lastSyncTime}` : `Last sync: ${sensorData.lastSyncTime}`}</span>
          </p>
        </div>

        {/* Device Telemetry Metrics */}
        <div className="grid grid-cols-3 gap-2 bg-black/25 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 text-center text-xs relative z-10">
          <div>
            <span className="text-[9px] text-emerald-200 block">{isBn ? 'ব্যাটারি লেভেল' : 'Battery'}</span>
            <span className="text-xs font-black text-white mt-0.5 block flex items-center justify-center gap-1">
              <BatteryCharging className="w-3 h-3 text-emerald-300" />
              {sensorData.batteryPercent}%
            </span>
          </div>

          <div>
            <span className="text-[9px] text-emerald-200 block">{isBn ? 'সিগন্যাল ক্ষমতা' : 'Signal'}</span>
            <span className="text-xs font-black text-white mt-0.5 block flex items-center justify-center gap-1">
              <Wifi className="w-3 h-3 text-[#F9A825]" />
              {sensorData.gatewaySignalPercent}%
            </span>
          </div>

          <div>
            <span className="text-[9px] text-emerald-200 block">{isBn ? 'সার্বিক অবস্থা' : 'System Health'}</span>
            <span className="text-xs font-black text-emerald-300 mt-0.5 block">
              {sensorData.fireStatus.hasFire ? (isBn ? 'ঝুঁকি!' : 'Alert!') : (isBn ? 'অনুকূল' : 'Normal')}
            </span>
          </div>
        </div>
      </div>

      {/* Sensor Hazard Alert (if detected) */}
      {(sensorData.fireStatus.hasFire || sensorData.intrusionStatus.hasIntrusion) && (
        <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-3.5 shadow-md flex items-start gap-3 animate-bounce-short">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-0.5 text-xs">
            <h4 className="font-black text-red-900">
              {isBn ? 'জরুরি সেন্সর সতর্কতা: খামারে অস্বাভাবিকতা সনাক্ত!' : 'Emergency Sensor Alert! Hazard Detected!'}
            </h4>
            <p className="text-red-800 text-[11px] leading-tight">
              {sensorData.fireStatus.hasFire && (isBn ? 'তাপমাত্রা/ধোঁয়া সেন্সর সক্রিয় হয়েছে। ' : 'High temperature / Smoke spike detected! ')}
              {sensorData.intrusionStatus.hasIntrusion && (isBn ? 'পেরিমিটার নিরাপত্তা বেষ্টনীতে অপ্রত্যাশিত গতিবিধি সনাক্ত।' : 'Motion detected on fence perimeter.')}
            </p>
          </div>
        </div>
      )}

      {/* THE 8 REQUIRED PROTOTYPE SENSOR TILES */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-[#2E7D32]" />
            <span>{isBn ? 'ফিল্ড সেন্সর ডেটা (৮টি প্যারামিটার)' : 'Field Sensors Telemetry (8 Metrics)'}</span>
          </h3>
          <span className="text-[10px] text-gray-500 font-semibold">
            {isBn ? 'প্রোটোটাইপ সিমুলেশন' : 'Prototype Ready'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* 1. TEMPERATURE */}
          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-gray-500 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                <span>{isBn ? 'তাপমাত্রা' : 'Temperature'}</span>
              </span>
              <span className="text-[9px] bg-orange-100 text-orange-900 font-black px-1.5 py-0.5 rounded-md">
                {isBn ? 'স্বাভাবিক' : 'Optimal'}
              </span>
            </div>
            <div>
              <span className="text-2xl font-black text-gray-900">
                {toBengaliNumber(sensorData.temperature)}°
                <span className="text-xs font-bold text-gray-500"> {isBn ? 'সে' : 'C'}</span>
              </span>
              <p className="text-[10px] text-gray-500 mt-0.5">
                {isBn ? 'আদর্শ সীমা: ২২°-৩২° সে' : 'Target: 22°-32°C'}
              </p>
            </div>
          </div>

          {/* 2. SOIL MOISTURE */}
          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-gray-500 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                <span>{isBn ? 'মাটির আর্দ্রতা' : 'Soil Moisture'}</span>
              </span>
              <span className="text-[9px] bg-blue-100 text-blue-900 font-black px-1.5 py-0.5 rounded-md">
                {isBn ? 'অনুকূল' : 'Adequate'}
              </span>
            </div>
            <div>
              <span className="text-2xl font-black text-blue-700">
                {toBengaliNumber(sensorData.soilMoisture)}%
              </span>
              {/* Progress bar */}
              <div className="w-full bg-blue-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${sensorData.soilMoisture}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                {isBn ? 'কুশি দশার আদর্শ সীমা: ৬০-৮০%' : 'Ideal range: 60-80%'}
              </p>
            </div>
          </div>

          {/* 3. HUMIDITY */}
          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-gray-500 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-teal-600" />
                <span>{isBn ? 'বাতাসের আর্দ্রতা' : 'Air Humidity'}</span>
              </span>
              <span className="text-[9px] bg-teal-100 text-teal-900 font-black px-1.5 py-0.5 rounded-md">
                {isBn ? 'মাঝারি' : 'Normal'}
              </span>
            </div>
            <div>
              <span className="text-2xl font-black text-gray-900">
                {toBengaliNumber(sensorData.humidity)}%
              </span>
              <p className="text-[10px] text-gray-500 mt-0.5">
                {isBn ? 'ডিজিটাল ক্যাপাসিটিভ সেন্সর' : 'Capacitive Air Sensor'}
              </p>
            </div>
          </div>

          {/* 4. RAINFALL */}
          <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-gray-500 flex items-center gap-1">
                <CloudRain className="w-3.5 h-3.5 text-indigo-500" />
                <span>{isBn ? 'বৃষ্টিপাত' : 'Rainfall'}</span>
              </span>
              <span className="text-[9px] bg-indigo-100 text-indigo-900 font-black px-1.5 py-0.5 rounded-md">
                {sensorData.rainfall > 0 ? (isBn ? 'বৃষ্টি রেকর্ড' : 'Rain Recorded') : (isBn ? 'শুকনো' : 'Dry')}
              </span>
            </div>
            <div>
              <span className="text-2xl font-black text-gray-900">
                {toBengaliNumber(sensorData.rainfall)}
                <span className="text-xs font-bold text-gray-500"> {isBn ? 'মিমি' : 'mm'}</span>
              </span>
              <p className="text-[10px] text-gray-500 mt-0.5">
                {isBn ? 'অপটিক্যাল রেইন গেজ নোড' : 'Optical Gauge Telemetry'}
              </p>
            </div>
          </div>

          {/* 5. SOIL CONDITION (pH & NPK) */}
          <div className="col-span-2 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs font-black text-gray-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#2E7D32]" />
                <span>{isBn ? 'মাটির রাসায়নিক অবস্থা (Soil Condition & NPK)' : 'Soil Condition & Nutrients'}</span>
              </span>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-[#2E7D32] px-2 py-0.5 rounded-full">
                {isBn ? 'উর্বর দোআঁশ' : 'Fertile Loam'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-500 font-bold block">pH মাত্রা</span>
                <span className="font-extrabold text-[#2E7D32] text-sm mt-0.5 block">
                  {toBengaliNumber(sensorData.soilCondition.ph)}
                </span>
                <span className="text-[9px] text-gray-400 block">{isBn ? 'নিরপেক্ষ' : 'Neutral'}</span>
              </div>

              <div className="p-2 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-500 font-bold block">নাইট্রোজেন (N)</span>
                <span className="font-extrabold text-blue-700 text-sm mt-0.5 block">
                  {toBengaliNumber(sensorData.soilCondition.nitrogenPpm)}
                </span>
                <span className="text-[9px] text-gray-400 block">ppm</span>
              </div>

              <div className="p-2 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-500 font-bold block">ফসফরাস (P)</span>
                <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">
                  {toBengaliNumber(sensorData.soilCondition.phosphorusPpm)}
                </span>
                <span className="text-[9px] text-gray-400 block">ppm</span>
              </div>

              <div className="p-2 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-500 font-bold block">পটাশিয়াম (K)</span>
                <span className="font-extrabold text-indigo-700 text-sm mt-0.5 block">
                  {toBengaliNumber(sensorData.soilCondition.potassiumPpm)}
                </span>
                <span className="text-[9px] text-gray-400 block">ppm</span>
              </div>
            </div>
          </div>

          {/* 6. WATER REQUIREMENT */}
          <div className="col-span-2 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-gray-900 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-600" />
                <span>{isBn ? 'পানির চাহিদা ও স্তর (Water Requirement)' : 'Water Requirement & Depth'}</span>
              </span>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                {isBn ? 'পর্যাপ্ত (সেচ প্রয়োজন নেই)' : 'Satisfactory (No Irrigation Needed)'}
              </span>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-blue-900 font-bold block">
                  {isBn ? 'ক্ষেতে বর্তমান পানির গভীরতা:' : 'Standing Water Depth:'}
                </span>
                <span className="text-base font-black text-blue-950">
                  {toBengaliNumber(sensorData.waterRequirement.waterLevelCm)} {isBn ? 'সেমি (১.১ ইঞ্চি)' : 'cm (1.1 in)'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-blue-900 font-bold block">
                  {isBn ? 'পরবর্তী সেচ পর্যবেক্ষণ:' : 'Next Watering Due:'}
                </span>
                <span className="font-bold text-blue-800">
                  {isBn ? 'আগামী ৩ দিন পর' : 'In 3 Days'}
                </span>
              </div>
            </div>
          </div>

          {/* 7. FIRE STATUS */}
          <div
            className={`p-3.5 rounded-2xl border shadow-xs space-y-2 transition-all ${
              sensorData.fireStatus.hasFire
                ? 'bg-red-50 border-red-500 ring-2 ring-red-400'
                : 'bg-white border-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-gray-500 flex items-center gap-1">
                <Flame className={`w-3.5 h-3.5 ${sensorData.fireStatus.hasFire ? 'text-red-600 animate-bounce' : 'text-amber-500'}`} />
                <span>{isBn ? 'অগ্নিঝুঁকি স্ট্যাটাস' : 'Fire Status'}</span>
              </span>
              <span
                className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                  sensorData.fireStatus.hasFire
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-emerald-100 text-[#2E7D32]'
                }`}
              >
                {sensorData.fireStatus.hasFire ? (isBn ? 'বিপদ!' : 'Fire Alert!') : (isBn ? 'নিরাপদ' : 'Safe')}
              </span>
            </div>
            <div>
              <span
                className={`text-base font-black ${
                  sensorData.fireStatus.hasFire ? 'text-red-700' : 'text-gray-900'
                }`}
              >
                {sensorData.fireStatus.hasFire
                  ? (isBn ? 'অগ্নিশিখা শনাক্ত!' : 'Flame Detected!')
                  : (isBn ? 'ঝুঁকিমুক্ত' : 'No Hazard')}
              </span>
              <p className="text-[10px] text-gray-500 mt-0.5">
                {isBn ? `ধোঁয়া: ${sensorData.fireStatus.smokeLevelPpm} ppm (স্বাভাবিক)` : `Smoke: ${sensorData.fireStatus.smokeLevelPpm} ppm`}
              </p>
            </div>
          </div>

          {/* 8. INTRUSION STATUS */}
          <div
            className={`p-3.5 rounded-2xl border shadow-xs space-y-2 transition-all ${
              sensorData.intrusionStatus.hasIntrusion
                ? 'bg-red-50 border-red-500 ring-2 ring-red-400'
                : 'bg-white border-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-gray-500 flex items-center gap-1">
                <ShieldCheck
                  className={`w-3.5 h-3.5 ${sensorData.intrusionStatus.hasIntrusion ? 'text-red-600' : 'text-emerald-600'}`}
                />
                <span>{isBn ? 'অনুপ্রবেশ নজরদারি' : 'Intrusion'}</span>
              </span>
              <span
                className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                  sensorData.intrusionStatus.hasIntrusion
                    ? 'bg-red-600 text-white'
                    : 'bg-emerald-100 text-[#2E7D32]'
                }`}
              >
                {sensorData.intrusionStatus.hasIntrusion ? (isBn ? 'সতর্কতা' : 'Breach') : (isBn ? 'সুরক্ষিত' : 'Secure')}
              </span>
            </div>
            <div>
              <span
                className={`text-base font-black ${
                  sensorData.intrusionStatus.hasIntrusion ? 'text-red-700' : 'text-gray-900'
                }`}
              >
                {sensorData.intrusionStatus.hasIntrusion
                  ? (isBn ? 'গতিবিধি শনাক্ত!' : 'Motion Alert!')
                  : (isBn ? 'বেষ্টনী সুরক্ষিত' : 'Perimeter Safe')}
              </span>
              <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                {sensorData.intrusionStatus.sensorZone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Developer / Farmer Simulation Tools */}
      <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-gray-700 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
            <span>{isBn ? 'আইওটি টেস্ট সিমুলেটর (Prototype)' : 'IoT Test Simulator'}</span>
          </span>
          <span className="text-[9px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-bold">
            Simulated
          </span>
        </div>

        <p className="text-[11px] text-gray-600">
          {isBn
            ? 'বাস্তব আইওটি সেন্সর ডিভাইস সংযোগের জন্য আর্কিটেকচার প্রস্তুত রয়েছে। নিচের বাটনে ক্লিক করে জরুরি অ্যালার্টের কার্যকারিতা পরীক্ষা করুন।'
            : 'Ready for hardware MQTT integration. Click below to simulate sensor alert triggers.'}
        </p>

        <button
          onClick={toggleHazardSimulation}
          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all ${
            sensorData.fireStatus.hasFire
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>
            {sensorData.fireStatus.hasFire
              ? (isBn ? 'স্বাভাবিক অবস্থায় রিসেট করুন' : 'Reset to Normal Status')
              : (isBn ? 'বিপদ অ্যালার্ট টেস্ট করুন (Simulate Hazard)' : 'Simulate Hazard & Intrusion Alert')}
          </span>
        </button>
      </div>

      {/* Action Footer */}
      <div className="space-y-2">
        <Link
          to={`/ai-intelligence/${farm.id}`}
          className="w-full bg-[#2E7D32] hover:bg-green-800 text-white font-extrabold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 text-xs active:scale-98 transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#F9A825]" />
          <span>{isBn ? 'এআই ক্রপ ইন্টেলিজেন্সে ফিরে যান' : 'Go to AI Crop Intelligence Center'}</span>
        </Link>
      </div>
    </div>
  );
};
