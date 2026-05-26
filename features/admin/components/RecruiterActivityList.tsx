"use client";

import { Briefcase, Clock, Eye, PlusCircle, Settings } from "lucide-react";
import type { RecruiterDetail } from "../types/admin.types";

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "job_created":
      return <PlusCircle className="size-4 text-wise-green" />;
    case "view_details":
      return <Eye className="size-4 text-wise-green" />;
    case "settings_update":
      return <Settings className="size-4 text-gray-400" />;
    case "job_status":
      return <Briefcase className="size-4 text-orange-500" />;
    default:
      return <Clock className="size-4 text-gray-300" />;
  }
};

interface RecruiterActivityListProps {
  activity: RecruiterDetail["activity"];
}

export const RecruiterActivityList = ({
  activity,
}: RecruiterActivityListProps) => {
  return (
    <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
      <div className="text-xs font-black text-near-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
        <div className="size-1.5 rounded-full bg-wise-green" />
        User Activity
      </div>
      <div className="space-y-8">
        {activity.map((act, idx) => (
          <div
            key={`${act.type}-${act.date}-${idx}`}
            className="relative pl-8 border-l-2 border-gray-50 last:border-0 pb-2"
          >
            <div className="absolute top-0 -left-[11px] size-5 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-sm">
              <ActivityIcon type={act.type} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-[15px] font-bold text-near-black leading-tight">
                {act.description}
              </p>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest whitespace-nowrap">
                {act.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
