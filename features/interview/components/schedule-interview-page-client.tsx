"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarClock } from "lucide-react";
import { ScheduleInterviewForm } from "./schedule-interview-form";

export function ScheduleInterviewPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const applicationId = searchParams.get("applicationId") ?? "";
  const jobId = searchParams.get("jobId") ?? "";
  const candidate = searchParams.get("candidate") ?? "";

  const params = new URLSearchParams();
  if (jobId) params.set("jobId", jobId);
  if (applicationId) params.set("applicationId", applicationId);
  const backHref = `/recruiter/interview-rounds${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const goBack = () => router.push(backHref);

  if (!applicationId) {
    return (
      <div className="rounded-2xl border border-dashed border-hairline bg-canvas py-16 text-center font-satoshi">
        <p className="text-sm font-bold text-ink">No candidate selected</p>
        <p className="mt-1 text-xs text-muted-soft">
          Pick a job and candidate first, then choose Schedule.
        </p>
        <Link
          href="/recruiter/interview-rounds"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-coral hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Interview Rounds
        </Link>
      </div>
    );
  }

  return (
    <div className="font-satoshi space-y-6">
      <div className="space-y-3">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Interview Rounds
        </Link>
        <header className="space-y-1">
          <h1 className="flex items-center gap-2 font-display text-2xl font-black tracking-tight text-ink">
            <CalendarClock className="h-6 w-6 text-coral" /> Schedule Interview
            Round
          </h1>
          <p className="text-sm font-medium text-muted-soft">
            {candidate
              ? `Create a new interview evaluation round for ${candidate}.`
              : "Create a new interview evaluation round for this applicant."}
          </p>
        </header>
      </div>

      <ScheduleInterviewForm
        applicationId={applicationId}
        onSuccess={goBack}
        onCancel={goBack}
      />
    </div>
  );
}
