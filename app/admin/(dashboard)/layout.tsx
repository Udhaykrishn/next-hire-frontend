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
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthContext();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || user?.role !== "ADMIN") {
        router.replace("/admin/login");
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas font-satoshi">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-coral" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-canvas font-satoshi">
      <AdminSidebar />

      <main className="ml-64 flex min-h-screen flex-1 flex-col">
        <AdminHeader />

        <div className="mx-auto w-full max-w-[1320px] flex-1 px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
