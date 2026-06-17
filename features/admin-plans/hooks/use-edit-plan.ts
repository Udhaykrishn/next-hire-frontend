import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  getAdminPlanById,
  updateAdminPlan,
} from "@/features/admin-plans/services/admin-plans.api";
import type { PlanFormState } from "../types/admin-plans.types";

export function useEditPlan(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: plan,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-plan", id],
    queryFn: () => getAdminPlanById(id),
    enabled: !!id,
  });

  const defaultValues: Partial<PlanFormState> | undefined = plan
    ? {
        name: plan.name,
        type: plan.type as "candidate" | "recruiter",
        price: plan.price,
        period: plan.period,
        description: plan.description,
        features: plan.features,
        highlight: plan.highlight,
        cta: plan.cta,
        iconType: plan.iconType,
      }
    : undefined;

  const mutation = useMutation({
    mutationFn: (updated: PlanFormState) => updateAdminPlan(id, updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-plans"] });
      queryClient.invalidateQueries({ queryKey: ["admin-plan", id] });
      router.push("/admin/plans");
    },
  });

  const handleSubmit = (data: PlanFormState) => {
    mutation.mutate(data);
  };

  return {
    plan,
    defaultValues,
    isLoading,
    isError,
    isPending: mutation.isPending,
    handleSubmit,
    cancel: () => router.push("/admin/plans"),
  };
}
