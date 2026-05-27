"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { BasicDetailsCard } from "@/features/recruiter/components/profile/basic-details-card";

import { HeroAvatarCard } from "@/features/recruiter/components/profile/hero-avatar-card";
import { StickySaveBar } from "@/features/recruiter/components/profile/sticky-save-bar";

import { CompanyVerificationCard } from "@/features/recruiter/components/profile/company-verification-card";
import type { CompanyProfileData } from "@/features/recruiter/components/profile/companies-managed-card";
import { useRecruiterProfile } from "@/features/recruiter/hooks/use-recruiter-profile";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const {
    recruiterProfile,
    isLoading,
    editSection,
    startEdit,
    formData,
    setFormData,
    handleSave,
    handleCancel,
    isUpdating,
    handleUploadAvatar,
    isUploadingAvatar,
    handleDeleteAvatar,
    isDeletingAvatar,
  } = useRecruiterProfile();

  const [activeCompanyId, setActiveCompanyId] = useState<string>("");
  const [companies, setCompanies] = useState<CompanyProfileData[]>([]);

  useEffect(() => {
    if (recruiterProfile && companies.length === 0) {
      const primaryCompanyId =
        recruiterProfile.id ||
        recruiterProfile.id ||
        recruiterProfile.email ||
        "primary";
      setCompanies([
        {
          id: primaryCompanyId,
          name: recruiterProfile.name || "",
          industry: recruiterProfile.category || "",
          logo: recruiterProfile.profile_url?.url || "",
          activeJobs: 0,
          isVerified: recruiterProfile.is_verified_company || false,
          cin: recruiterProfile.CIN || "",
        },
      ]);
      setActiveCompanyId(primaryCompanyId);
    }
  }, [recruiterProfile, companies.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isAnyEditing = editSection !== null;

  return (
    <div className="min-h-screen bg-[#fafafa] pb-32">
      <div className="max-w-4xl mx-auto px-4 pt-12 space-y-8">
        <div className="mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[36px] font-black text-near-black tracking-tight leading-none"
            >
              Profile
            </motion.h1>
            <p className="text-gray-500 font-medium text-[15px] mt-2">
              Manage your personal identity and business organizations.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 mt-8">
          <div className="space-y-6">
            <HeroAvatarCard
              formData={formData}
              recruiterProfile={recruiterProfile}
              activeCompany={
                companies.find((c) => c.id === activeCompanyId) || null
              }
              isUploadingAvatar={isUploadingAvatar}
              handleUploadAvatar={handleUploadAvatar}
              isDeletingAvatar={isDeletingAvatar}
              handleDeleteAvatar={handleDeleteAvatar}
            />

            <BasicDetailsCard
              formData={formData}
              setFormData={setFormData}
              isEditingBasic={editSection === "basic"}
              editSection={editSection}
              startEdit={startEdit}
            />

            <CompanyVerificationCard
              company={companies.find((c) => c.id === activeCompanyId) || null}
            />
          </div>
        </div>
      </div>

      <StickySaveBar
        isVisible={isAnyEditing}
        isUpdating={isUpdating}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </div>
  );
}
