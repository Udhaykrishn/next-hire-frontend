"use client";

import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
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

function LoginContent() {
  const { login, googleAuth, isLoading: loginLoading, error } = useAuth();
  const { setUser, isAuthenticated, isLoading: authLoading } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const [step, setStep] = useState<"INITIAL" | "EMAIL">("INITIAL");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (urlError === "blocked") {
      toast.error(
        "Your account has been blocked by an administrator. You do not have access.",
        {
          duration: 5000,
        },
      );
      // Optionally clean up the URL to prevent showing toast repeatedly on refresh
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url);
    }
  }, [urlError]);

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
      toast.error("Google authentication failed: No credential received");
      return;
    }

    try {
      const authResult = await googleAuth(credentialResponse.credential);
      setUser(authResult.user);
      toast.success("Successfully signed in with Google!");
      if (authResult.isProfileComplete === false) {
        router.push("/profile/setup");
      }
    } catch (err) {
      console.error("Google Auth failed:", err);
      const errorObj = err as { message?: string };
      toast.error(
        errorObj.message || "Google authentication failed. Please try again.",
      );
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In was unsuccessful. Please try again.");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData.email, formData.password);
      setUser(response.user);
      toast.success("Successfully signed in!");
    } catch (_err) {
      // Error is handled by the hook and displayed in UI
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
                  {step === "INITIAL" ? "Welcome Back" : "Sign In"}
                </CardTitle>
                <CardDescription className="text-base text-gray-500 font-medium mt-2">
                  {step === "INITIAL"
                    ? "Sign in to access your NextHire profile."
                    : "Enter your credentials to proceed."}
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
                        text="continue_with"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
                      <span className="bg-white px-4 text-gray-400 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Secure & Encrypted
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full h-12 text-gray-600 font-bold rounded-xl hover:bg-gray-50 gap-3 transition-all"
                    onClick={() => setStep("EMAIL")}
                  >
                    <Mail className="w-5 h-5" />
                    Continue with Email
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleEmailSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" /> Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="h-12 border-gray-200 rounded-xl focus:border-wise-green focus:ring-wise-green/20 bg-gray-50/50 text-base transition-all"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoFocus
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label
                          htmlFor="password"
                          className="text-xs font-bold text-gray-500 uppercase tracking-widest"
                        >
                          Password
                        </Label>
                        <Link
                          href="/forgot-password"
                          className="text-xs text-gray-400 hover:text-wise-green transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="h-12 border-gray-200 rounded-xl focus:border-wise-green focus:ring-wise-green/20 bg-gray-50/50 text-base transition-all"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex gap-3 mt-2 pt-2">
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
                        disabled={loginLoading}
                      >
                        Sign In
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </form>
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
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-dark-green font-black hover:text-wise-green transition-colors underline decoration-2 underline-offset-4"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default function UserLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
