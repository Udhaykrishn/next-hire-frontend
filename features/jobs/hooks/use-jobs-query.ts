import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  applyToJob,
  createJob,
  getJobById,
  getJobsForCandidate,
  getRecruiterJobs,
} from "../services/job.api";
import type { SearchJobsParams } from "../types/job.types";

export const useRecruiterJobsQuery = () => {
  return useSuspenseQuery({
    queryKey: ["recruiter", "jobs"],
    queryFn: getRecruiterJobs,
  });
};

export const useApplyJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyToJob,
    onSuccess: (_data, jobId) => {
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

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
