import { useSuspenseQuery } from "@tanstack/react-query";
import { adminService } from "../services/admin.api";

export const useAdminJobStats = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["admin-job-stats", id],
    queryFn: () => adminService.getJobStats(id),
  });
};
