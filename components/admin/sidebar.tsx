"use client";

import {
  Briefcase,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  UserSquare2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin/dashboard" },
  { icon: UserSquare2, label: "Candidates", href: "/admin/candidates" },
  { icon: Users, label: "Recruiters", href: "/admin/recruiters" },
  { icon: Briefcase, label: "Job Posts", href: "/admin/jobs" },
  { icon: CreditCard, label: "Plans", href: "/admin/plans" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const _router = useRouter();
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    await logout("/admin/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 left-0 z-50">
      <div className="h-16 flex items-center px-8 border-b border-gray-50 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-near-black rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-wise-green" />
          </div>
          <span className="text-[18px] font-black tracking-tighter text-near-black">
            next<span className="text-wise-green italic">Hire</span>{" "}
            <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded ml-1 uppercase text-gray-400">
              Admin
            </span>
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group",
                isActive
                  ? "bg-wise-green/10 text-near-black shadow-sm shadow-wise-green/5"
                  : "text-gray-500 hover:bg-gray-50 hover:text-near-black",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-wise-green" : "text-gray-400",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors group"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
