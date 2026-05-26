"use client";

import { useCandidateProfile } from "@/features/jobs/hooks/use-candidate-profile";
import { CandidateHeader } from "@/features/jobs/components/candidate-profile/CandidateHeader";
import { CandidateBasicInfo } from "@/features/jobs/components/candidate-profile/CandidateBasicInfo";
import { ApplicationDetails } from "@/features/jobs/components/candidate-profile/ApplicationDetails";
import { AIMatchAnalysis } from "@/features/jobs/components/candidate-profile/AIMatchAnalysis";
import { CandidateLanguages } from "@/features/jobs/components/candidate-profile/CandidateLanguages";
import { CandidateBio } from "@/features/jobs/components/candidate-profile/CandidateBio";
import { CandidateSkills } from "@/features/jobs/components/candidate-profile/CandidateSkills";
import { CandidateExperience } from "@/features/jobs/components/candidate-profile/CandidateExperience";
import { CandidateEducation } from "@/features/jobs/components/candidate-profile/CandidateEducation";
import { CandidateCertifications } from "@/features/jobs/components/candidate-profile/CandidateCertifications";

export default function CandidateProfilePage() {
  const {
    candidateId,
    application,
    profile,
    education,
    experience,
    certificates,
    isLoading,
    matchScore,
    matchBreakdown,
    isAnalyzing,
    analyzeMatch,
    handleUpdateStatus,
    handleGoBack,
  } = useCandidateProfile();

  if (!candidateId) {
    return <div className="p-8 text-center text-[#d03238]">Invalid candidate.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-[#e8ebe6] border-t-[#0e0f0c] rounded-full animate-spin" />
        <p className="text-[#868685] font-[500] text-[15px]">Loading full profile...</p>
      </div>
    );
  }

  if (!profile || !application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-[24px] font-[800] text-[#0e0f0c] mb-2">Candidate Not Found</h2>
        <p className="text-[#868685] mb-6">The requested candidate profile could not be loaded.</p>
        <button
          onClick={handleGoBack}
          className="px-6 py-2.5 bg-[#0e0f0c] text-white rounded-full text-[14px] font-[600] hover:bg-[#0e0f0c]/80 transition-colors"
        >
          Go Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 font-satoshi space-y-8 bg-[#f9faf9] min-h-screen">
      <CandidateHeader
        status={application.status}
        onGoBack={handleGoBack}
        onUpdateStatus={handleUpdateStatus}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Basic Info & Application Meta */}
        <div className="lg:col-span-4 space-y-6">
          <CandidateBasicInfo
            profile={profile}
            profileImage={application.candidate.profileImage}
          />

          <ApplicationDetails
            status={application.status}
            createdAt={application.createdAt}
            resumeUrl={application.candidate.resume as string | null}
          />

          <AIMatchAnalysis
            matchScore={matchScore}
            matchBreakdown={matchBreakdown}
            isAnalyzing={isAnalyzing}
            onAnalyze={analyzeMatch}
          />

          <CandidateLanguages languages={profile.languages} />
        </div>

        {/* Right Column: Detailed Profile */}
        <div className="lg:col-span-8 space-y-6">
          <CandidateBio bio={profile.bio || profile.about} />
          <CandidateSkills skills={profile.skills} />
          <CandidateExperience experience={experience} />
          <CandidateEducation education={education} />
          <CandidateCertifications certificates={certificates} />
        </div>
      </div>
    </div>
  );
}
