"use client";

import { Mail } from "lucide-react";
import { LazyMotion, m, domAnimation } from "motion/react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/hooks/use-auth";

interface ForgotPasswordFormProps {
  role: "recruiter" | "user";
}

export function ForgotPasswordForm({ role }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email, role);
      setIsSubmitted(true);
      toast.success("Password reset link sent successfully!");
    } catch (err: unknown) {
      console.error(err);
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to request password reset. Please try again.",
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className="gap-y-4 text-center py-6">
        <div className="size-12 bg-wise-green/10 text-wise-green rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Mail className="size-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Check your email</h3>
        <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-sm mx-auto">
          We have sent a secure password reset link to{" "}
          <span className="font-bold text-gray-800">{email}</span>. Please click
          the link in the email to reset your password.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="gap-y-5">
      <div className="gap-y-2">
        <Label
          htmlFor="email"
          className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
        >
          <Mail className="size-4 text-wise-green" /> Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="jane@company.com"
          className="h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-wise-green focus:ring-1 focus:ring-wise-green/30 transition-all shadow-sm placeholder:text-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <m.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="pt-2"
      >
        <Button
          type="submit"
          className="w-full h-12 bg-wise-green text-dark-green font-black rounded-xl hover:bg-wise-green/90 transition-all text-lg shadow-[0_0_20px_rgba(159,232,112,0.2)] mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Sending Link…" : "Send Reset Link"}
        </Button>
      </m.div>

      {error && (
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-600 text-center font-bold bg-red-50 border border-red-200 p-3 rounded-lg mt-4"
        >
          {error}
        </m.p>
      )}
    </form>
  );
}
