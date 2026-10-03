/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SocietyProvider, useSociety } from './context/SocietyContext';
import { Navbar } from './components/Navbar';
import { LiveStatusStrip } from './components/LiveStatusStrip';
import { HomeView } from './components/views/HomeView';
import { AmenitiesView } from './components/views/AmenitiesView';
import { UtilitiesView } from './components/views/UtilitiesView';
import { TenantsView } from './components/views/TenantsView';
import { HelpdeskView } from './components/views/HelpdeskView';
import { CommitteeView } from './components/views/CommitteeView';
import { SupervisorInspectionView } from './components/views/SupervisorInspectionView';
import { DirectoryView } from './components/views/DirectoryView';
import { ProcurementView } from './components/views/ProcurementView';
import { Footer } from './components/Footer';
import { EmergencyModal } from './components/EmergencyModal';
import { BookingModal } from './components/BookingModal';
import { AIChatModal } from './components/AIChatModal';
import { AIFloatingWidget } from './components/AIFloatingWidget';

const AppContent: React.FC = () => {
  const { activeTab, isAiModalOpen, setIsAiModalOpen } = useSociety();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Global Navbar following 3-zone contract */}
      <Navbar />

      {/* Real-time Utility & Society status strip */}
      <LiveStatusStrip />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'inspection' && <SupervisorInspectionView />}
        {activeTab === 'directory' && <DirectoryView />}
        {activeTab === 'procurement' && <ProcurementView />}
        {activeTab === 'amenities' && <AmenitiesView />}
        {activeTab === 'utilities' && <UtilitiesView />}
        {activeTab === 'tenants' && <TenantsView />}
        {activeTab === 'helpdesk' && <HelpdeskView />}
        {activeTab === 'committee' && <CommitteeView />}
      </main>

      {/* 4-Column Footer */}
      <Footer />

      {/* Global Floating AI Launcher */}
      <AIFloatingWidget />

      {/* Global Interactive Modals */}
      <EmergencyModal />
      <BookingModal />
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
