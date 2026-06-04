"use client";

import { useState } from "react";
import {
  useRecruiterCandidatesQuery,
  useRecruiterJobsQuery,
  useRecruiterStatsQuery,
} from "@/features/recruiter/hooks/use-recruiter-query";
import type {
  Candidate,
  JobListing,
  RecruiterStats,
} from "@/features/recruiter/types/recruiter.types";

export type { Candidate, JobListing, RecruiterStats };

export function useRecruiter() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const statsQuery = useRecruiterStatsQuery();
  const candidatesQuery = useRecruiterCandidatesQuery();
  const jobsQuery = useRecruiterJobsQuery();

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
