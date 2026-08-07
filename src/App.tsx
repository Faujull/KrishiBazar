import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FloatingAIAssistant } from './components/FloatingAIAssistant';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';

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
import { EditProfilePage } from './pages/EditProfilePage';
import { VerificationPage } from './pages/VerificationPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpSupportPage } from './pages/HelpSupportPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { OrdersPage } from './pages/OrdersPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="min-h-full flex flex-col font-sans text-gray-900 antialiased selection:bg-green-200 selection:text-green-900">
      {/* Show Top Header unless on Auth page */}
      {!isAuthPage && <Header />}

      <main className="flex-1 pb-16">
        <Routes>
          <Route path="/" element={<AuthPage />} />
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
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help-support" element={<HelpSupportPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>

      {/* Show Floating AI Assistant & Bottom Nav unless on Auth page */}
      {!isAuthPage && (
        <>
          <FloatingAIAssistant />
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
        <MobileDeviceFrame>
          <AppContent />
        </MobileDeviceFrame>
      </BrowserRouter>
    </LanguageProvider>
  );
}
