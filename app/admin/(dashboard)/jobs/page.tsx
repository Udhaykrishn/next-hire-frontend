"use client";

import { JobList } from "@/features/admin/components/JobList";

export default function JobsAdminPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="size-2 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-near-black/40">
              Listing Moderation
            </span>
          </div>
          <h1 className="text-xl font-black text-near-black tracking-tighter uppercase leading-none">
            Job <span className="text-wise-green">Listing</span> Control
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-4 max-w-xl">
            Review job postings, flag potential threat/scam submissions, and
            moderate active listings in the marketplace.
          </p>
        </div>
      </div>

      <JobList />
    </div>
  );
}
