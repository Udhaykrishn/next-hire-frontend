"use client";

import { useRouter } from "next/navigation";
import { FormPageLayout } from "@/components/profile/forms/form-page-layout";
import { LanguageForm } from "@/components/profile/forms/language-form";
import { useProfile } from "@/hooks/use-profile";

export default function AddLanguagePage() {
  const { handleAddLanguage } = useProfile();
  const router = useRouter();

  const onSubmit = (formData: FormData) => {
    handleAddLanguage(formData);
    router.push("/profile");
  };

  return (
    <FormPageLayout
      title="Add Language"
      subtitle="Adding languages helps companies understand your communication capabilities."
    >
      <LanguageForm onSubmit={onSubmit} submitLabel="Save Language" />
    </FormPageLayout>
  );
}
