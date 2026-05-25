import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import JobList from "@/features/jobs/components/JobList";
import { getJobsForCandidate } from "@/features/jobs/services/job.api";
import { getQueryClient } from "@/shared/lib/query-client";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const queryClient = getQueryClient();

  const initialParams = {
    search: "",
    location: "",
    experience: [],
    salary: [],
    jobTypes: [],
  };

  await queryClient.prefetchQuery({
    queryKey: ["jobs", initialParams],
    queryFn: () => getJobsForCandidate(initialParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center font-satoshi">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wise-green"></div>
          </div>
        }
      >
        <JobList />
      </Suspense>
    </HydrationBoundary>
  );
}
