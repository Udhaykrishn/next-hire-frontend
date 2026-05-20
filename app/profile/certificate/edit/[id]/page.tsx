"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { CertificateForm } from "@/components/profile/forms/certificate-form";
import { FormPageLayout } from "@/components/profile/forms/form-page-layout";
import { useProfile } from "@/hooks/use-profile";

export default function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { certificates, handleUpdateCertificate } = useProfile();
  const { id } = use(params);
  const router = useRouter();

  const cert = certificates.find((c) => c.id === id);

  if (!cert) {
    return <div>Certificate not found</div>;
  }

  const onSubmit = (formData: FormData, date?: Date) => {
    handleUpdateCertificate(id, formData, date);
    router.push("/profile");
  };

  return (
    <FormPageLayout
      title="Edit Certificate"
      subtitle="Update your certification details."
    >
      <CertificateForm
        key={id}
        initialData={cert}
        onSubmit={onSubmit}
        submitLabel="Update Certificate"
      />
    </FormPageLayout>
  );
}
