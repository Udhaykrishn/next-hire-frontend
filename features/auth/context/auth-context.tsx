"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUserQuery } from "../hooks/use-auth";
import { authService } from "../services/auth.api";
import type { User, UserRole } from "../types/auth.types";

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  logout: (redirectTo?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: currentUserResponse, isLoading, refetch } = useCurrentUserQuery();

  const user = (currentUserResponse as { data?: User } | null)?.data || null;

  const setUserState = (newUser: User | null) => {
    queryClient.setQueryData(["current-user"], newUser ? { data: newUser } : null);
  };

  const checkAuth = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const logout = async (redirectTo?: string) => {
    try {
      const isAdmin = user?.role === "ADMIN";
      await authService.logout(isAdmin);
      setUserState(null);
      router.push(redirectTo || "/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    isLoading,
    setUser: setUserState,
    checkAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
