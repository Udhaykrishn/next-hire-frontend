import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { DashboardMetrics } from "../services/dashboard.api";

export function KPIGrid({ kpis }: { kpis: DashboardMetrics["kpis"] }) {
  const kpiData = [
    { label: "Active Jobs", value: kpis.activeJobs, trend: `+${kpis.activeJobsTrend}`, isUp: true },
    { label: "Total Applicants", value: kpis.totalApplicants, trend: `+${kpis.totalApplicantsTrend}`, isUp: true },
    { label: "New Applicants Today", value: kpis.newApplicantsToday, trend: `${kpis.newApplicantsTrend}`, isUp: false },
    { label: "Candidates to Review", value: kpis.candidatesToReview, trend: "Urgent", isUp: null },
    { label: "Interviews Today", value: kpis.interviewsToday, trend: "On track", isUp: true },
    { label: "Offers Pending", value: kpis.offersPending, trend: "+1", isUp: true },
    { label: "Hired This Month", value: kpis.hiredThisMonth, trend: "+4", isUp: true },
    { label: "Avg Time to Hire", value: `${kpis.avgTimeToHireDays}d`, trend: "-2d", isUp: true },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {kpiData.map((kpi, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl border border-hairline flex flex-col justify-between h-32 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex justify-between items-start">
            <span className="text-[13px] font-medium text-muted-ink">
              {kpi.label}
            </span>
            {kpi.isUp !== null && (
              <div
                className={`flex items-center gap-0.5 text-[12px] font-semibold ${kpi.isUp ? "text-positive-green" : "text-danger-red"}`}
              >
                {kpi.isUp ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {kpi.trend}
              </div>
            )}
          </div>
          <div className="text-3xl font-bold text-ink mt-2">
            {kpi.value}
          </div>
        </div>
      ))}
    </section>
  );
}
