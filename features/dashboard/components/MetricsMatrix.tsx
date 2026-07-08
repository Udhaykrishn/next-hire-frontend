import { useState } from "react";
import { Filter } from "lucide-react";
import type { DashboardMetrics } from "../services/dashboard.api";

export function MetricsMatrix({ matrix }: { matrix: DashboardMetrics["matrix"] }) {
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "candidates" | "tasks">("overview");

  return (
    <>
      <div className="border-b-2 border-near-black mb-8 flex gap-8 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "Data Overview" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 text-[13px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "text-near-black border-b-4 border-wise-green translate-y-[2px]"
                : "text-gray-400 hover:text-near-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {activeTab === "overview" && (
          <>
            {matrix.recruitmentStatus && <MetricsList title="Recruitment Status" data={matrix.recruitmentStatus} />}
            {matrix.candidateFunnel && <MetricsList title="Candidate Funnel" data={matrix.candidateFunnel} />}
            {matrix.interviewAnalytics && <MetricsList title="Interview Analytics" data={matrix.interviewAnalytics} />}
          </>
        )}
      </div>
    </>
  );
}

function MetricsList({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: string; alert?: boolean }[];
}) {
  return (
    <div className="border border-gray-200">
      <div className="bg-near-black text-white px-5 py-3 text-[11px] font-black uppercase tracking-widest flex items-center justify-between">
        {title}
        <Filter className="w-3.5 h-3.5 opacity-50" />
      </div>
      <div className="divide-y divide-gray-100">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <span className="text-[13px] font-bold text-gray-600">
              {item.label}
            </span>
            <span
              className={`text-[14px] font-black tracking-tight ${
                item.alert ? "text-red-600" : "text-near-black"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
