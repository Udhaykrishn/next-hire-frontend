export const COOKIE_NAMES = {
  at: "accessToken",
  sid: "session_id",
} as const;

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRICING: "/pricing",

  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },

  USER: {
    PROFILE: "/profile",
    PROFILE_SETUP: "/profile/setup",
    PROFILE_EDIT_BASIC: "/profile/edit/basic",
    APPLICATIONS: "/applications",
    JOBS: "/jobs",
    jobDetails: (id: string) => `/jobs/${id}`,
    jobStatus: "/jobs/status",
  },

  PROFILE: {
    CERTIFICATE_ADD: "/profile/certificate/add",
    certificateEdit: (id: string) => `/profile/certificate/edit/${id}`,
    EDUCATION_ADD: "/profile/education/add",
    educationEdit: (id: string) => `/profile/education/edit/${id}`,
    EXPERIENCE_ADD: "/profile/experience/add",
    experienceEdit: (id: string) => `/profile/experience/edit/${id}`,
    JOB_PREFERENCES_EDIT: "/profile/job-preferences/edit",
    LANGUAGE_ADD: "/profile/language/add",
    languageEdit: (id: string) => `/profile/language/edit/${id}`,
  },

  RECRUITER: {
    LOGIN: "/recruiter/login",
    SIGNUP: "/recruiter/signup",
    FORGOT_PASSWORD: "/recruiter/forgot-password",
    forgotPasswordOtp: (id: string) => `/recruiter/forgot-password/otp/${id}`,
    resetPassword: (id: string) => `/recruiter/reset-password/${id}`,

    ONBOARDING: "/recruiter/onboarding",
    SETUP_PLAN: "/recruiter/setup/plan",
    VERIFY_COMPANY: "/recruiter/verify-company",

    DASHBOARD: "/recruiter/dashboard",
    JOBS: "/recruiter/jobs",
    JOBS_CREATE: "/recruiter/jobs/create",
    JOBS_CREATE_NEW: "/recruiter/jobs/create/new",
    APPLICATIONS: "/recruiter/applications",
    PROFILE: "/recruiter/profile",
    SETTINGS: "/recruiter/settings",
    PLAN: "/recruiter/plan",

    // Dynamic
    jobEdit: (id: string) => `/recruiter/jobs/edit/${id}`,
    jobApplications: (id: string) => `/recruiter/jobs/${id}/applications`,
    jobApplicationDetails: (jobId: string, appId: string) =>
      `/recruiter/jobs/${jobId}/applications/${appId}`,
  },

  ADMIN: {
    LOGIN: "/admin/login",
    DASHBOARD: "/admin/dashboard",
    CANDIDATES: "/admin/candidates",
    JOBS: "/admin/jobs",
    RECRUITERS: "/admin/recruiters",
    PLANS: "/admin/plans",
    SETTINGS: "/admin/settings",

    // Dynamic
    candidateDetails: (id: string) => `/admin/candidates/${id}`,
    jobDetails: (id: string) => `/admin/jobs/${id}`,
    recruiterDetails: (id: string) => `/admin/recruiters/${id}`,
  },
} as const;
