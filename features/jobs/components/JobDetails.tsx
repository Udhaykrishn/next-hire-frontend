"use client";

import { ChevronLeft } from "lucide-react";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";
import { GlobalLoader } from "@/components/shared/global-loader";
import { useJobDetails } from "../hooks/use-job-details";
import { JobDescriptionCard } from "./job-details/JobDescriptionCard";
import { JobHeaderCard } from "./job-details/JobHeaderCard";
import { JobSidebar } from "./job-details/JobSidebar";
import { JobSuccessModal } from "./job-details/JobSuccessModal";

export default function JobDetails() {
  const {
    job,
    formattedSalary,
    handleBack,
    handleApply,
    isApplying,
    hasApplied,
    applicationStatus,
    isProfileComplete,
    missingFields,
    isCandidate,
    isAuthenticated,
    isPageLoading,
    handleShare,
    showSuccessModal,
    setShowSuccessModal,
    existingApplication,
  } = useJobDetails();

  if (isPageLoading) {
    return <GlobalLoader />;
  }

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-10">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-[14px] font-black text-gray-500 hover:text-wise-green transition-colors uppercase tracking-widest"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Search
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <JobHeaderCard
                job={job}
                formattedSalary={formattedSalary}
                isApplying={isApplying}
                hasApplied={hasApplied}
                handleApply={handleApply}
                handleShare={handleShare}
              />

              <JobDescriptionCard job={job} />
            </div>

            <JobSidebar
              job={job}
              hasApplied={hasApplied}
              applicationStatus={applicationStatus}
              existingApplication={existingApplication}
              isAuthenticated={isAuthenticated}
              isCandidate={isCandidate}
              isProfileComplete={isProfileComplete}
              missingFields={missingFields}
              isApplying={isApplying}
              handleApply={handleApply}
            />
          </div>
        </div>
      </main>

      <JobSuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <LandingFooter />
    </div>
  );
}
