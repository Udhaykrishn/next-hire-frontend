"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CandidatePaymentSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
      router.replace("/jobs");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6 font-satoshi relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-wise-green/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white rounded-[2.5rem] border border-gray-100 p-10 md:p-12 shadow-xl shadow-gray-200/50 text-center relative"
      >
        {/* Animated Checkmark Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="w-20 h-20 bg-wise-green/15 rounded-full flex items-center justify-center mx-auto mb-8 relative"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-wise-green/5 rounded-full"
          />
          <CheckCircle2
            className="w-10 h-10 text-wise-green relative z-10"
            strokeWidth={2.5}
          />
        </motion.div>

        {/* Title & Success Info */}
        <div className="space-y-4 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wise-green/10 text-wise-green text-[10px] font-black uppercase tracking-widest border border-wise-green/10">
            <Sparkles className="w-3.5 h-3.5" />
            Upgrade Active
          </span>
          <h1 className="text-[32px] font-black text-near-black tracking-tight leading-none">
            Upgrade Complete!
          </h1>
          <p className="text-[14px] text-gray-500 font-medium leading-relaxed max-w-sm mx-auto">
            Your payment was successful and your candidate profile has been
            upgraded. You now have full premium privileges.
          </p>
        </div>

        {/* Redirect Countdown Panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-4 text-center"
        >
          <p className="text-[13px] font-bold text-gray-400">
            Redirecting to jobs board in{" "}
            <span className="text-wise-green font-black text-[15px]">
              {countdown}
            </span>{" "}
            {countdown === 1 ? "second" : "seconds"}...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
