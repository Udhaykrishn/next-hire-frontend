import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { interviewerApi } from "@/features/interviewer/services/interviewer.api";
import InterviewerDashboard from "@/features/interviewer/components/InterviewerDashboard";

export const dynamic = "force-dynamic";

export default async function InterviewerDashboardPage() {
  const queryClient = getQueryClient();

  // Prefetch assigned rounds on server
  try {
    await queryClient.prefetchQuery({
      queryKey: ["assigned-rounds"],
      queryFn: () => interviewerApi.listAssignedRounds(),
    });
  } catch (error) {
    console.error("Failed to prefetch assigned rounds:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex h-[400px] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-coral" />
          </div>
        }
      >
        <InterviewerDashboard />
      </Suspense>
    </HydrationBoundary>
  );
}
