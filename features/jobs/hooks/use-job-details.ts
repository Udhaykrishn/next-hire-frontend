import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useProfile } from "@/hooks/use-profile";
import { getCandidateApplications } from "../services/job.api";
import { useApplyJobMutation, useJobDetailsQuery } from "./use-jobs-query";

export function useJobDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [hasAppliedLocally, setHasAppliedLocally] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { role, isAuthenticated, isLoading: isAuthLoading } = useAuthContext();
  const isCandidate = role === "CANDIDATE";

  const { data: job } = useJobDetailsQuery(id);
  const { data: applicationsResponse, isPending: isApplicationsPending } =
    useQuery({
      queryKey: ["candidate-applications"],
      queryFn: () => getCandidateApplications(),
      enabled: isAuthenticated && isCandidate,
      staleTime: 0,
    });

  const { basicInfo, skills, isLoading: isProfileLoading } = useProfile();

  const isPageLoading =
    isAuthLoading ||
    isProfileLoading ||
    (isAuthenticated && isCandidate && isApplicationsPending);

  const applyMutation = useApplyJobMutation();

  const missingFields: string[] = [];
  if (!basicInfo.name?.trim()) missingFields.push("Full Name");
  if (!basicInfo.phone?.trim()) missingFields.push("Phone Number");
  if (!basicInfo.bio?.trim()) missingFields.push("Professional Bio");
  if (!skills || skills.length === 0)
    missingFields.push("Skills (at least one)");
  if (!basicInfo.resume?.url) missingFields.push("Resume PDF Document");

  const isProfileComplete = missingFields.length === 0;

  const formatSalary = (min: string | undefined, max: string | undefined) => {
    const minVal = parseFloat(min || "0") || 0;
    const maxVal = parseFloat(max || "0") || 0;
    const formatINR = (val: number) => `₹${val.toLocaleString("en-IN")}`;

    if (minVal && maxVal) {
      return `${formatINR(minVal)} - ${formatINR(maxVal)}`;
    }
    if (minVal) {
      return `${formatINR(minVal)}+`;
    }
    if (maxVal) {
      return formatINR(maxVal);
    }
    return "Negotiable";
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "Recently";
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const formattedSalary = formatSalary(job?.minSalary, job?.maxSalary);
  const formattedDate = formatDate(job?.created_at);

  const handleBack = () => {
    router.back();
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to apply for this job.");
      router.push("/login");
      return;
    }

    if (!isCandidate) {
      toast.error("Only candidates can apply to jobs.");
      return;
    }

    if (job?.status !== "OPEN") {
      toast.error("This job is currently unavailable or has expired.");
      return;
    }

    if (!isProfileComplete) {
      toast.error(
        `Please complete your profile to apply. Missing fields: ${missingFields.join(", ")}`,
      );
      return;
    }

    try {
      await applyMutation.mutateAsync(id);
      setHasAppliedLocally(true);
      setShowSuccessModal(true);
      toast.success("Applied for job successfully!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to apply for the job.";
      toast.error(message);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const existingApplication = applicationsResponse?.data?.find(
    (app) => app.job.id === id,
  );
  const hasApplied =
    !!existingApplication || job?.hasApplied || hasAppliedLocally;
  const applicationStatus =
    existingApplication?.application.status ||
    job?.applicationStatus ||
    (hasAppliedLocally ? "PENDING" : null);

  return {
    job,
    formattedSalary,
    formattedDate,
    handleBack,
    handleApply,
    handleShare,
    isApplying: applyMutation.isPending,
    hasApplied,
    applicationStatus,
    isProfileComplete,
    missingFields,
    isCandidate,
    isAuthenticated,
    isPageLoading,
    showSuccessModal,
    setShowSuccessModal,
    existingApplication,
  };
}
