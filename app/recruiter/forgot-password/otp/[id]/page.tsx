"use client";

import { ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { use } from "react";
import { OtpForm } from "@/components/auth/otp-form";
import { Logo } from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecruiterOtpPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-satoshi selection:bg-wise-green selection:text-dark-green relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-wise-green/40 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-wise-green/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="flex justify-center mb-10">
          <Logo size="lg" />
        </div>

        <Card className="border-gray-200 shadow-2xl shadow-gray-200/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardHeader className="space-y-2 pb-8 pt-10 text-center relative border-b border-gray-100">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute top-0 right-10 translate-y-[-50%] w-16 h-16 bg-wise-green rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(159,232,112,0.3)] -rotate-6"
            >
              <ShieldCheck className="w-8 h-8 text-dark-green" />
            </motion.div>

            <CardTitle className="text-3xl font-black leading-tight text-gray-900 tracking-tight mt-2">
              Verify OTP
            </CardTitle>
            <CardDescription className="text-base text-gray-500 font-medium px-4">
              Enter the 6-digit code sent to your email address.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-8 px-10">
            <OtpForm id={resolvedParams.id} role="recruiter" />
          </CardContent>

          <CardFooter className="flex justify-center pb-8 pt-4">
            <Link
              href="/recruiter/forgot-password"
              className="text-sm text-gray-500 font-medium flex items-center gap-2 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Try another email
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
