"use client";

import { Mail } from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { AUTH_PRIMARY_BTN } from "@/components/auth/auth-shell";
import { DynamicFormFields } from "@/components/forms/dynamic-form-fields";
import { useFormConfig } from "@/features/admin-forms/hooks/use-form-config";
import { validateForm } from "@/features/admin-forms/lib/validate-form";
import type { FormField } from "@/features/admin-forms/types/form.types";
import { useAuth } from "@/features/auth/hooks/use-auth";

interface ForgotPasswordFormProps {
  authRole: "recruiter" | "user";
}

const FALLBACK_FIELDS: FormField[] = [
  {
    key: "email",
    label: "Email address",
    type: "email",
    placeholder: "jane@company.com",
    required: true,
    enabled: true,
    locked: true,
    custom: false,
    order: 0,
  },
];

export function ForgotPasswordForm({ authRole }: ForgotPasswordFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading, error } = useAuth();
  const { fields: configFields } = useFormConfig("auth.forgot-password");
  const fields = configFields ?? FALLBACK_FIELDS;

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm(fields, values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      await forgotPassword(values.email, authRole);
      setIsSubmitted(true);
      toast.success("Password reset link sent successfully!");
    } catch (err: unknown) {
      console.error(err);
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to request password reset. Please try again.",
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center space-y-4 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
          <Mail className="h-6 w-6" />
        </div>
        <h3 className="font-display text-[22px] font-medium tracking-tight text-ink">
          Check your email
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-soft">
          If an account exists for{" "}
          <span className="font-semibold text-ink">{values.email}</span>, a
          reset link is on its way. The link works for 30 minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <DynamicFormFields
        fields={fields}
        values={values}
        onChange={handleChange}
        errors={errors}
        idPrefix="forgot"
      />

      <motion.div whileTap={{ scale: 0.98 }} className="pt-2">
        <Button type="submit" className={AUTH_PRIMARY_BTN} disabled={isLoading}>
          {isLoading ? "Sending link…" : "Send reset link"}
        </Button>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
          className="mt-4 rounded-xl bg-red-50 p-3 text-center text-sm font-semibold text-destructive"
        >
          {error}
        </motion.p>
      )}
    </form>
  );
}
