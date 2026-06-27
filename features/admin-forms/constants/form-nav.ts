export interface FormNavItem {
  key: string;
  label: string;
  /** Only available forms are wired end-to-end in this slice. */
  available: boolean;
}

export interface FormNavGroup {
  group: string;
  items: FormNavItem[];
}

export const FORM_NAV: FormNavGroup[] = [
  {
    group: "User account",
    items: [{ key: "candidate.signup", label: "Signup", available: true }],
  },
  {
    group: "Candidate profile",
    items: [
      {
        key: "candidate.profile-basic",
        label: "Basic information",
        available: true,
      },
      {
        key: "candidate.job-preferences",
        label: "Job preferences",
        available: true,
      },
      { key: "candidate.education", label: "Education", available: true },
      { key: "candidate.experience", label: "Experience", available: true },
      { key: "candidate.certificate", label: "Certificate", available: true },
      { key: "candidate.language", label: "Language", available: true },
    ],
  },
  {
    group: "Authentication",
    items: [
      { key: "auth.login", label: "Login", available: true },
      { key: "auth.otp", label: "OTP verification", available: true },
      {
        key: "auth.forgot-password",
        label: "Forgot password",
        available: true,
      },
      { key: "auth.reset-password", label: "Reset password", available: true },
    ],
  },
  {
    group: "Recruiter",
    items: [
      { key: "recruiter.profile", label: "Profile", available: false },
      { key: "recruiter.job-create", label: "Job creation", available: false },
    ],
  },
];
