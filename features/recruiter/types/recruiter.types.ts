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
  status: "Active" | "Paused" | "Closed";
  location?: string;
  postedBy?: string;
}

export interface RecruiterStats {
  activeJobs: number;
  totalApplicants: number;
  interviews: number;
  hireRate: string;
}
