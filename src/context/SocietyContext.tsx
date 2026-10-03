import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  AmenityBooking,
  ComplaintTicket,
  TenantApplication,
  WaterTankerLog,
  TankCleaningRecord,
  DGRunLog,
  AMCContract,
  SocietyNotice,
  ParkingSlot,
  StaffMember,
  DailyInspectionReport,
  AttendanceCode,
  MemberProfile,
  Vendor,
  VendorQuote,
  WorkOrder,
  WorkOrderPayment,
  VehicleRecord,
  VisitorParkingPass,
  SocietyDocument,
  ApprovalAuditEntry,
  CommunityPoll,
  ROLE_LABELS,
} from '../types';
import {
  INITIAL_NOTICES,
  INITIAL_COMPLAINTS,
  INITIAL_BOOKINGS,
  INITIAL_TENANTS,
  INITIAL_TANKERS,
  INITIAL_TANK_CLEANING,
  INITIAL_DG_LOGS,
  INITIAL_AMCS,
  INITIAL_PARKING,
  MASTER_STAFF_DIRECTORY,
  INITIAL_INSPECTIONS,
  INITIAL_ATTENDANCE_MATRIX,
  DEFAULT_33_ACTIVITIES,
  INITIAL_PROFILES,
  INITIAL_VENDORS,
  INITIAL_VENDOR_QUOTES,
  INITIAL_WORK_ORDERS,
  INITIAL_VEHICLES,
  INITIAL_DOCUMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_VISITOR_PASSES,
  INITIAL_POLLS,
} from '../data/initialData';

interface SocietyContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  isPendingApproval: boolean;
  isRejected: boolean;
  loginAsRole: (role: UserRole, profileId?: string) => void;
  logout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notices: SocietyNotice[];
  complaints: ComplaintTicket[];
  bookings: AmenityBooking[];
  tenants: TenantApplication[];
  tankers: WaterTankerLog[];
  tankCleanings: TankCleaningRecord[];
  dgLogs: DGRunLog[];
  amcs: AMCContract[];
  parkings: ParkingSlot[];
  staffList: StaffMember[];
  inspections: DailyInspectionReport[];
  attendance: Record<number, Record<number, AttendanceCode>>;
  selectedInspectionDay: number;
  setSelectedInspectionDay: (day: number) => void;
  updateInspectionItem: (day: number, itemId: number, status: string, remarks?: string) => void;
  submitInspection: (day: number) => void;
  verifyInspection: (day: number, verifiedByAdmin: string, adminComments: string) => void;
  updateAttendance: (staffSrNo: number, day: number, code: AttendanceCode) => void;
  bulkMarkAttendance: (day: number, code: AttendanceCode) => void;
  escalateChecklistToTicket: (itemId: number, activity: string, remarks: string) => string;
  addComplaint: (ticket: Omit<ComplaintTicket, 'id' | 'createdAt' | 'status'>) => string;
  updateComplaintStatus: (id: string, status: ComplaintTicket['status'], resolutionNotes?: string, assignedVendor?: string) => void;
  addBooking: (booking: Omit<AmenityBooking, 'id' | 'bookingDate' | 'status'>) => string;
  cancelBooking: (id: string) => void;
  addTenantApplication: (app: Omit<TenantApplication, 'id' | 'dateSubmitted' | 'policeVerificationStatus' | 'nocStatus'>) => string;
  updateTenantStatus: (id: string, nocStatus: TenantApplication['nocStatus'], policeStatus?: TenantApplication['policeVerificationStatus']) => void;
  addTankerLog: (tanker: Omit<WaterTankerLog, 'id' | 'status'>) => void;
  isEmergencyOpen: boolean;
  setIsEmergencyOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  initialAiPrompt: string;
  openAiWithPrompt: (prompt?: string) => void;
  targetAmenity: 'pool' | 'gym' | 'clubhouse' | 'play_area';
  setTargetAmenity: (amenity: 'pool' | 'gym' | 'clubhouse' | 'play_area') => void;
  userFlat: string;
  setUserFlat: (flat: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  currentMemberId: string;
  // Profiles, Single Member Per Flat & Approval Engine
  profiles: MemberProfile[];
  currentProfile?: MemberProfile;
  registerMember: (data: {
    name: string;
    email: string;
    phone: string;
    tower: 'Tower A' | 'Tower B' | 'Tower C';
    flatNo: string;
    ownershipType: 'Owner' | 'Tenant';
  }) => { success: boolean; error?: string; memberId?: string };
  addMemberProfile: (profile: Omit<MemberProfile, 'id' | 'memberId' | 'isApproved' | 'status' | 'registeredDate'>) => string;
  approveMemberProfile: (id: string, isApproved: boolean, remarks?: string) => void;
  updateUserRole: (id: string, newRole: UserRole) => void;
  deleteMemberProfile: (id: string) => void;
  auditLogs: ApprovalAuditEntry[];
  // Vehicles & Parking
  vehicles: VehicleRecord[];
  visitorPasses: VisitorParkingPass[];
  addVehicle: (vehicle: Omit<VehicleRecord, 'id' | 'registeredDate'>) => string;
  updateVehicle: (id: string, vehicle: Partial<VehicleRecord>) => void;
  deleteVehicle: (id: string) => void;
  bulkImportVehicles: (records: Omit<VehicleRecord, 'id' | 'registeredDate'>[]) => number;
  issueVisitorPass: (pass: Omit<VisitorParkingPass, 'id' | 'status'>) => string;
  updateVisitorPassStatus: (id: string, status: VisitorParkingPass['status']) => void;
  // Documents
  documents: SocietyDocument[];
  addDocument: (doc: Omit<SocietyDocument, 'id' | 'uploadedAt'>) => string;
  deleteDocument: (id: string) => void;
  // Vendors, Quotes & Work Orders
  vendors: Vendor[];
  quotes: VendorQuote[];
  workOrders: WorkOrder[];
  onboardVendor: (vendor: Omit<Vendor, 'id' | 'rating' | 'registeredDate'>) => string;
  addVendorQuote: (quote: Omit<VendorQuote, 'id' | 'submittedDate' | 'status'>) => string;
  approveQuoteAndReleaseWorkOrder: (quoteId: string, startDate?: string, targetCompletionDate?: string) => string;
  approveWorkOrder: (workOrderId: string, secretaryComments: string) => void;
  requestWorkOrderChanges: (workOrderId: string, secretaryComments: string) => void;
  updateWorkOrderProgress: (workOrderId: string, progress: number, workStatus?: WorkOrder['workStatus']) => void;
  addWorkOrderPayment: (workOrderId: string, payment: Omit<WorkOrderPayment, 'id' | 'workOrderId'>) => string;
  // Admin Data Overrides
  adminUpdateTicket: (id: string, data: Partial<ComplaintTicket>) => void;
  adminUpdateBooking: (id: string, data: Partial<AmenityBooking>) => void;
  adminUpdateTenantApp: (id: string, data: Partial<TenantApplication>) => void;
  filterOnlyMyFilings: boolean;
  setFilterOnlyMyFilings: (filter: boolean) => void;
  // Community Polls & D3 Real-Time Voting Engine
  polls: CommunityPoll[];
  castVote: (pollId: string, optionId: string) => { success: boolean; message: string };
  createPoll: (poll: Omit<CommunityPoll, 'id' | 'totalVotes' | 'votedFlats' | 'userVotes'>) => string;
  closePoll: (pollId: string, resolutionSummary: string) => void;
}

