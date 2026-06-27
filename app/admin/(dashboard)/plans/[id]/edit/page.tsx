"use client";

import { useParams, useRouter } from "next/navigation";
import { PlanForm } from "@/features/admin-plans/components/PlanForm";
import { useEditPlan } from "@/features/admin-plans/hooks/use-edit-plan";

export default function EditPlanPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const {
    plan,
    defaultValues,
    isLoading,
    isError,
    isPending,
    handleSubmit,
    cancel,
  } = useEditPlan(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center font-satoshi">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-coral" />
          <p className="text-[13px] font-medium text-muted-soft">
            Loading plan
          </p>
        </div>
      </div>
    );
  }

  if (isError || !plan) {
    return (
      <div className="mx-auto mt-12 flex min-h-[40vh] max-w-md flex-col items-center justify-center rounded-xl border border-hairline bg-white p-8 text-center font-satoshi">
        <p className="text-base font-semibold text-ink">Plan not found</p>
        <p className="mt-1 text-sm text-muted-ink">
          The requested subscription tier could not be retrieved or does not
          exist.
        </p>
        <button
          type="button"
          onClick={() => router.push("/admin/plans")}
          className="mt-5 inline-flex items-center rounded-lg bg-coral px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-active active:translate-y-px"
        >
          Back to plans
        </button>
      </div>
    );
  }

  return (
    <PlanForm
      title="Edit plan"
      subtitle="Modify the details and pricing of this subscription tier."
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isPending={isPending}
      cancel={cancel}
    />
  );
}
