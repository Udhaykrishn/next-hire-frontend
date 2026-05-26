"use client";

import {
  type DateValue,
  fromDate,
  getLocalTimeZone,
} from "@internationalized/date";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Experience } from "@/context/profile-context";

interface ExperienceFormProps {
  initialData?: Experience;
  onSubmit: (formData: FormData, start?: Date, end?: Date) => void;
  submitLabel: string;
}

export const ExperienceForm = ({
  initialData,
  onSubmit,
  submitLabel,
}: ExperienceFormProps) => {
  const [expStartDate, setExpStartDate] = useState<DateValue | null>(
    initialData?.startDate
      ? fromDate(initialData.startDate, getLocalTimeZone())
      : null,
  );
  const [expEndDate, setExpEndDate] = useState<DateValue | null>(
    initialData?.endDate
      ? fromDate(initialData.endDate, getLocalTimeZone())
      : null,
  );
  const [currentlyWorking, setCurrentlyWorking] = useState(
    initialData?.currentlyWorking ? "yes" : "no",
  );
  const [employmentType, setEmploymentType] = useState(
    initialData?.employmentType || "Full-time",
  );
  const [noticePeriod, setNoticePeriod] = useState(
    initialData?.noticePeriod || "No notice period",
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const start = expStartDate
      ? expStartDate.toDate(getLocalTimeZone())
      : undefined;
    const end = expEndDate ? expEndDate.toDate(getLocalTimeZone()) : undefined;
    onSubmit(formData, start, end);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Job Title
          </label>
          <input
            name="title"
            defaultValue={initialData?.title}
            required
            className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
            placeholder="e.g. Senior Backend Developer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Job Role
          </label>
          <div className="flex flex-wrap gap-2">
            {["Frontend", "Backend", "Full-stack", "DevOps", "UI/UX"].map(
              (role) => (
                <label key={role} className="cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    defaultChecked={
                      initialData?.role
                        ? initialData.role === role
                        : role === "Full-stack"
                    }
                    className="hidden peer"
                  />
                  <span className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-[12px] font-bold text-gray-500 peer-checked:bg-wise-green peer-checked:text-dark-green peer-checked:border-wise-green transition-all block min-w-[80px] text-center">
                    {role}
                  </span>
                </label>
              ),
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-end ml-1">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Description
            </label>
            <span className="text-[10px] font-black text-gray-300">
              {initialData?.description?.length || 0}/2000
            </span>
          </div>
          <textarea
            name="description"
            defaultValue={initialData?.description}
            required
            className="w-full h-28 bg-gray-50 rounded-xl border border-gray-100 p-4 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors resize-none"
            placeholder="Enter job description…"
          />
        </div>
      </div>

      <div className="space-y-5 pt-3 border-t border-gray-50">
        <h3 className="text-[14px] font-black text-gray-900 uppercase tracking-tight">
          Company Details
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Company Name
            </label>
            <input
              name="company"
              defaultValue={initialData?.company}
              required
              className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[13px] font-bold focus:outline-none focus:border-wise-green transition-colors"
              placeholder="e.g. Google"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Location / Address
            </label>
            <input
              name="location"
              defaultValue={initialData?.location}
              required
              className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[13px] font-bold focus:outline-none focus:border-wise-green transition-colors"
              placeholder="e.g. Mountain View, CA"
            />
          </div>
          <div className="space-y-1.5 col-span-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Industry
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Technology",
                "Finance",
                "Healthcare",
                "Education",
                "E-commerce",
              ].map((industry) => (
                <label key={industry} className="cursor-pointer">
                  <input
                    type="radio"
                    name="industry"
                    value={industry}
                    defaultChecked={
                      initialData?.industry
                        ? initialData.industry === industry
                        : industry === "Technology"
                    }
                    className="hidden peer"
                  />
                  <span className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-[12px] font-bold text-gray-500 peer-checked:bg-wise-green peer-checked:text-dark-green peer-checked:border-wise-green transition-all block min-w-[90px] text-center">
                    {industry}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 pt-3 border-t border-gray-50">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-black text-gray-900 uppercase tracking-tight">
            Currently working here?
          </label>
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
            {["Yes", "No"].map((opt) => (
              <label key={opt} className="cursor-pointer">
                <input
                  type="radio"
                  name="currentlyWorking"
                  value={opt.toLowerCase()}
                  checked={currentlyWorking === opt.toLowerCase()}
                  onChange={(e) => setCurrentlyWorking(e.target.value)}
                  className="hidden peer"
                />
                <span className="px-5 py-1.5 rounded-lg text-[12px] font-bold text-gray-400 peer-checked:bg-white peer-checked:text-wise-green peer-checked:shadow-sm transition-all block text-center">
                  {opt}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Employment Type
            </label>
            <Select
              name="employmentType"
              value={employmentType}
              onValueChange={(val) => setEmploymentType(val ?? "Full-time")}
            >
              <SelectTrigger className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[13px] font-bold focus:ring-0 focus:border-wise-green transition-colors">
                <SelectValue placeholder="Employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Intern">Intern</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Notice Period
            </label>
            <Select
              name="noticePeriod"
              value={noticePeriod}
              onValueChange={(val) =>
                setNoticePeriod(val ?? "No notice period")
              }
            >
              <SelectTrigger className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[13px] font-bold focus:ring-0 focus:border-wise-green transition-colors">
                <SelectValue placeholder="Notice period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No notice period">
                  No notice period
                </SelectItem>
                <SelectItem value="Less than 15 days">
                  Less than 15 days
                </SelectItem>
                <SelectItem value="1 month">1 month</SelectItem>
                <SelectItem value="2 month">2 months</SelectItem>
                <SelectItem value="3 or more months">
                  3 or more months
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 block">
              Start Date{" "}
              {expStartDate && (
                <span className="text-wise-green ml-1">
                  ({format(expStartDate.toDate(getLocalTimeZone()), "MMM yyyy")}
                  )
                </span>
              )}
            </label>
            <DatePicker
              aria-label="Start Date"
              value={expStartDate}
              onChange={setExpStartDate}
              className="w-full"
              size="sm"
            />
          </div>

          {currentlyWorking === "no" && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 block">
                End Date{" "}
                {expEndDate && (
                  <span className="text-wise-green ml-1">
                    ({format(expEndDate.toDate(getLocalTimeZone()), "MMM yyyy")}
                    )
                  </span>
                )}
              </label>
              <DatePicker
                aria-label="End Date"
                value={expEndDate}
                onChange={setExpEndDate}
                className="w-full"
                size="sm"
              />
            </div>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-wise-green text-dark-green rounded-xl text-[14px] font-black shadow-md shadow-wise-green/10 transition-all hover:bg-wise-green/90"
      >
        {submitLabel}
      </Button>
    </form>
  );
};
