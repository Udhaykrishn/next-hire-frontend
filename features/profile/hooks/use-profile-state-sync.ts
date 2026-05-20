"use client";

import { format } from "date-fns";
import { useEffect } from "react";
import type {
  ApiResponse,
  Certificate,
  Education,
  Experience,
  UserProfile,
} from "@/features/profile/types/profile.types";
import type {
  BasicInfo,
  ProfileCertificate,
  ProfileEducation,
  ProfileExperience,
  ProfileLanguage,
  SocialLinks,
} from "@/features/profile/types/profile-context.types";

type SetState<T> = (val: T) => void;

interface UseSyncProfileDataParams {
  profileData: ApiResponse<UserProfile> | undefined;
  eduData: ApiResponse<Education[]> | undefined;
  expData: ApiResponse<Experience[]> | undefined;
  certData: ApiResponse<Certificate[]> | undefined;
  setSkills: SetState<string[]>;
  setBasicInfo: SetState<BasicInfo>;
  setSocialLinks: SetState<SocialLinks>;
  setLanguages: SetState<ProfileLanguage[]>;
  setEducation: SetState<ProfileEducation[]>;
  setExperience: SetState<ProfileExperience[]>;
  setCertifications: SetState<ProfileCertificate[]>;
}

export function useProfileStateSync({
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
}: UseSyncProfileDataParams): void {
  useEffect(() => {
    if (profileData?.success && profileData.data) {
      const p = profileData.data;
      setSkills(p.skills || []);
      setBasicInfo({
        name: p.name || "",
        location: "Not set",
        tagline: p.role_of_title || "",
        avatar: p.profile_url?.url || "",
        email: p.email || "",
        phone: p.phone || "",
        cinNumber: p.cinNumber || p.CIN || "",
        isCompanyVerified: p.isCompanyVerified || p.is_verified_company || false,
      });
      setSocialLinks({
        linkedin: p.social_link?.linkedin || "",
        portfolio: p.social_link?.portfolio || "",
        github: p.social_link?.github || "",
      });
      setLanguages(
        p.languages?.map((l, i) => ({
          id: `lang-${i}`,
          name: l.name,
          level: l.proficiency,
        })) || [],
      );
    }
  }, [profileData, setSkills, setBasicInfo, setSocialLinks, setLanguages]);

  useEffect(() => {
    if (eduData?.success && Array.isArray(eduData.data)) {
      setEducation(
        eduData.data.map((edu) => ({
          id: edu.id,
          level: "N/A",
          degree: edu.degree,
          specialisation: edu.fieldOfStudy,
          school: edu.institutionName,
          startDate: new Date(edu.startDate),
          endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          year: `${format(new Date(edu.startDate), "MMM yyyy")} — ${edu.endDate ? format(new Date(edu.endDate), "MMM yyyy") : "Present"}`,
          logo: edu.institutionName.charAt(0).toUpperCase(),
        })),
      );
    } else if (eduData && !eduData.success) {
      console.warn("Education fetch failed:", eduData.message);
    }
  }, [eduData, setEducation]);

  useEffect(() => {
    if (expData?.success && Array.isArray(expData.data)) {
      setExperience(
        expData.data.map((exp) => ({
          id: exp.id,
          title: exp.projectName,
          company: exp.company || "Independent / Project",
          role: exp.role || "Developer",
          industry: exp.industry || "Technology",
          location: exp.location || "Remote",
          period: `${format(new Date(exp.startDate), "MMM yyyy")} — ${exp.currentlyWorking ? "Present" : format(new Date(exp.endDate), "MMM yyyy")}`,
          startDate: new Date(exp.startDate),
          endDate: new Date(exp.endDate),
          description: exp.description,
          logo: (exp.company || exp.projectName).charAt(0).toUpperCase(),
          currentlyWorking: exp.currentlyWorking || false,
          employmentType: exp.employmentType || "Full-time",
          noticePeriod: exp.noticePeriod || "No notice period",
        })),
      );
    } else if (expData && !expData.success) {
      console.warn("Experience fetch failed:", expData.message);
    }
  }, [expData, setExperience]);

  useEffect(() => {
    if (certData?.success && Array.isArray(certData.data)) {
      setCertifications(
        certData.data.map((cert) => ({
          id: cert.id,
          name: cert.name,
          issuer: cert.issuer,
          date: format(new Date(cert.issueDate), "MMM yyyy"),
          issueDate: new Date(cert.issueDate),
        })),
      );
    } else if (certData && !certData.success) {
      console.warn("Certificate fetch failed:", certData.message);
    }
  }, [certData, setCertifications]);
}
