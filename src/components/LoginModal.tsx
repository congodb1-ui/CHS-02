import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import {
  X,
  ShieldCheck,
  Building,
  KeyRound,
  CheckCircle2,
  Lock,
  UserCheck,
  AlertTriangle,
  User,
  Users,
  Wrench,
  Sparkles,
  ArrowRight,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  Database,
} from 'lucide-react';
import { UserRole, ALL_SOCIETY_FLATS } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const {
    loginAsRole,
    registerMember,
    signInWithSupabase,
    signUpWithSupabase,
    setActiveTab,
    isSupabaseOnline,
  } = useSociety();

  const [activeTab, setActiveTabMode] = useState<'login' | 'register'>(defaultTab);

  // Supabase Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Supabase Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regPhone, setRegPhone] = useState('');
  const [regTower, setRegTower] = useState<'Tower A' | 'Tower B'>('Tower A');
  const [regFlat, setRegFlat] = useState(ALL_SOCIETY_FLATS[0]);
  const [regOwnership, setRegOwnership] = useState<'Owner' | 'Tenant'>('Owner');
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  if (!isOpen) return null;

  // Filter predefined flats by selected tower
  const availableFlatsForTower = ALL_SOCIETY_FLATS.filter((f) =>
    regTower === 'Tower A' ? f.startsWith('A-') : f.startsWith('B-')
  );

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await signInWithSupabase(loginEmail.trim(), loginPassword);

      if (!res.success) {
        setLoginError(res.error || 'Authentication failed. Please verify your credentials.');
      } else {
        if (res.isPending) {
          setActiveTab('home');
        } else if (res.role === 'admin' || res.role === 'mc_member') {
          setActiveTab('committee');
        } else if (res.role === 'supervisor') {
          setActiveTab('inspection');
        } else {
          setActiveTab('home');
        }
        onClose();
      }
    } catch (err: any) {
      setLoginError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters in length for secure authentication.');
      return;
    }

    setRegLoading(true);

    try {
      const res = await signUpWithSupabase({
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword,
        phone: regPhone.trim(),
        tower: regTower,
        flatNo: regFlat,
        ownershipType: regOwnership,
      });

      if (!res.success) {
        setRegError(res.error || 'Registration failed.');
      } else {
        setRegSuccess(
          `Registration submitted for Flat [${regFlat}]! Your account has been registered with "Pending Approval" status. Solitaire CHS Managing Committee will verify ownership documents before unlocking full resident modules.`
        );
        setRegName('');
        setRegEmail('');
        setRegPassword('');
        setRegPhone('');
      }
    } catch (err: any) {
      setRegError(err.message || 'Registration failed.');
    } finally {
      setRegLoading(false);
    }
  };

  const handleRoleSelect = (selectedRole: UserRole, targetTab: string, profileId?: string) => {
    loginAsRole(selectedRole, profileId);
    setActiveTab(targetTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-600 rounded-xl shadow-xs">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Solitaire CHS · Access & Authentication</h2>
                {isSupabaseOnline && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                    <Database className="w-2.5 h-2.5" />
                    Supabase Connected
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300">
                Single Member Per Flat Security · Supabase Auth & PostgreSQL Realtime
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6">
          <button
            onClick={() => {
              setActiveTabMode('login');
              setLoginError('');
              setRegError('');
              setRegSuccess('');
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'login'
                ? 'border-teal-700 text-teal-800 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Authorized Portal Login
          </button>
          <button
            onClick={() => {
              setActiveTabMode('register');
              setLoginError('');
              setRegError('');
              setRegSuccess('');
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'register'
                ? 'border-teal-700 text-teal-800 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            New Flat Resident Registration
          </button>
        </div>

        {/* TAB 1: SUPABASE AUTH LOGIN + DEMO ROLE SWITCHER */}
        {activeTab === 'login' && (
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
            {/* Supabase Email/Password Sign-In Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3.5 bg-slate-50 p-4.5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-teal-700" />
                  Sign In to Your Society Account
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Supabase Auth</span>
              </div>

              {loginError && (
                <div className="p-2.5 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start gap-2 font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Registered Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. suresh@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-teal-700 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter account password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-teal-700 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-400 text-white rounded-lg font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate via Supabase</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Switcher Section */}
            <div className="relative flex py-1 items-center">
              <div className="grow border-t border-slate-200"></div>
              <span className="shrink mx-4 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                Or Quick-Switch Role for Demo / Inspection
              </span>
              <div className="grow border-t border-slate-200"></div>
            </div>

            <div className="space-y-3">
              {/* Resident Role */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Resident
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs">Resident Member (Verified Unit A-402)</h3>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Book amenities, log service tickets, view FastTag parking, and vote on community polls.
                  </p>
                </div>
                <button
                  onClick={() => handleRoleSelect('resident', 'home', 'usr-001')}
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold shrink-0 cursor-pointer shadow-xs text-xs"
                >
                  Continue as Resident
                </button>
              </div>

              {/* Pending Resident Demo */}
              <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 hover:border-amber-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                      Pending Verification
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs">New Signup (Unit B-503 - Pending)</h3>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Experience the restricted Pending Approval state. Shows instructions to wait for MC/Admin approval.
                  </p>
                </div>
                <button
                  onClick={() => handleRoleSelect('resident', 'home', 'usr-010')}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold shrink-0 cursor-pointer shadow-xs text-xs"
                >
                  Test Pending User
                </button>
              </div>

              {/* Supervisor Role */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                      Supervisor
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs">Facility Supervisor (Estate Operations)</h3>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Submit 33-point physical walkthrough inspections, mark staff attendance, and log defect tickets.
                  </p>
                </div>
                <button
                  onClick={() => handleRoleSelect('supervisor', 'inspection', 'usr-004')}
                  className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold shrink-0 cursor-pointer shadow-xs text-xs"
                >
                  Continue as Supervisor
                </button>
              </div>

              {/* MC Member Role */}
              <div className="p-3.5 rounded-xl border border-slate-200 hover:border-sky-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                      MC Member
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs">Managing Committee (Secretary / Treasurer)</h3>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Approve member registrations, sign off work orders with comments, and review financial balance sheets.
                  </p>
                </div>
                <button
                  onClick={() => handleRoleSelect('mc_member', 'procurement', 'usr-002')}
                  className="px-3.5 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded-lg font-semibold shrink-0 cursor-pointer shadow-xs text-xs"
                >
                  Continue as MC Member
                </button>
              </div>

              {/* Admin Role */}
              <div className="p-3.5 rounded-xl border border-slate-900 bg-slate-900 text-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500 text-slate-950">
                      Superuser
                    </span>
                    <h3 className="font-bold text-white text-xs">Society Admin (Full System Override)</h3>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Full master control: inline-edit all database records, grant/revoke roles, and manage all files.
                  </p>
                </div>
                <button
                  onClick={() => handleRoleSelect('admin', 'committee', 'usr-003')}
                  className="px-3.5 py-1.5 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-bold shrink-0 cursor-pointer text-xs"
                >
                  Master Admin Access
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REGISTER FLAT (SINGLE MEMBER PER FLAT CONSTRAINT + SUPABASE AUTH) */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4 text-xs">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>One Member Per Flat Constraint:</strong> Solitaire CHS permits only 1 primary registered account per residential flat. If your flat is already claimed in Supabase, registration will be rejected.
              </span>
            </div>

            {regError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-start gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{regError}</span>
              </div>
            )}

            {regSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-start gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>{regSuccess}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Tower</label>
                <select
                  value={regTower}
                  onChange={(e) => {
                    const tower = e.target.value as 'Tower A' | 'Tower B';
                    setRegTower(tower);
                    setRegFlat(tower === 'Tower A' ? 'A-101' : 'B-101');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold"
                >
                  <option value="Tower A">Tower A (Maple)</option>
                  <option value="Tower B">Tower B (Cedar)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Predefined Flat (101 to 1504)</label>
                <select
                  value={regFlat}
                  onChange={(e) => setRegFlat(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                >
                  {availableFlatsForTower.map((flat) => (
                    <option key={flat} value={flat}>
                      {flat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Resident Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Nambiar"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Ownership Type</label>
                <select
                  value={regOwnership}
                  onChange={(e) => setRegOwnership(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold"
                >
                  <option value="Owner">Flat Owner</option>
                  <option value="Tenant">Registered Tenant</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="suresh@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mobile Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98220 00000"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Create Password (Supabase Auth)</label>
              <div className="relative">
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                This password will be used with Supabase Authentication to protect your flat account.
              </span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                New accounts remain locked in "Pending Approval" state until verified by MC.
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium cursor-pointer hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={regLoading}
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-400 text-white rounded-lg font-bold cursor-pointer shadow-xs flex items-center gap-2"
                >
                  {regLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Submit Registration</span>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
