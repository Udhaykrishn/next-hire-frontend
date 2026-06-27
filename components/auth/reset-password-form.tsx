"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
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

interface ResetPasswordFormProps {
  token: string;
  role: "recruiter" | "user";
}

const FALLBACK_FIELDS: FormField[] = [
  {
    key: "password",
    label: "New password",
    type: "password",
    placeholder: "••••••••",
    required: true,
    enabled: true,
    locked: true,
    custom: false,
    order: 0,
    minLength: 6,
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
    order: 1,
    minLength: 6,
  },
];

export function ResetPasswordForm({ token, role }: ResetPasswordFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { resetPassword, isLoading, error: authError } = useAuth();
  const router = useRouter();
  const { fields: configFields } = useFormConfig("auth.reset-password");
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
      await resetPassword(
        {
          token,
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
        role,
      );
      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push(role === "recruiter" ? "/recruiter/login" : "/login");
      }, 2000);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <DynamicFormFields
        fields={fields}
        values={values}
        onChange={handleChange}
        errors={errors}
        idPrefix="reset"
      />

      <motion.div whileTap={{ scale: 0.98 }} className="pt-2">
        <Button type="submit" className={AUTH_PRIMARY_BTN} disabled={isLoading}>
          {isLoading ? "Updating…" : "Update password"}
        </Button>
      </motion.div>

      {authError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
          className="mt-4 rounded-xl bg-red-50 p-3 text-center text-sm font-semibold text-destructive"
        >
          {authError}
        </motion.p>
      )}
    </form>
  );
}
