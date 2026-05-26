import type { BackendJob } from "@/features/admin/types/admin.types";
import { apiClient } from "@/lib/api-client";
import type { JobStats } from "../types/applications.types";

export const getJobDetails = async (id: string): Promise<BackendJob> => {
  const response = (await apiClient.get(`/job/${id}`)) as unknown;
  const rawData = response as Record<string, unknown>;
  if (rawData && typeof rawData === "object" && "data" in rawData) {
    return rawData.data as BackendJob;
  }
  return response as BackendJob;
};

export const getJobStats = async (id: string): Promise<JobStats> => {
  const response = (await apiClient.get(`/job/${id}/stats`)) as unknown;
  const rawData = response as Record<string, unknown>;
  if (rawData && typeof rawData === "object" && "data" in rawData) {
    return rawData.data as JobStats;
  }
  return response as JobStats;
};
