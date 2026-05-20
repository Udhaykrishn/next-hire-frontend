"use client";

import {
  useCreateCertificateMutation,
  useCreateEducationMutation,
  useCreateExperienceMutation,
  useDeleteCertificateMutation,
  useDeleteEducationMutation,
  useDeleteExperienceMutation,
  useUpdateCertificateMutation,
  useUpdateEducationMutation,
  useUpdateExperienceMutation,
  useUpdateProfileMutation,
} from "@/features/profile/hooks/use-profile-query";
import type {
  ApiResponse,
  UserProfile,
} from "@/features/profile/types/profile.types";

interface UseProfileHandlersParams {
  profileData: ApiResponse<UserProfile> | undefined;
  skills: string[];
  role: string | null;
  userId?: string;
}

export function useProfileHandlers({
  profileData,
  skills,
  role,
  userId,
}: UseProfileHandlersParams) {
  const updateProfileMutation = useUpdateProfileMutation(role, userId);

  const createEduMutation = useCreateEducationMutation();
  const updateEduMutation = useUpdateEducationMutation();
  const deleteEduMutation = useDeleteEducationMutation();

  const createExpMutation = useCreateExperienceMutation();
  const updateExpMutation = useUpdateExperienceMutation();
  const deleteExpMutation = useDeleteExperienceMutation();

  const createCertMutation = useCreateCertificateMutation();
  const updateCertMutation = useUpdateCertificateMutation();
  const deleteCertMutation = useDeleteCertificateMutation();

  const handleAddExperience = (
    formData: FormData,
    expStartDate: Date | undefined,
    expEndDate: Date | undefined,
  ) => {
    createExpMutation.mutate({
      projectName: formData.get("title") as string,
      description: formData.get("description") as string,
      startDate: expStartDate?.toISOString() || new Date().toISOString(),
      endDate: expEndDate?.toISOString() || new Date().toISOString(),
      githubUrls: [],
      isCollaborative: false,
      skillsLearned: [],
      company: formData.get("company") as string,
      location: formData.get("location") as string,
      industry: formData.get("industry") as string,
      role: formData.get("role") as string,
      currentlyWorking: formData.get("currentlyWorking") === "yes",
      employmentType: formData.get("employmentType") as string,
      noticePeriod: formData.get("noticePeriod") as string,
    });
  };

  const handleUpdateExperience = (
    id: string,
    formData: FormData,
    expStartDate: Date | undefined,
    expEndDate: Date | undefined,
  ) => {
    updateExpMutation.mutate({
      id,
      data: {
        projectName: formData.get("title") as string,
        description: formData.get("description") as string,
        startDate: expStartDate?.toISOString(),
        endDate: expEndDate?.toISOString(),
        company: formData.get("company") as string,
        location: formData.get("location") as string,
        industry: formData.get("industry") as string,
        role: formData.get("role") as string,
        currentlyWorking: formData.get("currentlyWorking") === "yes",
        employmentType: formData.get("employmentType") as string,
        noticePeriod: formData.get("noticePeriod") as string,
      },
    });
  };

  const handleDeleteExperience = (id: string) => {
    deleteExpMutation.mutate(id);
  };

  const handleAddEducation = (
    formData: FormData,
    eduStartDate: Date | undefined,
    eduEndDate: Date | undefined,
  ) => {
    createEduMutation.mutate({
      institutionName: formData.get("school") as string,
      degree: formData.get("degree") as string,
      fieldOfStudy: formData.get("specialisation") as string,
      startDate: eduStartDate?.toISOString() || new Date().toISOString(),
      endDate: eduEndDate?.toISOString(),
      gpa: "",
    });
  };

  const handleUpdateEducation = (
    id: string,
    formData: FormData,
    eduStartDate: Date | undefined,
    eduEndDate: Date | undefined,
  ) => {
    updateEduMutation.mutate({
      id,
      data: {
        institutionName: formData.get("school") as string,
        degree: formData.get("degree") as string,
        fieldOfStudy: formData.get("specialisation") as string,
        startDate: eduStartDate?.toISOString(),
        endDate: eduEndDate?.toISOString(),
      },
    });
  };

  const handleDeleteEducation = (id: string) => {
    deleteEduMutation.mutate(id);
  };

  const handleAddCertificate = (
    formData: FormData,
    certDate: Date | undefined,
  ) => {
    createCertMutation.mutate({
      name: formData.get("name") as string,
      issuer: formData.get("issuer") as string,
      issueDate: certDate?.toISOString() || new Date().toISOString(),
    });
  };

  const handleUpdateCertificate = (
    id: string,
    formData: FormData,
    certDate: Date | undefined,
  ) => {
    updateCertMutation.mutate({
      id,
      data: {
        name: formData.get("name") as string,
        issuer: formData.get("issuer") as string,
        issueDate: certDate?.toISOString(),
      },
    });
  };

  const handleDeleteCertificate = (id: string) => {
    deleteCertMutation.mutate(id);
  };

  const handleUpdateProfile = (formData: FormData) => {
    updateProfileMutation.mutate({
      name: formData.get("name") as string,
      role_of_title: formData.get("tagline") as string,
      bio: profileData?.data?.bio || "",
      phone: formData.get("phone") as string,
      social_link: {
        linkedin: formData.get("linkedin") as string,
        portfolio: formData.get("portfolio") as string,
        github:
          (formData.get("github") as string) ||
          profileData?.data?.social_link?.github ||
          "",
      },
    });
  };

  const handleAddLanguage = (formData: FormData) => {
    const newLang = {
      name: formData.get("name") as string,
      proficiency: formData.get("level") as string,
    };
    updateProfileMutation.mutate({
      languages: [...(profileData?.data?.languages || []), newLang],
    });
  };

  const handleUpdateLanguage = (id: string, formData: FormData) => {
    const langIndex = parseInt(id.replace("lang-", ""), 10);
    const updatedLanguages = [...(profileData?.data?.languages || [])];
    updatedLanguages[langIndex] = {
      name: formData.get("name") as string,
      proficiency: formData.get("level") as string,
    };
    updateProfileMutation.mutate({ languages: updatedLanguages });
  };

  const handleDeleteLanguage = (id: string) => {
    const langIndex = parseInt(id.replace("lang-", ""), 10);
    const updatedLanguages = [...(profileData?.data?.languages || [])];
    updatedLanguages.splice(langIndex, 1);
    updateProfileMutation.mutate({ languages: updatedLanguages });
  };

  const handleAddSkill = (skillInput: string) => {
    if (!skillInput) return;
    const newSkills = skillInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !skills.includes(s));

    if (newSkills.length > 0) {
      const uniqueNewSkills = Array.from(new Set(newSkills));
      updateProfileMutation.mutate({ skills: [...skills, ...uniqueNewSkills] });
    }
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    updateProfileMutation.mutate({
      skills: skills.filter((skill) => skill !== skillToDelete),
    });
  };

  const handleUpdateCin = (cin: string) => {
    updateProfileMutation.mutate({ cinNumber: cin });
  };

  return {
    handleAddExperience,
    handleUpdateExperience,
    handleDeleteExperience,
    handleAddEducation,
    handleUpdateEducation,
    handleDeleteEducation,
    handleAddCertificate,
    handleUpdateCertificate,
    handleDeleteCertificate,
    handleUpdateProfile,
    handleAddLanguage,
    handleUpdateLanguage,
    handleDeleteLanguage,
    handleAddSkill,
    handleDeleteSkill,
    handleUpdateCin,
  };
}
