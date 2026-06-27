"use client";

import { Lock, Mail, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Logo } from "@/components/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRoleRedirect } from "@/features/auth/hooks/use-role-redirect";

export default function InterviewerLoginPage() {
  const router = useRouter();
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

  // Redirect if already authenticated as INTERVIEWER
  useRoleRedirect("INTERVIEWER", "/interviewer/dashboard");

  if (authLoading || (isAuthenticated && user?.role === "INTERVIEWER")) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center font-satoshi">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(
        formData.email,
        formData.password,
        "interviewer",
      );
      setUser(response.user);

      if (response.user.role === "INTERVIEWER") {
        router.push("/interviewer/dashboard");
      } else {
        router.push("/");
      }
    } catch (_err) {
      // Error handled by hook
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas p-4 font-satoshi selection:bg-coral/20 relative overflow-hidden">
      {/* Decorative Warm Cream & Coral blur shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-coral/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-coral/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="flex justify-center mb-10">
          <Logo size="lg" />
        </div>

        <Card className="border-hairline shadow-xl rounded-[2rem] overflow-hidden bg-white/95 backdrop-blur-xl">
          <CardHeader className="space-y-2 pb-8 pt-10 text-center relative border-b border-hairline">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute top-0 right-10 translate-y-[-50%] w-16 h-16 bg-coral rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(204,120,92,0.3)] -rotate-12"
            >
              <ShieldAlert className="w-8 h-8 text-white" />
            </motion.div>

            <CardTitle className="text-3xl font-black leading-tight text-ink tracking-tight mt-2 font-display">
              Interviewer Access
            </CardTitle>
            <CardDescription className="text-base text-muted-soft font-medium">
              Sign in to evaluate candidates and submit interview feedback.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-8 px-10 pb-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-bold text-muted-soft uppercase tracking-widest flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-coral" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="interviewer@company.com"
                    className="h-12 bg-white border-hairline text-ink rounded-xl focus:border-coral focus:ring-1 focus:ring-coral/30 transition-all shadow-sm placeholder:text-muted-soft/60"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-xs font-bold text-muted-soft uppercase tracking-widest flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-coral" /> Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-12 bg-white border-hairline text-ink rounded-xl focus:border-coral focus:ring-1 focus:ring-coral/30 transition-all shadow-sm placeholder:text-muted-soft/60"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  className="w-full h-12 bg-coral text-white font-black rounded-xl hover:bg-coral/95 transition-all text-lg shadow-[0_0_20px_rgba(204,120,92,0.2)] mt-2"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Signing In..." : "Sign In"}
                </Button>
              </motion.div>
            </form>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600 text-center font-bold bg-red-50 border border-red-200 p-3 rounded-lg"
              >
                {error}
              </motion.p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
