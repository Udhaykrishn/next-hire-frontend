import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCertificate,
  createEducation,
  createExperience,
  deleteCertificate,
  deleteEducation,
  deleteExperience,
  getCertificates,
  getEducations,
  getExperiences,
  getProfile,
  updateCertificate,
  updateEducation,
  updateExperience,
  updateProfile,
  uploadProfileImage,
  uploadResume,
} from "../services/profile.api";
import type {
  CreateCertificateDto,
  CreateEducationDto,
  CreateExperienceDto,
  UpdateProfileDto,
} from "../types/profile.types";

export const useProfileQuery = (role: string | null, options = {}) => {
  return useQuery({
    queryKey: ["profile", role],
    queryFn: () => getProfile(role),
    ...options,
  });
};

export const useUpdateProfileMutation = (
  role: string | null,
  userId?: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileDto) => updateProfile(data, role, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};

export const useUploadProfileImageMutation = (role: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadProfileImage(file, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile image updated");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload image");
    },
  });
};

export const useUploadResumeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadResume(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Resume uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload resume");
    },
  });
};

// Education Hooks
export const useEducationQuery = (options = {}) => {
  return useQuery({
    queryKey: ["education"],
    queryFn: getEducations,
    ...options,
  });
};

export const useCreateEducationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEducationDto) => createEducation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education added successfully");
    },
  });
};

export const useUpdateEducationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateEducationDto>;
    }) => updateEducation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education updated successfully");
    },
  });
};

export const useDeleteEducationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEducation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education deleted");
    },
  });
};

export const useExperienceQuery = (options = {}) => {
  return useQuery({
    queryKey: ["experience"],
    queryFn: getExperiences,
    ...options,
  });
};

export const useCreateExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExperienceDto) => createExperience(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success("Experience added successfully");
    },
  });
};

export const useUpdateExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateExperienceDto>;
    }) => updateExperience(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success("Experience updated successfully");
    },
  });
};

export const useDeleteExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success("Experience deleted");
    },
  });
};

// Certificate Hooks
export const useCertificateQuery = (options = {}) => {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: getCertificates,
    ...options,
  });
};

export const useCreateCertificateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCertificateDto) => createCertificate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      toast.success("Certificate added successfully");
    },
  });
};

export const useUpdateCertificateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateCertificateDto>;
    }) => updateCertificate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      toast.success("Certificate updated successfully");
    },
  });
};

export const useDeleteCertificateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCertificate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      toast.success("Certificate deleted");
    },
  });
};
