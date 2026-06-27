"use client";

import { Filter, Search } from "lucide-react";
import type React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { AdminSearchInput } from "./ui";

/**
 * Shared list-page chrome so candidates / recruiters / jobs share one
 * toolbar, table frame, and empty/loading style.
 */

export function AdminListToolbar({
  searchValue,
  onSearchChange,
  placeholder,
  statuses,
  selected,
  onToggle,
  onClear,
}: {
  searchValue: string;
  onSearchChange: (v: string) => void;
  placeholder: string;
  statuses: string[];
  selected: string[];
  onToggle: (status: string) => void;
  onClear?: () => void;
}) {
  return (
    <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-soft" />
        <AdminSearchInput
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Popover>
        <PopoverTrigger className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-hairline bg-white px-4 text-sm font-medium text-ink transition-colors hover:bg-surface-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/30">
          <Filter className="h-4 w-4 text-muted-ink" />
          Filters
          {selected.length > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-[11px] font-semibold text-white tabular-nums">
              {selected.length}
            </span>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="w-56 rounded-xl border-hairline p-2 shadow-lg"
          align="end"
        >
          <p className="px-2 pb-1.5 pt-1 text-xs font-medium text-muted-soft">
            Filter by status
          </p>
          <div className="space-y-0.5">
            {statuses.map((status) => {
              const active = selected.includes(status);
              return (
                <button
                  type="button"
                  key={status}
                  onClick={() => onToggle(status)}
                  className="group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-surface-soft"
                >
                  <span
                    className={cn(
                      "flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border transition-colors",
                      active
                        ? "border-coral bg-coral"
                        : "border-hairline group-hover:border-muted-soft",
                    )}
                  >
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-[2px] bg-white" />
                    )}
                  </span>
                  <span className="text-sm font-medium text-body">
                    {status}
                  </span>
                </button>
              );
            })}
          </div>
          {onClear && selected.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="mt-1.5 h-9 w-full rounded-lg text-xs font-medium text-muted-ink transition-colors hover:bg-surface-soft hover:text-destructive"
            >
              Clear filters
            </button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function AdminTableFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left">{children}</table>
      </div>
    </div>
  );
}

const TH_BASE =
  "px-5 py-3 text-xs font-medium text-muted-soft whitespace-nowrap";

export function AdminTh({
  children,
  align = "left",
  className,
}: {
  children?: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <th
      className={cn(TH_BASE, align === "right" && "text-right", className)}
      scope="col"
    >
      {children}
    </th>
  );
}

export function AdminTableHeadRow({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-hairline">{children}</tr>
    </thead>
  );
}

export function AdminTableEmpty({
  colSpan,
  icon,
  title,
  hint,
}: {
  colSpan: number;
  icon: React.ReactNode;
  title: string;
  hint?: string;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-5 py-16 text-center">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-muted-soft">
          {icon}
        </div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        {hint && <p className="mt-1 text-[13px] text-muted-ink">{hint}</p>}
      </td>
    </tr>
  );
}

export function AdminTableLoading({ label }: { label: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-white">
      <div className="flex flex-col items-center justify-center gap-3 p-16">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-hairline border-t-coral" />
        <p className="text-[13px] font-medium text-muted-soft">{label}</p>
      </div>
    </div>
  );
}
