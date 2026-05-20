import { useSuspenseQuery } from "@tanstack/react-query";
import { adminService } from "../services/admin.api";

export const useRecruiterDetails = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["recruiter-details", id],
    queryFn: () => adminService.getRecruiterById(id),
  });
};
