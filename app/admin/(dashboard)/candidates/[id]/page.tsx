"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CandidateDetails } from "@/features/admin/components/CandidateDetails";

export default function CandidateProfilePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/candidates"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-ink transition-colors hover:text-ink"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-white">
            <ArrowLeft className="h-4 w-4" />
          </span>
          Back to candidates
        </Link>
        <span className="text-[13px] text-muted-soft tabular-nums">
          ID {id && id.length > 8 ? `${id.slice(0, 6)}…${id.slice(-4)}` : id}
        </span>
      </div>

      <CandidateDetails id={id} />
    </div>
  );
}
