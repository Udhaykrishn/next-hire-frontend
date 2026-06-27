"use client";

import { Briefcase, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/admin/ui";
import { useRecruiterJobs } from "../hooks/use-recruiter-jobs";

interface RecruiterJobsListProps {
  id: string;
}

export const RecruiterJobsList = ({ id }: RecruiterJobsListProps) => {
  const router = useRouter();
  const { data: jobs = [], isLoading: isJobsLoading } = useRecruiterJobs(id);

  return (
    <section className="rounded-xl border border-hairline bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-ink">Jobs created</h3>
        <span className="rounded-md bg-surface-soft px-2 py-0.5 text-xs font-medium text-muted-ink tabular-nums">
          {isJobsLoading ? "…" : jobs.length} postings
        </span>
      </div>

      <div className="space-y-2.5">
        {isJobsLoading ? (
          <div className="p-6 text-center text-sm text-muted-soft">
            Loading jobs…
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center rounded-lg border border-dashed border-hairline py-10 text-center">
            <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-surface-soft text-muted-soft">
              <Briefcase className="h-5 w-5" />
            </span>
            <p className="text-sm text-muted-ink">No jobs created yet.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-hairline bg-white p-4 transition-colors hover:bg-surface-soft/50"
            >
              <div className="min-w-0">
                <h4 className="text-sm font-medium text-ink">{job.jobTitle}</h4>
                <div className="mt-0.5 flex items-center gap-2 text-[13px] text-muted-soft">
                  <span>{job.jobType}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-soft/50" />
                  <span>{job.locationType}</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="hidden text-[13px] text-muted-soft tabular-nums sm:inline">
                  {job.posted}
                </span>
                <StatusBadge
                  tone={
                    job.status === "OPEN" || job.status === "PUBLISHED"
                      ? "success"
                      : "neutral"
                  }
                >
                  {job.status}
                </StatusBadge>
                <button
                  type="button"
                  onClick={() => router.push(`/admin/jobs/${job.id}`)}
                  className="rounded-lg p-1.5 text-muted-ink outline-none transition-colors hover:bg-surface-soft hover:text-ink"
                  title="View job details"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
