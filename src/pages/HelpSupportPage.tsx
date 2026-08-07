import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  HelpCircle,
  PhoneCall,
  Video,
  BookOpen,
  AlertTriangle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Play,
  Send,
  Phone,
  CheckCircle2
} from 'lucide-react';

export const HelpSupportPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'videos' | 'feedback'>('faq');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Feedback form state
  const [feedbackCategory, setFeedbackCategory] = useState('bug');
  const [feedbackText, setFeedbackText] = useState('');
  const [contactPhone, setContactPhone] = useState('01712345678');

  const faqs = [
    {
      qBn: 'কীভাবে এআই দিয়ে ফসলের পাতা রোগ স্ক্যান করব?',
      qEn: 'How to scan crop leaf disease with AI?',
      aBn: 'রোগ সনাক্তকরণ পেজে যান, এরপর ক্যামেরা দিয়ে অথবা ফোনের গ্যালারি থেকে আক্রান্ত পাতার একটি স্পষ্ট ছবি আপলোড করুন। এআই ৩ সেকেন্ডের মধ্যে রোগ ও সঠিক ওষুধ বলে দেবে।',
      aEn: 'Go to the AI Scan page, capture or upload a clear leaf photo. AI will detect disease and prescribe chemical/organic remedies in 3 seconds.',
    },
    {
      qBn: 'কৃষক কার্ড কী এবং কীভাবে সংগ্রহ করব?',
      qEn: 'What is Krishok Card & how to get it?',
      aBn: 'কৃষক কার্ড হলো সরকারি কৃষি দপ্তর অনুমোদিত কৃষকের ডিজিটাল পরিচয়পত্র। অ্যাপের ভেরিফিকেশন সেকশন থেকে আপনার জাতীয় পরিচয়পত্র ও জমির খতিয়ান আপলোড করে ফ্রিতে স্মার্ট কার্ড আবেদন করতে পারবেন।',
      aEn: 'Krishok Card is a digital farmer ID card. Upload your NID and land documents in the Verification section to request your card for free.',
    },
    {
      qBn: 'কৃষিবাজারে কীভাবে বিনা খরচে ফসল বিক্রি করব?',
      qEn: 'How to sell crop produce without middleman fee?',
      aBn: 'বাজার পেজে গিয়ে "ফসল বিক্রি করুন" বাটনে চাপ দিয়ে আপনার ফসলের বিবরণ, পরিমাণ, কেজি প্রতি দাম ও ফোন নম্বর দিন। ক্রেতারা সরাসরি আপনাকে কল করবে।',
      aEn: 'Navigate to Market tab, tap "Sell Produce", fill crop details, price per kg, and contact number. Buyers will call you directly.',
    },
    {
      qBn: 'ফসল ক্যালেন্ডারে কীভাবে নোটিফিকেশন স্প্রে রিমাইন্ডার সেট করব?',
      qEn: 'How to set crop spray alerts in Calendar?',
      aBn: 'রোগ সনাক্তকরণ পেজ থেকে স্ক্যান করার পর "ক্যালেন্ডারে রিমাইন্ডার যুক্ত করুন" বাটনে চাপ দিলেই স্বয়ংক্রিয়ভাবে স্প্রে করার তারার অ্যালার্ম যুক্ত হয়ে যাবে।',
      aEn: 'After scanning a diseased crop, tap "Add Spray Reminder to Calendar" to automatically schedule spray alerts on exact dates.',
    },
  ];

  const tutorialVideos = [
    {
      id: 'v1',
      titleBn: 'এআই ক্যামেরা দিয়ে ৩ সেকেন্ডে ফসলের রোগ সনাক্ত করার টিউটোরিয়াল',
      titleEn: 'Tutorial: Scan crop diseases in 3s using AI camera',
      duration: '02:15',
      thumbnail: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a2f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'v2',
      titleBn: 'কৃষিবাজারে কীভাবে ফসলের সঠিক পাইকারি দাম পাবেন?',
      titleEn: 'How to get best wholesale price for crops on KrishiBazar',
      duration: '03:40',
      thumbnail: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'v3',
      titleBn: 'বপন থেকে ফসল কাটা: ধান ও আলু চাষের সময়সূচী নির্দেশিকা',
      titleEn: 'Rice & Potato sowing to harvest crop calendar guide',
      duration: '04:10',
      thumbnail: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    alert(language === 'bn' ? 'আপনার মতামত আমাদের নিকট পৌঁছেছে। ধন্যবাদ!' : 'Thank you! Your feedback has been sent to support team.');
    setFeedbackText('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs">
        <button
          onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-extrabold text-base text-gray-900">
          {language === 'bn' ? 'সাহায্য ও সাপোর্ট সেন্টার' : 'Help & Support'}
        </h2>
        <div className="w-9 h-9"></div>
      </div>

      {/* Emergency Hotline Hero Card */}
      <div className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-[#F9A825] tracking-wide block">
            {language === 'bn' ? 'জরুরি কৃষি হটলাইন' : 'Emergency Agri Hotline'}
          </span>
          <h3 className="text-xl font-black">১৬১২৩ / ৩৩৩</h3>
          <p className="text-[11px] text-green-100 mt-0.5">
            {language === 'bn' ? 'সরাসরি সরকারি কৃষি কর্মকর্তার সাথে কথা বলুন' : 'Direct Call to Agriculture Officers'}
          </p>
        </div>

        <a
          href="tel:16123"
          className="bg-[#F9A825] hover:bg-yellow-500 text-gray-900 px-3.5 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4" />
          <span>{language === 'bn' ? 'কল করুন' : 'Call Now'}</span>
        </a>
      </div>

      {/* Segment Tabs */}
      <div className="flex bg-gray-200/70 p-1 rounded-2xl text-xs font-bold gap-1">
        <button
          onClick={() => setActiveTab('faq')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'faq' ? 'bg-white text-[#2E7D32] shadow-xs font-extrabold' : 'text-gray-600'
          }`}
        >
          {language === 'bn' ? 'সাধারণ প্রশ্ন (FAQ)' : 'FAQ'}
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'videos' ? 'bg-white text-[#2E7D32] shadow-xs font-extrabold' : 'text-gray-600'
          }`}
        >
          {language === 'bn' ? 'টিউটোরিয়াল' : 'Videos'}
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'contact' ? 'bg-white text-[#2E7D32] shadow-xs font-extrabold' : 'text-gray-600'
          }`}
        >
          {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'feedback' ? 'bg-white text-[#2E7D32] shadow-xs font-extrabold' : 'text-gray-600'
          }`}
        >
          {language === 'bn' ? 'মতামত' : 'Feedback'}
        </button>
      </div>

      {/* Tab Content 1: FAQ Accordions */}
      {activeTab === 'faq' && (
        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-gray-900 gap-2"
                >
                  <span className="flex-1">{language === 'bn' ? faq.qBn : faq.qEn}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-gray-600 border-t border-gray-100 bg-green-50/30 leading-relaxed">
                    {language === 'bn' ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content 2: Video Tutorials */}
      {activeTab === 'videos' && (
        <div className="space-y-3">
          {tutorialVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => alert(language === 'bn' ? 'ভিডিও টিউটোরিয়াল শীঘ্রই প্লে হচ্ছে...' : 'Playing video tutorial...')}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden cursor-pointer group hover:border-green-300 transition-all"
            >
              <div className="relative h-36">
                <img
                  src={vid.thumbnail}
                  alt={vid.titleBn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#2E7D32] text-white flex items-center justify-center shadow-2xl ring-4 ring-white/50 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {vid.duration}
                </span>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-xs text-gray-900 line-clamp-2">
                  {language === 'bn' ? vid.titleBn : vid.titleEn}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 3: Contact Channels */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 space-y-3 text-xs">
          <h3 className="font-extrabold text-sm text-gray-900 mb-2">
            {language === 'bn' ? 'কৃষি পরামর্শ ও সহায়তা ডেস্ক' : 'Agri Support Contacts'}
          </h3>

          <a
            href="tel:16123"
            className="p-3 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-gray-900 block">কৃষি কল সেন্টার (16123)</span>
                <span className="text-[10px] text-gray-500">প্রতিদিন সকাল ৯টা - বিকাল ৫টা (টোল ফ্রি)</span>
              </div>
            </div>
            <span className="bg-[#2E7D32] text-white px-3 py-1 rounded-xl text-[10px] font-bold">Call</span>
          </a>

          <a
            href="tel:333"
            className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F9A825] text-gray-900 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-gray-900 block">জাতীয় তথ্য সেবা (333)</span>
                <span className="text-[10px] text-gray-500">২৪ ঘণ্টা সরকারি কৃষি কর্মকর্তা সার্ভিস</span>
              </div>
            </div>
            <span className="bg-gray-900 text-white px-3 py-1 rounded-xl text-[10px] font-bold">Call</span>
          </a>

          <div className="pt-2">
            <h4 className="font-bold text-gray-800 mb-1">{language === 'bn' ? 'অফিসিয়ালের ইমেইল support' : 'Official Support Email'}</h4>
            <p className="text-gray-500 text-[11px]">support@krishibazar.gov.bd</p>
          </div>
        </div>
      )}

      {/* Tab Content 4: Feedback & Problem Report */}
      {activeTab === 'feedback' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-4 space-y-3 text-xs">
          <h3 className="font-bold text-sm text-gray-900">
            {language === 'bn' ? 'সমস্যা রিপোর্ট বা মতামত প্রদান' : 'Report Issue or Give Feedback'}
          </h3>

          <form onSubmit={handleFeedbackSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">ক্যাটাগরি</label>
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                className="w-full bg-gray-50 border rounded-xl p-2.5 text-xs font-semibold focus:ring-2 focus:ring-[#2E7D32]"
              >
                <option value="bug">অ্যাপে প্রযুক্তিগত সমস্যা</option>
                <option value="feature">নতুন ফিচার সংক্রান্ত প্রস্তাবনা</option>
                <option value="market">বাজার দর সম্পর্কিত মতামত</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">আপনার মোবাইল নম্বর</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-gray-50 border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#2E7D32]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">বিস্তারিত লিখুন *</label>
              <textarea
                rows={4}
                required
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="এখানে আপনার মতামত বা সমস্যার বিবরণ লিখুন..."
                className="w-full bg-gray-50 border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-[#2E7D32]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2E7D32] hover:bg-green-800 text-white font-extrabold py-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'bn' ? 'মতামত পাঠান' : 'Send Feedback'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
