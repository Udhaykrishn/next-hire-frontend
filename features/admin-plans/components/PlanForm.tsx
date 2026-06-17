"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Plus, Sparkles, X } from "lucide-react";
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
    <div className="min-h-screen bg-[#f8f8f6] font-satoshi">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={cancel}
            className="flex items-center gap-2 text-[14px] font-[600] text-gray-500 hover:text-near-black transition-colors group"
          >
            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </span>
            Back to Plans
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={cancel}
              disabled={isPending}
              className="px-5 py-2.5 text-[14px] font-[600] text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isPending}
              className="px-6 py-2.5 text-[14px] font-[700] text-dark-green bg-wise-green rounded-full hover:brightness-105 active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-dark-green/30 border-t-dark-green rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Save Plan
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        {/* Page Title */}
        <div>
          <h1 className="text-[36px] font-[900] text-near-black leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-[15px] text-gray-400 mt-1 font-[500]">
            {subtitle}
          </p>
        </div>

        {/* Section: Identity */}
        <section className="bg-white rounded-2xl p-8 space-y-6 shadow-sm ring-1 ring-gray-100">
          <SectionHeader step="01" label="Plan Identity" />

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
        <section className="bg-white rounded-2xl p-8 space-y-6 shadow-sm ring-1 ring-gray-100">
          <SectionHeader step="02" label="Pricing" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Price (INR)" error={errors.price?.message}>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[15px] font-bold select-none">
                  ₹
                </span>
                <input
                  type="text"
                  {...register("price")}
                  placeholder="0.00"
                  className={`${inputClass(!!errors.price)} pl-9`}
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
              className="flex items-center gap-2 p-4 bg-[#f4faf0] rounded-xl border border-wise-green/30"
            >
              <div className="w-2 h-2 rounded-full bg-wise-green" />
              <span className="text-[14px] font-[600] text-dark-green">
                Preview:{" "}
                <span className="text-[16px]">₹{formValues.price}</span>
                <span className="text-gray-400 font-[400]">
                  {" "}
                  {formValues.period || "/month"}
                </span>
              </span>
            </motion.div>
          )}
        </section>

        {/* Section: Icon Theme */}
        <section className="bg-white rounded-2xl p-8 space-y-6 shadow-sm ring-1 ring-gray-100">
          <SectionHeader step="03" label="Icon Theme" />
          <div className="grid grid-cols-3 gap-3">
            {ICON_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue("iconType", opt.value)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                  formValues.iconType === opt.value
                    ? "border-wise-green bg-[#f4faf0]"
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
              >
                {formValues.iconType === opt.value && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-wise-green flex items-center justify-center">
                    <Check className="w-3 h-3 text-dark-green" />
                  </span>
                )}
                <span className="text-[22px] block mb-1">
                  {opt.label.split("  ")[0]}
                </span>
                <span className="text-[13px] font-[700] text-near-black block">
                  {opt.label.split("  ")[1]}
                </span>
                <span className="text-[11px] text-gray-400">{opt.hint}</span>
              </button>
            ))}
          </div>
          {errors.iconType && (
            <p className="text-sm text-red-500 mt-2">
              {errors.iconType.message}
            </p>
          )}
        </section>

        {/* Section: Features */}
        <section className="bg-white rounded-2xl p-8 space-y-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between">
            <SectionHeader step="04" label="Features" />
            <button
              type="button"
              onClick={() => append("")}
              className="flex items-center gap-1.5 text-[13px] font-[600] text-dark-green bg-[#f4faf0] hover:bg-wise-green/20 px-3 py-1.5 rounded-full transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add feature
            </button>
          </div>

          {errors.features && !Array.isArray(errors.features) && (
            <p className="text-[12px] text-red-500 font-[500]">
              {errors.features.message}
            </p>
          )}

          <AnimatePresence>
            <div className="space-y-3">
              {fields.map((field, i) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, height: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="w-6 text-[12px] font-[700] text-gray-300 text-right flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register(`features.${i}` as const)}
                      placeholder={`Feature ${i + 1}`}
                      className="w-full bg-[#f8f8f6] border border-transparent focus:border-wise-green/50 focus:bg-white rounded-full px-4 py-2.5 text-[14px] text-near-black outline-none transition-all"
                    />
                    {Array.isArray(errors.features) && errors.features[i] && (
                      <p className="text-[12px] text-red-500 font-[500] ml-4 mt-1">
                        {errors.features[i]?.message}
                      </p>
                    )}
                  </div>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors text-gray-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </section>

        {/* Section: Display Options */}
        <section className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-100">
          <SectionHeader step="05" label="Display Options" />
          <div className="mt-6">
            <label className="flex items-start gap-4 cursor-pointer group">
              <input
                type="checkbox"
                {...register("highlight")}
                className="sr-only"
              />
              <div
                className={`mt-0.5 w-11 h-6 rounded-full flex-shrink-0 relative transition-colors duration-200 ${
                  formValues.highlight ? "bg-wise-green" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                    formValues.highlight ? "left-6" : "left-1"
                  }`}
                />
              </div>
              <div>
                <p className="text-[14px] font-[700] text-near-black group-hover:text-dark-green transition-colors">
                  Highlight as Recommended
                </p>
                <p className="text-[12px] text-gray-400 mt-0.5">
                  Display this plan with a visual badge and elevated card style
                  to draw user attention.
                </p>
              </div>
            </label>
          </div>
        </section>

        <div className="flex items-center justify-between pt-4 pb-8">
          <p className="text-[13px] text-gray-400">
            All fields marked with <span className="text-red-400">*</span> are
            required.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={cancel}
              disabled={isPending}
              className="px-5 py-2.5 text-[14px] font-[600] text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={isPending}
              className="px-8 py-2.5 text-[14px] font-[700] text-dark-green bg-wise-green rounded-full hover:brightness-105 active:scale-[0.98] transition-all flex items-center gap-2 shadow-md shadow-wise-green/30 disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-dark-green/30 border-t-dark-green rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Save Plan
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full bg-[#f8f8f6] border ${
    hasError
      ? "border-red-300 bg-red-50/30"
      : "border-transparent focus:border-wise-green/50 focus:bg-white"
  } rounded-xl px-4 py-3 text-[14px] text-near-black outline-none transition-all placeholder:text-gray-300`;
}
