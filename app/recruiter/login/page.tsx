"use client";

import { Building, Lock, Mail } from "lucide-react";
import { LazyMotion, m, domAnimation } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
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
import { useRoleRedirect } from "@/features/auth/hooks/use-role-redirect";

export default function RecruiterLoginPage() {
  const { push } = useRouter();
  const { login, isLoading: loginLoading, error } = useAuth();
  const {
    setUser,
    isAuthenticated,
    user,
    isLoading: authLoading,
  } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    try {
      const response = await login(
        formData.email,
        formData.password,
        "recruiter",
      );
      setUser(response.user);

      if (response.user.role === "RECRUITER") {
        push("/recruiter/dashboard");
      } else {
        push("/");
      }
    } catch (_err) {
      // Error handled by hook
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ …prev, [e.target.id]: e.target.value }));
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
              className="absolute top-0 right-10 translate-y-[-50%] size-16 bg-wise-green rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(159,232,112,0.3)] -rotate-12"
            >
              <Building className="size-8 text-dark-green" />
            </m.div>

            <CardTitle className="text-3xl font-black leading-tight text-gray-900 tracking-tight mt-2">
              Recruiter Access
            </CardTitle>
            <CardDescription className="text-base text-gray-500 font-medium">
              Sign in to manage your talent pipeline.
            </CardDescription>
          </CardHeader>

          <CardContent className="gap-y-6 pt-8 px-10">
            <form onSubmit={handleSubmit} className="gap-y-5">
              <div className="gap-y-4">
                <div className="gap-y-2">
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

                <div className="gap-y-2">
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
                  <div className="flex justify-end pt-1">
                    <Link
                      href="/recruiter/forgot-password"
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
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
                  disabled={loginLoading}
                >
                  Sign In
                </Button>
              </m.div>
            </form>

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
              New to NextHire?{" "}
              <Link
                href="/recruiter/signup"
                className="text-wise-green font-black hover:text-gray-900 transition-colors"
              >
                Register Company
              </Link>
            </p>
          </CardFooter>
        </Card>
      </m.div>
    </div>
  );
}
