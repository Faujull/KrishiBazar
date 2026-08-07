import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_MARKET_PRICES } from '../data/mockData';
import { TrendingUp, TrendingDown, Minus, MapPin, Search } from 'lucide-react';

export const MarketPricesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [prices] = useState(INITIAL_MARKET_PRICES);

  const filteredPrices = prices.filter(
    (item) =>
      item.commodityBn.includes(searchTerm) ||
      item.commodityEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.marketNameBn.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24 max-w-md mx-auto px-4 pt-4 space-y-4">
      {/* Title Banner */}
      <div className="bg-[#2E7D32] text-white p-4 rounded-2xl shadow-md space-y-1">
        <h2 className="text-lg font-extrabold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#F9A825]" />
          <span>{t('actionMarketPrice')}</span>
        </h2>
        <p className="text-xs text-green-100">
          {language === 'bn' ? 'কারওয়ান বাজার, বগুড়া ও বিভাগীয় পাইকারি হাটের আজকের দর' : 'Daily wholesale rates across Karwan Bazar & regional hubs'}
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={language === 'bn' ? 'ফসল বা হাটের নাম দিয়ে খুঁজুন...' : 'Search commodity or market name...'}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] shadow-xs"
        />
      </div>

      {/* Market Prices List */}
      <div className="space-y-3">
        {filteredPrices.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-sm text-gray-900">
                  {language === 'bn' ? item.commodityBn : item.commodityEn}
                </h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>{language === 'bn' ? item.marketNameBn : item.marketNameEn} ({item.district})</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-lg font-black text-gray-900">
                  ৳ {item.pricePerKg}
                </span>
                <span className="text-[10px] text-gray-500 block">/ কেজি</span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-600">
                {language === 'bn' ? `মন প্রতি (৪০ কেজি): ৳ ${item.pricePerMon}` : `Per Mon (40kg): ৳ ${item.pricePerMon}`}
              </span>

              <div className="flex items-center gap-1">
                {item.trend === 'up' && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    +৳{item.changeAmount}
                  </span>
                )}
                {item.trend === 'down' && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                    <TrendingDown className="w-3 h-3 text-red-600" />
                    -৳{item.changeAmount}
                  </span>
                )}
                {item.trend === 'stable' && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                    <Minus className="w-3 h-3 text-gray-500" />
                    {language === 'bn' ? 'স্থির' : 'Stable'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
