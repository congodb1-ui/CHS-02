import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { UserRole, ROLE_LABELS } from '../types';
import {
  PhoneCall,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  LogOut,
  LogIn,
  UserPlus,
  Car,
  FileText,
  Lock,
} from 'lucide-react';
import { LoginModal } from './LoginModal';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    loginAsRole,
    logout,
    isAuthenticated,
    isPendingApproval,
    isRejected,
    activeTab,
    setActiveTab,
    setIsEmergencyOpen,
    openAiWithPrompt,
    userName,
    userFlat,
  } = useSociety();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalTab, setLoginModalTab] = useState<'login' | 'register'>('login');

  // Consolidated navigation links (Utilities page removed as requested!)
  const allNavLinks = [
    { id: 'home', label: 'Overview', publicAllowed: true },
    { id: 'amenities', label: 'Amenities', publicAllowed: false },
    { id: 'parking', label: 'Parking & FastTag', publicAllowed: false },
    { id: 'helpdesk', label: 'Helpdesk', publicAllowed: false },
    { id: 'tenants', label: 'Tenants & Shifting', publicAllowed: false },
    { id: 'procurement', label: 'Procurement & WO', publicAllowed: false },
    { id: 'documents', label: 'Documents', publicAllowed: false },
    { id: 'committee', label: 'Governance & Admin', publicAllowed: false },
    { id: 'inspection', label: 'Staff Checklist', publicAllowed: false },
  ];

  // Pending resident or unauthenticated visitors must NOT see internal links
  const visibleLinks = allNavLinks.filter((link) => {
    if (!isAuthenticated || isPendingApproval || isRejected) {
      return link.publicAllowed;
    }
    return true;
  });

  const handleRoleSelect = (newRole: UserRole, profileId?: string) => {
    loginAsRole(newRole, profileId);
    setRoleMenuOpen(false);
  };

  const getDisplayRoleBadge = () => {
    switch (role) {
      case 'resident':
      case 'member':
        if (isRejected) return 'Registration Rejected';
        return isPendingApproval ? 'Pending Approval' : `Resident (${userFlat})`;
      case 'supervisor':
        return 'Facility Supervisor';
      case 'mc_member':
      case 'secretary':
        return 'MC Member';
      case 'admin':
        return 'Society Admin';
      case 'public':
      default:
        return 'Public Visitor';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Logo Wordmark */}
          <button
            onClick={() => setActiveTab('home')}
            className="text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                Solitaire CHS
              </span>
              <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 hidden sm:inline-block">
                Baner, Pune
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5">
            {visibleLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`text-xs xl:text-sm font-medium whitespace-nowrap transition-colors py-1 relative cursor-pointer px-1.5 ${
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

          {/* Zone 3: Actions & Auth */}
          <div className="flex items-center gap-2">
            {/* Ask AI Assistant */}
            <button
              onClick={() => openAiWithPrompt()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
              title="Ask Solitaire Society AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Emergency Hotline */}
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              title="24/7 Security Gates Emergency Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>Gate Help</span>
            </button>

            {/* If Public / Unauthenticated */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setLoginModalTab('login');
                    setIsLoginModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    setLoginModalTab('register');
                    setIsLoginModalOpen(true);
                  }}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-teal-700" />
                  <span>Register Flat</span>
                </button>
              </div>
            ) : (
              /* Role Switcher & Authenticated Profile Indicator */
              <div className="relative">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border ${
                    isPendingApproval
                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                      : 'text-slate-800 bg-slate-100 hover:bg-slate-200 border-slate-300'
                  }`}
                  aria-expanded={roleMenuOpen}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                  <span className="font-semibold">{getDisplayRoleBadge()}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {roleMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/80">
                      <p className="text-xs font-bold text-slate-900 truncate">{userName}</p>
                      <p className="text-[11px] text-slate-500">Unit: {userFlat}</p>
                      {isPendingApproval && (
                        <p className="text-[10px] font-bold text-amber-700 mt-1 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                          Pending Committee Approval
                        </p>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => handleRoleSelect('resident', 'usr-001')}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                          role === 'resident' && !isPendingApproval ? 'font-bold text-teal-700 bg-teal-50/50' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <span className="font-semibold block">Resident (Unit A-402)</span>
                          <span className="text-[10px] text-slate-400">Verified flat owner</span>
                        </div>
                        {role === 'resident' && !isPendingApproval && <span className="text-[10px] font-bold text-teal-700">Active</span>}
                      </button>

                      <button
                        onClick={() => handleRoleSelect('resident', 'usr-010')}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                          isPendingApproval ? 'font-bold text-amber-700 bg-amber-50/50' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <span className="font-semibold block">Pending Resident (Unit B-503)</span>
                          <span className="text-[10px] text-amber-600">Simulate pending state</span>
                        </div>
                        {isPendingApproval && <span className="text-[10px] font-bold text-amber-700">Active</span>}
                      </button>

                      <button
                        onClick={() => handleRoleSelect('supervisor', 'usr-004')}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                          role === 'supervisor' ? 'font-bold text-teal-700 bg-teal-50/50' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <span className="font-semibold block">Supervisor</span>
                          <span className="text-[10px] text-slate-400">Daily checklist & attendance</span>
                        </div>
                        {role === 'supervisor' && <span className="text-[10px] font-bold text-teal-700">Active</span>}
                      </button>

                      <button
                        onClick={() => handleRoleSelect('mc_member', 'usr-002')}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                          role === 'mc_member' ? 'font-bold text-teal-700 bg-teal-50/50' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <span className="font-semibold block">MC Member (Secretary)</span>
                          <span className="text-[10px] text-slate-400">Approvals & contracts</span>
                        </div>
                        {role === 'mc_member' && <span className="text-[10px] font-bold text-teal-700">Active</span>}
                      </button>

                      <button
                        onClick={() => handleRoleSelect('admin', 'usr-003')}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                          role === 'admin' ? 'font-bold text-teal-700 bg-teal-50/50' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <span className="font-semibold block">Society Admin</span>
                          <span className="text-[10px] text-slate-400">Full system override</span>
                        </div>
                        {role === 'admin' && <span className="text-[10px] font-bold text-teal-700">Active</span>}
                      </button>
                    </div>

                    <div className="px-4 pt-2 mt-1 border-t border-slate-100 flex items-center justify-end text-[11px]">
                      <button
                        onClick={() => {
                          setRoleMenuOpen(false);
                          logout();
                        }}
                        className="text-red-600 font-semibold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 space-y-1">
            {visibleLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-md font-medium transition-colors cursor-pointer ${
                  activeTab === link.id
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 border-t border-slate-100 space-y-1">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setLoginModalTab('login');
                      setIsLoginModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm font-semibold text-teal-800 bg-teal-50 rounded-md"
                  >
                    Resident Login
                  </button>
                  <button
                    onClick={() => {
                      setLoginModalTab('register');
                      setIsLoginModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-md"
                  >
                    Register Flat
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-red-600 flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout to Public View</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        defaultTab={loginModalTab}
      />
    </header>
  );
};
