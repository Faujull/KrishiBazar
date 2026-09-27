import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  Trash2,
  CloudRain,
  ShoppingBag,
  Sparkles,
  Building2,
  Info,
  ChevronRight,
  X,
  Clock,
  Droplets,
  CalendarDays,
  ShieldAlert,
  TrendingUp
} from 'lucide-react';

interface NotificationItem {
  id: string;
  category: 'weather' | 'irrigation' | 'crop_stage' | 'disease' | 'price' | 'orders';
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  time: string;
  read: boolean;
}

export const NotificationsPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<string>('all');
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-rain',
      category: 'weather',
      titleBn: '🌧️ বৃষ্টি সতর্কতা: বগুড়া অঞ্চলে ভারী বৃষ্টির পূর্বাভাস',
      titleEn: '🌧️ Rain Alert: Heavy Rain Expected in Bogura',
      descBn: 'ওপেন-মেটিও লাইভ পূর্বাভাস অনুযায়ী আগামী ২৪ ঘণ্টায় বগুড়া সদর ও শিবগঞ্জ এলাকায় ১৫ মিমি পর্যন্ত বৃষ্টিপাতের সম্ভাবনা। আলুর জমিতে ড্রেনেজ নালা কেটে পানি নিষ্কাশন নিশ্চিত রাখুন।',
      descEn: 'Open-Meteo forecast indicates up to 15mm precipitation in next 24h. Ensure open furrow drainage to protect root zones.',
      time: '১০ মিনিট আগে',
      read: false,
    },
    {
      id: 'n-irrigation',
      category: 'irrigation',
      titleBn: '💧 সেচ সতর্কতা: কুশি গজানো ধাপে AWD সেচ পর্যবেক্ষণ',
      titleEn: '💧 Irrigation Alert: AWD Monitoring at Tillering Stage',
      descBn: 'আমন ধানের কুশি গজানো ৩০তম দিনে জমিতে ২-৩ সেমি পাতলা পানি বজায় রাখুন। বৃষ্টির সম্ভাবনা না থাকলে বিকেলে হালকা সেচ দিন।',
      descEn: 'Maintain 2-3 cm standing water during day 30 of tillering. If no rain occurs, schedule light AWD evening irrigation.',
      time: '৪৫ মিনিট আগে',
      read: false,
    },
    {
      id: 'n-stage',
      category: 'crop_stage',
      titleBn: '🌾 ফসল পর্যায় সতর্কতা: কুশি গজানো পর্যায় সমাপ্তির পথে',
      titleEn: '🌾 Crop-Stage Alert: Transitioning to Booting & Heading',
      descBn: 'আপনার বিআর-২৮ আমন ধান কুশি গজানো ধাপের শেষ প্রান্তে রয়েছে। আগামী ১০ দিনের মধ্যে ফুল ও শীষ বের হওয়া শুরু হবে। ইউরিয়ার শেষ কিস্তি উপরিপ্রয়োগ করুন।',
      descEn: 'Your BR-28 Amon paddy is completing the tillering cycle. Heading begins in ~10 days. Apply final top-dressing Urea.',
      time: '২ ঘণ্টা আগে',
      read: false,
    },
    {
      id: 'n-disease',
      category: 'disease',
      titleBn: '🛡️ রোগ ঝুঁকি সতর্কতা: আর্দ্র আবহাওয়ায় নাবি ধসার উচ্চ ঝুঁকি',
      titleEn: '🛡️ Disease-Risk Alert: Late Blight Threat from High Humidity',
      descBn: 'বাতাসের আর্দ্রতা ৮২% অতিক্রম করায় আলুর নাবি ধসা ও ধানের পাতা ব্লাস্ট ছত্রাকের স্পোর ছড়ানোর ঝুঁকি রয়েছে। আজই এআই রোগ স্ক্যান সম্পন্ন করুন।',
      descEn: 'Relative humidity exceeds 82%, elevating late blight and leaf blast spore growth. Run an AI Leaf Disease Scan today.',
      time: '৪ ঘণ্টা আগে',
      read: true,
    },
    {
      id: 'n-price',
      category: 'price',
      titleBn: '📈 বাজার দর সতর্কতা: মহাস্থান আড়তে আলুর দর বৃদ্ধি',
      titleEn: '📈 Market-Price Alert: Potato Price Up at Mahasthangarh',
      descBn: 'আজ মহাস্থান ও শিবগঞ্জ পাইকারি বাজারে লাল আলুর দর কেজি প্রতি ৪ টাকা বেড়ে ৩৮ টাকায় লেনদেন হচ্ছে। মজুত ফসল বিক্রির উত্তম সময়।',
      descEn: 'Red Potato wholesale price increased by ৳4/kg to ৳38/kg at Mahasthan Arat today. Ideal window to publish produce listing.',
      time: 'গতকাল',
      read: true,
    },
    {
      id: 'n-order',
      category: 'orders',
      titleBn: '📦 নতুন পাইকারি অর্ডার: হাজী কাশেম আড়ত থেকে ৫০০ কেজি আলু',
      titleEn: '📦 Order Notification: 500kg Potato from Haji Kashem Arat',
      descBn: 'হাজী কাশেম পাইকারি আড়ত আপনার তাজা কার্ডিনাল লাল আলুর বিজ্ঞাপনে ৳১৬,০০০ মূল্যের ৫০০ কেজি অর্ডার নিশ্চিত করেছে। বিস্তারিত দেখে ডেলিভারি কনফার্ম করুন।',
      descEn: 'Haji Kashem Wholesale Arat placed an order for 500kg Cardinal Potato worth ৳16,000. View details and dispatch shipment.',
      time: 'গতকাল',
      read: true,
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    if (selectedNotif?.id === id) setSelectedNotif(null);
  };

  const filteredNotifs = filter === 'all'
    ? notifications
    : notifications.filter((n) => n.category === filter);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weather':
        return <CloudRain className="w-4 h-4 text-blue-600" />;
      case 'irrigation':
        return <Droplets className="w-4 h-4 text-cyan-600" />;
      case 'crop_stage':
        return <CalendarDays className="w-4 h-4 text-emerald-600" />;
      case 'disease':
        return <ShieldAlert className="w-4 h-4 text-amber-600" />;
      case 'price':
        return <TrendingUp className="w-4 h-4 text-green-700" />;
      case 'orders':
        return <ShoppingBag className="w-4 h-4 text-[#F9A825]" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
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
        <div className="flex items-center gap-1.5">
          <h2 className="font-extrabold text-base text-gray-900">
            {language === 'bn' ? 'নোটিফিকেশন সমুহ' : 'Notifications'}
          </h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white font-extrabold text-[10px] px-1.5 py-0.2 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={markAllRead}
          className="text-xs font-bold text-[#2E7D32] hover:underline flex items-center gap-1"
          title="Mark all read"
        >
          <CheckCheck className="w-4 h-4" />
        </button>
      </div>

      {/* Category Horizontal Filter */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs font-bold">
        {[
          { id: 'all', labelBn: 'সকল', labelEn: 'All' },
          { id: 'weather', labelBn: '🌧️ বৃষ্টি', labelEn: 'Rain' },
          { id: 'irrigation', labelBn: '💧 সেচ', labelEn: 'Irrigation' },
          { id: 'crop_stage', labelBn: '🌾 ফসল পর্যায়', labelEn: 'Stage' },
          { id: 'disease', labelBn: '🛡️ রোগ ঝুঁকি', labelEn: 'Disease' },
          { id: 'price', labelBn: '📈 বাজার দর', labelEn: 'Price' },
          { id: 'orders', labelBn: '📦 অর্ডার', labelEn: 'Orders' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full border transition-all text-[11px] ${
              filter === tab.id
                ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-xs'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {language === 'bn' ? tab.labelBn : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Notification Items List */}
      <div className="space-y-2.5">
        {filteredNotifs.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center space-y-2">
            <Bell className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="text-xs font-bold text-gray-500">
              {language === 'bn' ? 'কোন নোটিফিকেশন পাওয়া যায়নি' : 'No notifications found'}
            </p>
          </div>
        ) : (
          filteredNotifs.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setNotifications(
                  notifications.map((n) => (n.id === item.id ? { ...n, read: true } : n))
                );
                setSelectedNotif(item);
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                item.read
                  ? 'bg-white border-gray-100 shadow-xs'
                  : 'bg-green-50/60 border-green-200 shadow-sm ring-1 ring-green-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 shadow-xs flex items-center justify-center shrink-0">
                  {getCategoryIcon(item.category)}
                </div>

                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="font-extrabold text-gray-900 truncate">
                      {language === 'bn' ? item.titleBn : item.titleEn}
                    </h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                    )}
                  </div>

                  <p className="text-gray-600 line-clamp-2 text-[11px]">
                    {language === 'bn' ? item.descBn : item.descEn}
                  </p>

                  <span className="text-[10px] text-gray-400 mt-1 block font-medium">
                    {item.time}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedNotif && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-4 text-xs">
            <div className="flex items-start justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  {getCategoryIcon(selectedNotif.category)}
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900">
                    {language === 'bn' ? selectedNotif.titleBn : selectedNotif.titleEn}
                  </h4>
                  <span className="text-[10px] text-gray-400">{selectedNotif.time}</span>
                </div>
              </div>

              <button onClick={() => setSelectedNotif(null)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <p className="text-gray-700 leading-relaxed text-xs">
              {language === 'bn' ? selectedNotif.descBn : selectedNotif.descEn}
            </p>

            <div className="flex gap-2 pt-2 border-t">
              <button
                onClick={() => deleteNotification(selectedNotif.id)}
                className="px-3 py-2 rounded-xl bg-red-50 text-red-600 font-bold flex items-center gap-1 text-xs"
              >
                <Trash2 className="w-4 h-4" />
                <span>{language === 'bn' ? 'মুছে ফেলুন' : 'Delete'}</span>
              </button>

              <button
                onClick={() => setSelectedNotif(null)}
                className="flex-1 bg-[#2E7D32] text-white font-bold py-2 rounded-xl"
              >
                {language === 'bn' ? 'ঠিক আছে' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
