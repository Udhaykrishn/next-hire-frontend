"use client";

import { AlertTriangle, ArrowLeft, LockKeyhole } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Logo } from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useVerifyResetTokenQuery } from "@/features/auth/hooks/use-auth";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const typeParam = searchParams.get("type");
  const role = typeParam === "recruiter" ? "recruiter" : "user";

  const { data: isValid = false, isLoading: isValidating } =
    useVerifyResetTokenQuery(token || "", role);

  const loginLink = role === "recruiter" ? "/recruiter/login" : "/login";
  const forgotLink =
    role === "recruiter" ? "/recruiter/forgot-password" : "/forgot-password";

  return (
    <Card className="border-gray-200 shadow-2xl shadow-gray-200/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
      <CardHeader className="space-y-2 pb-8 pt-10 text-center relative border-b border-gray-100">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="absolute top-0 right-10 translate-y-[-50%] size-16 bg-wise-green rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(159,232,112,0.3)] rotate-6"
        >
          {isValidating || isValid ? (
            <LockKeyhole className="size-8 text-dark-green" />
          ) : (
            <AlertTriangle className="size-8 text-red-700 animate-bounce" />
          )}
        </motion.div>

        <CardTitle className="text-3xl font-black leading-tight text-gray-900 tracking-tight mt-2">
          {isValidating
            ? "Validating..."
            : isValid
              ? "Create New Password"
              : "Reset Link Expired"}
        </CardTitle>
        <CardDescription className="text-base text-gray-500 font-medium px-4">
          {isValidating
            ? "Verifying secure token..."
            : isValid
              ? "Your new password must be different from previously used passwords."
              : "This password reset link is invalid, expired, or has already been used."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-8 px-10">
        {isValidating ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="size-10 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              Checking Link Security
            </p>
          </div>
        ) : isValid && token ? (
          <ResetPasswordForm token={token} role={role} />
        ) : (
          <div className="space-y-4 text-center py-6">
            <p className="text-sm text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
              Please request a new password reset link. Security tokens expire
              quickly to protect your account.
            </p>
            <div className="pt-2">
              <Link
                href={forgotLink}
                className="inline-flex items-center justify-center h-12 px-6 bg-wise-green text-dark-green font-black rounded-xl hover:bg-wise-green/90 transition-all text-base shadow-[0_0_20px_rgba(159,232,112,0.2)]"
              >
                Request New Link
              </Link>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center pb-8 pt-4">
        <Link
          href={loginLink}
          className="text-sm text-gray-500 font-medium flex items-center gap-2 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="size-4" /> Back to Login
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function ResetPasswordPage() {
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

        <Suspense
          fallback={
            <Card className="border-gray-200 shadow-2xl shadow-gray-200/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
              <CardHeader className="space-y-2 pb-8 pt-10 text-center relative border-b border-gray-100">
                <CardTitle className="text-3xl font-black leading-tight text-gray-900 tracking-tight mt-2">
                  Loading...
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center py-12">
                <div className="size-10 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
              </CardContent>
            </Card>
          }
        >
          <ResetPasswordContent />
        </Suspense>
      </motion.div>
    </div>
  );
}
