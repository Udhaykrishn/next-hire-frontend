import { useState, useEffect } from "react";
import { useAuthContext } from "@/features/auth/context/auth-context";
import {
  useRecruiterProfileQuery,
  useUpdateRecruiterProfileMutation,
} from "./use-recruiter-query";
import { toast } from "sonner";

export interface RecruiterFormValues {
  name: string;
  email: string;
  phone: string;
  cinNumber: string;
}

export function useRecruiterProfile() {
  const { user } = useAuthContext();
  const { data: profileResponse, isLoading } = useRecruiterProfileQuery();
  const updateMutation = useUpdateRecruiterProfileMutation();

  const recruiterProfile = profileResponse?.success && profileResponse.data ? profileResponse.data : null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<RecruiterFormValues>({
    name: "",
    email: "",
    phone: "",
    cinNumber: "",
  });

  useEffect(() => {
    if (!isEditing && recruiterProfile) {
      setFormData({
        name: recruiterProfile.name || "",
        email: recruiterProfile.email || "",
        phone: recruiterProfile.phone || "",
        cinNumber: recruiterProfile.CIN || "",
      });
    }
  }, [recruiterProfile, isEditing]);

  const handleSave = async () => {
    if (!user?.id) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      await updateMutation.mutateAsync({
        userId: user.id,
        data: {
          name: formData.name,
          phone: formData.phone,
          CIN: formData.cinNumber,
        },
      });
      setIsEditing(false);
    } catch (_error: unknown) {
      // Error toast is already handled in mutation onError
    }
  };

  const handleCancel = () => {
    if (recruiterProfile) {
      setFormData({
        name: recruiterProfile.name || "",
        email: recruiterProfile.email || "",
        phone: recruiterProfile.phone || "",
        cinNumber: recruiterProfile.CIN || "",
      });
    }
    setIsEditing(false);
  };

  return {
    recruiterProfile,
    isLoading,
    isEditing,
    setIsEditing,
    formData,
    setFormData,
    handleSave,
    handleCancel,
    isUpdating: updateMutation.isPending,
  };
}
