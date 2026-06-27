import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/features/profile/types/profile.types";
import type {
  InterviewRound,
  ScheduleRoundDto,
  SubmitFeedbackDto,
  InterviewerTemplate,
  CompanyInterviewer,
} from "../types/interview";

// Backend wraps every response in { success, data, ... } (ResponseInterceptor).
// apiClient unwraps to that body, so the payload lives in `.data`.
const unwrap = <T>(res: unknown): T => (res as ApiResponse<T>)?.data;

// Backend response mappers emit `id`, but this UI reads `_id` (and may also see
// the raw entity's leaked `_`-fields). Normalize both selectors to `_id` shape.
const normalizeInterviewer = (raw: unknown): CompanyInterviewer => {
  const i = (raw ?? {}) as Record<string, unknown>;
  return {
    _id: (i._id ?? i.id ?? "") as string,
    email: (i.email ?? i._email ?? "") as string,
    role: (i.role ?? i._role ?? "Interviewer") as string,
    department: (i.department ?? i._department ?? "") as string,
    company_id: (i.company_id ?? i.companyId ?? "") as string,
  };
};

const normalizeTemplate = (raw: unknown): InterviewerTemplate => {
  const t = (raw ?? {}) as Record<string, unknown>;
  return {
    _id: (t._id ?? t.id ?? "") as string,
    name: (t.name ?? t._name ?? "") as string,
    description: (t.description ?? t._description) as string | undefined,
    duration: (t.duration ?? t._duration ?? 0) as number,
    rubric: (t.rubric ?? t._rubric ?? []) as string[],
  };
};

// Rounds may arrive mapped (`id`) or as a leaked raw entity (`_id`, `_status`…).
const normalizeRound = (raw: unknown): InterviewRound => {
  const r = (raw ?? {}) as Record<string, unknown>;
  const pick = (k: string) => r[k] ?? r[`_${k}`];
  return {
    id: (pick("id") ?? "") as string,
    applicationId: (pick("applicationId") ??
      "") as InterviewRound["applicationId"],
    interviewerId: pick("interviewerId") as InterviewRound["interviewerId"],
    templateId: pick("templateId") as InterviewRound["templateId"],
    scheduledAt: (pick("scheduledAt") ?? "") as string,
    status: (pick("status") ?? "PENDING") as InterviewRound["status"],
    meetingCode: (pick("meetingCode") ?? "") as string,
    duration: (pick("duration") ?? 0) as number,
    candidateConfirmation: (pick("candidateConfirmation") ??
      "PENDING") as InterviewRound["candidateConfirmation"],
    candidateJoined: Boolean(pick("candidateJoined")),
    interviewerJoined: Boolean(pick("interviewerJoined")),
    candidateStatus: (pick("candidateStatus") ??
      "PENDING") as InterviewRound["candidateStatus"],
    feedback: pick("feedback") as string | undefined,
    score: pick("score") as number | undefined,
    rubricRatings: pick("rubricRatings") as Record<string, number> | undefined,
    roundType: pick("roundType") as string | undefined,
    createdAt: (pick("createdAt") ?? "") as string,
    updatedAt: (pick("updatedAt") ?? "") as string,
  };
};

export const interviewApi = {
  // Recruiter API calls
  scheduleRound: async (dto: ScheduleRoundDto): Promise<InterviewRound> => {
    return normalizeRound(
      unwrap(await apiClient.post("/recruiter/interview-rounds", dto)),
    );
  },

  getRoundsForApplication: async (
    applicationId: string,
  ): Promise<InterviewRound[]> => {
    const data =
      unwrap<unknown[]>(
        await apiClient.get(
          `/recruiter/interview-rounds/application/${applicationId}`,
        ),
      ) ?? [];
    return data.map(normalizeRound);
  },

  getCompanyTemplates: async (): Promise<InterviewerTemplate[]> => {
    const data =
      unwrap<unknown[]>(await apiClient.get("/recruiter/templates")) ?? [];
    return data.map(normalizeTemplate);
  },

  getCompanyInterviewers: async (): Promise<CompanyInterviewer[]> => {
    const data =
      unwrap<unknown[]>(await apiClient.get("/recruiter/interviewers")) ?? [];
    return data.map(normalizeInterviewer);
  },

  // Candidate API calls
  confirmRound: async (
    roundId: string,
    status: "CONFIRMED" | "DECLINED",
  ): Promise<InterviewRound> => {
    return normalizeRound(
      unwrap(
        await apiClient.patch(
          `/candidate/interview-rounds/${roundId}/confirm`,
          { status },
        ),
      ),
    );
  },

  getCandidateRounds: async (): Promise<InterviewRound[]> => {
    const data =
      unwrap<unknown[]>(await apiClient.get("/candidate/interview-rounds")) ??
      [];
    return data.map(normalizeRound);
  },

  // Video room API calls
  getRoundRoom: async (meetingCode: string): Promise<InterviewRound> => {
    return unwrap(await apiClient.get(`/room/interview-rounds/${meetingCode}`));
  },

  joinRoundRoom: async (
    meetingCode: string,
    role: "candidate" | "interviewer",
  ): Promise<InterviewRound> => {
    return unwrap(
      await apiClient.post(`/room/interview-rounds/${meetingCode}/join`, {
        role,
      }),
    );
  },

  // Interviewer API calls
  submitFeedback: async (
    roundId: string,
    dto: SubmitFeedbackDto,
  ): Promise<InterviewRound> => {
    return unwrap(
      await apiClient.post(`/interviewer/rounds/${roundId}/feedback`, dto),
    );
  },
};