const SocietyContext = createContext<SocietyContextType | undefined>(undefined);

export const SocietyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Profiles state with localStorage
  const [profiles, setProfiles] = useState<MemberProfile[]>(() => {
    const saved = localStorage.getItem('solitaire_profiles_v2');
    return saved ? JSON.parse(saved) : INITIAL_PROFILES;
  });

  useEffect(() => {
    localStorage.setItem('solitaire_profiles_v2', JSON.stringify(profiles));
  }, [profiles]);

  // Current session & active profile ID
  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    return localStorage.getItem('solitaire_active_profile_id') || 'usr-001';
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('solitaire_role');
    if (saved === 'resident' || saved === 'supervisor' || saved === 'mc_member' || saved === 'admin') {
      return saved as UserRole;
    }
    if (saved === 'member') return 'resident';
    if (saved === 'secretary') return 'mc_member';
    return 'public';
  });

  const currentProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  const isAuthenticated = role !== 'public';
  const isRejected = Boolean(currentProfile && currentProfile.status === 'Rejected' && role === 'resident');
  const isPendingApproval = Boolean(
    currentProfile &&
    (currentProfile.status === 'Pending Approval' || (!currentProfile.isApproved && currentProfile.status !== 'Rejected')) &&
    role === 'resident'
  );

  const [activeTab, setActiveTabState] = useState<string>('home');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [initialAiPrompt, setInitialAiPrompt] = useState<string>('');
  const [targetAmenity, setTargetAmenity] = useState<'pool' | 'gym' | 'clubhouse' | 'play_area'>('pool');

  const [userFlat, setUserFlat] = useState<string>(() => currentProfile?.flatNo || 'A-402');
  const [userName, setUserName] = useState<string>(() => currentProfile?.name || 'Resident Member');
  const [currentMemberId, setCurrentMemberId] = useState<string>(() => currentProfile?.memberId || 'SOL-A-402');

  const [filterOnlyMyFilings, setFilterOnlyMyFilings] = useState<boolean>(true);

  // Sync user info when profile or role changes
  const loginAsRole = (newRole: UserRole, profileId?: string) => {
    const normalizedRole: UserRole =
      newRole === 'member' ? 'resident' : newRole === 'secretary' ? 'mc_member' : newRole;

    setRoleState(normalizedRole);
    localStorage.setItem('solitaire_role', normalizedRole);

    if (normalizedRole === 'public') {
      setUserFlat('Public Visitor');
      setUserName('Visitor / Guest');
      setCurrentMemberId('SOL-PUBLIC');
      setActiveTabState('home');
      return;
    }

    let targetProfile = profileId ? profiles.find((p) => p.id === profileId) : undefined;
    if (!targetProfile) {
      if (normalizedRole === 'resident') targetProfile = profiles.find((p) => p.role === 'resident' || p.role === 'member');
      else if (normalizedRole === 'supervisor') targetProfile = profiles.find((p) => p.role === 'supervisor');
      else if (normalizedRole === 'mc_member') targetProfile = profiles.find((p) => p.role === 'mc_member' || p.role === 'secretary');
      else if (normalizedRole === 'admin') targetProfile = profiles.find((p) => p.role === 'admin');
    }

    if (targetProfile) {
      setActiveProfileId(targetProfile.id);
      localStorage.setItem('solitaire_active_profile_id', targetProfile.id);
      setUserFlat(targetProfile.flatNo);
      setUserName(targetProfile.name);
      setCurrentMemberId(targetProfile.memberId);
    } else {
      if (normalizedRole === 'resident') {
        setUserFlat('A-402');
        setUserName('Resident Member');
        setCurrentMemberId('SOL-A-402');
      } else if (normalizedRole === 'supervisor') {
        setUserFlat('Estate Office');
        setUserName('Facility Supervisor');
        setCurrentMemberId('SOL-SUP-01');
      } else if (normalizedRole === 'mc_member') {
        setUserFlat('B-801');
        setUserName('MC Member / Secretary');
        setCurrentMemberId('SOL-B-801');
      } else if (normalizedRole === 'admin') {
        setUserFlat('A-1202');
        setUserName('Estate Administrator');
        setCurrentMemberId('SOL-ADM-01');
      }
    }
  };

  const logout = () => {
    setRoleState('public');
    localStorage.setItem('solitaire_role', 'public');
    setUserFlat('Public Visitor');
    setUserName('Visitor / Guest');
    setCurrentMemberId('SOL-PUBLIC');
    setActiveTabState('home');
  };

  const setRole = (newRole: UserRole) => {
    loginAsRole(newRole);
  };

  // Vehicles state with localStorage
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(() => {
    const saved = localStorage.getItem('solitaire_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  useEffect(() => {
    localStorage.setItem('solitaire_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  // Visitor passes state with localStorage
  const [visitorPasses, setVisitorPasses] = useState<VisitorParkingPass[]>(() => {
    const saved = localStorage.getItem('solitaire_visitor_passes');
    return saved ? JSON.parse(saved) : INITIAL_VISITOR_PASSES;
  });

  useEffect(() => {
    localStorage.setItem('solitaire_visitor_passes', JSON.stringify(visitorPasses));
  }, [visitorPasses]);

  // Documents state with localStorage
  const [documents, setDocuments] = useState<SocietyDocument[]>(() => {
    const saved = localStorage.getItem('solitaire_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  useEffect(() => {
    localStorage.setItem('solitaire_documents', JSON.stringify(documents));
  }, [documents]);

  // Approval Audit Trail state with localStorage
  const [auditLogs, setAuditLogs] = useState<ApprovalAuditEntry[]>(() => {
    const saved = localStorage.getItem('solitaire_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  useEffect(() => {
    localStorage.setItem('solitaire_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Vendors & Quotes
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('solitaire_vendors');
    return saved ? JSON.parse(saved) : INITIAL_VENDORS;
  });

  useEffect(() => {
    localStorage.setItem('solitaire_vendors', JSON.stringify(vendors));
  }, [vendors]);

  const [quotes, setQuotes] = useState<VendorQuote[]>(() => {
    const saved = localStorage.getItem('solitaire_quotes');
    return saved ? JSON.parse(saved) : INITIAL_VENDOR_QUOTES;
  });

  useEffect(() => {
    localStorage.setItem('solitaire_quotes', JSON.stringify(quotes));
  }, [quotes]);

  // Work Orders & Payment Ledger
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(() => {
    const saved = localStorage.getItem('solitaire_work_orders');
    if (!saved) return INITIAL_WORK_ORDERS;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((wo: any) => ({
          ...wo,
          payments: Array.isArray(wo.payments) ? wo.payments : [],
          approvalStatus: wo.approvalStatus || 'Approved',
          totalApprovedAmount: Number(wo.totalApprovedAmount || wo.approvedAmount || 0),
          progressPercent: Number(wo.progressPercent || 0),
          vendorName: wo.vendorName || 'Vendor',
          procurementTitle: wo.procurementTitle || 'Procurement Project',
          category: wo.category || 'General',
          subtotal: Number(wo.subtotal || 0),
          taxAmount: Number(wo.taxAmount || 0),
        }));
      }
      return INITIAL_WORK_ORDERS;
    } catch {
      return INITIAL_WORK_ORDERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('solitaire_work_orders', JSON.stringify(workOrders));
  }, [workOrders]);

  // Community Polls State with localStorage
  const [polls, setPolls] = useState<CommunityPoll[]>(() => {
    const saved = localStorage.getItem('solitaire_polls');
    if (!saved) return INITIAL_POLLS;
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_POLLS;
    } catch {
      return INITIAL_POLLS;
    }
  });

  useEffect(() => {
    localStorage.setItem('solitaire_polls', JSON.stringify(polls));
  }, [polls]);

  const openAiWithPrompt = (prompt?: string) => {
    if (prompt) setInitialAiPrompt(prompt);
    setIsAiModalOpen(true);
  };

  const [selectedInspectionDay, setSelectedInspectionDay] = useState<number>(2);
  const [staffList] = useState<StaffMember[]>(MASTER_STAFF_DIRECTORY);

  const [inspections, setInspections] = useState<DailyInspectionReport[]>(() => {
    const saved = localStorage.getItem('solitaire_inspections');
    return saved ? JSON.parse(saved) : INITIAL_INSPECTIONS;
  });

  const [attendance, setAttendance] = useState<Record<number, Record<number, AttendanceCode>>>(() => {
    const saved = localStorage.getItem('solitaire_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE_MATRIX;
  });

  useEffect(() => {
    localStorage.setItem('solitaire_inspections', JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem('solitaire_attendance', JSON.stringify(attendance));
  }, [attendance]);

  const [notices] = useState<SocietyNotice[]>(INITIAL_NOTICES);

  const [complaints, setComplaints] = useState<ComplaintTicket[]>(() => {
    const saved = localStorage.getItem('solitaire_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [bookings, setBookings] = useState<AmenityBooking[]>(() => {
    const saved = localStorage.getItem('solitaire_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [tenants, setTenants] = useState<TenantApplication[]>(() => {
    const saved = localStorage.getItem('solitaire_tenants');
    return saved ? JSON.parse(saved) : INITIAL_TENANTS;
  });

  const [tankers, setTankers] = useState<WaterTankerLog[]>(() => {
    const saved = localStorage.getItem('solitaire_tankers');
    return saved ? JSON.parse(saved) : INITIAL_TANKERS;
  });

  const [tankCleanings] = useState<TankCleaningRecord[]>(INITIAL_TANK_CLEANING);
  const [dgLogs] = useState<DGRunLog[]>(INITIAL_DG_LOGS);
  const [amcs] = useState<AMCContract[]>(INITIAL_AMCS);
  const [parkings] = useState<ParkingSlot[]>(INITIAL_PARKING);

  useEffect(() => {
    localStorage.setItem('solitaire_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('solitaire_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('solitaire_tenants', JSON.stringify(tenants));
  }, [tenants]);

  useEffect(() => {
    localStorage.setItem('solitaire_tankers', JSON.stringify(tankers));
  }, [tankers]);

  // SINGLE MEMBER PER FLAT CONSTRAINT & REGISTRATION ENGINE
  const registerMember = (data: {
    name: string;
    email: string;
    phone: string;
    tower: 'Tower A' | 'Tower B' | 'Tower C';
    flatNo: string;
    ownershipType: 'Owner' | 'Tenant';
  }): { success: boolean; error?: string; memberId?: string } => {
    const cleanFlat = data.flatNo.trim().toUpperCase();

    // Enforce 1 registered user account per flat (excluding previously rejected registrations)
    const alreadyRegistered = profiles.find(
      (p) => p.flatNo.trim().toUpperCase() === cleanFlat && p.status !== 'Rejected'
    );
    if (alreadyRegistered) {
      return {
        success: false,
        error: `Flat [${cleanFlat}] is already registered under another account (${alreadyRegistered.name}). Please contact the society administrator if this is an error.`,
      };
    }

    const today = new Date().toISOString().split('T')[0];
    const towerInitial = data.tower.replace('Tower ', '');
    const cleanNum = cleanFlat.replace(/[^a-zA-Z0-9]/g, '');
    const genMemberId = `SOL-${towerInitial}-${cleanNum}`;
    const newId = `usr-${Date.now()}`;

    const newProfile: MemberProfile = {
      id: newId,
      memberId: genMemberId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      tower: data.tower,
      flatNo: cleanFlat,
      role: 'resident',
      ownershipType: data.ownershipType,
      isApproved: false, // Default to FALSE - requires MC/Admin approval!
      status: 'Pending Approval',
      registeredDate: today,
    };

    setProfiles((prev) => [newProfile, ...prev]);

    // Record in Audit Trail
    const auditEntry: ApprovalAuditEntry = {
      id: `AUD-${Date.now()}`,
      userId: newId,
      userName: data.name,
      flatNo: cleanFlat,
      action: 'Registration Requested',
      performedBy: 'Self Registration',
      performedByRole: 'public',
      timestamp: `${today} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      details: `New registration submitted for Flat [${cleanFlat}] as ${data.ownershipType}. Awaiting MC Member / Admin verification.`,
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);

    return { success: true, memberId: genMemberId };
  };

  const addMemberProfile = (data: Omit<MemberProfile, 'id' | 'memberId' | 'isApproved' | 'status' | 'registeredDate'>): string => {
    const res = registerMember({
      name: data.name,
      email: data.email,
      phone: data.phone,
      tower: data.tower,
      flatNo: data.flatNo,
      ownershipType: data.ownershipType,
    });
    return res.memberId || `SOL-${data.tower.replace('Tower ', '')}-${data.flatNo.replace(/[^a-zA-Z0-9]/g, '')}`;
  };

  // MC/ADMIN APPROVAL & REJECTION ENGINE
  const approveMemberProfile = (id: string, isApproved: boolean, remarks?: string) => {
    const target = profiles.find((p) => p.id === id);
    if (!target) return;

    const today = new Date().toISOString().split('T')[0];
    const timeStr = `${today} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setProfiles((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isApproved,
              status: isApproved ? 'Approved' : 'Rejected',
              approvedOrRejectedBy: userName,
              reviewedAt: timeStr,
              reviewRemarks: remarks || (isApproved ? 'Approved by Committee' : 'Application rejected'),
            }
          : p
      )
    );

    // Append to searchable audit log
    const auditEntry: ApprovalAuditEntry = {
      id: `AUD-${Date.now()}`,
      userId: id,
      userName: target.name,
      flatNo: target.flatNo,
      action: isApproved ? 'Approved' : 'Rejected',
      performedBy: userName,
      performedByRole: role,
      timestamp: timeStr,
      details: remarks || (isApproved ? `Registration approved with Resident access for ${target.flatNo}.` : `Registration rejected for ${target.flatNo}.`),
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);
  };

  const updateUserRole = (id: string, newRole: UserRole) => {
    const target = profiles.find((p) => p.id === id);
    if (!target) return;

    const today = new Date().toISOString().split('T')[0];
    const timeStr = `${today} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, role: newRole } : p))
    );

    const auditEntry: ApprovalAuditEntry = {
      id: `AUD-${Date.now()}`,
      userId: id,
      userName: target.name,
      flatNo: target.flatNo,
      action: 'Role Changed',
      performedBy: userName,
      performedByRole: role,
      timestamp: timeStr,
      details: `Role updated from ${ROLE_LABELS[target.role] || target.role} to ${ROLE_LABELS[newRole] || newRole}.`,
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);
  };

  const deleteMemberProfile = (id: string) => {
    const target = profiles.find((p) => p.id === id);
    if (!target) return;

    setProfiles((prev) => prev.filter((p) => p.id !== id));

    const today = new Date().toISOString().split('T')[0];
    const timeStr = `${today} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const auditEntry: ApprovalAuditEntry = {
      id: `AUD-${Date.now()}`,
      userId: id,
      userName: target.name,
      flatNo: target.flatNo,
      action: 'Rejected',
      performedBy: userName,
      performedByRole: role,
      timestamp: timeStr,
      details: `Application record removed from database for Flat [${target.flatNo}].`,
    };
    setAuditLogs((prev) => [auditEntry, ...prev]);
  };

  // VEHICLE LOGISTICS & PARKING SPOT TRACKER
  const addVehicle = (vehicle: Omit<VehicleRecord, 'id' | 'registeredDate'>): string => {
    const newId = `VEH-${Date.now().toString().slice(-4)}`;
    const today = new Date().toISOString().split('T')[0];
    const newRecord: VehicleRecord = {
      ...vehicle,
      id: newId,
      registeredDate: today,
    };
    setVehicles((prev) => [newRecord, ...prev]);
    return newId;
  };

  const updateVehicle = (id: string, updatedFields: Partial<VehicleRecord>) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updatedFields } : v))
    );
  };

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const bulkImportVehicles = (records: Omit<VehicleRecord, 'id' | 'registeredDate'>[]): number => {
    const today = new Date().toISOString().split('T')[0];
    const newRecords: VehicleRecord[] = records.map((r, i) => ({
      ...r,
      id: `VEH-CSV-${Date.now().toString().slice(-4)}-${i + 1}`,
      registeredDate: today,
    }));
    setVehicles((prev) => [...newRecords, ...prev]);
    return newRecords.length;
  };

  const issueVisitorPass = (pass: Omit<VisitorParkingPass, 'id' | 'status'>): string => {
    const newId = `VP-${Date.now().toString().slice(-4)}`;
    const newPass: VisitorParkingPass = {
      ...pass,
      id: newId,
      status: 'Active',
    };
    setVisitorPasses((prev) => [newPass, ...prev]);
    return newId;
  };

  const updateVisitorPassStatus = (id: string, status: VisitorParkingPass['status']) => {
    setVisitorPasses((prev) =>
      prev.map((vp) => (vp.id === id ? { ...vp, status } : vp))
    );
  };

  // DOCUMENT REPOSITORY ENGINE
  const addDocument = (doc: Omit<SocietyDocument, 'id' | 'uploadedAt'>): string => {
    const newId = `DOC-${Date.now().toString().slice(-4)}`;
    const today = new Date().toISOString().split('T')[0];
    const newDoc: SocietyDocument = {
      ...doc,
      id: newId,
      uploadedAt: today,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    return newId;
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  // VENDOR ONBOARDING & MULTI-ITEM PROCUREMENT
  const onboardVendor = (vendor: Omit<Vendor, 'id' | 'rating' | 'registeredDate'>): string => {
    const newId = `VND-${Date.now().toString().slice(-3)}`;
    const today = new Date().toISOString().split('T')[0];
    const newVendor: Vendor = {
      ...vendor,
      id: newId,
      rating: 4.8,
      registeredDate: today,
    };
    setVendors((prev) => [newVendor, ...prev]);
    return newId;
  };

  const addVendorQuote = (quote: Omit<VendorQuote, 'id' | 'submittedDate' | 'status'>): string => {
    const today = new Date().toISOString().split('T')[0];
    const newQuoteId = `QTE-${Date.now().toString().slice(-4)}`;
    const quoteNum = quote.quoteNumber || `Q-${Date.now().toString().slice(-4)}`;

    const items = quote.items || [];
    const subtotal = quote.subtotal || items.reduce((sum, item) => sum + item.lineTotal, 0);
    const gstPercent = quote.gstPercent !== undefined ? quote.gstPercent : 18;
    const taxAmount = quote.taxAmount !== undefined ? quote.taxAmount : Math.round((subtotal * gstPercent) / 100);
    const grandTotal = quote.grandTotal !== undefined ? quote.grandTotal : subtotal + taxAmount;

    const newQuote: VendorQuote = {
      ...quote,
      id: newQuoteId,
      quoteNumber: quoteNum,
      subtotal,
      gstPercent,
      taxAmount,
      grandTotal,
      quotedAmount: grandTotal,
      submittedDate: today,
      status: 'Pending Review',
    };
    setQuotes((prev) => [newQuote, ...prev]);
    return newQuoteId;
  };

  const approveQuoteAndReleaseWorkOrder = (
    quoteId: string,
    startDate?: string,
    targetCompletionDate?: string
  ): string => {
    const selectedQuote = quotes.find((q) => q.id === quoteId);
    if (!selectedQuote) return '';

    // Mark quote Selected, reject others for same project
    setQuotes((prev) =>
      prev.map((q) => {
        if (q.id === quoteId) return { ...q, status: 'Selected' as const };
        if (q.procurementProjectId === selectedQuote.procurementProjectId) return { ...q, status: 'Rejected' as const };
        return q;
      })
    );

    const today = new Date().toISOString().split('T')[0];
    const target = targetCompletionDate || new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0];
    const newWoId = `WO-2026-${String(workOrders.length + 1).padStart(3, '0')}`;
    const vendorInfo = vendors.find((v) => v.id === selectedQuote.vendorId);

    let cat: WorkOrder['category'] = 'Civil Works';
    const lower = selectedQuote.projectTitle.toLowerCase();
    if (lower.includes('stp') || lower.includes('water')) cat = 'STP & Water';
    else if (lower.includes('lift') || lower.includes('elevator')) cat = 'Lifts / Elevators';
    else if (lower.includes('solar') || lower.includes('dg') || lower.includes('led') || lower.includes('electrical')) cat = 'Electrical & DG';
    else if (lower.includes('security') || lower.includes('cctv')) cat = 'Security & CCTV';

    const grandTotal = selectedQuote.grandTotal || selectedQuote.quotedAmount;
    const subtotal = selectedQuote.subtotal || Math.round((grandTotal / 1.18));
    const tax = selectedQuote.taxAmount || (grandTotal - subtotal);

    const newWO: WorkOrder = {
      id: newWoId,
      procurementTitle: selectedQuote.projectTitle,
      category: cat,
      quoteId: selectedQuote.id,
      quoteNumber: selectedQuote.quoteNumber,
      vendorId: selectedQuote.vendorId,
      vendorName: selectedQuote.vendorName,
      vendorContact: vendorInfo?.phone || '+91 98220 00000',
      vendorGst: vendorInfo?.gstNumber || '27AAACL0000A1Z1',
      vendorPan: vendorInfo?.panNumber,
      bankDetails: vendorInfo?.bankAccountNumber
        ? {
            bankName: vendorInfo.bankName,
            accountNumber: vendorInfo.bankAccountNumber,
            ifscCode: vendorInfo.ifscCode || '',
          }
        : undefined,
      items: selectedQuote.items,
      subtotal,
      gstPercent: selectedQuote.gstPercent || 18,
      taxAmount: tax,
      totalApprovedAmount: grandTotal,
      startDate: startDate || today,
      targetCompletionDate: target,
      progressPercent: 0,
      scopeSummary: selectedQuote.scopeOfWork,
      paymentTerms: '30% Advance, 40% Milestone 1, 30% Final Settlement',
      approvalStatus: 'Pending_Secretary_Approval',
      workStatus: 'Scheduled',
      releasedBy: userName || 'MC Member',
      releasedAt: today,
      payments: [],
    };

    setWorkOrders((prev) => [newWO, ...prev]);
    return newWoId;
  };

  const approveWorkOrder = (workOrderId: string, secretaryComments: string) => {
    const today = new Date().toISOString().split('T')[0];
    const timeStr = `${today} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setWorkOrders((prev) =>
      prev.map((wo) =>
        wo.id === workOrderId
          ? {
              ...wo,
              approvalStatus: 'Approved',
              workStatus: 'In Progress',
              approvingUserId: `${currentMemberId} (${userName})`,
              approvedAt: timeStr,
              secretaryComments,
            }
          : wo
      )
    );
  };

  const requestWorkOrderChanges = (workOrderId: string, secretaryComments: string) => {
    const today = new Date().toISOString().split('T')[0];
    const timeStr = `${today} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setWorkOrders((prev) =>
      prev.map((wo) =>
        wo.id === workOrderId
          ? {
              ...wo,
              approvalStatus: 'Changes_Requested',
              approvingUserId: `${currentMemberId} (${userName})`,
              approvedAt: timeStr,
              secretaryComments,
            }
          : wo
      )
    );
  };

  const updateWorkOrderProgress = (workOrderId: string, progress: number, workStatus?: WorkOrder['workStatus']) => {
    setWorkOrders((prev) =>
      prev.map((wo) => {
        if (wo.id === workOrderId) {
          const clamped = Math.min(100, Math.max(0, progress));
          const status = workStatus || (clamped >= 100 ? 'Completed' : clamped > 0 ? 'In Progress' : wo.workStatus);
          return {
            ...wo,
            progressPercent: clamped,
            workStatus: status,
          };
        }
        return wo;
      })
    );
  };

  const addWorkOrderPayment = (
    workOrderId: string,
    payment: Omit<WorkOrderPayment, 'id' | 'workOrderId'>
  ): string => {
    const payId = `PAY-${Date.now().toString().slice(-4)}`;
    const newPayment: WorkOrderPayment = {
      ...payment,
      id: payId,
      workOrderId,
    };

    setWorkOrders((prev) =>
      prev.map((wo) => {
        if (wo.id === workOrderId) {
          return {
            ...wo,
            payments: [...wo.payments, newPayment],
          };
        }
        return wo;
      })
    );

    return payId;
  };

  // COMMUNITY POLLS & REAL-TIME VOTING ENGINE
  const castVote = (pollId: string, optionId: string): { success: boolean; message: string } => {
    if (!isAuthenticated) {
      return { success: false, message: 'Authentication required to vote.' };
    }
    if (isPendingApproval || isRejected) {
      return { success: false, message: 'Your account is under verification. Only verified residents can vote.' };
    }

    const flatKey = userFlat || 'Unknown-Flat';
    const target = polls.find((p) => p.id === pollId);
    if (!target) {
      return { success: false, message: 'Poll not found.' };
    }
    if (target.status === 'Concluded') {
      return { success: false, message: 'This society poll is already concluded.' };
    }

    const previousOptionId = target.userVotes ? target.userVotes[flatKey] : undefined;

    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;

        const options = poll.options.map((opt) => ({ ...opt }));
        let deltaTotal = 0;

        if (previousOptionId === optionId) {
          return poll;
        }

        if (previousOptionId) {
          const oldIdx = options.findIndex((o) => o.id === previousOptionId);
          if (oldIdx !== -1) {
            options[oldIdx].votes = Math.max(0, options[oldIdx].votes - 1);
          }
        } else {
          deltaTotal = 1;
        }

        const newIdx = options.findIndex((o) => o.id === optionId);
        if (newIdx !== -1) {
          options[newIdx].votes += 1;
        }

        const votedFlats = poll.votedFlats.includes(flatKey)
          ? poll.votedFlats
          : [...poll.votedFlats, flatKey];

        const userVotes = {
          ...(poll.userVotes || {}),
          [flatKey]: optionId,
        };

        return {
          ...poll,
          options,
          totalVotes: poll.totalVotes + deltaTotal,
          votedFlats,
          userVotes,
        };
      })
    );

    return { success: true, message: `Vote recorded for Flat [${flatKey}]!` };
  };

  const createPoll = (pollData: Omit<CommunityPoll, 'id' | 'totalVotes' | 'votedFlats' | 'userVotes'>): string => {
    const newId = `POLL-${Date.now().toString().slice(-4)}`;
    const newPoll: CommunityPoll = {
      ...pollData,
      id: newId,
      totalVotes: 0,
      votedFlats: [],
      userVotes: {},
      options: pollData.options.map((opt, i) => ({
        ...opt,
        id: opt.id || `opt-${newId}-${i + 1}`,
        votes: 0,
        color: opt.color || ['#0d9488', '#0284c7', '#8b5cf6', '#f59e0b', '#ec4899'][i % 5],
      })),
    };
    setPolls((prev) => [newPoll, ...prev]);
    return newId;
  };

  const closePoll = (pollId: string, resolutionSummary: string) => {
    setPolls((prev) =>
      prev.map((p) =>
        p.id === pollId
          ? { ...p, status: 'Concluded', resolutionSummary }
          : p
      )
    );
  };

  // ADMIN OVERRIDE CONTROLS
  const adminUpdateTicket = (id: string, data: Partial<ComplaintTicket>) => {
    setComplaints((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const adminUpdateBooking = (id: string, data: Partial<AmenityBooking>) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
  };

  const adminUpdateTenantApp = (id: string, data: Partial<TenantApplication>) => {
    setTenants((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addComplaint = (ticketData: Omit<ComplaintTicket, 'id' | 'createdAt' | 'status'>): string => {
    const randomId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newTicket: ComplaintTicket = {
      ...ticketData,
      id: randomId,
      createdAt: formattedDate,
      status: 'Open',
    };
    setComplaints((prev) => [newTicket, ...prev]);
    return randomId;
  };

  const updateComplaintStatus = (
    id: string,
    status: ComplaintTicket['status'],
    resolutionNotes?: string,
    assignedVendor?: string
  ) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              ...(resolutionNotes ? { resolutionNotes } : {}),
              ...(assignedVendor ? { assignedVendor } : {}),
            }
          : c
      )
    );
  };

  const addBooking = (bookingData: Omit<AmenityBooking, 'id' | 'bookingDate' | 'status'>): string => {
    const bookingId = `BKG-${Math.floor(100 + Math.random() * 900)}`;
    const today = new Date().toISOString().split('T')[0];
    const newBooking: AmenityBooking = {
      ...bookingData,
      id: bookingId,
      bookingDate: today,
      status: 'Confirmed',
    };
    setBookings((prev) => [newBooking, ...prev]);
    return bookingId;
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
  };

  const addTenantApplication = (
    appData: Omit<TenantApplication, 'id' | 'dateSubmitted' | 'policeVerificationStatus' | 'nocStatus'>
  ): string => {
    const appId = `TAPP-${Math.floor(100 + Math.random() * 900)}`;
    const today = new Date().toISOString().split('T')[0];
    const newApp: TenantApplication = {
      ...appData,
      id: appId,
      dateSubmitted: today,
      policeVerificationStatus: 'Pending Review',
      nocStatus: 'Pending',
    };
    setTenants((prev) => [newApp, ...prev]);
    return appId;
  };

  const updateTenantStatus = (
    id: string,
    nocStatus: TenantApplication['nocStatus'],
    policeStatus?: TenantApplication['policeVerificationStatus']
  ) => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              nocStatus,
              ...(policeStatus ? { policeVerificationStatus: policeStatus } : {}),
            }
          : t
      )
    );
  };

  const addTankerLog = (tankerData: Omit<WaterTankerLog, 'id' | 'status'>) => {
    const newTanker: WaterTankerLog = {
      ...tankerData,
      id: `TNK-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Verified',
    };
    setTankers((prev) => [newTanker, ...prev]);
  };

  const updateInspectionItem = (day: number, itemId: number, status: string, remarks?: string) => {
    setInspections((prev) => {
      const existing = prev.find((rep) => rep.day === day);
      if (existing) {
        return prev.map((rep) =>
          rep.day === day
            ? {
                ...rep,
                items: rep.items.map((it) =>
                  it.id === itemId
                    ? { ...it, status, ...(remarks !== undefined ? { remarks } : {}) }
                    : it
                ),
              }
            : rep
        );
      } else {
        const todayStr = new Date().toISOString().split('T')[0];
        const newReport: DailyInspectionReport = {
          day,
          date: todayStr,
          supervisorName: 'Supervisor Desk',
          verifiedByAdmin: '',
          adminComments: '',
          isSubmitted: false,
          isVerified: false,
          items: DEFAULT_33_ACTIVITIES.map((act) => ({
            id: act.id,
            category: act.category,
            activity: act.activity,
            status: act.id === itemId ? status : act.defaultStatus,
            remarks: act.id === itemId && remarks ? remarks : '',
          })),
        };
        return [...prev, newReport];
      }
    });
  };

  const submitInspection = (day: number) => {
    const now = new Date();
    const timeStr = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setInspections((prev) =>
      prev.map((rep) =>
        rep.day === day
          ? {
              ...rep,
              isSubmitted: true,
              submittedAt: timeStr,
            }
          : rep
      )
    );
  };

  const verifyInspection = (day: number, verifiedByAdmin: string, adminComments: string) => {
    const now = new Date();
    const timeStr = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setInspections((prev) =>
      prev.map((rep) =>
        rep.day === day
          ? {
              ...rep,
              isVerified: true,
              verifiedByAdmin: verifiedByAdmin || userName,
              adminComments: adminComments || 'Inspected and verified by Estate Admin.',
              verifiedAt: timeStr,
            }
          : rep
      )
    );
  };

  const updateAttendance = (staffSrNo: number, day: number, code: AttendanceCode) => {
    setAttendance((prev) => ({
      ...prev,
      [staffSrNo]: {
        ...(prev[staffSrNo] || {}),
        [day]: code,
      },
    }));
  };

  const bulkMarkAttendance = (day: number, code: AttendanceCode) => {
    setAttendance((prev) => {
      const next: Record<number, Record<number, AttendanceCode>> = { ...prev };
      staffList.forEach((staff) => {
        next[staff.srNo] = {
          ...(next[staff.srNo] || {}),
          [day]: code,
        };
      });
      return next;
    });
  };

  const escalateChecklistToTicket = (itemId: number, activity: string, remarks: string): string => {
    let cat: ComplaintTicket['category'] = 'Other';
    if (activity.toLowerCase().includes('water') || activity.toLowerCase().includes('oht') || activity.toLowerCase().includes('leakage')) {
      cat = 'Water Supply';
    } else if (activity.toLowerCase().includes('pump') || activity.toLowerCase().includes('drainage') || activity.toLowerCase().includes('shaft')) {
      cat = 'Plumbing';
    } else if (activity.toLowerCase().includes('light') || activity.toLowerCase().includes('dg') || activity.toLowerCase().includes('electrical')) {
      cat = 'Electrical';
    } else if (activity.toLowerCase().includes('cctv') || activity.toLowerCase().includes('security') || activity.toLowerCase().includes('boom barrier')) {
      cat = 'Security & Access';
    } else if (activity.toLowerCase().includes('cleaning') || activity.toLowerCase().includes('garbage') || activity.toLowerCase().includes('sweeping')) {
      cat = 'Housekeeping';
    }

    const ticketId = addComplaint({
      flatNo: 'Common Estate',
      tower: 'Tower A',
      residentName: 'Facility Supervisor',
      residentType: 'Owner',
      phone: '+91 98220 54101',
      category: cat,
      priority: 'Urgent',
      description: `[Supervisor Daily Inspection Item #${itemId}] ${activity}: ${remarks || 'Defect flagged during daily walkthrough.'}`,
      assignedVendor: 'Estate Technical Team',
    });

    return ticketId;
  };

  return (
    <SocietyContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated,
        isPendingApproval,
        isRejected,
        loginAsRole,
        logout,
        activeTab,
        setActiveTab,
        notices,
        complaints,
        bookings,
        tenants,
        tankers,
        tankCleanings,
        dgLogs,
        amcs,
        parkings,
        staffList,
        inspections,
        attendance,
        selectedInspectionDay,
        setSelectedInspectionDay,
        updateInspectionItem,
        submitInspection,
        verifyInspection,
        updateAttendance,
        bulkMarkAttendance,
        escalateChecklistToTicket,
        addComplaint,
        updateComplaintStatus,
        addBooking,
        cancelBooking,
        addTenantApplication,
        updateTenantStatus,
        addTankerLog,
        isEmergencyOpen,
        setIsEmergencyOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        isAiModalOpen,
        setIsAiModalOpen,
        initialAiPrompt,
        openAiWithPrompt,
        targetAmenity,
        setTargetAmenity,
        userFlat,
        setUserFlat,
        userName,
        setUserName,
        currentMemberId,
        profiles,
        currentProfile,
        registerMember,
        addMemberProfile,
        approveMemberProfile,
        updateUserRole,
        deleteMemberProfile,
        auditLogs,
        vehicles,
        visitorPasses,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        bulkImportVehicles,
        issueVisitorPass,
        updateVisitorPassStatus,
        documents,
        addDocument,
        deleteDocument,
        vendors,
        quotes,
        workOrders,
        onboardVendor,
        addVendorQuote,
        approveQuoteAndReleaseWorkOrder,
        approveWorkOrder,
        requestWorkOrderChanges,
        updateWorkOrderProgress,
        addWorkOrderPayment,
        adminUpdateTicket,
        adminUpdateBooking,
        adminUpdateTenantApp,
        filterOnlyMyFilings,
        setFilterOnlyMyFilings,
        polls,
        castVote,
        createPoll,
        closePoll,
      }}
    >
      {children}
    </SocietyContext.Provider>
  );
};

export const useSociety = () => {
  const context = useContext(SocietyContext);
  if (!context) {
    throw new Error('useSociety must be used within a SocietyProvider');
  }
  return context;
};
