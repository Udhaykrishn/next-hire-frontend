"use client";

import { notFound, useRouter } from "next/navigation";
import { use } from "react";
import { EducationForm } from "@/components/profile/forms/education-form";
import { FormPageLayout } from "@/components/profile/forms/form-page-layout";
import { useProfile } from "@/hooks/use-profile";

export default function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { education, handleUpdateEducation } = useProfile();
  const { id } = use(params);
  const { push } = useRouter();

  const edu = education.find((e) => e.id === id);

  if (!edu) {
    notFound();
  }

  const onSubmit = (formData: FormData, start?: Date, end?: Date) => {
    handleUpdateEducation(id, formData, start, end);
    push("/profile");
  };

  return (
    <FormPageLayout
      title="Edit Education"
      subtitle="Update your academic background details."
    >
      <EducationForm
        key={id}
        initialData={edu}
        onSubmit={onSubmit}
        submitLabel="Update Education"
      />
    </FormPageLayout>
  );
}
