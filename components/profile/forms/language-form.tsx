"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import type { Language } from "@/context/profile-context";

interface LanguageFormProps {
  initialData?: Language;
  onSubmit: (formData: FormData) => void;
  submitLabel: string;
}

export const LanguageForm = ({
  initialData,
  onSubmit,
  submitLabel,
}: LanguageFormProps) => {
  const proficiencyLevels = [
    { label: "Native", value: "Native" },
    { label: "C2 Expert", value: "C2" },
    { label: "C1 Advanced", value: "C1" },
    { label: "B2 Upper-Int", value: "B2" },
    { label: "B1 Basic", value: "B1" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
          Language Name
        </label>
        <input
          name="name"
          defaultValue={initialData?.name}
          required
          className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
          placeholder="e.g. French"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
          Proficiency Level
        </label>
        <div className="flex flex-wrap gap-2">
          {proficiencyLevels.map((level) => (
            <label key={level.value} className="cursor-pointer">
              <input
                type="radio"
                name="level"
                value={level.value}
                defaultChecked={
                  initialData?.level
                    ? initialData.level === level.value
                    : level.value === "B2"
                }
                className="hidden peer"
              />
              <span className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-[12px] font-bold text-gray-500 peer-checked:bg-wise-green peer-checked:text-dark-green peer-checked:border-wise-green transition-all block text-center min-w-[100px]">
                {level.label}
              </span>
            </label>
          ))}
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
