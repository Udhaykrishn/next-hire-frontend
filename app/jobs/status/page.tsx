"use client";

import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";
import { CandidateApplications } from "@/features/jobs/components/CandidateApplications";
import { Suspense } from "react";

export default function JobStatusPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <header className="mb-12">
          <h1 className="text-[32px] font-black text-gray-900 leading-[40px] mb-2">
            My Applications
          </h1>
          <p className="text-[15px] text-gray-500 font-medium">
            Track and manage your active job applications in one place.
          </p>
        </header>

        <Suspense fallback={
          <div className="flex items-center justify-center p-20 text-gray-400 font-bold">
            Loading your applications...
          </div>
        }>
          <CandidateApplications />
        </Suspense>
      </main>

      <LandingFooter />
    </div>
  );
}
