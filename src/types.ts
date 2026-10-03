export type UserRole = 'supervisor' | 'admin' | 'member' | 'secretary';

export type TowerId = 'Tower A' | 'Tower B' | 'Tower C';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  groundingSources?: Array<{ title: string; uri: string }>;
}

export interface StaffMember {
  srNo: number;
  name: string;
  team: 'Supervisor' | 'Office Admin' | 'Security' | 'Housekeeping' | 'Electrician' | 'Plumber';
  role: string;
  shift: string;
  status: 'Active' | 'Inactive';
}

export type AttendanceCode = 'P' | 'A' | 'L' | 'HD' | 'WO' | '';

export interface InspectionItem {
  id: number;
  category: 'UTILITIES & INFRASTRUCTURE' | 'CLEANING & HYGIENE' | 'LIGHTS & SECURITY' | 'RENOVATION & MAINTENANCE';
  activity: string;
  status: string;
  remarks: string;
}

export interface DailyInspectionReport {
  day: number;
  date: string;
  items: InspectionItem[];
  supervisorName: string;
  verifiedByAdmin: string;
  adminComments: string;
  isSubmitted: boolean;
  isVerified: boolean;
  submittedAt?: string;
  verifiedAt?: string;
}

export interface AmenityBooking {
  id: string;
  amenityId: 'pool' | 'gym' | 'clubhouse' | 'play_area';
  amenityName: string;
  residentName: string;
  flatNo: string;
  tower: TowerId;
  date: string;
  timeSlot: string;
  guestsCount: number;
  status: 'Confirmed' | 'Pending Review' | 'Cancelled';
  bookingDate: string;
  purpose?: string;
}

export interface ComplaintTicket {
  id: string;
  flatNo: string;
  tower: TowerId;
  residentName: string;
  residentType: 'Owner' | 'Tenant';
  phone: string;
  category: 'Plumbing' | 'Electrical' | 'Lift / Elevator' | 'STP & Drainage' | 'Water Supply' | 'Security & Access' | 'Housekeeping' | 'Other';
  priority: 'Normal' | 'Urgent';
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  resolutionNotes?: string;
  assignedVendor?: string;
}

export interface TenantApplication {
  id: string;
  ownerName: string;
  ownerFlat: string;
  ownerTower: TowerId;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  leaseStartDate: string;
  leaseDurationMonths: number;
  familyMembersCount: number;
  elevatorShiftSlot: string;
  policeVerificationDoc: string;
  policeVerificationStatus: 'Verified' | 'Pending Review' | 'Not Submitted';
  nocStatus: 'Approved' | 'Pending' | 'Rejected';
  dateSubmitted: string;
  vehicleCount: number;
}

export interface WaterTankerLog {
  id: string;
  date: string;
  time: string;
  vendor: string;
  capacityLiters: number;
  cost: number;
  source: 'Municipal Line Shortfall' | 'Borewell Assist' | 'Scheduled Buffer';
  receivedByGuard: string;
  status: 'Verified' | 'Pending Verification';
}

export interface TankCleaningRecord {
  id: string;
  tankName: string;
  type: 'Overhead Tank' | 'Underground Sump' | 'STP Treated Tank';
  tower: string;
  capacityLiters: number;
  lastCleaned: string;
  nextScheduled: string;
  contractor: string;
  tdsReading: number;
  phValue: number;
  bacteriologicalTest: 'Safe / Compliant' | 'Follow-up Needed';
  certificateId: string;
}

export interface DGRunLog {
  id: string;
  date: string;
  outageCause: string;
  durationMinutes: number;
  dieselConsumedLiters: number;
  fuelLevelAfterPercent: number;
  loggedBy: string;
}

export interface AMCContract {
  id: string;
  serviceName: string;
  category: 'Lifts' | 'STP Chemical' | 'DG Backup' | 'Swimming Pool' | 'Fire Safety' | 'Security Systems';
  vendorCompany: string;
  contactPerson: string;
  phone: string;
  startDate: string;
  expiryDate: string;
  annualFee: number;
  status: 'Active' | 'Expiring Soon' | 'In Renewal';
  frequency: string;
}

export interface SocietyNotice {
  id: string;
  title: string;
  date: string;
  category: 'General' | 'Maintenance' | 'Water' | 'Governance';
  summary: string;
  isPinned: boolean;
  urgent: boolean;
}

