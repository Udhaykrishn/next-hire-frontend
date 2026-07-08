"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, CalendarClock, Loader2, User } from "lucide-react";
import { getRecruiterJobs } from "@/features/jobs/services/job.api";
import { useRecruiterJobApplicationsQuery } from "@/features/jobs/hooks/use-recruiter-applications";
import { Label } from "@/components/ui/label";
import { RecruiterInterviews } from "./recruiter-interviews";
import { SearchableCombobox, type ComboboxOption } from "./searchable-combobox";

export function InterviewRoundScheduler() {
  const { data: jobsResponse, isLoading: isJobsLoading } = useQuery({
    queryKey: ["recruiter", "jobs", 1, 100],
    queryFn: () => getRecruiterJobs(1, 100),
  });
  const jobs = jobsResponse?.data || [];

  // Restore the prior selection when returning from the schedule page.
  const searchParams = useSearchParams();
  const [jobId, setJobId] = useState(() => searchParams.get("jobId") ?? "");
  const [applicationId, setApplicationId] = useState(
    () => searchParams.get("applicationId") ?? "",
  );

  // Applications (candidates) for the selected job.
  // Only shortlisted candidates are eligible to schedule interview rounds.
  const { data: applicationsData, isLoading: isAppsLoading } =
    useRecruiterJobApplicationsQuery(jobId, 1, 100, "", "SHORTLISTED");
  const candidates = (applicationsData?.data ?? []).filter(
    (app) => app.status === "SHORTLISTED",
  );

  // Company + type + location on each row so identically-titled jobs
  // (e.g. two "Software developer" postings) can be told apart and searched.
  const jobOptions: ComboboxOption[] = jobs.map((job) => ({
    value: job.id,
    label: job.jobTitle,
    description: [job.hiringCompany, job.jobType, job.locationType]
      .filter(Boolean)
      .join(" · "),
    avatarFallback: job.hiringCompany?.charAt(0) ?? job.jobTitle.charAt(0),
    keywords: [job.hiringCompany, job.jobCity].filter(Boolean),
  }));

  const candidateOptions: ComboboxOption[] = candidates.map((app) => ({
    value: app.id,
    label: app.candidate.name,
    description: app.candidate.email,
    avatarFallback: app.candidate.name?.charAt(0),
    keywords: [app.candidate.email],
  }));

  const selectedCandidateName = candidates.find(
    (app) => app.id === applicationId,
  )?.candidate.name;

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
          <SearchableCombobox
            options={jobOptions}
            value={jobId}
            onValueChange={(next) => {
              setJobId(next);
              setApplicationId("");
            }}
            placeholder="Select job"
            searchPlaceholder="Search by title or company…"
            emptyText="No matching jobs."
            loading={isJobsLoading}
            disabled={isJobsLoading}
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-soft">
            <User className="h-3.5 w-3.5 text-coral/60" /> Candidate
          </Label>
          <SearchableCombobox
            options={candidateOptions}
            value={applicationId}
            onValueChange={setApplicationId}
            placeholder={
              !jobId
                ? "Select a job first"
                : candidates.length === 0
                  ? "No shortlisted candidates"
                  : "Select candidate"
            }
            searchPlaceholder="Search by name or email…"
            emptyText="No shortlisted candidates."
            loading={Boolean(jobId) && isAppsLoading}
            disabled={!jobId || isAppsLoading || candidates.length === 0}
          />
        </div>
      </div>

      {/* Rounds panel for the chosen candidate (schedule + list) */}
      {applicationId ? (
        <RecruiterInterviews
          applicationId={applicationId}
          jobId={jobId}
          candidateName={selectedCandidateName}
        />
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
