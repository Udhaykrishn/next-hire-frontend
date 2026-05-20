export type UserRole = "CANDIDATE" | "RECRUITER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  isProfileComplete?: boolean;
}

export interface RecruiterOnboardingData {
  companyName: string;
  companySize: string;
  isIndividual: boolean;
  industry?: string;
  website?: string;
}
export interface BackendAuthResponse {
  accessToken: string;
  sessionId: string;
  isProfileComplete?: boolean;
  user?: User;
}

export interface BackendSignupResponse {
  id: string;
  accessToken: string;
}
