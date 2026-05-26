"use client";

import { useRouter } from "next/navigation";
import { ExperienceForm } from "@/components/profile/forms/experience-form";
import { FormPageLayout } from "@/components/profile/forms/form-page-layout";
import { useProfile } from "@/hooks/use-profile";

export default function AddExperiencePage() {
  const { handleAddExperience } = useProfile();
  const router = useRouter();

  const onSubmit = (formData: FormData, start?: Date, end?: Date) => {
    handleAddExperience(formData, start, end);
    router.push("/profile");
  };

  return (
    <FormPageLayout
      title="Add Experience"
      subtitle="Share your professional journey to help recruiters see your growth and expertise."
    >
      <ExperienceForm onSubmit={onSubmit} submitLabel="Save Experience" />
    </FormPageLayout>
  );
}
