"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FormField } from "@/features/admin-forms/types/form.types";
import { cn } from "@/lib/utils";

interface DynamicFormFieldsProps {
  fields: FormField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  errors?: Record<string, string>;
  idPrefix?: string;
  disabled?: boolean;
  inputClassName?: string;
}

/**
 * Renders a list of admin-configured fields as a real, controlled form body.
 * Shared by the admin builder preview and the live forms it drives.
 */
export function DynamicFormFields({
  fields,
  values,
  onChange,
  errors = {},
  idPrefix = "field",
  disabled = false,
  inputClassName,
}: DynamicFormFieldsProps) {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const id = `${idPrefix}-${field.key}`;
        const value = values[field.key] ?? "";
        const error = errors[field.key];

        return (
          <div key={field.key} className="space-y-1.5">
            <Label htmlFor={id} className="text-sm font-medium text-ink">
              {field.label}
              {field.required && (
                <span className="ml-0.5 text-destructive">*</span>
              )}
            </Label>

            {field.type === "textarea" ? (
              <Textarea
                id={id}
                value={value}
                placeholder={field.placeholder}
                disabled={disabled}
                aria-invalid={Boolean(error)}
                onChange={(e) => onChange(field.key, e.target.value)}
                className={cn(
                  "min-h-24 rounded-xl border border-hairline bg-white px-3.5 py-2.5 text-base transition-all outline-none placeholder:text-muted-soft focus:border-coral focus:ring-4 focus:ring-coral/10 disabled:cursor-not-allowed disabled:bg-surface-soft disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/10 md:text-sm shadow-xs",
                  inputClassName,
                )}
              />
            ) : field.type === "select" ? (
              <Select
                value={value}
                onValueChange={(v) => onChange(field.key, v ?? "")}
              >
                <SelectTrigger
                  id={id}
                  disabled={disabled}
                  size="lg"
                  className={cn(
                    "w-full bg-white border-hairline shadow-xs focus-visible:border-coral focus-visible:ring-4 focus-visible:ring-coral/10 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/10",
                    inputClassName,
                  )}
                  aria-invalid={Boolean(error)}
                >
                  <SelectValue placeholder={field.placeholder || "Select..."} />
                </SelectTrigger>
                <SelectContent>
                  {(field.options ?? []).map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={id}
                type={field.type}
                value={value}
                placeholder={field.placeholder}
                disabled={disabled}
                aria-invalid={Boolean(error)}
                onChange={(e) => onChange(field.key, e.target.value)}
                className={cn(
                  "h-11 rounded-xl border border-hairline bg-white px-3.5 py-2.5 text-base transition-all outline-none placeholder:text-muted-soft focus:border-coral focus:ring-4 focus:ring-coral/10 disabled:cursor-not-allowed disabled:bg-surface-soft disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/10 md:text-sm shadow-xs",
                  inputClassName,
                )}
              />
            )}

            {error && (
              <p className={cn("text-xs font-medium text-destructive")}>
                {error}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
