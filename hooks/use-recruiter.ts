"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useState } from "react";
import { getRecruiterJobs } from "@/features/jobs/services/job.api";
import type { JobResponse } from "@/features/jobs/types/job.types";

// Types
export interface Candidate {
  id: string;
  name: string;
  role: string;
  match: number;
  status: "Review" | "Interview" | "Applied" | "Rejected" | "Hired";
  avatar: string;
  location: string;
  experience: string;
}

export interface JobListing {
  id: string;
  title: string;
  applicants: number;
  posted: string;
  status: "Active" | "Paused" | "Closed";
  location?: string;
  postedBy?: string;
}

export interface RecruiterStats {
  activeJobs: number;
  totalApplicants: number;
  interviews: number;
  hireRate: string;
}

// Simulated API Service
const recruiterService = {
  getStats: async (): Promise<RecruiterStats> => {
    await new Promise((r) => setTimeout(r, 800));
    return {
      activeJobs: 12,
      totalApplicants: 856,
      interviews: 24,
      hireRate: "15%",
    };
  },
  getCandidates: async (): Promise<Candidate[]> => {
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
  },
  getJobListings: async (): Promise<JobListing[]> => {
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
  },
};

export function useRecruiter() {
  const _queryClient = useQueryClient();
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const statsQuery = useQuery({
    queryKey: ["recruiter", "stats"],
    queryFn: recruiterService.getStats,
  });

  const candidatesQuery = useQuery({
    queryKey: ["recruiter", "candidates"],
    queryFn: recruiterService.getCandidates,
  });

  const jobsQuery = useQuery({
    queryKey: ["recruiter", "jobs"],
    queryFn: recruiterService.getJobListings,
  });

  return {
    stats: statsQuery.data,
    candidates: candidatesQuery.data || [],
    jobs: jobsQuery.data || [],
    isLoading:
      statsQuery.isLoading || candidatesQuery.isLoading || jobsQuery.isLoading,
    isJobModalOpen,
    setIsJobModalOpen,
    isUpgradeModalOpen,
    setIsUpgradeModalOpen,
  };
}
