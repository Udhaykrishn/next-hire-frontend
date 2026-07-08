"use client";

import {
  Briefcase,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  User,
  MessageSquare,
  Users,
  ClipboardList,
  CalendarClock,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { cn } from "@/lib/utils";
import { NotificationCenter } from "@/features/chat/components/NotificationCenter";

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const NAV: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/recruiter/dashboard" },
  { icon: Briefcase, label: "Jobs", href: "/recruiter/jobs" },
  { icon: Users, label: "Interviewers", href: "/recruiter/interviewers" },
  { icon: ClipboardList, label: "Templates", href: "/recruiter/templates" },
  {
    icon: CalendarClock,
    label: "Interview Rounds",
    href: "/recruiter/interview-rounds",
  },
  { icon: MessageSquare, label: "Messages", href: "/recruiter/chat" },
  { icon: User, label: "Company profile", href: "/recruiter/profile" },
  { icon: CreditCard, label: "Billing & plan", href: "/recruiter/plan" },
  { icon: Settings, label: "Settings", href: "/recruiter/settings" },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold transition-colors",
        active
          ? "bg-coral text-white shadow-sm shadow-coral/30"
          : "text-muted-ink hover:bg-surface-soft hover:text-ink",
      )}
    >
      <item.icon
        className={cn(
          "h-[18px] w-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110",
          active ? "text-white" : "text-muted-soft group-hover:text-coral",
        )}
        strokeWidth={2}
      />
      {item.label}
    </Link>
  );
}

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, isAuthenticated, isLoading, user } = useAuthContext();

  const handleLogout = async () => {
    await logout("/login");
  };

  const isCreatingOrEditingJob =
    pathname.startsWith("/recruiter/jobs/create/new") ||
    pathname.startsWith("/recruiter/jobs/edit");
  const isAuthRoute =
    pathname === "/recruiter" ||
    pathname.startsWith("/recruiter/login") ||
    pathname.startsWith("/recruiter/signup") ||
    pathname.startsWith("/recruiter/onboarding") ||
    pathname.startsWith("/recruiter/forgot-password") ||
    pathname.startsWith("/recruiter/reset-password");
  const hideSidebarAndHeader = isCreatingOrEditingJob || isAuthRoute;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isAuthRoute) {
      router.replace("/recruiter/login");
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

  if (hideSidebarAndHeader) {
    return <main className="min-h-screen bg-canvas">{children}</main>;
  }

  return (
    <div className="flex min-h-screen bg-canvas font-satoshi">
      {/* ----------------------------- Sidebar ----------------------------- */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-canvas border-r border-hairline text-ink">
        <div className="flex h-16 items-center gap-2 border-b border-hairline px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="font-display text-[19px] leading-none text-ink">
            next<span className="italic text-coral">Hire</span>
          </span>
          <span className="ml-1 rounded-full bg-surface-soft px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-muted-ink">
            Recruiter
          </span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-soft">
            Workspace
          </p>
          {NAV.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </nav>

        <div className="space-y-1 border-t border-hairline p-3">
          <Link
            href="/contact"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-muted-ink transition-colors hover:bg-surface-soft hover:text-ink"
          >
            <HelpCircle className="h-[18px] w-[18px] group-hover:text-coral" />
            Help & support
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold text-muted-ink transition-colors hover:bg-coral/15 hover:text-coral"
          >
            <LogOut className="h-[18px] w-[18px] transition-transform group-hover:-translate-x-0.5" />
            Sign out
          </button>

          {/* Subscription card */}
          {user?.subscription?.is_subscribed ? (
            <div className="mt-3 rounded-2xl border border-hairline bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-positive-green/10">
                  <Sparkles
                    className="h-3 w-3 text-positive-green"
                    strokeWidth={3}
                  />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-positive-green">
                  Active Plan
                </span>
              </div>
              <p className="mt-2 text-[13px] font-semibold leading-snug text-ink capitalize">
                Plan: {user.subscription.current_plan || "Premium"}
              </p>
              <Link
                href="/recruiter/plan"
                className="mt-3 flex h-9 w-full items-center justify-center rounded-lg border border-hairline bg-canvas text-[12px] font-bold text-ink transition-colors hover:bg-surface-soft"
              >
                Manage plan
              </Link>
            </div>
          ) : (
            <div className="mt-3 rounded-2xl border border-hairline bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-coral/10">
                  <Sparkles className="h-3 w-3 text-coral" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-coral">
                  Growth deal
                </span>
              </div>
              <p className="mt-2 text-[13px] font-semibold leading-snug text-ink">
                Scale your team with 50% more credits.
              </p>
              <Link
                href="/recruiter/plan"
                className="mt-3 flex h-9 w-full items-center justify-center rounded-lg bg-coral text-[12px] font-bold text-white transition-transform hover:scale-[1.02]"
              >
                Upgrade now
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* --------------------------- Main column --------------------------- */}
      <main className="ml-64 flex-1">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-end gap-4 border-b border-hairline bg-canvas/80 px-8 backdrop-blur-md">
          <div className="flex items-center gap-3 rounded-xl border border-hairline bg-white px-3 py-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coral/15 text-coral">
              <CreditCard className="h-3.5 w-3.5" />
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-muted-soft">
                Credits
              </span>
              <span className="text-[14px] font-bold text-ink">2,450</span>
            </div>
          </div>

          {user && <NotificationCenter userRole="RECRUITER" />}

          <button
            type="button"
            onClick={() => router.push("/recruiter/profile")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-[13px] font-bold text-on-dark transition-transform hover:scale-105"
          >
            U
          </button>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
