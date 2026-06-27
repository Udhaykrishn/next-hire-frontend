"use client";

import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  AUTH_PRIMARY_BTN,
  AuthHeading,
  AuthShell,
  AuthSubtitle,
} from "@/components/auth/auth-shell";
import { DynamicFormFields } from "@/components/forms/dynamic-form-fields";
import { useFormConfig } from "@/features/admin-forms/hooks/use-form-config";
import { validateForm } from "@/features/admin-forms/lib/validate-form";
import type { FormField } from "@/features/admin-forms/types/form.types";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useAuthRedirect } from "@/features/auth/hooks/use-role-redirect";

const BASE_LOGIN_KEYS = ["email", "password"];

/** Used when the form config can't be fetched, so login never breaks. */
const FALLBACK_LOGIN_FIELDS: FormField[] = [
  {
    key: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
    required: true,
    enabled: true,
    locked: true,
    custom: false,
    order: 0,
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    required: true,
    enabled: true,
    locked: true,
    custom: false,
    order: 1,
  },
];

function LoginContent() {
  const { login, googleAuth, isLoading: loginLoading, error } = useAuth();
  const { setUser, isAuthenticated, isLoading: authLoading } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { fields: configFields } = useFormConfig("auth.login");
  const loginFields = configFields ?? FALLBACK_LOGIN_FIELDS;

  useEffect(() => {
    if (urlError === "blocked") {
      toast.error("This account is on hold. Contact support to get back in.", {
        duration: 5000,
      });
      // Optionally clean up the URL to prevent showing toast repeatedly on refresh
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url);
    }
  }, [urlError]);

  // Redirect if already authenticated
  useAuthRedirect();

  if (authLoading || isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas font-satoshi">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-coral" />
      </div>
    );
  }

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    if (!credentialResponse.credential) {
      toast.error("Google authentication failed: No credential received");
      return;
    }

    try {
      const authResult = await googleAuth(credentialResponse.credential);
      setUser(authResult.user);
      toast.success("Successfully signed in with Google!");
      if (authResult.isProfileComplete === false) {
        router.push("/profile/setup");
      }
    } catch (err) {
      console.error("Google Auth failed:", err);
      const errorObj = err as { message?: string };
      toast.error(
        errorObj.message || "Google authentication failed. Please try again.",
      );
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In was unsuccessful. Please try again.");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allValues: Record<string, string> = { ...formData, ...customValues };
    const errs = validateForm(loginFields, allValues);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    try {
      const response = await login(formData.email, formData.password);
      setUser(response.user);
      toast.success("Successfully signed in!");
    } catch (_err) {
      // Error is handled by the hook and displayed in UI
    }
  };

  const handleFieldChange = (key: string, value: string) => {
    if (BASE_LOGIN_KEYS.includes(key)) {
      setFormData((prev) => ({ ...prev, [key]: value }));
    } else {
      setCustomValues((prev) => ({ ...prev, [key]: value }));
    }
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  return (
    <AuthShell
      eyebrow="Candidate sign in"
      headline={
        <>
          The job you
          <br />
          haven't told
          <br />
          anyone about <em>yet</em>.
        </>
      }
      tagline="Pick up your applications, saved roles and messages right where you left them."
      stats={[
        { value: "2,400+", label: "open roles" },
        { value: "180", label: "hiring teams" },
      ]}
    >
      <AuthHeading>Welcome back</AuthHeading>
      <AuthSubtitle>Sign in to your candidate account.</AuthSubtitle>

      <div className="flex w-full justify-center [&>div]:w-full [&_iframe]:!w-full mb-6">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          theme="outline"
          size="large"
          shape="pill"
          width="360"
          text="continue_with"
        />
      </div>

      <div className="mb-6 flex items-center gap-3 text-xs text-muted-soft">
        <span className="h-px flex-1 bg-hairline" />
        or continue with email
        <span className="h-px flex-1 bg-hairline" />
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-5">
        <DynamicFormFields
          fields={loginFields}
          values={{ ...formData, ...customValues }}
          onChange={handleFieldChange}
          errors={fieldErrors}
          idPrefix="login"
        />
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-[13px] font-semibold text-coral-active transition-colors hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          className={`${AUTH_PRIMARY_BTN} group`}
          disabled={loginLoading}
        >
          {loginLoading ? "Signing in…" : "Sign in"}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mt-5 rounded-xl bg-red-50 p-3 text-center text-sm font-semibold text-destructive"
        >
          {error}
        </motion.p>
      )}

      <div className="mt-6 border-t border-hairline pt-6 text-center text-[13.5px] text-muted-soft">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-coral-active hover:underline"
        >
          Sign up
        </Link>
      </div>
    </AuthShell>
  );
}

export default function UserLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-canvas">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-coral" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
