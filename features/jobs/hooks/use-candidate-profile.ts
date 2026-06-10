import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useCalculateMatchScoreMutation,
  useRecruiterCandidateDetailsQuery,
  useRecruiterJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/features/jobs/hooks/use-recruiter-applications";

export function useCandidateProfile() {
  const params = useParams() as { id: string; applicationId: string };
  const searchParams = useSearchParams();
  const router = useRouter();

  const jobId = params.id;
  const applicationId = params.applicationId;
  const candidateId = searchParams.get("candidateId");

  const { data: applicationsData, isLoading: isApplicationsLoading } =
    useRecruiterJobApplicationsQuery(jobId, 1, 100);
  const application = applicationsData?.data?.find(
    (a) => a.id === applicationId,
  );

  const {
    data: candidateData,
    education,
    experience,
    certificates,
    isPending,
    isError,
    error,
  } = useRecruiterCandidateDetailsQuery(candidateId || "");

  const { mutate: updateStatus } = useUpdateApplicationStatusMutation(jobId);
  const { mutateAsync: calculateMatchScore, isPending: isAnalyzing } =
    useCalculateMatchScoreMutation();

  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [matchBreakdown, setMatchBreakdown] = useState<{
    keywords: string[];
    notes: string;
  } | null>(null);

  useEffect(() => {
    if (application && application.matchScore > 0) {
      setMatchScore(application.matchScore);
      if (application.matchBreakdown) {
        setMatchBreakdown(application.matchBreakdown);
      }
    }
  }, [application]);

  const analyzeMatch = async (retry = false) => {
    if (!candidateId) return;
    try {
      const result = await calculateMatchScore({ jobId, candidateId, retry });
      setMatchScore(result.matchScore);
      setMatchBreakdown(result.breakdown);
    } catch (error) {
      console.error("Failed to fetch match score", error);
    }
  };

  const handleUpdateStatus = (status: string) => {
    updateStatus({ applicationId, status });
  };

  const handleGoBack = () => {
    router.push(`/recruiter/jobs/${jobId}/applications`);
  };

  return {
    jobId,
    applicationId,
    candidateId,
    application,
    profile: candidateData?.data || candidateData,
    education,
    experience,
    certificates,
    isLoading: isApplicationsLoading || isPending,
    isError,
    error,
    matchScore,
    matchBreakdown,
    isAnalyzing,
    analyzeMatch,
    handleUpdateStatus,
    handleGoBack,
  };
}
