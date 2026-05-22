import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  changeRecruiterPassword,
  getRecruiterCandidates,
  getRecruiterJobListings,
  getRecruiterProfile,
  getRecruiterStats,
  updateRecruiterProfile,
} from "../services/recruiter.api";
import type {
  ChangePasswordData,
  UpdateRecruiterProfileDto,
} from "../types/recruiter.types";

export const useRecruiterStatsQuery = () => {
  return useQuery({
    queryKey: ["recruiter", "stats"],
    queryFn: getRecruiterStats,
  });
};

export const useRecruiterCandidatesQuery = () => {
  return useQuery({
    queryKey: ["recruiter", "candidates"],
    queryFn: getRecruiterCandidates,
  });
};

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
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateRecruiterProfileDto;
    }) => updateRecruiterProfile(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiter", "profile"] });
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });
};
