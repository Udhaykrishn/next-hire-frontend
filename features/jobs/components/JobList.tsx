"use client";

import {
  Briefcase,
  Building2,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";
import { GlobalLoader } from "@/components/shared/global-loader";
import { Slider } from "@/components/ui/slider";
import { useJobList } from "../hooks/use-job-list";

const formatSalary = (min: string | undefined, max: string | undefined) => {
  const minVal = parseFloat(min || "0") || 0;
  const maxVal = parseFloat(max || "0") || 0;
  const formatINR = (val: number) => `₹${val.toLocaleString("en-IN")}`;
  if (minVal && maxVal) return `${formatINR(minVal)} – ${formatINR(maxVal)}`;
  if (minVal) return `${formatINR(minVal)}+`;
  if (maxVal) return formatINR(maxVal);
  return "Negotiable";
};

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
};

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return "Recently";
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor(
    Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 7)}w ago`;
};

const EXPERIENCE_OPTIONS = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Director",
];
const JOB_TYPE_OPTIONS = ["Full Time", "Part Time", "Contract", "Internship"];

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 border outline-none focus-visible:ring-2 focus-visible:ring-wise-green/50 ${
        active
          ? "bg-[#e2f6d5] text-[#163300] border-[#9fe870] shadow-sm"
          : "bg-white text-gray-500 border-gray-200 hover:border-[#9fe870] hover:text-[#163300] hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function ActiveFilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#e2f6d5] text-[#163300] text-[11px] font-bold border border-[#9fe870]/30"
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="hover:bg-[#9fe870] rounded p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163300]/20"
      >
        <X className="w-3 h-3" />
      </button>
    </motion.span>
  );
}

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
        {/* ── Search Bar ── */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-2 flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center bg-gray-50/80 rounded-xl px-4 py-3 group focus-within:bg-white focus-within:ring-1 focus-within:ring-wise-green/30 focus-within:shadow-sm transition-all">
              <Search className="w-[18px] h-[18px] text-gray-400 group-focus-within:text-dark-green transition-colors shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, skill, or keyword…"
                className="bg-transparent border-none outline-none ml-3 w-full text-[14px] font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <div className="w-px h-8 bg-gray-100 hidden md:block" />
            <div className="flex-1 flex items-center bg-gray-50/80 rounded-xl px-4 py-3 group focus-within:bg-white focus-within:ring-1 focus-within:ring-wise-green/30 focus-within:shadow-sm transition-all">
              <MapPin className="w-[18px] h-[18px] text-gray-400 group-focus-within:text-dark-green transition-colors shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, state, or remote"
                className="bg-transparent border-none outline-none ml-3 w-full text-[14px] font-medium text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <button className="h-11 px-8 bg-dark-green text-white rounded-xl text-[13px] font-black hover:bg-dark-green/90 transition-all shrink-0 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        {/* ── Active Filters Bar ── */}
        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">
                  Active:
                </span>
                <AnimatePresence mode="popLayout">
                  {selectedExperience.map((exp) => (
                    <ActiveFilterTag
                      key={exp}
                      label={exp}
                      onRemove={() => toggleExperience(exp)}
                    />
                  ))}
                  {(salaryRange[0] > 0 || salaryRange[1] < 2000000) && (
                    <ActiveFilterTag
                      key="salary"
                      label={`₹${(salaryRange[0] / 100000).toFixed(1)}L - ₹${(salaryRange[1] / 100000).toFixed(1)}L`}
                      onRemove={() => setSalaryRange([0, 2000000])}
                    />
                  )}
                  {selectedJobTypes.map((type) => (
                    <ActiveFilterTag
                      key={type}
                      label={type}
                      onRemove={() => toggleJobType(type)}
                    />
                  ))}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] font-bold text-red-400 hover:text-red-500 ml-2 transition-colors"
                >
                  Clear all
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* ── Filters Sidebar ── */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sticky top-28">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-dark-green/5 flex items-center justify-center">
                    <Filter className="w-3.5 h-3.5 text-dark-green" />
                  </div>
                  <span className="text-[13px] font-black text-gray-900 uppercase tracking-wider">
                    Filters
                  </span>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[11px] font-bold text-wise-green hover:text-dark-green transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Experience */}
              <div className="mb-5">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
                  Experience
                </h4>
                <div className="flex flex-wrap gap-2">
                  {EXPERIENCE_OPTIONS.map((exp) => (
                    <FilterPill
                      key={exp}
                      label={exp}
                      active={selectedExperience.includes(exp)}
                      onClick={() => toggleExperience(exp)}
                    />
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 my-4" />

              {/* Salary */}
              <div className="mb-5 px-1">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Salary Range
                  </h4>
                  <span className="text-[12px] font-bold text-dark-green bg-wise-green/10 px-2 py-0.5 rounded-md">
                    ₹{(salaryRange[0] / 100000).toFixed(1)}L - ₹
                    {(salaryRange[1] / 100000).toFixed(1)}L
                  </span>
                </div>
                <div className="px-2">
                  <Slider
                    min={0}
                    max={2000000}
                    step={100000}
                    value={salaryRange}
                    onValueChange={(val) =>
                      setSalaryRange(val as [number, number])
                    }
                    className="w-full"
                  />
                  <div className="flex items-center justify-between mt-3 text-[10px] font-bold text-gray-400">
                    <span>₹0</span>
                    <span>₹20L+</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100 my-4" />

              {/* Job Type */}
              <div>
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
                  Job Type
                </h4>
                <div className="flex flex-wrap gap-2">
                  {JOB_TYPE_OPTIONS.map((type) => (
                    <FilterPill
                      key={type}
                      label={type}
                      active={selectedJobTypes.includes(type)}
                      onClick={() => toggleJobType(type)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>

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
                className={`space-y-4 transition-opacity duration-300 ${
                  isListLoading
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
                    <Link
                      href={`/jobs/${job.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-wise-green/30 transition-all duration-300 group"
                    >
                      <div className="flex gap-4">
                        {/* Company Logo */}
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-wise-green/20 group-hover:bg-wise-green/5 transition-all overflow-hidden">
                          {job.companyLogo ? (
                            <img
                              src={job.companyLogo}
                              alt={job.hiringCompany}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-black text-gray-300 group-hover:text-wise-green transition-colors">
                              {job.hiringCompany?.[0] || "J"}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Title Row */}
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <div className="min-w-0">
                              <h3 className="text-[15px] font-black text-gray-900 group-hover:text-dark-green transition-colors leading-tight truncate">
                                {job.jobTitle}
                              </h3>
                              <p className="text-[13px] font-medium text-gray-400 flex items-center gap-1.5 mt-0.5">
                                <Building2 className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">
                                  {job.hiringCompany}
                                </span>
                              </p>
                            </div>
                            <span className="shrink-0 px-3 py-1 rounded-lg bg-wise-green/10 text-dark-green text-[12px] font-black border border-wise-green/15">
                              {formatSalary(job.minSalary, job.maxSalary)}
                            </span>
                          </div>

                          {/* Meta Row */}
                          <div className="flex items-center gap-4 mt-3 mb-3">
                            <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                              <MapPin className="w-3 h-3" />
                              {job.jobCity || "Remote"}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                              <Briefcase className="w-3 h-3" />
                              {job.jobType}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                              <Clock className="w-3 h-3" />
                              {formatDate(job.created_at)}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-[13px] text-gray-500 font-medium leading-relaxed line-clamp-2 mb-3">
                            {stripHtml(
                              job.description || job.jobDescription || "",
                            )}
                          </p>

                          {/* Skills + CTA */}
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1.5 overflow-hidden">
                              {(job.skills || []).slice(0, 3).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2.5 py-0.5 rounded-md bg-gray-50 text-[10px] font-bold text-gray-500 border border-gray-100 truncate max-w-[100px]"
                                >
                                  {skill}
                                </span>
                              ))}
                              {(job.skills || []).length > 3 && (
                                <span className="px-2 py-0.5 text-[10px] font-bold text-gray-400">
                                  +{(job.skills || []).length - 3}
                                </span>
                              )}
                            </div>
                            <span className="flex items-center gap-1 text-[12px] font-bold text-dark-green opacity-0 group-hover:opacity-100 transition-opacity">
                              View Details
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
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
