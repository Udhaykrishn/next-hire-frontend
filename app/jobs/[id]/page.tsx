import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import JobDetails from "@/features/jobs/components/JobDetails";
import { getJobById } from "@/features/jobs/services/job.api";
import { getQueryClient } from "@/shared/lib/query-client";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["job", resolvedParams.id],
    queryFn: () => getJobById(resolvedParams.id),
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
        <JobDetails />
      </Suspense>
    </HydrationBoundary>
  );
}
