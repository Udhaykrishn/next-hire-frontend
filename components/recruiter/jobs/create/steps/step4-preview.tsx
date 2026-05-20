"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronUp, Info, Medal, Pencil, Users } from "lucide-react";
import type React from "react";
import type { JobFormData } from "@/app/recruiter/jobs/create/new/types";

interface Step4PreviewProps {
  formData: JobFormData;
  setCurrentStep: (step: number) => void;
}

export const Step4Preview = ({
  formData,
  setCurrentStep,
}: Step4PreviewProps) => {
  const SectionHeader = ({
    icon: Icon,
    title,
    step,
  }: {
    icon: React.ElementType;
    title: string;
    step: number;
  }) => (
    <div className="flex items-center justify-between py-6 px-8 border-b border-gray-100 bg-white sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-slate-400" />
        </div>
        <h3 className="text-[16px] font-black text-near-black tracking-tight">
          {title}
        </h3>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentStep(step)}
          className="w-9 h-9 rounded-full bg-wise-green/10 flex items-center justify-center text-wise-green hover:bg-wise-green/20 transition-all"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <ChevronUp className="w-5 h-5 text-slate-300" />
      </div>
    </div>
  );

  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | React.ReactNode;
  }) => (
    <div className="grid grid-cols-[200px_1fr] gap-4 py-3 px-8">
      <span className="text-[13px] font-bold text-gray-400">{label}</span>
      <span className="text-[14px] font-black text-near-black">
        {value || "None"}
      </span>
    </div>
  );

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-5xl mx-auto pb-12"
    >
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <SectionHeader icon={Briefcase} title="Job Details" step={1} />
        <div className="py-6 space-y-1">
          <InfoRow label="Company name" value={formData.hiringCompany} />
          <InfoRow label="Job title" value={formData.jobTitle} />
          <InfoRow label="Job role/ category" value={formData.jobCategory} />
          <InfoRow
            label="Job type"
            value={`${formData.jobType}${formData.isNightShift ? " | Night shift" : ""}`}
          />
          <InfoRow label="Work type" value={formData.locationType} />
          <InfoRow
            label="Job City"
            value={formData.jobCity || "Not specified"}
          />

          <div className="mx-8 my-6 p-4 rounded-xl bg-wise-green/10 border border-wise-green/20 flex items-start gap-3">
            <Info className="w-4 h-4 text-wise-green mt-0.5 shrink-0" />
            <p className="text-[12px] font-bold text-near-black leading-snug">
              Your job will receive a maximum of 250 applications from within{" "}
              {formData.jobCity || "the selected region"} or remain live for 15
              days, whichever comes first.
            </p>
          </div>

          <InfoRow
            label="Monthly Salary | Pay Type"
            value={`₹ ${formData.minSalary} - ${formData.maxSalary} per month (${formData.payType || "Fixed only"})`}
          />
          <InfoRow
            label="Additional perks"
            value={formData.perks?.length ? formData.perks.join(", ") : "None"}
          />
          <InfoRow label="Joining Fee" value={formData.hasJoiningFee} />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <SectionHeader icon={Medal} title="Candidate Requirements" step={2} />
        <div className="py-6 space-y-1">
          <div className="mx-8 mb-6 p-4 rounded-xl bg-wise-green/10 border border-wise-green/20 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-wise-green flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-dark-green" />
            </div>
            <div>
              <p className="text-[13px] font-black text-near-black">
                Eligible requirements
              </p>
              <p className="text-[11px] font-bold text-gray-500">
                Your job will only be visible to the candidates who meet these
                requirements.
              </p>
            </div>
          </div>

          <InfoRow label="Minimum Education" value={formData.education} />
          <InfoRow label="Experience Required" value={formData.experience} />
          <InfoRow label="English" value={formData.englishLevel} />

          <div className="pt-6 mt-6 border-t border-gray-100">
            <div className="mx-8 mb-6 p-4 rounded-xl bg-wise-green/10 border border-wise-green/20 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-wise-green flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4 text-dark-green" />
              </div>
              <div>
                <p className="text-[13px] font-black text-near-black">
                  Preferred requirements
                </p>
                <p className="text-[11px] font-bold text-gray-500">
                  Your job will be promoted to the candidates meeting below
                  requirements, but others can still apply.
                </p>
              </div>
            </div>

            <InfoRow
              label="Age"
              value={`${formData.minAge} - ${formData.maxAge} yrs`}
            />
            <InfoRow
              label="Gender"
              value={
                formData.gender === "Any"
                  ? "Both genders allowed"
                  : formData.gender
              }
            />
            <InfoRow
              label="Industry"
              value={
                formData.industry?.length
                  ? formData.industry.join(", ")
                  : "None"
              }
            />

            <div className="pt-6 mt-6 border-t border-gray-100">
              <InfoRow
                label="Job Description"
                value={
                  <div
                    className="prose prose-sm max-w-none text-near-black font-bold"
                    dangerouslySetInnerHTML={{
                      __html:
                        formData.jobDescription ||
                        formData.description ||
                        "None",
                    }}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <SectionHeader icon={Users} title="Interview Information" step={3} />
        <div className="py-6 space-y-1">
          <InfoRow
            label="Is this a walk-in interview?"
            value={
              formData.isWalkIn
                ? "Yes"
                : "No, I will share interview details later to the candidates"
            }
          />
          <InfoRow
            label="Company address"
            value={formData.interviewAddress || formData.officeAddress}
          />
          <InfoRow
            label="HR Details"
            value={
              formData.hrName
                ? `${formData.hrName}, ${formData.hrPhone}, ${formData.hrEmail}`
                : "None"
            }
          />
          <InfoRow
            label="Can candidates contact"
            value={formData.canCandidateContact}
          />
          <InfoRow
            label="Apna Whatsapp alerts"
            value={
              formData.whatsappAlerts === "Yes, to myself"
                ? "For every application"
                : "None"
            }
          />
        </div>
      </div>
    </motion.div>
  );
};
