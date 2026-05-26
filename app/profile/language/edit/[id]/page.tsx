"use client";

import { notFound, useRouter } from "next/navigation";
import { use } from "react";
import { FormPageLayout } from "@/components/profile/forms/form-page-layout";
import { LanguageForm } from "@/components/profile/forms/language-form";
import { useProfile } from "@/hooks/use-profile";



export default function EditLanguagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { languages, handleUpdateLanguage } = useProfile();
  const { id } = use(params);
  const { push } = useRouter();

  const lang = languages.find((l) => l.id === id);

  if (!lang) {
    notFound();
  }

  const onSubmit = (formData: FormData) => {
    handleUpdateLanguage(id, formData);
    push("/profile");
  };

  return (
    <FormPageLayout
      title="Edit Language"
      subtitle="Update your communication capabilities."
    >
      <LanguageForm
        key={id}
        initialData={lang}
        onSubmit={onSubmit}
        submitLabel="Update Language"
      />
    </FormPageLayout>
  );
}
