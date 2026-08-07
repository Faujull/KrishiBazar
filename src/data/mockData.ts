import { Farm, Crop, DiseaseAnalysisResult, CropCalendarTask, MarketPrice, MarketplaceProduct } from '../types';

export const INITIAL_FARMS: Farm[] = [
  {
    id: 'f1',
    nameBn: 'সোনার বাংলা কৃষি খামার',
    nameEn: 'Sonar Bangla Agro Farm',
    district: 'বগুড়া',
    upazila: 'শিবগঞ্জ',
    areaDecimal: 120, // 120 শতক = ৩ একর
    soilTypeBn: 'দোআঁশ মাটি',
    soilTypeEn: 'Loamy Soil',
    cropsCount: 3,
    healthScore: 92,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'f2',
    nameBn: 'সবুজ দিগন্ত এগ্রো টেক',
    nameEn: 'Green Horizon Agro Tech',
    district: 'রংপুর',
    upazila: 'মিঠাপুকুর',
    areaDecimal: 80,
    soilTypeBn: 'বেলে দোআঁশ',
    soilTypeEn: 'Sandy Loam',
    cropsCount: 2,
    healthScore: 86,
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb23659?auto=format&fit=crop&w=600&q=80',
  },
];

export const INITIAL_CROPS: Crop[] = [
  {
    id: 'c1',
    farmId: 'f1',
    cropNameBn: 'উফশী আমন ধান',
    cropNameEn: 'High Yield Amon Rice',
    varietyBn: 'বিআর-২৮ (BR-28)',
    varietyEn: 'BR-28',
    plantingDate: '২০২৬-০৬-১৫',
    expectedHarvestDate: '২০২৬-১০-১৫',
    areaDecimal: 60,
    stageBn: 'কুশি গজানো পর্যায় (Tillering Stage)',
    stageEn: 'Tillering Stage',
    status: 'warning',
    imageUrl: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'c2',
    farmId: 'f1',
    cropNameBn: 'উন্নত লাল আলু',
    cropNameEn: 'Red Potato',
    varietyBn: 'কার্ডিনাল (Cardinal)',
    varietyEn: 'Cardinal',
    plantingDate: '২০২৬-১১-০১',
    expectedHarvestDate: '২০২৭-০২-১৫',
    areaDecimal: 40,
    stageBn: 'কন্দ বৃদ্ধি পর্যায় (Tuber Growth)',
    stageEn: 'Tuber Growth',
    status: 'healthy',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'c3',
    farmId: 'f2',
    cropNameBn: 'হাইব্রিড টমেটো',
    cropNameEn: 'Hybrid Tomato',
    varietyBn: 'বিজলী এফ-১ (Bijli F1)',
    varietyEn: 'Bijli F1',
    plantingDate: '২০২৬-০৫-১০',
    expectedHarvestDate: '২০২৬-০৮-২৫',
    areaDecimal: 20,
    stageBn: 'ফল ধরা পর্যায় (Fruiting Stage)',
    stageEn: 'Fruiting Stage',
    status: 'critical',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
  },
];

