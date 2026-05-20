import { apiClient } from "@/lib/api-client";
import type {
  Certificate,
  CreateCertificateDto,
  CreateEducationDto,
  CreateExperienceDto,
  Education,
  Experience,
  UpdateProfileDto,
  UserProfile,
  ApiResponse,
} from "../types/profile.types";

export const getProfile = async (role?: string | null): Promise<ApiResponse<UserProfile>> => {
  if (role === "RECRUITER") {
    return await apiClient.get("/recruiter/profile");
  }
  return await apiClient.get("/user/profile");
};

export const updateProfile = async (
  data: UpdateProfileDto,
  role?: string | null,
  userId?: string,
): Promise<ApiResponse<UserProfile>> => {
  if (role === "RECRUITER" && userId) {
    return await apiClient.patch(`/recruiter/${userId}`, data);
  }
  return await apiClient.patch("/user/update", data);
};

export const uploadProfileImage = async (file: File, role?: string | null): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append("image", file);
  const endpoint = role === "RECRUITER" ? "/recruiter/profile/upload" : "/user/profile/upload";
  return await apiClient.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadResume = async (file: File): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append("resume", file);
  return await apiClient.post("/user/profile/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Education
export const getEducations = async (): Promise<ApiResponse<Education[]>> => {
  return await apiClient.get("/education");
};

export const createEducation = async (
  data: CreateEducationDto,
): Promise<ApiResponse<Education>> => {
  return await apiClient.post("/education", data);
};

export const updateEducation = async (
  id: string,
  data: Partial<CreateEducationDto>,
): Promise<ApiResponse<Education>> => {
  return await apiClient.put(`/education/${id}`, data);
};

export const deleteEducation = async (id: string): Promise<void> => {
  await apiClient.delete(`/education/${id}`);
};

// Experience (Mapped to Projects in backend)
export const getExperiences = async (): Promise<ApiResponse<Experience[]>> => {
  return await apiClient.get("/project");
};

export const createExperience = async (
  data: CreateExperienceDto,
): Promise<ApiResponse<Experience>> => {
  return await apiClient.post("/project", data);
};

export const updateExperience = async (
  id: string,
  data: Partial<CreateExperienceDto>,
): Promise<ApiResponse<Experience>> => {
  return await apiClient.put(`/project/${id}`, data);
};

export const deleteExperience = async (id: string): Promise<void> => {
  await apiClient.delete(`/project/${id}`);
};

// Certificates
export const getCertificates = async (): Promise<ApiResponse<Certificate[]>> => {
  return await apiClient.get("/certificate");
};

export const createCertificate = async (
  data: CreateCertificateDto,
): Promise<ApiResponse<Certificate>> => {
  return await apiClient.post("/certificate", data);
};

export const updateCertificate = async (
  id: string,
  data: Partial<CreateCertificateDto>,
): Promise<ApiResponse<Certificate>> => {
  return await apiClient.put(`/certificate/${id}`, data);
};

export const deleteCertificate = async (id: string): Promise<void> => {
  await apiClient.delete(`/certificate/${id}`);
};
