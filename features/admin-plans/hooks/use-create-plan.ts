import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminPlan } from "@/features/admin-plans/services/admin-plans.api";
import type { PlanFormState } from "../types/admin-plans.types";

export function useCreatePlan() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (plan: PlanFormState) => createAdminPlan(plan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-plans"] });
      router.push("/admin/plans");
    },
  });

  const handleSubmit = (data: PlanFormState) => {
    mutation.mutate(data);
  };

  return {
    handleSubmit,
    isPending: mutation.isPending,
    cancel: () => router.push("/admin/plans"),
  };
}
