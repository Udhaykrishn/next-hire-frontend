import { Suspense } from "react";
import { ScheduleInterviewPageClient } from "@/features/interview/components/schedule-interview-page-client";

export const dynamic = "force-dynamic";

export default function RecruiterScheduleInterviewPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Suspense>
        <ScheduleInterviewPageClient />
      </Suspense>
    </div>
  );
}
