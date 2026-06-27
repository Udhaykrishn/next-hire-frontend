"use client";

import { Lock, Mail, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRoleRedirect } from "@/features/auth/hooks/use-role-redirect";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isLoading: loginLoading, error } = useAuth();
  const {
    setUser,
    isAuthenticated,
    user,
    isLoading: authLoading,
  } = useAuthContext();

  const [formData, setFormData] = useState({ email: "", password: "" });

  useRoleRedirect("ADMIN", "/admin/dashboard");

  if (authLoading || (isAuthenticated && user?.role === "ADMIN")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas font-satoshi">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-coral" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData.email, formData.password, "admin");
      setUser(response.user);
      router.push("/admin/dashboard");
    } catch (_err) {
      // handled by the hook
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-canvas font-satoshi selection:bg-coral/20 selection:text-coral-active">
      {/* Left brand panel (navy) */}
      <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-navy p-12 text-on-dark lg:flex">
        <div
          aria-hidden
          className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.12] mix-blend-overlay"
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-coral/20 blur-[120px]" />
        <div className="relative flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral">
            <ShieldCheck className="h-4 w-4 text-white" />
          </span>
          <span className="font-display text-[20px]">
            next<span className="italic text-coral">Hire</span>
          </span>
          <span className="ml-1 rounded-full bg-white/[0.08] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-on-dark-soft">
            Admin
          </span>
        </div>
        <div className="relative max-w-md">
          <h2 className="font-display text-[40px] leading-[1.1] tracking-[-0.01em]">
            The control room for your{" "}
            <span className="italic text-coral">hiring platform.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-on-dark-soft">
            Moderate candidates and recruiters, review listings, manage plans,
            and keep the marketplace healthy.
          </p>
        </div>
        <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-on-dark-soft/70">
          Authorization level 4 · Secured session
        </p>
      </aside>

      {/* Right form panel (cream) */}
      <main className="relative flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-coral/10 blur-[120px]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-coral">
              Administrator
            </span>
            <h1 className="mt-3 font-display text-[34px] leading-tight tracking-[-0.01em] text-ink">
              Welcome back
            </h1>
            <p className="mt-2 text-[15px] text-body">
              Sign in to the admin console to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-ink"
              >
                <Mail className="h-4 w-4 text-coral" /> Admin email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@nexthire.ai"
                className="h-12 rounded-xl border-hairline bg-white text-ink shadow-sm transition-all placeholder:text-muted-soft focus:border-coral focus:ring-2 focus:ring-coral/20"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-ink"
              >
                <Lock className="h-4 w-4 text-coral" /> Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl border-hairline bg-white text-ink shadow-sm transition-all placeholder:text-muted-soft focus:border-coral focus:ring-2 focus:ring-coral/20"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs font-bold text-destructive"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              className="mt-2 h-12 w-full rounded-xl bg-coral text-[15px] font-bold text-white shadow-lg shadow-coral/25 transition-transform hover:scale-[1.01] disabled:opacity-60"
              disabled={loginLoading}
            >
              {loginLoading ? "Authenticating..." : "Sign in securely"}
            </Button>
          </form>

          <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-soft">
            Restricted access · Authorized personnel only
          </p>
        </motion.div>
      </main>
    </div>
  );
}
