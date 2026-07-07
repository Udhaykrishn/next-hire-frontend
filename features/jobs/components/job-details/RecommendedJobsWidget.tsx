"use client";

import Link from "next/link";
import { Building, MapPin, Briefcase, IndianRupee } from "lucide-react";
import { useJobsForCandidateQuery } from "../../hooks/use-jobs-query";
import { useProfileQuery } from "@/features/profile/hooks/use-profile-query";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { JobLogo } from "../JobLogo";
import type { JobWithMatchScore } from "../../types/job.types";
import { formatSalaryRange } from "@/lib/salary";

export function RecommendedJobsWidget({
  currentJob,
}: {
  currentJob: JobWithMatchScore;
}) {
  const { user, isAuthenticated } = useAuthContext();
  const { data: profile } = useProfileQuery("CANDIDATE", {
    enabled: isAuthenticated && user?.role === "CANDIDATE",
  });

  // Determine preferences
  // @ts-expect-error - profile type is dynamically returned
  const jobPreferences = profile?.jobPreferences;
  const preferredRoles = jobPreferences?.roles || [];

  // If no preferences, fallback to current job's category or industry
  const searchCategories =
    preferredRoles.length > 0
      ? preferredRoles
      : currentJob.jobCategory
        ? [currentJob.jobCategory]
        : [];

  const { data: paginationResult } = useJobsForCandidateQuery({
    jobCategories: searchCategories,
    limit: 5,
  });

  const jobs = (paginationResult?.data || [])
    .filter((j) => j.id !== currentJob.id)
    .slice(0, 3);

  if (jobs.length === 0) {
    return null; // Don't show widget if no related jobs
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm mt-8 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-wise-green/5 rounded-bl-full pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-[16px] font-black text-gray-900 mb-6 px-1 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-wise-green rounded-full"></span>
          Recommended Jobs
        </h3>
        <div className="space-y-4">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block p-5 rounded-3xl bg-gray-50 border border-gray-100 hover:border-wise-green/30 hover:bg-white hover:shadow-lg hover:shadow-wise-green/5 transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 relative bg-white rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                  <JobLogo
                    logoUrl={job.companyLogo}
                    companyName={job.hiringCompany || ""}
                    fallbackClassName="text-xl font-black text-dark-green"
                  />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h4 className="text-[16px] font-black text-gray-900 truncate group-hover:text-wise-green transition-colors leading-tight mb-1">
                    {job.jobTitle}
                  </h4>
                  <p className="text-[14px] font-bold text-gray-500 truncate flex items-center gap-1.5">
                    <Building className="w-4 h-4" /> {job.hiringCompany}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[12px] font-bold text-dark-green bg-wise-green/10 px-2.5 py-1 rounded-lg border border-wise-green/10 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.jobCity || "Remote"}
                </span>
                <span className="text-[12px] font-bold text-gray-600 bg-gray-200/50 px-2.5 py-1 rounded-lg border border-gray-200/50 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {job.jobType}
                </span>
                {job.minExperience && (
                  <span className="text-[12px] font-bold text-gray-600 bg-gray-200/50 px-2.5 py-1 rounded-lg border border-gray-200/50">
                    {job.minExperience}+ yrs exp
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200/60">
                <div className="text-[14px] font-black text-gray-900 flex items-center gap-1">
                  <IndianRupee className="w-4 h-4 text-gray-400" />
                  {formatSalaryRange(
                    job.minSalary,
                    job.maxSalary,
                    "INR",
                    "year",
                    "compact",
                  ) || "Salary Undisclosed"}
                </div>
                <div className="text-[12px] font-black text-wise-green opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  View Job &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
