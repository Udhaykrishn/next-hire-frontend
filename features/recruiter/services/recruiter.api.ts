import { formatDistanceToNow, parseISO } from "date-fns";
import { getRecruiterJobs } from "@/features/jobs/services/job.api";
import type { JobResponse } from "@/features/jobs/types/job.types";
import type {
  Candidate,
  JobListing,
  RecruiterStats,
} from "../types/recruiter.types";

export const getRecruiterStats = async (): Promise<RecruiterStats> => {
  await new Promise((r) => setTimeout(r, 800));
  return {
    activeJobs: 12,
    totalApplicants: 856,
    interviews: 24,
    hireRate: "15%",
  };
};

export const getRecruiterCandidates = async (): Promise<Candidate[]> => {
  await new Promise((r) => setTimeout(r, 1000));
  return [
    {
      id: "1",
      name: "Sarah Jenkins",
      role: "Sr. Product Designer",
      match: 98,
      status: "Interview",
      avatar: "SJ",
      location: "SF, USA",
      experience: "8 years",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Full Stack Engineer",
      match: 94,
      status: "Review",
      avatar: "MC",
      location: "Toronto, CA",
      experience: "5 years",
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      role: "DevOps Lead",
      match: 91,
      status: "Applied",
      avatar: "ER",
      location: "Madrid, ES",
      experience: "10 years",
    },
    {
      id: "4",
      name: "David Park",
      role: "Mobile Developer",
      match: 88,
      status: "Review",
      avatar: "DP",
      location: "Seoul, KR",
      experience: "4 years",
    },
  ];
};

export const getRecruiterJobListings = async (): Promise<JobListing[]> => {
  const jobs = await getRecruiterJobs();
  return jobs.map((job: JobResponse) => ({
    id: job.id,
    title: job.jobTitle,
    applicants: 0,
    posted: job.created_at
      ? formatDistanceToNow(parseISO(job.created_at), { addSuffix: true })
      : "recently",
    status: job.status === "OPEN" ? "Active" : "Closed",
    location: job.jobCity || job.officeAddress || "Unknown",
    postedBy: job.posted_by || "Recruiter",
  }));
};

import type { ApiResponse } from "@/features/profile/types/profile.types";
import { apiClient } from "@/lib/api-client";
import type {
  ChangePasswordData,
  RecruiterProfile,
  UpdateRecruiterProfileDto,
} from "../types/recruiter.types";

export const changeRecruiterPassword = async (
  id: string,
  data: ChangePasswordData,
): Promise<void> => {
  await apiClient.patch(`/recruiter/${id}/change-password`, data);
};

export const getRecruiterProfile = async (): Promise<
  ApiResponse<RecruiterProfile>
> => {
  return await apiClient.get("/recruiter/profile");
};

export const updateRecruiterProfile = async (
  userId: string,
  data: UpdateRecruiterProfileDto,
): Promise<ApiResponse<RecruiterProfile>> => {
  return await apiClient.patch(`/recruiter/${userId}`, data);
};
