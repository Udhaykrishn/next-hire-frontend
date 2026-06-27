"use client";

import { ArrowDown, ArrowUp, Lock, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminPrimaryButton } from "@/components/admin/ui";
import { FormPreview } from "@/components/forms/form-preview";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  FormConfig,
  FormField,
  FormFieldType,
} from "@/features/admin-forms/types/form.types";
import { cn } from "@/lib/utils";

const FIELD_TYPES: FormFieldType[] = [
  "text",
  "email",
  "tel",
  "url",
  "password",
  "textarea",
  "select",
  "number",
  "date",
];

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/30 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-coral" : "bg-surface-cream-strong",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all",
          checked ? "left-[18px]" : "left-0.5",
        )}
      />
    </button>
  );
}

export function FormBuilder({
  config,
  onSave,
  isSaving,
}: {
  config: FormConfig;
  onSave: (fields: FormField[]) => void;
  isSaving: boolean;
}) {
  const [fields, setFields] = useState<FormField[]>(config.fields);

  // Re-sync when a different form config loads.
  useEffect(() => {
    setFields(config.fields);
  }, [config.fields]);

  const update = (index: number, patch: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((field, i) => (i === index ? { ...field, ...patch } : field)),
    );
  };

  const move = (index: number, dir: -1 | 1) => {
    setFields((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((field, i) => ({ ...field, order: i }));
    });
  };

  const remove = (index: number) => {
    setFields((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((field, i) => ({ ...field, order: i })),
    );
  };

  const addCustomField = () => {
    setFields((prev) => [
      ...prev,
      {
        key: `custom_${Date.now()}`,
        label: "New field",
        type: "text",
        placeholder: "",
        required: false,
        enabled: true,
        locked: false,
        custom: true,
        order: prev.length,
      },
    ]);
  };

  const handleSave = () => {
    onSave(fields.map((field, i) => ({ ...field, order: i })));
  };

  const previewFields = [...fields]
    .filter((f) => f.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-ink">{config.name}</h2>
          <p className="text-[13px] text-muted-soft">
            {fields.length} fields · key{" "}
            <span className="tabular-nums">{config.formKey}</span>
          </p>
        </div>
        <AdminPrimaryButton onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving…" : "Save changes"}
        </AdminPrimaryButton>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Field editor */}
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.key}
              className="rounded-xl border border-hairline bg-white p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1 pt-1">
                  <button
                    type="button"
                    aria-label="Move up"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="rounded p-0.5 text-muted-soft transition-colors hover:bg-surface-soft hover:text-ink disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    onClick={() => move(index, 1)}
                    disabled={index === fields.length - 1}
                    className="rounded p-0.5 text-muted-soft transition-colors hover:bg-surface-soft hover:text-ink disabled:opacity-30"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      value={field.label}
                      onChange={(e) => update(index, { label: e.target.value })}
                      placeholder="Field label"
                      className="h-9 flex-1"
                    />
                    {field.locked && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-surface-soft px-2 py-1 text-[11px] font-medium text-muted-ink">
                        <Lock className="h-3 w-3" />
                        System
                      </span>
                    )}
                    {field.custom && (
                      <button
                        type="button"
                        aria-label="Remove field"
                        onClick={() => remove(index)}
                        className="rounded-lg p-1.5 text-muted-ink transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-muted-ink">Type</span>
                      {field.locked ? (
                        <span className="text-[13px] font-medium text-ink">
                          {field.type}
                        </span>
                      ) : (
                        <Select
                          value={field.type}
                          onValueChange={(v) =>
                            update(index, {
                              type: (v as FormFieldType) ?? "text",
                            })
                          }
                        >
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {FIELD_TYPES.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    <span className="flex items-center gap-2 text-[13px] text-muted-ink">
                      <Toggle
                        label="Enabled"
                        checked={field.enabled}
                        disabled={field.locked}
                        onChange={(v) => update(index, { enabled: v })}
                      />
                      Enabled
                    </span>

                    <span className="flex items-center gap-2 text-[13px] text-muted-ink">
                      <Toggle
                        label="Required"
                        checked={field.required}
                        disabled={field.locked}
                        onChange={(v) => update(index, { required: v })}
                      />
                      Required
                    </span>
                  </div>

                  <Input
                    value={field.placeholder ?? ""}
                    onChange={(e) =>
                      update(index, { placeholder: e.target.value })
                    }
                    placeholder="Placeholder text"
                    className="h-9"
                  />

                  <div className="space-y-2 rounded-lg bg-surface-soft/50 p-3">
                    <span className="text-[12px] font-medium text-muted-soft">
                      Validation
                    </span>
                    <Input
                      value={field.errorMessage ?? ""}
                      onChange={(e) =>
                        update(index, { errorMessage: e.target.value })
                      }
                      placeholder="Custom error message (shown when invalid)"
                      className="h-9"
                    />
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <Input
                        type="number"
                        min={0}
                        value={field.minLength ?? ""}
                        onChange={(e) =>
                          update(index, {
                            minLength: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          })
                        }
                        placeholder="Min length"
                        className="h-9"
                      />
                      <Input
                        value={field.pattern ?? ""}
                        onChange={(e) =>
                          update(index, {
                            pattern: e.target.value || undefined,
                          })
                        }
                        placeholder="Pattern (regex, optional)"
                        className="h-9 sm:col-span-2"
                      />
                    </div>
                  </div>

                  {field.type === "select" && (
                    <div className="space-y-1">
                      <span className="text-[13px] text-muted-ink">
                        Options (one per line)
                      </span>
                      <textarea
                        value={(field.options ?? [])
                          .map((o) => o.label)
                          .join("\n")}
                        onChange={(e) =>
                          update(index, {
                            options: e.target.value
                              .split("\n")
                              .map((line) => line.trim())
                              .filter(Boolean)
                              .map((line) => ({ label: line, value: line })),
                          })
                        }
                        rows={3}
                        placeholder={"Option one\nOption two"}
                        className="w-full rounded-lg border border-hairline bg-white p-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-soft focus:border-coral/60 focus:ring-2 focus:ring-coral/15"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addCustomField}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-hairline bg-white py-3 text-sm font-medium text-muted-ink transition-colors hover:border-coral/40 hover:text-coral"
          >
            <Plus className="h-4 w-4" />
            Add custom field
          </button>
        </div>

        {/* Live preview */}
        <div>
          <div className="sticky top-24 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium text-muted-soft">
                Live preview — what users see
              </p>
              <span className="rounded-md bg-surface-soft px-2 py-0.5 text-[11px] font-medium text-muted-ink">
                Interactive
              </span>
            </div>
            {previewFields.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-hairline bg-white py-16 text-center text-[13px] text-muted-ink">
                No enabled fields to preview.
              </div>
            ) : (
              <FormPreview config={config} fields={previewFields} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
