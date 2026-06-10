import {
  ApiAdminRoutes,
  ApiRecruiterRoutes,
  ApiUserRoutes,
} from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  Certificate,
  CreateCertificateDto,
  CreateEducationDto,
  CreateExperienceDto,
  Education,
  Experience,
  UpdateProfileDto,
  UserProfile,
} from "../types/profile.types";

export const getProfile = async (
  role?: string | null,
): Promise<ApiResponse<UserProfile>> => {
  if (role === "RECRUITER") {
    return await apiClient.get(ApiRecruiterRoutes.PROFILE);
  }
  return await apiClient.get(ApiUserRoutes.PROFILE);
};

export const updateProfile = async (
  data: UpdateProfileDto,
  role?: string | null,
  userId?: string,
): Promise<ApiResponse<UserProfile>> => {
  if (role === "RECRUITER" && userId) {
    return await apiClient.patch(
      `${ApiAdminRoutes.RECRUITERS}/${userId}`,
      data,
    );
  }
  return await apiClient.patch(ApiUserRoutes.UPDATE, data);
};

export const uploadProfileImage = async (
  file: File,
  role?: string | null,
): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append("image", file);
  const endpoint =
    role === "RECRUITER"
      ? ApiRecruiterRoutes.UPLOAD_IMAGE
      : ApiUserRoutes.UPLOAD_IMAGE;
  return await apiClient.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadResume = async (file: File): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append("resume", file);
  return await apiClient.post(ApiUserRoutes.UPLOAD_RESUME, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Education
export const getEducations = async (): Promise<ApiResponse<Education[]>> => {
  return await apiClient.get(ApiUserRoutes.EDUCATION);
};

export const createEducation = async (
  data: CreateEducationDto,
): Promise<ApiResponse<Education>> => {
  return await apiClient.post(ApiUserRoutes.EDUCATION, data);
};

export const updateEducation = async (
  id: string,
  data: Partial<CreateEducationDto>,
): Promise<ApiResponse<Education>> => {
  return await apiClient.put(`${ApiUserRoutes.EDUCATION}/${id}`, data);
};

export const deleteEducation = async (id: string): Promise<void> => {
  await apiClient.delete(`${ApiUserRoutes.EDUCATION}/${id}`);
};

// Experience (Mapped to Projects in backend)
export const getExperiences = async (): Promise<ApiResponse<Experience[]>> => {
  return await apiClient.get(ApiUserRoutes.PROJECT);
};

export const createExperience = async (
  data: CreateExperienceDto,
): Promise<ApiResponse<Experience>> => {
  return await apiClient.post(ApiUserRoutes.PROJECT, data);
};

export const updateExperience = async (
  id: string,
  data: Partial<CreateExperienceDto>,
): Promise<ApiResponse<Experience>> => {
  return await apiClient.put(`${ApiUserRoutes.PROJECT}/${id}`, data);
};

export const deleteExperience = async (id: string): Promise<void> => {
  await apiClient.delete(`${ApiUserRoutes.PROJECT}/${id}`);
};

// Certificates
export const getCertificates = async (): Promise<
  ApiResponse<Certificate[]>
> => {
  return await apiClient.get(ApiUserRoutes.CERTIFICATE);
};

export const createCertificate = async (
  data: CreateCertificateDto,
): Promise<ApiResponse<Certificate>> => {
  return await apiClient.post(ApiUserRoutes.CERTIFICATE, data);
};

export const updateCertificate = async (
  id: string,
  data: Partial<CreateCertificateDto>,
): Promise<ApiResponse<Certificate>> => {
  return await apiClient.put(`${ApiUserRoutes.CERTIFICATE}/${id}`, data);
};

export const deleteCertificate = async (id: string): Promise<void> => {
  await apiClient.delete(`${ApiUserRoutes.CERTIFICATE}/${id}`);
};

export const deleteProfileImage = async (
  role?: string | null,
): Promise<ApiResponse<UserProfile>> => {
  const endpoint =
    role === "RECRUITER"
      ? ApiRecruiterRoutes.UPLOAD_IMAGE
      : ApiUserRoutes.UPLOAD_IMAGE;
  return await apiClient.delete(endpoint);
};

export const deleteResume = async (): Promise<ApiResponse<UserProfile>> => {
  return await apiClient.delete(ApiUserRoutes.UPLOAD_RESUME);
};
