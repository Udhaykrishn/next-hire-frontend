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
      <div className="min-h-[60vh] flex items-center justify-center font-satoshi">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-100 border-t-wise-green rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-400">Loading plan...</p>
        </div>
      </div>
    );
  }

  if (isError || !plan) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-satoshi text-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm max-w-md mx-auto mt-12">
        <p className="text-red-500 font-bold text-lg">Plan Not Found</p>
        <p className="text-gray-400 text-sm mt-1">
          The requested subscription tier could not be retrieved or does not
          exist.
        </p>
        <button
          type="button"
          onClick={() => router.push("/admin/plans")}
          className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-black transition-colors"
        >
          Back to Plans
        </button>
      </div>
    );
  }

  return (
    <PlanForm
      title="Edit Plan"
      subtitle="Modify the details and pricing of this subscription tier."
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      isPending={isPending}
      cancel={cancel}
    />
  );
}
