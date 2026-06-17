import type { PricingPlan } from "@/types/pricing";
import { apiClient } from "@/lib/api-client";

export const pricingService = {
  getPlans: async (): Promise<PricingPlan[]> => {
    const response = await apiClient.get<PricingPlan[]>("/plans");
    return response.data;
  },

  createPlan: async (
    plan: Omit<PricingPlan, "id" | "subscribers" | "status">,
  ): Promise<PricingPlan> => {
    const response = await apiClient.post<PricingPlan>("/admin/plans", plan);
    return response.data;
  },

  updatePlan: async (
    id: string,
    plan: Partial<PricingPlan>,
  ): Promise<PricingPlan> => {
    const response = await apiClient.put<PricingPlan>(
      `/admin/plans/${id}`,
      plan,
    );
    return response.data;
  },

  deletePlan: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/plans/${id}`);
  },
};
