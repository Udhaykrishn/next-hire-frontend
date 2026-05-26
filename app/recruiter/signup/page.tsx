"use client";

import { Briefcase, Building, Lock, Mail, Phone } from "lucide-react";
import { m } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/animate-ui/components/buttons/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRoleRedirect } from "@/features/auth/hooks/use-role-redirect";

export default function RecruiterSignupPage() {
  const { push } = useRouter();
  const {
    signup,
    verifyOtp,
    resendOtp,
    isLoading: signupLoading,
    error,
  } = useAuth();
  const {
    setUser,
    isAuthenticated,
    user,
    isLoading: authLoading,
  } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    name: "",
  });

  const [step, setStep] = useState<"FORM" | "OTP">("FORM");

  // Redirect if already authenticated as RECRUITER
  useRoleRedirect("RECRUITER", "/recruiter/dashboard");

  if (authLoading || (isAuthenticated && user?.role === "RECRUITER")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-satoshi">
        <div className="animate-spin rounded-full size-12 border-b-2 border-wise-green"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await signup({ ...formData, role: "RECRUITER" });
      toast.success("Please verify your email!");
      setStep("OTP");
    } catch (_err) {
      // Error handled by hook
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      const response = await verifyOtp(formData.email, otp, "recruiter");
      if (response && "user" in response) {
        setUser(response.user);
        toast.success("Recruiter account created successfully!");
        push("/recruiter/dashboard");
      }
    } catch (err) {
      toast.error("Invalid OTP. Please try again.");
      throw err;
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp(formData.email, "recruiter");
      toast.success("OTP resent to your email.");
    } catch (_err) {
      toast.error("Failed to resend OTP.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-satoshi selection:bg-wise-green selection:text-dark-green relative overflow-hidden">
      <div className="absolute top-0 right-0 size-[800px] bg-wise-green/40 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 size-[600px] bg-wise-green/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="flex justify-center mb-10">
          <Logo size="lg" />
        </div>

        <Card className="border-gray-200 shadow-2xl shadow-gray-200/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardHeader className="gap-y-2 pb-8 pt-10 text-center relative border-b border-gray-100">
            <m.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute top-0 right-10 translate-y-[-50%] size-16 bg-wise-green rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(159,232,112,0.3)] rotate-12"
            >
              <Building className="size-8 text-dark-green" />
            </m.div>

            <CardTitle className="text-3xl font-black leading-tight text-gray-900 tracking-tight mt-2">
              {step === "FORM" ? "Recruit the Best" : "Verify Email"}
            </CardTitle>
            <CardDescription className="text-base text-gray-500 font-medium">
              {step === "FORM"
                ? "Create your corporate account to access premium talent."
                : `We've sent a code to ${formData.email}`}
            </CardDescription>
          </CardHeader>

          <CardContent className="gap-y-6 pt-8 px-10">
            {step === "FORM" ? (
              <form onSubmit={handleSubmit} className="gap-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="gap-y-2 col-span-2">
                    <Label
                      htmlFor="name"
                      className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                    >
                      <Briefcase className="size-4 text-wise-green" /> Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Jane Smith"
                      className="h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-wise-green focus:ring-1 focus:ring-wise-green/30 transition-all shadow-sm placeholder:text-gray-400"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="gap-y-2 col-span-2">
                    <Label
                      htmlFor="email"
                      className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                    >
                      <Mail className="size-4 text-wise-green" /> Work Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      className="h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-wise-green focus:ring-1 focus:ring-wise-green/30 transition-all shadow-sm placeholder:text-gray-400"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="gap-y-2 col-span-2">
                    <Label
                      htmlFor="phone"
                      className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                    >
                      <Phone className="size-4 text-wise-green" /> Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 1234567890"
                      className="h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-wise-green focus:ring-1 focus:ring-wise-green/30 transition-all shadow-sm placeholder:text-gray-400"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="gap-y-2 col-span-1">
                    <Label
                      htmlFor="password"
                      className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                    >
                      <Lock className="size-4 text-wise-green" /> Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-wise-green focus:ring-1 focus:ring-wise-green/30 transition-all shadow-sm placeholder:text-gray-400"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="gap-y-2 col-span-1">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                    >
                      <Lock className="size-4 text-wise-green" /> Confirm
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-wise-green focus:ring-1 focus:ring-wise-green/30 transition-all shadow-sm placeholder:text-gray-400"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <m.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    className="w-full h-12 bg-wise-green text-dark-green font-black rounded-xl hover:bg-wise-green/90 transition-all text-lg shadow-[0_0_20px_rgba(159,232,112,0.2)] mt-2"
                    disabled={signupLoading}
                  >
                    Create Recruiter Account
                  </Button>
                </m.div>
              </form>
            ) : (
              <m.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <OtpForm id={formData.email} onVerify={handleVerifyOtp} />
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-sm font-bold text-wise-green hover:text-dark-green transition-colors"
                  >
                    Resend Code
                  </button>
                </div>
              </m.div>
            )}

            {error && (
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600 text-center font-bold bg-red-50 border border-red-200 p-3 rounded-lg"
              >
                {error}
              </m.p>
            )}
          </CardContent>

          <CardFooter className="flex justify-center pb-8 pt-4">
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{" "}
              <Link
                href="/recruiter/login"
                className="text-wise-green font-black hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </m.div>
    </div>
  );
}
