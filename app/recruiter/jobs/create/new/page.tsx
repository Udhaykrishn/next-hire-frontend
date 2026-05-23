"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Step1Details } from "@/components/recruiter/jobs/create/steps/step1-details";
import { Step2Requirements } from "@/components/recruiter/jobs/create/steps/step2-requirements";
import { Step3Logistics } from "@/components/recruiter/jobs/create/steps/step3-logistics";
import { Step4Preview } from "@/components/recruiter/jobs/create/steps/step4-preview";
import { Button } from "@/components/ui/button";
import { useRecruiterProfile } from "@/features/recruiter/hooks/use-recruiter-profile";
import { useJobForm } from "@/hooks/use-job-form";
import { cn } from "@/lib/utils";

import { STEPS } from "./constants";
import type { JobFormData } from "./types";

const INITIAL_DATA: JobFormData = {
  belongingCompany: "",
  hiringCompany: "",
  experienceType: "",
  jobTitle: "",
  jobCategory: "",
  jobType: "",
  isNightShift: false,
  locationType: "Work From Office",
  officeAddress: "",
  fieldArea: "",
  jobCity: "",
  floorDetails: "",
  showFloorDetails: false,
  industry: [],
  minSalary: "",
  maxSalary: "",
  payType: "",
  incentiveAmount: "",
  perks: [],
  hasJoiningFee: "No",
  feeAmount: "",
  feeReason: "",
  feeDetails: "",
  feePaymentTiming: "",
  education: "",
  experience: "",
  minExperience: "",
  englishLevel: "",
  gender: "",
  minAge: "",
  maxAge: "",
  degreeSpecialization: [],
  regionalLanguages: [],
  skills: [],
  description: "",
  jobDescription: "",
  isWalkIn: false,
  interviewAddress: "",
  walkInStartDate: "",
  walkInEndDate: "",
  walkInStartTime: "",
  walkInEndTime: "",
  interviewInstructions: "",
  contactPreference: "",
  whatsappAlerts: "",
  hrName: "",
  hrPhone: "",
  hrEmail: "",
  otherRecruiterName: "",
  otherRecruiterWhatsapp: "",
  otherRecruiterEmail: "",
  canCandidateContact: "No",
  selectedPlan: "",
};

export function JobWizard({
  initialData = INITIAL_DATA,
  jobId,
}: {
  initialData?: JobFormData;
  jobId?: string;
}) {
  const router = useRouter();
  const {
    currentStep,
    formData,
    setFormData,
    errors,
    nextStep,
    prevStep,
    isSubmitting,
    activeRequirementTab,
    setActiveRequirementTab,
    walkInDateRange,
    handleWalkInDateChange,
    setIsWalkInMapOpen,
    setCurrentStep,
    handlePostJob,
  } = useJobForm(initialData);

  // Use jobId in handlePostJob if needed (you may want to pass it to useJobForm or handle it in the hook)

  const { recruiterProfile, isLoading: isProfileLoading } =
    useRecruiterProfile();

  useEffect(() => {
    if (!isProfileLoading && !recruiterProfile?.is_verified_company) {
      toast.error(`Please verify your company with a CIN number to ${jobId ? 'edit' : 'post'} jobs.`);
      router.push("/recruiter/profile");
    }
  }, [recruiterProfile?.is_verified_company, isProfileLoading, router, jobId]);

  if (isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Details
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step2Requirements
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            activeRequirementTab={activeRequirementTab}
            setActiveRequirementTab={setActiveRequirementTab}
          />
        );
      case 3:
        return (
          <Step3Logistics
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            walkInDateRange={walkInDateRange}
            handleWalkInDateChange={handleWalkInDateChange}
            setIsWalkInMapOpen={setIsWalkInMapOpen}
          />
        );
      case 4:
        return (
          <Step4Preview formData={formData} setCurrentStep={setCurrentStep} />
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === STEPS.length;
  const isFirstStep = currentStep === 1;

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <div className="min-h-screen bg-slate-50/50 pb-24">
        <header className="sticky top-0 bg-white border-b border-gray-100 z-40">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-[16px] font-black text-near-black">
                {jobId ? "Edit job" : "Post job"}
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-near-black">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                  <span className="text-[11px]">?</span>
                </div>
                Support
              </button>
              <button className="text-slate-400 hover:text-near-black">
                <span className="text-[20px] leading-none">×</span>
              </button>
            </div>
          </div>

          <div className="bg-white border-b border-gray-100 py-4">
            <div className="max-w-3xl mx-auto px-6">
              <div className="flex items-center justify-between relative">
                {/* Connector Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-100 -translate-y-1/2 z-0" />
                <div
                  className="absolute top-1/2 left-0 h-[2px] bg-wise-green -translate-y-1/2 z-0 transition-all duration-500"
                  style={{
                    width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                  }}
                />

                {STEPS.map((step, _idx) => (
                  <div
                    key={step.id}
                    className="relative z-10 flex flex-col items-center"
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black transition-all duration-300",
                        step.id < currentStep
                          ? "bg-wise-green text-near-black"
                          : step.id === currentStep
                            ? "bg-near-black text-white scale-110 shadow-lg"
                            : "bg-white border-2 border-gray-200 text-gray-400",
                      )}
                    >
                      {step.id < currentStep ? "✓" : step.id}
                    </div>
                    <span
                      className={cn(
                        "absolute top-10 whitespace-nowrap text-[11px] font-black tracking-tight transition-opacity duration-300",
                        step.id === currentStep
                          ? "text-near-black opacity-100"
                          : "text-gray-400 opacity-0",
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          <AnimatePresence mode="wait">
            <div key={currentStep}>{renderStep()}</div>
          </AnimatePresence>
        </main>

        <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 z-40">
          <div className="max-w-5xl mx-auto flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={isFirstStep || isSubmitting}
              className="h-12 px-12 rounded-xl border-gray-200 text-near-black font-black hover:bg-slate-50 transition-all active:scale-95"
            >
              Back
            </Button>

            <Button
              onClick={isLastStep ? handlePostJob : nextStep}
              disabled={isSubmitting}
              className={cn(
                "h-12 px-12 rounded-xl font-black transition-all active:scale-95 shadow-sm min-w-[200px]",
                "bg-wise-green text-near-black hover:bg-wise-green/90",
              )}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <span>{isLastStep ? (jobId ? "Update Job Now" : "Post Job Now") : "Continue"}</span>
              )}
            </Button>
          </div>
        </footer>
      </div>
    </APIProvider>
  );
}

export default function CreateJobPage() {
  return <JobWizard />;
}
