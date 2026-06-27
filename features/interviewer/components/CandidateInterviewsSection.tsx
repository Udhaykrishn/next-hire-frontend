"use client";

import { Suspense } from "react";
import CandidateInterviewsContent from "./CandidateInterviewsContent";

export default function CandidateInterviewsSection({
  applicationId,
}: {
  applicationId: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-hairline bg-white">
          <div className="flex items-center gap-2 text-sm text-muted-soft font-semibold">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-coral border-t-transparent" />
            <span>Loading interview details...</span>
          </div>
        </div>
      }
    >
      <CandidateInterviewsContent applicationId={applicationId} />
    </Suspense>
  );
}
