import type { JobFormData } from "@/app/recruiter/jobs/create/new/types";
import { apiClient } from "@/lib/api-client";
import type {
  JobResponse,
  JobWithMatchScore,
  PaginationResponse,
  SearchJobsParams,
} from "../types/job.types";

export const createJob = async (jobData: JobFormData) => {
  const { data } = await apiClient.post("/job", jobData);
  return data;
};

export const getRecruiterJobs = async (): Promise<JobResponse[]> => {
  const { data } = await apiClient.get("/job/recruiter");
  return data;
};

export const getJobsForCandidate = async (
  params?: SearchJobsParams,
): Promise<PaginationResponse<JobWithMatchScore>> => {
  const { data } = await apiClient.get<PaginationResponse<JobWithMatchScore>>(
    "/job",
    { params },
  );
  return data;
};

export const getJobById = async (id: string): Promise<JobWithMatchScore> => {
  const { data } = await apiClient.get<JobWithMatchScore>(`/job/${id}`);
  return data;
};
