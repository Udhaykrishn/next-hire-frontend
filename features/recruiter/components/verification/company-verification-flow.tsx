"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { ArrowLeft, Building2, KeyRound, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCompanyVerification } from "../../hooks/use-company-verification";

export function CompanyVerificationFlow() {
  const { push } = useRouter();
  const {
    step,
    cin,
    setCin,
    otp,
    setOtp,
    handleStartSession,
    handleVerifyOtp,
    isLoading,
    isStarting,
    isVerifying,
    isDeleting,
    handleResumeSession,
    handleDeleteSession,
  } = useCompanyVerification();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-wise-green" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full gap-y-8">
      <button
        type="button"
        onClick={() => push("/recruiter/profile")}
        className="flex items-center text-sm font-medium text-gray-500 hover:text-near-black transition-colors"
      >
        <ArrowLeft className="size-4 mr-1.5" /> Back to Profile
      </button>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm"
      >
        <div className="text-center mb-8">
          <div className="size-16 bg-wise-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {step === "CIN" ? (
              <Building2 className="size-8 text-wise-green" />
            ) : (
              <KeyRound className="size-8 text-wise-green" />
            )}
          </div>
          <h2 className="text-2xl font-black text-near-black">
            {step === "CIN" && "Verify Company"}
            {step === "OTP" && "Enter Verification Code"}
            {step === "SESSION_EXISTS" && "Session Active"}
          </h2>
          <p className="text-gray-400 mt-2 text-sm font-medium">
            {step === "CIN" &&
              "Enter your Corporate Identification Number (CIN) to begin verification."}
            {step === "OTP" &&
              `We've sent a 6-digit OTP code to verify CIN: ${cin}`}
            {step === "SESSION_EXISTS" &&
              `You have an ongoing verification for CIN: ${cin}.`}
          </p>
        </div>

        {step === "CIN" ? (
          <form onSubmit={handleStartSession} className="gap-y-6">
            <div className="gap-y-2">
              <label className="text-sm font-bold text-gray-700">
                Company CIN
              </label>
              <input
                type="text"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                placeholder="e.g. L12345MH2000PLC123456"
                className="w-full px-4 h-12 bg-gray-50 border border-gray-200 rounded-xl focus:border-wise-green focus:ring-2 focus:ring-wise-green/20 outline-none transition-all font-medium placeholder:text-gray-400"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isStarting || !cin}
              className="w-full h-12 bg-near-black text-white hover:bg-near-black/90 font-bold rounded-xl text-base shadow-lg shadow-near-black/20"
            >
              {isStarting ? (
                <Loader2 className="size-5 animate-spin mx-auto" />
              ) : (
                "Verify CIN"
              )}
            </Button>
          </form>
        ) : step === "OTP" ? (
          <form onSubmit={handleVerifyOtp} className="gap-y-6">
            <div className="gap-y-2">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup className="gap-2">
                    {[…Array(6)].map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-12 h-14 text-xl border-2 border-gray-200 rounded-xl bg-gray-50"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isVerifying || otp.length !== 6}
              className="w-full h-12 bg-wise-green text-near-black hover:bg-near-black hover:text-white transition-all font-bold rounded-xl text-base shadow-lg shadow-wise-green/20"
            >
              {isVerifying ? (
                <Loader2 className="size-5 animate-spin mx-auto" />
              ) : (
                "Confirm Verification"
              )}
            </Button>
          </form>
        ) : step === "SESSION_EXISTS" ? (
          <div className="gap-y-4">
            <Button
              onClick={handleResumeSession}
              className="w-full h-12 bg-near-black text-white hover:bg-near-black/90 font-bold rounded-xl text-base shadow-lg shadow-near-black/20"
            >
              Resume Verification
            </Button>
            <Button
              onClick={handleDeleteSession}
              disabled={isDeleting}
              variant="outline"
              className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold rounded-xl text-base transition-colors"
            >
              {isDeleting ? (
                <Loader2 className="size-5 animate-spin mx-auto" />
              ) : (
                "Delete & Start New"
              )}
            </Button>
          </div>
        ) : null}
      </m.div>
    </div>
  );
}
