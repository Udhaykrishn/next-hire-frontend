import { formatDistanceToNow, parseISO } from "date-fns";
import { getRecruiterJobs } from "@/features/jobs/services/job.api";
import type { JobResponse } from "@/features/jobs/types/job.types";
import type { JobListing } from "../types/recruiter.types";

export const getRecruiterJobListings = async (): Promise<JobListing[]> => {
  const jobs = await getRecruiterJobs();
  return jobs.map((job: JobResponse) => ({
    id: job.id,
    title: job.jobTitle || "",
    applicants: 0,
    posted: job.created_at
      ? formatDistanceToNow(parseISO(job.created_at), { addSuffix: true })
      : "",
    status: job.is_published
      ? job.status === "OPEN"
        ? "Active"
        : "Closed"
      : "Draft",
    location: job.jobCity || job.officeAddress || "",
    postedBy: job.posted_by || "",
    isPublished: job.is_published ?? false,
    expiresIn: "",
  }));
};

import { ApiAdminRoutes, ApiRecruiterRoutes } from "@/constants/api-routes";
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
  await apiClient.patch(
    `${ApiAdminRoutes.RECRUITERS}/${id}/change-password`,
    data,
  );
};

export const getRecruiterProfile = async (): Promise<
  ApiResponse<RecruiterProfile>
> => {
  return await apiClient.get(ApiRecruiterRoutes.PROFILE);
};

export const updateRecruiterProfile = async (
  userId: string,
  data: UpdateRecruiterProfileDto,
): Promise<ApiResponse<RecruiterProfile>> => {
  return await apiClient.patch(`${ApiAdminRoutes.RECRUITERS}/${userId}`, data);
};

export const verifyRecruiterCompany = async (
  recruiterId: string,
  CIN: string,
): Promise<void> => {
  await apiClient.post(ApiRecruiterRoutes.VERIFY_COMPANY, {
    recruiterId,
    CIN,
  });
};

export const startCompanyVerificationSession = async (
  CIN: string,
): Promise<{ message: string; otp?: string }> => {
  const { data } = await apiClient.post(ApiRecruiterRoutes.VERIFICATION_START, {
    CIN,
  });
  return data;
};

export const getCompanyVerificationSession = async (): Promise<{
  step: string;
  cin: string;
  otp: string;
} | null> => {
  const { data } = await apiClient.get(ApiRecruiterRoutes.VERIFICATION_SESSION);
  return data;
};

export const deleteCompanyVerificationSession = async (): Promise<{
  message: string;
}> => {
  const { data } = await apiClient.delete(
    ApiRecruiterRoutes.VERIFICATION_SESSION,
  );
  return data;
};

export const verifyCompanyOtp = async (
  otp: string,
): Promise<{ message: string }> => {
  const { data } = await apiClient.post(
    ApiRecruiterRoutes.VERIFICATION_VERIFY,
    {
      otp,
    },
  );
  return data;
};

export const uploadRecruiterProfileImage = async (
  _userId: string,
  file: File,
): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append("image", file);
  return await apiClient.post(ApiRecruiterRoutes.UPLOAD_IMAGE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteRecruiterProfileImage = async (): Promise<{
  message: string;
}> => {
  return await apiClient.delete(ApiRecruiterRoutes.UPLOAD_IMAGE);
};
