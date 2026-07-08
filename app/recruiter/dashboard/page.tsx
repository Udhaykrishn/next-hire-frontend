import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { DashboardClient } from "@/features/dashboard/components/DashboardClient";
import { getDashboardMetrics } from "@/features/dashboard/services/dashboard.api";

export default async function RecruiterDashboardPage() {
  const queryClient = getQueryClient();

  // Prefetch the dashboard data on the server
  await queryClient.prefetchQuery({
    queryKey: ["recruiter", "dashboard-stats", "Month"],
    queryFn: () => getDashboardMetrics("Month"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-wise-green/10 border-t-wise-green rounded-full animate-spin" />
              <p className="text-gray-300 font-black text-[9px] uppercase tracking-widest animate-pulse">
                Synchronizing Dashboard Data
              </p>
            </div>
          </div>
        }
      >
        <DashboardClient />
      </Suspense>
    </HydrationBoundary>
  );
}
