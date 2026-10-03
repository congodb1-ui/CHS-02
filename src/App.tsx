/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SocietyProvider, useSociety } from './context/SocietyContext';
import { Navbar } from './components/Navbar';
import { LiveStatusStrip } from './components/LiveStatusStrip';
import { PublicLandingView } from './components/views/PublicLandingView';
import { PendingAccessView } from './components/views/PendingAccessView';
import { HomeView } from './components/views/HomeView';
import { AmenitiesView } from './components/views/AmenitiesView';
import { ParkingView } from './components/views/ParkingView';
import { DocumentRepositoryView } from './components/views/DocumentRepositoryView';
import { TenantsView } from './components/views/TenantsView';
import { HelpdeskView } from './components/views/HelpdeskView';
import { CommitteeView } from './components/views/CommitteeView';
import { SupervisorInspectionView } from './components/views/SupervisorInspectionView';
import { DirectoryView } from './components/views/DirectoryView';
import { ProcurementView } from './components/views/ProcurementView';
import { Footer } from './components/Footer';
import { EmergencyModal } from './components/EmergencyModal';
import { BookingModal } from './components/BookingModal';
import { LoginModal } from './components/LoginModal';
import { AIChatModal } from './components/AIChatModal';
import { AIFloatingWidget } from './components/AIFloatingWidget';

const AppContent: React.FC = () => {
  const {
    activeTab,
    isAiModalOpen,
    setIsAiModalOpen,
    isAuthenticated,
    isPendingApproval,
    isRejected,
  } = useSociety();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalTab, setLoginModalTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Global Navbar */}
      <Navbar />

      {/* Real-time Utility & Society status strip */}
      <LiveStatusStrip />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {!isAuthenticated ? (
          <PublicLandingView
            onOpenLogin={() => {
              setLoginModalTab('login');
              setIsLoginModalOpen(true);
            }}
            onOpenRegister={() => {
              setLoginModalTab('register');
              setIsLoginModalOpen(true);
            }}
          />
        ) : (isPendingApproval || isRejected) ? (
          <PendingAccessView />
        ) : (
          <>
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'parking' && <ParkingView />}
            {activeTab === 'documents' && <DocumentRepositoryView />}
            {activeTab === 'inspection' && <SupervisorInspectionView />}
            {activeTab === 'directory' && <DirectoryView />}
            {activeTab === 'procurement' && <ProcurementView />}
            {activeTab === 'amenities' && <AmenitiesView />}
            {activeTab === 'tenants' && <TenantsView />}
            {activeTab === 'helpdesk' && <HelpdeskView />}
            {activeTab === 'committee' && <CommitteeView />}
          </>
        )}
      </main>

      {/* 4-Column Footer */}
      <Footer />

      {/* Global Floating AI Launcher */}
      <AIFloatingWidget />

      {/* Global Interactive Modals */}
      <EmergencyModal />
      <BookingModal />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        defaultTab={loginModalTab}
      />
      <AIChatModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <SocietyProvider>
      <AppContent />
    </SocietyProvider>
  );
}
