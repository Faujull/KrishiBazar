import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LayoutDashboard, Tractor, ScanLine, Store, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    {
      to: '/dashboard',
      labelKey: 'navDashboard',
      icon: LayoutDashboard,
    },
    {
      to: '/my-farm',
      labelKey: 'navMyFarm',
      icon: Tractor,
    },
    {
      to: '/disease-detection',
      labelKey: 'navDiseaseDetection',
      icon: ScanLine,
      isPrimary: true, // Special AI scan center button
    },
    {
      to: '/marketplace',
      labelKey: 'navMarketplace',
      icon: Store,
    },
    {
      to: '/profile',
      labelKey: 'navProfile',
      icon: User,
    },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (item.isPrimary) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center group -mt-5 relative z-10`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 ${
                        isActive
                          ? 'bg-[#2E7D32] text-white ring-4 ring-green-100'
                          : 'bg-[#2E7D32] text-white hover:bg-green-800'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span
                      className={`text-[10px] font-bold mt-1 ${
                        isActive ? 'text-[#2E7D32]' : 'text-gray-600'
                      }`}
                    >
                      {t(item.labelKey)}
                    </span>
                  </>
                )}
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
                  isActive
                    ? 'text-[#2E7D32] font-bold'
                    : 'text-gray-500 hover:text-gray-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'scale-110 text-[#2E7D32]' : ''}`} />
                  <span className="text-[10px] tracking-tight">{t(item.labelKey)}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
