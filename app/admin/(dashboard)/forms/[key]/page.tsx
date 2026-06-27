"use client";

import { useParams } from "next/navigation";
import { FormBuilder } from "@/features/admin-forms/components/FormBuilder";
import { useFormBuilder } from "@/features/admin-forms/hooks/use-form-builder";

export default function FormBuilderPage() {
  const params = useParams();
  const key = params.key as string;
  const { config, isLoading, isError, save, isSaving } = useFormBuilder(key);

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-hairline bg-white">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-hairline border-t-coral" />
      </div>
    );
  }

  if (isError || !config) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-hairline bg-white text-center">
        <p className="text-sm font-semibold text-ink">Form not found</p>
        <p className="mt-1 text-[13px] text-muted-ink">
          This form configuration could not be loaded.
        </p>
      </div>
    );
  }

  return <FormBuilder config={config} onSave={save} isSaving={isSaving} />;
}
