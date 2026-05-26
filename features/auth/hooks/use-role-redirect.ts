"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/features/auth/context/auth-context";
import type { UserRole } from "@/features/auth/types/auth.types";

export const useRoleRedirect = (role: UserRole, targetPath: string) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated && user?.role === role) {
      router.push(targetPath);
    }
  }, [isAuthenticated, user, role, targetPath, router]);
};

export const useAuthRedirect = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (user.role === "RECRUITER") {
        router.push("/recruiter/dashboard");
      } else {
        router.push("/profile");
      }
    }
  }, [isAuthenticated, user, router]);
};
