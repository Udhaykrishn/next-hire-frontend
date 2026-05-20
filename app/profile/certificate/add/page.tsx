"use client";

import { useRouter } from "next/navigation";
import { CertificateForm } from "@/components/profile/forms/certificate-form";
import { FormPageLayout } from "@/components/profile/forms/form-page-layout";
import { useProfile } from "@/hooks/use-profile";

export default function AddCertificatePage() {
  const { handleAddCertificate } = useProfile();
  const router = useRouter();

  const onSubmit = (formData: FormData, date?: Date) => {
    handleAddCertificate(formData, date);
    router.push("/profile");
  };

  return (
    <FormPageLayout
      title="Add Certificate"
      subtitle="Showcase your certifications to validate your specialized skills."
    >
      <CertificateForm onSubmit={onSubmit} submitLabel="Save Certificate" />
    </FormPageLayout>
  );
}
