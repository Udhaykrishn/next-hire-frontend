import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useProfile } from "@/hooks/use-profile";
import { useApplyJobMutation, useJobDetailsQuery } from "./use-jobs-query";

export function useJobDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [hasAppliedLocally, setHasAppliedLocally] = useState(false);

  const { data: job } = useJobDetailsQuery(id);
  const applyMutation = useApplyJobMutation();
  const { basicInfo, skills } = useProfile();
  const { role, isAuthenticated } = useAuthContext();

  const isCandidate = role === "CANDIDATE";

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
    if (minVal && maxVal) {
      return `$${Math.round(minVal / 1000)}k - $${Math.round(maxVal / 1000)}k`;
    }
    if (minVal) {
      return `$${Math.round(minVal / 1000)}k+`;
    }
    if (maxVal) {
      return `$${Math.round(maxVal / 1000)}k`;
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

    if (!isProfileComplete) {
      toast.error(
        `Please complete your profile to apply. Missing fields: ${missingFields.join(", ")}`,
      );
      return;
    }

    try {
      await applyMutation.mutateAsync(id);
      setHasAppliedLocally(true);
      toast.success("Applied for job successfully!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to apply for the job.";
      toast.error(message);
    }
  };

  return {
    job,
    formattedSalary,
    formattedDate,
    handleBack,
    handleApply,
    isApplying: applyMutation.isPending,
    hasApplied: hasAppliedLocally,
    isProfileComplete,
    missingFields,
    isCandidate,
    isAuthenticated,
  };
}
