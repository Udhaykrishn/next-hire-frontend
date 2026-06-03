"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import { createContext, useContext, useState } from "react";
import { useProfileHandlers } from "@/features/profile/hooks/use-profile-handlers";
import {
  useCertificateQuery,
  useEducationQuery,
  useExperienceQuery,
  useProfileQuery,
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

// Re-export UI types for backward-compat with existing imports
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
  const isRecruiter = role === "RECRUITER";
  const hasProfile = isCandidate || isRecruiter;

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
  const [jobPreferences, setJobPreferences] = useState<JobPreferences>(
    DEFAULT_JOB_PREFERENCES,
  );

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
    setJobPreferences({
      jobTypes: formData.getAll("jobTypes") as string[],
      roles:
        (formData.get("roles") as string)
          ?.split(",")
          .reduce((acc: string[], s: string) => {
            const trimmed = s.trim();
            if (trimmed) acc.push(trimmed);
            return acc;
          }, []) || [],
      workStyles: formData.getAll("workStyles") as string[],
      minSalary: (formData.get("minSalary") as string) || "",
      maxSalary: (formData.get("maxSalary") as string) || "",
    });
  };

  const handleClearJobPreferences = () => {
    setJobPreferences({
      jobTypes: [],
      roles: [],
      workStyles: [],
      minSalary: "",
      maxSalary: "",
    });
  };

  const isLoading =
    isProfileLoading || isEduLoading || isExpLoading || isCertLoading;

  return (
    <ProfileContext.Provider
      value={{
        skills,
        experience,
        education,
        certificates,
        basicInfo,
        socialLinks,
        jobPreferences,
        languages,
        isLoading,
        ...handlers,
        handleUpdateJobPreferences,
        handleClearJobPreferences,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
