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
} from '../data/initialData';

interface SocietyContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
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
  // Supabase Profiles & Approval Flow
  profiles: MemberProfile[];
  addMemberProfile: (profile: Omit<MemberProfile, 'id' | 'memberId' | 'isApproved' | 'registeredDate'>) => string;
  approveMemberProfile: (id: string, isApproved: boolean) => void;
  // Personal Filings Toggle (RLS view for residents)
  filterOnlyMyFilings: boolean;
  setFilterOnlyMyFilings: (filter: boolean) => void;
  // Procurement & Work Orders Engine
  vendors: Vendor[];
  quotes: VendorQuote[];
  workOrders: WorkOrder[];
  addVendorQuote: (quote: Omit<VendorQuote, 'id' | 'submittedDate' | 'status'>) => string;
  approveQuoteAndReleaseWorkOrder: (quoteId: string, startDate?: string, targetCompletionDate?: string) => string;
  updateWorkOrderProgress: (workOrderId: string, progress: number, workStatus?: WorkOrder['workStatus']) => void;
  addWorkOrderPayment: (workOrderId: string, payment: Omit<WorkOrderPayment, 'id' | 'workOrderId'>) => string;
}

const SocietyContext = createContext<SocietyContextType | undefined>(undefined);

export const SocietyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('solitaire_role');
    if (saved === 'member' || saved === 'supervisor' || saved === 'secretary' || saved === 'admin') {
      return saved as UserRole;
    }
    return 'member';
  });

  const [activeTab, setActiveTabState] = useState<string>('home');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [initialAiPrompt, setInitialAiPrompt] = useState<string>('');
  const [targetAmenity, setTargetAmenity] = useState<'pool' | 'gym' | 'clubhouse' | 'play_area'>('pool');
  const [userFlat, setUserFlat] = useState<string>('A-402');
  const [userName, setUserName] = useState<string>('Rajesh Sharma');
  const [currentMemberId, setCurrentMemberId] = useState<string>('SOL-A-402');

  // Supabase Dual-Layer Visibility: Personal filings toggle (RLS filter)
  const [filterOnlyMyFilings, setFilterOnlyMyFilings] = useState<boolean>(() => {
    return (localStorage.getItem('solitaire_role') || 'member') === 'member';
  });

  // Supabase Profiles & Admin Approval Flow (is_approved = false by default)
  const [profiles, setProfiles] = useState<MemberProfile[]>(() => {
    const saved = localStorage.getItem('solitaire_profiles');
    return saved ? JSON.parse(saved) : INITIAL_PROFILES;
  });

  useEffect(() => {
    localStorage.setItem('solitaire_profiles', JSON.stringify(profiles));
  }, [profiles]);

  // Vendors & Quotes
  const [vendors] = useState<Vendor[]>(INITIAL_VENDORS);
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
    return saved ? JSON.parse(saved) : INITIAL_WORK_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('solitaire_work_orders', JSON.stringify(workOrders));
  }, [workOrders]);

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

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('solitaire_role', newRole);
    if (newRole === 'member') {
      setUserName('Rajesh Sharma (Resident Member)');
      setUserFlat('A-402');
      setCurrentMemberId('SOL-A-402');
      setFilterOnlyMyFilings(true);
    } else if (newRole === 'supervisor') {
      setUserName('Parvez (Facility Supervisor)');
      setUserFlat('Estate Operations Desk');
      setCurrentMemberId('SOL-SUP-01');
      setFilterOnlyMyFilings(false);
    } else if (newRole === 'secretary') {
      setUserName('Pooja Hegde-Patil (MC Secretary)');
      setUserFlat('B-801');
      setCurrentMemberId('SOL-B-801');
      setFilterOnlyMyFilings(false);
    } else if (newRole === 'admin') {
      setUserName('Soleha Khan & Sanjeev Mathur (Estate Admin & Chairman)');
      setUserFlat('Society Office / A-1202');
      setCurrentMemberId('SOL-ADM-01');
      setFilterOnlyMyFilings(false);
    }
  };

  // Profile methods
  const addMemberProfile = (data: Omit<MemberProfile, 'id' | 'memberId' | 'isApproved' | 'registeredDate'>): string => {
    const today = new Date().toISOString().split('T')[0];
    const towerInitial = data.tower.replace('Tower ', '');
    const cleanFlat = data.flatNo.replace(/[^a-zA-Z0-9]/g, '');
    const genMemberId = `SOL-${towerInitial}-${cleanFlat}`;
    const newId = `usr-${Date.now()}`;
    const newProfile: MemberProfile = {
      ...data,
      id: newId,
      memberId: genMemberId,
      isApproved: false, // Default false until admin approval!
      registeredDate: today,
    };
    setProfiles((prev) => [newProfile, ...prev]);
    return genMemberId;
  };

  const approveMemberProfile = (id: string, isApproved: boolean) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isApproved } : p))
    );
  };

  // Vendor Quotes & Work Order Release
  const addVendorQuote = (quote: Omit<VendorQuote, 'id' | 'submittedDate' | 'status'>): string => {
    const today = new Date().toISOString().split('T')[0];
    const newQuoteId = `QTE-${Date.now().toString().slice(-4)}`;
    const newQuote: VendorQuote = {
      ...quote,
      id: newQuoteId,
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

    // Mark quote as Selected, reject other quotes for the same project
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

    const newWO: WorkOrder = {
      id: newWoId,
      procurementTitle: selectedQuote.projectTitle,
      category: cat,
      vendorId: selectedQuote.vendorId,
      vendorName: selectedQuote.vendorName,
      vendorContact: vendorInfo?.phone || '+91 98220 00000',
      vendorGst: vendorInfo?.gstNumber || '27AAACL0000A1Z1',
      totalApprovedAmount: selectedQuote.quotedAmount,
      startDate: startDate || today,
      targetCompletionDate: target,
      progressPercent: 0,
      scopeSummary: selectedQuote.scopeOfWork,
      workStatus: 'In Progress',
      releasedBy: userName || 'MC Secretary',
      releasedAt: today,
      payments: [],
    };

    setWorkOrders((prev) => [newWO, ...prev]);
    return newWoId;
  };

  const addWorkOrder = (wo: Omit<WorkOrder, 'id' | 'releasedAt' | 'payments'>): string => {
    const today = new Date().toISOString().split('T')[0];
    const newWoId = `WO-2026-${String(workOrders.length + 1).padStart(3, '0')}`;
    const newWO: WorkOrder = {
      ...wo,
      id: newWoId,
      releasedAt: today,
      payments: [],
    };
    setWorkOrders((prev) => [newWO, ...prev]);
    return newWoId;
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

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
  const [amcs, setAmcs] = useState<AMCContract[]>(INITIAL_AMCS);
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
        // Create new day report
        const todayStr = new Date().toISOString().split('T')[0];
        const newReport: DailyInspectionReport = {
          day,
          date: todayStr,
          supervisorName: 'Parvez',
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
              verifiedByAdmin: verifiedByAdmin || 'Soleha Khan',
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
      residentName: 'Facility Supervisor (Parvez)',
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
        addMemberProfile,
        approveMemberProfile,
        filterOnlyMyFilings,
        setFilterOnlyMyFilings,
        vendors,
        quotes,
        workOrders,
        addVendorQuote,
        approveQuoteAndReleaseWorkOrder,
        updateWorkOrderProgress,
        addWorkOrderPayment,
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
