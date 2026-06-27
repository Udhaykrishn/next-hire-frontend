import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { interviewerApi } from "@/features/interviewer/services/interviewer.api";
import InterviewerManagement from "@/features/interviewer/components/InterviewerManagement";

export const dynamic = "force-dynamic";

export default async function RecruiterInterviewersPage() {
  const queryClient = getQueryClient();

  // Prefetch interviewer list on server
  try {
    await queryClient.prefetchQuery({
      queryKey: ["interviewers"],
      queryFn: () => interviewerApi.listInterviewers(),
    });
  } catch (error) {
    console.error("Failed to prefetch interviewers:", error);
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
        <InterviewerManagement />
      </Suspense>
    </HydrationBoundary>
  );
}
