import { motion } from "framer-motion";
import { Check, Trash2, Zap, Crown, Shield } from "lucide-react";
import type { PlanCardProps } from "../types/admin-plans.types";

export function PlanCard({
  plan,
  index,
  onToggleStatus,
  onDelete,
  onEdit,
}: PlanCardProps) {
  const isHighTier = plan.iconType === "crown" || plan.iconType === "shield";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative group bg-white border ${
        plan.highlight ? "border-wise-green" : "border-gray-200"
      } rounded-[16px] p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col`}
    >
      {/* Header row */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-3 rounded-full ${isHighTier ? "bg-dark-green text-wise-green" : "bg-light-mint text-dark-green"}`}
        >
          {plan.iconType === "crown" ? (
            <Crown className="w-6 h-6" />
          ) : plan.iconType === "shield" ? (
            <Shield className="w-6 h-6" />
          ) : (
            <Zap className="w-6 h-6" />
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => onToggleStatus(plan.id, plan.status)}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
              plan.status === "Active"
                ? "bg-positive-green/10 text-positive-green hover:bg-positive-green/20"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {plan.status}
          </button>
          <p className="text-[12px] text-gray-400 font-medium">
            {plan.subscribers} Subs
          </p>
        </div>
      </div>

      <div className="mb-6 flex-grow">
        <h3 className="text-[20px] font-[900] text-near-black mb-1">
          {plan.name}
        </h3>
        <p className="text-[14px] font-[500] text-gray-500 leading-[20px] min-h-[40px]">
          {plan.description}
        </p>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-[32px] font-[800] text-near-black">
            {plan.price === "0" ? "Free" : `₹${plan.price}`}
          </span>
          {plan.price !== "0" && (
            <span className="text-[14px] font-[500] text-gray-500">
              {plan.period}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {plan.features.slice(0, 4).map((feature, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Simple string array without unique IDs
          <div key={`${feature}-${i}`} className="flex items-start gap-3">
            <div className="mt-1 bg-light-mint p-1 rounded-full text-dark-green flex-shrink-0">
              <Check className="w-3 h-3" strokeWidth={3} />
            </div>
            <span className="text-[14px] font-[500] text-near-black/80">
              {feature}
            </span>
          </div>
        ))}
        {plan.features.length > 4 && (
          <p className="text-[12px] font-[500] text-gray-400 pl-8">
            + {plan.features.length - 4} more features
          </p>
        )}
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onDelete(plan.id)}
          className="p-2 text-danger-red/70 hover:bg-danger-red/10 hover:text-danger-red rounded-full transition-colors"
          title="Delete Plan"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => onEdit(plan.id)}
          className={`px-6 py-2 rounded-full text-[14px] font-[600] transition-colors ${
            plan.highlight
              ? "bg-wise-green text-dark-green hover:bg-pastel-green"
              : "bg-gray-100 text-near-black hover:bg-gray-200"
          }`}
        >
          Edit Plan
        </button>
      </div>
    </motion.div>
  );
}
