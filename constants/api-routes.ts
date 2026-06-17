export enum ApiAuthRoutes {
  USER_LOGIN = "/auth/user/login",
  USER_SIGNUP = "/auth/user/signup",
  USER_LOGOUT = "/auth/user/logout",
  USER_GOOGLE = "/auth/user/google",
  USER_FORGOT_PASSWORD = "/auth/user/forgot-password",
  USER_RESET_PASSWORD = "/auth/user/reset-password",
  USER_VERIFY_RESET_TOKEN = "/auth/user/verify-reset-token",
  USER_OTP_VERIFY = "/auth/user/otp-verify",
  USER_RESEND_OTP = "/auth/user/resend-otp",

  ADMIN_LOGIN = "/auth/admin/login",
  ADMIN_LOGOUT = "/auth/admin/logout",
  ADMIN_STATUS = "/auth/admin/recruiter/status",

  RECRUITER_LOGIN = "/auth/recruiter/login",
  RECRUITER_SIGNUP = "/auth/recruiter/signup",
  RECRUITER_LOGOUT = "/auth/recruiter/logout",
  RECRUITER_FORGOT_PASSWORD = "/auth/recruiter/forgot-password",
  RECRUITER_RESET_PASSWORD = "/auth/recruiter/reset-password",
  RECRUITER_VERIFY_RESET_TOKEN = "/auth/recruiter/verify-reset-token",
  RECRUITER_OTP_VERIFY = "/auth/recruiter/otp-verify",
}

export enum ApiUserRoutes {
  PROFILE = "/user/profile",
  UPDATE = "/user/update",
  UPLOAD_IMAGE = "/user/profile/upload",
  UPLOAD_RESUME = "/user/profile/resume/upload",

  // Education
  EDUCATION = "/education",

  // Experience / Project
  PROJECT = "/project",

  // Certificate
  CERTIFICATE = "/certificate",

  // Jobs (for candidate)
  JOBS = "/job",
  APPLICATIONS = "/job/applications",
}

export enum ApiRecruiterRoutes {
  PROFILE = "/recruiter/profile",
  UPLOAD_IMAGE = "/recruiter/profile/upload",
  ONBOARDING = "/recruiter/onboarding",
  VERIFY_COMPANY = "/recruiter/verify-company",
  VERIFICATION_START = "/recruiter/verification/start",
  VERIFICATION_SESSION = "/recruiter/verification/session",
  VERIFICATION_VERIFY = "/recruiter/verification/verify",

  // Jobs (for recruiter)
  JOBS = "/job",
  JOBS_RECRUITER = "/job/recruiter",
}

export enum ApiAdminRoutes {
  RECRUITERS = "/recruiter",
  CANDIDATES = "/user",
  JOBS = "/job/all",
}

export enum ApiStripeRoutes {
  CREATE_CHECKOUT_SESSION = "/stripe/create-checkout-session",
}
