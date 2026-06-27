"use client";

import Link from "next/link";
import {
  AuthHeading,
  AuthShell,
  AuthSubtitle,
} from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function UserForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Password help"
      headline={
        <>
          Locked out
          <br />
          happens. <em>Back in</em>
          <br />
          takes a minute.
        </>
      }
      tagline="We'll email a secure link that lets you set a new password."
      stats={[{ value: "30 min", label: "link validity" }]}
    >
      <AuthHeading>Reset your password</AuthHeading>
      <AuthSubtitle>
        Enter your email and we'll send a link to set a new one.
      </AuthSubtitle>

      <ForgotPasswordForm authRole="user" />

      <div className="mt-6 border-t border-hairline pt-6 text-center text-[13.5px] text-muted-soft">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-coral-active hover:underline"
        >
          Sign in
        </Link>
      </div>
    </AuthShell>
  );
}
