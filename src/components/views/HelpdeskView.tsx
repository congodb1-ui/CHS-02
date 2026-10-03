import React, { useState } from 'react';
import { useSociety } from '../../context/SocietyContext';
import {
  Wrench,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Plus,
  Send,
  User,
  Phone,
  Building,
  Upload,
  MessageSquare,
} from 'lucide-react';
import { TowerId, ComplaintTicket } from '../../types';

export const HelpdeskView: React.FC = () => {
  const {
    complaints,
    addComplaint,
    updateComplaintStatus,
    role,
    userFlat,
    userName,
    currentMemberId,
    filterOnlyMyFilings,
    setFilterOnlyMyFilings,
  } = useSociety();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [flatNo, setFlatNo] = useState(userFlat || 'A-402');
  const [tower, setTower] = useState<TowerId>('Tower A');
  const [residentName, setResidentName] = useState(userName || 'Rajesh Sharma');
  const [residentType, setResidentType] = useState<'Owner' | 'Tenant'>('Owner');
  const [phone, setPhone] = useState('+91 98201 44521');
  const [category, setCategory] = useState<ComplaintTicket['category']>('Plumbing');
  const [priority, setPriority] = useState<'Normal' | 'Urgent'>('Normal');
  const [description, setDescription] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  // MC Management Modal state
  const [managingTicket, setManagingTicket] = useState<ComplaintTicket | null>(null);
  const [newStatus, setNewStatus] = useState<ComplaintTicket['status']>('In Progress');
  const [resolutionNote, setResolutionNote] = useState('');
  const [assignedVendor, setAssignedVendor] = useState('');

  const isAdminOrSecretary = role === 'secretary' || role === 'admin';

  const filteredTickets = complaints.filter((t) => {
    const matchesRLS =
      !filterOnlyMyFilings ||
      t.flatNo.toLowerCase().trim() === userFlat.toLowerCase().trim() ||
      t.residentName.toLowerCase().includes(userName.split(' ')[0].toLowerCase());

    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.flatNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.residentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;

    return matchesRLS && matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = addComplaint({
      flatNo,
      tower,
      residentName,
      residentType,
      phone,
      category,
      priority,
      description,
    });
    setSubmittedTicketId(id);
    setShowForm(false);
    setDescription('');
    setPhotoName('');
  };

  const handleUpdateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!managingTicket) return;
    updateComplaintStatus(managingTicket.id, newStatus, resolutionNote, assignedVendor);
    setManagingTicket(null);
  };

  const openManageModal = (ticket: ComplaintTicket) => {
    setManagingTicket(ticket);
    setNewStatus(ticket.status);
    setResolutionNote(ticket.resolutionNotes || '');
    setAssignedVendor(ticket.assignedVendor || '');
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Resident Services & Facility Helpdesk
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Helpdesk, Maintenance & Service Tickets
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Log tickets for plumbing, elevators, STP flushing, electrical, or security issues. Real-time routing to estate technicians and Managing Committee oversight.
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setSubmittedTicketId(null);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs self-start sm:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{showForm ? 'Close Ticket Form' : 'Log New Complaint'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {submittedTicketId && (
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
            <div className="text-xs text-teal-900">
              <span className="font-bold">Ticket #{submittedTicketId} Registered Successfully!</span>
              <p className="text-teal-700">
                Assigned to Society Estate Technical Team. You can track updates and vendor assignments below.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSubmittedTicketId(null)}
            className="text-xs text-teal-800 hover:text-teal-950 font-semibold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Ticket Creation Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Log a Society Service Request</h2>
              <p className="text-xs text-slate-500">Provide flat details and photo evidence for rapid resolution.</p>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Tower</label>
                <select
                  value={tower}
                  onChange={(e) => setTower(e.target.value as TowerId)}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Tower A">Tower A</option>
                  <option value="Tower B">Tower B</option>
                  <option value="Tower C">Tower C</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Flat / Unit Number</label>
                <input
                  type="text"
                  required
                  value={flatNo}
                  onChange={(e) => setFlatNo(e.target.value)}
                  placeholder="e.g. A-402"
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Resident Name</label>
                <input
                  type="text"
                  required
                  value={residentName}
                  onChange={(e) => setResidentName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Occupancy Status</label>
                <select
                  value={residentType}
                  onChange={(e) => setResidentType(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Owner">Owner Resident</option>
                  <option value="Tenant">Tenant</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Plumbing">Plumbing & Shaft Drainage</option>
                  <option value="Lift / Elevator">Lift / Elevator Operational</option>
                  <option value="Water Supply">Water Supply / Flush Pressure</option>
                  <option value="Electrical">Electrical & Lighting</option>
                  <option value="STP & Drainage">STP Line Odor / Pressure</option>
                  <option value="Security & Access">Security & Gate Access</option>
                  <option value="Housekeeping">Housekeeping & Common Area</option>
                  <option value="Other">Other Civil Repair</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Normal">Normal (SLA: 24–48 Hours)</option>
                  <option value="Urgent">Urgent / Emergency (SLA: 2–4 Hours)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Detailed Issue Description & Location
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the exact location, timing, and nature of the issue..."
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-teal-600"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer text-slate-600">
                  <Upload className="w-3.5 h-3.5 text-teal-700" />
                  <span>{photoName || 'Attach Photo Evidence (Optional)'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setPhotoName(e.target.files[0].name);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Submit Ticket
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Ticket List and Filtering */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Live Service Tickets Ledger</h2>
            <p className="text-xs text-slate-500">
              Open tickets with automated SLA tracking and vendor response records.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            {/* RLS Personal Filter Toggle */}
            <button
              onClick={() => setFilterOnlyMyFilings(!filterOnlyMyFilings)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                filterOnlyMyFilings
                  ? 'bg-teal-50 text-teal-800 border-teal-200 shadow-2xs'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              title="Dual-Layer Row Level Security (RLS) Filter"
            >
              <span className={`w-2 h-2 rounded-full ${filterOnlyMyFilings ? 'bg-teal-600' : 'bg-slate-400'}`}></span>
              <span>{filterOnlyMyFilings ? `My Unit (${userFlat}) Filings` : 'All Society Tickets'}</span>
            </button>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ticket #, flat, issue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:outline-teal-600 bg-slate-50 w-48"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs p-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open Only</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs p-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
            >
              <option value="All">All Categories</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Lift / Elevator">Lift / Elevator</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>
        </div>

        {/* Tickets Grid / List */}
        <div className="divide-y divide-slate-100">
          {filteredTickets.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No complaint tickets match your search filters.
            </div>
          ) : (
            filteredTickets.map((t) => (
              <div key={t.id} className="py-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-slate-900 text-xs">{t.id}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-semibold text-slate-800">
                        {t.tower} - {t.flatNo} ({t.residentName}, {t.residentType})
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                        {t.category}
                      </span>
                      {t.priority === 'Urgent' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed max-w-3xl pt-0.5">
                      {t.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:flex-col sm:items-end shrink-0">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                        t.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : t.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {t.status}
                    </span>
                    <span className="text-[11px] text-slate-400 tabular-nums">{t.createdAt}</span>
                  </div>
                </div>

                {/* Resolution Notes / Vendor Information */}
                {(t.assignedVendor || t.resolutionNotes) && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1 text-slate-700">
                    {t.assignedVendor && (
                      <div className="flex items-center gap-2">
                        <Wrench className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span className="text-slate-500">Assigned Vendor:</span>
                        <strong className="text-slate-900">{t.assignedVendor}</strong>
                      </div>
                    )}
                    {t.resolutionNotes && (
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-500">Resolution Note: </span>
                          <span className="text-slate-800">{t.resolutionNotes}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* MC / Admin Action Trigger */}
                {(role === 'secretary' || role === 'admin') && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => openManageModal(t)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Manage Status & Vendor &rarr;
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* MC Ticket Resolution Modal */}
      {managingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-700 block">MC Committee Action</span>
                <h3 className="text-base font-bold text-slate-900">Manage Ticket #{managingTicket.id}</h3>
              </div>
              <button
                onClick={() => setManagingTicket(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdateTicket} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Status Update</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Assigned Vendor / Technician</label>
                <input
                  type="text"
                  value={assignedVendor}
                  onChange={(e) => setAssignedVendor(e.target.value)}
                  placeholder="e.g. Apex Plumbers, Otis AMC Engineer, Electrician Sunil"
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Resolution / Inspection Note</label>
                <textarea
                  rows={3}
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="Detail actions taken, parts replaced, or next scheduled follow-up..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setManagingTicket(null)}
                  className="px-3 py-1.5 text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-700 text-white rounded-lg font-semibold hover:bg-teal-800 transition-colors cursor-pointer"
                >
                  Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
