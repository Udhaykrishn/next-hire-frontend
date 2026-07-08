import { useSuspenseQuery } from "@tanstack/react-query";
import { getDashboardMetrics } from "../services/dashboard.api";

export const useDashboardStatsQuery = (range: string = "Month") => {
  return useSuspenseQuery({
    queryKey: ["recruiter", "dashboard-stats", range],
    queryFn: () => getDashboardMetrics(range),
  });
};
