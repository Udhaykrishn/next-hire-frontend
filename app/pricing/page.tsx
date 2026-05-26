"use client";

import { Check, Crown, Shield, Zap } from "lucide-react";
import { LazyMotion, m, domAnimation } from "motion/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";
import { usePricing } from "@/hooks/use-pricing";
import { cn } from "@/lib/utils";



export function PricingContent({
  hideNavbar = false,
}: {
  hideNavbar?: boolean;
}) {
  const { data: allPlans, isLoading, isError } = usePricing();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const tabParam = searchParams.get("tab");
  
  const isRecruiterPath = pathname?.startsWith("/recruiter");
  const isRecruiterRole = isRecruiterPath || roleParam === "recruiter" || tabParam === "recruiter";
  
  const initialType = isRecruiterRole ? "recruiter" : (roleParam === "candidate" ? "candidate" : "candidate");
  const initialForced = isRecruiterPath || roleParam === "recruiter" || roleParam === "candidate";

  const [type, setType] = useState<"candidate" | "recruiter">(initialType);
  const isRoleForced = !!initialForced; // If it's forced by URL, it shouldn't change, so no need for state

  const filteredPlans = useMemo(() => {
    if (!allPlans) return [];

    const getIcon = (iconType: string) => {
      switch (iconType) {
        case "zap":
          return <Zap className="size-6 text-gray-400" />;
        case "crown":
          return <Crown className="size-6 text-wise-green" />;
        case "shield":
          return <Shield className="size-6 text-gray-400" />;
        default:
          return <Zap className="size-6 text-gray-400" />;
      }
    };

    return allPlans.reduce<Array<(typeof allPlans)[number] & { icon: React.ReactNode }>>((acc, plan) => {
      if (plan.type === type) {
        acc.push({ ...plan, icon: getIcon(plan.iconType) });
      }
      return acc;
    }, []);
  }, [allPlans, type]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="size-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-bold">Failed to load pricing plans.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      {!hideNavbar && <LandingNavbar />}

      <main className={cn("flex-1 pb-20", !hideNavbar ? "pt-32" : "pt-10")}>
        <section className="px-4 relative mb-12 text-center">
          <div className="absolute top-[-20%] right-[-10%] size-[500px] bg-wise-green/10 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none" />

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[48px] font-black text-gray-900 tracking-tight leading-[56px] mb-6"
          >
            Invest in your <br />
            <span className="text-wise-green">
              {type === "candidate" ? "Future Career" : "Hiring Success"}
            </span>
          </m.h1>

          {!isRoleForced && (
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 p-1 rounded-2xl flex items-center gap-1 border border-gray-200">
                <button
                  type="button"
                  onClick={() => setType("candidate")}
                  className={cn(
                    "px-6 py-2 rounded-xl text-[14px] font-black transition-all",
                    type === "candidate"
                      ? "bg-white text-near-black shadow-sm"
                      : "text-gray-500 hover:text-gray-700",
                  )}
                >
                  For Job Seekers
                </button>
                <button
                  type="button"
                  onClick={() => setType("recruiter")}
                  className={cn(
                    "px-6 py-2 rounded-xl text-[14px] font-black transition-all",
                    type === "recruiter"
                      ? "bg-white text-near-black shadow-sm"
                      : "text-gray-500 hover:text-gray-700",
                  )}
                >
                  For Recruiters
                </button>
              </div>
            </div>
          )}

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[15px] text-gray-600 font-medium leading-[19.2px] max-w-2xl mx-auto"
          >
            {type === "candidate"
              ? "Choose the plan that fits your current career goals. Our professional insights are designed to help you land your dream job faster."
              : "Scale your recruitment with precision tools. From small teams to large enterprises, find the perfect plan for your hiring needs."}
          </m.p>
        </section>

        <section className="px-4 max-w-6xl mx-auto mb-32">
          <div className="grid md:grid-cols-3 gap-8">
            {filteredPlans.map((plan, idx) => (
              <m.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className={`relative bg-white p-10 rounded-[3rem] border transition-all duration-300 flex flex-col ${
                  plan.highlight
                    ? "border-wise-green shadow-2xl shadow-wise-green/10 scale-105 z-10"
                    : "border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-wise-green text-dark-green px-4 py-1 rounded-full text-[12px] font-black uppercase tracking-widest">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <div
                    className={`size-14 rounded-2xl flex items-center justify-center mb-6 ${plan.highlight ? "bg-wise-green/10" : "bg-gray-50"}`}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-[20px] font-black text-gray-900 mb-2 leading-[23px] uppercase tracking-wider">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[40px] font-black text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400 font-bold text-[15px]">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] text-gray-500 font-medium mt-4 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="gap-y-4 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div
                        className={`size-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? "bg-wise-green text-dark-green" : "bg-gray-100 text-gray-400"}`}
                      >
                        <Check className="size-3" strokeWidth={4} />
                      </div>
                      <span className="text-[14px] font-bold text-gray-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full h-14 rounded-2xl text-[15px] font-black transition-all ${
                    plan.highlight
                      ? "bg-wise-green text-dark-green hover:bg-wise-green/90 shadow-lg shadow-wise-green/20"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {plan.cta}
                </Button>
              </m.div>
            ))}
          </div>
        </section>

        {/* Comparison or FAQ hint */}
        <section className="px-4 text-center">
          <p className="text-[14px] text-gray-500 font-medium">
            Need a custom plan for your organization?{" "}
            <button
              type="button"
              className="text-wise-green font-black hover:underline ml-1"
            >
              Contact our team
            </button>
          </p>
        </section>
      </main>

      {!hideNavbar && <LandingFooter />}
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <div className="size-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}
