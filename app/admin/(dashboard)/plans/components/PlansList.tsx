import { motion } from "framer-motion";
import {
  Crown,
  Edit2,
  Layout,
  Shield,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/types/pricing";

interface PlansListProps {
  plans: PricingPlan[];
  activeTab: "candidate" | "recruiter";
  setActiveTab: (tab: "candidate" | "recruiter") => void;
  handleToggleStatus: (
    id: string,
    currentStatus: "Active" | "Archived" | "Draft" | "Inactive",
  ) => void;
  handleDelete: (id: string) => void;
}

export function PlansList({
  plans,
  activeTab,
  setActiveTab,
  handleToggleStatus,
  handleDelete,
}: PlansListProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "zap":
        return <Zap className="w-5 h-5" />;
      case "crown":
        return <Crown className="w-5 h-5" />;
      case "shield":
        return <Shield className="w-5 h-5" />;
      default:
        return <Layout className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      key="list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit">
        {["candidate", "recruiter"].map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab as "candidate" | "recruiter")}
            className={cn(
              "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === tab
                ? "bg-white text-near-black shadow-lg"
                : "text-gray-400 hover:text-near-black",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                  Tier / Signature
                </th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                  Price / Cycle
                </th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                  Scale
                </th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                  Status
                </th>
                <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-near-black/40">
                  Strategic Tools
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {plans
                .filter((p) => p.type.toLowerCase() === activeTab)
                .map((plan) => (
                  <tr
                    key={plan.id}
                    className="group hover:bg-gray-50/30 transition-all"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                            plan.highlight
                              ? "bg-near-black text-wise-green"
                              : "bg-gray-100 text-gray-400",
                          )}
                        >
                          {getIcon(plan.iconType)}
                        </div>
                        <div>
                          <p className="text-base font-black text-near-black uppercase tracking-tight">
                            {plan.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Sparkles className="w-3 h-3 text-wise-green" />
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                              {plan.features.length} Drivers
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="text-base font-black text-near-black">
                          ₹{plan.price}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {plan.period}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-base font-black text-near-black">
                          {plan.subscribers?.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">
                          Active
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(plan.id, plan.status)}
                        className={cn(
                          "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                          plan.status === "Active"
                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200",
                        )}
                      >
                        {plan.status}
                      </button>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all">
                        <button
                          type="button"
                          aria-label={`Edit ${plan.name} plan`}
                          title={`Edit ${plan.name} plan`}
                          className="p-3 bg-gray-50 text-gray-400 hover:text-near-black hover:bg-white border border-transparent hover:border-gray-100 focus-visible:ring-2 focus-visible:ring-wise-green rounded-xl transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(plan.id)}
                          aria-label={`Delete ${plan.name} plan`}
                          title={`Delete ${plan.name} plan`}
                          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 focus-visible:ring-2 focus-visible:ring-red-500 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
