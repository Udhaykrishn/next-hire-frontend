"use client";

import { motion } from "framer-motion";
import { Briefcase, Check, FileText, Layers } from "lucide-react";
import type React from "react";
import { JOB_CATEGORIES } from "@/app/recruiter/jobs/create/new/constants";
import type { JobFormData } from "@/app/recruiter/jobs/create/new/types";
import { LocationSelector } from "@/components/recruiter/jobs/location-selector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, formatCurrency } from "@/lib/utils";

interface Step1DetailsProps {
  formData: JobFormData;
  setFormData: React.Dispatch<React.SetStateAction<JobFormData>>;
  errors: Record<string, string>;
}

export const Step1Details = ({
  formData,
  setFormData,
  errors,
}: Step1DetailsProps) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-12"
    >
      <div className="space-y-8">
        <div className="space-y-2 pb-4 border-b border-gray-100">
          <h2 className="text-[20px] font-black text-near-black">
            Job details
          </h2>
          <p className="text-[11px] font-bold text-gray-400">
            We use this information to find the best candidates for the job.
          </p>
          <p className="text-[10px] font-bold text-red-500">
            * Marked fields are mandatory
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-100 relative">
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                <Briefcase className="w-5 h-5 text-wise-green" />
              </div>
              <div className="flex-1" id="field-hiringCompany">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Posting as *
                </p>
                <div className="relative">
                  <Select
                    value={formData.belongingCompany}
                    onValueChange={(val) => {
                      const newValue = val || "";
                      setFormData((prev) => ({
                        ...prev,
                        belongingCompany: newValue,
                        hiringCompany: newValue,
                      }));
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full h-8 p-0 bg-transparent border-0 font-black text-[15px] focus:ring-0 focus:ring-offset-0 shadow-none hover:bg-transparent data-[state=open]:bg-transparent",
                        errors.hiringCompany
                          ? "text-red-500"
                          : "text-near-black",
                      )}
                    >
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Your Company">Your Company</SelectItem>
                      <SelectItem value="Tech Solutions Inc.">
                        Tech Solutions Inc.
                      </SelectItem>
                      <SelectItem value="Global Innovations">
                        Global Innovations
                      </SelectItem>
                      <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {errors.hiringCompany && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.hiringCompany}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-100 relative">
              <div className="flex items-center gap-3 w-full">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                  <FileText className="w-5 h-5 text-wise-green" />
                </div>
                <div className="flex-1" id="field-jobTitle">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Job Title / Role *
                  </p>
                  <Input
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        jobTitle: e.target.value,
                      }))
                    }
                    placeholder="Eg. Backend Developer"
                    className={cn(
                      "w-full h-8 p-0 bg-transparent border-0 font-black text-[15px] focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-gray-300",
                      errors.jobTitle ? "text-red-500" : "text-near-black",
                    )}
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.jobTitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-100 relative">
              <div className="flex items-center gap-3 w-full">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                  <Layers className="w-5 h-5 text-wise-green" />
                </div>
                <div className="flex-1" id="field-jobCategory">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Job Category *
                  </p>
                  <Select
                    value={formData.jobCategory}
                    onValueChange={(val) =>
                      setFormData((prev) => ({
                        ...prev,
                        jobCategory: val || "",
                      }))
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full h-8 p-0 bg-transparent border-0 font-black text-[15px] focus:ring-0 focus:ring-offset-0 shadow-none hover:bg-transparent",
                        errors.jobCategory ? "text-red-500" : "text-near-black",
                      )}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.jobCategory && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.jobCategory}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4" id="field-jobType">
          <Label className="text-[13px] font-black text-near-black">
            Type of Job *
          </Label>
          <div className="flex flex-wrap gap-3">
            {["Full Time", "Part Time", "Both (Full-Time And Part-Time)"].map(
              (t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, jobType: t }))
                  }
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[13px] font-bold border transition-all",
                    formData.jobType === t
                      ? "bg-wise-green/10 border-wise-green text-near-black"
                      : "bg-white border-gray-100 text-gray-400 hover:border-gray-200",
                  )}
                >
                  {t}
                </button>
              ),
            )}
          </div>
          {errors.jobType && (
            <p className="text-red-500 text-xs mt-1">{errors.jobType}</p>
          )}

          <div className="flex items-center gap-3 ml-1 mt-2">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  isNightShift: !prev.isNightShift,
                }))
              }
              className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                formData.isNightShift
                  ? "bg-near-black border-near-black"
                  : "border-gray-200",
              )}
            >
              {formData.isNightShift && (
                <Check className="w-3 h-3 text-white" />
              )}
            </button>
            <span className="text-[13px] font-bold text-gray-500">
              This is a night shift job
            </span>
          </div>
        </div>

        <div className="space-y-4" id="field-experienceType">
          <Label className="text-[13px] font-black text-near-black">
            Experience Type *
          </Label>
          <div className="flex flex-wrap gap-3">
            {["Fresher", "Experienced Only", "Both"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, experienceType: t }))
                }
                className={cn(
                  "px-6 py-2.5 rounded-full text-[13px] font-bold border transition-all",
                  formData.experienceType === t
                    ? "bg-wise-green/10 border-wise-green text-near-black"
                    : "bg-white border-gray-100 text-gray-400 hover:border-gray-200",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.experienceType && (
            <p className="text-red-500 text-xs mt-1">{errors.experienceType}</p>
          )}
        </div>
      </div>

      <LocationSelector
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      <div className="space-y-8">
        <div className="space-y-2 pb-4 border-b border-gray-100">
          <h2 className="text-[20px] font-black text-near-black">
            Compensation & Fees
          </h2>
          <p className="text-[11px] font-bold text-gray-400">
            Details about salary, incentives, and joining fees.
          </p>
        </div>

        <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm shadow-black/[0.02]">
          <div className="p-8 space-y-8">
            <div className="space-y-1">
              <h3 className="text-[18px] font-bold text-near-black">
                Compensation
              </h3>
              <p className="text-[13px] font-medium text-gray-500">
                Job postings with right salary & incentives will help you find
                the right candidates.
              </p>
            </div>

            <div className="space-y-4" id="field-payType">
              <Label className="text-[14px] font-bold text-near-black">
                What is the pay type? <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-3">
                {["Fixed Only", "Fixed + Incentive", "Incentive Only"].map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, payType: opt }))
                      }
                      className={cn(
                        "px-5 py-2 rounded-full text-[13px] font-bold border transition-all",
                        formData.payType === opt
                          ? "bg-wise-green text-near-black border-wise-green shadow-sm"
                          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
                      )}
                    >
                      {opt}
                    </button>
                  ),
                )}
              </div>
              {errors.payType && (
                <p className="text-red-500 text-xs mt-1">{errors.payType}</p>
              )}
            </div>

            <div className="flex gap-4 items-start">
              {formData.payType !== "Incentive Only" && (
                <div className="flex-1 space-y-4">
                  <div
                    className="flex items-center gap-1.5"
                    id="field-minSalary"
                  >
                    <Label className="text-[14px] font-bold text-near-black">
                      Fixed salary / month{" "}
                      {formData.payType === "Fixed + Incentive" &&
                        "(excluding incentives)"}{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-400 flex items-center justify-center text-[9px] font-bold text-gray-500 cursor-help">
                      i
                    </div>
                  </div>
                  <div className="flex items-center rounded-md border border-gray-200 overflow-hidden">
                    <div className="relative flex-1 bg-white">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                        ₹
                      </span>
                      <Input
                        type="text"
                        placeholder="30,000"
                        value={
                          formData.minSalary
                            ? formatCurrency(formData.minSalary)
                            : ""
                        }
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            minSalary: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        className="w-full h-10 pl-7 border-0 focus-visible:ring-0 shadow-none font-bold bg-transparent"
                      />
                    </div>
                    <div className="h-10 px-4 bg-slate-50 flex items-center justify-center border-l border-r border-gray-200 text-[13px] font-bold text-gray-400">
                      to
                    </div>
                    <div className="relative flex-1 bg-white">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                        ₹
                      </span>
                      <Input
                        type="text"
                        placeholder="40,000"
                        value={
                          formData.maxSalary
                            ? formatCurrency(formData.maxSalary)
                            : ""
                        }
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            maxSalary: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        className="w-full h-10 pl-7 border-0 focus-visible:ring-0 shadow-none font-bold bg-transparent"
                      />
                    </div>
                  </div>
                  {(errors.minSalary || errors.maxSalary) && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.minSalary || errors.maxSalary}
                    </p>
                  )}
                </div>
              )}

              {formData.payType === "Fixed + Incentive" && (
                <div className="flex items-center justify-center pt-9 font-bold text-xl text-near-black">
                  +
                </div>
              )}

              {(formData.payType === "Fixed + Incentive" ||
                formData.payType === "Incentive Only") && (
                <div className="flex-1 space-y-4" id="field-incentiveAmount">
                  <div className="flex items-center gap-1.5">
                    <Label className="text-[14px] font-bold text-near-black">
                      Average Incentive / month{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-400 flex items-center justify-center text-[9px] font-bold text-gray-500 cursor-help">
                      i
                    </div>
                  </div>
                  <div className="relative rounded-md border border-gray-200 overflow-hidden bg-white">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                      ₹
                    </span>
                    <Input
                      type="text"
                      placeholder="e.g. 5,000"
                      value={
                        formData.incentiveAmount
                          ? formatCurrency(formData.incentiveAmount)
                          : ""
                      }
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          incentiveAmount: e.target.value.replace(/\D/g, ""),
                        }))
                      }
                      className="w-full h-10 pl-7 border-0 focus-visible:ring-0 shadow-none font-bold bg-transparent"
                    />
                  </div>
                  {errors.incentiveAmount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.incentiveAmount}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4">
              <h4 className="text-[14px] font-bold text-near-black">
                Salary breakup shown to candidates
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                  <span>Fixed Salary / Month</span>
                  <span className="font-bold text-near-black">
                    ₹ {formatCurrency(formData.minSalary)} -{" "}
                    {formatCurrency(formData.maxSalary)}
                  </span>
                </div>
                <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                  <span>Average Incentive / Month</span>
                  <span className="font-bold text-near-black">
                    ₹ {formatCurrency(formData.incentiveAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-[14px] font-black text-near-black pt-3 border-t border-slate-200">
                  <span>Earning Potential / Month</span>
                  <span>
                    ₹ {formatCurrency(formData.minSalary)} -{" "}
                    {formatCurrency(
                      String(
                        (Number(formData.maxSalary) || 0) +
                          (Number(formData.incentiveAmount) || 0),
                      ),
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Label className="text-[14px] font-bold text-near-black">
                Do you offer any additional perks ?
              </Label>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Flexible Working Hours",
                  "5 Working Days",
                  "Weekly Payout",
                  "Overtime Pay",
                  "Joining Bonus",
                  "Annual Bonus",
                  "PF",
                  "Travel Allowance (TA)",
                  "Petrol Allowance",
                  "Mobile Allowance",
                  "Internet Allowance",
                  "Laptop",
                  "Health Insurance",
                  "ESI (ESIC)",
                  "Food/Meals",
                  "Accommodation",
                  "One-Way Cab",
                  "Two-Way Cab",
                ].map((perk) => {
                  const isSelected = formData.perks?.includes(perk);
                  return (
                    <button
                      key={perk}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => {
                          const prevPerks = prev.perks || [];
                          return {
                            ...prev,
                            perks: isSelected
                              ? prevPerks.filter((p) => p !== perk)
                              : [...prevPerks, perk],
                          };
                        })
                      }
                      className={cn(
                        "px-3.5 py-1.5 rounded-full text-[13px] font-bold border transition-all flex items-center gap-1.5",
                        isSelected
                          ? "bg-wise-green text-near-black border-wise-green shadow-sm"
                          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
                      )}
                    >
                      {perk}
                      <span className="text-[14px] font-normal leading-none mb-0.5">
                        {isSelected ? "×" : "+"}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button className="text-near-black font-black text-[13px] hover:underline underline-offset-4 decoration-2">
                + Add other perks
              </button>
            </div>

            <div className="space-y-4 pt-2" id="field-hasJoiningFee">
              <Label className="text-[14px] font-bold text-near-black">
                Is there any joining fee or deposit required from the candidate?{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-3">
                {["Yes", "No"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        hasJoiningFee: opt as "Yes" | "No",
                      }))
                    }
                    className={cn(
                      "px-5 py-2 rounded-full text-[13px] font-bold border transition-all",
                      formData.hasJoiningFee === opt
                        ? "bg-wise-green text-near-black border-wise-green shadow-sm"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-300",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {formData.hasJoiningFee === "Yes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2" id="field-feeAmount">
                  <Label className="text-[13px] font-medium">
                    Fee Amount *
                  </Label>
                  <Input
                    type="text"
                    placeholder="e.g. 1000"
                    value={
                      formData.feeAmount
                        ? formatCurrency(formData.feeAmount)
                        : ""
                    }
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        feeAmount: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    className="h-10"
                  />
                  {errors.feeAmount && (
                    <p className="text-red-500 text-xs">{errors.feeAmount}</p>
                  )}
                </div>
                <div className="space-y-2" id="field-feeReason">
                  <Label className="text-[13px] font-medium">
                    Fee Reason *
                  </Label>
                  <Input
                    placeholder="e.g. Background check, Uniform"
                    value={formData.feeReason}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        feeReason: e.target.value,
                      }))
                    }
                    className="h-10"
                  />
                  {errors.feeReason && (
                    <p className="text-red-500 text-xs">{errors.feeReason}</p>
                  )}
                </div>
                <div className="space-y-2" id="field-feeDetails">
                  <Label className="text-[13px] font-medium">
                    Fee Details *
                  </Label>
                  <Input
                    placeholder="e.g. Refundable after 3 months"
                    value={formData.feeDetails}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        feeDetails: e.target.value,
                      }))
                    }
                    className="h-10"
                  />
                  {errors.feeDetails && (
                    <p className="text-red-500 text-xs">{errors.feeDetails}</p>
                  )}
                </div>
                <div className="space-y-2" id="field-feePaymentTiming">
                  <Label className="text-[13px] font-medium">
                    Payment Timing *
                  </Label>
                  <Select
                    value={formData.feePaymentTiming}
                    onValueChange={(v) =>
                      setFormData((prev) => ({
                        ...prev,
                        feePaymentTiming: v || "",
                      }))
                    }
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="When to pay?" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Before Interview",
                        "After Interview",
                        "Before Joining",
                        "After Joining",
                      ].map((e) => (
                        <SelectItem key={e} value={e}>
                          {e}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.feePaymentTiming && (
                    <p className="text-red-500 text-xs">
                      {errors.feePaymentTiming}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
