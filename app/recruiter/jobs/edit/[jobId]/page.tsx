"use client";

import { useParams } from "next/navigation";
import { useJobDetailsQuery } from "@/features/jobs/hooks/use-jobs-query";
import { JobWizard } from "../../create/new/page";
import type { JobFormData } from "../../create/new/types";

export default function EditJobPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  const { data: job, isLoading: isJobLoading } = useJobDetailsQuery(jobId);

  if (isJobLoading || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
        <div className="w-8 h-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const initialData: JobFormData = {
    belongingCompany: job.belongingCompany || "",
    hiringCompany: job.hiringCompany || "",
    experienceType: job.experienceType || "",
    jobTitle: job.jobTitle || "",
    jobCategory: job.jobCategory || "",
    jobType: job.jobType || "",
    isNightShift: job.isNightShift || false,
    locationType: (job.locationType as JobFormData["locationType"]) || "Work From Office",
    officeAddress: job.officeAddress || "",
    fieldArea: job.fieldArea || "",
    jobCity: job.jobCity || "",
    floorDetails: job.floorDetails || "",
    showFloorDetails: job.showFloorDetails || false,
    industry: job.industry || [],
    minSalary: job.minSalary || "",
    maxSalary: job.maxSalary || "",
    payType: (job.payType as JobFormData["payType"]) || "",
    incentiveAmount: job.incentiveAmount || "",
    perks: job.perks || [],
    hasJoiningFee: (job.hasJoiningFee as JobFormData["hasJoiningFee"]) || "No",
    feeAmount: job.feeAmount || "",
    feeReason: job.feeReason || "",
    feeDetails: job.feeDetails || "",
    feePaymentTiming: job.feePaymentTiming || "",
    education: job.education || "",
    experience: job.experience || "",
    minExperience: job.minExperience || "",
    englishLevel: job.englishLevel || "",
    gender: job.gender || "",
    minAge: job.minAge || "",
    maxAge: job.maxAge || "",
    degreeSpecialization: job.degreeSpecialization || [],
    regionalLanguages: job.regionalLanguages || [],
    skills: job.skills || [],
    description: job.description || "",
    jobDescription: job.jobDescription || "",
    isWalkIn: job.isWalkIn || false,
    interviewAddress: job.interviewAddress || "",
    walkInStartDate: job.walkInStartDate || "",
    walkInEndDate: job.walkInEndDate || "",
    walkInStartTime: job.walkInStartTime || "",
    walkInEndTime: job.walkInEndTime || "",
    interviewInstructions: job.interviewInstructions || "",
    contactPreference: (job.contactPreference as JobFormData["contactPreference"]) || "",
    whatsappAlerts: (job.whatsappAlerts as JobFormData["whatsappAlerts"]) || "",
    hrName: job.hrName || "",
    hrPhone: job.hrPhone || "",
    hrEmail: job.hrEmail || "",
    otherRecruiterName: job.otherRecruiterName || "",
    otherRecruiterWhatsapp: job.otherRecruiterWhatsapp || "",
    otherRecruiterEmail: job.otherRecruiterEmail || "",
    canCandidateContact: (job.canCandidateContact as JobFormData["canCandidateContact"]) || "No",
    selectedPlan: job.selectedPlan || "",
  };

  return <JobWizard initialData={initialData} jobId={jobId} />;
}
