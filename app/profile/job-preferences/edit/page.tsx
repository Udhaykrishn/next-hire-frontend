"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { FormPageLayout } from "@/components/profile/forms/form-page-layout";
import { useProfile } from "@/hooks/use-profile";

export default function EditJobPreferencesPage() {
  const { jobPreferences, handleUpdateJobPreferences } = useProfile();
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleUpdateJobPreferences(formData);
    router.push("/profile");
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
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Preferred Job Types
          </label>
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <label key={type} className="cursor-pointer">
                <input
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

        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Preferred Roles (comma separated)
          </label>
          <input
            name="roles"
            defaultValue={jobPreferences.roles.join(", ")}
            required
            className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
            placeholder="e.g. Frontend Engineer, Full Stack Developer"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Work Styles
          </label>
          <div className="flex flex-wrap gap-2">
            {workStyles.map((style) => (
              <label key={style} className="cursor-pointer">
                <input
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

        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Expected Salary Range ($k / year)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[14px] group-focus-within:text-wise-green transition-colors">
                $
              </span>
              <input
                name="minSalary"
                type="number"
                defaultValue={jobPreferences.minSalary}
                className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 pl-8 pr-12 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
                placeholder="Min"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                k
              </span>
            </div>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[14px] group-focus-within:text-wise-green transition-colors">
                $
              </span>
              <input
                name="maxSalary"
                type="number"
                defaultValue={jobPreferences.maxSalary}
                className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 pl-8 pr-12 text-[14px] font-bold focus:outline-none focus:border-wise-green transition-colors"
                placeholder="Max"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                k
              </span>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-wise-green text-dark-green rounded-xl text-[14px] font-black shadow-md shadow-wise-green/10 transition-all hover:bg-wise-green/90"
        >
          Save Preferences
        </Button>
      </form>
    </FormPageLayout>
  );
}
