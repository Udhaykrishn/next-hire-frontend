import { formatDistanceToNow, parseISO } from "date-fns";
import { getRecruiterJobs } from "@/features/jobs/services/job.api";
import type { JobResponse } from "@/features/jobs/types/job.types";
import type { JobListing } from "../types/recruiter.types";

export const getRecruiterJobListings = async (): Promise<JobListing[]> => {
  const jobs = await getRecruiterJobs();
  return jobs.map((job: JobResponse) => ({
    id: job.id,
    title: job.jobTitle,
    applicants: 0,
    posted: job.created_at
      ? formatDistanceToNow(parseISO(job.created_at), { addSuffix: true })
      : "recently",
    status: job.status === "OPEN" ? "Active" : "Closed",
    location: job.jobCity || job.officeAddress || "Unknown",
    postedBy: job.posted_by || "Recruiter",
  }));
};

import type { ApiResponse } from "@/features/profile/types/profile.types";
import { apiClient } from "@/lib/api-client";
import type {
  ChangePasswordData,
  RecruiterProfile,
  UpdateRecruiterProfileDto,
} from "../types/recruiter.types";

export const changeRecruiterPassword = async (
  id: string,
  data: ChangePasswordData,
): Promise<void> => {
  await apiClient.patch(`/recruiter/${id}/change-password`, data);
};

export const getRecruiterProfile = async (): Promise<
  ApiResponse<RecruiterProfile>
> => {
  return await apiClient.get("/recruiter/profile");
};

export const updateRecruiterProfile = async (
  userId: string,
  data: UpdateRecruiterProfileDto,
): Promise<ApiResponse<RecruiterProfile>> => {
  return await apiClient.patch(`/recruiter/${userId}`, data);
};

export const verifyRecruiterCompany = async (
  recruiterId: string,
  CIN: string,
): Promise<void> => {
  await apiClient.post("/recruiter/verify-company", { recruiterId, CIN });
};

export const startCompanyVerificationSession = async (
  CIN: string,
): Promise<{ message: string; otp?: string }> => {
  const { data } = await apiClient.post("/recruiter/verification/start", {
    CIN,
  });
  return data;
};

export const getCompanyVerificationSession = async (): Promise<{
  step: string;
  cin: string;
  otp: string;
} | null> => {
  const { data } = await apiClient.get("/recruiter/verification/session");
  return data;
};

export const deleteCompanyVerificationSession = async (): Promise<{
  message: string;
}> => {
  const { data } = await apiClient.delete("/recruiter/verification/session");
  return data;
};

export const verifyCompanyOtp = async (
  otp: string,
): Promise<{ message: string }> => {
  const { data } = await apiClient.post("/recruiter/verification/verify", {
    otp,
  });
  return data;
};

export const uploadRecruiterProfileImage = async (
  _userId: string,
  file: File,
): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append("image", file);
  return await apiClient.post(`/recruiter/profile/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteRecruiterProfileImage = async (): Promise<{
  message: string;
}> => {
  return await apiClient.delete(`/recruiter/profile/upload`);
};
