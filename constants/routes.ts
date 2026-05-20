export const COOKIE_NAMES = {
  at: "accessToken",
  sid: "session_id",
} as const;

export const ROUTES = {
  ADMIN: {
    LOGIN: "/admin/login",
    DASHBOARD: "/admin/dashboard",
  },
  RECRUITER: {
    LOGIN: "/recruiter/login",
    DASHBOARD: "/recruiter/dashboard",
  },
  USER: {
    LOGIN: "/login",
    DASHBOARD: "/profile",
  },
} as const;
