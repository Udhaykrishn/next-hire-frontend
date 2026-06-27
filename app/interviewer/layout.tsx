"use client";

import { LogOut, Sparkles } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { Button } from "@/components/ui/button";

export default function InterviewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, isAuthenticated, isLoading, user } = useAuthContext();

  const handleLogout = async () => {
    await logout("/interviewer/login");
  };

  const isAuthRoute = pathname === "/interviewer/login";

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isAuthRoute) {
      router.replace("/interviewer/login");
    }
  }, [isLoading, isAuthenticated, isAuthRoute, router]);

  if (isLoading && !isAuthRoute) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas font-satoshi">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-coral" />
      </div>
    );
  }

  if (!isAuthenticated && !isAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    return <main className="min-h-screen bg-canvas">{children}</main>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-satoshi">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-hairline bg-white/80 px-8 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="font-display text-[19px] leading-none text-ink">
            next
            <span className="italic text-coral font-bold font-display">
              Hire
            </span>
          </span>
          <span className="ml-1 rounded-full bg-coral/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-coral">
            Interviewer
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-ink/80">
            {user?.email}
          </span>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl text-sm font-semibold text-muted hover:text-coral hover:bg-coral/5 transition-colors px-3 py-2"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Sign out
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-8 bg-canvas">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
