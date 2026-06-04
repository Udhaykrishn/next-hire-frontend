"use client";

import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { ArrowRight, Mail, Phone, ShieldCheck, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import type React from "react";

import { useState } from "react";
import { toast } from "sonner";
import { OtpForm } from "@/components/auth/otp-form";
import { Button } from "@/components/animate-ui/components/buttons/button";
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
import { useAuthRedirect } from "@/features/auth/hooks/use-role-redirect";
import { useRouter } from "next/navigation";

export default function UserSignupPage() {
  const { signup, googleAuth, verifyOtp, resendOtp, isLoading: signupLoading, error } = useAuth();
  const { setUser, isAuthenticated, isLoading: authLoading } = useAuthContext();
  const router = useRouter();

  const [step, setStep] = useState<"INITIAL" | "FORM" | "OTP">("INITIAL");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already authenticated
  useAuthRedirect();

  if (authLoading || isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-satoshi">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wise-green"></div>
      </div>
    );
  }

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    if (!credentialResponse.credential) {
      toast.error("Google registration failed: No credential received");
      return;
    }

    try {
      const authResult = await googleAuth(credentialResponse.credential);
      setUser(authResult.user);
      toast.success("Successfully registered with Google!");
    } catch (err) {
      console.error("Google Auth failed:", err);
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google registration was unsuccessful. Please try again.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: "CANDIDATE",
      });
      toast.success("Please verify your email!");
      setStep("OTP");
    } catch (_err) {}
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      const response = await verifyOtp(formData.email, otp, "user");
      setUser(response.user);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Invalid OTP. Please try again.");
      throw err;
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp(formData.email, "user");
      toast.success("OTP resent to your email.");
    } catch (err) {
      toast.error("Failed to resend OTP.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-satoshi selection:bg-wise-green selection:text-dark-green relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-wise-green/40 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-wise-green/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        <Card className="border-gray-200 shadow-2xl shadow-gray-200/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardHeader className="space-y-2 pb-8 pt-10 text-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <CardTitle className="text-3xl font-black leading-tight text-gray-900 tracking-tight">
                  {step === "INITIAL" && "Join NextHire"}
                  {step === "FORM" && "Create Account"}
                  {step === "OTP" && "Verify Email"}
                </CardTitle>
                <CardDescription className="text-base text-gray-500 font-medium mt-2">
                  {step === "INITIAL" && "Start your professional career journey today."}
                  {step === "FORM" && "Fill in your details to get started."}
                  {step === "OTP" && `We've sent a code to ${formData.email}`}
                </CardDescription>
              </motion.div>
            </AnimatePresence>
          </CardHeader>

          <CardContent className="space-y-6 pt-2 px-8">
            <AnimatePresence mode="wait">
              {step === "INITIAL" ? (
                <motion.div
                  key="initial"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col items-center gap-4 w-full">
                    <div className="w-full flex justify-center">
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        theme="outline"
                        size="large"
                        shape="pill"
                        text="signup_with"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
                      <span className="bg-white px-4 text-gray-400 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Trusted by 10k+
                        users
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full h-12 text-gray-600 font-bold rounded-xl hover:bg-gray-50 gap-3 transition-all"
                    onClick={() => setStep("FORM")}
                  >
                    <Mail className="w-5 h-5" />
                    Sign up with Email
                  </Button>
                </motion.div>
              ) : step === "FORM" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-wise-green" /> Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="h-11 border-gray-200 rounded-xl focus:border-wise-green focus:ring-wise-green/20 bg-gray-50/50 text-sm transition-all"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoFocus
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="email"
                          className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4 text-wise-green" /> Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="h-11 border-gray-200 rounded-xl focus:border-wise-green focus:ring-wise-green/20 bg-gray-50/50 text-sm transition-all"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="phone"
                          className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                        >
                          <Phone className="w-4 h-4 text-wise-green" /> Phone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91..."
                          className="h-11 border-gray-200 rounded-xl focus:border-wise-green focus:ring-wise-green/20 bg-gray-50/50 text-sm transition-all"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="password"
                          className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                        >
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="h-11 border-gray-200 rounded-xl focus:border-wise-green focus:ring-wise-green/20 bg-gray-50/50 text-sm transition-all"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                        >
                          Confirm
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className="h-11 border-gray-200 rounded-xl focus:border-wise-green focus:ring-wise-green/20 bg-gray-50/50 text-sm transition-all"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("INITIAL")}
                        className="h-12 border-gray-200 text-gray-600 rounded-xl flex-1 hover:bg-gray-50"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="h-12 bg-wise-green text-dark-green font-black rounded-xl hover:bg-wise-green/90 transition-all text-lg shadow-lg shadow-wise-green/20 flex-[2] gap-2 group"
                        disabled={signupLoading}
                      >
                        Join Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <OtpForm id={formData.email} role="user" onVerify={handleVerifyOtp} />
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-sm font-bold text-wise-green hover:text-dark-green transition-colors"
                    >
                      Resend Code
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 text-center font-bold bg-red-50 p-3 rounded-lg"
              >
                {error}
              </motion.p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pb-8 pt-4 px-8">
            <p className="text-sm text-gray-600 text-center font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-dark-green font-black hover:text-wise-green transition-colors underline decoration-2 underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
