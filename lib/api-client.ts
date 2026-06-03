import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

function getCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const method = (config.method ?? "get").toUpperCase();
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    const token = getCsrfToken();
    if (token) {
      config.headers["X-XSRF-TOKEN"] = token;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const backendMessage =
      error.response?.data?.error?.message || error.response?.data?.message;
    const message = backendMessage || error.message || "Something went wrong";
    const isBlockedError = error.response?.status === 403;

    // Do NOT attempt a token refresh if the failing request IS the refresh endpoint.
    // That would cause an infinite retry loop and an unwarranted logout redirect.
    const isRefreshRequest = (
      originalRequest.url as string | undefined
    )?.includes("/api/auth/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        let role = "user";
        if (typeof window !== "undefined") {
          const pathname = window.location.pathname;
          if (pathname.startsWith("/admin")) role = "admin";
          else if (pathname.startsWith("/recruiter")) role = "recruiter";
        }

        // Use fetch() with a root-relative path so the request always hits the
        // Next.js API route at /api/auth/refresh — NOT the backend via apiClient's
        // baseURL (which would resolve to http://backend-host/api/v1/api/auth/refresh).
        const refreshRes = await fetch(`/api/auth/refresh?role=${role}`, {
          method: "POST",
          credentials: "include",
        });

        if (!refreshRes.ok) {
          const body = (await refreshRes.json().catch(() => ({}))) as {
            blocked?: boolean;
          };
          if (body.blocked) throw new Error("blocked");
          throw new Error("refresh_failed");
        }

        const body = (await refreshRes.json()) as {
          success: boolean;
          blocked?: boolean;
        };

        if (body.blocked) throw new Error("blocked");

        // New accessToken cookie is now set — retry the original request.
        return apiClient(originalRequest);
      } catch (err) {
        if (typeof window !== "undefined") {
          const pathname = window.location.pathname;
          let targetPath = "/login";
          if (pathname.startsWith("/admin")) targetPath = "/admin/login";
          else if (pathname.startsWith("/recruiter"))
            targetPath = "/recruiter/login";

          if (pathname !== targetPath) {
            let redirectUrl = targetPath;
            const errorObj = err as { message?: string };
            if (errorObj.message === "blocked") {
              redirectUrl += "?error=blocked";
            }
            window.location.href = redirectUrl;
          }
        }
        return Promise.reject(err);
      }
    }

    if (isBlockedError) {
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        let targetPath = "/login";
        if (pathname.startsWith("/admin")) targetPath = "/admin/login";
        else if (pathname.startsWith("/recruiter"))
          targetPath = "/recruiter/login";

        if (pathname !== targetPath) {
          window.location.href = targetPath + "?error=blocked";
        }
      }
    } else {
      const url = error.config?.url;
      const _isExpectedAuthError =
        url === "/user/profile" ||
        url === "/recruiter/profile" ||
        url?.includes("/auth/admin/recruiter/status");
    }

    return Promise.reject(new Error(message));
  },
);
