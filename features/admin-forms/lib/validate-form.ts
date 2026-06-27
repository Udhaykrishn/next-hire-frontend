import type { FormField } from "../types/form.types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Single source of truth for form validation, shared by the admin preview and
 * the live forms so the rules and messages always match. Each field may carry
 * a custom `errorMessage` (admin-defined) that overrides the default text for
 * any failed rule.
 */
export function validateForm(
  fields: FormField[],
  values: Record<string, string>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const value = (values[field.key] ?? "").trim();

    if (field.required && !value) {
      errors[field.key] = field.errorMessage || `${field.label} is required`;
      continue;
    }
    if (!value) continue;

    if (field.type === "email" && !EMAIL_RE.test(value)) {
      errors[field.key] = field.errorMessage || "Enter a valid email address";
      continue;
    }
    if (field.minLength && value.length < field.minLength) {
      errors[field.key] =
        field.errorMessage ||
        `${field.label} must be at least ${field.minLength} characters`;
      continue;
    }
    if (field.pattern) {
      try {
        if (!new RegExp(field.pattern).test(value)) {
          errors[field.key] = field.errorMessage || `${field.label} is invalid`;
        }
      } catch {
        // Ignore an invalid regex source rather than blocking the form.
      }
    }
  }

  const hasPassword = fields.some((f) => f.key === "password");
  const hasConfirm = fields.some((f) => f.key === "confirmPassword");
  if (
    hasPassword &&
    hasConfirm &&
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
