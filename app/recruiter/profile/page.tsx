"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { BasicDetailsCard } from "@/features/recruiter/components/profile/basic-details-card";
import { CompanyIdentityCard } from "@/features/recruiter/components/profile/company-identity-card";
import { HeroAvatarCard } from "@/features/recruiter/components/profile/hero-avatar-card";
import { StickySaveBar } from "@/features/recruiter/components/profile/sticky-save-bar";
import { TaxIdentityCard } from "@/features/recruiter/components/profile/tax-identity-card";
import { useRecruiterProfile } from "@/features/recruiter/hooks/use-recruiter-profile";



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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="size-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isAnyEditing = editSection !== null;

  return (
    <div className="min-h-screen bg-[#fafafa] pb-32">
      <div className="max-w-3xl mx-auto px-4 pt-8 gap-y-6">
        <div className="mb-2">
          <m.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[32px] font-black text-near-black tracking-tight"
          >
            Profile
          </m.h1>
          <p className="text-gray-400 font-medium text-[14px] mt-0.5">
            Manage your recruiter identity and company details.
          </p>
        </div>

        <HeroAvatarCard
          formData={formData}
          recruiterProfile={recruiterProfile}
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

        <CompanyIdentityCard
          formData={formData}
          setFormData={setFormData}
          isEditingCompany={editSection === "company"}
          editSection={editSection}
          startEdit={startEdit}
        />

        <TaxIdentityCard
          formData={formData}
          recruiterProfile={recruiterProfile}
          editSection={editSection}
          startEdit={startEdit}
        />
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
