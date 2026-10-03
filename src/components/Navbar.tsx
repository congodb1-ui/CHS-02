import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { UserRole } from '../types';
import { PhoneCall, ShieldCheck, ChevronDown, Menu, X, Sparkles } from 'lucide-react';
import { LoginModal } from './LoginModal';

export const Navbar: React.FC = () => {
  const { role, setRole, activeTab, setActiveTab, setIsEmergencyOpen, openAiWithPrompt, userName, userFlat } = useSociety();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Overview' },
    { id: 'inspection', label: 'Inspection' },
    { id: 'directory', label: 'Directory' },
    { id: 'procurement', label: 'Procurement & WO' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'utilities', label: 'Utilities' },
    { id: 'tenants', label: 'Tenants' },
    { id: 'helpdesk', label: 'Helpdesk' },
    { id: 'committee', label: 'Governance' },
  ];

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'supervisor') {
      setActiveTab('inspection');
    }
    setRoleMenuOpen(false);
  };

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'member':
        return 'Member (Flat A-402)';
      case 'supervisor':
        return 'Supervisor (Parvez)';
      case 'secretary':
        return 'Secretary (MC)';
      case 'admin':
        return 'Society Admin';
      default:
        return 'Member';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('home')}
            className="text-left group cursor-pointer focus:outline-hidden"
          >
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
              Solitaire CHS
            </span>
          </button>

          {/* Zone 2: clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`text-xs xl:text-sm font-medium whitespace-nowrap transition-colors py-1 relative cursor-pointer ${
                    isActive
                      ? 'text-teal-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary actions & AI Assistant button */}
          <div className="flex items-center gap-2.5">
            {/* AI Assistant Direct Button */}
            <button
              onClick={() => openAiWithPrompt()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
              title="Ask Solitaire Society AI Assistant (Bye-laws, shifting, pool, water)"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Ask AI</span>
            </button>

            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              title="24/7 Security & Emergency Desk"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>Emergency</span>
            </button>

            {/* Role Switcher / Member Portal */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                aria-expanded={roleMenuOpen}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                <span className="font-semibold">{getRoleLabel(role)}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                    <p className="text-xs font-semibold text-slate-900 truncate">{userName}</p>
                    <p className="text-xs text-slate-500">Unit: {userFlat}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => handleRoleSelect('member')}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                        role === 'member' ? 'font-semibold text-teal-700 bg-teal-50/50' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <span className="font-medium block">Member (Resident)</span>
                        <span className="text-[10px] text-slate-400">Amenities, complaints, NOCs</span>
                      </div>
                      {role === 'member' && <span className="text-[10px] font-bold text-teal-700">Active</span>}
                    </button>
                    <button
                      onClick={() => handleRoleSelect('supervisor')}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                        role === 'supervisor' ? 'font-semibold text-teal-700 bg-teal-50/50' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <span className="font-medium block">Supervisor (Parvez)</span>
                        <span className="text-[10px] text-slate-400">Daily checklist & attendance</span>
                      </div>
                      {role === 'supervisor' && <span className="text-[10px] font-bold text-teal-700">Active</span>}
                    </button>
                    <button
                      onClick={() => handleRoleSelect('secretary')}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                        role === 'secretary' ? 'font-semibold text-teal-700 bg-teal-50/50' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <span className="font-medium block">Secretary (Pooja Hegde)</span>
                        <span className="text-[10px] text-slate-400">MC oversight, AMC & finances</span>
                      </div>
                      {role === 'secretary' && <span className="text-[10px] font-bold text-teal-700">Active</span>}
                    </button>
                    <button
                      onClick={() => handleRoleSelect('admin')}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                        role === 'admin' ? 'font-semibold text-teal-700 bg-teal-50/50' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <span className="font-medium block">Society Admin (Soleha Khan)</span>
                        <span className="text-[10px] text-slate-400">Full master administrative control</span>
                      </div>
                      {role === 'admin' && <span className="text-[10px] font-bold text-teal-700">Active</span>}
                    </button>
                  </div>
                  <div className="px-3 pt-2 mt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Role permissions:</span>
                    <button
                      onClick={() => {
                        setRoleMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="text-teal-700 font-bold hover:underline cursor-pointer"
                    >
                      Compare Matrix &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-md font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <button
                onClick={() => {
                  openAiWithPrompt();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                Ask Society AI Assistant
              </button>
              <button
                onClick={() => {
                  setIsEmergencyOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Emergency Security Desk
              </button>
            </div>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
};
