import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAdminPlans,
  createAdminPlan,
  deleteAdminPlan,
  updateAdminPlanStatus,
} from "../services/admin-plans.api";
import type { PricingPlan } from "@/types/pricing";

export const usePlansAdmin = () => {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<"candidate" | "recruiter">(
    "candidate",
  );

  // New Plan State
  const [newPlan, setNewPlan] = useState<
    Omit<PricingPlan, "id" | "subscribers" | "status">
  >({
    name: "",
    description: "",
    price: "",
    period: "/month",
    type: "candidate",
    iconType: "zap",
    features: ["", ""],
    cta: "Get Started",
    highlight: false,
  });

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["admin-plans"],
    queryFn: () => getAdminPlans(),
  });

  const createMutation = useMutation({
    mutationFn: (plan: Omit<PricingPlan, "id" | "subscribers" | "status">) =>
      createAdminPlan(plan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-plans"] });
      setIsCreating(false);
      setNewPlan({
        name: "",
        description: "",
        price: "",
        period: "/month",
        type: "candidate",
        iconType: "zap",
        features: ["", ""],
        cta: "Get Started",
        highlight: false,
      });
    },
    onError: () => {},
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminPlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-plans"] });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "Active" | "Archived" | "Inactive";
    }) => updateAdminPlanStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-plans"] });
    },
  });

  const addFeature = () => {
    setNewPlan((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...newPlan.features];
    updatedFeatures[index] = value;
    setNewPlan((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const removeFeature = (index: number) => {
    setNewPlan((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    createMutation.mutate(newPlan);
  };

  return {
    plans,
    isLoading,
    isCreating,
    setIsCreating,
    isDeploying: createMutation.isPending,
    activeTab,
    setActiveTab,
    newPlan,
    setNewPlan,
    addFeature,
    updateFeature,
    removeFeature,
    handleSave,
    handleDelete: (id: string) => deleteMutation.mutate(id),
    handleToggleStatus: (
      id: string,
      currentStatus: "Active" | "Archived" | "Draft" | "Inactive",
    ) =>
      toggleStatusMutation.mutate({
        id,
        status: currentStatus === "Active" ? "Inactive" : "Active",
      }),
  };
};
