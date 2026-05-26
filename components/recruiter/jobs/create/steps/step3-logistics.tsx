"use client";

import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { MapPin } from "lucide-react";
import type React from "react";
import type { DateRange } from "react-day-picker";
import {
  WALK_IN_END_TIMES,
  WALK_IN_START_TIMES,
} from "@/app/recruiter/jobs/create/new/constants";
import type { JobFormData } from "@/app/recruiter/jobs/create/new/types";
import { DatePickerWithRange } from "@/components/ui/date-picker-range";
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
import { FieldError } from "../ui/field-error";

interface Step3LogisticsProps {
  formData: JobFormData;
  setFormData: React.Dispatch<React.SetStateAction<JobFormData>>;
  errors: Record<string, string>;
  walkInDateRange: DateRange | undefined;
  handleWalkInDateChange: (range: DateRange | undefined) => void;
  setIsWalkInMapOpen: (open: boolean) => void;
}

export const Step3Logistics = ({
  formData,
  setFormData,
  errors,
  walkInDateRange,
  handleWalkInDateChange,
  setIsWalkInMapOpen,
}: Step3LogisticsProps) => {
  return (
    <m.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-12"
    >
      <div className="space-y-1 text-center">
        <h2 className="text-[32px] font-black text-near-black tracking-tight">
          Interviewer information
        </h2>
        <p className="text-gray-400 text-[14px] font-medium text-center">
          Let candidates know how the interview will be conducted.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 space-y-8 shadow-sm">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[15px] font-black text-near-black">
              Is this a walk-in interview?{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center gap-6 mt-4">
              {[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, isWalkIn: opt.value }))
                  }
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div
                    className={cn(
                      "size-6 rounded-full border-2 flex items-center justify-center transition-all",
                      formData.isWalkIn === opt.value
                        ? "border-wise-green bg-wise-green shadow-[0_0_0_4px_rgba(159,232,112,0.1)]"
                        : "border-gray-200 group-hover:border-gray-300",
                    )}
                  >
                    {formData.isWalkIn === opt.value && (
                      <div className="size-2.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[14px] font-bold transition-colors",
                      formData.isWalkIn === opt.value
                        ? "text-near-black"
                        : "text-gray-500",
                    )}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {formData.isWalkIn && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-8 pt-6 border-t border-gray-100 overflow-hidden"
              >
                <div className="space-y-3" id="field-interviewAddress">
                  <div className="flex items-center justify-between">
                    <Label className="text-[14px] font-black text-near-black">
                      Walk-in Interview address{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <button
                      type="button"
                      onClick={() => setIsWalkInMapOpen(true)}
                      className="flex items-center gap-1.5 text-[11px] font-black text-wise-green bg-near-black px-3 py-1.5 rounded-lg hover:bg-near-black/90 transition-colors shadow-sm"
                    >
                      <MapPin className="size-3" /> Select on Map
                    </button>
                  </div>
                  <Input
                    value={formData.interviewAddress}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        interviewAddress: e.target.value,
                      }))
                    }
                    placeholder="Search for your address/locality"
                    className={cn(
                      "h-14 rounded-xl border-gray-200 font-bold",
                      errors.interviewAddress && "border-red-200 bg-red-50",
                    )}
                  />
                  <FieldError name="interviewAddress" errors={errors} />
                </div>

                <div id="field-walkInStartDate">
                  <DatePickerWithRange
                    label="Walk-in Date Range *"
                    date={walkInDateRange}
                    onDateChange={handleWalkInDateChange}
                  />
                  <FieldError name="walkInStartDate" errors={errors} />
                </div>

                <div className="space-y-3" id="field-walkInStartTime">
                  <Label className="text-[14px] font-black text-near-black">
                    Walk-in timings <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Select
                        value={formData.walkInStartTime}
                        onValueChange={(v) =>
                          setFormData((prev) => ({
                            ...prev,
                            walkInStartTime: v || "",
                          }))
                        }
                      >
                        <SelectTrigger
                          className={cn(
                            "h-14 w-full rounded-xl border-gray-200 font-bold",
                            errors.walkInStartTime &&
                              "border-red-200 bg-red-50",
                          )}
                        >
                          <SelectValue placeholder="Start Time" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl max-h-56">
                          {WALK_IN_START_TIMES.map((time) => (
                            <SelectItem
                              key={time}
                              value={time}
                              className="font-bold py-3"
                            >
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError name="walkInStartTime" errors={errors} />
                    </div>
                    <span className="text-gray-400 font-bold">to</span>
                    <div className="flex-1" id="field-walkInEndTime">
                      <Select
                        value={formData.walkInEndTime}
                        onValueChange={(v) =>
                          setFormData((prev) => ({
                            ...prev,
                            walkInEndTime: v || "",
                          }))
                        }
                      >
                        <SelectTrigger
                          className={cn(
                            "h-14 w-full rounded-xl border-gray-200 font-bold",
                            errors.walkInEndTime && "border-red-200 bg-red-50",
                          )}
                        >
                          <SelectValue placeholder="End Time" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl max-h-56">
                          {WALK_IN_END_TIMES.map((time) => (
                            <SelectItem
                              key={time}
                              value={time}
                              className="font-bold py-3"
                            >
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError name="walkInEndTime" errors={errors} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[14px] font-black text-near-black">
                    Other Instructions
                  </Label>
                  <textarea
                    value={formData.interviewInstructions}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        interviewInstructions: e.target.value,
                      }))
                    }
                    placeholder="e.g. Bring ID card, CV / Resume etc."
                    className="w-full h-32 p-5 bg-white border border-gray-200 rounded-2xl font-bold text-[14px] focus:ring-2 focus:ring-wise-green/10 focus:border-wise-green outline-none transition-all"
                  />
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-10 border-t border-gray-100 space-y-8">
          <div className="space-y-4">
            <h3 className="text-[16px] font-black text-near-black">
              Communication Preferences
            </h3>
            <Label className="text-[14px] font-black text-near-black leading-snug">
              Do you want candidates to contact you via Call / Whatsapp after
              they apply? <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-4 mt-2">
              {[
                "Yes, to myself",
                "Yes, to other recruiter",
                "No, I will contact candidates first",
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      contactPreference: opt,
                      canCandidateContact: opt.startsWith("Yes") ? "Yes" : "No",
                    }))
                  }
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div
                    className={cn(
                      "size-6 rounded-full border-2 flex items-center justify-center transition-all",
                      formData.contactPreference === opt
                        ? "border-wise-green bg-wise-green shadow-[0_0_0_4px_rgba(159,232,112,0.1)]"
                        : "border-gray-200 group-hover:border-gray-300",
                    )}
                  >
                    {formData.contactPreference === opt && (
                      <div className="size-2.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[14px] font-bold transition-colors",
                      formData.contactPreference === opt
                        ? "text-near-black"
                        : "text-gray-500",
                    )}
                  >
                    {opt}
                  </span>
                </button>
              ))}
            </div>
            <FieldError name="contactPreference" errors={errors} />
          </div>

          <AnimatePresence>
            {formData.contactPreference === "Yes, to other recruiter" && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 pt-6 bg-slate-50/50 p-6 rounded-3xl border border-gray-100 overflow-hidden"
              >
                <div className="space-y-3" id="field-hrName">
                  <Label className="text-[14px] font-black text-near-black">
                    Recruiter's Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={formData.hrName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        hrName: e.target.value,
                        otherRecruiterName: e.target.value,
                      }))
                    }
                    placeholder="Enter Full Name"
                    className={cn(
                      "h-14 rounded-xl border-gray-200 font-bold",
                      errors.hrName && "border-red-200 bg-red-50",
                    )}
                  />
                  <FieldError name="hrName" errors={errors} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3" id="field-hrPhone">
                    <Label className="text-[14px] font-black text-near-black">
                      Recruiter's Whatsapp No.{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.hrPhone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          hrPhone: e.target.value,
                          otherRecruiterWhatsapp: e.target.value,
                        }))
                      }
                      placeholder="Enter Number"
                      className={cn(
                        "h-14 rounded-xl border-gray-200 font-bold",
                        errors.hrPhone && "border-red-200 bg-red-50",
                      )}
                    />
                    <FieldError name="hrPhone" errors={errors} />
                  </div>
                  <div className="space-y-3" id="field-hrEmail">
                    <Label className="text-[14px] font-black text-near-black">
                      Recruiter's Email ID{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      value={formData.hrEmail}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          hrEmail: e.target.value,
                          otherRecruiterEmail: e.target.value,
                        }))
                      }
                      placeholder="Enter Email"
                      className={cn(
                        "h-14 rounded-xl border-gray-200 font-bold",
                        errors.hrEmail && "border-red-200 bg-red-50",
                      )}
                    />
                    <FieldError name="hrEmail" errors={errors} />
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>

          <div className="space-y-4 pt-6 border-t border-gray-100">
            <Label className="text-[14px] font-black text-near-black leading-snug">
              Where would you like to receive Whatsapp alerts for candidate
              applications? <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-4 mt-2">
              {[
                "Yes, to myself",
                "Yes, to other recruiter",
                "No, I don't want alerts",
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, whatsappAlerts: opt }))
                  }
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div
                    className={cn(
                      "size-6 rounded-full border-2 flex items-center justify-center transition-all",
                      formData.whatsappAlerts === opt
                        ? "border-wise-green bg-wise-green shadow-[0_0_0_4px_rgba(0,128,96,0.1)]"
                        : "border-gray-200 group-hover:border-gray-300",
                    )}
                  >
                    {formData.whatsappAlerts === opt && (
                      <div className="size-2.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[14px] font-bold transition-colors",
                      formData.whatsappAlerts === opt
                        ? "text-near-black"
                        : "text-gray-500",
                    )}
                  >
                    {opt}
                  </span>
                </button>
              ))}
            </div>
            <FieldError name="whatsappAlerts" errors={errors} />
          </div>
        </div>
      </div>
    </m.div>
  );
};
