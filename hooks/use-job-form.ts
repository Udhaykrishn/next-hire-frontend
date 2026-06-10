"use client";

import { format as formatDate, parse } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { plans } from "@/app/recruiter/jobs/create/new/constants";
import {
  jobStep1Schema,
  jobStep2Schema,
  jobStep3Schema,
  jobStep4Schema,
  jobStep5Schema,
} from "@/app/recruiter/jobs/create/new/schema";
import type { JobFormData } from "@/app/recruiter/jobs/create/new/types";
import {
  useCreateJobMutation,
  useUpdateJobMutation,
} from "@/features/jobs/hooks/use-jobs-query";

export const useJobForm = (initialData: JobFormData, jobId?: string) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<JobFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWalkInMapOpen, setIsWalkInMapOpen] = useState(false);
  const [activeRequirementTab, setActiveRequirementTab] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("jobFormData");
    const savedStep = localStorage.getItem("jobCurrentStep");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        parsed.industry = Array.isArray(parsed.industry) ? parsed.industry : [];
        parsed.degreeSpecialization = Array.isArray(parsed.degreeSpecialization)
          ? parsed.degreeSpecialization
          : [];
        parsed.regionalLanguages = Array.isArray(parsed.regionalLanguages)
          ? parsed.regionalLanguages
          : [];
        parsed.perks = Array.isArray(parsed.perks) ? parsed.perks : [];

        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (_e) {
        console.error("Failed to parse saved job data");
      }
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("jobFormData", JSON.stringify(formData));
      localStorage.setItem("jobCurrentStep", currentStep.toString());
    }
  }, [formData, currentStep, isLoaded]);

  const selectedPlanData = useMemo(
    () => plans.find((p) => p.id === formData.selectedPlan),
    [formData.selectedPlan],
  );

  const walkInDateRange: DateRange | undefined = useMemo(() => {
    if (!formData.walkInStartDate) return undefined;
    try {
      const from = parse(formData.walkInStartDate, "yyyy-MM-dd", new Date());
      const to = formData.walkInEndDate
        ? parse(formData.walkInEndDate, "yyyy-MM-dd", new Date())
        : undefined;
      return { from, to };
    } catch (_e) {
      return undefined;
    }
  }, [formData.walkInStartDate, formData.walkInEndDate]);

  const handleWalkInDateChange = (range: DateRange | undefined) => {
    setFormData((prev) => ({
      ...prev,
      walkInStartDate: range?.from ? formatDate(range.from, "yyyy-MM-dd") : "",
      walkInEndDate: range?.to ? formatDate(range.to, "yyyy-MM-dd") : "",
    }));
  };

  const stepSchemas = [
    jobStep1Schema,
    jobStep2Schema,
    jobStep3Schema,
    jobStep4Schema,
    jobStep5Schema,
  ];
  const currentSchema = stepSchemas[currentStep - 1];

  // Derive live errors using Zod's inbuilt flatten feature
  const liveErrors = useMemo(() => {
    if (Object.keys(errors).length === 0 || !currentSchema) return errors;

    const result = currentSchema.safeParse(formData);
    if (result.success) return {};

    const fieldErrors = result.error.flatten().fieldErrors;
    const formattedErrors: Record<string, string> = {};
    for (const key in fieldErrors) {
      formattedErrors[key] = fieldErrors[key]?.[0] || "";
    }
    return formattedErrors;
  }, [formData, currentSchema, errors]);

  const displayErrors = Object.keys(errors).length > 0 ? liveErrors : {};

  const nextStep = () => {
    if (!currentSchema) return;

    const result = currentSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Record<string, string> = {};
      for (const key in fieldErrors) {
        newErrors[key] = fieldErrors[key]?.[0] || "";
      }
      setErrors(newErrors);

      const firstErrorKey = Object.keys(fieldErrors)[0];
      const element = document.getElementById(`field-${firstErrorKey}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { mutateAsync: createJob } = useCreateJobMutation();
  const { mutateAsync: updateJob } = useUpdateJobMutation();

  const handlePostJob = async () => {
    setIsSubmitting(true);
    try {
      if (jobId) {
        await updateJob({ jobId, data: formData });
      } else {
        await createJob(formData);
      }

      localStorage.removeItem("jobFormData");
      localStorage.removeItem("jobCurrentStep");

      if (isPremium || jobId) {
        toast.success(
          jobId ? "Job updated successfully!" : "Job posted successfully!",
        );
        router.push("/recruiter/jobs");
      } else {
        router.push("/recruiter/plan");
      }
    } catch (error) {
      console.error(`Failed to ${jobId ? "update" : "post"} job:`, error);
      toast.error(
        `Failed to ${jobId ? "update" : "post"} job. Please check your company verification status and subscription limits.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    errors: displayErrors,
    setErrors,
    isLoaded,
    activeRequirementTab,
    setActiveRequirementTab,
    nextStep,
    prevStep,
    handlePostJob,
    walkInDateRange,
    handleWalkInDateChange,
    isWalkInMapOpen,
    setIsWalkInMapOpen,
    selectedPlanData,
    isSubmitting,
    setIsSubmitting,
    isPremium,
    setIsPremium,
  };
};
