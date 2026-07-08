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

export const getRecruiterJobs = async (
  page: number = 1,
  limit: number = 5,
): Promise<PaginationResponse<JobResponse>> => {
  const { data } = await apiClient.get(ApiRecruiterRoutes.JOBS_RECRUITER, {
    params: { page, limit },
  });
  return data;
};

/** Fetch only the total application count for a job without loading full data. */
export const getJobApplicationCount = async (
  jobId: string,
): Promise<number> => {
  const { data } = await apiClient.get<{ data: unknown[]; total: number }>(
    `${ApiUserRoutes.JOBS}/${jobId}/applications?page=1&limit=1`,
  );
  return data?.total ?? 0;
};

export const getJobsForCandidate = async (
  params?: SearchJobsParams,
  headers?: Record<string, string>,
): Promise<PaginationResponse<JobWithMatchScore>> => {
  // Drop empty values so the request URL only carries active filters.
  const cleanParams: Record<string, unknown> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === false
      )
        continue;
      if (Array.isArray(value) && value.length === 0) continue;
      cleanParams[key] = value;
    }
  }

  const { data } = await apiClient.get<PaginationResponse<JobWithMatchScore>>(
    ApiUserRoutes.JOBS,
    { params: cleanParams, headers },
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
  updateData: Partial<JobFormData> & { is_published?: boolean },
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
