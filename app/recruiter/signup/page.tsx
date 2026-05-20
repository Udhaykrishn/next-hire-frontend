"use client";

import { Briefcase, Building, Lock, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
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

export default function RecruiterSignupPage() {
  const router = useRouter();
  const { signup, isLoading, error } = useAuth();
  const { setUser, isAuthenticated } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    name: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/recruiter/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      import("sonner").then(({ toast }) => toast.error("Passwords do not match!"));
      return;
    }

    try {
      const response = await signup({ ...formData, role: "RECRUITER" });

      // Update global context with the user from response
      if (response && 'user' in response) {
        setUser(response.user);
        router.push("/recruiter/dashboard");
      } else {
        router.push("/recruiter/login");
      }
    } catch (_err) {
      // Error handled by hook
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="flex justify-center mb-10">
          <Logo size="lg" />
        </div>

        <Card className="border-gray-200 shadow-2xl shadow-gray-200/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardHeader className="space-y-2 pb-8 pt-10 text-center relative border-b border-gray-100">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute top-0 right-10 translate-y-[-50%] w-16 h-16 bg-wise-green rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(159,232,112,0.3)] rotate-12"
            >
              <Building className="w-8 h-8 text-dark-green" />
            </motion.div>

            <CardTitle className="text-3xl font-black leading-tight text-gray-900 tracking-tight mt-2">
              Recruit the Best
            </CardTitle>
            <CardDescription className="text-base text-gray-500 font-medium">
              Create your corporate account to access premium talent.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-8 px-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label
                    htmlFor="name"
                    className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4 text-wise-green" /> Full Name
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

                <div className="space-y-2 col-span-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-wise-green" /> Work Email
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

                <div className="space-y-2 col-span-2">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-wise-green" /> Phone Number
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

                <div className="space-y-2 col-span-1">
                  <Label
                    htmlFor="password"
                    className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-wise-green" /> Password
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

                <div className="space-y-2 col-span-1">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-wise-green" /> Confirm
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
                  Create Recruiter Account
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
      </motion.div>
    </div>
  );
}