"use client";

import { m } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  Layout,
  Plus,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MethodologyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  isTemplate?: boolean;
  tags: string[];
}

const MethodologyCard = ({
  title,
  description,
  icon,
  onClick,
  isTemplate,
  tags,
}: MethodologyCardProps) => (
  <m.div
    whileHover={{ y: -4, scale: 1.01 }}
    onClick={onClick}
    className={cn(
      "relative group cursor-pointer p-8 rounded-[2rem] border transition-all duration-500 flex flex-col h-full bg-white",
      isTemplate
        ? "border-wise-green/30 shadow-xl shadow-wise-green/[0.05]"
        : "border-gray-100 hover:border-wise-green/50 shadow-lg shadow-black/[0.01]",
    )}
  >
    {isTemplate && (
      <div className="absolute top-6 right-6">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-wise-green/10 text-wise-green text-[9px] font-black uppercase tracking-widest border border-wise-green/10">
          <Sparkles className="size-3" />
          Recommended
        </div>
      </div>
    )}

    <div
      className={cn(
        "size-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110",
        isTemplate
          ? "bg-wise-green text-near-black"
          : "bg-gray-50 text-gray-400 group-hover:bg-wise-green/10 group-hover:text-wise-green",
      )}
    >
      {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
        className: "size-6",
      })}
    </div>

    <div className="flex-1 gap-y-3">
      <h3 className="text-[22px] font-black leading-none tracking-tight text-near-black">
        {title}
      </h3>
      <p className="text-[14px] font-medium leading-relaxed text-gray-400">
        {description}
      </p>
    </div>

    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between group-hover:border-wise-green/10 transition-colors">
      <div className="flex gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-gray-50 text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
      <div
        className={cn(
          "size-10 rounded-full flex items-center justify-center transition-all duration-500",
          isTemplate
            ? "bg-near-black text-white"
            : "bg-gray-50 text-gray-300 group-hover:bg-wise-green group-hover:text-near-black",
        )}
      >
        <ArrowRight className="size-4" />
      </div>
    </div>
  </m.div>
);

export default function CreateJobPage() {
  const { push, back } = useRouter();

  return (
    <div className="max-w-5xl mx-auto gap-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => back()}
          className="group flex items-center gap-2 hover:bg-transparent px-0"
        >
          <div className="size-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-wise-green transition-colors">
            <ChevronLeft className="size-4 text-gray-400 group-hover:text-wise-green" />
          </div>
          <span className="text-[12px] font-black text-gray-400 group-hover:text-near-black uppercase tracking-widest">
            Back to Hub
          </span>
        </Button>

        <div className="flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-wise-green animate-pulse" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Deployment System
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center gap-y-3 max-w-xl mx-auto">
        <h1 className="text-[36px] font-black text-near-black leading-none tracking-tight">
          Create <span className="text-wise-green">New Job.</span>
        </h1>
        <p className="text-gray-400 font-medium text-[16px]">
          Choose a methodology to begin sourcing high-performance talent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <MethodologyCard
          title="Manual Configuration"
          description="Build a custom job configuration from the ground up. Best for unique roles and specialized requirements."
          icon={<Plus />}
          tags={["Custom", "Precise"]}
          onClick={() => push("/recruiter/jobs/create/new")}
        />
        <MethodologyCard
          isTemplate
          title="Verified Templates"
          description="Deploy structures from our library. Optimized for speed and consistent high-quality candidate matches."
          icon={<Layout />}
          tags={["Accelerated", "Verified"]}
          onClick={() => push("/recruiter/jobs/create/new?template=true")}
        />
      </div>

      {/* Auxiliary Footer Information */}
      <div className="pt-8 flex flex-col items-center gap-4">
        <div className="h-px w-20 bg-gray-100" />
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-wise-green" />
            <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">
              AI Enhanced
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="size-4 text-wise-green" />
            <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">
              Neural Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
