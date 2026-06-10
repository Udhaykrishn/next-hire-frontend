"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import { BaseSheet } from "./base-sheet";

interface JobPreferenceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  initialData: { jobTypes: string[]; roles: string[]; workStyles: string[] };
}

export const JobPreferenceForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: JobPreferenceFormProps) => (
  <BaseSheet isOpen={isOpen} onClose={onClose} title="Job Preferences">
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-2">
        <label
          htmlFor="preferred-roles"
          className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1"
        >
          Preferred Roles (comma separated)
        </label>
        <input
          id="preferred-roles"
          name="roles"
          defaultValue={initialData.roles.join(", ")}
          required
          className="w-full h-14 bg-gray-50 rounded-2xl border border-gray-100 px-5 text-[15px] font-bold focus:outline-none focus:border-wise-green transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="job-types"
          className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1"
        >
          Job Types (comma separated)
        </label>
        <input
          id="job-types"
          name="jobTypes"
          defaultValue={initialData.jobTypes.join(", ")}
          required
          className="w-full h-14 bg-gray-50 rounded-2xl border border-gray-100 px-5 text-[15px] font-bold focus:outline-none focus:border-wise-green transition-colors"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="work-styles"
          className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1"
        >
          Work Styles (comma separated)
        </label>
        <input
          id="work-styles"
          name="workStyles"
          defaultValue={initialData.workStyles.join(", ")}
          required
          className="w-full h-14 bg-gray-50 rounded-2xl border border-gray-100 px-5 text-[15px] font-bold focus:outline-none focus:border-wise-green transition-colors"
        />
      </div>
      <Button
        type="submit"
        className="w-full h-16 bg-dark-green text-white rounded-[1.5rem] text-[16px] font-black hover:bg-black transition-all"
      >
        Save Preferences
      </Button>
    </form>
  </BaseSheet>
);
