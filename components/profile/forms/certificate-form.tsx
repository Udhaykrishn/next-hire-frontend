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
import type { Certificate } from "@/context/profile-context";

interface CertificateFormProps {
  initialData?: Certificate;
  onSubmit: (formData: FormData, date?: Date) => void;
  submitLabel: string;
}

export const CertificateForm = ({
  initialData,
  onSubmit,
  submitLabel,
}: CertificateFormProps) => {
  const [certDate, setCertDate] = useState<DateValue | null>(
    initialData?.issueDate
      ? fromDate(initialData.issueDate, getLocalTimeZone())
      : null,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const date = certDate ? certDate.toDate(getLocalTimeZone()) : undefined;
    onSubmit(formData, date);
  };

  return (
    <form onSubmit={handleSubmit} className="gap-y-6">
      <div className="gap-y-1.5">
        <label htmlFor="name" className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
          Certificate Name
        </label>
        <input aria-label="Control"
           id="name" name="name"
          defaultValue={initialData?.name}
          required
          className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
          placeholder="e.g. AWS Solution Architect"
        />
      </div>
      <div className="gap-y-1.5">
        <label htmlFor="issuer" className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
          Issuing Organization
        </label>
        <input aria-label="Control"
           id="issuer" name="issuer"
          defaultValue={initialData?.issuer}
          required
          className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
          placeholder="e.g. Amazon Web Services"
        />
      </div>
      <div className="gap-y-1.5">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block ml-1">
          Date Earned{" "}
          {certDate && (
            <span className="text-wise-green ml-1">
              ({format(certDate.toDate(getLocalTimeZone()), "MMM yyyy")})
            </span>
          )}
        </label>
        <DatePicker
          aria-label="Date Earned"
          value={certDate}
          onChange={setCertDate}
          className="w-full"
          size="sm"
        />
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
