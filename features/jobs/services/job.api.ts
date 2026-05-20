import type { JobFormData } from "@/app/recruiter/jobs/create/new/types";
import { apiClient } from "@/lib/api-client";
import type { JobResponse } from "../types/job.types";

export const createJob = async (jobData: JobFormData) => {
  const { data } = await apiClient.post("/job", jobData);
  return data;
};

export const getRecruiterJobs = async (): Promise<JobResponse[]> => {
  const { data } = await apiClient.get("/job/recruiter");
  return data;
};
