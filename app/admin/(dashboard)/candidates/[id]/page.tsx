"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CandidateDetails } from "@/features/admin/components/CandidateDetails";

export default function CandidateProfilePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin/candidates"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-near-black/40 hover:text-near-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Candidates
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-near-black/20">
            System ID: {id && id.length > 8 ? `${id.slice(0, 6)}...${id.slice(-4)}` : id}
          </span>
          <div className="w-2 h-2 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
        </div>
      </div>

      <CandidateDetails id={id} />
    </div>
  );
}
