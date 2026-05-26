import { getQueryClient } from "@/shared/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { adminService } from "@/features/admin/services/admin.api";
import { AdminJobDetails } from "@/features/admin/components/AdminJobDetails";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["admin-job", id],
    queryFn: () => adminService.getJobById(id),
  });
  await queryClient.prefetchQuery({
    queryKey: ["admin-job-stats", id],
    queryFn: () => adminService.getJobStats(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <AdminJobDetails id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}
