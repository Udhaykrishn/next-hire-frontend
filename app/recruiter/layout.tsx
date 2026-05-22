"use client";

import {
  Briefcase,
  CreditCard,
  Database,
  Gift,
  HelpCircle,
  LogOut,
  Menu,
  PhoneCall,
  Receipt,
  Settings,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
  badge?: string;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  active,
  count,
  badge,
  onClick,
}: SidebarItemProps) => (
  <div
    onClick={onClick}
    className={cn(
      "flex items-center justify-between px-6 py-3 cursor-pointer transition-all border-r-4 group",
      active
        ? "bg-wise-green/5 border-wise-green text-near-black"
        : "border-transparent text-gray-400 hover:bg-gray-50 hover:text-near-black",
    )}
  >
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "transition-transform group-hover:scale-110 duration-300",
          active
            ? "text-wise-green"
            : "text-gray-300 group-hover:text-wise-green/60",
        )}
      >
        {icon}
      </div>
      <span className="text-[13px] font-bold tracking-tight">{label}</span>
    </div>
    {count !== undefined && (
      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
        {count}
      </span>
    )}
    {badge && (
      <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 uppercase tracking-widest leading-none">
        {badge}
      </span>
    )}
  </div>
);

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user, isAuthenticated, isLoading } = useAuthContext();

  const handleLogout = async () => {
    await logout("/login");
  };

  const isCreatingJob = pathname.startsWith("/recruiter/jobs/create/new");
  const isPlanPage = pathname.startsWith("/recruiter/plan");
  const isAuthRoute =
    pathname === "/recruiter" ||
    pathname.startsWith("/recruiter/login") ||
    pathname.startsWith("/recruiter/signup") ||
    pathname.startsWith("/recruiter/onboarding") ||
    pathname.startsWith("/recruiter/forgot-password") ||
    pathname.startsWith("/recruiter/reset-password");
  const hideSidebarAndHeader = isCreatingJob || isPlanPage || isAuthRoute;

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isAuthRoute) {
      router.replace("/recruiter/login");
    }
  }, [isLoading, isAuthenticated, isAuthRoute, router]);

  if (isLoading && !isAuthRoute) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-satoshi">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wise-green"></div>
      </div>
    );
  }

  if (!isAuthenticated && !isAuthRoute) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fcfdfd] font-satoshi flex">
      {/* Sidebar - Refined Satoshi Edition */}
      {!hideSidebarAndHeader && (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 left-0 z-50">
          <div className="h-16 flex items-center px-8 border-b border-gray-50 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-wise-green rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-near-black" />
              </div>
              <span className="text-[18px] font-black tracking-tighter text-near-black">
                next<span className="text-wise-green italic">Hire</span>
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            <nav className="space-y-0.5">
              <SidebarItem
                icon={<Briefcase className="w-4 h-4" />}
                label="Jobs"
                active={pathname === "/recruiter/dashboard"}
                onClick={() => router.push("/recruiter/dashboard")}
              />
              <SidebarItem
                icon={<User className="w-4 h-4" />}
                label="Profile"
                active={pathname === "/recruiter/profile"}
                onClick={() => router.push("/recruiter/profile")}
              />
              <SidebarItem
                icon={<Settings className="w-4 h-4" />}
                label="Settings"
                active={pathname === "/recruiter/settings"}
                onClick={() => router.push("/recruiter/settings")}
              />
              <SidebarItem
                icon={<Database className="w-4 h-4" />}
                label="Database"
                onClick={() => {}}
              />
              <SidebarItem
                icon={<TrendingUp className="w-4 h-4" />}
                label="Reports"
                onClick={() => {}}
              />
              <SidebarItem
                icon={<Wallet className="w-4 h-4" />}
                label="Credits & usage"
                onClick={() => {}}
              />
              <SidebarItem
                icon={<Receipt className="w-4 h-4" />}
                label="Billing"
                onClick={() => {}}
              />
              <SidebarItem
                icon={<Gift className="w-4 h-4" />}
                label="Refer & Earn"
                onClick={() => {}}
              />
              <div className="pt-2">
                <SidebarItem
                  icon={<LogOut className="w-4 h-4 text-red-400" />}
                  label="Sign Out"
                  onClick={handleLogout}
                />
              </div>
            </nav>
          </div>

          <div className="p-3 border-t border-gray-50 space-y-0.5">
            <SidebarItem
              icon={<HelpCircle className="w-4 h-4" />}
              label="Help & Support"
            />
            <SidebarItem
              icon={<PhoneCall className="w-4 h-4" />}
              label="Contact Sales"
              badge="Offers"
            />

            <div className="mt-4 px-2 pb-2">
              <div className="bg-gradient-to-br from-wise-green/20 via-wise-green/5 to-transparent rounded-[1.5rem] p-5 relative overflow-hidden border border-wise-green/10">
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-wise-green flex items-center justify-center">
                      <ShoppingBag className="w-3 h-3 text-near-black" />
                    </div>
                    <span className="text-[9px] font-black text-wise-green uppercase tracking-widest">
                      Growth Deal
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-near-black leading-tight">
                    Scale your team with <br />
                    50% more credits.
                  </p>
                  <Button className="w-full h-9 bg-near-black text-white hover:bg-wise-green hover:text-near-black transition-all rounded-full font-black text-[11px] uppercase tracking-wider">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      {!hideSidebarAndHeader && (
        <main className="flex-1 ml-64">
          {/* Top Header */}
          <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-50 flex items-center justify-end px-8 gap-5 sticky top-0 z-40">
            <div className="flex items-center gap-3 py-1.5 px-3 rounded-lg border border-gray-100 bg-gray-50/30">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">
                  Credits
                </span>
                <span className="text-[14px] font-black text-near-black">
                  2,450
                </span>
              </div>
              <div className="w-7 h-7 rounded-full bg-wise-green/10 flex items-center justify-center text-wise-green">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
            </div>

            <div
              onClick={() => router.push("/recruiter/profile")}
              className="flex items-center gap-3 border-l border-gray-100 pl-5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-near-black text-white flex items-center justify-center font-black text-xs transition-transform group-hover:scale-105">
                U
              </div>
              <Menu className="w-4 h-4 text-gray-300 group-hover:text-near-black transition-colors" />
            </div>
          </header>

          {/* Page Content */}
          <div className="p-8">{children}</div>
        </main>
      )}

      {hideSidebarAndHeader && (
        <main className="flex-1 bg-[#fcfdfd]">{children}</main>
      )}
    </div>
  );
}
