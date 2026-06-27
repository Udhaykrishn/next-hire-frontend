"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CTA_OPTIONS,
  ICON_OPTIONS,
  PERIOD_OPTIONS,
} from "../constants/plans.constants";
import {
  type PlanFormProps,
  type PlanFormState,
  planFormSchema,
} from "../types/admin-plans.types";
import { Field } from "./Field";
import { SectionHeader } from "./SectionHeader";

export function PlanForm({
  title,
  subtitle,
  defaultValues,
  onSubmit,
  isPending,
  cancel,
}: PlanFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PlanFormState>({
    resolver: zodResolver(planFormSchema),
    defaultValues: defaultValues || {
      name: "",
      type: "recruiter",
      price: "",
      period: "/month",
      description: "",
      features: [""],
      highlight: false,
      cta: "Get Started",
      iconType: "zap",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features" as never,
  });

  const formValues = watch();

  const handleFormSubmit = (data: PlanFormState) => {
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-canvas font-satoshi">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 border-b border-hairline bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
          <button
            type="button"
            onClick={cancel}
            className="group flex items-center gap-2 text-sm font-medium text-muted-ink transition-colors hover:text-ink"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-white transition-colors group-hover:bg-surface-soft">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Back to plans
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cancel}
              disabled={isPending}
              className="rounded-lg border border-hairline bg-white px-4 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-soft disabled:opacity-60"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-coral px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-active active:translate-y-px disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Saving
                </>
              ) : (
                "Save plan"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        {/* Page Title */}
        <div>
          <h1 className="text-[24px] font-semibold leading-tight tracking-[-0.01em] text-ink">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted-ink">{subtitle}</p>
        </div>

        {/* Section: Identity */}
        <section className="space-y-6 rounded-xl border border-hairline bg-white p-6">
          <SectionHeader step="01" label="Plan identity" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Plan Name" error={errors.name?.message}>
              <input
                type="text"
                {...register("name")}
                placeholder="e.g. Pro Recruiter"
                className={inputClass(!!errors.name)}
              />
            </Field>

            <Field label="Target Audience" error={errors.type?.message}>
              <select
                {...register("type")}
                className={inputClass(!!errors.type)}
              >
                <option value="candidate">Candidate</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </Field>
          </div>

          <Field label="Description" error={errors.description?.message}>
            <textarea
              {...register("description")}
              placeholder="A short, compelling description of this plan..."
              rows={3}
              className={`${inputClass(!!errors.description)} resize-none`}
            />
          </Field>

          <Field label="Call-to-Action Button" error={errors.cta?.message}>
            <select {...register("cta")} className={inputClass(!!errors.cta)}>
              {CTA_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>
        </section>

        {/* Section: Pricing */}
        <section className="space-y-6 rounded-xl border border-hairline bg-white p-6">
          <SectionHeader step="02" label="Pricing" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Price (INR)" error={errors.price?.message}>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 select-none text-sm font-medium text-muted-soft">
                  ₹
                </span>
                <input
                  type="text"
                  {...register("price")}
                  placeholder="0.00"
                  className={`${inputClass(!!errors.price)} pl-8`}
                />
              </div>
            </Field>

            <Field label="Billing Period" error={errors.period?.message}>
              <select
                {...register("period")}
                className={inputClass(!!errors.period)}
              >
                {PERIOD_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Price Preview */}
          {formValues.price && !errors.price && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-lg border border-hairline bg-surface-soft px-4 py-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              <span className="text-sm font-medium text-body">
                Preview:{" "}
                <span className="font-semibold text-ink tabular-nums">
                  ₹{formValues.price}
                </span>
                <span className="font-normal text-muted-soft">
                  {" "}
                  {formValues.period || "/month"}
                </span>
              </span>
            </motion.div>
          )}
        </section>

        {/* Section: Icon Theme */}
        <section className="space-y-6 rounded-xl border border-hairline bg-white p-6">
          <SectionHeader step="03" label="Icon theme" />
          <div className="grid grid-cols-3 gap-3">
            {ICON_OPTIONS.map((opt) => {
              const selected = formValues.iconType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setValue("iconType", opt.value)}
                  className={`relative rounded-lg border p-4 text-left transition-colors ${
                    selected
                      ? "border-coral/50 bg-coral/[0.04]"
                      : "border-hairline bg-white hover:border-hairline-soft hover:bg-surface-soft/60"
                  }`}
                >
                  {selected && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-coral">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                  )}
                  <span className="mb-1 block text-[22px]">
                    {opt.label.split("  ")[0]}
                  </span>
                  <span className="block text-[13px] font-semibold text-ink">
                    {opt.label.split("  ")[1]}
                  </span>
                  <span className="text-[11px] text-muted-soft">
                    {opt.hint}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.iconType && (
            <p className="mt-2 text-sm text-destructive">
              {errors.iconType.message}
            </p>
          )}
        </section>

        {/* Section: Features */}
        <section className="space-y-6 rounded-xl border border-hairline bg-white p-6">
          <div className="flex items-center justify-between">
            <SectionHeader step="04" label="Features" />
            <button
              type="button"
              onClick={() => append("")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-1.5 text-[13px] font-medium text-body transition-colors hover:bg-surface-soft"
            >
              <Plus className="h-3.5 w-3.5" />
              Add feature
            </button>
          </div>

          {errors.features && !Array.isArray(errors.features) && (
            <p className="text-xs font-medium text-destructive">
              {errors.features.message}
            </p>
          )}

          <AnimatePresence>
            <div className="space-y-2.5">
              {fields.map((field, i) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, height: 0 }}
                  className="flex items-center gap-2.5"
                >
                  <span className="w-5 shrink-0 text-right text-xs font-medium text-muted-soft tabular-nums">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register(`features.${i}` as const)}
                      placeholder={`Feature ${i + 1}`}
                      className="w-full rounded-lg border border-hairline bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-soft focus:border-coral/60 focus:ring-2 focus:ring-coral/15"
                    />
                    {Array.isArray(errors.features) && errors.features[i] && (
                      <p className="ml-1 mt-1 text-xs font-medium text-destructive">
                        {errors.features[i]?.message}
                      </p>
                    )}
                  </div>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-ink transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </section>

        {/* Section: Display Options */}
        <section className="rounded-xl border border-hairline bg-white p-6">
          <SectionHeader step="05" label="Display options" />
          <div className="mt-6">
            <label className="group flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                {...register("highlight")}
                className="sr-only"
              />
              <div
                className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                  formValues.highlight ? "bg-coral" : "bg-surface-cream-strong"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
                    formValues.highlight ? "left-6" : "left-1"
                  }`}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">
                  Highlight as recommended
                </p>
                <p className="mt-0.5 text-[13px] text-muted-ink">
                  Display this plan with a badge and an emphasized card to draw
                  attention.
                </p>
              </div>
            </label>
          </div>
        </section>

        <div className="flex items-center justify-between pb-8 pt-2">
          <p className="text-[13px] text-muted-soft">
            Fields marked <span className="text-destructive">*</span> are
            required.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={cancel}
              disabled={isPending}
              className="rounded-lg border border-hairline bg-white px-4 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-soft disabled:opacity-60"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-coral px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-active active:translate-y-px disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Saving
                </>
              ) : (
                "Save plan"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-white ${
    hasError
      ? "border-destructive/40 focus:border-destructive focus:ring-destructive/15"
      : "border-hairline focus:border-coral/60 focus:ring-coral/15"
  } px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:ring-2 placeholder:text-muted-soft`;
}
