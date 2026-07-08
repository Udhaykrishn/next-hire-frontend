import { Calendar, Download, Activity } from "lucide-react";
import { Button } from "@/components/animate-ui/components/buttons/button";

interface DashboardHeaderProps {
  timeFilter: string;
  setTimeFilter: (tf: string) => void;
}

export function DashboardHeader({
  timeFilter,
  setTimeFilter,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-hairline pb-6 mb-8 gap-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-coral" />
          <span className="text-[12px] font-semibold text-muted-ink">
            Live Telemetry
          </span>
        </div>
        <h1 className="text-2xl font-bold text-ink leading-tight">
          Recruitment Metrics
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-canvas border border-hairline rounded-lg p-1">
          {["Today", "Week", "Month", "Year"].map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeFilter(tf)}
              className={`px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors ${
                timeFilter === tf
                  ? "bg-white shadow-sm text-ink"
                  : "text-muted-ink hover:text-ink"
              }`}
            >
              {tf}
            </button>
          ))}
          <button
            type="button"
            className="px-3 py-1.5 text-[13px] font-medium text-muted-ink hover:text-ink flex items-center gap-1.5 border-l border-hairline ml-1 pl-4"
          >
            <Calendar className="w-4 h-4" /> Custom
          </button>
        </div>
        <Button className="h-9 px-4 bg-white text-ink border border-hairline hover:bg-surface-soft rounded-lg font-medium text-[13px] flex items-center gap-2 transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </div>
    </header>
  );
}
