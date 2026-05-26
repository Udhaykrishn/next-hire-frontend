"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { AdminHeader } from "@/components/admin/header";
import { AdminSidebar } from "@/components/admin/sidebar";
import { useAuthContext } from "@/features/auth/context/auth-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { replace } = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthContext();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || user?.role !== "ADMIN") {
        replace("/admin/login");
      }
    }
  }, [isLoading, isAuthenticated, user, replace]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-satoshi">
        <div className="animate-spin rounded-full size-12 border-b-2 border-wise-green"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fcfdfd] font-satoshi flex">
      <AdminSidebar />

      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <AdminHeader />

        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}
