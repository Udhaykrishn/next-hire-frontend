"use client";

import { Briefcase, Clock, Eye, PlusCircle, Settings } from "lucide-react";
import type { RecruiterDetail } from "../types/admin.types";

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "job_created":
      return <PlusCircle className="h-4 w-4 text-muted-ink" />;
    case "view_details":
      return <Eye className="h-4 w-4 text-muted-ink" />;
    case "settings_update":
      return <Settings className="h-4 w-4 text-muted-ink" />;
    case "job_status":
      return <Briefcase className="h-4 w-4 text-muted-ink" />;
    default:
      return <Clock className="h-4 w-4 text-muted-soft" />;
  }
};

interface RecruiterActivityListProps {
  activity: RecruiterDetail["activity"];
}

export const RecruiterActivityList = ({
  activity,
}: RecruiterActivityListProps) => {
  return (
    <section className="rounded-xl border border-hairline bg-white p-6">
      <h4 className="mb-6 text-[15px] font-semibold text-ink">User activity</h4>
      <div className="space-y-6">
        {activity.map((act, idx) => (
          <div
            key={`${act.type}-${act.date}-${idx}`}
            className="relative border-l border-hairline-soft pb-1 pl-7 last:border-0"
          >
            <div className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full border border-hairline bg-white">
              <ActivityIcon type={act.type} />
            </div>
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
              <p className="text-sm font-medium leading-tight text-ink">
                {act.description}
              </p>
              <span className="whitespace-nowrap text-[13px] text-muted-soft tabular-nums">
                {act.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
