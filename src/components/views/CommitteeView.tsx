import React, { useState } from 'react';
import { useSociety } from '../../context/SocietyContext';
import {
  Users,
  FileText,
  Download,
  Shield,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Building,
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  Lock,
  Unlock,
} from 'lucide-react';
import { COMMITTEE_MEMBERS } from '../../data/initialData';

export const CommitteeView: React.FC = () => {
  const { amcs, role, setRole } = useSociety();
  const [activeSection, setActiveSection] = useState<'governance' | 'vault' | 'admin'>('governance');

  const vaultDocuments = [
    {
      id: 'DOC-01',
      title: 'Model Bye-Laws of Solitaire Co-operative Housing Society Ltd.',
      category: 'Governance & Legal',
      size: '2.4 MB',
      date: 'Adopted 2018 (Amended 2024)',
      filename: 'Solitaire_CHS_Registered_Byelaws_2024.pdf',
    },
    {
      id: 'DOC-02',
      title: '13th Annual General Meeting (AGM) Minutes & Resolutions',
      category: 'General Body Minutes',
      size: '1.8 MB',
      date: 'Sep 29, 2025',
      filename: 'AGM_Minutes_13th_General_Body_2025.pdf',
    },
    {
      id: 'DOC-03',
      title: 'Statutory Water Quality Lab Certificate (IS 10500 Potability)',
      category: 'Compliance & Safety',
      size: '890 KB',
      date: 'Jul 15, 2026',
      filename: 'Water_Quality_Lab_Report_Jul2026.pdf',
    },
    {
      id: 'DOC-04',
      title: 'Flat Renovation & Interior Civil Work NOC Undertaking Form',
      category: 'Resident Forms',
      size: '540 KB',
      date: 'Updated Aug 2026',
      filename: 'NOC_Flat_Renovation_Undertaking.pdf',
    },
    {
      id: 'DOC-05',
      title: 'Tenant Verification & Elevator Shifting Guidelines',
      category: 'Tenancy',
      size: '620 KB',
      date: 'Updated Sep 2026',
      filename: 'Tenant_Onboarding_Shift_Guidelines.pdf',
    },
    {
      id: 'DOC-06',
      title: 'Audited Financial Balance Sheet & Sinking Fund Statement',
      category: 'Financial Accounts',
      size: '3.1 MB',
      date: 'FY 2025 – 2026',
      filename: 'Audited_Financial_Statement_FY25_26.pdf',
    },
  ];

  const handleDownload = (filename: string) => {
    alert(`Simulated Download: ${filename} is downloaded successfully.`);
  };

  const isAuthorized = role === 'secretary' || role === 'admin';

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Cooperative Governance & Compliance
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Managing Committee & Document Vault
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Elected office bearers for the 2024–2027 term, official society bye-laws, financial transparency disclosures, and vendor contract registers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isAuthorized ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>AMC & Financials Restricted</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold">
                <Unlock className="w-3.5 h-3.5 text-teal-600" />
                <span>{role === 'secretary' ? 'Secretary MC Clearance Active' : 'Estate Admin Clearance Active'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg max-w-xl">
          <button
            onClick={() => setActiveSection('governance')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeSection === 'governance'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Office Bearers
          </button>
          <button
            onClick={() => setActiveSection('vault')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeSection === 'vault'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Document Vault (PDFs)
          </button>
          <button
            onClick={() => setActiveSection('admin')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'admin'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>MC Financial & AMC Register</span>
            {!isAuthorized && <Lock className="w-3 h-3 text-amber-600" />}
          </button>
        </div>
      </div>

      {/* Section 1: Office Bearers */}
      {activeSection === 'governance' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Elected Managing Committee (2024 – 2027)</h2>
            <p className="text-xs text-slate-500">
              Reach out to portfolio heads during designated consultation hours at the Society Estate Office (Clubhouse Level 1).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMITTEE_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                      <span className="text-xs font-semibold text-teal-700 block">
                        {member.designation}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {member.flat}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {member.portfolio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Office: {member.officeHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-700 font-medium">{member.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Document Vault */}
      {activeSection === 'vault' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Official Society Document Vault</h2>
              <p className="text-xs text-slate-500">
                Download verified statutory copies of Bye-Laws, audited returns, and application templates.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              6 Statutory Files Available
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {vaultDocuments.map((doc) => (
              <div
                key={doc.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors rounded-lg px-2"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-100 text-slate-700 rounded-lg shrink-0 mt-0.5">
                    <FileText className="w-5 h-5 text-teal-700" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">{doc.title}</span>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{doc.category}</span>
                      <span>·</span>
                      <span className="tabular-nums">{doc.date}</span>
                      <span>·</span>
                      <span className="tabular-nums font-mono text-[11px]">{doc.size}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(doc.filename)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Download PDF</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: MC Financial & AMC Register (Strictly restricted to Admin and Secretary / MC Member) */}
      {activeSection === 'admin' && (
        !isAuthorized ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-amber-600" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/60 px-2.5 py-0.5 rounded">
                Strict Society Confidentiality Protocol
              </span>
              <h3 className="text-xl font-bold text-slate-900">Access Restricted: AMC Contracts & MC Financials</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                Under the Maharashtra Co-operative Societies Act and Solitaire CHS Bye-Laws, the <strong>Vendor Annual Maintenance Contracts (AMC)</strong>, quarterly collections ledger, and Sinking Fund bank accounts are strictly accessible only by the <strong>Society Admin</strong> and <strong>Managing Committee (Secretary)</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 max-w-md mx-auto space-y-1.5 text-left">
              <div className="flex justify-between">
                <span>Active User Role:</span>
                <strong className="text-slate-900 capitalize">{role}</strong>
              </div>
              <div className="flex justify-between">
                <span>Required Clearances:</span>
                <span className="font-semibold text-teal-800">Secretary / Admin</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5 text-[11px] text-slate-500">
                <span>Access Status:</span>
                <span className="text-red-600 font-semibold">Access Denied for Members & Supervisors</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Switch to <strong>&ldquo;Secretary&rdquo;</strong> or <strong>&ldquo;Admin&rdquo;</strong> in the top-right header role switcher to review authorized files.
            </p>
          </div>
        ) : (
        <div className="space-y-8">
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Maintenance Collected</span>
              <span className="text-2xl font-bold text-slate-900 tabular-nums">94.2%</span>
              <span className="text-xs text-emerald-700 font-semibold block">₹8,48,000 for Current Quarter</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Sinking Fund Reserve</span>
              <span className="text-2xl font-bold text-slate-900 tabular-nums">₹42.50 Lakh</span>
              <span className="text-xs text-slate-500 block">Invested in Scheduled Bank FDs</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Water & STP Expenditure</span>
              <span className="text-2xl font-bold text-slate-900 tabular-nums">₹48,200</span>
              <span className="text-xs text-slate-500 block">Chemical dosing + 3 buffer tankers</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">DG Diesel Consumed</span>
              <span className="text-2xl font-bold text-slate-900 tabular-nums">₹12,400</span>
              <span className="text-xs text-slate-500 block">138 Liters for grid power cuts</span>
            </div>
          </div>

          {/* AMC Vendor Register Table */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Vendor AMC Register & Contract SLA Register</h2>
                <p className="text-xs text-slate-500">
                  Annual maintenance contracts covering elevators, STP plant, Cummins generator, and pool hygiene.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-md border border-teal-200">
                5 Active Annual Contracts
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Service / Plant</th>
                    <th className="py-2.5 px-3">Vendor Agency</th>
                    <th className="py-2.5 px-3">Contract Person & Phone</th>
                    <th className="py-2.5 px-3">Contract Validity</th>
                    <th className="py-2.5 px-3">Annual Fee</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {amcs.map((amc) => (
                    <tr key={amc.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block">{amc.serviceName}</span>
                        <span className="text-[11px] text-slate-500">{amc.frequency}</span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{amc.vendorCompany}</td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-slate-900 block">{amc.contactPerson}</span>
                        <span className="text-[11px] text-teal-700 font-mono">{amc.phone}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="tabular-nums font-medium text-slate-800 block">
                          {amc.startDate} to {amc.expiryDate}
                        </span>
                      </td>
                      <td className="py-3 px-3 tabular-nums font-bold text-slate-900">
                        ₹{amc.annualFee.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        {amc.status === 'Active' ? (
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                            Active
                          </span>
                        ) : (
                          <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                            Expiring Soon
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )
      )}
    </div>
  );
};
