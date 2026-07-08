"use client";

import { useState } from "react";
import { useDashboardStatsQuery } from "../hooks/useDashboardStatsQuery";
import { DashboardHeader } from "./DashboardHeader";
import { KPIGrid } from "./KPIGrid";
import { ChartsSection } from "./ChartsSection";
import { MetricsMatrix } from "./MetricsMatrix";

export function DashboardClient() {
  const [timeFilter, setTimeFilter] = useState("Month");
  const { data } = useDashboardStatsQuery(timeFilter);

  return (
    <div className="font-satoshi pb-24 max-w-[1400px] mx-auto animate-in fade-in duration-700">
      <DashboardHeader timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
      <KPIGrid kpis={data.kpis} />
      <ChartsSection
        applicationsTrendData={data.applicationsTrendData}
        hiringFunnelData={data.hiringFunnelData}
        timeFilter={timeFilter}
      />
      <MetricsMatrix matrix={data.matrix} />
    </div>
  );
}
