import type { JobFormData } from "@/app/recruiter/jobs/create/new/types";
import { apiClient } from "@/lib/api-client";
import type {
  JobResponse,
  JobWithMatchScore,
  PaginationResponse,
  SearchJobsParams,
  CandidateApplicationListResponse,
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
  headers?: Record<string, string>,
): Promise<PaginationResponse<JobWithMatchScore>> => {
  const { data } = await apiClient.get<PaginationResponse<JobWithMatchScore>>(
    "/job",
    { params, headers },
  );
  return data;
};

export const getJobById = async (
  id: string,
  headers?: Record<string, string>,
): Promise<JobWithMatchScore> => {
  const { data } = await apiClient.get<JobWithMatchScore>(`/job/${id}`, {
    headers,
  });
  return data;
};

export const applyToJob = async (jobId: string): Promise<unknown> => {
  const { data } = await apiClient.post(`/job/apply/${jobId}`);
  return data;
};

export const updateJob = async (jobId: string, updateData: Partial<JobFormData>): Promise<JobResponse> => {
  const { data } = await apiClient.patch(`/job/${jobId}`, updateData);
  return data;
};

export const getCandidateApplications = async (
  params?: { search?: string; status?: string }
): Promise<CandidateApplicationListResponse> => {
  if (typeof window === "undefined") {
    return { data: [], stats: { total: 0, reviewing: 0, interviews: 0, offers: 0 } };
  }
  const { data } = await apiClient.get<CandidateApplicationListResponse>(`/job/applications`, {
    params,
  });
  return data;
};

export const getCandidateMatchScore = async (jobId: string, candidateId: string, retry?: boolean): Promise<{ matchScore: number; breakdown: any }> => {
  const params = retry ? { retry: "true" } : undefined;
  const { data } = await apiClient.get(`/job/${jobId}/candidates/${candidateId}/match-score`, { params });
  return data;
};
