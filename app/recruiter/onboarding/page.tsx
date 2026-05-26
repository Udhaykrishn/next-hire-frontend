"use client";

import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Command,
  Layout,
  Loader2,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type OnboardingType = "individual" | "company";

export default function RecruiterOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingType, setOnboardingType] =
    useState<OnboardingType>("company");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    companyName: "",
    companySize: "",
    industry: "",
    hiringGoal: "",
    location: "",
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const startSetup = () => {
    setIsProcessing(true);
    const messages = [
      "Authenticating workspace...",
      "Syncing recruitment logic...",
      "Building your dashboard...",
      "Finalizing settings...",
      "Ready for takeoff!",
    ];

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setProcessStatus(progress);

      const msgIndex = Math.min(Math.floor(progress / 20), messages.length - 1);
      setStatusMessage(messages[msgIndex]);

      if (progress >= 100) {
        clearInterval(interval);
        setIsSuccess(true);
        setTimeout(() => router.push("/recruiter/dashboard"), 1200);
      }
    }, 40);
  };

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const steps = [
    { id: 1, label: "Profile", icon: <User className="size-3.5" /> },
    { id: 2, label: "Workspace", icon: <Building2 className="size-3.5" /> },
    { id: 3, label: "Objective", icon: <Target className="size-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-white font-satoshi selection:bg-wise-green/30 text-near-black overflow-x-hidden">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-wise-green/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-wise-green/[0.03] rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <AnimatePresence mode="wait">
          {!isProcessing ? (
            <m.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center"
            >
              {/* Header Section */}
              <div className="text-center mb-12 space-y-4">
                <m.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wise-green/10 border border-wise-green/20 text-wise-green text-[11px] font-black uppercase tracking-[0.2em]"
                >
                  <Command className="size-3.5" />
                  Satoshi Recruiter Edition
                </m.div>
                <m.h1 className="text-[40px] md:text-[48px] font-black leading-[1.1] tracking-[-0.03em]">
                  Deploy your <br />
                  <span className="text-wise-green italic">
                    Recruitment Command
                  </span>
                </m.h1>
              </div>

              {/* Steps Progress */}
              <div className="flex items-center gap-4 mb-12">
                {steps.map((s, i) => (
                  <React.Fragment key={s.id}>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={cn(
                          "size-12 rounded-[1rem] flex items-center justify-center transition-all duration-500 border-2",
                          currentStep === s.id
                            ? "bg-near-black text-wise-green border-near-black shadow-2xl shadow-wise-green/20 scale-110"
                            : currentStep > s.id
                              ? "bg-wise-green text-near-black border-wise-green"
                              : "bg-white text-gray-200 border-gray-100",
                        )}
                      >
                        {currentStep > s.id ? (
                          <CheckCircle2 className="size-5" />
                        ) : (
                          s.icon
                        )}
                      </div>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={cn(
                          "w-8 h-[2px] rounded-full transition-colors duration-500",
                          currentStep > s.id ? "bg-wise-green" : "bg-gray-100",
                        )}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Step Content Card */}
              <div className="w-full max-w-[600px] bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.03)] relative overflow-hidden">
                <div className="absolute top-0 right-0 size-32 bg-wise-green/[0.03] rounded-full blur-3xl -mr-16 -mt-16" />

                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <m.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2">
                        <h2 className="text-[24px] font-black tracking-tight">
                          Select your profile
                        </h2>
                        <p className="text-gray-400 font-medium text-[15px]">
                          How should we optimize your interface?
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          {
                            id: "company",
                            title: "Enterprise",
                            icon: <Building2 />,
                            desc: "High-volume teams & scaling organizations.",
                          },
                          {
                            id: "individual",
                            title: "Scout",
                            icon: <User />,
                            desc: "Independent talent consultants.",
                          },
                        ].map((type) => (
                          <button
                            type="button"
                            key={type.id}
                            onClick={() =>
                              setOnboardingType(type.id as OnboardingType)
                            }
                            className={cn(
                              "p-6 rounded-3xl border-2 text-left transition-all group relative overflow-hidden",
                              onboardingType === type.id
                                ? "border-wise-green bg-wise-green/[0.03] shadow-lg shadow-wise-green/5"
                                : "border-gray-50 bg-gray-50/30 hover:border-gray-200 hover:bg-white",
                            )}
                          >
                            <div
                              className={cn(
                                "size-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500",
                                onboardingType === type.id
                                  ? "bg-wise-green text-near-black rotate-3"
                                  : "bg-white text-gray-400 group-hover:scale-110",
                              )}
                            >
                              {React.cloneElement(
                                type.icon as React.ReactElement<{
                                  className?: string;
                                }>,
                                { className: "size-6" },
                              )}
                            </div>
                            <h3 className="text-[18px] font-black mb-1">
                              {type.title}
                            </h3>
                            <p className="text-gray-400 text-[13px] leading-relaxed font-medium">
                              {type.desc}
                            </p>
                            {onboardingType === type.id && (
                              <m.div
                                layoutId="active-pill"
                                className="absolute top-4 right-4 size-2 rounded-full bg-wise-green"
                              />
                            )}
                          </button>
                        ))}
                      </div>

                      <Button
                        onClick={nextStep}
                        className="w-full h-14 bg-wise-green text-near-black hover:bg-near-black hover:text-white transition-all rounded-full font-black text-[16px] group shadow-xl shadow-wise-green/20"
                      >
                        Enter Workspace Details
                        <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </m.div>
                  )}

                  {currentStep === 2 && (
                    <m.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2">
                        <h2 className="text-[24px] font-black tracking-tight">
                          Workspace Identity
                        </h2>
                        <p className="text-gray-400 font-medium text-[15px]">
                          Define the core of your hiring environment.
                        </p>
                      </div>

                      <div className="space-y-5">
                        <div className="space-y-2">
                          <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                            {onboardingType === "company"
                              ? "Company Identity"
                              : "Full Identity"}
                          </Label>
                          <div className="relative group">
                            <Input
                              placeholder={
                                onboardingType === "company"
                                  ? "e.g. Satoshi Labs"
                                  : "e.g. Alex Rivera"
                              }
                              className="h-14 px-6 rounded-2xl border-gray-100 bg-gray-50/50 focus:border-wise-green focus:bg-white transition-all text-[16px] font-medium"
                              value={
                                onboardingType === "company"
                                  ? formData.companyName
                                  : formData.name
                              }
                              onChange={(e) =>
                                handleChange(
                                  onboardingType === "company"
                                    ? "companyName"
                                    : "name",
                                  e.target.value,
                                )
                              }
                            />
                            <Layout className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-200 group-focus-within:text-wise-green transition-colors" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                              Base Location
                            </Label>
                            <Input
                              placeholder="City / Remote"
                              className="h-14 px-6 rounded-2xl border-gray-100 bg-gray-50/50 focus:border-wise-green focus:bg-white transition-all text-[16px] font-medium"
                              value={formData.location}
                              onChange={(e) =>
                                handleChange("location", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                              {onboardingType === "company"
                                ? "Scale"
                                : "Designation"}
                            </Label>
                            <Input
                              placeholder={
                                onboardingType === "company"
                                  ? "e.g. 50-100"
                                  : "e.g. Lead Scout"
                              }
                              className="h-14 px-6 rounded-2xl border-gray-100 bg-gray-50/50 focus:border-wise-green focus:bg-white transition-all text-[16px] font-medium"
                              value={
                                onboardingType === "company"
                                  ? formData.companySize
                                  : formData.title
                              }
                              onChange={(e) =>
                                handleChange(
                                  onboardingType === "company"
                                    ? "companySize"
                                    : "title",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          variant="ghost"
                          onClick={prevStep}
                          className="h-14 px-8 rounded-full border-2 border-transparent hover:border-gray-100 font-black"
                        >
                          <ArrowLeft className="size-5 mr-2" /> Back
                        </Button>
                        <Button
                          onClick={nextStep}
                          className="flex-1 h-14 bg-wise-green text-near-black hover:bg-near-black hover:text-white rounded-full font-black shadow-xl shadow-wise-green/10"
                        >
                          Configure Objectives
                        </Button>
                      </div>
                    </m.div>
                  )}

                  {currentStep === 3 && (
                    <m.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2">
                        <h2 className="text-[24px] font-black tracking-tight">
                          Mission Strategy
                        </h2>
                        <p className="text-gray-400 font-medium text-[15px]">
                          What are we prioritizing today?
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                            Core Industry
                          </Label>
                          <div className="relative group">
                            <Input
                              placeholder="e.g. Artificial Intelligence"
                              className="h-14 px-6 rounded-2xl border-gray-100 bg-gray-50/50 focus:border-wise-green focus:bg-white transition-all text-[16px] font-medium"
                              value={formData.industry}
                              onChange={(e) =>
                                handleChange("industry", e.target.value)
                              }
                            />
                            <Sparkles className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-200 group-focus-within:text-wise-green transition-colors" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                            Hiring Velocity
                          </Label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              "Blitzscaling",
                              "Steady Flow",
                              "Backfill",
                              "Founding Team",
                            ].map((goal) => (
                              <button
                                type="button"
                                key={goal}
                                onClick={() => handleChange("hiringGoal", goal)}
                                className={cn(
                                  "h-14 rounded-2xl border-2 transition-all font-black text-[14px] flex items-center justify-center px-4",
                                  formData.hiringGoal === goal
                                    ? "bg-near-black border-near-black text-wise-green shadow-lg"
                                    : "bg-gray-50/50 border-gray-50 text-gray-400 hover:border-gray-100 hover:bg-white",
                                )}
                              >
                                {goal}
                                {formData.hiringGoal === goal && (
                                  <Zap className="size-4 ml-2 fill-wise-green" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          variant="ghost"
                          onClick={prevStep}
                          className="h-14 px-8 rounded-full border-transparent hover:border-gray-100 font-black"
                        >
                          <ArrowLeft className="size-5 mr-2" /> Back
                        </Button>
                        <Button
                          onClick={startSetup}
                          className="flex-1 h-14 bg-near-black text-white hover:bg-wise-green hover:text-near-black rounded-full font-black shadow-2xl shadow-near-black/20 group overflow-hidden relative"
                        >
                          <m.div
                            className="absolute inset-0 bg-gradient-to-r from-wise-green/0 via-wise-green/20 to-wise-green/0"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          <span className="relative z-10 flex items-center justify-center">
                            Initialize Engine
                            <Rocket className="size-5 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </m.div>
          ) : (
            <m.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-[500px] flex flex-col items-center text-center space-y-12"
            >
              {!isSuccess ? (
                <>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-wise-green/20 rounded-[3rem] blur-3xl animate-pulse" />
                    <div className="relative size-32 rounded-[3rem] bg-near-black flex items-center justify-center border-[6px] border-white shadow-2xl overflow-hidden">
                      <m.div
                        className="absolute inset-0 bg-wise-green"
                        animate={{
                          height: `${processStatus}%`,
                          top: `${100 - processStatus}%`,
                        }}
                      />
                      <Loader2 className="size-12 text-white animate-spin relative z-10 mix-blend-difference" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-[32px] font-black tracking-tight">
                      {statusMessage}
                    </h2>
                    <p className="text-gray-400 font-bold text-[16px]">
                      Engine synchronization in progress...
                    </p>
                  </div>

                  <div className="w-full space-y-4">
                    <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border-4 border-white shadow-inner">
                      <m.div
                        initial={{ width: 0 }}
                        animate={{ width: `${processStatus}%` }}
                        className="h-full bg-wise-green rounded-full shadow-[0_0_20px_rgba(159,232,112,0.6)]"
                      />
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
                        System Load
                      </span>
                      <span className="text-[10px] font-black text-near-black uppercase tracking-[0.2em]">
                        {processStatus}% Synchronized
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <m.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-10"
                >
                  <div className="relative mx-auto size-32">
                    <m.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 bg-wise-green rounded-full"
                    />
                    <div className="relative size-full rounded-full bg-wise-green flex items-center justify-center shadow-[0_0_50px_rgba(159,232,112,0.4)]">
                      <ShieldCheck className="size-16 text-near-black" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-[40px] font-black tracking-tighter">
                      System Live.
                    </h2>
                    <p className="text-gray-400 font-bold text-[18px]">
                      Redirecting to your command center...
                    </p>
                  </div>
                </m.div>
              )}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
