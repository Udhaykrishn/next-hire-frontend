"use client";

import { Eye } from "lucide-react";
import type { RecruiterDetail } from "../types/admin.types";

interface RecruiterSidebarProps {
  recruiter: RecruiterDetail;
}

export const RecruiterSidebar = ({ recruiter }: RecruiterSidebarProps) => {
  return (
    <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
      <div className="flex items-center gap-3 border-b border-gray-200/60 pb-4 mb-6">
        <div className="size-8 bg-wise-green/20 rounded-xl flex items-center justify-center">
          <Eye className="size-4 text-wise-green" />
        </div>
        <h4 className="font-black text-sm text-near-black uppercase tracking-widest">
          About
        </h4>
      </div>
      <p className="text-sm font-medium text-gray-500 leading-relaxed italic">
        &quot;{recruiter.about}&quot;
      </p>
    </section>
  );
};
