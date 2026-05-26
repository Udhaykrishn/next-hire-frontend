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
import type { Education } from "@/context/profile-context";

interface EducationFormProps {
  initialData?: Education;
  onSubmit: (formData: FormData, start?: Date, end?: Date) => void;
  submitLabel: string;
}

export const EducationForm = ({
  initialData,
  onSubmit,
  submitLabel,
}: EducationFormProps) => {
  const [eduStartDate, setEduStartDate] = useState<DateValue | null>(
    initialData?.startDate
      ? fromDate(initialData.startDate, getLocalTimeZone())
      : null,
  );
  const [eduEndDate, setEduEndDate] = useState<DateValue | null>(
    initialData?.endDate
      ? fromDate(initialData.endDate, getLocalTimeZone())
      : null,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const start = eduStartDate
      ? eduStartDate.toDate(getLocalTimeZone())
      : undefined;
    const end = eduEndDate ? eduEndDate.toDate(getLocalTimeZone()) : undefined;
    onSubmit(formData, start, end);
  };

  const eduLevels = [
    "School",
    "High School",
    "Graduate",
    "Post Graduate",
    "PhD",
    "Other",
  ];

  return (
    <form onSubmit={handleSubmit} className="gap-y-6">
      <div className="gap-y-1.5">
        <label htmlFor="school" className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
          Education Level
        </label>
        <div className="flex flex-wrap gap-2">
          {eduLevels.map((lvl) => (
            <label key={lvl} className="cursor-pointer">
              <input aria-label="Control"
                type="radio"
                name="level"
                value={lvl}
                defaultChecked={
                  initialData?.level
                    ? initialData.level === lvl
                    : lvl === "Graduate"
                }
                className="hidden peer"
              />
              <span className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-[12px] font-bold text-gray-500 peer-checked:bg-wise-green peer-checked:text-dark-green peer-checked:border-wise-green transition-all block text-center min-w-[90px]">
                {lvl}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="gap-y-1.5">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
          Institution / School Name
        </label>
        <input aria-label="Control"
           id="school" name="school"
          defaultValue={initialData?.school}
          required
          className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
          placeholder="e.g. Stanford University"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="gap-y-1.5">
          <label htmlFor="degree" className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Degree
          </label>
        <input aria-label="Control"
             id="degree" name="degree"
            defaultValue={initialData?.degree}
            required
            className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
            placeholder="e.g. Bachelor of Science"
          />
        </div>
        <div className="gap-y-1.5">
          <label htmlFor="specialisation" className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Specialisation
          </label>
        <input aria-label="Control"
             id="specialisation" name="specialisation"
            defaultValue={initialData?.specialisation}
            required
            className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
            placeholder="e.g. Computer Science"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="gap-y-1.5">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block ml-1">
            Start Date{" "}
            {eduStartDate && (
              <span className="text-wise-green ml-1">
                ({format(eduStartDate.toDate(getLocalTimeZone()), "MMM yyyy")})
              </span>
            )}
          </label>
          <DatePicker
            aria-label="Start Date"
            value={eduStartDate}
            onChange={setEduStartDate}
            className="w-full"
            size="sm"
          />
        </div>
        <div className="gap-y-1.5">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block ml-1">
            End Date{" "}
            {eduEndDate && (
              <span className="text-wise-green ml-1">
                ({format(eduEndDate.toDate(getLocalTimeZone()), "MMM yyyy")})
              </span>
            )}
          </label>
          <DatePicker
            aria-label="End Date"
            value={eduEndDate}
            onChange={setEduEndDate}
            className="w-full"
            size="sm"
          />
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
