"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.api";
import type { AuthResponse, UserRole } from "../types/auth.types";

export const useCurrentUserQuery = (options = {}) => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: () => authService.getCurrentUser(),
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useVerifyResetTokenQuery = (
  token: string,
  role: "recruiter" | "user",
  options = {},
) => {
  return useQuery({
    queryKey: ["verify-reset-token", token, role],
    queryFn: () => authService.verifyResetToken(token, role),
    enabled: !!token,
    retry: false,
    ...options,
  });
};

interface SignupData {
  email: string;
  password?: string;
  role: UserRole;
  name?: string;
  [key: string]: unknown;
}

export const useAuth = () => {
  const loginMutation = useMutation<
    AuthResponse,
    Error,
    { email: string; password?: string; isAdmin?: boolean }
  >({
    mutationFn: ({ email, password = "", isAdmin = false }) =>
      authService.login(email, password, isAdmin),
  });

  const signupMutation = useMutation<AuthResponse, Error, SignupData>({
    mutationFn: (data) => authService.signup(data),
  });

  const googleAuthMutation = useMutation<AuthResponse, Error, string>({
    mutationFn: (idToken) => authService.googleLogin(idToken),
  });

  const logoutMutation = useMutation<void, Error, { isAdmin?: boolean }>({
    mutationFn: ({ isAdmin = false }) => authService.logout(isAdmin),
  });

  const forgotPasswordMutation = useMutation<
    { message: string },
    Error,
    { email: string; role: "recruiter" | "user" }
  >({
    mutationFn: ({ email, role }) => authService.forgotPassword(email, role),
  });

  const resetPasswordMutation = useMutation<
    { success: boolean; message: string },
    Error,
    {
      data: {
        token: string;
        password?: string;
        confirmPassword?: string;
      };
      role: "recruiter" | "user";
    }
  >({
    mutationFn: ({ data, role }) => authService.resetPassword(data, role),
  });

  const login = async (
    email: string,
    password: string,
    isAdmin: boolean = false,
  ) => {
    return loginMutation.mutateAsync({ email, password, isAdmin });
  };

  const signup = async (data: SignupData) => {
    return signupMutation.mutateAsync(data);
  };

  const googleAuth = async (idToken: string) => {
    return googleAuthMutation.mutateAsync(idToken);
  };

  const logout = async (isAdmin: boolean = false) => {
    await logoutMutation.mutateAsync({ isAdmin });
  };

  const forgotPassword = async (email: string, role: "recruiter" | "user") => {
    return forgotPasswordMutation.mutateAsync({ email, role });
  };

  const resetPassword = async (
    data: {
      token: string;
      password?: string;
      confirmPassword?: string;
    },
    role: "recruiter" | "user",
  ) => {
    return resetPasswordMutation.mutateAsync({ data, role });
  };

  const isLoading =
    loginMutation.isPending ||
    signupMutation.isPending ||
    googleAuthMutation.isPending ||
    logoutMutation.isPending ||
    forgotPasswordMutation.isPending ||
    resetPasswordMutation.isPending;

  const error =
    loginMutation.error?.message ||
    signupMutation.error?.message ||
    googleAuthMutation.error?.message ||
    logoutMutation.error?.message ||
    forgotPasswordMutation.error?.message ||
    resetPasswordMutation.error?.message ||
    null;

  return {
    login,
    signup,
    googleAuth,
    logout,
    forgotPassword,
    resetPassword,
    isLoading,
    error,
  };
};
