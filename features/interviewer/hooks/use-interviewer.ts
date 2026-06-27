import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { interviewerApi } from "../services/interviewer.api";

export const useInterviewersQuery = () => {
  return useSuspenseQuery({
    queryKey: ["interviewers"],
    queryFn: () => interviewerApi.listInterviewers(),
  });
};

export const useCreateInterviewerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: interviewerApi.createInterviewer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviewers"] });
    },
  });
};

export const useDeleteInterviewerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: interviewerApi.deleteInterviewer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviewers"] });
    },
  });
};

export const useTemplatesQuery = () => {
  return useSuspenseQuery({
    queryKey: ["interviewer-templates"],
    queryFn: () => interviewerApi.listTemplates(),
  });
};

export const useCreateTemplateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: interviewerApi.createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviewer-templates"] });
    },
  });
};

export const useDeleteTemplateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: interviewerApi.deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviewer-templates"] });
    },
  });
};

export const useRoundsQuery = (applicationId: string) => {
  return useSuspenseQuery({
    queryKey: ["rounds", applicationId],
    queryFn: () => interviewerApi.listRoundsForApplication(applicationId),
  });
};

export const useScheduleRoundMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: interviewerApi.scheduleRound,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["rounds", variables.applicationId],
      });
    },
  });
};

export const useAssignedRoundsQuery = () => {
  return useSuspenseQuery({
    queryKey: ["assigned-rounds"],
    queryFn: () => interviewerApi.listAssignedRounds(),
  });
};

export const useSubmitFeedbackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      roundId,
      data,
    }: {
      roundId: string;
      data: {
        score: number;
        feedback: string;
        rubricRatings: Record<string, number>;
      };
    }) => interviewerApi.submitFeedback(roundId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assigned-rounds"] });
    },
  });
};
