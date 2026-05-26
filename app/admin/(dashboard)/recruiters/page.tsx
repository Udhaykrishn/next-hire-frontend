"use client";

import { RecruiterList } from "@/features/admin/components/RecruiterList";

export default function RecruitersAdminPage() {
  return (
    <div className="gap-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="size-2 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-near-black/40">
              Partner Moderation
            </span>
          </div>
          <h1 className="text-xl font-black text-near-black tracking-tighter uppercase leading-none">
            Recruiter <span className="text-wise-green">Network</span> Control
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-4 max-w-xl">
            Manage company profiles, monitor recruitment activity, and ensure
            the quality of job providers in the ecosystem.
          </p>
        </div>
      </div>

      <RecruiterList />
    </div>
  );
}
