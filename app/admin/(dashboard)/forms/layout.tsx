"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { AdminPageHeader } from "@/components/admin/ui";
import { FORM_NAV } from "@/features/admin-forms/constants/form-nav";
import { cn } from "@/lib/utils";

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Forms"
        description="Configure the fields shown on the platform's forms. Changes apply to the live form."
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="lg:w-56 lg:shrink-0">
          <div className="space-y-5">
            {FORM_NAV.map((group) => (
              <div key={group.group}>
                <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-soft">
                  {group.group}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => {
                    const href = `/admin/forms/${item.key}`;
                    const active = pathname === href;
                    if (!item.available) {
                      return (
                        <li key={item.key}>
                          <span className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-soft/70">
                            {item.label}
                            <span className="rounded bg-surface-soft px-1.5 py-0.5 text-[10px] font-medium text-muted-soft">
                              Soon
                            </span>
                          </span>
                        </li>
                      );
                    }
                    return (
                      <li key={item.key}>
                        <Link
                          href={href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            active
                              ? "bg-coral/10 text-coral"
                              : "text-muted-ink hover:bg-surface-soft hover:text-ink",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
