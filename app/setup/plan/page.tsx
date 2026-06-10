"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserCheck,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Standard",
    price: "₹0",
    period: "/mo",
    description: "Build your presence and start your career journey for free.",
    icon: <UserCheck className="w-6 h-6" />,
    features: [
      "Public Profile",
      "5 Job Applications/mo",
      "Basic Skill Tags",
      "System Job Matching",
    ],
    color: "bg-gray-50",
    textColor: "text-gray-900",
    iconColor: "text-gray-400",
  },
  {
    id: "pro",
    name: "Career Pro",
    price: "₹499",
    period: "/mo",
    description: "Get noticed faster with AI tools and unlimited job access.",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Unlimited Applications",
      "AI Resume Optimizer",
      "Profile Boost (2x)",
      "Direct DM to Recruiters",
      "Interview Simulations",
    ],
    color: "bg-wise-green",
    textColor: "text-near-black",
    iconColor: "text-dark-green",
    popular: true,
  },
  {
    id: "elite",
    name: "Elite Talent",
    price: "₹1,299",
    period: "/mo",
    description: "Our highest level of support for serious career transitions.",
    icon: <Trophy className="w-6 h-6" />,
    features: [
      "Personal Career Coach",
      "Elite Badge Profile",
      "Profile Boost (5x)",
      "Exclusive Expert Events",
      "Priority Job Alerts",
    ],
    color: "bg-near-black",
    textColor: "text-white",
    iconColor: "text-wise-green",
  },
];

export default function CandidatePlanSetupPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <div className="min-h-screen bg-white font-satoshi selection:bg-wise-green/30 text-near-black overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-wise-green/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-near-black/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto min-h-screen flex flex-col px-6 py-12">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-wise-green flex items-center justify-center shadow-lg shadow-wise-green/20">
              <Rocket className="w-6 h-6 text-dark-green" />
            </div>
            <span className="text-[18px] font-black tracking-tighter">
              next<span className="text-wise-green italic">Hire</span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-6 py-2 bg-gray-50 rounded-full border border-gray-100">
            <span className="text-[11px] font-black uppercase tracking-widest text-near-black">
              Final Step: Select Your Tier
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-near-black text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-wise-green" />
            Boost Your Career
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[40px] md:text-[56px] font-black leading-[1.05] tracking-tight text-near-black mb-4"
          >
            Accelerate your <br />
            <span className="text-wise-green italic">Professional Journey</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-medium text-[16px] leading-relaxed"
          >
            Unlock powerful AI tools and visibility boosts designed to help you
            land your dream role twice as fast.
          </motion.p>
        </div>

        {/* Pricing Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mb-16">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx + 0.3 }}
              onClick={() => setSelectedPlan(plan.id)}
              className={cn(
                "relative group cursor-pointer p-0.5 rounded-[3.5rem] transition-all duration-500",
                selectedPlan === plan.id
                  ? "bg-gradient-to-br from-wise-green to-near-black shadow-2xl shadow-wise-green/10"
                  : "bg-transparent",
              )}
            >
              <div
                className={cn(
                  "h-full rounded-[3.4rem] p-10 flex flex-col transition-all duration-500 relative overflow-hidden",
                  selectedPlan === plan.id
                    ? "bg-white"
                    : "bg-white border border-gray-100 hover:border-gray-200 shadow-sm",
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-12 -translate-y-1/2 bg-near-black text-wise-green px-4 py-2 rounded-b-2xl text-[9px] font-black uppercase tracking-[0.2em] z-10">
                    Most Selected
                  </div>
                )}

                <div className="mb-8">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-[2rem] flex items-center justify-center mb-8 transition-all duration-500",
                      selectedPlan === plan.id
                        ? "bg-wise-green text-near-black scale-110 rotate-6"
                        : "bg-gray-50 text-gray-400 group-hover:scale-105",
                    )}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-[22px] font-black text-near-black mb-1 uppercase tracking-tight leading-none">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-[44px] font-black text-near-black tracking-tighter">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 font-bold text-[14px] uppercase tracking-widest">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-[14px] text-gray-400 font-bold leading-relaxed pr-4">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                          selectedPlan === plan.id
                            ? "bg-near-black text-wise-green"
                            : "bg-gray-50 text-gray-300",
                        )}
                      >
                        <Check className="w-3 h-3" strokeWidth={5} />
                      </div>
                      <span
                        className={cn(
                          "text-[14px] font-black transition-colors",
                          selectedPlan === plan.id
                            ? "text-near-black"
                            : "text-gray-400",
                        )}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className={cn(
                    "h-1.5 w-12 rounded-full mb-2 transition-all duration-500",
                    selectedPlan === plan.id
                      ? "bg-wise-green w-full"
                      : "bg-gray-100",
                  )}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-gray-100">
          <div className="flex items-center gap-4 group cursor-help">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-near-black transition-all">
              <ShieldCheck className="w-6 h-6 text-gray-300 group-hover:text-wise-green" />
            </div>
            <div>
              <p className="text-sm font-black text-near-black uppercase tracking-widest">
                Premium Guarantee
              </p>
              <p className="text-xs font-bold text-gray-400 italic">
                No hidden fees. Satisfaction prioritized.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="h-16 px-10 rounded-3xl font-black text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-near-black"
            >
              Skip for now
            </Button>
            <Button
              onClick={() => router.push("/profile")}
              className="h-16 px-12 rounded-3xl bg-near-black text-white hover:bg-wise-green hover:text-near-black transition-all font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-near-black/20 group"
            >
              Complete Setup
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
