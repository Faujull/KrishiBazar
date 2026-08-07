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
  Clock
} from 'lucide-react';

interface NotificationItem {
  id: string;
  category: 'orders' | 'marketplace' | 'ai' | 'weather' | 'government' | 'system';
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
      id: 'n1',
      category: 'weather',
      titleBn: 'বগুড়া অঞ্চলে ভারী বৃষ্টির পূর্বাভাস!',
      titleEn: 'Heavy rain alert in Bogura region!',
      descBn: 'আগামী ২৪ ঘণ্টায় বগুড়া ও পার্শ্ববর্তী এলাকায় মাঝারি থেকে ভারী বৃষ্টির সম্ভাবনা। আলুর ক্ষেতে অতিরিক্ত পানি নিষ্কাশনের নালা তৈরি রাখুন।',
      descEn: 'Moderate to heavy rain expected in next 24h. Maintain drainage channels in potato fields.',
      time: '১০ মিনিট আগে',
      read: false,
    },
    {
      id: 'n2',
      category: 'ai',
      titleBn: 'এআই স্ক্যান রিপোর্ট প্রস্তুত',
      titleEn: 'AI Disease Report Ready',
      descBn: 'আপনার আমন ধানের পাতার নাবি ধসা রোগের প্রতিকারের জন্য ২ দিনের মধ্যে মেনকোজেব স্প্রে সম্পন্ন করুন।',
      descEn: 'Spray Mancozeb fungicide within 2 days for Rice Blast detected in your field.',
      time: '১ ঘণ্টা আগে',
      read: false,
    },
    {
      id: 'n3',
      category: 'marketplace',
      titleBn: 'আপনার তাজা আলুর অর্ডারে নতুন পাইকারি অফার!',
      titleEn: 'New offer on your Potato listing!',
      descBn: 'রাজশাহী এগ্রো ট্রেডার্স ৫০০ কেজি আলু ৫৮ টাকা দরে ক্রয়ের প্রস্তাব দিয়েছে।',
      descEn: 'Rajshahi Agro Traders requested to buy 500kg potatoes at ৳58/kg.',
      time: '৩ ঘণ্টা আগে',
      read: true,
    },
    {
      id: 'n4',
      category: 'government',
      titleBn: 'সরকারি সার ভর্তুকি মেসেজ',
      titleEn: 'Govt Fertilizer Subsidy Update',
      descBn: 'আপনার স্মার্ট কৃষক কার্ডে ইউরিয়া ও ডিএপি সারের বিএসআরআই ডিলার কোটা বরাদ্দ করা হয়েছে।',
      descEn: 'Urea and DAP dealer quota allocated for your Krishok Card.',
      time: 'গতকাল',
      read: true,
    },
    {
      id: 'n5',
      category: 'orders',
      titleBn: 'অর্ডার নং #KB-9042 নিশ্চিত করা হয়েছে',
      titleEn: 'Order #KB-9042 Confirmed',
      descBn: 'আপনার সার ও বালাইনাশক অর্ডারটি পরিবহনের জন্য নির্ধারিত হয়েছে।',
      descEn: 'Your organic pesticide order is dispatched for delivery.',
      time: '২ দিন আগে',
      read: true,
    },
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
      case 'ai':
        return <Sparkles className="w-4 h-4 text-[#2E7D32]" />;
      case 'marketplace':
      case 'orders':
        return <ShoppingBag className="w-4 h-4 text-[#F9A825]" />;
      case 'government':
        return <Building2 className="w-4 h-4 text-emerald-800" />;
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
          { id: 'weather', labelBn: 'আবহাওয়া', labelEn: 'Weather' },
          { id: 'ai', labelBn: 'এআই এলার্ট', labelEn: 'AI Alerts' },
          { id: 'marketplace', labelBn: 'মার্কেট', labelEn: 'Market' },
          { id: 'government', labelBn: 'সরকারি', labelEn: 'Govt' },
          { id: 'orders', labelBn: 'অর্ডার', labelEn: 'Orders' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full border transition-all ${
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
