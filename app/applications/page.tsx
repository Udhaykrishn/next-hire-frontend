"use client";

import { Clock, FileText, Search } from "lucide-react";
import { m } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";
import { useAuthContext } from "@/features/auth/context/auth-context";

export default function CandidateApplicationsPage() {
  const { isAuthenticated, role, isLoading } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || role !== "CANDIDATE")) {
      push("/login");
    }
  }, [isLoading, isAuthenticated, role, push]);

  if (isLoading || !isAuthenticated || role !== "CANDIDATE") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
              My Applications
            </h1>
            <p className="text-gray-500 font-medium text-lg">
              Track and manage your job applications across NextHire.
            </p>
          </div>

          {/* Empty State / Coming Soon Mock */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] p-12 border border-gray-100 shadow-xl shadow-[#258265]/5 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            {/* Decorative Background */}
            <div className="absolute -top-24 -right-24 size-64 bg-[#258265]/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="size-24 bg-[#258265]/10 text-[#258265] rounded-full flex items-center justify-center mb-8 relative">
              <FileText className="size-10" />
              <div className="absolute -bottom-2 -right-2 size-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Clock className="size-4 text-gray-400" />
              </div>
            </div>

            <h2 className="text-2xl font-black text-gray-900 mb-4">
              No Applications Yet
            </h2>
            <p className="text-gray-500 font-medium max-w-md mx-auto leading-relaxed mb-8">
              You haven't applied to any jobs yet. Start exploring opportunities
              and your applications will appear here.
            </p>

            <Link
              href="/jobs"
              className="h-14 px-8 rounded-2xl text-[15px] font-black bg-[#258265] text-white hover:bg-[#1f6b53] flex items-center justify-center transition-all shadow-lg shadow-[#258265]/20"
            >
              <Search className="size-4 mr-2" />
              Explore Jobs
            </Link>
          </m.div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
