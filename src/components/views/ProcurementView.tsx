import React, { useState } from 'react';
import { useSociety } from '../../context/SocietyContext';
import {
  Briefcase,
  FileCheck,
  DollarSign,
  TrendingUp,
  Percent,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Lock,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  Wrench,
  Download,
  Filter,
  Search,
} from 'lucide-react';
import { WorkOrder, VendorQuote, PaymentStage } from '../../types';

export const ProcurementView: React.FC = () => {
  const {
    role,
    workOrders,
    quotes,
    vendors,
    addVendorQuote,
    approveQuoteAndReleaseWorkOrder,
    updateWorkOrderProgress,
    addWorkOrderPayment,
    userName,
  } = useSociety();

  const [activeTab, setActiveTab] = useState<'work_orders' | 'quotes' | 'vendors'>('work_orders');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState<string | null>(null); // workOrderId
  const [showReleaseModal, setShowReleaseModal] = useState<VendorQuote | null>(null);

  // New Quote Form
  const [projectTitle, setProjectTitle] = useState('Podium Expansion Joint Waterproofing');
  const [projectId, setProjectId] = useState('PRJ-CIVIL-2026');
  const [quoteVendorId, setQuoteVendorId] = useState(vendors[0]?.id || '');
  const [quoteAmount, setQuoteAmount] = useState<number>(185000);
  const [quoteDays, setQuoteDays] = useState<number>(15);
  const [quoteWarranty, setQuoteWarranty] = useState<number>(24);
  const [quoteScope, setQuoteScope] = useState('High-pressure PU chemical grouting across 45 running meters of podium expansion joints.');
  const [quoteNotes, setQuoteNotes] = useState('Competitive quote submitted following joint technical walkthrough with Secretary.');

  // Release WO form state
  const [woStartDate, setWoStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [woTargetDate, setWoTargetDate] = useState(
    new Date(Date.now() + 21 * 24 * 3600 * 1000).toISOString().split('T')[0]
  );

  // Payment Form State
  const [paymentType, setPaymentType] = useState<PaymentStage>('Milestone 1');
  const [paymentAmount, setPaymentAmount] = useState<number>(50000);
  const [paymentMode, setPaymentMode] = useState<'NEFT / RTGS' | 'Cheque' | 'Society Bank Portal'>('NEFT / RTGS');
  const [paymentUtr, setPaymentUtr] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');

  const isAuthorized = role === 'secretary' || role === 'admin';

  // Overall Financial Calculations
  const totalCommittedAmount = workOrders.reduce((sum, wo) => sum + wo.totalApprovedAmount, 0);
  const totalDisbursedAmount = workOrders.reduce((sum, wo) => {
    return sum + wo.payments.reduce((pSum, p) => pSum + p.amountPaid, 0);
  }, 0);
  const totalBalanceDue = Math.max(0, totalCommittedAmount - totalDisbursedAmount);

  const filteredWorkOrders = workOrders.filter((wo) => {
    const matchesCategory = selectedCategory === 'All' || wo.category === selectedCategory;
    const matchesSearch =
      wo.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.procurementTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const vendorObj = vendors.find((v) => v.id === quoteVendorId) || vendors[0];
    addVendorQuote({
      procurementProjectId: projectId,
      projectTitle,
      vendorId: quoteVendorId,
      vendorName: vendorObj.name,
      quotedAmount: Number(quoteAmount) || 100000,
      estimatedDays: Number(quoteDays) || 10,
      warrantyMonths: Number(quoteWarranty) || 12,
      scopeOfWork: quoteScope,
      committeeNotes: quoteNotes,
    });
    setShowNewQuoteModal(false);
  };

  const handleConfirmReleaseWO = () => {
    if (!showReleaseModal) return;
    approveQuoteAndReleaseWorkOrder(showReleaseModal.id, woStartDate, woTargetDate);
    setShowReleaseModal(null);
    setActiveTab('work_orders');
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPaymentModal) return;
    const utr = paymentUtr || `HDFC0000241N${Math.floor(100000 + Math.random() * 900000)}`;
    addWorkOrderPayment(showPaymentModal, {
      paymentDate: new Date().toISOString().split('T')[0],
      paymentType,
      amountPaid: Number(paymentAmount) || 10000,
      paymentMode,
      referenceUtr: utr,
      approvedBy: userName || 'MC Treasurer & Secretary',
      notes: paymentNotes || `${paymentType} disbursement released after physical inspection.`,
    });
    setShowPaymentModal(null);
    setPaymentAmount(50000);
    setPaymentUtr('');
    setPaymentNotes('');
  };

  // Helper for individual Work Order calculations
  const calculateWoFinancials = (wo: WorkOrder) => {
    const totalPaid = wo.payments.reduce((sum, p) => sum + p.amountPaid, 0);
    const balanceDue = Math.max(0, wo.totalApprovedAmount - totalPaid);
    let status: 'Unpaid' | 'Partially Paid' | 'Fully Paid' = 'Unpaid';
    if (totalPaid >= wo.totalApprovedAmount) {
      status = 'Fully Paid';
    } else if (totalPaid > 0) {
      status = 'Partially Paid';
    }
    return { totalPaid, balanceDue, status };
  };

  if (!isAuthorized) {
    return (
      <div className="space-y-8 pb-16">
        <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7 text-amber-600" />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/60 px-2.5 py-0.5 rounded">
              Confidential MC Procurement Engine
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Access Restricted: Vendor Procurement & Work Orders
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              Vendor quotation evaluations, official Work Order release authorizations, and society payment ledgers are confidential and restricted strictly to <strong>Society Admin</strong> and <strong>Managing Committee (Secretary)</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 max-w-md mx-auto space-y-1.5 text-left">
            <div className="flex justify-between">
              <span>Active Role:</span>
              <strong className="text-slate-900 capitalize">{role}</strong>
            </div>
            <div className="flex justify-between">
              <span>Required Clearance:</span>
              <span className="font-semibold text-teal-800">Secretary / Admin</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-1.5 text-[11px] text-slate-500">
              <span>Permission Status:</span>
              <span className="text-red-600 font-semibold">Access Denied for Members & Supervisors</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Switch to <strong>&ldquo;Secretary (Pooja Hegde)&rdquo;</strong> or <strong>&ldquo;Society Admin&rdquo;</strong> in the top-right header role switcher to review procurement and disbursements.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                KOOL HOMES SOLITAIRE CO-OP HOUSING SOCIETY LTD.
              </span>
              <span className="text-[10px] font-semibold bg-teal-50 border border-teal-200 text-teal-800 px-2 py-0.5 rounded">
                Pure Supabase Operations Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Vendor Procurement & Work Order Lifecycle Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Multi-vendor quotes evaluation, official Work Order release (WO-2026-XXX), real-time progress tracking ($0\% - 100\%$), and dynamic payment ledger with automated balance calculation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowNewQuoteModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit New Quote</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Total Approved Procurement
            </span>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
              ₹{totalCommittedAmount.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-500">Across {workOrders.length} released work orders</p>
          </div>

          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Total Disbursed (Paid)
            </span>
            <p className="text-2xl font-extrabold text-emerald-900 tabular-nums">
              ₹{totalDisbursedAmount.toLocaleString()}
            </p>
            <p className="text-[11px] text-emerald-700">Advances & milestone releases</p>
          </div>

          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
              Outstanding Balance Due
            </span>
            <p className="text-2xl font-extrabold text-amber-900 tabular-nums">
              ₹{totalBalanceDue.toLocaleString()}
            </p>
            <p className="text-[11px] text-amber-700">Payable upon milestone verification</p>
          </div>

          <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider">
              Active In-Progress Works
            </span>
            <p className="text-2xl font-extrabold text-teal-900 tabular-nums">
              {workOrders.filter((w) => w.workStatus === 'In Progress').length} / {workOrders.length}
            </p>
            <p className="text-[11px] text-teal-700">STP, Lift rope & LED retrofit</p>
          </div>
        </div>

        {/* Segmented Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg max-w-md">
          <button
            onClick={() => setActiveTab('work_orders')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'work_orders'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Work Orders & Payments ({workOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'quotes'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Multi-Vendor Quotes ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab('vendors')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'vendors'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vendor Directory ({vendors.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Work Orders & Payment Ledger */}
      {activeTab === 'work_orders' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search Work Orders by ID, title, or vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-teal-600"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {['All', 'STP & Water', 'Lifts / Elevators', 'Electrical & DG', 'Civil Works'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Work Orders List */}
          <div className="space-y-5">
            {filteredWorkOrders.map((wo) => {
              const { totalPaid, balanceDue, status: paymentStatus } = calculateWoFinancials(wo);

              return (
                <div
                  key={wo.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5 hover:border-slate-300 transition-colors"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono font-bold text-xs bg-slate-100 text-slate-900 px-2 py-0.5 rounded border border-slate-200">
                          {wo.id}
                        </span>
                        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                          {wo.category}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            wo.workStatus === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : wo.workStatus === 'In Progress'
                              ? 'bg-sky-50 text-sky-700 border border-sky-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {wo.workStatus}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 pt-0.5">{wo.procurementTitle}</h3>
                      <p className="text-xs text-slate-600 max-w-2xl">{wo.scopeSummary}</p>
                    </div>

                    <div className="flex flex-col md:items-end gap-1 shrink-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Total Approved Amount</span>
                      <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                        ₹{wo.totalApprovedAmount.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1.5 pt-1">
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            paymentStatus === 'Fully Paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : paymentStatus === 'Partially Paid'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {paymentStatus}
                        </span>
                        <span className="text-xs text-slate-500 tabular-nums">
                          (Balance: <strong>₹{balanceDue.toLocaleString()}</strong>)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress & Lifecycle Tracker (0% to 100%) */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Percent className="w-3.5 h-3.5 text-teal-600" />
                        <span className="font-bold text-slate-900">Work Completion Progress:</span>
                        <strong className="text-teal-700 font-extrabold tabular-nums">{wo.progressPercent}%</strong>
                      </div>
                      <span className="text-slate-500 text-[11px] tabular-nums">
                        Target: {wo.targetCompletionDate} · Released by {wo.releasedBy}
                      </span>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${
                          wo.progressPercent === 100
                            ? 'bg-emerald-600'
                            : wo.progressPercent > 50
                            ? 'bg-teal-600'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${wo.progressPercent}%` }}
                      />
                    </div>

                    {/* Progress Slider updater for Committee */}
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-[11px] text-slate-500 font-medium">Update Progress:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={wo.progressPercent}
                        onChange={(e) => updateWorkOrderProgress(wo.id, Number(e.target.value))}
                        className="w-48 h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-teal-600"
                      />
                      <span className="text-xs font-mono font-bold text-slate-700">{wo.progressPercent}%</span>
                      {wo.progressPercent < 100 && (
                        <button
                          onClick={() => updateWorkOrderProgress(wo.id, 100, 'Completed')}
                          className="ml-auto text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded cursor-pointer"
                        >
                          Mark 100% Completed
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Payment Ledger & Balance Calculation Table */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Payment Ledger & Disbursements ({wo.payments.length} Payments)
                        </h4>
                      </div>
                      {balanceDue > 0 && (
                        <button
                          onClick={() => {
                            setShowPaymentModal(wo.id);
                            setPaymentAmount(Math.min(balanceDue, 50000));
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Record Payment</span>
                        </button>
                      )}
                    </div>

                    {wo.payments.length === 0 ? (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center text-xs text-slate-500">
                        No payments recorded yet for this Work Order. Click &ldquo;Record Payment&rdquo; to log mobilization advance.
                      </div>
                    ) : (
                      <div className="overflow-x-auto border border-slate-200 rounded-lg">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                            <tr>
                              <th className="py-2 px-3">Date</th>
                              <th className="py-2 px-3">Stage / Milestone</th>
                              <th className="py-2 px-3">Amount Paid</th>
                              <th className="py-2 px-3">Payment Mode</th>
                              <th className="py-2 px-3">Reference / UTR #</th>
                              <th className="py-2 px-3">Authorized By</th>
                              <th className="py-2 px-3">Audit Remarks</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {wo.payments.map((p) => (
                              <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                                <td className="py-2.5 px-3 font-medium text-slate-900 tabular-nums whitespace-nowrap">
                                  {p.paymentDate}
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className="font-semibold bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px]">
                                    {p.paymentType}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 font-bold text-emerald-800 tabular-nums whitespace-nowrap">
                                  ₹{p.amountPaid.toLocaleString()}
                                </td>
                                <td className="py-2.5 px-3 text-slate-600">{p.paymentMode}</td>
                                <td className="py-2.5 px-3 font-mono text-[11px] text-teal-700 font-medium whitespace-nowrap">
                                  {p.referenceUtr}
                                </td>
                                <td className="py-2.5 px-3 text-slate-700 text-[11px] whitespace-nowrap">
                                  {p.approvedBy}
                                </td>
                                <td className="py-2.5 px-3 text-slate-500 text-[11px] truncate max-w-xs">
                                  {p.notes || '—'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Balance Formula Callout */}
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                      <div>
                        <span>Formula: </span>
                        <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[11px] text-slate-800">
                          Balance Due (₹{balanceDue.toLocaleString()}) = Total WO (₹{wo.totalApprovedAmount.toLocaleString()}) - Disbursed (₹{totalPaid.toLocaleString()})
                        </code>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Vendor: <strong>{wo.vendorName}</strong></span>
                        <span className="text-slate-300">·</span>
                        <span className="font-mono text-[11px] text-slate-500">GST: {wo.vendorGst}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Multi-Vendor Quotes Management */}
      {activeTab === 'quotes' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Multi-Vendor Project Quotes & Evaluation</h3>
                <p className="text-xs text-slate-500">
                  Compare competitive quotes per project before committee approval and official Work Order release.
                </p>
              </div>
              <button
                onClick={() => setShowNewQuoteModal(true)}
                className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
              >
                + Add Vendor Quote
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Quote ID & Project</th>
                    <th className="py-2.5 px-3">Vendor Agency</th>
                    <th className="py-2.5 px-3">Quoted Amount</th>
                    <th className="py-2.5 px-3">Estimated Time</th>
                    <th className="py-2.5 px-3">Warranty</th>
                    <th className="py-2.5 px-3">Evaluation Status</th>
                    <th className="py-2.5 px-3 text-right">Committee Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-mono font-bold text-slate-900 block">{q.id}</span>
                        <span className="font-semibold text-slate-800">{q.projectTitle}</span>
                        <span className="text-[11px] text-slate-400 block font-mono">{q.procurementProjectId}</span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900">{q.vendorName}</td>
                      <td className="py-3 px-3 font-bold text-slate-900 tabular-nums">
                        ₹{q.quotedAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-slate-700">{q.estimatedDays} Days</td>
                      <td className="py-3 px-3 text-slate-700">{q.warrantyMonths} Months</td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            q.status === 'Selected'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : q.status === 'Rejected'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {q.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {q.status === 'Pending Review' ? (
                          <button
                            onClick={() => setShowReleaseModal(q)}
                            className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Approve & Release WO &rarr;
                          </button>
                        ) : q.status === 'Selected' ? (
                          <span className="text-emerald-700 font-semibold text-[11px]">Work Order Released</span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Rejected by Committee</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Vendor Directory */}
      {activeTab === 'vendors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vendors.map((v) => (
            <div
              key={v.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {v.id}
                  </span>
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                    ★ {v.rating} / 5.0
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{v.name}</h3>
                <span className="text-xs font-semibold text-slate-600 block">{v.category}</span>
                <p className="text-xs text-slate-500">
                  Contact: <strong className="text-slate-800">{v.contactPerson}</strong>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600 font-mono">
                <p>Phone: <span className="text-teal-700">{v.phone}</span></p>
                <p>GST: <span className="text-slate-700">{v.gstNumber}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Submit New Vendor Quote */}
      {showNewQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-700 block">MC Procurement</span>
                <h3 className="text-base font-bold text-slate-900">Add New Vendor Project Quote</h3>
              </div>
              <button
                onClick={() => setShowNewQuoteModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuote} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Project ID</label>
                  <input
                    type="text"
                    required
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Select Vendor</label>
                  <select
                    value={quoteVendorId}
                    onChange={(e) => setQuoteVendorId(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    {vendors.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Quoted Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Est. Days</label>
                  <input
                    type="number"
                    required
                    value={quoteDays}
                    onChange={(e) => setQuoteDays(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Warranty (Mos)</label>
                  <input
                    type="number"
                    required
                    value={quoteWarranty}
                    onChange={(e) => setQuoteWarranty(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Technical Scope Summary</label>
                <textarea
                  rows={2}
                  value={quoteScope}
                  onChange={(e) => setQuoteScope(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Committee Recommendation / Review Note</label>
                <input
                  type="text"
                  value={quoteNotes}
                  onChange={(e) => setQuoteNotes(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewQuoteModal(false)}
                  className="px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold cursor-pointer"
                >
                  Save Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Release Work Order Confirmation */}
      {showReleaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-700 block">Work Order Release</span>
                <h3 className="text-base font-bold text-slate-900">Authorize Official Work Order</h3>
              </div>
              <button
                onClick={() => setShowReleaseModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-2 text-xs text-teal-950">
              <p><strong>Selected Project:</strong> {showReleaseModal.projectTitle}</p>
              <p><strong>Approved Agency:</strong> {showReleaseModal.vendorName}</p>
              <p><strong>Total Approved Fee:</strong> ₹{showReleaseModal.quotedAmount.toLocaleString()}</p>
              <p><strong>Warranty:</strong> {showReleaseModal.warrantyMonths} Months comprehensive</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Work Start Date</label>
                <input
                  type="date"
                  value={woStartDate}
                  onChange={(e) => setWoStartDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Completion Date</label>
                <input
                  type="date"
                  value={woTargetDate}
                  onChange={(e) => setWoTargetDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReleaseModal(null)}
                className="px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReleaseWO}
                className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Release Work Order (WO-2026) &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Record Work Order Payment */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Payment Disbursement</span>
                <h3 className="text-base font-bold text-slate-900">Record Work Order Payment</h3>
                <p className="text-xs text-slate-500 font-mono">Work Order: {showPaymentModal}</p>
              </div>
              <button
                onClick={() => setShowPaymentModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Disbursement Stage</label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value as PaymentStage)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="Advance">Advance (Mobilization)</option>
                    <option value="Milestone 1">Milestone 1 (Material / In-Progress)</option>
                    <option value="Milestone 2">Milestone 2 (Installation)</option>
                    <option value="Final Settlement">Final Settlement (Inspection Signoff)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Amount to Pay (₹)</label>
                  <input
                    type="number"
                    required
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Payment Channel</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="NEFT / RTGS">NEFT / RTGS</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Society Bank Portal">Society Bank Portal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Reference / UTR Number</label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC0000241N882910"
                    value={paymentUtr}
                    onChange={(e) => setPaymentUtr(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Disbursement Audit Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Verified 70% installation of blowers before releasing payment."
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(null)}
                  className="px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold cursor-pointer"
                >
                  Post Payment to Ledger &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
