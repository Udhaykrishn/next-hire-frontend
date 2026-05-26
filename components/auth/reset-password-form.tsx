"use client";

import { Lock } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/hooks/use-auth";

interface ResetPasswordFormProps {
  token: string;
  role: "recruiter" | "user";
}

export function ResetPasswordForm({ token, role }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const { resetPassword, isLoading, error: authError } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    setLocalError("");
    try {
      await resetPassword(
        {
          token,
          password,
          confirmPassword,
        },
        role,
      );
      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push(role === "recruiter" ? "/recruiter/login" : "/login");
      }, 2000);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const displayError = localError || authError;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-wise-green" /> New Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-wise-green focus:ring-1 focus:ring-wise-green/30 transition-all shadow-sm placeholder:text-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-wise-green" /> Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-wise-green focus:ring-1 focus:ring-wise-green/30 transition-all shadow-sm placeholder:text-gray-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
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
          className="w-full h-12 bg-wise-green text-dark-green font-black rounded-xl hover:bg-wise-green/90 transition-all text-lg shadow-[0_0_20px_rgba(159,232,112,0.2)] mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </motion.div>

      {displayError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-600 text-center font-bold bg-red-50 border border-red-200 p-3 rounded-lg mt-4"
        >
          {displayError}
        </motion.p>
      )}
    </form>
  );
}
