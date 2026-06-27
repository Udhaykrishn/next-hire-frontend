"use client";

import { motion } from "framer-motion";
import { CheckCircle2, RefreshCw, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { apiClient } from "@/lib/api-client";
import { getRecruiterProfile } from "@/features/recruiter/services/recruiter.api";
import type { ApiResponse } from "@/features/profile/types/profile.types";
import type { RecruiterProfile } from "@/features/recruiter/types/recruiter.types";

const MAX_POLL_SECONDS = 20;

export default function RecruiterPaymentSuccessPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const [countdown, setCountdown] = useState(3);
  const [isActivating, setIsActivating] = useState(true);
  const [timedOut, setTimedOut] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: poll lifecycle keyed on user id only
  useEffect(() => {
    if (!user?.id) return;

    let pollInterval: ReturnType<typeof setInterval>;
    let safetyTimeout: ReturnType<typeof setTimeout>;

    const confirmAndRedirect = () => {
      if (!isMounted.current) return;
      setIsActivating(false);
      queryClient.invalidateQueries({ queryKey: ["recruiter", "profile"] });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      clearInterval(pollInterval);
      clearTimeout(safetyTimeout);
    };

    const activate = async () => {
      // Trigger mock-success using apiClient so cookies + CSRF are included
      try {
        await apiClient.post("/stripe/mock-success", { userId: user.id });
      } catch (err) {
        // Log but don't block — DB may already be updated from a previous attempt
        console.warn("[SuccessPage] mock-success call failed:", err);
      }

      // Immediately check subscription status after activation
      const checkStatus = async () => {
        try {
          const res =
            (await getRecruiterProfile()) as ApiResponse<RecruiterProfile>;
          if (res?.data?.subscription?.is_subscribed) {
            confirmAndRedirect();
          }
        } catch (err) {
          console.warn("[SuccessPage] profile poll error:", err);
        }
      };

      await checkStatus();

      // Poll every 1.5 s until subscribed
      pollInterval = setInterval(checkStatus, 1500);

      // Safety timeout — stop spinning after MAX_POLL_SECONDS
      safetyTimeout = setTimeout(() => {
        clearInterval(pollInterval);
        if (isMounted.current && isActivating) {
          setTimedOut(true);
          setIsActivating(false);
        }
      }, MAX_POLL_SECONDS * 1000);
    };

    activate();

    return () => {
      clearInterval(pollInterval);
      clearTimeout(safetyTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Countdown redirect after activation confirmed
  useEffect(() => {
    if (isActivating || timedOut) return;
    if (countdown === 0) {
      router.replace("/recruiter/jobs/create/new");
      return;
    }
    const timer = setTimeout(() => setCountdown((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, router, isActivating, timedOut]);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6 font-satoshi relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-wise-green/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white rounded-[2.5rem] border border-gray-100 p-10 md:p-12 shadow-xl shadow-gray-200/50 text-center relative"
      >
        {isActivating ? (
          <>
            {/* Spinner */}
            <div className="w-20 h-20 bg-wise-green/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute inset-0 border-4 border-wise-green/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-wise-green rounded-full animate-spin" />
            </div>

            <div className="space-y-4 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-gray-500 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                Processing
              </span>
              <h1 className="text-[32px] font-black text-near-black tracking-tight leading-none">
                Activating Plan...
              </h1>
              <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-sm mx-auto">
                Please wait while we confirm your subscription with Stripe.
              </p>
            </div>
          </>
        ) : timedOut ? (
          <>
            {/* Timeout state */}
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <RefreshCw className="w-9 h-9 text-amber-500" />
            </div>
            <div className="space-y-4 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest border border-amber-100">
                Taking longer than expected
              </span>
              <h1 className="text-[28px] font-black text-near-black tracking-tight leading-none">
                Almost There
              </h1>
              <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-sm mx-auto">
                Your payment was successful. The subscription will activate
                within a few moments. Try refreshing the dashboard.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.replace("/recruiter/dashboard")}
              className="w-full h-12 rounded-2xl bg-near-black text-white font-bold text-[14px] hover:bg-near-black/90 transition-colors"
            >
              Go to Dashboard
            </button>
          </>
        ) : (
          <>
            {/* Success state */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="w-20 h-20 bg-wise-green/15 rounded-full flex items-center justify-center mx-auto mb-8 relative"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-wise-green/5 rounded-full"
              />
              <CheckCircle2
                className="w-10 h-10 text-wise-green relative z-10"
                strokeWidth={2.5}
              />
            </motion.div>

            <div className="space-y-4 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wise-green/10 text-wise-green text-[10px] font-black uppercase tracking-widest border border-wise-green/10">
                <Sparkles className="w-3.5 h-3.5" />
                Premium Active
              </span>
              <h1 className="text-[32px] font-black text-near-black tracking-tight leading-none">
                Plan Activated!
              </h1>
              <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-sm mx-auto">
                Thank you for subscribing. Your recruiter account has been
                upgraded with full access.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-4 text-center"
            >
              <p className="text-[13px] font-bold text-gray-400">
                Redirecting to the job wizard in{" "}
                <span className="text-wise-green font-black text-[15px]">
                  {countdown}
                </span>{" "}
                {countdown === 1 ? "second" : "seconds"}...
              </p>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
