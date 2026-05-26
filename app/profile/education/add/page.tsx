"use client";

import { useRouter } from "next/navigation";
import { EducationForm } from "@/components/profile/forms/education-form";
import { FormPageLayout } from "@/components/profile/forms/form-page-layout";
import { useProfile } from "@/hooks/use-profile";

export default function AddEducationPage() {
  const { handleAddEducation } = useProfile();
  const { push } = useRouter();

  const onSubmit = (formData: FormData, start?: Date, end?: Date) => {
    handleAddEducation(formData, start, end);
    push("/profile");
  };

  return (
    <FormPageLayout
      title="Add Education"
      subtitle="Your academic background helps us understand your foundational knowledge."
    >
      <EducationForm onSubmit={onSubmit} submitLabel="Save Education" />
    </FormPageLayout>
  );
}
