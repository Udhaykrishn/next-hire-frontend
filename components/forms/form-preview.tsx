"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { validateForm } from "@/features/admin-forms/lib/validate-form";
import type {
  FormConfig,
  FormField,
} from "@/features/admin-forms/types/form.types";
import { DynamicFormFields } from "./dynamic-form-fields";

/** Copy that mirrors what each live page shows, so the preview matches reality. */
const FORM_COPY: Record<
  string,
  { title: string; subtitle: string; cta: string; kind: "auth" | "app" }
> = {
  "candidate.signup": {
    title: "Create Account",
    subtitle: "Fill in your details to get started.",
    cta: "Join Now",
    kind: "auth",
  },
  "auth.login": {
    title: "Welcome Back",
    subtitle: "Sign in to continue to your account.",
    cta: "Sign In",
    kind: "auth",
  },
  "auth.otp": {
    title: "Verify Email",
    subtitle: "Enter the verification code we sent you.",
    cta: "Verify",
    kind: "auth",
  },
  "auth.forgot-password": {
    title: "Forgot Password",
    subtitle: "Enter your email and we'll send a reset link.",
    cta: "Send Reset Link",
    kind: "auth",
  },
  "auth.reset-password": {
    title: "Reset Password",
    subtitle: "Choose a new password for your account.",
    cta: "Update Password",
    kind: "auth",
  },
};

/**
 * Renders a form's config inside the same shell its live page uses, and
 * behaves like the real form — validates on submit and shows inline errors —
 * so the admin sees exactly what users / recruiters experience.
 */
export function FormPreview({
  config,
  fields,
}: {
  config: FormConfig;
  fields: FormField[];
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validateForm(fields, values);
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
  };

  const copy = FORM_COPY[config.formKey] ?? {
    title: config.name,
    subtitle: "Complete the form below.",
    cta: "Save",
    kind: "app" as const,
  };

  const body = (
    <>
      <DynamicFormFields
        fields={fields}
        values={values}
        onChange={handleChange}
        errors={errors}
        idPrefix="preview"
      />
      {submitted && (
        <div className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-[13px] font-medium text-[#2f6e44]">
          <CheckCircle2 className="h-4 w-4" />
          Validation passed — this is what the user submits.
        </div>
      )}
    </>
  );

  // Auth pages (signup / login) — replicate the live auth card styling.
  if (copy.kind === "auth") {
    return (
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-gray-50 p-6 sm:p-8"
      >
        <div className="mx-auto max-w-sm overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-gray-200/50">
          <div className="space-y-1 px-7 pb-6 pt-9 text-center">
            <div className="mb-5 flex justify-center">
              <Logo size="md" />
            </div>
            <h3 className="text-2xl font-black leading-tight tracking-tight text-gray-900">
              {copy.title}
            </h3>
            <p className="text-sm font-medium text-gray-500">{copy.subtitle}</p>
          </div>
          <div className="space-y-5 px-7 pb-9">
            {body}
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-wise-green text-lg font-black text-dark-green shadow-lg shadow-wise-green/20 transition-all hover:bg-wise-green/90 active:scale-[0.99]"
            >
              {copy.cta}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    );
  }

  // In-app forms (profile / job creation) — replicate the standard app card.
  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-canvas p-6 sm:p-8">
      <div className="mx-auto max-w-lg rounded-2xl border border-hairline bg-white p-7 shadow-sm">
        <h3 className="mb-1 text-lg font-semibold text-ink">{copy.title}</h3>
        <p className="mb-6 text-sm text-muted-ink">{copy.subtitle}</p>
        <div className="space-y-5">
          {body}
          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-coral text-sm font-semibold text-white transition-colors hover:bg-coral-active active:translate-y-px"
          >
            {copy.cta}
          </button>
        </div>
      </div>
    </form>
  );
}
