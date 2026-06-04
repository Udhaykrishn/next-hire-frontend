"use client";

import { AnimatePresence } from "framer-motion";
import { usePlansAdmin } from "@/hooks/use-plans-admin";
import { PlanForm } from "./components/PlanForm";
import { PlanHeader } from "./components/PlanHeader";
import { PlansList } from "./components/PlansList";

export default function PlansAdmin() {
  const {
    plans,
    isLoading,
    isCreating,
    setIsCreating,
    isDeploying,
    activeTab,
    setActiveTab,
    newPlan,
    setNewPlan,
    addFeature,
    updateFeature,
    removeFeature,
    handleSave,
    handleDelete,
    handleToggleStatus,
  } = usePlansAdmin();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">
          Synchronizing Ecosystem...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <PlanHeader isCreating={isCreating} setIsCreating={setIsCreating} />

      <AnimatePresence mode="wait">
        {isCreating ? (
          <PlanForm
            newPlan={newPlan}
            setNewPlan={setNewPlan}
            addFeature={addFeature}
            updateFeature={updateFeature}
            removeFeature={removeFeature}
            setIsCreating={setIsCreating}
            handleSave={handleSave}
            isDeploying={isDeploying}
          />
        ) : (
          <PlansList
            plans={plans}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleToggleStatus={handleToggleStatus}
            handleDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
