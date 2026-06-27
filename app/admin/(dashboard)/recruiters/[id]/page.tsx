"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { RecruiterDetails } from "@/features/admin/components/RecruiterDetails";

export default function RecruiterDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/recruiters"
          className="flex items-center gap-2 text-sm font-medium text-muted-ink transition-colors hover:text-ink"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-white">
            <ArrowLeft className="h-4 w-4" />
          </span>
          Back to partners
        </Link>
        <span className="text-[13px] text-muted-soft tabular-nums">
          Recruiter ID: {id}
        </span>
      </div>

      <Suspense
        fallback={
          <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-hairline border-t-coral" />
            <p className="text-[13px] font-medium text-muted-soft">
              Retrieving partner data...
            </p>
          </div>
        }
      >
        <RecruiterDetails id={id} />
      </Suspense>
    </div>
  );
}
