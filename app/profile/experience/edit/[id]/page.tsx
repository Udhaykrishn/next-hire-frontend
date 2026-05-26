"use client";

import { notFound, useRouter } from "next/navigation";
import { use } from "react";
import { ExperienceForm } from "@/components/profile/forms/experience-form";
import { FormPageLayout } from "@/components/profile/forms/form-page-layout";
import { useProfile } from "@/hooks/use-profile";



export default function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { experience, handleUpdateExperience } = useProfile();
  const { id } = use(params);
  const { push } = useRouter();

  const exp = experience.find((e) => e.id === id);

  if (!exp) {
    notFound();
  }

  const onSubmit = (formData: FormData, start?: Date, end?: Date) => {
    handleUpdateExperience(id, formData, start, end);
    push("/profile");
  };

  return (
    <FormPageLayout
      title="Edit Experience"
      subtitle="Update your professional journey details."
    >
      <ExperienceForm
        key={id}
        initialData={exp}
        onSubmit={onSubmit}
        submitLabel="Update Experience"
      />
    </FormPageLayout>
  );
}
