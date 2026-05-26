import type { JobStats } from "../../types/applications.types";

interface JobApplicationsStatsProps {
  stats: JobStats;
}

export function JobApplicationsStats({ stats }: JobApplicationsStatsProps) {
  const statItems = [
    { label: "Total Applicants", value: stats.total || 0 },
    { label: "Reviewing", value: stats.reviewing || 0 },
    { label: "Shortlisted", value: stats.interviews || 0 },
    { label: "Hired", value: stats.offers || 0 },
    { label: "Rejected", value: stats.rejected || 0 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {statItems.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#ffffff] p-[24px] rounded-[16px] border border-[rgba(14,15,12,0.12)] flex flex-col justify-between h-28"
        >
          <div className="text-[#454745] font-[500] text-[12px] uppercase tracking-wider flex items-center justify-between">
            {stat.label}
          </div>
          <div className="text-[32px] font-[800] text-[#0e0f0c] leading-none">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
