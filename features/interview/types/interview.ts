export type InterviewStatus = "PENDING" | "COMPLETED" | "CANCELLED";
export type ConfirmationStatus = "PENDING" | "CONFIRMED" | "DECLINED";
export type CandidateRoundStatus = "PENDING" | "PASS" | "REJECTED";

export interface InterviewerTemplate {
  _id: string;
  name: string;
  description?: string;
  duration: number;
  rubric: string[];
}

export interface CompanyInterviewer {
  _id: string;
  email: string;
  role: string;
  department: string;
  company_id: string;
}

export interface InterviewRound {
  id: string;
  applicationId: string;
  interviewerId: string | CompanyInterviewer;
  templateId: string | InterviewerTemplate;
  scheduledAt: string;
  status: InterviewStatus;
  meetingCode: string;
  duration: number;
  candidateConfirmation: ConfirmationStatus;
  candidateJoined: boolean;
  interviewerJoined: boolean;
  candidateStatus: CandidateRoundStatus;
  feedback?: string;
  score?: number;
  rubricRatings?: Record<string, number>;
  roundType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleRoundDto {
  applicationId: string;
  interviewerId: string;
  templateId: string;
  scheduledAt: string;
  duration?: number;
}

export interface SubmitFeedbackDto {
  score: number;
  feedback: string;
  rubricRatings: Record<string, number>;
  candidateStatus: "PASS" | "REJECTED";
}
