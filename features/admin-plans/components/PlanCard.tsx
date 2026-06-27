import { motion } from "framer-motion";
import { Check, Crown, Shield, Trash2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlanCardProps } from "../types/admin-plans.types";

export function PlanCard({
  plan,
  index,
  onToggleStatus,
  onDelete,
  onEdit,
}: PlanCardProps) {
  const isActive = plan.status === "Active";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className={cn(
        "group relative flex flex-col rounded-xl border bg-white p-5 transition-colors",
        plan.highlight
          ? "border-coral/40"
          : "border-hairline hover:border-hairline-soft",
      )}
    >
      {plan.highlight && (
        <span className="absolute -top-2.5 left-5 rounded-md bg-coral px-2 py-0.5 text-[11px] font-semibold text-white">
          Recommended
        </span>
      )}

      <div className="mb-4 flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-soft text-muted-ink">
          {plan.iconType === "crown" ? (
            <Crown className="h-5 w-5" />
          ) : plan.iconType === "shield" ? (
            <Shield className="h-5 w-5" />
          ) : (
            <Zap className="h-5 w-5" />
          )}
        </span>

        <div className="flex flex-col items-end gap-1.5">
          <button
            type="button"
            onClick={() => onToggleStatus(plan.id, plan.status)}
            className={cn(
              "rounded-md px-2 py-0.5 text-xs font-medium transition-colors",
              isActive
                ? "bg-success/10 text-[#2f6e44] hover:bg-success/15"
                : "bg-surface-soft text-muted-ink hover:bg-surface-cream-strong",
            )}
          >
            {plan.status}
          </button>
          <p className="text-xs text-muted-soft tabular-nums">
            {plan.subscribers} subscribers
          </p>
        </div>
      </div>

      <div className="mb-5 flex-grow">
        <h3 className="text-base font-semibold text-ink">{plan.name}</h3>
        <p className="mt-1 min-h-[40px] text-[13px] leading-relaxed text-muted-ink">
          {plan.description}
        </p>

        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-[28px] font-semibold tracking-tight text-ink tabular-nums">
            {plan.price === "0" ? "Free" : `₹${plan.price}`}
          </span>
          {plan.price !== "0" && (
            <span className="text-[13px] text-muted-soft">{plan.period}</span>
          )}
        </div>
      </div>

      <div className="mb-6 space-y-2.5">
        {plan.features.slice(0, 4).map((feature, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: simple string array without unique IDs
          <div key={`${feature}-${i}`} className="flex items-start gap-2.5">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-coral"
              strokeWidth={2.5}
            />
            <span className="text-[13px] text-body">{feature}</span>
          </div>
        ))}
        {plan.features.length > 4 && (
          <p className="pl-6 text-xs text-muted-soft">
            +{plan.features.length - 4} more features
          </p>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-hairline-soft pt-4">
        <button
          type="button"
          onClick={() => onDelete(plan.id)}
          className="rounded-lg p-2 text-muted-ink transition-colors hover:bg-destructive/10 hover:text-destructive"
          title="Delete plan"
        >
          <Trash2 className="h-[18px] w-[18px]" />
        </button>

        <button
          type="button"
          onClick={() => onEdit(plan.id)}
          className={cn(
            "rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors",
            plan.highlight
              ? "bg-coral text-white hover:bg-coral-active"
              : "border border-hairline text-ink hover:bg-surface-soft",
          )}
        >
          Edit plan
        </button>
      </div>
    </motion.div>
  );
}
