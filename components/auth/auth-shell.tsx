"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

/**
 * Shared chrome for every candidate auth screen.
 *
 * Direction: "The Threshold" — signing in is crossing from outsider to
 * candidate, so the screen is a lit doorway. A deep navy panel carries one
 * editorial line about the career on the other side; the cream form panel
 * stays quiet. The single signature is the warm coral light-leak along the
 * seam where navy meets cream.
 *
 * This is presentation only. Pages keep all their state, handlers, API calls,
 * form-config and validation — they just render their form body as children.
 */

/** Consistent action styles, shared so every screen reads the same. */
export const AUTH_PRIMARY_BTN =
  "h-12 w-full rounded-xl bg-coral text-ink text-[15px] font-bold gap-2 transition-colors hover:bg-coral-active hover:text-on-dark disabled:bg-coral-disabled disabled:text-muted-soft";

export const AUTH_GHOST_BTN =
  "h-12 rounded-xl border border-hairline bg-white text-body font-semibold transition-colors hover:bg-surface-soft";

interface AuthShellProps {
  /** Small uppercase label above the panel headline. */
  eyebrow?: string;
  /** The editorial Fraunces line. Wrap accents in <em>. */
  headline: ReactNode;
  /** One supporting line under the headline. */
  tagline: string;
  /** Optional proof stats shown at the foot of the panel. */
  stats?: { value: string; label: string }[];
  /** Progress through a multi-step flow (1-indexed current). */
  steps?: { total: number; current: number };
  /** Top-right slot of the form column (alt link or back link). */
  topRight?: ReactNode;
  /** Form body: heading, subtitle, fields, actions. */
  children: ReactNode;
}

function Stepper({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => {
        const index = i + 1;
        const isCurrent = index === current;
        const isDone = index < current;
        return (
          <span
            key={index}
            className={cn(
              "h-[7px] rounded-full transition-all",
              isCurrent
                ? "w-6 bg-coral"
                : isDone
                  ? "w-[7px] bg-coral"
                  : "w-[7px] bg-hairline",
            )}
          />
        );
      })}
    </div>
  );
}

export function AuthShell({
  eyebrow,
  headline,
  tagline,
  stats,
  steps,
  topRight,
  children,
}: AuthShellProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid min-h-screen w-full bg-canvas font-satoshi text-body selection:bg-coral selection:text-white lg:grid-cols-[42%_58%]">
      {/* ── Doorway panel ─────────────────────────────────────────── */}
      <aside className="relative flex min-h-[36vh] flex-col justify-between overflow-hidden bg-navy p-8 text-on-dark lg:min-h-screen lg:p-12">
        {/* warm light spilling from the room you're entering */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(115% 80% at 100% 100%, rgba(204,120,92,0.30), transparent 62%)",
          }}
        />
        {/* seam glow — bottom edge on mobile, right edge on desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] blur-[0.5px] lg:hidden"
          style={{
            background:
              "linear-gradient(90deg, transparent, #cc785c, transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[3px] blur-[0.5px] lg:block"
          style={{
            background:
              "linear-gradient(180deg, transparent, #cc785c, transparent)",
          }}
        />

        <div className="relative flex items-center gap-3">
          <Logo size="md" withText={false} />
          <span className="text-xl font-black tracking-tighter">
            <span className="text-on-dark">Next</span>
            <span className="text-coral">Hire</span>
          </span>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative max-w-[22ch] py-8 lg:py-0"
        >
          {eyebrow && (
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-coral">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-[clamp(28px,4vw,40px)] font-medium leading-[1.08] tracking-tight text-on-dark [&_em]:not-italic [&_em]:text-coral">
            {headline}
          </h2>
          <p className="mt-4 max-w-[32ch] text-[14px] leading-relaxed text-on-dark-soft">
            {tagline}
          </p>
        </motion.div>

        {stats && stats.length > 0 ? (
          <div className="relative flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
            {stats.map((s) => (
              <div key={s.label} className="text-[11.5px] text-on-dark-soft">
                <span className="block text-lg font-semibold tabular-nums text-on-dark">
                  {s.value}
                </span>
                {s.label}
              </div>
            ))}
          </div>
        ) : (
          <div className="hidden lg:block" />
        )}
      </aside>

      {/* ── Form panel ────────────────────────────────────────────── */}
      <main className="flex flex-col justify-center px-4 py-12 sm:px-10 lg:px-16 bg-canvas">
        <div className="mx-auto flex w-full max-w-[440px] flex-col">
          <div className="w-full rounded-2xl border border-hairline bg-white p-6 shadow-[0_4px_24px_rgba(20,20,19,0.015)] sm:p-8">
            {(steps || topRight) && (
              <div className="mb-6 flex min-h-[28px] items-center justify-between">
                {steps ? <Stepper {...steps} /> : <span />}
                {topRight ?? null}
              </div>
            )}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
              className="flex flex-col"
            >
              {children}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

/** Fraunces form title — the second (and last) editorial moment per screen. */
export function AuthHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-[27px] font-medium leading-tight tracking-tight text-ink">
      {children}
    </h1>
  );
}

/** Quiet supporting line under the form title. */
export function AuthSubtitle({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 mb-7 text-[15px] leading-relaxed text-muted-ink">
      {children}
    </p>
  );
}
