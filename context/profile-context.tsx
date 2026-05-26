"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import { createContext, use, useMemo, useState } from "react";
import { useProfileHandlers } from "@/features/profile/hooks/use-profile-handlers";
import {
  useCertificateQuery,
  useDeleteProfileImageMutation,
  useDeleteResumeMutation,
  useEducationQuery,
  useExperienceQuery,
  useProfileQuery,
  useUploadProfileImageMutation,
  useUploadResumeMutation,
} from "@/features/profile/hooks/use-profile-query";
import { useProfileStateSync } from "@/features/profile/hooks/use-profile-state-sync";
import type {
  BasicInfo,
  JobPreferences,
  ProfileCertificate,
  ProfileContextType,
  ProfileEducation,
  ProfileExperience,
  ProfileLanguage,
  SocialLinks,
} from "@/features/profile/types/profile-context.types";

export type {
  ProfileCertificate as Certificate,
  ProfileEducation as Education,
  ProfileExperience as Experience,
  ProfileLanguage as Language,
} from "@/features/profile/types/profile-context.types";

const AUTH_PATHS = ["/login", "/signup", "/forgot-password", "/reset-password"];

function isAuthRoute(pathname: string): boolean {
  return AUTH_PATHS.some(
    (p) => pathname === p || pathname.endsWith(p) || pathname.includes(p),
  );
}

const DEFAULT_BASIC_INFO: BasicInfo = {
  name: "",
  location: "Not set",
  tagline: "",
  avatar: "",
  email: "",
  phone: "",
  bio: "",
  cinNumber: "",
  isCompanyVerified: false,
};

const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  linkedin: "",
  portfolio: "",
  github: "",
};

const DEFAULT_JOB_PREFERENCES: JobPreferences = {
  jobTypes: [],
  roles: [],
  workStyles: [],
  minSalary: "",
  maxSalary: "",
  currency: "INR",
  salaryFrequency: "year",
  salaryFormat: "compact",
};

import { useAuthContext } from "@/features/auth/context/auth-context";

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isAuthPage = isAuthRoute(pathname);
  const { user, role, isAuthenticated } = useAuthContext();

  const isCandidate = role === "CANDIDATE";
  const hasProfile = isCandidate;

  const { data: profileData, isLoading: isProfileLoading } = useProfileQuery(
    role,
    {
      enabled: !isAuthPage && isAuthenticated && hasProfile,
    },
  );
  const { data: eduData, isLoading: isEduLoading } = useEducationQuery({
    enabled: !isAuthPage && isAuthenticated && isCandidate,
  });
  const { data: expData, isLoading: isExpLoading } = useExperienceQuery({
    enabled: !isAuthPage && isAuthenticated && isCandidate,
  });
  const { data: certData, isLoading: isCertLoading } = useCertificateQuery({
    enabled: !isAuthPage && isAuthenticated && isCandidate,
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<ProfileExperience[]>([]);
  const [education, setEducation] = useState<ProfileEducation[]>([]);
  const [certificates, setCertifications] = useState<ProfileCertificate[]>([]);
  const [languages, setLanguages] = useState<ProfileLanguage[]>([]);
  const [basicInfo, setBasicInfo] = useState<BasicInfo>(DEFAULT_BASIC_INFO);
  const [socialLinks, setSocialLinks] =
    useState<SocialLinks>(DEFAULT_SOCIAL_LINKS);
  const [jobPreferences, setJobPreferences] = useState<JobPreferences>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("jobPreferences:v1");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Error parsing job preferences from localStorage", e);
        }
      }
    }
    return DEFAULT_JOB_PREFERENCES;
  });

  useProfileStateSync({
    profileData,
    eduData,
    expData,
    certData,
    setSkills,
    setBasicInfo,
    setSocialLinks,
    setLanguages,
    setEducation,
    setExperience,
    setCertifications,
  });

  const handlers = useProfileHandlers({
    profileData,
    skills,
    role,
    userId: user?.id,
  });

  const handleUpdateJobPreferences = (formData: FormData) => {
    const updated = {
      jobTypes: formData.getAll("jobTypes") as string[],
      roles:
        (formData.get("roles") as string)
          ?.split(",")
          .flatMap((s: string) => {
            const trimmed = s.trim();
            return trimmed ? [trimmed] : [];
          }) || [],
      workStyles: formData.getAll("workStyles") as string[],
      minSalary: (formData.get("minSalary") as string) || "",
      maxSalary: (formData.get("maxSalary") as string) || "",
      currency: (formData.get("currency") as string) || "USD",
      salaryFrequency: (formData.get("salaryFrequency") as string) || "year",
      salaryFormat: (formData.get("salaryFormat") as string) || "compact",
    };
    setJobPreferences(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("jobPreferences:v1", JSON.stringify(updated));
    }
  };

  const handleClearJobPreferences = () => {
    const cleared = {
      jobTypes: [],
      roles: [],
      workStyles: [],
      minSalary: "",
      maxSalary: "",
      currency: "USD",
      salaryFrequency: "year",
      salaryFormat: "compact",
    };
    setJobPreferences(cleared);
    if (typeof window !== "undefined") {
      localStorage.removeItem("jobPreferences:v1");
    }
  };

  const uploadAvatarMutation = useUploadProfileImageMutation(role);
  const deleteAvatarMutation = useDeleteProfileImageMutation(role);
  const uploadResumeMutation = useUploadResumeMutation();
  const deleteResumeMutation = useDeleteResumeMutation();

  const handleUploadAvatar = async (file: File) => {
    await uploadAvatarMutation.mutateAsync(file);
  };

  const handleDeleteAvatar = async () => {
    await deleteAvatarMutation.mutateAsync();
  };

  const handleUploadResume = async (file: File) => {
    await uploadResumeMutation.mutateAsync(file);
  };

  const handleDeleteResume = async () => {
    await deleteResumeMutation.mutateAsync();
  };

  const isLoading =
    isProfileLoading || isEduLoading || isExpLoading || isCertLoading;

  const contextValue = useMemo(() => ({
    skills,
    experience,
    education,
    certificates,
    basicInfo,
    socialLinks,
    jobPreferences,
    languages,
    isLoading,
    isUploadingAvatar: uploadAvatarMutation.isPending,
    isDeletingAvatar: deleteAvatarMutation.isPending,
    isUploadingResume: uploadResumeMutation.isPending,
    isDeletingResume: deleteResumeMutation.isPending,
    ...handlers,
    handleUpdateJobPreferences,
    handleClearJobPreferences,
    handleUploadAvatar,
    handleDeleteAvatar,
    handleUploadResume,
    handleDeleteResume,
  }), [
    skills,
    experience,
    education,
    certificates,
    basicInfo,
    socialLinks,
    jobPreferences,
    languages,
    isLoading,
    uploadAvatarMutation.isPending,
    deleteAvatarMutation.isPending,
    uploadResumeMutation.isPending,
    deleteResumeMutation.isPending,
    handlers,
    handleUpdateJobPreferences,
    handleClearJobPreferences,
    handleUploadAvatar,
    handleDeleteAvatar,
    handleUploadResume,
    handleDeleteResume,
  ]);

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = use(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
