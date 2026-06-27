"use client";

import {
  Briefcase,
  ChevronsUpDown,
  CreditCard,
  FormInput,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  UserSquare2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin/dashboard" },
  { icon: UserSquare2, label: "Candidates", href: "/admin/candidates" },
  { icon: Users, label: "Recruiters", href: "/admin/recruiters" },
  { icon: Briefcase, label: "Job posts", href: "/admin/jobs" },
  { icon: CreditCard, label: "Plans", href: "/admin/plans" },
  { icon: FormInput, label: "Forms", href: "/admin/forms" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthContext();

  const handleLogout = async () => {
    await logout("/admin/login");
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const name = user?.fullName?.trim() || "Super Admin";
  const email = user?.email || "admin@nexthire.io";
  const initial = name.charAt(0).toUpperCase();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-hairline bg-white">
      {/* Brand */}
      <div className="flex h-16 items-center gap-2.5 px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral">
          <Sparkles className="h-4 w-4 text-white" />
        </span>
        <span className="text-[16px] font-semibold tracking-tight text-ink">
          nextHire
        </span>
        <span className="ml-auto rounded-md bg-surface-soft px-2 py-0.5 text-[10px] font-medium text-muted-ink">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wide text-muted-soft">
          Management
        </p>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-coral/10 text-coral"
                      : "text-muted-ink hover:bg-surface-soft hover:text-ink",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0 transition-colors",
                      active
                        ? "text-coral"
                        : "text-muted-soft group-hover:text-ink",
                    )}
                    strokeWidth={2}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile */}
      <div className="border-t border-hairline p-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-surface-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/30">
            <Avatar className="h-9 w-9 rounded-lg">
              <AvatarFallback className="rounded-lg bg-coral/15 text-sm font-semibold text-coral">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{name}</p>
              <p className="truncate text-xs text-muted-soft">{email}</p>
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-soft" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="top"
            sideOffset={8}
            className="w-[232px] rounded-xl border-hairline p-1.5 shadow-lg"
          >
            <div className="px-2 py-1.5">
              <p className="truncate text-sm font-medium text-ink">{name}</p>
              <p className="truncate text-xs font-normal text-muted-soft">
                {email}
              </p>
            </div>
            <DropdownMenuSeparator className="bg-hairline-soft" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex h-9 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
