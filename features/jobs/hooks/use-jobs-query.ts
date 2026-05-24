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
  updateJob,
} from "../services/job.api";
import type { SearchJobsParams } from "../types/job.types";
import { JobFormData } from "@/app/recruiter/jobs/create/new/types";

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

export const useUpdateJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, data }: { jobId: string; data: Partial<JobFormData> }) => updateJob(jobId, data),
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ["recruiter", "jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
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
