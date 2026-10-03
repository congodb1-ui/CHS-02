import React from 'react';
import { useSociety } from '../context/SocietyContext';
import {
  X,
  ShieldCheck,
  User,
  Wrench,
  Building,
  KeyRound,
  CheckCircle2,
  Lock,
  Eye,
  Check,
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { role, setRole, setActiveTab } = useSociety();

  if (!isOpen) return null;

  const roleProfiles = [
    {
      id: 'member' as UserRole,
      title: 'Resident Member (Owner / Tenant)',
      persona: 'Rajesh Sharma (Flat A-402)',
      badge: 'Member Access',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description: 'Book society amenities, log flat maintenance service requests, apply for tenant move-in NOCs, and view live daily society walkthrough audits in transparency mode.',
      permissions: [
        'Book Swimming Pool, Gym & Clubhouse Slots',
        'Log Plumbing, Electrical & Lift Complaints',
        'Apply for Tenant Move-In & Parking FastTag',
        'View Verified Daily Inspection & Water Audits (Read-Only)',
        'Ask Solitaire AI Resident Assistant for Bye-Laws & Rules',
      ],
      restrictions: [
        'Cannot edit supervisor daily inspection checklist',
        'Cannot alter staff daily attendance records',
        'Cannot approve/reject tenant NOC applications',
        'CANNOT access AMC Vendor Register or MC Financial Ledgers',
      ],
      actionTab: 'home',
    },
    {
      id: 'supervisor' as UserRole,
      title: 'Facility Supervisor',
      persona: 'Parvez (Field Operations Desk)',
      badge: 'Ground Operations',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      description: 'Conducts morning & evening physical estate walkthroughs. Logs real-time status of 33 checkpoints and marks daily attendance for all 23 staff members.',
      permissions: [
        'Live edit & submit 33-point daily inspection checklist',
        'Mark daily P/A/WO/HD attendance for all 23 personnel',
        '1-click auto-escalate inspection defects to Helpdesk tickets',
        'Record water meter, OHT tank, STP & DG fuel levels',
      ],
      restrictions: [
        'CANNOT access society bank accounts, sinking funds, or AMC contracts',
        'Cannot approve tenant NOC clearances',
        'Cannot sign off on estate admin verification comments',
      ],
      actionTab: 'inspection',
    },
    {
      id: 'secretary' as UserRole,
      title: 'Secretary (Managing Committee)',
      persona: 'Pooja Hegde-Patil (Secretary) & MC Members',
      badge: 'Executive MC Clearance',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
      description: 'Full Managing Committee governance: monitors supervisor walkthroughs in real-time, signs off on inspections, approves tenant NOC clearances, and accesses confidential AMC contracts & financials.',
      permissions: [
        'Full Access to Vendor AMC Register & Annual Contracts',
        'Full Access to MC Financial Statements & Sinking Fund Ledgers',
        'Live oversight of supervisor walkthroughs & flagged issues',
        'Approve or Reject Tenant Move-In applications & police NOCs',
        'Assign specialized AMC vendors to open complaints',
      ],
      restrictions: [
        'All committee decisions logged with digital audit trail',
      ],
      actionTab: 'committee',
    },
    {
      id: 'admin' as UserRole,
      title: 'Society Office Admin & Chairman',
      persona: 'Soleha Khan (Estate Admin) & Sanjeev Mathur (Chairman)',
      badge: 'Full Master Admin',
      badgeColor: 'bg-slate-900 text-white border-slate-700',
      description: 'Complete administrative authority: signs off daily supervisor checklists with admin remarks, manages master financials, vendor AMC registers, and system configuration.',
      permissions: [
        'Full Access to AMC Vendor SLA Register & Financial Statements',
        'Admin verification signoff on daily supervisor inspection reports',
        'Full edit & management of all complaints, bookings, and tenants',
        'System configuration & Google Sheets 2-way data bridge',
      ],
      restrictions: [],
      actionTab: 'inspection',
    },
  ];

  const handleSelect = (selectedRole: UserRole, targetTab: string) => {
    setRole(selectedRole);
    setActiveTab(targetTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-600 rounded-lg">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Role-Based Access Control & Member Login</h2>
              <p className="text-xs text-slate-300">
                KOOL HOMES SOLITAIRE CO-OP HOUSING SOCIETY LTD. · Multi-Tier Permission Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Strip */}
        <div className="p-4 bg-teal-50 border-b border-teal-100 flex items-start gap-2.5 text-xs text-teal-900">
          <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Role-Separated Security:</span> Each society role receives strictly restricted options on the website. Switch between profiles below to experience how permissions, editable forms, and read-only views adapt live!
          </div>
        </div>

        {/* Roles Grid */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roleProfiles.map((p) => {
              const isCurrent = role === p.id;
              return (
                <div
                  key={p.id}
                  className={`p-5 rounded-xl border transition-all flex flex-col justify-between space-y-4 ${
                    isCurrent
                      ? 'border-teal-600 bg-teal-50/20 shadow-xs ring-1 ring-teal-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border inline-block mb-1 ${p.badgeColor}`}>
                          {p.badge}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{p.title}</h3>
                        <p className="text-xs font-semibold text-teal-700">{p.persona}</p>
                      </div>
                      {isCurrent && (
                        <span className="text-[11px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full shrink-0">
                          Active Now
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {p.description}
                    </p>

                    {/* Permissions list */}
                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        What this user CAN do:
                      </span>
                      {p.permissions.map((perm, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{perm}</span>
                        </div>
                      ))}
                    </div>

                    {/* Restrictions list */}
                    {p.restrictions.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 block">
                          Restrictions (Protected):
                        </span>
                        {p.restrictions.map((restr, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-500">
                            <Lock className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                            <span>{restr}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleSelect(p.id, p.actionTab)}
                    className={`w-full py-2 px-4 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-teal-700 text-white hover:bg-teal-800'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {isCurrent ? 'Continue in this Profile' : `Switch to ${p.title}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Active Session ID: <strong className="font-mono text-slate-700">SOL-AUTH-{role.toUpperCase()}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
