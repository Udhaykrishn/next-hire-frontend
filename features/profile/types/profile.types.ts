export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
  meta?: {
    took: number;
  };
  path?: string;
  timestamp?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  experience: string;
  role_of_title: string;
  status: string;
  resume_url: {
    key: string;
    url: string;
  };
  bio: string;
  badge: boolean;
  google_id: string;
  createdAt: string;
  skills: string[];
  languages: {
    name: string;
    proficiency: string;
  }[];
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
  cinNumber?: string;
  isCompanyVerified?: boolean;
}

export interface UpdateProfileDto {
  name?: string;
  phone?: string;
  experience?: string;
  role_of_title?: string;
  bio?: string;
  skills?: string[];
  languages?: {
    name: string;
    proficiency: string;
  }[];
  social_link?: {
    linkedin?: string;
    portfolio?: string;
    github?: string;
  };
  cinNumber?: string;
}

export interface Education {
  id: string;
  userId: string;
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  createdAt: string;
}

export interface CreateEducationDto {
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  userId: string;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  url: string;
  githubUrls: { name: string; url: string }[];
  isCollaborative: boolean;
  skillsLearned: string[];
  createdAt: string;
  updatedAt: string;
  company?: string;
  location?: string;
  industry?: string;
  role?: string;
  currentlyWorking?: boolean;
  employmentType?: string;
  noticePeriod?: string;
}

export interface CreateExperienceDto {
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  url?: string;
  githubUrls?: { name: string; url: string }[];
  isCollaborative?: boolean;
  skillsLearned?: string[];
  company?: string;
  location?: string;
  industry?: string;
  role?: string;
  currentlyWorking?: boolean;
  employmentType?: string;
  noticePeriod?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  createdAt: string;
}

export interface CreateCertificateDto {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}
