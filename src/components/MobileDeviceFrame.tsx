import React, { useState } from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({ children }) => {
  const [isFrameEnabled, setIsFrameEnabled] = useState(true);
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-[#111827] text-gray-100 flex flex-col items-center justify-start sm:py-6 sm:px-4 font-sans selection:bg-green-300 selection:text-green-950">
      {/* Desktop Top Control Bar */}
      <div className="w-full max-w-xl mb-3 px-4 py-2 bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700/60 shadow-lg flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-gray-200">KrishiBazar (কৃষিবাজার)</span>
          <span className="hidden sm:inline-block text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">
            Mobile Mode
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium flex items-center gap-1 transition-colors"
            title="Language switch"
          >
            <Globe className="w-3.5 h-3.5 text-[#F9A825]" />
            <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          <button
            onClick={() => setIsFrameEnabled(!isFrameEnabled)}
            className="px-2.5 py-1 rounded-lg bg-[#2E7D32] hover:bg-green-700 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            {isFrameEnabled ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Full Width</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile Frame</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area: Either framed in Mobile Phone or standard view */}
      {isFrameEnabled ? (
        <div className="w-full max-w-[410px] relative transition-all duration-300">
          {/* Smartphone Hardware Outer Border */}
          <div className="relative bg-gray-900 border-[10px] sm:border-[12px] border-gray-900 rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/10">
            
            {/* Top Smartphone Status Bar */}
            <div className="bg-[#2E7D32] text-white px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-bold select-none z-50 relative">
              {/* Left Time */}
              <span>9:41</span>

              {/* Dynamic Island / Notch */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-24 h-4 bg-black rounded-full flex items-center justify-end px-2 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-900 ring-1 ring-gray-800"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/80"></div>
              </div>

              {/* Right Status Icons */}
              <div className="flex items-center gap-1.5 text-white/90">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Inner Phone Screen Content with containing block context */}
            <div
              className="bg-[#F8FAF8] text-gray-900 h-[760px] max-h-[85vh] overflow-y-auto relative no-scrollbar"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              {children}
            </div>

            {/* Bottom Smartphone Home Bar */}
            <div className="bg-white py-1.5 flex justify-center border-t border-gray-100 z-50 relative">
              <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-[#F8FAF8] text-gray-900 min-h-screen rounded-2xl shadow-xl overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
};
