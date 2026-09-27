import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // App General
  appName: { bn: 'কৃষিবাজার', en: 'KrishiBazar' },
  tagline: { bn: 'স্মার্ট কৃষি ও এআই ফসল সুরক্ষা', en: 'Smart Agriculture & AI Crop Care' },
  toggleLang: { bn: 'English', en: 'বাংলা' },

  // Navigation
  navDashboard: { bn: 'ড্যাশবোর্ড', en: 'Dashboard' },
  navMyFarm: { bn: 'আমার খামার', en: 'My Farm' },
  navDiseaseDetection: { bn: 'এআই রোগ সনাক্তকরণ', en: 'AI Scan' },
  navCropCalendar: { bn: 'ফসল ক্যালেন্ডার', en: 'Crop Calendar' },
  navMarketplace: { bn: 'বাজার', en: 'Market' },
  navPrices: { bn: 'বাজার দর', en: 'Prices' },
  navProfile: { bn: 'প্রোফাইল', en: 'Profile' },
  navSettings: { bn: 'সেটিংস', en: 'Settings' },

  // Dashboard Page
  welcomeFarmer: { bn: 'স্বাগতম, মোঃ রফিকুল ইসলাম', en: 'Welcome, Md. Rafiqul Islam' },
  locationTag: { bn: 'বগুড়া সদর, বগুড়া', en: 'Bogura Sadar, Bogura' },
  weatherTitle: { bn: 'আজকের আবহাওয়া পূর্বাভাস', en: 'Today Weather Forecast' },
  weatherDesc: { bn: 'তাপমাত্রা ৩৪°সে • আর্দ্রতা ৭৮% • হালকা বৃষ্টির সম্ভাবনা', en: 'Temp 34°C • Humidity 78% • Light Rain Expected' },
  quickActions: { bn: 'দ্রুত সেবা সমুহ', en: 'Quick Services' },
  actionScanDisease: { bn: 'ফসল রোগ নির্ণয়', en: 'Scan Disease' },
  actionCropCalendar: { bn: 'ফসল ক্যালেন্ডার', en: 'Crop Calendar' },
  actionMarketPrice: { bn: 'আজকের বাজার দর', en: 'Market Prices' },
  actionAddCrop: { bn: 'নতুন ফসল যুক্ত করুন', en: 'Add Crop' },
  myFarmsOverview: { bn: 'আমার খামারের অবস্থা', en: 'My Farms Summary' },
  activeCrops: { bn: 'চলতি ফসল সমুহ', en: 'Active Crops' },
  todayMarketHighlights: { bn: 'পাইকারি বাজার দর', en: 'Wholesale Market Prices' },

  // Disease Detection Module
  diseaseDetectionTitle: { bn: 'এআই ফসল রোগ সনাক্তকরণ', en: 'AI Disease Detection' },
  diseaseDetectionSub: { bn: 'আক্রান্ত পাতার ছবি তুলুন বা আপলোড করে ৩ সেকেন্ডে সঠিক রোগ ও প্রতিকার জানুন', en: 'Take or upload a photo of infected leaf to identify disease & remedies in 3s' },
  selectCropType: { bn: 'ফসলের ধরন বাছাই করুন', en: 'Select Crop Type' },
  uploadPhoto: { bn: 'ছবি আপলোড করুন', en: 'Upload Leaf Image' },
  takePhoto: { bn: 'ক্যামেরা দিয়ে তুলুন', en: 'Take Photo with Camera' },
  samplePhotos: { bn: 'অথবা নমুনা আক্রান্ত পাতা নির্বাচন করুন (পরীক্ষার জন্য):', en: 'Or select a sample diseased leaf (for instant test):' },
  analyzeBtn: { bn: 'এআই দিয়ে রোগ পরীক্ষা করুন', en: 'Analyze with Gemini AI' },
  analyzing: { bn: 'এআই দ্বারা রোগ বিশ্লেষণ করা হচ্ছে...', en: 'Analyzing with AI Model...' },
  cameraPrompt: { bn: 'স্পষ্ট আলোতে পাতার আক্রান্ত অংশের স্পষ্ট ছবি তুলুন', en: 'Capture clear close-up of infected leaf part in good lighting' },

  // Disease Result Module
  diseaseResultTitle: { bn: 'রোগ নির্ণয়ের বিবরণ ও প্রতিকার', en: 'Disease Diagnosis & Remedies' },
  severityLabel: { bn: 'আক্রমণের তীব্রতা:', en: 'Severity Level:' },
  confidenceLabel: { bn: 'এআই নির্ভরতা স্কোর:', en: 'AI Confidence Score:' },
  listenVoiceAdvice: { bn: 'পরামর্শ শুনুন (ভয়েস)', en: 'Listen Diagnosis (Voice)' },
  tabSymptoms: { bn: 'রোগের লক্ষণ', en: 'Symptoms' },
  tabOrganic: { bn: 'জৈব ও প্রাকৃতিক প্রতিকার', en: 'Organic Control' },
  tabChemical: { bn: 'রাসায়নিক চিকিৎসা ও ঔষধ', en: 'Chemical Treatment' },
  tabPrevention: { bn: 'প্রতিরোধমূলক টিপস', en: 'Prevention Tips' },
  expertSummary: { bn: 'কৃষি বিশেষজ্ঞের সারসংক্ষেপ পরামর্শ:', en: 'Agricultural Expert Summary:' },
  addReminderBtn: { bn: 'ক্যালেন্ডারে বালাইনাশক স্প্রে রিমাইন্ডার যুক্ত করুন', en: 'Add Spray Reminder to Crop Calendar' },
  downloadReport: { bn: 'রিপোর্ট ডাউনলোড করুন', en: 'Download PDF Report' },

  // Crop Calendar Module
  cropCalendarTitle: { bn: 'ফসল ব্যবস্থাপনা ক্যালেন্ডার', en: 'Crop Calendar' },
  cropCalendarSub: { bn: 'বপন থেকে ফসল কাটা পর্যন্ত সপ্তাহের সময়সূচী ও পরিচর্যা', en: 'Sowing to harvest weekly schedule & care guidelines' },
  selectActiveCrop: { bn: 'ফসল নির্বাচন করুন:', en: 'Select Active Crop:' },
  allTasks: { bn: 'সকল কাজ', en: 'All Tasks' },
  pendingTasks: { bn: 'বাকি কাজ', en: 'Pending' },
  completedTasks: { bn: 'সম্পন্ন', en: 'Completed' },
  markComplete: { bn: 'সম্পন্ন হয়েছে', en: 'Mark Complete' },
  markIncomplete: { bn: 'অসম্পূর্ণ রাখুন', en: 'Mark Incomplete' },
  addTask: { bn: '+ নতুন পরিচর্যা যুক্ত করুন', en: '+ Add Custom Task' },

  // Farm Management
  myFarmsTitle: { bn: 'আমার খামার তালিকা', en: 'My Farm Directory' },
  addFarmBtn: { bn: 'নতুন খামার যুক্ত করুন', en: 'Add New Farm' },
  farmName: { bn: 'খামারের নাম', en: 'Farm Name' },
  districtLabel: { bn: 'জেলা', en: 'District' },
  upazilaLabel: { bn: 'উপজেলা', en: 'Upazila' },
  areaInDecimal: { bn: 'জমির পরিমাণ (শতক/ডিসিমাল)', en: 'Land Area (Decimal)' },
  soilType: { bn: 'মাটির ধরণ', en: 'Soil Type' },
  saveFarm: { bn: 'খামার সংরক্ষণ করুন', en: 'Save Farm Details' },
  farmMonitoring: { bn: 'আইওটি ফার্ম মনিটরিং', en: 'IoT Farm Monitoring' },
  farmMonitoringSub: { bn: 'রিয়েল-টাইম সেন্সর ডেটা ও সুরক্ষা মনিটরিং', en: 'Real-time sensor telemetry & security' },

  // Farmer Marketplace
  myListings: { bn: 'আমার বিক্রয় তালিকা', en: 'My Listings' },
  allProduce: { bn: 'সকল ফসল', en: 'All Produce' },
  receivedOrders: { bn: 'প্রাপ্ত অর্ডারসমূহ', en: 'Received Orders' },
  createListingBtn: { bn: 'নতুন ফসল বিক্রি পোস্ট করুন', en: 'Post New Produce Listing' },
  selectCrop: { bn: 'ফসল নির্বাচন করুন', en: 'Select Crop' },
  quantityKg: { bn: 'পরিমাণ (কেজি)', en: 'Quantity (kg)' },
  pricePerKgLabel: { bn: 'দর প্রতি কেজি (টাকা)', en: 'Price per kg (৳)' },
  harvestDateLabel: { bn: 'ফসল তোলার তারিখ', en: 'Harvest Date' },
  publishListing: { bn: 'লিস্টিং প্রকাশ করুন', en: 'Publish Listing' },
  markSold: { bn: 'বিক্রিত মার্ক করুন', en: 'Mark as Sold' },
  markShipped: { bn: 'পাঠানো হয়েছে', en: 'Mark as Shipped' },
  markDelivered: { bn: 'সম্পন্ন হয়েছে', en: 'Mark as Delivered' },

  // AI & Farmer Alerts
  aiIntelligence: { bn: 'এআই ক্রপ ইন্টেলিজেন্স', en: 'AI Crop Intelligence' },
  aiDailySummary: { bn: 'দৈনিক এআই খামার সামারি', en: 'AI Daily Farm Summary' },
  cropLifecycle: { bn: 'ফসল জীবনচক্র ট্র্যাকার', en: 'Crop Lifecycle Tracker' },
  iotSensors: { bn: 'স্মার্ট আইওটি সেন্সর', en: 'Smart IoT Sensors' },
  rainAlert: { bn: 'বৃষ্টি সতর্কতা', en: 'Rain Alert' },
  irrigationAlert: { bn: 'সেচ সতর্কতা', en: 'Irrigation Alert' },
  cropStageAlert: { bn: 'ফসল পর্যায় সতর্কতা', en: 'Crop-Stage Alert' },
  diseaseRiskAlert: { bn: 'রোগ ঝুঁকি সতর্কতা', en: 'Disease-Risk Alert' },
  marketPriceAlert: { bn: 'বাজার দর সতর্কতা', en: 'Market-Price Alert' },
  orderNotification: { bn: 'অর্ডার নোটিফিকেশন', en: 'Order Notification' },
  topRecommendedCrops: { bn: 'এআই অনুমোদিত সেরা ফসল', en: 'Top Recommended Crops' },
  compatibilityScore: { bn: 'সামঞ্জস্য স্কোর', en: 'Compatibility Score' },

  // Common buttons
  back: { bn: 'ফিরে যান', en: 'Back' },
  submit: { bn: 'জমা দিন', en: 'Submit' },
  cancel: { bn: 'বাতিল', en: 'Cancel' },
  close: { bn: 'বন্ধ করুন', en: 'Close' },
  callHelpline: { bn: 'কৃষি কল সেন্টার ১৬১২৩', en: 'Agri Helpline 16123' },
  aiAssistant: { bn: 'এআই কৃষি সহায়ক', en: 'AI Agri Assistant' },
  askAI: { bn: 'কৃষি বিষয়ক প্রশ্ন করুন...', en: 'Ask agriculture questions...' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('krishibazar_lang');
    return (saved === 'en' || saved === 'bn') ? saved : 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('krishibazar_lang', lang);
  };

  const toggleLanguage = () => {
    const newLang = language === 'bn' ? 'en' : 'bn';
    setLanguage(newLang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
