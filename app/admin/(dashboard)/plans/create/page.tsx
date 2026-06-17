"use client";

import { PlanForm } from "@/features/admin-plans/components/PlanForm";
import { useCreatePlan } from "@/features/admin-plans/hooks/use-create-plan";

export default function CreatePlanPage() {
  const { handleSubmit, isPending, cancel } = useCreatePlan();

  return (
    <PlanForm
      title="Create Plan"
      subtitle="Configure a new subscription tier for your platform."
      onSubmit={handleSubmit}
      isPending={isPending}
      cancel={cancel}
    />
  );
}
