import type { ApiResponse } from "@/features/profile/types/profile.types";
import { apiClient } from "@/lib/api-client";
import type {
  AuthResponse,
  BackendAuthResponse,
  BackendSignupResponse,
  RecruiterOnboardingData,
  UserRole,
} from "../types/auth.types";

export const authService = {
  login: async (
    email: string,
    password: string,
    role: "admin" | "recruiter" | "user" = "user",
  ): Promise<AuthResponse> => {
    let endpoint = "/auth/user/login";
    if (role === "admin") endpoint = "/auth/admin/login";
    else if (role === "recruiter") endpoint = "/auth/recruiter/login";

    const res = (await apiClient.post(endpoint, {
      email,
      password,
    })) as ApiResponse<BackendAuthResponse>;

    const response = res.data;

    let defaultRole: UserRole = "CANDIDATE";
    if (role === "admin") defaultRole = "ADMIN";
    else if (role === "recruiter") defaultRole = "RECRUITER";

    return {
      user: response?.user || {
        id: "current",
        email,
        role: defaultRole,
      },
      token: response?.accessToken || "",
    };
  },

  signup: async (data: {
    email: string;
    password?: string;
    confirmPassword?: string;
    role: UserRole;
    name?: string;
    phone?: string;
    [key: string]: unknown;
  }): Promise<AuthResponse> => {
    const endpoint =
      data.role === "RECRUITER"
        ? "/auth/recruiter/signup"
        : "/auth/user/signup";

    const signupPayload: Record<string, unknown> = {
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
    };

    if (data.role === "CANDIDATE") {
      signupPayload.confirmPassword = data.confirmPassword;
    }

    const res = (await apiClient.post(
      endpoint,
      signupPayload,
    )) as ApiResponse<BackendSignupResponse>;

    const response = res.data;

    return {
      user: {
        id: response?.id || "current",
        email: data.email,
        role: data.role,
      },
      token: response?.accessToken || "",
    };
  },

  getCurrentUser: async (): Promise<unknown> => {
    try {
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        if (pathname.startsWith("/admin")) {
          const res = await apiClient.get("/auth/admin/recruiter/status");
          if (res) {
            return {
              data: {
                id: "admin",
                email: "admin@nexthire.ai",
                role: "ADMIN",
              },
            };
          }
        }
        if (pathname.startsWith("/recruiter")) {
          const res = (await apiClient.get(
            "/recruiter/profile",
          )) as ApiResponse<Record<string, unknown>>;
          return {
            data: {
              ...res.data,
              role: "RECRUITER",
            },
          };
        }
      }

      // Default/Fallback logic
      try {
        const res = (await apiClient.get("/user/profile")) as ApiResponse<
          Record<string, unknown>
        >;
        return {
          data: {
            ...res.data,
            role: "CANDIDATE",
          },
        };
      } catch (userErr: unknown) {
        try {
          const res = (await apiClient.get(
            "/recruiter/profile",
          )) as ApiResponse<Record<string, unknown>>;
          return {
            data: {
              ...res.data,
              role: "RECRUITER",
            },
          };
        } catch {
          throw userErr;
        }
      }
    } catch {
      return null;
    }
  },

  logout: async (
    role: "admin" | "recruiter" | "user" = "user",
  ): Promise<void> => {
    let endpoint = "/auth/user/logout";
    if (role === "admin") endpoint = "/auth/admin/logout";
    else if (role === "recruiter") endpoint = "/auth/recruiter/logout";
    await apiClient.post(endpoint);
  },

  googleLogin: async (idToken: string): Promise<AuthResponse> => {
    const res = (await apiClient.post("/auth/user/google", {
      credential: idToken,
    })) as ApiResponse<BackendAuthResponse>;

    const response = res.data;

    return {
      user: response?.user || {
        id: "google",
        email: "google-user@gmail.com",
        role: "CANDIDATE",
      },
      token: response?.accessToken || "",
      isProfileComplete: response?.isProfileComplete ?? true,
    };
  },

  submitOnboarding: async (data: RecruiterOnboardingData): Promise<void> => {
    await apiClient.post("/recruiter/onboarding", data);
  },

  forgotPassword: async (
    email: string,
    role: "recruiter" | "user",
  ): Promise<{ message: string }> => {
    const endpoint =
      role === "recruiter"
        ? "/auth/recruiter/forgot-password"
        : "/auth/user/forgot-password";
    return await apiClient.post(endpoint, { email });
  },

  resetPassword: async (
    data: {
      token: string;
      password?: string;
      confirmPassword?: string;
    },
    role: "recruiter" | "user",
  ): Promise<{ success: boolean; message: string }> => {
    const endpoint =
      role === "recruiter"
        ? "/auth/recruiter/reset-password"
        : "/auth/user/reset-password";
    return await apiClient.post(endpoint, data);
  },

  verifyResetToken: async (
    token: string,
    role: "recruiter" | "user",
  ): Promise<boolean> => {
    const endpoint =
      role === "recruiter"
        ? "/auth/recruiter/verify-reset-token"
        : "/auth/user/verify-reset-token";
    return await apiClient.post(endpoint, { token });
  },

  verifyOtp: async (
    email: string,
    otp: string,
    role: "recruiter" | "user",
  ): Promise<AuthResponse> => {
    const endpoint =
      role === "recruiter"
        ? "/auth/recruiter/otp-verify"
        : "/auth/user/otp-verify";
    const res = (await apiClient.post(endpoint, {
      email,
      otp,
    })) as ApiResponse<BackendAuthResponse>;

    const response = res.data;

    let defaultRole: UserRole = "CANDIDATE";
    if (role === "recruiter") defaultRole = "RECRUITER";

    return {
      user: response?.user || {
        id: "current",
        email,
        role: defaultRole,
      },
      token: response?.accessToken || "",
    };
  },

  resendOtp: async (
    email: string,
    _role: "recruiter" | "user",
  ): Promise<{ message: string }> => {
    // Both user and recruiter use the same redis keys and mechanism for OTP,
    // and the backend only provides resend-otp on the user router.
    const endpoint = "/auth/user/resend-otp";
    return await apiClient.post(endpoint, { email });
  },
};
