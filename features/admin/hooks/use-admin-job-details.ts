import { useSuspenseQuery } from "@tanstack/react-query";
import { adminService } from "../services/admin.api";

export const useAdminJobDetails = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["admin-job", id],
    queryFn: () => adminService.getJobById(id),
  });
};
