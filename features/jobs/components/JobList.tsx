"use client";

import { ChevronRight, Search, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";
import { GlobalLoader } from "@/components/shared/global-loader";
import { useJobList } from "../hooks/use-job-list";

import { JobCard } from "./job-list/JobCard";
import { JobSearchBar } from "./job-list/JobSearchBar";
import { JobActiveFilters } from "./job-list/JobActiveFilters";
import { JobFiltersSidebar } from "./job-list/JobFiltersSidebar";
import Link from "next/link";

export default function JobList() {
  const {
    query,
    setQuery,
    location,
    setLocation,
    selectedExperience,
    salaryRange,
    setSalaryRange,
    selectedJobTypes,
    sort,
    setSort,
    toggleExperience,
    toggleJobType,
    resetFilters,
    jobs,
    isPageLoading,
    isListLoading,
  } = useJobList();

  const activeFilterCount =
    selectedExperience.length +
    (salaryRange[0] > 0 || salaryRange[1] < 2000000 ? 1 : 0) +
    selectedJobTypes.length;

  if (isPageLoading) {
    return <GlobalLoader />;
  }

  return (
    <div className="min-h-screen bg-[#FAFBF9] flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-28 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto w-full">
        <JobSearchBar
          query={query}
          setQuery={setQuery}
          location={location}
          setLocation={setLocation}
        />

        <JobActiveFilters
          activeFilterCount={activeFilterCount}
          resetFilters={resetFilters}
          selectedExperience={selectedExperience}
          toggleExperience={toggleExperience}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
          selectedJobTypes={selectedJobTypes}
          toggleJobType={toggleJobType}
        />

        <div className="grid lg:grid-cols-12 gap-6">
          <JobFiltersSidebar
            activeFilterCount={activeFilterCount}
            resetFilters={resetFilters}
            selectedExperience={selectedExperience}
            toggleExperience={toggleExperience}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
            selectedJobTypes={selectedJobTypes}
            toggleJobType={toggleJobType}
          />

          {/* ── Job Listings ── */}
          <section className="lg:col-span-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 px-1 gap-4">
              <p className="text-[13px] text-gray-400 font-medium">
                <span className="text-gray-900 font-bold">{jobs.length}</span>{" "}
                {jobs.length === 1 ? "job" : "jobs"} found
              </p>

              <div className="flex items-center gap-2">
                <span className="text-[12px] text-gray-500 font-medium">
                  Sort by:
                </span>
                <div className="relative group/sort">
                  <button className="text-[13px] font-bold text-gray-900 flex items-center gap-1 hover:text-dark-green transition-colors">
                    {sort}{" "}
                    <ChevronRight className="w-3.5 h-3.5 group-hover/sort:rotate-90 transition-transform" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl shadow-gray-200/50 opacity-0 invisible group-hover/sort:opacity-100 group-hover/sort:visible transition-all duration-200 py-2 z-50">
                    {["Relevance", "Newest", "Salary (High to Low)"].map(
                      (opt) => (
                        <button
                          key={opt}
                          onClick={() => setSort(opt)}
                          className={`w-full text-left px-4 py-2 text-[12px] font-bold hover:bg-gray-50 transition-colors ${sort === opt ? "text-wise-green" : "text-gray-600"}`}
                        >
                          {opt}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-h-[300px]">
              {isListLoading && (
                <div className="absolute inset-0 z-10 rounded-2xl">
                  <GlobalLoader fullScreen={false} className="min-h-[300px]" />
                </div>
              )}
              <div
                className={`space-y-4 transition-opacity duration-300 ${isListLoading
                  ? "opacity-30 pointer-events-none"
                  : "opacity-100"
                  }`}
              >
                {jobs.map((job, index) => (
                  <motion.div
                    key={`${job.id || "job"}-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.35 }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}

                {jobs.length === 0 && !isListLoading && (
                  <div className="text-center py-24">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                      <Search className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-bold text-[14px] mb-1">
                      No jobs found
                    </p>
                    <p className="text-gray-400 font-medium text-[13px]">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ── Right Sidebar ── */}
          <aside className="lg:col-span-3 space-y-5">
            {/* AI Matching Card */}
            <div className="bg-dark-green rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-wise-green/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-wise-green/5 rounded-tr-full pointer-events-none" />
              <div className="relative z-10">
                <div className="w-9 h-9 rounded-xl bg-wise-green/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-4.5 h-4.5 text-wise-green" />
                </div>
                <h3 className="text-[16px] font-black mb-2 leading-tight">
                  AI-Powered Matching
                </h3>
                <p className="text-[13px] text-gray-400 font-medium mb-5 leading-relaxed">
                  Complete your profile and let our engine find the best-fit
                  roles for you.
                </p>
                <Link
                  href="/profile"
                  className="block w-full bg-wise-green text-dark-green h-10 rounded-xl text-[13px] font-black hover:bg-wise-green/90 transition-all text-center leading-10"
                >
                  Complete Profile
                </Link>
              </div>
            </div>

            {/* Trending Companies */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
                Trending Companies
              </h3>
              <div className="space-y-2">
                {["Google", "Microsoft", "Amazon", "Meta"].map((comp) => (
                  <div
                    key={comp}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 group-hover:border-wise-green/20 transition-colors">
                        <span className="text-[13px] font-black text-gray-400 group-hover:text-dark-green transition-colors">
                          {comp[0]}
                        </span>
                      </div>
                      <span className="text-[13px] font-bold text-gray-700">
                        {comp}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-wise-green transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
