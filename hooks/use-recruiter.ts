"use client";

import { useState } from "react";
import { useRecruiterJobsQuery } from "@/features/recruiter/hooks/use-recruiter-query";
import type { JobListing } from "@/features/recruiter/types/recruiter.types";

export type { JobListing };

export function useRecruiter() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const jobsQuery = useRecruiterJobsQuery();

  return {
    jobs: jobsQuery.data || [],
    isLoading: jobsQuery.isLoading,
    isJobModalOpen,
    setIsJobModalOpen,
    isUpgradeModalOpen,
    setIsUpgradeModalOpen,
  };
}