export const SAMPLE_DISEASE_CASES: DiseaseAnalysisResult[] = [
  {
    id: 'd1',
    cropNameBn: 'আলু (Potato)',
    cropNameEn: 'Potato',
    imageBase64: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80',
    timestamp: new Date().toISOString(),
    diseaseDetected: true,
    diseaseNameBn: 'আলুর নাবি ধসা রোগ (Late Blight of Potato)',
    diseaseNameEn: 'Potato Late Blight',
    confidenceScore: 96,
    severity: 'High',
    symptomsBn: [
      'পাতায় পানিতে ভেজা ধূসর বা বাদামী রঙের ছোপ ছোপ দাগ।',
      'আর্দ্র আবহাওয়া বা কুয়াশায় পাতার নিচে সাদা রঙের ছত্রাক জালিকা দেখা যায়।',
      'আক্রান্ত পাতা দ্রুত পচে কালো হয়ে যায় এবং দুর্গন্ধ ছড়ায়।'
    ],
    symptomsEn: [
      'Water-soaked dark lesions on upper leaf surfaces.',
      'White mildew/fungal growth under leaves during high humidity.',
      'Rapid leaf browning, rotting, and foul odor.'
    ],
    organicTreatmentBn: [
      'আক্রান্ত পাতা ও গাছ সাবধানে কেটে মাটিতে পুঁতে ফেলুন।',
      'ট্রাইকোডার্মা ভিরিডি (Trichoderma viride) জৈব ছত্রাকনাশক স্প্রে করুন।',
      'নিম তেল ১ লিটার পানিতে ৫ মিলি মিশিয়ে স্প্রে করতে পারেন।'
    ],
    organicTreatmentEn: [
      'Remove and bury infected leaves immediately.',
      'Spray Trichoderma viride bio-fungicide (5g/L).',
      'Apply pure Neem oil spray (5ml/L).'
    ],
    chemicalTreatmentBn: [
      'ম্যানকোজেব (Mancozeb) গ্রুপের সিকোর বা রিডোমিল গোল্ড ২ গ্রাম প্রতি লিটার পানিতে মিশিয়ে ৭ দিন পর পর স্প্রে করুন।',
      'আক্রমণ তীব্র হলে সাইমোক্সানিল + ম্যানকোজেব (Cymoxanil + Mancozeb) সংমিশ্রণ স্প্রে করুন।'
    ],
    chemicalTreatmentEn: [
      'Spray Mancozeb (Ridomil Gold / Secor) 2g/L water every 7 days.',
      'For severe infection, use Cymoxanil + Mancozeb combination fungicide.'
    ],
    preventiveMeasuresBn: [
      'সারিবদ্ধভাবে আলু রোপণ করুন যাতে বাতাস চলাচল সহজ হয়।',
      'সন্ধ্যার পর জমিতে সেচ দেওয়া থেকে বিরত থাকুন।',
      'কুয়াশাপূর্ণ আবহাওয়ায় আগাম প্রতিরোধমূলক ম্যানকোজেব স্প্রে করুন।'
    ],
    preventiveMeasuresEn: [
      'Ensure proper row spacing for good air circulation.',
      'Avoid late afternoon overhead watering.',
      'Spray preventive fungicide before foggy weather.'
    ],
    expertAdviceBn: 'আপনার আলুর ক্ষেতে নাবি ধসা রোগ দেখা দিয়েছে। অনতিবিলম্বে রিডোমিল গোল্ড স্প্রে করুন এবং ক্ষেতে পানি জমে থাকা রোধ করুন। কুয়াশাচ্ছন্ন থাকলে ৩-৪ দিন অন্তর স্প্রে রিভিজিট করুন।',
    expertAdviceEn: 'Late Blight detected on potato leaves. Spray Ridomil Gold immediately and prevent waterlogging. Repeat spray if weather remains foggy.'
  },
  {
    id: 'd2',
    cropNameBn: 'ধান (Rice)',
    cropNameEn: 'Rice',
    imageBase64: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    timestamp: new Date().toISOString(),
    diseaseDetected: true,
    diseaseNameBn: 'ধানের পাতা ব্লাস্ট রোগ (Rice Leaf Blast)',
    diseaseNameEn: 'Rice Leaf Blast',
    confidenceScore: 94,
    severity: 'Medium',
    symptomsBn: [
      'পাতায় চোখের মত উপবৃত্তাকার দাগ, যার মাঝখান ধূসর এবং চারপাশ বাদামী।',
      'দাগগুলো ধীরে ধীরে বড় হয়ে সম্পূর্ণ পাতা শুকিয়ে ফেলে।'
    ],
    symptomsEn: [
      'Diamond/eye-shaped lesions on leaves with gray center and brown border.',
      'Lesions enlarge and merge causing entire leaves to dry.'
    ],
    organicTreatmentBn: [
      'জৈব সার হিসেবে ট্রাইকো-কমপোস্ট ব্যবহার বাড়ান।',
      'সুষম মাত্রায় পটাশ সার ব্যবহার করুন।'
    ],
    organicTreatmentEn: [
      'Increase Trichoderma compost application.',
      'Apply adequate Potash fertilizer.'
    ],
    chemicalTreatmentBn: [
      'ট্রাইসাইক্লাজল (Tricyclazole) গ্রুপের ট্রুপার বা ট্রাইকোর ০.৬ গ্রাম/লিটার অথবা ট্রাইফ্লক্সিস্ট্রবিন + টেবুকোনাজল (নাটিভো) ০.৪ গ্রাম/লিটার স্প্রে করুন।'
    ],
    chemicalTreatmentEn: [
      'Spray Tricyclazole (Trooper) @ 0.6g/L or Nativo (Trifloxystrobin + Tebuconazole) @ 0.4g/L.'
    ],
    preventiveMeasuresBn: [
      'ইউরিয়া সারের অতিরিক্ত ব্যবহার বন্ধ করুন।',
      'অনুমোদিত প্রজাতি ব্যবহার করুন এবং বীজ শোধন করে রোপণ করুন।'
    ],
    preventiveMeasuresEn: [
      'Avoid excess Urea (Nitrogen) application.',
      'Treat seeds before sowing and use resistant varieties.'
    ],
    expertAdviceBn: 'ধানের ব্লাস্ট রোগের আক্রমণ শুরুর দিকে আছে। অতিরিক্ত ইউরিয়া দেওয়া বন্ধ রেখে ট্রাইসাইক্লাজল বা নাটিভো স্প্রে করুন।',
    expertAdviceEn: 'Rice leaf blast detected in early stage. Stop top-dressing Urea and apply Tricyclazole or Nativo immediately.'
  },
  {
    id: 'd3',
    cropNameBn: 'টমেটো (Tomato)',
    cropNameEn: 'Tomato',
    imageBase64: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    timestamp: new Date().toISOString(),
    diseaseDetected: true,
    diseaseNameBn: 'টমেটোর পাতা কোঁকড়ানো ভাইরাস রোগ (Tomato Leaf Curl Virus)',
    diseaseNameEn: 'Tomato Leaf Curl Virus',
    confidenceScore: 92,
    severity: 'High',
    symptomsBn: [
      'গাছের কচি পাতা ওপরের দিকে কোঁকড়ে বা বাটির মত আকার ধারণ করে।',
      'গাছ খর্বাকৃতি হয় এবং ফুল-ফল ধরা বন্ধ হয়ে যায়।'
    ],
    symptomsEn: [
      'Young leaves curl upwards and form cup-like structures.',
      'Stunted plant growth and reduced flower/fruit setting.'
    ],
    organicTreatmentBn: [
      'আক্রান্ত গাছ তুলে পুড়িয়ে বা পুঁতে ফেলুন।',
      'হলুদ আঠালো ফাদ (Yellow Sticky Trap) খাটিয়ে সাদা মাছি দমন করুন।'
    ],
    organicTreatmentEn: [
      'Uproot and burn severely infected plants.',
      'Deploy Yellow Sticky Traps to catch Whiteflies.'
    ],
    chemicalTreatmentBn: [
      'সাদা মাছি দমনে ইমিডাক্লোপ্রিড (Imidacloprid) অথবা এসিটামিপ্রিড ০.৫ মিলি/লিটার পানিতে মিশিয়ে গাছের পাতায় ভালো করে স্প্রে করুন।'
    ],
    chemicalTreatmentEn: [
      'Spray Imidacloprid or Acetamiprid @ 0.5ml/L to control Whitefly vector.'
    ],
    preventiveMeasuresBn: [
      'বীজতলায় মশারি বা নেট ব্যবহার করে চার উৎপাদন করুন।',
      'ক্ষেত সবসময় আগাছামুক্ত রাখুন।'
    ],
    preventiveMeasuresEn: [
      'Use fine insect netting over nursery beds.',
      'Keep field strictly weed-free.'
    ],
    expertAdviceBn: 'এটি সাদা মাছিবাহিত ভাইরাস রোগ। দ্রত সাদা মাছি দমন কীটনাশক স্প্রে করুন ও আক্রান্ত ডগা কেটে ফেলুন।',
    expertAdviceEn: 'Viral infection spread by whiteflies. Apply systemic insecticide to eliminate whiteflies immediately.'
  },
  {
    id: 'd4',
    cropNameBn: 'সুস্থ ধান গাছ (Healthy Rice)',
    cropNameEn: 'Healthy Rice Plant',
    imageBase64: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    timestamp: new Date().toISOString(),
    diseaseDetected: false,
    diseaseNameBn: 'গাছ সম্পূর্ণ সুস্থ ও রোগমুক্ত (Healthy Plant)',
    diseaseNameEn: 'Healthy Rice Plant',
    confidenceScore: 98,
    severity: 'Healthy',
    symptomsBn: ['গাছের পাতা সতেজ, গাঢ় সবুজ এবং কোনো ক্ষতিকারক দাগ নেই।'],
    symptomsEn: ['Leaves are vibrant green without any spots or pest damage.'],
    organicTreatmentBn: ['নিয়মিত ট্রাইকো-কমপোস্ট ও সুষম জৈব সার প্রয়োগ অব্যাহত রাখুন।'],
    organicTreatmentEn: ['Continue organic compost application regularly.'],
    chemicalTreatmentBn: ['কোনো রাসায়নিক স্প্রে প্রয়োজন নেই।'],
    chemicalTreatmentEn: ['No chemical sprays required at this moment.'],
    preventiveMeasuresBn: ['সময়মতো সেচ ও সুষম সার প্রয়োগ সুনিশ্চিত করুন।'],
    preventiveMeasuresEn: ['Ensure timely irrigation and balanced soil nutrition.'],
    expertAdviceBn: 'অভিনন্দন! আপনার ফসল সম্পূর্ণ সুস্থ আছে। নিয়মিত পর্যবেক্ষণ চালিয়ে যান।',
    expertAdviceEn: 'Congratulations! Your crop is healthy. Keep up standard care routines.'
  }
];

