"use client";

import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { usePlansAdmin } from "../hooks/use-plans-admin";
import { PlanCard } from "./PlanCard";
import { GlobalLoader } from "@/components/shared/global-loader";

export function AdminPlansView() {
  const router = useRouter();
  const {
    plans,
    isLoading,
    activeTab,
    setActiveTab,
    handleDelete,
    handleToggleStatus,
  } = usePlansAdmin();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-satoshi">
        <GlobalLoader fullScreen={false} />
      </div>
    );
  }

  const filteredPlans = plans.filter((plan) => plan.type === activeTab);

  return (
    <div className="space-y-8 font-satoshi animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-[800] leading-[40px] text-near-black">
            Plan Ecosystem
          </h1>
          <p className="text-[15px] font-[400] text-gray-500 mt-1">
            Manage your candidate and recruiter subscription tiers.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/admin/plans/create")}
          className="flex items-center gap-2 bg-wise-green text-dark-green font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform active:scale-95 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create New Plan
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-light-surface rounded-full w-max border border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab("candidate")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            activeTab === "candidate"
              ? "bg-white text-near-black shadow-sm"
              : "text-gray-500 hover:text-near-black"
          }`}
        >
          Candidate Plans
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("recruiter")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            activeTab === "recruiter"
              ? "bg-white text-near-black shadow-sm"
              : "text-gray-500 hover:text-near-black"
          }`}
        >
          Recruiter Plans
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPlans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
              onEdit={(id) => router.push(`/admin/plans/${id}/edit`)}
            />
          ))}
        </AnimatePresence>

        {filteredPlans.length === 0 && (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-400 text-[15px]">
              No {activeTab} plans yet.{" "}
              <button
                type="button"
                onClick={() => router.push("/admin/plans/create")}
                className="text-dark-green font-semibold hover:underline"
              >
                Create one →
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
