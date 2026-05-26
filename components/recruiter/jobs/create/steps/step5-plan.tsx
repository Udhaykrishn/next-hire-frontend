"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { AlertCircle, Check, Zap } from "lucide-react";
import type { JobFormData, Plan } from "@/app/recruiter/jobs/create/new/types";
import { cn } from "@/lib/utils";

interface Step5PlanProps {
  formData: JobFormData;
  setFormData: React.Dispatch<React.SetStateAction<JobFormData>>;
  plans: Plan[];
  selectedPlanData: Plan | undefined;
}

export const Step5Plan = ({
  formData,
  setFormData,
  plans,
  selectedPlanData,
}: Step5PlanProps) => {
  const getSafeNum = (val: string | number | undefined) => Number(val) || 0;

  return (
    <m.div
      key="step5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-[32px] font-black text-near-black tracking-tight">
              Choose a hiring strategy
            </h2>
            <p className="text-gray-400 text-[15px] font-medium">
              Select a plan to maximize your mission's reach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, selectedPlan: p.id }))
                }
                className={cn(
                  "relative text-left flex flex-col h-full rounded-[2.5rem] border-2 transition-all duration-300 p-8",
                  formData.selectedPlan === p.id
                    ? "bg-white border-wise-green shadow-2xl shadow-wise-green/10 -translate-y-2"
                    : "bg-white border-gray-100 hover:border-gray-200",
                )}
              >
                {p.badge && (
                  <div className="absolute top-0 left-0 right-0 bg-dark-green py-2 text-center rounded-t-[2.3rem]">
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">
                      {p.badge}
                    </span>
                  </div>
                )}
                <div
                  className={cn(
                    "mt-4 flex items-center justify-between mb-8",
                    p.badge && "mt-8",
                  )}
                >
                  <div
                    className={cn(
                      "size-12 rounded-2xl flex items-center justify-center transition-colors",
                      formData.selectedPlan === p.id
                        ? "bg-wise-green/10 text-near-black"
                        : "bg-gray-50 text-gray-300",
                    )}
                  >
                    {p.icon}
                  </div>
                  <div
                    className={cn(
                      "size-6 rounded-full border-2 flex items-center justify-center",
                      formData.selectedPlan === p.id
                        ? "border-wise-green bg-wise-green"
                        : "border-gray-100",
                    )}
                  >
                    {formData.selectedPlan === p.id && (
                      <Check className="size-3 text-white" />
                    )}
                  </div>
                </div>
                <div className="space-y-1 mb-6">
                  <h3 className="text-[18px] font-black text-near-black tracking-tight">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[28px] font-black text-near-black">
                      ₹{p.price}
                    </span>
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="size-4 text-wise-green shrink-0 mt-0.5" />
                      <span className="text-[12px] font-bold text-gray-400 leading-snug">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 lg:sticky lg:top-8">
          <div className="bg-near-black rounded-[2.5rem] p-10 text-white space-y-8 relative overflow-hidden shadow-2xl">
            <Zap className="absolute -top-10 -right-10 size-40 text-white/5 rotate-12" />
            <div className="space-y-1 relative z-10">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Selected Strategy
              </p>
              <h4 className="text-[24px] font-black text-wise-green">
                {selectedPlanData?.name || "Choose a plan"}
              </h4>
            </div>

            <div className="space-y-4 relative z-10 pt-8 border-t border-white/5">
              <div className="flex justify-between items-center text-[14px] font-bold">
                <span className="text-gray-500">Job Deployment</span>
                <span>
                  ₹{getSafeNum(selectedPlanData?.price).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-[14px] font-bold">
                <span className="text-gray-500">GST (18%)</span>
                <span>
                  ₹
                  {(getSafeNum(selectedPlanData?.price) * 0.18).toLocaleString(
                    undefined,
                    { maximumFractionDigits: 0 },
                  )}
                </span>
              </div>
              <div className="pt-8 flex justify-between items-center text-[22px] font-black">
                <span className="text-wise-green">Total</span>
                <span>
                  ₹
                  {(getSafeNum(selectedPlanData?.price) * 1.18).toLocaleString(
                    undefined,
                    { maximumFractionDigits: 0 },
                  )}
                </span>
              </div>
            </div>

            <div className="pt-8 relative z-10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  Hiring Mission
                </p>
                <p className="text-[14px] font-bold text-gray-300">
                  {formData.jobTitle || "Untitled Job"} at{" "}
                  {formData.hiringCompany || "Your Company"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-[2rem] bg-orange-50 border border-orange-100 shadow-sm">
            <AlertCircle className="size-6 text-orange-500 shrink-0" />
            <p className="text-[11px] font-bold text-orange-700 leading-tight">
              By deploying, you agree to our{" "}
              <span className="underline decoration-2 underline-offset-2">
                Terms of Service
              </span>{" "}
              for recruiter missions.
            </p>
          </div>
        </div>
      </div>
    </m.div>
  );
};
