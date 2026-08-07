import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { MarketplaceProduct } from '../types';
import {
  Store,
  Plus,
  MapPin,
  Phone,
  CheckCircle2,
  Search,
  X,
  ChevronRight,
  ShieldCheck,
  Package,
  Calendar,
  Share2
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<MarketplaceProduct[]>(INITIAL_PRODUCTS);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // New product form
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('60');
  const [quantity, setQuantity] = useState('300');
  const [phone, setPhone] = useState('01712345678');
  const [location, setLocation] = useState('শিবগঞ্জ, বগুড়া');

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProd: MarketplaceProduct = {
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
    setIsSellModalOpen(false);
    setTitle('');
    alert(
      language === 'bn'
        ? 'আপনার ফসল বিক্রয়ের পোস্ট প্রকাশ করা হয়েছে!'
        : 'Product listed successfully on Marketplace!'
    );
  };

  const filteredProducts = products.filter(
    (p) =>
      p.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.locationBn.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              {language === 'bn'
                ? 'সরাসরি কৃষকের ক্ষেত থেকে পাইকারি ক্রয়-বিক্রয়'
                : 'Direct farm produce buy & sell portal'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSellModalOpen(true)}
          className="bg-[#F9A825] hover:bg-yellow-500 text-gray-900 px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-md active:scale-95 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'bn' ? 'ফসল বিক্রি' : 'Sell Produce'}</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            language === 'bn' ? 'ফসল বা এলাকা সার্চ করুন...' : 'Search crop or location...'
          }
          className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-xs font-medium"
        />
      </div>

      {/* Product Cards List */}
      <div className="space-y-4">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedProduct(item)}
            className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="relative h-44">
              <img
                src={item.imageUrl}
                alt={item.titleBn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 bg-[#2E7D32] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                <CheckCircle2 className="w-3 h-3 text-[#F9A825]" />
                <span>{language === 'bn' ? 'যাচাইকৃত কৃষক' : 'Verified Farmer'}</span>
              </div>

              <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white text-[10px] font-black px-2.5 py-0.5 rounded-lg backdrop-blur-xs">
                {language === 'bn' ? `স্টক: ${item.totalQuantityKg} কেজি` : `Stock: ${item.totalQuantityKg} kg`}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-extrabold text-sm text-gray-900 leading-snug group-hover:text-[#2E7D32] transition-colors">
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>{language === 'bn' ? item.locationBn : item.locationEn}</span>
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">
                    {language === 'bn' ? 'পাইকারি প্রতি কেজি' : 'Wholesale Price'}
                  </span>
                  <span className="text-base font-black text-[#2E7D32]">
                    ৳ {item.pricePerKg}{' '}
                    <span className="text-xs font-normal text-gray-500">/ কেজি</span>
                  </span>
                </div>

                <a
                  href={`tel:${item.sellerPhone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#2E7D32] hover:bg-green-800 text-white px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F9A825]" />
                  <span>{language === 'bn' ? 'কল করুন' : 'Call Seller'}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md h-[85vh] sm:h-auto rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                <Store className="w-4 h-4 text-[#2E7D32]" />
                <span>{language === 'bn' ? 'ফসল বিক্রয় বিবরণ' : 'Product Details'}</span>
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-48 rounded-2xl overflow-hidden border">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.titleBn}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#2E7D32] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-4 h-4 text-[#F9A825]" />
                <span>{language === 'bn' ? 'যাচাইকৃত কৃষক' : 'Verified Farmer'}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h2 className="text-base font-extrabold text-gray-900">
                  {language === 'bn' ? selectedProduct.titleBn : selectedProduct.titleEn}
                </h2>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>{language === 'bn' ? selectedProduct.locationBn : selectedProduct.locationEn}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-green-50/60 p-3 rounded-2xl border border-green-100">
                <div>
                  <span className="text-[10px] text-gray-500 block font-bold">
                    {language === 'bn' ? 'দাম (প্রতি কেজি)' : 'Price per kg'}
                  </span>
                  <span className="text-base font-black text-[#2E7D32]">
                    ৳ {selectedProduct.pricePerKg}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block font-bold">
                    {language === 'bn' ? 'মোট মজুদ পরিমাণ' : 'Available Stock'}
                  </span>
                  <span className="text-base font-black text-gray-900">
                    {selectedProduct.totalQuantityKg} কেজি
                  </span>
                </div>
              </div>

              {/* Seller details card */}
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  {language === 'bn' ? 'কৃষকের তথ্য' : 'Farmer / Seller Info'}
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm">{selectedProduct.sellerName}</h4>
                    <p className="text-[10px] text-emerald-700 font-bold">✓ স্মার্ট কৃষক আইডি যাচাইকৃত</p>
                  </div>
                  <a
                    href={`tel:${selectedProduct.sellerPhone}`}
                    className="bg-[#2E7D32] hover:bg-green-800 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#F9A825]" />
                    <span>{language === 'bn' ? 'কল দিন' : 'Call Seller'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sell Product Modal */}
      {isSellModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                <Store className="w-4 h-4 text-[#2E7D32]" />
                <span>{language === 'bn' ? 'ফসল বিক্রির পোস্ট তৈরি করুন' : 'List Farm Produce for Sale'}</span>
              </h3>
              <button
                onClick={() => setIsSellModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSellSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">
                  {language === 'bn' ? 'ফসলের শিরোনাম *' : 'Crop Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: তাজা লাল আলু ৩০০ কেজি' : 'e.g. Fresh Red Granola Potato 300kg'}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 block">
                    {language === 'bn' ? 'দাম (টাকা / কেজি) *' : 'Price (৳ / kg) *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 block">
                    {language === 'bn' ? 'মোট পরিমাণ (কেজি) *' : 'Total Quantity (kg) *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">
                  {language === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">
                  {language === 'bn' ? 'ঠিকানা / স্থান *' : 'Location *'}
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2E7D32] text-white font-extrabold py-3 rounded-xl shadow-md active:scale-98 transition-all"
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
