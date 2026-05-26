import type { BackendJob } from "@/features/admin/types/admin.types";
import { apiClient } from "@/lib/api-client";
import type { JobStats } from "../types/applications.types";

interface ApiResponseWrapper<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export const getJobDetails = async (id: string): Promise<BackendJob> => {
  const response = await apiClient.get<ApiResponseWrapper<BackendJob>>(
    `/job/${id}`,
  );
  // Handle cases where data is returned directly or inside response.data.data
  const rawData = response.data as unknown as Record<string, unknown>;
  if (rawData?.data) {
    return rawData.data as BackendJob;
  }
  return response.data;
};

export const getJobStats = async (id: string): Promise<JobStats> => {
  const response = await apiClient.get<ApiResponseWrapper<JobStats>>(
    `/job/${id}/stats`,
  );
  const rawData = response.data as unknown as Record<string, unknown>;
  if (rawData?.data) {
    return rawData.data as JobStats;
  }
  return response.data;
};
