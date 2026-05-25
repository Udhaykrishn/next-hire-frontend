import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { adminService } from "../services/admin.api";

export const useAdminJobApplications = (id: string, page: number = 1, limit: number = 10, search?: string, status?: string) => {
  return useQuery({
    queryKey: ["admin-job-applications", id, page, limit, search, status],
    queryFn: () => adminService.getJobApplications(id, page, limit, search, status),
    placeholderData: keepPreviousData,
  });
};