export const INITIAL_CALENDAR_TASKS: CropCalendarTask[] = [
  {
    id: 't1',
    cropId: 'c1',
    cropNameBn: 'উফশী আমন ধান',
    cropNameEn: 'Amon Rice',
    dayNumber: 15,
    weekNumber: 3,
    titleBn: 'প্রথম কিস্তি ইউরিয়া সার প্রয়োগ',
    titleEn: '1st Top Dressing Urea Fertilizer',
    descriptionBn: 'বিঘা প্রতি ৭ কেজি ইউরিয়া ও ৩ কেজি এমওপি (পটাশ) সার ছিটিয়ে সেচ দিন।',
    descriptionEn: 'Apply 7kg Urea and 3kg MOP per Bigha followed by light irrigation.',
    category: 'fertilizer',
    completed: true,
    dueDate: '২০২৬-০৮-০২',
  },
  {
    id: 't2',
    cropId: 'c1',
    cropNameBn: 'উফশী আমন ধান',
    cropNameEn: 'Amon Rice',
    dayNumber: 25,
    weekNumber: 4,
    titleBn: 'আগাছা দমন ও নাড়া নিড়ানো',
    titleEn: 'Weeding & Soil Aeration',
    descriptionBn: 'ধানের জমিতে নিড়ানি দিয়ে আগাছা পরিষ্কার করুন যাতে কুশি বের হওয়া সহজ হয়।',
    descriptionEn: 'Perform weeding using hand hoe to encourage active tillering.',
    category: 'soil_prep',
    completed: false,
    dueDate: '২০২৬-০৮-১০',
    weatherWarningBn: 'আগামীকাল ভারী বৃষ্টির সম্ভাবনা! সার দেওয়ার সময় বৃষ্টি এড়িয়ে চলুন।',
    weatherWarningEn: 'Heavy rain predicted tomorrow. Delay fertilizer application until dry.',
  },
  {
    id: 't3',
    cropId: 'c1',
    cropNameBn: 'উফশী আমন ধান',
    cropNameEn: 'Amon Rice',
    dayNumber: 35,
    weekNumber: 5,
    titleBn: 'মাজরা পোকা পর্যবেক্ষণ ও আলোক ফাদ',
    titleEn: 'Stem Borer Monitoring & Light Traps',
    descriptionBn: 'ক্ষেতে লাইট ট্র্যাপ বসিয়ে মাজরা পোকার আক্রমণ পর্যবেক্ষণ করুন।',
    descriptionEn: 'Setup light traps in the evening to monitor stem borer moths.',
    category: 'pest_control',
    completed: false,
    dueDate: '২০২৬-০৮-১৮',
  },
  {
    id: 't4',
    cropId: 'c2',
    cropNameBn: 'উন্নত লাল আলু',
    cropNameEn: 'Red Potato',
    dayNumber: 10,
    weekNumber: 2,
    titleBn: 'প্রথম সেচ ও গোড়ায় মাটি তোলা',
    titleEn: 'First Irrigation & Earthing Up',
    descriptionBn: 'হালকা সেচ দিয়ে আলুর গোড়ায় মাটির ঢিবি উচু করে দিন।',
    descriptionEn: 'Provide light irrigation and ridge up soil around potato plants.',
    category: 'watering',
    completed: true,
    dueDate: '২০২৬-১১-১০',
  },
  {
    id: 't5',
    cropId: 'c2',
    cropNameBn: 'উন্নত লাল আলু',
    cropNameEn: 'Red Potato',
    dayNumber: 30,
    weekNumber: 5,
    titleBn: 'নাবি ধসা বালাইনাশক প্রতিরোধক স্প্রে',
    titleEn: 'Preventive Late Blight Spray',
    descriptionBn: 'ম্যানকোজেব (Mancozeb) ২ গ্রাম/লিটার প্রয়োগ করে নাবি ধসা প্রতিরোধ করুন।',
    descriptionEn: 'Spray Mancozeb @ 2g/L as preventive cover against Late Blight.',
    category: 'pest_control',
    completed: false,
    dueDate: '২০২৬-১২-০৫',
  },
  {
    id: 't6',
    cropId: 'c3',
    cropNameBn: 'হাইব্রিড টমেটো',
    cropNameEn: 'Hybrid Tomato',
    dayNumber: 45,
    weekNumber: 7,
    titleBn: 'টমেটোর গাছে খুঁটি দেওয়া (Staking)',
    titleEn: 'Tomato Plant Staking',
    descriptionBn: 'বাঁশের কঞ্চি বা খুঁটি গেড়ে সুতলি দিয়ে ফলবতী টমেটো গাছ শক্ত করে বাঁধুন।',
    descriptionEn: 'Erect bamboo stakes to support fruiting tomato vines.',
    category: 'soil_prep',
    completed: false,
    dueDate: '২০২৬-০৮-০৮',
  }
];

