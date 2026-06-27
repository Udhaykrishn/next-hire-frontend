import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { interviewApi } from "../services/interview.api";
import type { ScheduleRoundDto, SubmitFeedbackDto } from "../types/interview";

export const useScheduleRoundMutation = (applicationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: ScheduleRoundDto) => interviewApi.scheduleRound(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interview-rounds", applicationId],
      });
      queryClient.invalidateQueries({ queryKey: ["job-stats"] });
    },
  });
};

export const useRoundsForApplicationQuery = (applicationId: string) => {
  return useQuery({
    queryKey: ["interview-rounds", applicationId],
    queryFn: () => interviewApi.getRoundsForApplication(applicationId),
    enabled: !!applicationId,
  });
};

export const useCompanyTemplatesQuery = () => {
  return useQuery({
    queryKey: ["company-templates"],
    queryFn: () => interviewApi.getCompanyTemplates(),
  });
};

export const useCompanyInterviewersQuery = () => {
  return useQuery({
    queryKey: ["company-interviewers"],
    queryFn: () => interviewApi.getCompanyInterviewers(),
  });
};

export const useConfirmRoundMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      roundId,
      status,
    }: {
      roundId: string;
      status: "CONFIRMED" | "DECLINED";
    }) => interviewApi.confirmRound(roundId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidate-interview-rounds"],
      });
    },
  });
};

export const useCandidateRoundsQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["candidate-interview-rounds"],
    queryFn: () => interviewApi.getCandidateRounds(),
    enabled,
  });
};

export const useRoundRoomQuery = (meetingCode: string) => {
  return useQuery({
    queryKey: ["interview-room", meetingCode],
    queryFn: () => interviewApi.getRoundRoom(meetingCode),
    enabled: !!meetingCode,
    refetchInterval: 5000, // Poll every 5 seconds to sync participant join states in call
  });
};

export const useJoinRoundRoomMutation = (meetingCode: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (role: "candidate" | "interviewer") =>
      interviewApi.joinRoundRoom(meetingCode, role),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interview-room", meetingCode],
      });
    },
  });
};

export const useSubmitFeedbackMutation = (roundId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: SubmitFeedbackDto) =>
      interviewApi.submitFeedback(roundId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-room"] });
      queryClient.invalidateQueries({ queryKey: ["interview-rounds"] });
      queryClient.invalidateQueries({ queryKey: ["job-stats"] });
      queryClient.invalidateQueries({
        queryKey: ["recruiter-job-applications"],
      });
      queryClient.invalidateQueries({ queryKey: ["candidate-profile"] });
    },
  });
};
