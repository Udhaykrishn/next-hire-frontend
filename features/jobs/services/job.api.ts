import type { JobFormData } from "@/app/recruiter/jobs/create/new/types";
import { ApiRecruiterRoutes, ApiUserRoutes } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import type {
  CandidateApplicationListResponse,
  JobResponse,
  JobWithMatchScore,
  PaginationResponse,
  SearchJobsParams,
} from "../types/job.types";

export const createJob = async (jobData: JobFormData) => {
  const { data } = await apiClient.post(ApiRecruiterRoutes.JOBS, jobData);
  return data;
};

export const getRecruiterJobs = async (): Promise<JobResponse[]> => {
  const { data } = await apiClient.get(ApiRecruiterRoutes.JOBS_RECRUITER);
  return data;
};

export const getJobsForCandidate = async (
  params?: SearchJobsParams,
  headers?: Record<string, string>,
): Promise<PaginationResponse<JobWithMatchScore>> => {
  const { data } = await apiClient.get<PaginationResponse<JobWithMatchScore>>(
    ApiUserRoutes.JOBS,
    { params, headers },
  );
  return data;
};

export const getJobById = async (
  id: string,
  headers?: Record<string, string>,
): Promise<JobWithMatchScore> => {
  const { data } = await apiClient.get<JobWithMatchScore>(
    `${ApiUserRoutes.JOBS}/${id}`,
    {
      headers,
    },
  );
  return data;
};

export const applyToJob = async (jobId: string): Promise<unknown> => {
  const { data } = await apiClient.post(`${ApiUserRoutes.JOBS}/apply/${jobId}`);
  return data;
};

export const updateJob = async (
  jobId: string,
  updateData: Partial<JobFormData>,
): Promise<JobResponse> => {
  const { data } = await apiClient.patch(
    `${ApiRecruiterRoutes.JOBS}/${jobId}`,
    updateData,
  );
  return data;
};

export const getCandidateApplications = async (params?: {
  search?: string;
  status?: string;
}): Promise<CandidateApplicationListResponse> => {
  if (typeof window === "undefined") {
    return {
      data: [],
      stats: { total: 0, reviewing: 0, interviews: 0, offers: 0 },
    };
  }
  const { data } = await apiClient.get<CandidateApplicationListResponse>(
    ApiUserRoutes.APPLICATIONS,
    {
      params,
    },
  );
  return data;
};

export const getCandidateMatchScore = async (
  jobId: string,
  candidateId: string,
  retry?: boolean,
): Promise<{
  matchScore: number;
  breakdown: { keywords: string[]; notes: string };
}> => {
  const params = retry ? { retry: "true" } : undefined;
  const { data } = await apiClient.get(
    `${ApiUserRoutes.JOBS}/${jobId}/candidates/${candidateId}/match-score`,
    { params },
  );
  return data;
};
