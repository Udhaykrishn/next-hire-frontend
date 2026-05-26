import { useQuery } from "@tanstack/react-query";
import { adminService } from "../services/admin.api";

export const useRecruiterJobs = (recruiterId: string) => {
  return useQuery({
    queryKey: ["admin", "recruiter", recruiterId, "jobs"],
    queryFn: () => adminService.getRecruiterJobs(recruiterId),
    enabled: !!recruiterId,
  });
};
