"use client";

import { m } from "framer-motion";
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
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Starter",
    price: "₹0",
    period: "Free Forever",
    description:
      "Perfect for exploring the platform and making your first few hires.",
    icon: <Shield className="size-6" />,
    features: [
      "2 Active Job Posts",
      "Standard AI Matching",
      "Basic Applicant Tracking",
      "Email Support",
    ],
    color: "bg-gray-50",
    textColor: "text-gray-900",
    iconColor: "text-gray-400",
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹1,499",
    period: "/month",
    description:
      "Ideal for growing teams needing advanced AI tools and more visibility.",
    icon: <Zap className="size-6" />,
    features: [
      "10 Active Job Posts",
      "Premium AI Matching",
      "Featured Job Listings",
      "Priority Support",
      "Analytics Dashboard",
    ],
    color: "bg-wise-green",
    textColor: "text-near-black",
    iconColor: "text-dark-green",
    popular: true,
  },
  {
    id: "pro",
    name: "Elite",
    price: "₹4,999",
    period: "/month",
    description:
      "Designed for high-volume hiring with dedicated support and full access.",
    icon: <Crown className="size-6" />,
    features: [
      "Unlimited Job Posts",
      "Custom Branding",
      "Dedicated Account Manager",
      "API Access",
      "Bulk Import/Export",
    ],
    color: "bg-near-black",
    textColor: "text-white",
    iconColor: "text-wise-green",
  },
];

export default function RecruiterPlanSetupPage() {
  const { push, back } = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <div className="min-h-screen bg-white font-satoshi selection:bg-wise-green/30 text-near-black overflow-x-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] size-[50%] bg-wise-green/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] size-[50%] bg-wise-green/[0.05] rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto min-h-screen flex flex-col px-6 py-12">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-near-black flex items-center justify-center">
              <Sparkles className="size-6 text-wise-green" />
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
          <div className="text-center mb-12 gap-y-4">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wise-green/10 border border-wise-green/20 text-wise-green text-[11px] font-black uppercase tracking-[0.2em]"
            >
              <Target className="size-3.5" />
              Finalize Your Workspace
            </m.div>
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[48px] md:text-[56px] font-black leading-[1.1] tracking-[-0.03em] text-near-black"
            >
              Choose your <br />
              <span className="text-wise-green italic">Growth Engine</span>
            </m.h1>

            {/* Billing Toggle */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <span
                className={cn(
                  "text-sm font-black transition-colors",
                  billingCycle === "monthly"
                    ? "text-near-black"
                    : "text-gray-300",
                )}
              >
                Monthly
              </span>
              <button
                aria-label="Control"
                type="button"
                onClick={() =>
                  setBillingCycle((prev) =>
                    prev === "monthly" ? "yearly" : "monthly",
                  )
                }
                className="w-14 h-7 bg-gray-100 rounded-full p-1 relative flex items-center transition-all border border-gray-200"
              >
                <m.div
                  className="size-5 bg-near-black rounded-full"
                  animate={{ x: billingCycle === "monthly" ? 0 : 28 }}
                />
              </button>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-sm font-black transition-colors",
                    billingCycle === "yearly"
                      ? "text-near-black"
                      : "text-gray-300",
                  )}
                >
                  Yearly
                </span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-black uppercase rounded">
                  Save 20%
                </span>
              </div>
            </m.div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
            {plans.map((plan, idx) => (
              <m.div
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
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-wise-green text-dark-green px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-wise-green/20">
                      Recommended
                    </div>
                  )}

                  <div className="mb-8">
                    <div
                      className={cn(
                        "size-16 rounded-[2rem] flex items-center justify-center mb-6 transition-all duration-500",
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
                        {plan.price}
                      </span>
                      <span className="text-gray-400 font-bold text-[15px]">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-[14px] text-gray-500 font-medium leading-relaxed italic">
                      {plan.description}
                    </p>
                  </div>

                  <div className="gap-y-4 mb-10 flex-1">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <div
                          className={cn(
                            "size-5 rounded-full flex items-center justify-center shrink-0 transition-colors",
                            selectedPlan === plan.id
                              ? "bg-wise-green text-dark-green"
                              : "bg-gray-100 text-gray-400",
                          )}
                        >
                          <Check className="size-3" strokeWidth={5} />
                        </div>
                        <span className="text-[14px] font-bold text-gray-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {selectedPlan === plan.id && (
                    <m.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-4 left-4 right-4 h-1 bg-wise-green rounded-full blur-[2px]"
                    />
                  )}
                </div>
              </m.div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-wise-green/10 flex items-center justify-center">
                <ShieldCheck className="size-6 text-wise-green" />
              </div>
              <div>
                <p className="text-sm font-black text-near-black uppercase tracking-widest">
                  Secure Checkout
                </p>
                <p className="text-xs font-bold text-gray-400 italic leading-none">
                  Cancel or switch tiers anytime.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="ghost"
                onClick={() => back()}
                className="h-16 px-10 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-gray-50"
              >
                Previous Step
              </Button>
              <Button
                onClick={() => push("/recruiter/dashboard")}
                className="h-16 px-12 rounded-[2rem] bg-near-black text-white hover:bg-wise-green hover:text-near-black transition-all font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-near-black/20 group"
              >
                Confirm & Launch
                <ArrowRight className="size-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
