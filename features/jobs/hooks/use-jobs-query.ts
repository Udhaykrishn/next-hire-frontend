import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createJob,
  getJobById,
  getJobsForCandidate,
} from "../services/job.api";
import type { SearchJobsParams } from "../types/job.types";

export const useCreateJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter", "jobs"] });
    },
  });
};

export const useJobsForCandidateQuery = (params?: SearchJobsParams) => {
  return useSuspenseQuery({
    queryKey: ["jobs", params],
    queryFn: () => getJobsForCandidate(params),
  });
};

export const useJobDetailsQuery = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id),
  });
};
