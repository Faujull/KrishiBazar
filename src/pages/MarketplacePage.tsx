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
  Share2,
  ShoppingBag,
  Clock,
  Truck,
  Check,
  Tag,
  AlertCircle
} from 'lucide-react';

export interface FarmerProduceListing extends MarketplaceProduct {
  status: 'active' | 'sold' | 'pending';
  harvestDate?: string;
  viewsCount?: number;
  inquiriesCount?: number;
  publishedDate?: string;
}

export interface ReceivedOrder {
  id: string;
  orderNumber: string;
  buyerName: string;
  buyerPhone: string;
  cropName: string;
  quantityKg: number;
  totalPrice: number;
  status: 'processing' | 'shipped' | 'delivered';
  orderDate: string;
  deliveryAddress: string;
}

export const MarketplacePage: React.FC = () => {
  const { language, t } = useLanguage();
  const isBn = language === 'bn';

  // Navigation tab: 'all' | 'my_listings' | 'orders'
  const [activeTab, setActiveTab] = useState<'all' | 'my_listings' | 'orders'>('all');

  const [products, setProducts] = useState<MarketplaceProduct[]>(INITIAL_PRODUCTS);
  const [myListings, setMyListings] = useState<FarmerProduceListing[]>([
    {
      id: 'ml-1',
      titleBn: 'উন্নত কার্ডিনাল লাল আলু (সরাসরি ক্ষেত থেকে)',
      titleEn: 'Cardinal Red Potato (Direct Farm Fresh)',
      sellerName: 'মোঃ রফিকুল ইসলাম',
      sellerPhone: '01711223344',
      locationBn: 'মহাস্থান, শিবগঞ্জ, বগুড়া',
      locationEn: 'Mahasthangarh, Shibganj, Bogura',
      pricePerKg: 32,
      totalQuantityKg: 1200,
      categoryBn: 'শাকসবজি',
      categoryEn: 'Vegetables',
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
      isVerifiedFarmer: true,
      status: 'active',
      harvestDate: '২০২৬-১১-১৫',
      viewsCount: 142,
      inquiriesCount: 6,
      publishedDate: '৩ দিন আগে'
    },
    {
      id: 'ml-2',
      titleBn: 'উফশী আমন চাল / ধান (বিআর-২৮)',
      titleEn: 'HYV Amon Rice / Paddy (BR-28)',
      sellerName: 'মোঃ রফিকুল ইসলাম',
      sellerPhone: '01711223344',
      locationBn: 'শিবগঞ্জ, বগুড়া',
      locationEn: 'Shibganj, Bogura',
      pricePerKg: 38,
      totalQuantityKg: 800,
      categoryBn: 'দানা শস্য',
      categoryEn: 'Grains',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      isVerifiedFarmer: true,
      status: 'pending',
      harvestDate: '২০২৬-১০-২০',
      viewsCount: 68,
      inquiriesCount: 2,
      publishedDate: 'গতকাল'
    }
  ]);

  const [receivedOrders, setReceivedOrders] = useState<ReceivedOrder[]>([
    {
      id: 'ro-1',
      orderNumber: 'ORD-8821',
      buyerName: 'হাজী কাশেম পাইকারি আড়ত',
      buyerPhone: '01812345678',
      cropName: isBn ? 'কার্ডিনাল লাল আলু' : 'Cardinal Red Potato',
      quantityKg: 500,
      totalPrice: 16000,
      status: 'processing',
      orderDate: 'আজ সকাল ১০:১৫',
      deliveryAddress: 'কারওয়ান বাজার ঢাকা আড়ত নং ১২'
    },
    {
      id: 'ro-2',
      orderNumber: 'ORD-8794',
      buyerName: 'মেসার্স উত্তরা এগ্রো ট্রেডার্স',
      buyerPhone: '01911223344',
      cropName: isBn ? 'আমন ধান (বিআর-২৮)' : 'Amon Rice Grain (BR-28)',
      quantityKg: 800,
      totalPrice: 30400,
      status: 'shipped',
      orderDate: 'গতকাল',
      deliveryAddress: 'মহাস্থান পাইকারি বাজার, বগুড়া'
    }
  ]);

  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // New Produce Form State
  const [selectedCrop, setSelectedCrop] = useState('আলু (Potato)');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('35');
  const [quantity, setQuantity] = useState('500');
  const [harvestDate, setHarvestDate] = useState('2026-11-20');
  const [phone, setPhone] = useState('01711223344');
  const [location, setLocation] = useState('শিবগঞ্জ, বগুড়া');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = title.trim() || `${selectedCrop} (${quantity} কেজি)`;

    const newListing: FarmerProduceListing = {
      id: Date.now().toString(),
      titleBn: finalTitle,
      titleEn: finalTitle,
      sellerName: 'মোঃ রফিকুল ইসলাম',
      sellerPhone: phone,
      locationBn: location,
      locationEn: location,
      pricePerKg: Number(price),
      totalQuantityKg: Number(quantity),
      categoryBn: 'কৃষি ফসল',
      categoryEn: 'Crops',
      imageUrl: selectedCrop.includes('আলু')
        ? 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80'
        : selectedCrop.includes('টমেটো')
        ? 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      isVerifiedFarmer: true,
      status: 'active',
      harvestDate: harvestDate,
      viewsCount: 1,
      inquiriesCount: 0,
      publishedDate: isBn ? 'এইমাত্র' : 'Just now'
    };

    setMyListings([newListing, ...myListings]);
    setProducts([newListing, ...products]);
    setIsSellModalOpen(false);
    setTitle('');
    setActiveTab('my_listings');
    showToast(isBn ? 'আপনার ফসল বিক্রয়ের পোস্ট সফলভাবে প্রকাশ হয়েছে!' : 'Produce listing published successfully!');
  };

  const handleToggleSoldStatus = (listingId: string) => {
    setMyListings(
      myListings.map((l) =>
        l.id === listingId ? { ...l, status: l.status === 'sold' ? 'active' : 'sold' } : l
      )
    );
    showToast(isBn ? 'লিস্টিং স্ট্যাটাস আপডেট করা হয়েছে!' : 'Listing status updated!');
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: 'processing' | 'shipped' | 'delivered') => {
    setReceivedOrders(
      receivedOrders.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
    showToast(isBn ? 'অর্ডার স্ট্যাটাস সফলভাবে আপডেট হয়েছে!' : 'Order status updated!');
  };

  const filteredProducts = products.filter(
    (p) =>
      p.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.locationBn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-28 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2E7D32] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#F9A825]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#2E7D32] text-white p-4.5 rounded-3xl shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shadow-inner">
            <Store className="w-6 h-6 text-[#F9A825]" />
          </div>
          <div>
            <h2 className="text-base font-extrabold">{t('navMarketplace')}</h2>
            <p className="text-[11px] text-green-100">
              {isBn
                ? 'সরাসরি কৃষকের ক্ষেত থেকে পাইকারি ক্রয়-বিক্রয়'
                : 'Direct farm produce wholesale marketplace'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSellModalOpen(true)}
          className="bg-[#F9A825] hover:bg-yellow-500 text-gray-900 px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isBn ? 'ফসল বিক্রি' : 'Sell Produce'}</span>
        </button>
      </div>

      {/* 3 Main Tabs: All Produce / My Listings / Received Orders */}
      <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1 rounded-2xl text-center text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`py-2 px-1 rounded-xl transition-all ${
            activeTab === 'all'
              ? 'bg-white text-[#2E7D32] shadow-xs font-extrabold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {isBn ? 'সকল ফসল' : 'All Produce'}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('my_listings')}
          className={`py-2 px-1 rounded-xl transition-all relative ${
            activeTab === 'my_listings'
              ? 'bg-white text-[#2E7D32] shadow-xs font-extrabold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span>{isBn ? 'আমার লিস্টিং' : 'My Listings'}</span>
          {myListings.length > 0 && (
            <span className="ml-1 bg-emerald-600 text-white text-[9px] px-1.5 py-0.2 rounded-full">
              {myListings.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`py-2 px-1 rounded-xl transition-all relative ${
            activeTab === 'orders'
              ? 'bg-white text-[#2E7D32] shadow-xs font-extrabold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span>{isBn ? 'প্রাপ্ত অর্ডার' : 'Orders'}</span>
          {receivedOrders.length > 0 && (
            <span className="ml-1 bg-[#F9A825] text-gray-900 text-[9px] px-1.5 py-0.2 rounded-full font-black">
              {receivedOrders.length}
            </span>
          )}
        </button>
      </div>

      {/* VIEW 1: ALL PRODUCE MARKETPLACE */}
      {activeTab === 'all' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'ফসল বা এলাকা সার্চ করুন...' : 'Search crop or location...'}
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
                    <span>{isBn ? 'যাচাইকৃত কৃষক' : 'Verified Farmer'}</span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white text-[10px] font-black px-2.5 py-0.5 rounded-lg backdrop-blur-xs">
                    {isBn ? `স্টক: ${item.totalQuantityKg} কেজি` : `Stock: ${item.totalQuantityKg} kg`}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-extrabold text-sm text-gray-900 leading-snug group-hover:text-[#2E7D32] transition-colors">
                      {isBn ? item.titleBn : item.titleEn}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span>{isBn ? item.locationBn : item.locationEn}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">
                        {isBn ? 'পাইকারি প্রতি কেজি' : 'Wholesale Price'}
                      </span>
                      <span className="text-base font-black text-[#2E7D32]">
                        ৳ {item.pricePerKg}{' '}
                        <span className="text-xs font-normal text-gray-500">/ কেজি</span>
                      </span>
                    </div>

                    <a
                      href={`tel:${item.sellerPhone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-green-50 hover:bg-green-100 text-[#2E7D32] border border-green-200 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{isBn ? 'কল দিন' : 'Call'}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: MY LISTINGS */}
      {activeTab === 'my_listings' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                {isBn ? 'আমার সক্রিয় ফসল বিক্রয় বিজ্ঞাপন' : 'My Active Produce Listings'}
              </h3>
              <p className="text-[10px] text-gray-500">
                {isBn ? 'সরাসরি ক্রেতা ও আড়তদারদের সাথে লেনদেন করুন' : 'Manage your direct wholesale offers'}
              </p>
            </div>
            <button
              onClick={() => setIsSellModalOpen(true)}
              className="bg-[#2E7D32] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isBn ? '+ নতুন লিস্টিং' : '+ Add Listing'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {myListings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.titleBn}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full inline-block mb-1 ${
                          item.status === 'active'
                            ? 'bg-emerald-100 text-[#2E7D32]'
                            : item.status === 'sold'
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status === 'active'
                          ? isBn ? 'সক্রিয় লিস্টিং (Active)' : 'Active'
                          : item.status === 'sold'
                          ? isBn ? 'বিক্রিত (Sold)' : 'Sold Out'
                          : isBn ? 'অনুমোদনের অপেক্ষায় (Pending)' : 'Pending'}
                      </span>
                      <h4 className="text-xs font-extrabold text-gray-900 leading-snug">
                        {isBn ? item.titleBn : item.titleEn}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">
                        {item.publishedDate} • {item.locationBn}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-gray-50 p-2 rounded-xl text-center text-xs">
                  <div>
                    <span className="text-[9px] text-gray-500 block">{isBn ? 'দর / কেজি' : 'Price'}</span>
                    <span className="font-extrabold text-[#2E7D32]">৳ {item.pricePerKg}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 block">{isBn ? 'স্টক পরিমাণ' : 'Stock'}</span>
                    <span className="font-extrabold text-gray-900">{item.totalQuantityKg} কেজি</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-500 block">{isBn ? 'তোলার তারিখ' : 'Harvest'}</span>
                    <span className="font-bold text-gray-700 text-[10px]">{item.harvestDate || 'সদ্য তোলা'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[10px] text-gray-500">
                    👁️ {item.viewsCount || 12} {isBn ? 'ভিউ' : 'views'} • 💬 {item.inquiriesCount || 0} {isBn ? 'অনুসন্ধান' : 'leads'}
                  </span>

                  <button
                    onClick={() => handleToggleSoldStatus(item.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs active:scale-95 transition-all ${
                      item.status === 'sold'
                        ? 'bg-emerald-50 text-[#2E7D32] border border-emerald-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {item.status === 'sold'
                      ? isBn ? 'পুনরায় সক্রিয় করুন' : 'Reactivate'
                      : isBn ? 'বিক্রিত মার্ক করুন' : 'Mark as Sold'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: RECEIVED ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">
              {isBn ? 'ক্রেতা ও আড়তদারদের পাইকারি অর্ডার' : 'Buyer Wholesale Orders Received'}
            </h3>
            <p className="text-[10px] text-gray-500">
              {isBn ? 'সরাসরি ক্রেতার সাথে ফোনে যোগাযোগ করে ডেলিভারি সম্পন্ন করুন' : 'Call buyers and confirm dispatch'}
            </p>
          </div>

          <div className="space-y-3">
            {receivedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <span className="text-[10px] font-extrabold text-gray-400 block">{order.orderNumber}</span>
                    <h4 className="text-xs font-black text-gray-900">{order.buyerName}</h4>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      order.status === 'processing'
                        ? 'bg-amber-100 text-amber-900'
                        : order.status === 'shipped'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-emerald-100 text-[#2E7D32]'
                    }`}
                  >
                    {order.status === 'processing'
                      ? isBn ? 'প্রসেসিং হচ্ছে' : 'Processing'
                      : order.status === 'shipped'
                      ? isBn ? 'পরিবহনে রয়েছে' : 'Shipped'
                      : isBn ? 'ডেলিভার্ড' : 'Delivered'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 block">{isBn ? 'ফসল ও পরিমাণ:' : 'Crop & Qty:'}</span>
                    <span className="font-extrabold text-gray-900">{order.cropName} ({order.quantityKg} কেজি)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 block">{isBn ? 'মোট মূল্য:' : 'Total Amount:'}</span>
                    <span className="font-black text-[#2E7D32] text-sm">৳ {order.totalPrice}</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#2E7D32]" />
                  <span>{order.deliveryAddress}</span>
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <a
                    href={`tel:${order.buyerPhone}`}
                    className="bg-emerald-50 hover:bg-emerald-100 text-[#2E7D32] border border-emerald-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 active:scale-95 transition-all text-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isBn ? 'ক্রেতাকে কল দিন' : 'Call Buyer'}</span>
                  </a>

                  {order.status === 'processing' && (
                    <button
                      onClick={() => handleUpdateOrderStatus(order.id, 'shipped')}
                      className="bg-[#2E7D32] text-white px-3 py-1.5 rounded-xl font-bold text-xs active:scale-95 shadow-xs"
                    >
                      {isBn ? 'পাঠানো হয়েছে (Ship)' : 'Mark Shipped'}
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button
                      onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-xl font-bold text-xs active:scale-95 shadow-xs"
                    >
                      {isBn ? 'সম্পন্ন (Delivered)' : 'Mark Delivered'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Details Modal (Buyer preview) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="relative h-48 rounded-2xl overflow-hidden">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.titleBn}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 backdrop-blur-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h2 className="text-base font-extrabold text-gray-900">
                  {isBn ? selectedProduct.titleBn : selectedProduct.titleEn}
                </h2>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>{isBn ? selectedProduct.locationBn : selectedProduct.locationEn}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-green-50/60 p-3 rounded-2xl border border-green-100">
                <div>
                  <span className="text-[10px] text-gray-500 block font-bold">
                    {isBn ? 'পাইকারি প্রতি কেজি' : 'Price per kg'}
                  </span>
                  <span className="text-base font-black text-[#2E7D32]">
                    ৳ {selectedProduct.pricePerKg}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block font-bold">
                    {isBn ? 'মোট স্টক পরিমাণ' : 'Available Stock'}
                  </span>
                  <span className="text-base font-black text-gray-900">
                    {selectedProduct.totalQuantityKg} কেজি
                  </span>
                </div>
              </div>

              {/* Seller details card */}
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  {isBn ? 'কৃষক ও বিক্রেতার তথ্য' : 'Farmer / Seller Info'}
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm">{selectedProduct.sellerName}</h4>
                    <p className="text-[10px] text-emerald-700 font-bold">✓ স্মার্ট কৃষক কার্ড যাচাইকৃত</p>
                  </div>
                  <a
                    href={`tel:${selectedProduct.sellerPhone}`}
                    className="bg-[#2E7D32] hover:bg-green-800 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#F9A825]" />
                    <span>{isBn ? 'কল দিন' : 'Call Seller'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE PRODUCE LISTING MODAL */}
      {isSellModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-sm text-gray-900 flex items-center gap-2">
                <Store className="w-4 h-4 text-[#2E7D32]" />
                <span>{isBn ? 'নতুন ফসল বিক্রয় পোস্ট প্রকাশ করুন' : 'Create Produce Selling Listing'}</span>
              </h3>
              <button
                onClick={() => setIsSellModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSellSubmit} className="space-y-3 text-xs">
              {/* Select Crop */}
              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">
                  {isBn ? 'ফসল বাছাই করুন *' : 'Select Crop *'}
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                >
                  <option value="আলু (Potato)">{isBn ? 'উন্নত লাল আলু (Potato)' : 'Red Potato'}</option>
                  <option value="আমন ধান (Amon Rice)">{isBn ? 'আমন ধান / চাল (Rice Grain)' : 'Amon Rice Grain'}</option>
                  <option value="টমেটো (Tomato)">{isBn ? 'গ্রীষ্মকালীন লাল টমেটো (Tomato)' : 'Fresh Tomato'}</option>
                  <option value="ভুট্টা (Maize)">{isBn ? 'হাইব্রিড হলুদ ভুট্টা (Maize)' : 'Hybrid Maize'}</option>
                  <option value="সরিষা (Mustard)">{isBn ? 'দেশি হলুদ সরিষা (Mustard)' : 'Mustard Seed'}</option>
                  <option value="পাট (Jute)">{isBn ? 'তোষা সোনালী পাট (Jute)' : 'Golden Jute'}</option>
                </select>
              </div>

              {/* Title / Variety */}
              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">
                  {isBn ? 'বিজ্ঞাপনের বিবরণ / শিরোনাম' : 'Listing Title / Variety Description'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={isBn ? 'যেমন: বিষমুক্ত তাজা আলু ৫০০ কেজি' : 'e.g. Fresh harvest Cardinal potato 500kg'}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              {/* Quantity & Price */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 block">
                    {isBn ? 'পরিমাণ (কেজি) *' : 'Quantity (kg) *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 block">
                    {isBn ? 'পাইকারি দর (৳ / কেজি) *' : 'Price (৳ / kg) *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              {/* Harvest Date & Location */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 block">
                    {isBn ? 'তোলার তারিখ *' : 'Harvest Date *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 block">
                    {isBn ? 'মোবাইল নম্বর *' : 'Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">
                  {isBn ? 'খামারের অবস্থান / ডেলিভারি এলাকা *' : 'Farm Location / Area *'}
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
                className="w-full bg-[#2E7D32] hover:bg-green-800 text-white font-black py-3.5 rounded-2xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 text-xs mt-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#F9A825]" />
                <span>{isBn ? 'লিস্টিং প্রকাশ করুন' : 'Publish Produce Listing'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
