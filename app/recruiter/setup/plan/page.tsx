"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Crown,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useCheckout } from "@/features/pricing/hooks/useCheckout";
import { usePricing } from "@/hooks/use-pricing";
import { cn } from "@/lib/utils";

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "zap":
      return <Zap className="w-6 h-6" />;
    case "crown":
      return <Crown className="w-6 h-6" />;
    case "shield":
      return <Shield className="w-6 h-6" />;
    default:
      return <Zap className="w-6 h-6" />;
  }
};

const formatPrice = (price: string) =>
  price.trim().startsWith("₹") ? price : `₹${price}`;

export default function RecruiterPlanSetupPage() {
  const router = useRouter();
  const { data: allPlans, isLoading, isError } = usePricing();
  const { user, isAuthenticated } = useAuthContext();
  const checkoutMutation = useCheckout();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Only recruiter plans that are live for purchase.
  const plans = useMemo(() => {
    if (!allPlans) return [];
    return allPlans
      .filter((plan) => plan.type === "recruiter" && plan.status === "Active")
      .map((plan) => ({ ...plan, icon: getIcon(plan.iconType) }));
  }, [allPlans]);

  // Default selection: highlighted plan, otherwise the first one.
  useEffect(() => {
    if (selectedPlan || plans.length === 0) return;
    const highlighted = plans.find((plan) => plan.highlight) ?? plans[0];
    setSelectedPlan(highlighted.id);
  }, [plans, selectedPlan]);

  const handleConfirm = () => {
    const plan = plans.find((p) => p.id === selectedPlan);
    if (!plan) return;

    // Free / non-paid plan: no checkout, straight to the dashboard.
    if (!plan.stripePriceId) {
      router.push("/recruiter/dashboard");
      return;
    }

    if (!isAuthenticated || !user) {
      router.push("/recruiter/login");
      return;
    }

    checkoutMutation.mutate({
      priceId: plan.stripePriceId,
      userId: user.id,
      email: user.email,
      role: "recruiter",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || plans.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-gray-600 font-bold">
          {isError
            ? "Failed to load plans. Please try again."
            : "No recruiter plans are available right now."}
        </p>
        <div className="flex gap-3">
          <Button onClick={() => window.location.reload()}>Retry</Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/recruiter/dashboard")}
          >
            Skip for now
          </Button>
        </div>
      </div>
    );
  }

  const isCheckingOut = checkoutMutation.isPending;

  return (
    <div className="min-h-screen bg-white font-satoshi selection:bg-wise-green/30 text-near-black overflow-x-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-wise-green/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-wise-green/[0.05] rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto min-h-screen flex flex-col px-6 py-12">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-near-black flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-wise-green" />
            </div>
            <span className="text-[18px] font-black tracking-tighter">
              next<span className="text-wise-green italic">Hire</span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-6 py-2 bg-gray-50 rounded-full border border-gray-100">
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
              Step 4 of 4:
            </span>
            <span className="text-[11px] font-black uppercase tracking-widest text-near-black">
              Plan Setup
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto w-full">
          <div className="text-center mb-12 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wise-green/10 border border-wise-green/20 text-wise-green text-[11px] font-black uppercase tracking-[0.2em]"
            >
              <Target className="w-3.5 h-3.5" />
              Finalize Your Workspace
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[48px] md:text-[56px] font-black leading-[1.1] tracking-[-0.03em] text-near-black"
            >
              Choose your <br />
              <span className="text-wise-green italic">Growth Engine</span>
            </motion.h1>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.3 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  "relative group cursor-pointer p-1 rounded-[3.5rem] transition-all duration-500",
                  selectedPlan === plan.id
                    ? "bg-near-black scale-[1.02] shadow-2xl shadow-near-black/20"
                    : "bg-transparent scale-100",
                )}
              >
                <div
                  className={cn(
                    "h-full rounded-[3.25rem] p-10 flex flex-col border transition-all duration-500",
                    selectedPlan === plan.id
                      ? "bg-white border-transparent"
                      : "bg-white border-gray-100 hover:border-gray-200",
                  )}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-wise-green text-dark-green px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-wise-green/20">
                      Recommended
                    </div>
                  )}

                  <div className="mb-8">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-[2rem] flex items-center justify-center mb-6 transition-all duration-500",
                        selectedPlan === plan.id
                          ? "bg-near-black text-white"
                          : "bg-gray-50 text-gray-400 group-hover:scale-110",
                      )}
                    >
                      {plan.icon}
                    </div>
                    <h3 className="text-[24px] font-black text-near-black mb-1 uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-[40px] font-black text-near-black tracking-tight">
                        {formatPrice(plan.price)}
                      </span>
                      <span className="text-gray-400 font-bold text-[15px]">
                        {plan.period ?? "/month"}
                      </span>
                    </div>
                    <p className="text-[14px] text-gray-500 font-medium leading-relaxed italic">
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors",
                            selectedPlan === plan.id
                              ? "bg-wise-green text-dark-green"
                              : "bg-gray-100 text-gray-400",
                          )}
                        >
                          <Check className="w-3 h-3" strokeWidth={5} />
                        </div>
                        <span className="text-[14px] font-bold text-gray-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {selectedPlan === plan.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-4 left-4 right-4 h-1 bg-wise-green rounded-full blur-[2px]"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-wise-green/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-wise-green" />
              </div>
              <div>
                <p className="text-sm font-black text-near-black uppercase tracking-widest">
                  Secure Checkout
                </p>
                <p className="text-xs font-bold text-gray-400 italic leading-none">
                  Pay by card or UPI. Cancel or switch tiers anytime.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                disabled={isCheckingOut}
                className="h-16 px-10 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-gray-50"
              >
                Previous Step
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={isCheckingOut || !selectedPlan}
                className="h-16 px-12 rounded-[2rem] bg-near-black text-white hover:bg-wise-green hover:text-near-black transition-all font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-near-black/20 group disabled:opacity-60"
              >
                {isCheckingOut ? "Redirecting…" : "Confirm & Launch"}
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
