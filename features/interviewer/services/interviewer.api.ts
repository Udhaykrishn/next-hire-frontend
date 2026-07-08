import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/features/profile/types/profile.types";
import type {
  Interviewer,
  InterviewerTemplate,
  PopulateInterviewRound,
  AssignedInterviewRound,
} from "../types/interviewer.types";

// Backend may serialize the raw entity, leaking private `_`-prefixed fields
// (`_id`, `_rubric`, ...). Normalize to the clean shape the UI expects so the
// component works whether or not the backend mapper is deployed.
const normalizeTemplate = (raw: unknown): InterviewerTemplate => {
  const t = (raw ?? {}) as Record<string, unknown>;
  return {
    id: (t.id ?? t._id ?? "") as string,
    name: (t.name ?? t._name ?? "") as string,
    description: (t.description ?? t._description) as string | undefined,
    duration: (t.duration ?? t._duration ?? 0) as number,
    rubric: (t.rubric ?? t._rubric ?? []) as string[],
    defaultType: (t.defaultType ?? t._defaultType) as string | undefined,
    defaultInstructions: (t.defaultInstructions ?? t._defaultInstructions) as
      | string
      | undefined,
  };
};

export const interviewerApi = {
  // Recruiter actions
  createInterviewer: async (data: {
    email: string;
    department: string;
    password?: string;
  }): Promise<Interviewer> => {
    const res = (await apiClient.post(
      "/recruiter/interviewers",
      data,
    )) as ApiResponse<Interviewer>;
    return res.data;
  },

  listInterviewers: async (): Promise<Interviewer[]> => {
    const res = (await apiClient.get("/recruiter/interviewers")) as ApiResponse<
      Interviewer[]
    >;
    return res.data || [];
  },

  deleteInterviewer: async (id: string): Promise<{ success: boolean }> => {
    const res = (await apiClient.delete(
      `/recruiter/interviewers/${id}`,
    )) as ApiResponse<{ success: boolean }>;
    return res.data;
  },

  createTemplate: async (data: {
    name: string;
    description?: string;
    duration: number;
    rubric: string[];
    defaultType?: string;
    defaultInstructions?: string;
  }): Promise<InterviewerTemplate> => {
    const res = (await apiClient.post(
      "/recruiter/templates",
      data,
    )) as ApiResponse<InterviewerTemplate>;
    return normalizeTemplate(res.data);
  },

  listTemplates: async (): Promise<InterviewerTemplate[]> => {
    const res = (await apiClient.get("/recruiter/templates")) as ApiResponse<
      InterviewerTemplate[]
    >;
    return (res.data || []).map(normalizeTemplate);
  },

  deleteTemplate: async (id: string): Promise<{ success: boolean }> => {
    const res = (await apiClient.delete(
      `/recruiter/templates/${id}`,
    )) as ApiResponse<{ success: boolean }>;
    return res.data;
  },

  scheduleRound: async (data: {
    applicationId: string;
    interviewerId: string;
    templateId: string;
    scheduledAt: string;
  }): Promise<PopulateInterviewRound> => {
    const res = (await apiClient.post(
      "/recruiter/interview-rounds",
      data,
    )) as ApiResponse<PopulateInterviewRound>;
    return res.data;
  },

  listRoundsForApplication: async (
    applicationId: string,
  ): Promise<PopulateInterviewRound[]> => {
    const res = (await apiClient.get(
      `/recruiter/interview-rounds/application/${applicationId}`,
    )) as ApiResponse<PopulateInterviewRound[]>;
    return res.data || [];
  },

  // Interviewer actions
  listAssignedRounds: async (): Promise<AssignedInterviewRound[]> => {
    const res = (await apiClient.get("/interviewer/rounds")) as ApiResponse<
      AssignedInterviewRound[]
    >;
    return res.data || [];
  },

  submitFeedback: async (
    roundId: string,
    data: {
      score: number;
      feedback: string;
      rubricRatings: Record<string, number>;
    },
  ): Promise<PopulateInterviewRound> => {
    const res = (await apiClient.post(
      `/interviewer/rounds/${roundId}/feedback`,
      data,
    )) as ApiResponse<PopulateInterviewRound>;
    return res.data;
  },
};
