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
import { cn } from "@/lib/utils";

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

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-100 relative">
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                <Briefcase className="w-5 h-5 text-wise-green" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                  Posting as
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
                    <SelectTrigger className="w-full h-auto p-0 bg-transparent border-0 font-black text-[15px] text-near-black focus:ring-0 focus:ring-offset-0 shadow-none hover:bg-transparent data-[state=open]:bg-transparent">
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
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-100 relative">
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                <FileText className="w-5 h-5 text-wise-green" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
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
                  placeholder="Eg. Backend Developer, Store Manager"
                  className="w-full h-auto p-0 bg-transparent border-0 font-black text-[15px] text-near-black focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-100 relative">
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                <Layers className="w-5 h-5 text-wise-green" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                  Job Category *
                </p>
                <Select
                  value={formData.jobCategory}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, jobCategory: val || "" }))
                  }
                >
                  <SelectTrigger className="w-full h-auto p-0 bg-transparent border-0 font-black text-[15px] text-near-black focus:ring-0 focus:ring-offset-0 shadow-none hover:bg-transparent">
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
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-[13px] font-black text-near-black">
            Type of Job *
          </Label>
          <div className="flex flex-wrap gap-3">
            {["Full Time", "Part Time", "Both (Full-Time And Part-Time)"].map(
              (t) => (
                <button
                  key={t}
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
          <div className="flex items-center gap-3 ml-1">
            <button
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
      </div>

      <LocationSelector
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
    </motion.div>
  );
};
