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
    isAdmin: boolean = false,
  ): Promise<AuthResponse> => {
    const endpoint = isAdmin ? "/auth/admin/login" : "/auth/user/login";

    const res = (await apiClient.post(endpoint, {
      email,
      password,
    })) as ApiResponse<BackendAuthResponse>;

    const response = res.data;

    return {
      user: response?.user || {
        id: "current",
        email,
        role: isAdmin ? "ADMIN" : "CANDIDATE",
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

  logout: async (isAdmin: boolean = false): Promise<void> => {
    const endpoint = isAdmin ? "/auth/admin/logout" : "/auth/user/logout";
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
};
