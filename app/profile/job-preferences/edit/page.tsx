"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { FormPageLayout } from "@/components/profile/forms/form-page-layout";
import { useProfile } from "@/hooks/use-profile";
import { formatSalaryAmount } from "@/lib/salary";
import { cn } from "@/lib/utils";

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "USD ($)" },
  { code: "INR", symbol: "₹", name: "INR (₹)" },
  { code: "EUR", symbol: "€", name: "EUR (€)" },
  { code: "GBP", symbol: "£", name: "GBP (£)" },
  { code: "CAD", symbol: "C$", name: "CAD (C$)" },
  { code: "AUD", symbol: "A$", name: "AUD (A$)" },
];

const FREQUENCIES = [
  { value: "year", label: "Yearly" },
  { value: "month", label: "Monthly" },
  { value: "hour", label: "Hourly" },
];

const FORMATS = [
  { value: "compact", label: "Compact (e.g. $120k / ₹5L)" },
  { value: "detailed", label: "Detailed (e.g. $120,000 / ₹5,00,000)" },
];

export default function EditJobPreferencesPage() {
  const { jobPreferences, handleUpdateJobPreferences } = useProfile();
  const { push } = useRouter();

  const [currency, setCurrency] = useState(jobPreferences.currency || "USD");
  const [frequency, setFrequency] = useState(
    jobPreferences.salaryFrequency || "year",
  );
  const [format, setFormat] = useState(
    jobPreferences.salaryFormat || "compact",
  );
  const [minSalary, setMinSalary] = useState(jobPreferences.minSalary || "");
  const [maxSalary, setMaxSalary] = useState(jobPreferences.maxSalary || "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleUpdateJobPreferences(formData);
    push("/profile");
  };

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
  ];
  const workStyles = ["Remote", "Hybrid", "On-site"];

  return (
    <FormPageLayout
      title="Job Preferences"
      subtitle="Define your ideal role to help AI personalize your job recommendations."
    >
      <form onSubmit={onSubmit} className="gap-y-6">
        <div className="gap-y-2">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 block">
            Preferred Job Types
          </span>
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <label key={type} className="cursor-pointer">
                <input
                  aria-label="Control"
                  type="checkbox"
                  name="jobTypes"
                  value={type}
                  defaultChecked={jobPreferences.jobTypes.includes(type)}
                  className="hidden peer"
                />
                <span className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-[12px] font-bold text-gray-500 peer-checked:bg-wise-green peer-checked:text-dark-green peer-checked:border-wise-green transition-all block text-center min-w-[90px]">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="gap-y-1.5">
          <label
            htmlFor="roles"
            className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1"
          >
            Preferred Roles (comma separated)
          </label>
          <input
            aria-label="Control"
            id="roles"
            name="roles"
            defaultValue={jobPreferences.roles.join(", ")}
            required
            className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
            placeholder="e.g. Frontend Engineer, Full Stack Developer"
          />
        </div>

        <div className="gap-y-2">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 block">
            Work Styles
          </span>
          <div className="flex flex-wrap gap-2">
            {workStyles.map((style) => (
              <label key={style} className="cursor-pointer">
                <input
                  aria-label="Control"
                  type="checkbox"
                  name="workStyles"
                  value={style}
                  defaultChecked={jobPreferences.workStyles.includes(style)}
                  className="hidden peer"
                />
                <span className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-[12px] font-bold text-gray-500 peer-checked:bg-wise-green peer-checked:text-dark-green peer-checked:border-wise-green transition-all block text-center min-w-[90px]">
                  {style}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="gap-y-6 pt-6 border-t border-gray-100">
          <h3 className="text-[12px] font-black text-near-black uppercase tracking-wider ml-1">
            Compensation Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Currency Selector */}
            <div className="gap-y-2">
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 block">
                Currency
              </span>
              <div className="grid grid-cols-3 gap-2">
                {CURRENCIES.map((curr) => (
                  <button
                    type="submit"
                    key={curr.code}
                    onClick={() => setCurrency(curr.code)}
                    className={cn(
                      "px-3 py-2.5 rounded-xl border text-[12px] font-bold transition-all text-center",
                      currency === curr.code
                        ? "bg-wise-green border-wise-green text-dark-green shadow-sm"
                        : "bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-200",
                    )}
                  >
                    {curr.code}
                  </button>
                ))}
              </div>
              <input type="hidden" name="currency" value={currency} />
            </div>

            {/* Frequency Selector */}
            <div className="gap-y-2">
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 block">
                Salary Period (Frequency)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {FREQUENCIES.map((freq) => (
                  <button
                    type="button"
                    key={freq.value}
                    onClick={() => setFrequency(freq.value)}
                    className={cn(
                      "px-3 py-2.5 rounded-xl border text-[12px] font-bold transition-all text-center",
                      frequency === freq.value
                        ? "bg-wise-green border-wise-green text-dark-green shadow-sm"
                        : "bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-200",
                    )}
                  >
                    {freq.label}
                  </button>
                ))}
              </div>
              <input type="hidden" name="salaryFrequency" value={frequency} />
            </div>
          </div>

          {/* Format Selector */}
          <div className="gap-y-2">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 block">
              Salary Formatting Format
            </span>
            <div className="grid grid-cols-2 gap-2">
              {FORMATS.map((fmt) => (
                <button
                  type="button"
                  key={fmt.value}
                  onClick={() => setFormat(fmt.value)}
                  className={cn(
                    "px-3 py-2.5 rounded-xl border text-[12px] font-bold transition-all text-center",
                    format === fmt.value
                      ? "bg-wise-green border-wise-green text-dark-green shadow-sm"
                      : "bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-200",
                  )}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
            <input type="hidden" name="salaryFormat" value={format} />
          </div>

          <div className="gap-y-1.5">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 block">
              Expected Salary Range (
              {CURRENCIES.find((c) => c.code === currency)?.symbol}{" "}
              {format === "compact"
                ? currency === "INR"
                  ? "Lakhs/Thousands"
                  : "Thousands (k)"
                : "Full amount"}
              )
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[14px] group-focus-within:text-wise-green transition-colors">
                  {CURRENCIES.find((c) => c.code === currency)?.symbol || "$"}
                </span>
                <input
                  aria-label="Control"
                  name="minSalary"
                  type="number"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 pl-8 pr-12 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
                  placeholder="Min"
                />
                {format === "compact" && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    {currency === "INR" ? "L / k" : "k"}
                  </span>
                )}
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[14px] group-focus-within:text-wise-green transition-colors">
                  {CURRENCIES.find((c) => c.code === currency)?.symbol || "$"}
                </span>
                <input
                  aria-label="Control"
                  name="maxSalary"
                  type="number"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 pl-8 pr-12 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
                  placeholder="Max"
                />
                {format === "compact" && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    {currency === "INR" ? "L / k" : "k"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          {(minSalary || maxSalary) && (
            <div className="p-5 rounded-[2rem] bg-wise-green/[0.03] border border-wise-green/10 gap-y-2 mt-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 size-24 bg-wise-green/10 rounded-full blur-2xl" />
              <p className="text-[10px] font-black text-wise-green uppercase tracking-widest flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-wise-green animate-pulse" />
                Live Preview on Profile
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-black text-gray-900 tracking-tight">
                  {formatSalaryAmount(minSalary, currency, format)} to{" "}
                  {formatSalaryAmount(maxSalary, currency, format)} /{" "}
                  {frequency}
                </span>
              </div>
            </div>
          )}
        </div>

        <Button className="w-full h-12 bg-wise-green text-dark-green rounded-xl text-[14px] font-black shadow-md shadow-wise-green/10 transition-all hover:bg-wise-green/90">
          Save Preferences
        </Button>
      </form>
    </FormPageLayout>
  );
}
