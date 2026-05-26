"use client";

import { ChevronLeft } from "lucide-react";
import { LazyMotion, m, domAnimation } from "motion/react";
import Link from "next/link";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";

interface FormPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const FormPageLayout = ({
  title,
  subtitle,
  children,
}: FormPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 max-w-[640px] mx-auto w-full">
        <div className="mb-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-[13px] font-black text-gray-400 hover:text-wise-green transition-colors group"
          >
            <div className="size-9 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:border-wise-green group-hover:bg-wise-green/5 transition-all">
              <ChevronLeft className="size-4" />
            </div>
            Back to Profile
          </Link>
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-10 shadow-sm"
        >
          <div className="mb-8">
            <h1 className="text-[24px] md:text-[26px] font-black text-gray-900 tracking-tight leading-tight mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[14px] font-bold text-gray-500/80 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </m.div>
      </main>

      <LandingFooter />
    </div>
  );
};
