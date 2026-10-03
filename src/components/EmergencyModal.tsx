import React from 'react';
import { useSociety } from '../context/SocietyContext';
import { X, Phone, ShieldAlert, Wrench, Zap, Building2, Flame, HeartPulse } from 'lucide-react';

export const EmergencyModal: React.FC = () => {
  const { isEmergencyOpen, setIsEmergencyOpen } = useSociety();

  if (!isEmergencyOpen) return null;

  const contacts = [
    {
      category: 'Society Gate & Security',
      items: [
        { name: 'Security Main Gate A (Vehicular)', phone: '+91 20 2748 1101', role: '24/7 Guard Station' },
        { name: 'Security Gate B (Pedestrian / Delivery)', phone: '+91 20 2748 1102', role: '24/7 Guard Station' },
        { name: 'Prem Singh (Security Supervisor)', phone: '+91 98220 54101', role: 'On-Duty Security Head' },
      ],
    },
    {
      category: 'Critical Utilities & Technical Breakdown',
      items: [
        { name: 'Otis 24/7 Elevator Emergency Helpline', phone: '1800 233 6847', role: 'Passenger Trap Rescue' },
        { name: 'Estate Electrician (Sunil)', phone: '+91 97663 55219', role: 'Phase & DG Changeover' },
        { name: 'Estate Plumber (Ramesh)', phone: '+91 98201 44521', role: 'Main Valve / Burst Leak' },
        { name: 'Estate Manager (Mr. K. Verma)', phone: '+91 98900 12890', role: 'Admin & Escalations' },
      ],
    },
    {
      category: 'Civic & Emergency Services',
      items: [
        { name: 'Local Fire Brigade Station', phone: '101 / +91 20 2550 6300', role: 'Disaster Response' },
        { name: 'Nearest Hospital & Trauma Care (LifeLine)', phone: '+91 20 6620 9000', role: 'Ambulance & Emergency' },
        { name: 'Chaturshringi Police Station', phone: '100 / +91 20 2565 2400', role: 'Jurisdiction Law Enforcement' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-600/90 rounded-lg text-white">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">24/7 Society Emergency Directory</h2>
              <p className="text-xs text-slate-300">Solitaire Cooperative Housing Society Ltd.</p>
            </div>
          </div>
          <button
            onClick={() => setIsEmergencyOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 text-xs text-amber-900">
            <span className="font-semibold shrink-0">Priority Protocol:</span>
            <span>
              In case of lift entrapment or major water pipe rupture, alert Security Gate A immediately.
              All elevators feature an Automatic Rescue Device (ARD) and direct intercom.
            </span>
          </div>

          {contacts.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-100">
                {group.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {group.items.map((contact, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{contact.name}</p>
                      <p className="text-[11px] text-slate-500 mb-2">{contact.role}</p>
                    </div>
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5 text-teal-600" />
                      <span>{contact.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Security Control Room: Tower A Basement Station</span>
          <button
            onClick={() => setIsEmergencyOpen(false)}
            className="px-4 py-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