export interface ParkingSlot {
  slotNo: string;
  tower: TowerId;
  level: 'Stilt' | 'Basement 1' | 'Basement 2';
  flatAssigned: string;
  vehicleType: '4 Wheeler (Car)' | '2 Wheeler (Bike)' | 'EV (4 Wheeler)' | 'EV (2 Wheeler)';
  vehicleNumber?: string;
  vehicleModel?: string;
  isEv?: boolean;
  rfidTagNo: string;
  status: 'Allocated' | 'Available' | 'Visitor / Guest';
  allocatedDate?: string;
  ownerName?: string;
}

export interface VisitorParkingPass {
  id: string;
  passNumber: string;
  guestName: string;
  guestPhone: string;
  vehicleNumber: string;
  vehicleType: 'Car' | 'Bike';
  hostFlat: string;
  hostName: string;
  assignedSlot: string;
  entryTime: string;
  validUntil: string;
  status: 'Active' | 'Exited' | 'Expired';
}

export interface MemberProfile {
  id: string;
  memberId: string; // e.g. SOL-A-302
  email: string;
  name: string;
  tower: TowerId;
  flatNo: string;
  role: UserRole;
  ownershipType: 'Owner' | 'Tenant';
  phone: string;
  isApproved: boolean;
  registeredDate: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: 'Plumbing' | 'Electrical' | 'STP & Water' | 'Elevators / Lifts' | 'Civil Works & Painting' | 'Fire & Safety' | 'Security Systems';
  contactPerson: string;
  phone: string;
  email: string;
  gstNumber: string;
  panNumber?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  rating: number;
  registeredDate?: string;
}

export interface QuoteLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface VendorQuote {
  id: string;
  quoteNumber?: string;
  procurementProjectId: string;
  projectTitle: string;
  vendorId: string;
  vendorName: string;
  items?: QuoteLineItem[];
  subtotal?: number;
  gstPercent?: number; // e.g. 18
  taxAmount?: number;
  grandTotal?: number;
  quotedAmount: number; // alias for backwards compatibility
  estimatedDays: number;
  warrantyMonths: number;
  submittedDate: string;
  scopeOfWork: string;
  pdfProposalUrl?: string;
  pdfFileName?: string;
  status: 'Pending Review' | 'Selected' | 'Rejected';
  committeeNotes?: string;
}

export type PaymentStage = 'Advance' | 'Milestone 1' | 'Milestone 2' | 'Final Settlement';
export type PaymentStatus = 'Unpaid' | 'Partially Paid' | 'Fully Paid';
export type WorkOrderApprovalStatus = 'Pending Approval' | 'Approved' | 'Changes Requested' | 'Draft';

export interface WorkOrderPayment {
  id: string;
  workOrderId: string;
  paymentDate: string;
  paymentType: PaymentStage;
  amountPaid: number;
  paymentMode: 'NEFT / RTGS' | 'Cheque' | 'Society Bank Portal';
  referenceUtr: string;
  approvedBy: string;
  notes?: string;
}

export interface WorkOrder {
  id: string; // e.g. WO-2026-001
  procurementTitle: string;
  category: 'STP & Water' | 'Lifts / Elevators' | 'Electrical & DG' | 'Civil Works' | 'Security & CCTV' | 'Fire Safety';
  quoteId?: string;
  quoteNumber?: string;
  vendorId: string;
  vendorName: string;
  vendorContact: string;
  vendorGst: string;
  vendorPan?: string;
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
  };
  items?: QuoteLineItem[];
  subtotal?: number;
  gstPercent?: number;
  taxAmount?: number;
  totalApprovedAmount: number; // Grand total including GST
  startDate: string;
  targetCompletionDate: string;
  progressPercent: number; // 0 to 100
  scopeSummary: string;
  workScope?: string;
  paymentTerms?: string;
  approvalStatus?: WorkOrderApprovalStatus;
  approvingUserId?: string; // e.g. "SOL-MC-SEC-01 (Pooja Hegde)"
  approvedAt?: string;
  secretaryComments?: string;
  workStatus: 'Scheduled' | 'In Progress' | 'Inspection Stage' | 'Completed' | 'On Hold';
  releasedBy: string;
  releasedAt: string;
  payments: WorkOrderPayment[];
}
