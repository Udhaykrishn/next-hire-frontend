export interface Interviewer {
  id: string;
  email: string;
  department: string;
  createdBy: string;
  createdAt: string;
}

export interface InterviewerTemplate {
  id: string;
  name: string;
  description?: string;
  duration: number;
  rubric: string[];
  createdAt?: string;
}

export interface PopulateInterviewRound {
  id: string;
  applicationId: string;
  interviewerId: string;
  interviewerEmail: string;
  interviewerDepartment: string;
  templateId: string;
  templateName: string;
  templateDuration: number;
  templateRubric: string[];
  scheduledAt: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  meetingCode?: string;
  candidateConfirmation?: "PENDING" | "CONFIRMED" | "DECLINED";
  candidateJoined?: boolean;
  interviewerJoined?: boolean;
  candidateStatus?: "PENDING" | "PASS" | "REJECTED";
  feedback?: string;
  score?: number;
  rubricRatings?: Record<string, number>;
  createdAt?: string;
}

export interface AssignedInterviewRound {
  id: string;
  scheduledAt: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  meetingCode?: string;
  candidateConfirmation?: "PENDING" | "CONFIRMED" | "DECLINED";
  candidateJoined?: boolean;
  interviewerJoined?: boolean;
  candidateStatus?: "PENDING" | "PASS" | "REJECTED";
  feedback?: string;
  score?: number;
  rubricRatings?: Record<string, number>;

  candidate: {
    name: string;
    email: string;
    phone?: string;
    skills?: string[];
    resume?: string;
    bio?: string;
  };
  job: {
    title: string;
  };
  template: {
    name: string;
    description?: string;
    duration: number;
    rubric: string[];
  };
}
