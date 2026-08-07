import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  Phone,
  Store,
  Calendar,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';

interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  type: 'sale' | 'purchase';
  itemNameBn: string;
  itemNameEn: string;
  quantity: string;
  totalPrice: number;
  status: 'processing' | 'shipped' | 'delivered';
  counterpartyName: string;
  counterpartyPhone: string;
  imageUrl: string;
}

export const OrdersPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'sales' | 'purchases'>('all');

  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 'ord1',
      orderNumber: 'KB-88210',
      date: '০৫ আগস্ট ২০২৪',
      type: 'sale',
      itemNameBn: 'তাঁজা গ্র্যানুলা লাল আলু',
      itemNameEn: 'Fresh Red Granola Potato',
      quantity: '৫০০ কেজি',
      totalPrice: 29000,
      status: 'shipped',
      counterpartyName: 'মেসার্স বগুড়া এগ্রো ট্রেডার্স',
      counterpartyPhone: '01812345678',
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'ord2',
      orderNumber: 'KB-88194',
      date: '০১ আগস্ট ২০২৪',
      type: 'purchase',
      itemNameBn: 'জৈব ট্রাইকো-কমপোস্ট সার (৫০ কেজি)',
      itemNameEn: 'Organic Tricho-Compost (50 kg)',
      quantity: '২ বস্তা',
      totalPrice: 2400,
      status: 'delivered',
      counterpartyName: 'গ্রীন এগ্রো অর্গানিক স্টোর',
      counterpartyPhone: '01798765432',
      imageUrl: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'ord3',
      orderNumber: 'KB-88012',
      date: '২৮ জুলাই ২০২৪',
      type: 'sale',
      itemNameBn: 'হাইব্রিড আমন ধান (বিআর-২৮)',
      itemNameEn: 'Hybrid Rice Produce (BR-28)',
      quantity: '১০০০ কেজি',
      totalPrice: 42000,
      status: 'delivered',
      counterpartyName: 'আকিজ রাইস মিলস লিমিটেড',
      counterpartyPhone: '01911223344',
      imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=300&q=80',
    },
  ]);

  const filteredOrders = activeTab === 'all'
    ? orders
    : activeTab === 'sales'
    ? orders.filter((o) => o.type === 'sale')
    : orders.filter((o) => o.type === 'purchase');

  const getStatusBadge = (status: OrderItem['status']) => {
    switch (status) {
      case 'processing':
        return (
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>{language === 'bn' ? 'প্রসেসিং হচ্ছে' : 'Processing'}</span>
          </span>
        );
      case 'shipped':
        return (
          <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Truck className="w-3 h-3 text-blue-600" />
            <span>{language === 'bn' ? 'পরিবহনে রয়েছে' : 'Shipped'}</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#2E7D32]" />
            <span>{language === 'bn' ? 'সরবরাহ সম্পন্ন' : 'Delivered'}</span>
          </span>
        );
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
        <h2 className="font-extrabold text-base text-gray-900">
          {language === 'bn' ? 'আমার অর্ডার তালিকা' : 'My Orders & Sales'}
        </h2>
        <div className="w-9 h-9"></div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-200/70 p-1 rounded-2xl text-xs font-bold gap-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'all' ? 'bg-white text-[#2E7D32] shadow-xs font-extrabold' : 'text-gray-600'
          }`}
        >
          {language === 'bn' ? 'সকল অর্ডার' : 'All Orders'}
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'sales' ? 'bg-white text-[#2E7D32] shadow-xs font-extrabold' : 'text-gray-600'
          }`}
        >
          {language === 'bn' ? 'ফসল বিক্রি' : 'Sales'}
        </button>
        <button
          onClick={() => setActiveTab('purchases')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'purchases' ? 'bg-white text-[#2E7D32] shadow-xs font-extrabold' : 'text-gray-600'
          }`}
        >
          {language === 'bn' ? 'সার/বীজ ক্রয়' : 'Purchases'}
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center space-y-2">
            <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="text-xs font-bold text-gray-500">
              {language === 'bn' ? 'কোন অর্ডার রেকর্ড পাওয়া যায়নি' : 'No order history found'}
            </p>
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden p-4 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-extrabold text-gray-900">{ord.orderNumber}</span>
                  <span className="text-[10px] text-gray-400">• {ord.date}</span>
                </div>
                {getStatusBadge(ord.status)}
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={ord.imageUrl}
                  alt={ord.itemNameBn}
                  className="w-14 h-14 rounded-xl object-cover border shrink-0"
                />

                <div className="flex-1 min-w-0 text-xs">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md mb-1 inline-block ${
                    ord.type === 'sale' ? 'bg-emerald-100 text-[#2E7D32]' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {ord.type === 'sale'
                      ? (language === 'bn' ? 'বিক্রয়' : 'Sale')
                      : (language === 'bn' ? 'ক্রয়' : 'Purchase')}
                  </span>
                  <h4 className="font-bold text-gray-900 truncate">
                    {language === 'bn' ? ord.itemNameBn : ord.itemNameEn}
                  </h4>
                  <p className="text-gray-500 text-[11px]">
                    {language === 'bn' ? `পরিমাণ: ${ord.quantity}` : `Qty: ${ord.quantity}`}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-[#2E7D32] block">
                    ৳ {ord.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Counterparty details */}
              <div className="bg-gray-50 p-2.5 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">
                    {ord.type === 'sale'
                      ? (language === 'bn' ? 'ক্রেতার নাম' : 'Buyer')
                      : (language === 'bn' ? 'বিক্রেতার নাম' : 'Seller')}
                  </span>
                  <span className="font-bold text-gray-800">{ord.counterpartyName}</span>
                </div>

                <a
                  href={`tel:${ord.counterpartyPhone}`}
                  className="bg-[#2E7D32] text-white p-2 rounded-lg hover:bg-green-800 shadow-xs active:scale-95 transition-all"
                  title="Call"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F9A825]" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
