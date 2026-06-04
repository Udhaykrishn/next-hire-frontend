export type UserRole = "CANDIDATE" | "RECRUITER" | "ADMIN";

export interface RecruiterDetail {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  joined: string;
  location: string;
  about: string;
  GSTIN?: string;
  CIN?: string;
  website_link?: string;
  category?: string;
  company_role?: string;
  is_verified_company?: boolean;
  admin_approved?: boolean;
  verification_revoked_reason?: string;
  subscription?: {
    current_plan: string;
    is_subscribed: boolean;
  };
  activity: Array<{
    type: string;
    description: string;
    date: string;
  }>;
}

export interface CandidateDetail {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: string;
  joined: string;
  location: string;
  experience: string;
  skills: string[];
  education: string;
  about: string;
  documents: Array<{
    name: string;
    type: string;
    size: string;
    date: string;
    url: string;
  }>;
  applications: Array<{
    jobTitle: string;
    company: string;
    date: string;
    status: string;
  }>;
  block_description?: string;
}

// Backend Response Types
export interface BackendUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  experience: string;
  role_of_title: string;
  status: string;
  block_description?: string;
  resume_url: {
    key: string;
    url: string;
  };
  bio: string;
  badge: boolean;
  google_id: string;
  createdAt: string;
  skills: string[];
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  subscription: {
    current_plan: string;
    is_subscribed: boolean;
  };
  social_link: {
    linkedin: string;
    portfolio: string;
    github: string;
  };
  profile_url: {
    key: string;
    url: string;
  };
}

export interface BackendRecruiter {
  id: string;
  email: string;
  name: string;
  phone: string;
  GSTIN: string | null;
  CIN: string | null;
  status: string;
  website_link: string | null;
  description: string | null;
  category: string | null;
  company_role: string;
  is_verified_company: boolean;
  admin_approved: boolean;
  verification_revoked_reason: string;
  subscription: {
    current_plan: string;
    is_subscribed: boolean;
  };
  profile_url: {
    key: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string | null;
  company_name?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export interface AdminJobDetail {
  id: string;
  jobTitle: string;
  hiringCompany: string;
  jobType: string;
  locationType: string;
  minSalary: string;
  maxSalary: string;
  posted: string;
  expireIn: string;
  status: string;
  experience: string;
  skills: string[];
  description: string;
  jobDescription?: string;
  belongingCompany: string;
  companyLogo?: string;
  experienceType?: string;
  jobCategory?: string;
  isNightShift?: boolean;
  officeAddress?: string;
  fieldArea?: string;
  jobCity?: string;
  floorDetails?: string;
  showFloorDetails?: boolean;
  industry?: string[];
  payType?: string;
  incentiveAmount?: string;
  perks?: string[];
  hasJoiningFee?: string;
  feeAmount?: string;
  feeReason?: string;
  feeDetails?: string;
  feePaymentTiming?: string;
  gender?: string;
  minAge?: string;
  maxAge?: string;
  education?: string;
  degreeSpecialization?: string[];
  regionalLanguages?: string[];
  englishLevel?: string;
  minExperience?: string;
  isWalkIn?: boolean;
  interviewAddress?: string;
  walkInStartDate?: string;
  walkInEndDate?: string;
  walkInStartTime?: string;
  walkInEndTime?: string;
  interviewInstructions?: string;
  contactPreference?: string;
  hrName?: string;
  hrPhone?: string;
  hrEmail?: string;
  otherRecruiterName?: string;
  otherRecruiterWhatsapp?: string;
  otherRecruiterEmail?: string;
  canCandidateContact?: string;
  whatsappAlerts?: string;
  selectedPlan?: string;
  company_id?: string;
  posted_by?: string;
  is_published?: boolean;
  stats?: {
    total: number;
    reviewing: number;
    interviews: number;
    offers: number;
  };
}

export interface BackendJob {
  id: string;
  jobTitle: string;
  hiringCompany: string;
  jobType: string;
  locationType: string;
  minSalary: string;
  maxSalary: string;
  status: string;
  experience: string;
  skills: string[];
  description: string;
  jobDescription?: string;
  belongingCompany: string;
  companyLogo?: string;
  experienceType?: string;
  jobCategory?: string;
  isNightShift?: boolean;
  officeAddress?: string;
  fieldArea?: string;
  jobCity?: string;
  floorDetails?: string;
  showFloorDetails?: boolean;
  industry?: string[];
  payType?: string;
  incentiveAmount?: string;
  perks?: string[];
  hasJoiningFee?: string;
  feeAmount?: string;
  feeReason?: string;
  feeDetails?: string;
  feePaymentTiming?: string;
  gender?: string;
  minAge?: string;
  maxAge?: string;
  education?: string;
  degreeSpecialization?: string[];
  regionalLanguages?: string[];
  englishLevel?: string;
  minExperience?: string;
  isWalkIn?: boolean;
  interviewAddress?: string;
  walkInStartDate?: string;
  walkInEndDate?: string;
  walkInStartTime?: string;
  walkInEndTime?: string;
  interviewInstructions?: string;
  contactPreference?: string;
  hrName?: string;
  hrPhone?: string;
  hrEmail?: string;
  otherRecruiterName?: string;
  otherRecruiterWhatsapp?: string;
  otherRecruiterEmail?: string;
  canCandidateContact?: string;
  whatsappAlerts?: string;
  selectedPlan?: string;
  company_id?: string;
  posted_by?: string;
  is_published?: boolean;
  createdAt?: string;
  created_at?: string;
  updated_at?: string;
  stats?: {
    total: number;
    reviewing: number;
    interviews: number;
    offers: number;
  };
}
