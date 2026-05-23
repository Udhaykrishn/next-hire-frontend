import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  changeRecruiterPassword,
  deleteCompanyVerificationSession,
  getCompanyVerificationSession,
  getRecruiterJobListings,
  getRecruiterProfile,
  startCompanyVerificationSession,
  updateRecruiterProfile,
  uploadRecruiterProfileImage,
  deleteRecruiterProfileImage,
  verifyCompanyOtp,
  verifyRecruiterCompany,
} from "../services/recruiter.api";
import type {
  ChangePasswordData,
  UpdateRecruiterProfileDto,
} from "../types/recruiter.types";

export const useRecruiterJobsQuery = () => {
  return useQuery({
    queryKey: ["recruiter", "jobs"],
    queryFn: getRecruiterJobListings,
  });
};

export const useRecruiterChangePasswordMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ChangePasswordData }) =>
      changeRecruiterPassword(id, data),
  });
};

export const useRecruiterProfileQuery = () => {
  return useQuery({
    queryKey: ["recruiter", "profile"],
    queryFn: getRecruiterProfile,
  });
};

export const useUpdateRecruiterProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateRecruiterProfileDto;
    }) => {
      const response = await updateRecruiterProfile(userId, data);
      if (data.CIN) {
        await verifyRecruiterCompany(userId, data.CIN);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter", "profile"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to update profile";
      toast.error(message);
    },
  });
};

export const useUploadRecruiterAvatarMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, file }: { userId: string; file: File }) =>
      uploadRecruiterProfileImage(userId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter", "profile"] });
      toast.success("Profile photo updated");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to upload photo";
      toast.error(message);
    },
  });
};

export const useDeleteRecruiterAvatarMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecruiterProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter", "profile"] });
      toast.success("Profile photo deleted");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to delete photo";
      toast.error(message);
    },
  });
};

export const useStartCompanyVerificationMutation = () => {
  return useMutation({
    mutationFn: startCompanyVerificationSession,
  });
};

export const useVerifyCompanyOtpMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyCompanyOtp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter", "profile"] });
      queryClient.invalidateQueries({
        queryKey: ["recruiter", "verification-session"],
      });
    },
  });
};

export const useCompanyVerificationSessionQuery = () => {
  return useQuery({
    queryKey: ["recruiter", "verification-session"],
    queryFn: getCompanyVerificationSession,
    retry: false, // Don't retry if it returns 404
  });
};

export const useDeleteCompanyVerificationSessionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompanyVerificationSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruiter", "verification-session"],
      });
    },
  });
};
