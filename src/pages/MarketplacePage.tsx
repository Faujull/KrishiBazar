import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { Store, Plus, MapPin, Phone, CheckCircle2, Search, X } from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New product form
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('60');
  const [quantity, setQuantity] = useState('300');
  const [phone, setPhone] = useState('01712345678');
  const [location, setLocation] = useState('শিবগঞ্জ, বগুড়া');

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProd = {
      id: Date.now().toString(),
      titleBn: title,
      titleEn: title,
      sellerName: 'মোঃ রফিকুল ইসলাম',
      sellerPhone: phone,
      locationBn: location,
      locationEn: location,
      pricePerKg: Number(price),
      totalQuantityKg: Number(quantity),
      categoryBn: 'ফসল',
      categoryEn: 'Crops',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      isVerifiedFarmer: true,
    };

    setProducts([newProd, ...products]);
    setIsModalOpen(false);
    setTitle('');
    alert(language === 'bn' ? 'আপনার ফসল বিক্রয়ের পোস্ট প্রকাশ করা হয়েছে!' : 'Product listed successfully on Marketplace!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Header Banner */}
      <div className="bg-[#2E7D32] text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Store className="w-6 h-6 text-[#F9A825]" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold">{t('navMarketplace')}</h2>
            <p className="text-[11px] text-green-100">
              {language === 'bn' ? 'সরাসরি কৃষকের ক্ষেত থেকে পাইকারি ক্রয়-বিক্রয়' : 'Direct farm produce buy & sell portal'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#F9A825] hover:bg-yellow-500 text-gray-900 px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-md active:scale-95 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'bn' ? 'ফসল বিক্রি করুন' : 'Sell Produce'}</span>
        </button>
      </div>

      {/* Product Cards List */}
      <div className="space-y-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden"
          >
            <div className="relative h-40">
              <img
                src={item.imageUrl}
                alt={item.titleBn}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-[#2E7D32] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                <CheckCircle2 className="w-3 h-3 text-[#F9A825]" />
                <span>{language === 'bn' ? 'যাচাইকৃত কৃষক' : 'Verified Farmer'}</span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-sm text-gray-900 leading-snug">
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>{language === 'bn' ? item.locationBn : item.locationEn}</span>
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-500 block">
                    {language === 'bn' ? `পরিমাণ: ${item.totalQuantityKg} কেজি` : `Stock: ${item.totalQuantityKg} kg`}
                  </span>
                  <span className="text-base font-black text-[#2E7D32]">
                    ৳ {item.pricePerKg} <span className="text-xs font-normal text-gray-500">/ কেজি</span>
                  </span>
                </div>

                <a
                  href={`tel:${item.sellerPhone}`}
                  className="bg-[#2E7D32] hover:bg-green-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F9A825]" />
                  <span>{language === 'bn' ? 'কল করুন' : 'Call Seller'}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sell Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Store className="w-4 h-4 text-[#2E7D32]" />
                <span>{language === 'bn' ? 'ফসল বিক্রির পোস্ট তৈরি করুন' : 'List Farm Produce for Sale'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSellSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">ফসলের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: তাজা লাল আলু ৩০০ কেজি"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">দাম (টাকা / কেজি) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">মোট পরিমাণ (কেজি) *</label>
                  <input
                    type="number"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">ঠিকানা / স্থান *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2E7D32] text-white font-bold py-3 rounded-xl shadow-md active:scale-98 transition-all"
              >
                {language === 'bn' ? 'পোস্ট জমা দিন' : 'Publish Produce Listing'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
