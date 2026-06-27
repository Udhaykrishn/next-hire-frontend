import type React from "react";
import { cn } from "@/lib/utils";

/**
 * Shared admin design primitives — calm, neutral, minimal.
 * White surfaces, soft hairline borders, sentence-case headings,
 * coral reserved for primary actions and active states only.
 */

export function AdminPageHeader({
  title,
  accent,
  description,
  actions,
}: {
  /** @deprecated kept for back-compat; no longer rendered as an eyebrow */
  eyebrow?: string;
  title: string;
  /** Optional trailing words; rendered inline as plain text, no styling */
  accent?: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-[24px] font-semibold leading-tight tracking-[-0.01em] text-ink">
          {title}
          {accent ? ` ${accent}` : ""}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-ink">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  );
}

/** Primary action button — the only coral-filled control on a page. */
export function AdminPrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-lg bg-coral px-4 text-sm font-semibold text-white transition-colors hover:bg-coral-active focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 active:translate-y-px disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

const STAT_ICON_TONES = {
  coral: "text-coral",
  ink: "text-muted-ink",
  teal: "text-teal",
  amber: "text-amber",
} as const;

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "ink",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ReactNode;
  tone?: keyof typeof STAT_ICON_TONES;
}) {
  return (
    <div className="rounded-xl border border-hairline bg-white p-5 transition-colors hover:border-hairline-soft">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-muted-ink">{label}</span>
        {icon && (
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg bg-surface-soft",
              STAT_ICON_TONES[tone],
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 text-[28px] font-semibold leading-none tracking-tight text-ink tabular-nums">
        {value}
      </div>
      {hint && <p className="mt-2 text-[13px] text-muted-soft">{hint}</p>}
    </div>
  );
}

const BADGE_TONES = {
  success: "bg-success/10 text-[#2f6e44]",
  warning: "bg-amber/15 text-[#9a6a1f]",
  danger: "bg-destructive/10 text-destructive",
  coral: "bg-coral/10 text-coral-active",
  neutral: "bg-surface-soft text-muted-ink",
} as const;

export function StatusBadge({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof BADGE_TONES;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium",
        BADGE_TONES[tone],
      )}
    >
      {children}
    </span>
  );
}

/** Shared toolbar primitives so search/filter look identical across lists. */
export function AdminSearchInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={cn(
        "h-10 w-full rounded-lg border border-hairline bg-white pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted-soft focus:border-coral/60 focus:ring-2 focus:ring-coral/15",
        className,
      )}
      {...props}
    />
  );
}
