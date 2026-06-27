"use client";

import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { ArrowRight, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  AUTH_PRIMARY_BTN,
  AuthHeading,
  AuthShell,
  AuthSubtitle,
} from "@/components/auth/auth-shell";
import { OtpForm } from "@/components/auth/otp-form";
import { DynamicFormFields } from "@/components/forms/dynamic-form-fields";
import { useFormConfig } from "@/features/admin-forms/hooks/use-form-config";
import { validateForm } from "@/features/admin-forms/lib/validate-form";
import type { FormField } from "@/features/admin-forms/types/form.types";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useAuthRedirect } from "@/features/auth/hooks/use-role-redirect";

const BASE_SIGNUP_KEYS = [
  "name",
  "email",
  "phone",
  "password",
  "confirmPassword",
];

/** Used when the form config can't be fetched, so signup never breaks. */
const FALLBACK_SIGNUP_FIELDS: FormField[] = [
  {
    key: "name",
    label: "Full name",
    type: "text",
    placeholder: "John Doe",
    required: true,
    enabled: true,
    locked: true,
    custom: false,
    order: 0,
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
    required: true,
    enabled: true,
    locked: true,
    custom: false,
    order: 1,
  },
  {
    key: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "+91...",
    required: false,
    enabled: true,
    locked: false,
    custom: false,
    order: 2,
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
    order: 3,
  },
  {
    key: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "••••••••",
    required: true,
    enabled: true,
    locked: true,
    custom: false,
    order: 4,
  },
];

export default function UserSignupPage() {
  const {
    signup,
    googleAuth,
    verifyOtp,
    resendOtp,
    isLoading: signupLoading,
    error,
  } = useAuth();
  const { setUser, isAuthenticated, isLoading: authLoading } = useAuthContext();
  const router = useRouter();

  const [step, setStep] = useState<"FORM" | "OTP">("FORM");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { fields: configFields } = useFormConfig("candidate.signup");
  const signupFields = configFields ?? FALLBACK_SIGNUP_FIELDS;

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
      toast.error("Google registration failed: No credential received");
      return;
    }

    try {
      const authResult = await googleAuth(credentialResponse.credential);
      setUser(authResult.user);
      toast.success("Successfully registered with Google!");
    } catch (err) {
      console.error("Google Auth failed:", err);
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google registration was unsuccessful. Please try again.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allValues: Record<string, string> = { ...formData, ...customValues };
    const errs = validateForm(signupFields, allValues);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: "CANDIDATE",
      });
      toast.success("Please verify your email!");
      setStep("OTP");
    } catch (_err) {}
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      const response = await verifyOtp(formData.email, otp, "user");
      setUser(response.user);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Invalid OTP. Please try again.");
      throw err;
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp(formData.email, "user");
      toast.success("OTP resent to your email.");
    } catch (_err) {
      toast.error("Failed to resend OTP.");
    }
  };

  const handleFieldChange = (key: string, value: string) => {
    if (BASE_SIGNUP_KEYS.includes(key)) {
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

  const panel =
    step === "OTP"
      ? {
          eyebrow: "Step 2 of 2 · verify",
          headline: (
            <>
              Almost <em>in</em>.
            </>
          ),
          tagline:
            "One quick check that this inbox is really yours, and your profile is live.",
          stats: undefined,
        }
      : {
          eyebrow: "Create your profile",
          headline: (
            <>
              Your first
              <br />
              standup is
              <br />
              closer than <em>you think</em>.
            </>
          ),
          tagline:
            "One profile, seen by every hiring team you apply to. Set it up once.",
          stats: [{ value: "~4 min", label: "to a complete profile" }],
        };

  const topRight =
    step === "OTP" ? (
      <button
        type="button"
        onClick={() => setStep("FORM")}
        className="text-[13px] font-semibold text-coral-active hover:underline"
      >
        ← Edit email
      </button>
    ) : null;

  return (
    <AuthShell
      eyebrow={panel.eyebrow}
      headline={panel.headline}
      tagline={panel.tagline}
      stats={panel.stats}
      steps={
        step === "FORM" ? { total: 2, current: 1 } : { total: 2, current: 2 }
      }
      topRight={topRight}
    >
      <AnimatePresence mode="wait">
        {step === "FORM" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <AuthHeading>Create your account</AuthHeading>
            <AuthSubtitle>A few details and you're in.</AuthSubtitle>

            <div className="flex w-full justify-center [&>div]:w-full [&_iframe]:!w-full mb-6">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                shape="pill"
                width="360"
                text="signup_with"
              />
            </div>

            <div className="mb-6 flex items-center gap-3 text-xs text-muted-soft">
              <span className="h-px flex-1 bg-hairline" />
              or continue with email
              <span className="h-px flex-1 bg-hairline" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <DynamicFormFields
                fields={signupFields}
                values={{ ...formData, ...customValues }}
                onChange={handleFieldChange}
                errors={fieldErrors}
                idPrefix="signup"
              />
              <Button
                type="submit"
                className={`${AUTH_PRIMARY_BTN} group mt-2`}
                disabled={signupLoading}
              >
                {signupLoading ? "Creating account…" : "Create account"}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-[11.5px] leading-relaxed text-muted-soft">
                By continuing you agree to NextHire's Terms and Privacy Policy.
              </p>
            </form>

            <div className="mt-6 border-t border-hairline pt-6 text-center text-[13.5px] text-muted-soft">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-coral-active hover:underline"
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="flex flex-col"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-card text-coral-active">
              <Mail className="h-6 w-6" />
            </div>
            <AuthHeading>Check your email</AuthHeading>
            <AuthSubtitle>
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-ink">{formData.email}</span>.
              Enter it below to confirm it's you.
            </AuthSubtitle>

            {/* biome-ignore lint/a11y/useValidAriaRole: "role" here is a domain prop on OtpForm, not an ARIA role */}
            <OtpForm
              id={formData.email}
              role="user"
              onVerify={handleVerifyOtp}
            />
            <p className="mt-6 text-center text-[13px] text-muted-ink">
              Didn't get it?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="font-semibold text-coral-active hover:underline"
              >
                Resend code
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

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
    </AuthShell>
  );
}
