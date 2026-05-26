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
    <div className="max-w-[1400px] mx-auto gap-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin/recruiters"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-near-black/40 hover:text-near-black transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Partners
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-near-black/20">
            Recruiter ID: {id}
          </span>
          <div className="size-2 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="min-h-[60vh] flex flex-col items-center justify-center gap-y-4">
            <div className="size-12 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">
              Retrieving Partner Data...
            </p>
          </div>
        }
      >
        <RecruiterDetails id={id} />
      </Suspense>
    </div>
  );
}
