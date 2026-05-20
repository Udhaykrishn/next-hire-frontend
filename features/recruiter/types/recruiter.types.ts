export interface Candidate {
  id: string;
  name: string;
  role: string;
  match: number;
  status: "Review" | "Interview" | "Applied" | "Rejected" | "Hired";
  avatar: string;
  location: string;
  experience: string;
}

export interface JobListing {
  id: string;
  title: string;
  applicants: number;
  posted: string;
  status: "Active" | "Closed";
  location: string;
  postedBy: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface RecruiterStats {
  activeJobs: number;
  totalApplicants: number;
  interviews: number;
  hireRate: string;
}

export interface RecruiterProfile {
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
}

export interface UpdateRecruiterProfileDto {
  name?: string;
  phone?: string;
  CIN?: string;
}