export const INITIAL_MARKET_PRICES: MarketPrice[] = [
  {
    id: 'p1',
    commodityBn: 'আমন ধান (স্বর্ণা/বিআর২৮)',
    commodityEn: 'Amon Rice Grain',
    category: 'cereal',
    pricePerMon: 1350,
    pricePerKg: 33.75,
    marketNameBn: 'মহাস্থানগড় হাট',
    marketNameEn: 'Mahasthangarh Haat',
    district: 'বগুড়া',
    trend: 'up',
    changeAmount: 50,
    lastUpdated: 'আজ সকাল ৮:০০',
  },
  {
    id: 'p2',
    commodityBn: 'দেশি আলু (কার্ডিনাল)',
    commodityEn: 'Cardinal Potato',
    category: 'vegetable',
    pricePerMon: 1120,
    pricePerKg: 28.00,
    marketNameBn: 'কারওয়ান বাজার',
    marketNameEn: 'Karwan Bazar',
    district: 'ঢাকা',
    trend: 'down',
    changeAmount: 30,
    lastUpdated: 'আজ সকাল ৯:৩০',
  },
  {
    id: 'p3',
    commodityBn: 'গ্রীষ্মকালীন লাল টমেটো',
    commodityEn: 'Fresh Tomato',
    category: 'vegetable',
    pricePerMon: 2800,
    pricePerKg: 70.00,
    marketNameBn: 'যশোর কাঁচাবাজার',
    marketNameEn: 'Jessore Market',
    district: 'যশোর',
    trend: 'up',
    changeAmount: 120,
    lastUpdated: 'আজ সকাল ৭:৪৫',
  },
  {
    id: 'p4',
    commodityBn: 'তোষা পাট',
    commodityEn: 'Tosha Jute',
    category: 'cereal',
    pricePerMon: 3200,
    pricePerKg: 80.00,
    marketNameBn: 'রংপুর বড় বাজার',
    marketNameEn: 'Rangpur Main Bazar',
    district: 'রংপুর',
    trend: 'stable',
    changeAmount: 0,
    lastUpdated: 'গতকাল',
  },
];

export const INITIAL_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'pr1',
    titleBn: 'জৈব পদ্ধতিতে চাষকৃত বিষমুক্ত আমন চাল (বিআর-২৮)',
    titleEn: 'Organic Pesticide-free Amon Rice',
    sellerName: 'মোঃ আসাদুল্লাহ',
    sellerPhone: '01711223344',
    locationBn: 'শিবগঞ্জ, বগুড়া',
    locationEn: 'Shibganj, Bogura',
    pricePerKg: 62,
    totalQuantityKg: 500,
    categoryBn: 'ধান/চাল',
    categoryEn: 'Grains',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    isVerifiedFarmer: true,
  },
  {
    id: 'pr2',
    titleBn: 'তাজা গ্রীষ্মকালীন পাকা টমেটো (সরাসরি ক্ষেত থেকে)',
    titleEn: 'Fresh Farm Summer Tomatoes',
    sellerName: 'কৃষক রাশেদ',
    sellerPhone: '01899887766',
    locationBn: 'মিঠাপুকুর, রংপুর',
    locationEn: 'Mithapukur, Rangpur',
    pricePerKg: 65,
    totalQuantityKg: 200,
    categoryBn: 'শাকসবজি',
    categoryEn: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    isVerifiedFarmer: true,
  },
];
