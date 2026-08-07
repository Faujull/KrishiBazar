import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AIAssistantModal } from './components/AIAssistantModal';

import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { MyFarmPage } from './pages/MyFarmPage';
import { AddFarmPage } from './pages/AddFarmPage';
import { CropDetailsPage } from './pages/CropDetailsPage';
import { DiseaseDetectionPage } from './pages/DiseaseDetectionPage';
import { ImagePreviewPage } from './pages/ImagePreviewPage';
import { DiseaseResultPage } from './pages/DiseaseResultPage';
import { CropCalendarPage } from './pages/CropCalendarPage';
import { MarketPricesPage } from './pages/MarketPricesPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProfilePage } from './pages/ProfilePage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col font-sans text-gray-900 antialiased selection:bg-green-200 selection:text-green-900">
      {/* Show Top Header unless on Auth page */}
      {!isAuthPage && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-farm" element={<MyFarmPage />} />
          <Route path="/add-farm" element={<AddFarmPage />} />
          <Route path="/crop-details/:id" element={<CropDetailsPage />} />
          <Route path="/disease-detection" element={<DiseaseDetectionPage />} />
          <Route path="/image-preview" element={<ImagePreviewPage />} />
          <Route path="/disease-result" element={<DiseaseResultPage />} />
          <Route path="/crop-calendar" element={<CropCalendarPage />} />
          <Route path="/market-prices" element={<MarketPricesPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      {/* Show Floating AI Assistant & Bottom Nav unless on Auth or Preview page */}
      {!isAuthPage && (
        <>
          <AIAssistantModal />
          <BottomNav />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}
