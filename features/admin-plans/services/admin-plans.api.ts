import { apiClient } from "@/lib/api-client";
import type { PricingPlan } from "@/types/pricing";

export const getAdminPlans = async (): Promise<PricingPlan[]> => {
  const response = await apiClient.get<PricingPlan[]>("/plans");
  return response.data;
};

export const getAdminPlanById = async (id: string): Promise<PricingPlan> => {
  const response = await apiClient.get<PricingPlan>(`/plans/${id}`);
  return response.data;
};

export const createAdminPlan = async (
  plan: Omit<PricingPlan, "id" | "subscribers" | "status">,
): Promise<PricingPlan> => {
  const response = await apiClient.post<PricingPlan>("/plans", plan);
  return response.data;
};

export const updateAdminPlan = async (
  id: string,
  plan: Partial<Omit<PricingPlan, "id" | "subscribers">>,
): Promise<PricingPlan> => {
  const response = await apiClient.put<PricingPlan>(`/plans/${id}`, plan);
  return response.data;
};

export const deleteAdminPlan = async (id: string): Promise<void> => {
  await apiClient.delete(`/plans/${id}`);
};

export const updateAdminPlanStatus = async (
  id: string,
  status: "Active" | "Archived" | "Inactive",
): Promise<PricingPlan> => {
  const response = await apiClient.put<PricingPlan>(`/plans/${id}`, { status });
  return response.data;
};
