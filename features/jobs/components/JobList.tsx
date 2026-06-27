"use client";

import { Suspense, useState } from "react";

import { MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";
import { GlobalLoader } from "@/components/shared/global-loader";
import Link from "next/link";
import { useJobList } from "../hooks/use-job-list";
import { JobFilters } from "./JobFilters";
import { JobResultsList } from "./JobResultsList";

export default function JobList() {
  const filters = useJobList();
  const {
    query,
    setQuery,
    location,
    setLocation,
    params,
    sort,
    changeSort,
    activeChips,
    activeFilterCount,
    removeChip,
    resetFilters,
    isPageLoading,
  } = filters;

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  if (isPageLoading) {
    return <GlobalLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Search header */}
        <div className="mb-6 bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full flex items-center bg-gray-50 rounded-2xl px-4 py-3 group focus-within:ring-2 focus-within:ring-wise-green/20 transition-all">
            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-wise-green transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, company, or keywords"
              className="bg-transparent border-none outline-none ml-3 w-full text-[15px] font-medium text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div className="flex-1 w-full flex items-center bg-gray-50 rounded-2xl px-4 py-3 group focus-within:ring-2 focus-within:ring-wise-green/20 transition-all">
            <MapPin className="w-5 h-5 text-gray-400 group-focus-within:text-wise-green transition-colors" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or work type"
              className="bg-transparent border-none outline-none ml-3 w-full text-[15px] font-medium text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden relative w-full md:w-auto h-12 px-6 bg-dark-green text-white rounded-2xl text-[14px] font-black flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
            {activeFilterCount > 0 && (
              <span className="min-w-5 h-5 px-1.5 inline-flex items-center justify-center rounded-full bg-wise-green text-dark-green text-[11px] font-black">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <button
                key={`${chip.group}-${chip.value}`}
                type="button"
                onClick={() => removeChip(chip.group, chip.value)}
                className="group inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-white border border-gray-200 text-[12px] font-bold text-gray-700 hover:border-wise-green transition-colors"
              >
                {chip.label}
                <X className="w-3.5 h-3.5 text-gray-400 group-hover:text-wise-green" />
              </button>
            ))}
            <button
              type="button"
              onClick={resetFilters}
              className="text-[12px] font-bold text-wise-green hover:underline ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Desktop filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="sticky top-28">
              <JobFilters filters={filters} />
            </div>
          </aside>

          <Suspense
            fallback={
              <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-gray-100 border-t-wise-green rounded-full animate-spin" />
                <p className="mt-4 text-sm font-bold text-gray-400">
                  Loading jobs...
                </p>
              </div>
            }
          >
            <JobResultsList
              params={params}
              sort={sort}
              onSortChange={changeSort}
              activeFilterCount={activeFilterCount}
              onResetFilters={resetFilters}
            />
          </Suspense>

          {/* Right widgets */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-dark-green rounded-[2rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-wise-green/10 rounded-bl-full pointer-events-none" />
              <h3 className="text-[20px] font-black mb-4 relative z-10 leading-tight">
                Get matched with AI
              </h3>
              <p className="text-[14px] text-gray-400 font-medium mb-6 relative z-10 leading-relaxed">
                Complete your profile and let our AI matching engine find the
                perfect roles for you.
              </p>
              <Link href="/profile">
                <Button className="w-full bg-wise-green text-dark-green h-12 rounded-xl text-[14px] font-black hover:bg-wise-green/90 transition-all relative z-10">
                  Complete profile
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-dark-green/40 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm bg-gray-50 shadow-2xl overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-[16px] font-black text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <JobFilters filters={filters} />
            <Button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-4 h-12 bg-dark-green text-white rounded-2xl text-[14px] font-black"
            >
              Show results
            </Button>
          </div>
        </div>
      )}

      <LandingFooter />
    </div>
  );
}
