"use client";

import { AlertTriangle, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  AuthHeading,
  AuthShell,
  AuthSubtitle,
} from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { useVerifyResetTokenQuery } from "@/features/auth/hooks/use-auth";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const typeParam = searchParams.get("type");
  const role = typeParam === "recruiter" ? "recruiter" : "user";

  const { data: isValid = false, isLoading: isValidating } =
    useVerifyResetTokenQuery(token || "", role);

  const loginLink = role === "recruiter" ? "/recruiter/login" : "/login";
  const forgotLink =
    role === "recruiter" ? "/recruiter/forgot-password" : "/forgot-password";

  const panel = isValidating
    ? {
        eyebrow: "Secure reset",
        headline: <>One moment.</>,
        tagline: "Checking that this link is still valid.",
      }
    : isValid
      ? {
          eyebrow: "Almost done",
          headline: (
            <>
              Pick a password
              <br />
              and you're <em>set</em>.
            </>
          ),
          tagline: "Choose something only you would know.",
        }
      : {
          eyebrow: "Secure by design",
          headline: (
            <>
              This link has
              <br />
              <em>expired</em>.
            </>
          ),
          tagline:
            "Reset links last 30 minutes for your security. Request a fresh one and you're seconds away.",
        };

  return (
    <AuthShell
      eyebrow={panel.eyebrow}
      headline={panel.headline}
      tagline={panel.tagline}
    >
      {isValidating ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-coral border-t-transparent" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-soft">
            Checking link security
          </p>
        </div>
      ) : isValid && token ? (
        <>
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-card text-coral-active">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <AuthHeading>Set a new password</AuthHeading>
          <AuthSubtitle>
            Choose a password you'll remember — at least 6 characters.
          </AuthSubtitle>
          <ResetPasswordForm token={token} role={role} />
        </>
      ) : (
        <>
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber/10 text-amber">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <AuthHeading>This link expired</AuthHeading>
          <AuthSubtitle>
            Reset links last 30 minutes. Request a new one to set your password.
          </AuthSubtitle>
          <Link
            href={forgotLink}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-coral text-[15px] font-bold text-ink transition-colors hover:bg-coral-active hover:text-on-dark"
          >
            Request new link
          </Link>
        </>
      )}

      <div className="mt-6 border-t border-hairline pt-6 text-center text-[13.5px] text-muted-soft">
        <Link
          href={loginLink}
          className="font-semibold text-coral-active hover:underline"
        >
          ← Back to sign in
        </Link>
      </div>
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-canvas">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-coral" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
