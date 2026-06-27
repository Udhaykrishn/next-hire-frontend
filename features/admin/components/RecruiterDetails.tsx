"use client";

import { useRecruiterDetails } from "../hooks/use-recruiter-details";
import { RecruiterActivityList } from "./RecruiterActivityList";
import { RecruiterCompanyInfo } from "./RecruiterCompanyInfo";
import { RecruiterHeader } from "./RecruiterHeader";
import { RecruiterJobsList } from "./RecruiterJobsList";
import { RecruiterSidebar } from "./RecruiterSidebar";

interface RecruiterDetailsProps {
  id: string;
}

export const RecruiterDetails = ({ id }: RecruiterDetailsProps) => {
  const { data: recruiter } = useRecruiterDetails(id);

  if (!recruiter) return null;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="overflow-hidden rounded-xl border border-hairline bg-white">
        <RecruiterHeader recruiter={recruiter} id={id} />

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <RecruiterCompanyInfo recruiter={recruiter} />
              <RecruiterActivityList activity={recruiter.activity} />
              <RecruiterJobsList id={id} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <RecruiterSidebar recruiter={recruiter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
