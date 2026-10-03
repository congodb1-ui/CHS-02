import React, { useState } from 'react';
import { useSociety } from '../../context/SocietyContext';
import {
  Droplets,
  Zap,
  Activity,
  Calendar,
  FileCheck,
  Truck,
  Plus,
  Gauge,
  Clock,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { TankCleaningRecord } from '../../types';
import { WaterReportModal } from '../WaterReportModal';

export const UtilitiesView: React.FC = () => {
  const {
    tankers,
    addTankerLog,
    tankCleanings,
    dgLogs,
    role,
  } = useSociety();

  const [selectedReport, setSelectedReport] = useState<TankCleaningRecord | null>(null);
  const [showTankerForm, setShowTankerForm] = useState(false);

  // New tanker form state
  const [vendor, setVendor] = useState('Sai Sagar Water Carriers');
  const [capacity, setCapacity] = useState(15000);
  const [cost, setCost] = useState(1650);
  const [source, setSource] = useState<'Municipal Line Shortfall' | 'Borewell Assist' | 'Scheduled Buffer'>('Municipal Line Shortfall');
  const [guardName, setGuardName] = useState('Security Station A (Prem Singh)');

  const stpImage = '/src/assets/images/utility_water_stp_1790929998273.jpg';

  const handleTankerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    addTankerLog({
      date: today,
      time: timeStr,
      vendor,
      capacityLiters: Number(capacity) || 15000,
      cost: Number(cost) || 1650,
      source,
      receivedByGuard: guardName,
    });

    setShowTankerForm(false);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
            Critical Infrastructure & Sustainability
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Water, STP & 24/7 DG Energy Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Real-time telemetry and compliance audit logs for Solitaire CHS. Monitoring decentralized sewage treatment, dual domestic water lines, and automatic generator readiness.
          </p>
        </div>
      </div>

      {/* STP & Water Treatment Spotlight */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[300px] overflow-hidden bg-slate-900">
          <img
            src={stpImage}
            alt="Solitaire STP Plant"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
              Environmental Compliance
            </span>
            <p className="text-base font-bold">Tertiary MBBR Sewage Treatment Plant</p>
            <p className="text-xs text-slate-300">CleanAqua BioTech Automated Operations</p>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 sm:p-7 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                Eco-Sustainability Metrics
              </span>
              <h2 className="text-xl font-bold text-slate-900">STP Operational Telemetry</h2>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Active & Recycled
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Treated Today</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">48,200 L</span>
              <span className="text-[11px] text-emerald-700 font-medium block">100% Recycled</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Recycled Reserve</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">60,000 L</span>
              <span className="text-[11px] text-slate-500 block">Holding Tank Full</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Output TDS</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">310 ppm</span>
              <span className="text-[11px] text-emerald-700 font-medium block">Clear & Odorless</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Aeration Basin</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">2.8 mg/L</span>
              <span className="text-[11px] text-slate-500 block">Dissolved Oxygen</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <p className="font-semibold text-slate-800">Recycled Water Distribution Pathways:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-md border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dual Flush Cisterns in all Towers A & B units</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-md border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automated perimeter garden drip irrigation (5 PM)</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Last Chemical Dosing: Oct 01, 2026 · Enzyme Batch #41</span>
            <span className="text-teal-700 font-semibold">Next Bi-weekly Lab Test: Oct 14</span>
          </div>
        </div>
      </div>

      {/* Water Supply Schedule & Tank Cleaning Logs (Section 1 from Brief) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Daily Supply & Tank Cleaning Compliance */}
        <div className="lg:col-span-7 space-y-6">
          {/* Supply Timings Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
                  Municipal & Sump Lines
                </span>
                <h2 className="text-lg font-bold text-slate-900">Daily Water Supply Schedule</h2>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-md">
                Automatic Valve Automation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-sky-50/60 border border-sky-100 rounded-lg">
                <div className="flex items-center gap-2 font-bold text-sky-900 mb-1">
                  <Clock className="w-4 h-4 text-sky-700" />
                  <span>Morning Shift: 06:00 AM – 09:00 AM</span>
                </div>
                <p className="text-[11px] text-sky-800">
                  Main overhead pressure boosters active. High flow across Towers A & B kitchens and domestic bathrooms.
                </p>
              </div>

              <div className="p-3.5 bg-sky-50/60 border border-sky-100 rounded-lg">
                <div className="flex items-center gap-2 font-bold text-sky-900 mb-1">
                  <Clock className="w-4 h-4 text-sky-700" />
                  <span>Evening Shift: 06:00 PM – 09:00 PM</span>
                </div>
                <p className="text-[11px] text-sky-800">
                  Secondary domestic distribution active. Sump replenished from municipal connection and buffer reservoir.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              *Note: The recycled STP line for toilet flushes remains pressurized 24/7 through dedicated pneumatic booster hydro-pneumatic (HNS) pumps.
            </p>
          </div>

          {/* Water Tank Cleaning Logs & Inspection Reports */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
                  Public Compliance Log
                </span>
                <h2 className="text-lg font-bold text-slate-900">Water Tank Cleaning & Lab Test Records</h2>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                100% Certified Safe
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Statutory hygiene compliance mandated under Maharashtra Co-operative Societies Act. Click any record to inspect the official laboratory potability report.
            </p>

            <div className="divide-y divide-slate-100">
              {tankCleanings.map((tank) => (
                <div key={tank.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{tank.tankName}</span>
                    <span className="text-slate-500 text-[11px]">
                      Capacity: <strong className="tabular-nums">{tank.capacityLiters.toLocaleString()} L</strong> · Last Cleaned: <span className="tabular-nums font-semibold text-slate-700">{tank.lastCleaned}</span>
                    </span>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>TDS: <strong className="tabular-nums text-slate-800">{tank.tdsReading} ppm</strong></span>
                      <span>·</span>
                      <span>pH: <strong className="tabular-nums text-slate-800">{tank.phValue}</strong></span>
                      <span>·</span>
                      <span className="text-emerald-700 font-semibold">{tank.bacteriologicalTest}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedReport(tank)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>View Lab Report</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tanker Tracker & Emergency Buffer */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
                  Transparency Ledger
                </span>
                <h2 className="text-lg font-bold text-slate-900">Tanker Tracker Logs</h2>
              </div>
              <button
                onClick={() => setShowTankerForm(!showTankerForm)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-md transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Tanker</span>
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Live delivery records verified by Security Gate A to monitor municipal line shortfalls and water purchase expenses.
            </p>

            {/* Tanker Form Modal/Accordion */}
            {showTankerForm && (
              <form onSubmit={handleTankerSubmit} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">Record Inward Tanker Delivery</span>
                <div>
                  <label className="block text-slate-600 mb-0.5">Vendor Name / Tanker #</label>
                  <input
                    type="text"
                    required
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    className="w-full p-1.5 text-xs rounded border border-slate-300 bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 mb-0.5">Capacity (Liters)</label>
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(parseInt(e.target.value) || 15000)}
                      className="w-full p-1.5 text-xs rounded border border-slate-300 bg-white tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-0.5">Cost (₹)</label>
                    <input
                      type="number"
                      value={cost}
                      onChange={(e) => setCost(parseInt(e.target.value) || 1650)}
                      className="w-full p-1.5 text-xs rounded border border-slate-300 bg-white tabular-nums"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 mb-0.5">Supply Justification</label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value as any)}
                    className="w-full p-1.5 text-xs rounded border border-slate-300 bg-white"
                  >
                    <option value="Municipal Line Shortfall">Municipal Line Shortfall</option>
                    <option value="Borewell Assist">Borewell Assist</option>
                    <option value="Scheduled Buffer">Scheduled Buffer (Weekend Peak)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 mb-0.5">Received By (Security / Staff)</label>
                  <input
                    type="text"
                    value={guardName}
                    onChange={(e) => setGuardName(e.target.value)}
                    className="w-full p-1.5 text-xs rounded border border-slate-300 bg-white"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTankerForm(false)}
                    className="px-2.5 py-1 text-slate-600 text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-teal-700 text-white rounded font-medium text-xs cursor-pointer"
                  >
                    Save Log
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {tankers.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{t.vendor}</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                      {t.status}
                    </span>
                  </div>
                  <div className="text-slate-600 flex justify-between">
                    <span>Capacity: <strong className="tabular-nums text-slate-900">{t.capacityLiters.toLocaleString()} L</strong></span>
                    <span>
                      Cost:{' '}
                      <strong className="tabular-nums text-slate-900">
                        {role === 'secretary' || role === 'admin' ? `₹${t.cost.toLocaleString()}` : 'Confidential (MC/Admin)'}
                      </strong>
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-slate-100">
                    <span>{t.date} · {t.time}</span>
                    <span className="text-slate-400 truncate max-w-[160px]">{t.receivedByGuard}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 24/7 Generator (DG) Backup Section (Section 1 from Brief) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Power Continuity Architecture
            </span>
            <h2 className="text-xl font-bold text-slate-900">24/7 Diesel Generator (DG) Backup Center</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Twin 350 kVA soundproof acoustic generators with automatic mains failure (AMF) panel. Powers all 6 passenger lifts, water booster sumps, stairwell emergency illuminations, and 2 designated points per flat.
            </p>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 shrink-0">
            <Gauge className="w-8 h-8 text-amber-600" />
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 block">Fuel Tank Level</span>
              <span className="text-xl font-bold text-slate-900 tabular-nums">82% Full</span>
              <span className="text-[11px] text-slate-500 block">2,100 L Diesel in Sump</span>
            </div>
          </div>
        </div>

        {/* DG Specs & Maintenance Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Engine Configuration</span>
            <p className="font-bold text-slate-900">Cummins QSL9-G5 Turbocharged</p>
            <p className="text-slate-500">Twin synchronised generator sets (Total 700 kVA capacity)</p>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Cutover Latency</span>
            <p className="font-bold text-slate-900 tabular-nums">7.2 Seconds</p>
            <p className="text-slate-500">Zero-downtime transition with computerized motorized breakers</p>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <span className="text-slate-400 block text-[11px] uppercase font-semibold">Next Scheduled Servicing</span>
            <p className="font-bold text-slate-900">Nov 14, 2026</p>
            <p className="text-amber-700 font-medium">B-Check Service (Oil & Fuel filters change)</p>
          </div>
        </div>

        {/* DG Outage & Operational Logs Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Grid Outage & DG Runtime Audit Log
          </h3>
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Date & Time</th>
                  <th className="py-2.5 px-3">Grid Outage Cause</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Diesel Consumed</th>
                  <th className="py-2.5 px-3">Tank Level After</th>
                  <th className="py-2.5 px-3">Logged By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dgLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900 tabular-nums whitespace-nowrap">{log.date}</td>
                    <td className="py-2.5 px-3 text-slate-700">{log.outageCause}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 tabular-nums whitespace-nowrap">{log.durationMinutes} mins</td>
                    <td className="py-2.5 px-3 tabular-nums font-semibold text-amber-800 whitespace-nowrap">{log.dieselConsumedLiters} Liters</td>
                    <td className="py-2.5 px-3 tabular-nums font-bold text-slate-900 whitespace-nowrap">{log.fuelLevelAfterPercent}%</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px] whitespace-nowrap">{log.loggedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Water Report Inspection Modal */}
      {selectedReport && (
        <WaterReportModal
          record={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
};
