import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuthContext } from "@/features/auth/context/auth-context";
import type { UpdateRecruiterProfileDto } from "../types/recruiter.types";
import {
  useRecruiterProfileQuery,
  useUpdateRecruiterProfileMutation,
  useUploadRecruiterAvatarMutation,
} from "./use-recruiter-query";

export interface RecruiterFormValues {
  name: string;
  email: string;
  phone: string;
  cinNumber: string;
  websiteLink: string;
  description: string;
  category: string;
  companyRole: string;
}

export type EditSection = "basic" | "company" | "tax" | null;

export function useRecruiterProfile() {
  const { user } = useAuthContext();
  const { data: profileResponse, isLoading } = useRecruiterProfileQuery();
  const updateMutation = useUpdateRecruiterProfileMutation();
  const uploadAvatarMutation = useUploadRecruiterAvatarMutation();

  const recruiterProfile =
    profileResponse?.success && profileResponse.data
      ? profileResponse.data
      : null;

  const [editSection, setEditSection] = useState<EditSection>(null);
  const [formData, setFormData] = useState<RecruiterFormValues>({
    name: "",
    email: "",
    phone: "",
    cinNumber: "",
    websiteLink: "",
    description: "",
    category: "",
    companyRole: "",
  });

  // Snapshot on entering edit mode for cancel
  const [snapshot, setSnapshot] = useState<RecruiterFormValues | null>(null);

  const syncFromProfile = () => {
    if (recruiterProfile) {
      setFormData({
        name: recruiterProfile.name || "",
        email: recruiterProfile.email || "",
        phone: recruiterProfile.phone || "",
        cinNumber: recruiterProfile.CIN || "",
        websiteLink: recruiterProfile.website_link || "",
        description: recruiterProfile.description || "",
        category: recruiterProfile.category || "",
        companyRole: recruiterProfile.company_role || "",
      });
    }
  };

  useEffect(() => {
    if (editSection === null && recruiterProfile) {
      syncFromProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recruiterProfile, editSection, syncFromProfile]);

  const startEdit = (section: EditSection) => {
    setSnapshot({ ...formData });
    setEditSection(section);
  };

  const handleSave = async () => {
    if (!user?.id) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      const payload: UpdateRecruiterProfileDto = {};

      if (editSection === "basic") {
        if (formData.name !== recruiterProfile?.name)
          payload.name = formData.name;
        if (formData.phone !== recruiterProfile?.phone)
          payload.phone = formData.phone;
      } else if (editSection === "company") {
        if (formData.companyRole !== recruiterProfile?.company_role)
          payload.company_role = formData.companyRole;
        if (formData.category !== recruiterProfile?.category)
          payload.category = formData.category;
        if (formData.description !== recruiterProfile?.description)
          payload.description = formData.description;
        if (formData.websiteLink !== (recruiterProfile?.website_link || "")) {
          if (formData.websiteLink) {
            payload.website_link = formData.websiteLink;
          } else {
            payload.website_link = undefined;
          }
        }
      } else if (editSection === "tax") {
        if (formData.cinNumber !== (recruiterProfile?.CIN || ""))
          payload.CIN = formData.cinNumber;
      }

      // If no changes, just close edit mode
      if (Object.keys(payload).length === 0) {
        setEditSection(null);
        setSnapshot(null);
        return;
      }

      await updateMutation.mutateAsync({
        userId: user.id,
        data: payload,
      });
      setEditSection(null);
      setSnapshot(null);
    } catch (_error: unknown) {
      // Error toast handled in mutation onError
    }
  };

  const handleCancel = () => {
    if (snapshot) {
      setFormData(snapshot);
    }
    setEditSection(null);
    setSnapshot(null);
  };

  const handleUploadAvatar = async (file: File) => {
    if (!user?.id) return;
    await uploadAvatarMutation.mutateAsync({ userId: user.id, file });
  };

  return {
    recruiterProfile,
    isLoading,
    editSection,
    startEdit,
    formData,
    setFormData,
    handleSave,
    handleCancel,
    isUpdating: updateMutation.isPending,
    handleUploadAvatar,
    isUploadingAvatar: uploadAvatarMutation.isPending,
  };
}
