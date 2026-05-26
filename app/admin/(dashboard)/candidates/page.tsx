"use client";

import { CandidateList } from "@/features/admin/components/CandidateList";

export default function CandidatesAdminPage() {
  return (
    <div className="gap-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="size-2 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-near-black/40">
              Talent Moderation
            </span>
          </div>
          <h1 className="text-xl font-black text-near-black tracking-tighter uppercase leading-none">
            Candidate <span className="text-wise-green">Ecosystem</span> Manager
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-4 max-w-xl">
            Monitor talent growth, moderate applications, and ensure profile
            quality across all candidate accounts.
          </p>
        </div>
      </div>

      <CandidateList />
    </div>
  );
}
