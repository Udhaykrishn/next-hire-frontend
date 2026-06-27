"use client";

import { AnimatePresence } from "framer-motion";
import { CreditCard, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminPageHeader, AdminPrimaryButton } from "@/components/admin/ui";
import { GlobalLoader } from "@/components/shared/global-loader";
import { cn } from "@/lib/utils";
import { usePlansAdmin } from "../hooks/use-plans-admin";
import { PlanCard } from "./PlanCard";

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
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <GlobalLoader fullScreen={false} />
      </div>
    );
  }

  const filteredPlans = plans.filter((plan) => plan.type === activeTab);
  const tabs = [
    { key: "candidate" as const, label: "Candidate plans" },
    { key: "recruiter" as const, label: "Recruiter plans" },
  ];

  return (
    <div className="space-y-6 pb-12">
      <AdminPageHeader
        title="Plans"
        description="Manage candidate and recruiter subscription tiers."
        actions={
          <AdminPrimaryButton
            onClick={() => router.push("/admin/plans/create")}
          >
            <Plus className="h-4 w-4" />
            New plan
          </AdminPrimaryButton>
        }
      />

      <div className="inline-flex items-center gap-1 rounded-lg border border-hairline bg-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "bg-surface-soft text-ink"
                : "text-muted-ink hover:text-ink",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="col-span-full flex flex-col items-center rounded-xl border border-dashed border-hairline bg-white py-16 text-center">
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-muted-soft">
              <CreditCard className="h-5 w-5" />
            </span>
            <p className="text-sm font-semibold text-ink">
              No {activeTab} plans yet
            </p>
            <button
              type="button"
              onClick={() => router.push("/admin/plans/create")}
              className="mt-1 text-[13px] font-medium text-coral transition-colors hover:text-coral-active"
            >
              Create your first plan →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
