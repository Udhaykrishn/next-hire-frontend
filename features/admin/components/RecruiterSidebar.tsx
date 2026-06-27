"use client";

import { FileText } from "lucide-react";
import type { RecruiterDetail } from "../types/admin.types";

interface RecruiterSidebarProps {
  recruiter: RecruiterDetail;
}

export const RecruiterSidebar = ({ recruiter }: RecruiterSidebarProps) => {
  return (
    <section className="rounded-xl border border-hairline bg-white p-6">
      <div className="mb-4 flex items-center gap-2.5 border-b border-hairline-soft pb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-soft text-muted-ink">
          <FileText className="h-4 w-4" />
        </span>
        <h3 className="text-[15px] font-semibold text-ink">About</h3>
      </div>
      <p className="text-sm leading-relaxed text-muted-ink">
        {recruiter.about}
      </p>
    </section>
  );
};
