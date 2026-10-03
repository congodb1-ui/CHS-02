import React, { useState } from 'react';
import { useSociety } from '../../context/SocietyContext';
import {
  ShieldCheck,
  Building2,
  Lock,
  UserCheck,
  Bell,
  Clock,
  Waves,
  Dumbbell,
  Users,
  ChevronRight,
  PhoneCall,
  Sparkles,
  AlertTriangle,
  KeyRound,
  FileText,
  Car,
} from 'lucide-react';
import heroImage from '../../assets/images/hero_solitaire_society_1790929946633.jpg';
import poolImage from '../../assets/images/amenity_swimming_pool_1790929965312.jpg';
import gymImage from '../../assets/images/amenity_modern_gym_1790929982674.jpg';

interface PublicLandingViewProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export const PublicLandingView: React.FC<PublicLandingViewProps> = ({ onOpenLogin, onOpenRegister }) => {
  const { notices, loginAsRole, openAiWithPrompt } = useSociety();

  return (
    <div className="space-y-12 pb-16 animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <img
            src={heroImage}
            alt="Solitaire Society"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-10 px-6 sm:px-12 py-16 sm:py-24 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
            <Building2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Kool Homes Solitaire CHS Ltd. · Reg. PNA/HSG/TC/12492/2018</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Official Community Portal & Resident Network
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Welcome to Solitaire Cooperative Housing Society (Towers A & B, Baner-Pashan Link Road, Pune).
            Secure portal for amenity reservations, vehicle FastTag parking, vendor procurement, and managing committee governance.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-900/40 transition-all hover:scale-[1.02] cursor-pointer text-sm"
            >
              <KeyRound className="w-4 h-4" />
              <span>Resident & Staff Login</span>
            </button>
            <button
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/90 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 shadow-md transition-all hover:scale-[1.02] cursor-pointer text-sm"
            >
              <UserCheck className="w-4 h-4 text-teal-400" />
              <span>Register Your Flat</span>
            </button>
            <button
              onClick={() => openAiWithPrompt()}
              className="inline-flex items-center gap-2 px-5 py-3 bg-teal-950/80 hover:bg-teal-900/90 text-teal-200 border border-teal-700/50 rounded-xl text-sm font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Ask AI Bye-Laws Assistant</span>
            </button>
          </div>

          {/* Confidentiality Notice */}
          <div className="pt-4 flex items-start gap-2.5 text-xs text-slate-400 border-t border-slate-800/80">
            <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-200">Strict Confidentiality Gate:</strong> Member directories, financial balance sheets, vendor contracts, work orders, and helpdesk tickets are strictly protected and visible only to verified and approved residents.
            </span>
          </div>
        </div>
      </div>

      {/* Quick Demo Role Switcher Strip */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-50 text-teal-700 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Explore Portal With Authorized Role</h3>
            <p className="text-xs text-slate-500">Test how permissions, dashboards, and access gate adapt live</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => loginAsRole('resident', 'usr-001')}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Resident (Flat A-402)
          </button>
          <button
            onClick={() => loginAsRole('resident', 'usr-010')}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            title="Experience Pending Approval verification state"
          >
            Pending User (B-503)
          </button>
          <button
            onClick={() => loginAsRole('supervisor', 'usr-004')}
            className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Supervisor
          </button>
          <button
            onClick={() => loginAsRole('mc_member', 'usr-002')}
            className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            MC Member
          </button>
          <button
            onClick={() => loginAsRole('admin', 'usr-003')}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Admin (Full Access)
          </button>
        </div>
      </div>

      {/* Public Notices Banner */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-teal-700" />
            <h2 className="text-xl font-bold text-slate-900">Public Society Notices & Announcements</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">Updated for Baner / Pashan Estate</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {notices.map((n) => (
            <div
              key={n.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-semibold text-teal-700 uppercase tracking-wider">{n.category}</span>
                  <span className="text-slate-400 tabular-nums">{n.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{n.title}</h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{n.summary}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Notice Board</span>
                <button
                  onClick={onOpenLogin}
                  className="text-teal-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Login to View</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Society Amenities Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Estate Amenities & Operations</h2>
            <p className="text-xs text-slate-500">Available to verified residents across Towers A & B</p>
          </div>
          <button
            onClick={onOpenLogin}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Book Slot via Portal &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="h-44 relative overflow-hidden">
              <img src={poolImage} alt="Swimming Pool" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-teal-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                <Waves className="w-3.5 h-3.5" />
                <span>Swimming Pool</span>
              </div>
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Timings: 06:00 - 10:00 & 16:00 - 21:00</span>
                <span className="text-amber-600 font-semibold">Mon Closed</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Semi-Olympic swimming pool with ozonated filtration. Strict nylon/lycra swimwear is mandatory. Max 2 outside guests allowed per flat.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="h-44 relative overflow-hidden">
              <img src={gymImage} alt="Gymnasium" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-teal-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Modern Fitness Gym</span>
              </div>
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Timings: 05:00 - 22:00 Daily</span>
                <span className="text-emerald-600 font-semibold">Open 7 Days</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full strength & cardio equipment, motorized treadmills, and cross-trainers. Clean indoor-only sports shoes and gym towels required.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="h-44 bg-gradient-to-br from-teal-900 to-slate-900 p-6 flex flex-col justify-end text-white">
              <div className="bg-teal-500/30 text-teal-300 w-fit px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Clubhouse Banquet</span>
              </div>
              <h3 className="text-lg font-bold">Community Banquet & Party Lawn</h3>
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Slot: 10:00 - 15:00 & 16:00 - 21:30</span>
                <span className="text-slate-600 font-semibold">₹5,000 Deposit</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Host birthdays, anniversaries, and family get-togethers. Music cut-off strictly at 22:00 PM per Pune Police bylaws.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 1 Flat 1 Member & Security Overview */}
      <div className="bg-teal-50/70 border border-teal-200/80 rounded-3xl p-8 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">Governance Standards</span>
          <h2 className="text-2xl font-bold text-slate-900">Single Member Per Flat Security & FastTag Access</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To prevent unauthorized voting proxies and maintain accurate occupancy records, Solitaire CHS enforces a strict <strong>1 registered user account per flat</strong> constraint. All registered vehicles are tracked via RFID FastTag for seamless boom barrier entry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-xs space-y-2">
            <div className="p-2 bg-teal-100/60 text-teal-800 rounded-lg w-fit">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Predefined Flats (101 - 1504)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              120 flats across 15 residential floors in Towers A & B. Zero duplicates allowed.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-xs space-y-2">
            <div className="p-2 bg-teal-100/60 text-teal-800 rounded-lg w-fit">
              <Car className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">FastTag / RFID Automated Gate</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Resident vehicles with verified society stickers & FastTags enter without manual guard logs.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-xs space-y-2">
            <div className="p-2 bg-teal-100/60 text-teal-800 rounded-lg w-fit">
              <UserCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">MC Verification Gatekeeper</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every registration is scrutinized by Committee Members before unlocking member privileges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
