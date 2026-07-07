"use client";

import {
  ChevronLeft,
  CreditCard,
  CheckCircle2,
  Zap,
  History,
  Download,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { format } from "date-fns";
import { PricingContent } from "@/app/pricing/page";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { useRecruiterProfile } from "@/features/recruiter/hooks/use-recruiter-profile";
import { useRecruiterSubscriptionHistoryQuery } from "@/features/recruiter/hooks/use-recruiter-query";

export default function RecruiterPlanPage() {
  const router = useRouter();
  const { recruiterProfile, isLoading } = useRecruiterProfile();
  const { data: subscriptionHistory, isLoading: isLoadingHistory } =
    useRecruiterSubscriptionHistoryQuery();

  const subscription = recruiterProfile?.subscription;
  const isSubscribed = subscription?.is_subscribed;
  const currentPlanRaw = subscription?.current_plan || "free";
  const planName =
    currentPlanRaw.charAt(0).toUpperCase() + currentPlanRaw.slice(1);

  // Mock toggle for showing pricing plans
  const [showPlans, setShowPlans] = useState(false);

  return (
    <div className="pb-24 animate-in fade-in duration-700 space-y-16 max-w-5xl mx-auto">
      <main className="space-y-16">
        {/* Current Plan Section */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[28px] font-black text-near-black tracking-tight leading-none mb-2">
                Your Subscription
              </h1>
              <p className="text-gray-500 font-medium text-[15px]">
                Manage your billing and plan details.
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm h-64 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="bg-near-black text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-near-black/10">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-wise-green/10 rounded-bl-full pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/5 rounded-full pointer-events-none blur-3xl" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[11px] font-black uppercase tracking-widest text-white">
                    {isSubscribed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-wise-green" />
                    ) : (
                      <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    )}
                    {isSubscribed ? "Active Subscription" : "Free Tier"}
                  </div>

                  <div>
                    <h2 className="text-[42px] font-black tracking-tight leading-none mb-2">
                      {planName} Plan
                    </h2>
                    <p className="text-gray-400 font-medium text-[16px] max-w-sm">
                      {isSubscribed
                        ? "You are currently on a premium tier with enhanced recruiter capabilities."
                        : "You're on the basic free plan. Upgrade to unlock premium features and hire faster."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
                  <Button
                    onClick={() => {
                      setShowPlans(true);
                      setTimeout(
                        () =>
                          window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: "smooth",
                          }),
                        100,
                      );
                    }}
                    className="h-14 px-8 rounded-2xl bg-wise-green text-near-black font-black text-[15px] hover:bg-white hover:text-near-black transition-all group flex items-center justify-center gap-2"
                  >
                    {isSubscribed ? "Change Plan" : "Upgrade Now"}
                    <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Button>
                  {isSubscribed && (
                    <Button
                      variant="outline"
                      className="h-14 px-8 rounded-2xl border-white/20 text-white font-black text-[15px] hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Manage Payment Method
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Payment History Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
              <History className="w-5 h-5 text-gray-400" />
            </div>
            <h2 className="text-[20px] font-black text-near-black tracking-tight">
              Payment History
            </h2>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-gray-500">
                    Invoice Date
                  </th>
                  <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-gray-500">
                    Plan
                  </th>
                  <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-gray-500">
                    Amount
                  </th>
                  <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-gray-500">
                    Status
                  </th>
                  <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-gray-500 text-right">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoadingHistory ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="w-8 h-8 mx-auto border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
                    </td>
                  </tr>
                ) : subscriptionHistory && subscriptionHistory.length > 0 ? (
                  subscriptionHistory.map((history, idx) => (
                    <tr
                      key={history.id || idx}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors"
                    >
                      <td className="py-4 px-6 text-[14px] font-medium text-gray-900">
                        {format(
                          new Date(history.created_at || new Date()),
                          "MMM dd, yyyy",
                        )}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-gray-900 capitalize">
                        {history.status === "active" ? "Pro Plan" : "Free Plan"}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-gray-900">
                        {history.status === "active" ? "$29.00" : "$0.00"}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-black uppercase tracking-widest ${history.status === "active" ? "bg-wise-green/10 text-dark-green" : "bg-gray-100 text-gray-500"}`}
                        >
                          {history.status === "active" ? "Paid" : "Canceled"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button
                          variant="ghost"
                          className="h-8 px-3 text-gray-500 hover:text-near-black"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                        <CreditCard className="w-6 h-6 text-gray-300" />
                      </div>
                      <p className="text-[15px] font-bold text-gray-900 mb-1">
                        No payment history
                      </p>
                      <p className="text-[14px] text-gray-500 font-medium">
                        Your future invoices and receipts will appear here.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <div
          className={`transition-all duration-700 ease-in-out origin-top ${showPlans || !isSubscribed ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0 overflow-hidden"}`}
        >
          <div className="pt-8 border-t border-gray-200/60">
            <div className="mb-10 text-center">
              <h2 className="text-[32px] font-black text-near-black tracking-tight mb-4">
                Available Plans
              </h2>
              <p className="text-[16px] text-gray-500 font-medium max-w-xl mx-auto">
                Scale your hiring process with our flexible tiers. Choose the
                plan that fits your company's needs.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="min-h-[40vh] flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <div className="-mx-4 md:-mx-8 lg:-mx-12">
                <PricingContent hideNavbar={true} />
              </div>
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
