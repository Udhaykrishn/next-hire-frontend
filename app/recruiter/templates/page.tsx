import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/lib/query-client";
import { interviewerApi } from "@/features/interviewer/services/interviewer.api";
import TemplateManagement from "@/features/interviewer/components/TemplateManagement";

export const dynamic = "force-dynamic";

export default async function RecruiterTemplatesPage() {
  const queryClient = getQueryClient();

  // Prefetch templates on server
  try {
    await queryClient.prefetchQuery({
      queryKey: ["interviewer-templates"],
      queryFn: () => interviewerApi.listTemplates(),
    });
  } catch (error) {
    console.error("Failed to prefetch templates:", error);
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
        <TemplateManagement />
      </Suspense>
    </HydrationBoundary>
  );
}
