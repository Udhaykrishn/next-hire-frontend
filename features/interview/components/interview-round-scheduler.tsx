"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, CalendarClock, Loader2, User } from "lucide-react";
import { getRecruiterJobs } from "@/features/jobs/services/job.api";
import { useRecruiterJobApplicationsQuery } from "@/features/jobs/hooks/use-recruiter-applications";
import { Label } from "@/components/ui/label";
import { RecruiterInterviews } from "./recruiter-interviews";

export function InterviewRoundScheduler() {
  const { data: jobsResponse, isLoading: isJobsLoading } = useQuery({
    queryKey: ["recruiter", "jobs", 1, 100],
    queryFn: () => getRecruiterJobs(1, 100),
  });
  const jobs = jobsResponse?.data || [];

  const [jobId, setJobId] = useState("");
  const [applicationId, setApplicationId] = useState("");

  // Applications (candidates) for the selected job.
  // Only shortlisted candidates are eligible to schedule interview rounds.
  const { data: applicationsData, isLoading: isAppsLoading } =
    useRecruiterJobApplicationsQuery(jobId, 1, 100, "", "SHORTLISTED");
  const candidates = (applicationsData?.data ?? []).filter(
    (app) => app.status === "SHORTLISTED",
  );

  return (
    <div className="font-satoshi space-y-6">
      <header className="space-y-1">
        <h1 className="flex items-center gap-2 font-display text-2xl font-black tracking-tight text-ink">
          <CalendarClock className="h-6 w-6 text-coral" /> Interview Rounds
        </h1>
        <p className="text-sm font-medium text-muted-soft">
          Pick a job and candidate, then schedule and track their interview
          rounds.
        </p>
      </header>

      {/* Job + Candidate selectors */}
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-hairline bg-white p-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-soft">
            <Briefcase className="h-3.5 w-3.5 text-coral/60" /> Job
          </Label>
          <select
            value={jobId}
            onChange={(e) => {
              setJobId(e.target.value);
              setApplicationId("");
            }}
            disabled={isJobsLoading}
            className="h-11 w-full rounded-xl border border-hairline bg-white px-3 text-sm font-medium text-ink transition-colors focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/40"
          >
            <option value="">
              {isJobsLoading ? "Loading jobs..." : "Select job"}
            </option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.jobTitle}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-soft">
            <User className="h-3.5 w-3.5 text-coral/60" /> Candidate
          </Label>
          <select
            value={applicationId}
            onChange={(e) => setApplicationId(e.target.value)}
            disabled={!jobId || isAppsLoading}
            className="h-11 w-full rounded-xl border border-hairline bg-white px-3 text-sm font-medium text-ink transition-colors focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/40 disabled:opacity-50"
          >
            <option value="">
              {!jobId
                ? "Select a job first"
                : isAppsLoading
                  ? "Loading candidates..."
                  : candidates.length === 0
                    ? "No shortlisted candidates"
                    : "Select candidate"}
            </option>
            {candidates.map((app) => (
              <option key={app.id} value={app.id}>
                {app.candidate.name} — {app.candidate.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rounds panel for the chosen candidate (schedule + list) */}
      {applicationId ? (
        <RecruiterInterviews applicationId={applicationId} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-hairline bg-canvas py-16 text-center">
          {isJobsLoading ? (
            <Loader2 className="h-6 w-6 animate-spin text-coral" />
          ) : (
            <>
              <CalendarClock className="mb-2 h-8 w-8 text-ink/20" />
              <p className="text-sm font-bold text-ink">
                Select a job and candidate
              </p>
              <p className="mt-0.5 text-xs text-muted-soft">
                Their interview rounds and scheduling appear here.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
