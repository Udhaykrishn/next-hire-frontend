import {
  ApiAuthRoutes,
  ApiRecruiterRoutes,
  ApiUserRoutes,
  ApiInterviewerRoutes,
} from "@/constants/api-routes";
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
    role: "admin" | "recruiter" | "user" | "interviewer" = "user",
  ): Promise<AuthResponse> => {
    let endpoint: string = ApiAuthRoutes.USER_LOGIN;
    if (role === "admin") endpoint = ApiAuthRoutes.ADMIN_LOGIN;
    else if (role === "recruiter") endpoint = ApiAuthRoutes.RECRUITER_LOGIN;
    else if (role === "interviewer") endpoint = ApiAuthRoutes.INTERVIEWER_LOGIN;

    const res = (await apiClient.post(endpoint, {
      email,
      password,
    })) as ApiResponse<BackendAuthResponse>;

    const response = res.data;

    let defaultRole: UserRole = "CANDIDATE";
    if (role === "admin") defaultRole = "ADMIN";
    else if (role === "recruiter") defaultRole = "RECRUITER";
    else if (role === "interviewer") defaultRole = "INTERVIEWER";

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
        ? ApiAuthRoutes.RECRUITER_SIGNUP
        : ApiAuthRoutes.USER_SIGNUP;

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
          const res = await apiClient.get(ApiAuthRoutes.ADMIN_STATUS);
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
            ApiRecruiterRoutes.PROFILE,
          )) as ApiResponse<Record<string, unknown>>;
          return {
            data: {
              ...res.data,
              role: "RECRUITER",
            },
          };
        }
        if (pathname.startsWith("/interviewer")) {
          const res = (await apiClient.get(
            ApiInterviewerRoutes.PROFILE,
          )) as ApiResponse<Record<string, unknown>>;
          return {
            data: {
              ...res.data,
              role: "INTERVIEWER",
            },
          };
        }
      }

      // Default/Fallback logic
      try {
        const res = (await apiClient.get(ApiUserRoutes.PROFILE)) as ApiResponse<
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
            ApiRecruiterRoutes.PROFILE,
          )) as ApiResponse<Record<string, unknown>>;
          return {
            data: {
              ...res.data,
              role: "RECRUITER",
            },
          };
        } catch {
          try {
            const res = (await apiClient.get(
              ApiInterviewerRoutes.PROFILE,
            )) as ApiResponse<Record<string, unknown>>;
            return {
              data: {
                ...res.data,
                role: "INTERVIEWER",
              },
            };
          } catch {
            throw userErr;
          }
        }
      }
    } catch {
      return null;
    }
  },

  logout: async (
    role: "admin" | "recruiter" | "user" | "interviewer" = "user",
  ): Promise<void> => {
    let endpoint: string = ApiAuthRoutes.USER_LOGOUT;
    if (role === "admin") endpoint = ApiAuthRoutes.ADMIN_LOGOUT;
    else if (role === "recruiter") endpoint = ApiAuthRoutes.RECRUITER_LOGOUT;
    else if (role === "interviewer")
      endpoint = ApiAuthRoutes.INTERVIEWER_LOGOUT;
    await apiClient.post(endpoint);
  },

  googleLogin: async (idToken: string): Promise<AuthResponse> => {
    const res = (await apiClient.post(ApiAuthRoutes.USER_GOOGLE, {
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
    await apiClient.post(ApiRecruiterRoutes.ONBOARDING, data);
  },

  forgotPassword: async (
    email: string,
    role: "recruiter" | "user",
  ): Promise<{ message: string }> => {
    const endpoint =
      role === "recruiter"
        ? ApiAuthRoutes.RECRUITER_FORGOT_PASSWORD
        : ApiAuthRoutes.USER_FORGOT_PASSWORD;
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
        ? ApiAuthRoutes.RECRUITER_RESET_PASSWORD
        : ApiAuthRoutes.USER_RESET_PASSWORD;
    return await apiClient.post(endpoint, data);
  },

  verifyResetToken: async (
    token: string,
    role: "recruiter" | "user",
  ): Promise<boolean> => {
    const endpoint =
      role === "recruiter"
        ? ApiAuthRoutes.RECRUITER_VERIFY_RESET_TOKEN
        : ApiAuthRoutes.USER_VERIFY_RESET_TOKEN;
    return await apiClient.post(endpoint, { token });
  },

  verifyOtp: async (
    email: string,
    otp: string,
    role: "recruiter" | "user",
  ): Promise<AuthResponse> => {
    const endpoint =
      role === "recruiter"
        ? ApiAuthRoutes.RECRUITER_OTP_VERIFY
        : ApiAuthRoutes.USER_OTP_VERIFY;
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
    const endpoint = ApiAuthRoutes.USER_RESEND_OTP;
    return await apiClient.post(endpoint, { email });
  },
};
