"use client";

import { useState } from "react";
import { useRecruiterJobsQuery } from "@/features/recruiter/hooks/use-recruiter-query";
import type { JobListing } from "@/features/recruiter/types/recruiter.types";

export type { JobListing };

export function useRecruiter(page: number = 1, limit: number = 5) {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const jobsQuery = useRecruiterJobsQuery(page, limit);

  return {
    jobs: jobsQuery.data?.data || [],
    pagination: {
      page: jobsQuery.data?.page || 1,
      totalPages: jobsQuery.data?.totalPages || 1,
      total: jobsQuery.data?.total || 0,
      limit: jobsQuery.data?.limit || 5,
    },
    isLoading: jobsQuery.isLoading,
    isJobModalOpen,
    setIsJobModalOpen,
    isUpgradeModalOpen,
    setIsUpgradeModalOpen,
  };
}
