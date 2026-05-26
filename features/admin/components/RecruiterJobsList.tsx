"use client";

import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRecruiterJobs } from "../hooks/use-recruiter-jobs";

interface RecruiterJobsListProps {
  id: string;
}

export const RecruiterJobsList = ({ id }: RecruiterJobsListProps) => {
  const router = useRouter();
  const { data: jobs = [], isLoading: isJobsLoading } = useRecruiterJobs(id);

  return (
    <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="text-[10px] font-black text-near-black uppercase tracking-[0.4em] flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
          Jobs Created
        </div>
        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          {isJobsLoading ? "..." : jobs.length} Postings
        </span>
      </div>

      <div className="space-y-4">
        {isJobsLoading ? (
          <div className="p-6 text-center text-gray-400 text-sm font-bold">
            Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-6 text-center text-gray-400 text-sm font-bold">
            No jobs created yet.
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between group hover:border-wise-green/30 transition-all hover:shadow-sm"
            >
              <div>
                <h4 className="text-sm font-bold text-near-black mb-1">
                  {job.jobTitle}
                </h4>
                <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400">
                  <span className="uppercase tracking-widest">
                    {job.jobType}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-200" />
                  <span className="uppercase tracking-widest">
                    {job.locationType}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-black text-gray-300 uppercase tracking-widest">
                  {job.posted}
                </span>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    job.status === "OPEN" || job.status === "PUBLISHED"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-500",
                  )}
                >
                  {job.status}
                </span>
                <button
                  type="button"
                  onClick={() => router.push(`/admin/jobs/${job.id}`)}
                  className="p-2 ml-2 text-gray-400 hover:text-wise-green hover:bg-wise-green/10 rounded-xl transition-all outline-none"
                  title="View Job Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
