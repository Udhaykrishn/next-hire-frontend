"use client";

import {
  Briefcase,
  Building,
  ChevronDown,
  Clock,
  Filter,
  MapPin,
  Search,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/animate-ui/components/base/accordion";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";
import { useJobList } from "../hooks/use-job-list";

const formatSalary = (min: string | undefined, max: string | undefined) => {
  const minVal = parseFloat(min || "0") || 0;
  const maxVal = parseFloat(max || "0") || 0;
  const formatINR = (val: number) => `₹${val.toLocaleString("en-IN")}`;

  if (minVal && maxVal) {
    return `${formatINR(minVal)} - ${formatINR(maxVal)}`;
  }
  if (minVal) {
    return `${formatINR(minVal)}+`;
  }
  if (maxVal) {
    return formatINR(maxVal);
  }
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
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

export default function JobList() {
  const {
    query,
    setQuery,
    location,
    setLocation,
    selectedExperience,
    selectedSalary,
    selectedJobTypes,
    toggleExperience,
    toggleSalary,
    toggleJobType,
    resetFilters,
    jobs,
  } = useJobList();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Search Header */}
        <div className="mb-10 bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 flex items-center bg-gray-50 rounded-2xl px-4 py-3 group focus-within:ring-2 focus-within:ring-wise-green/20 transition-all">
            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-wise-green transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title or keywords"
              className="bg-transparent border-none outline-none ml-3 w-full text-[15px] font-medium text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div className="flex-1 flex items-center bg-gray-50 rounded-2xl px-4 py-3 group focus-within:ring-2 focus-within:ring-wise-green/20 transition-all">
            <MapPin className="w-5 h-5 text-gray-400 group-focus-within:text-wise-green transition-colors" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or remote"
              className="bg-transparent border-none outline-none ml-3 w-full text-[15px] font-medium text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <Button className="h-12 px-10 bg-wise-green text-dark-green rounded-2xl text-[15px] font-black hover:bg-wise-green/90 transition-all shadow-md shadow-wise-green/20">
            Search Jobs
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Filters (20%) */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[16px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <Filter className="w-4 h-4 text-wise-green" /> Filters
                </h2>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[12px] font-bold text-wise-green hover:underline"
                >
                  Reset All
                </button>
              </div>

              <Accordion className="space-y-4">
                <AccordionItem value="experience" className="border-none">
                  <AccordionTrigger className="px-0 py-2 hover:no-underline font-bold text-[15px] text-gray-900">
                    Experience
                  </AccordionTrigger>
                  <AccordionPanel className="pt-2 pb-4 space-y-3">
                    {[
                      "Entry Level",
                      "Mid Level",
                      "Senior Level",
                      "Director",
                    ].map((exp) => (
                      <label
                        key={exp}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedExperience.includes(exp)}
                          onChange={() => toggleExperience(exp)}
                          className="w-4 h-4 rounded border-gray-200 text-wise-green focus:ring-wise-green/20"
                        />
                        <span className="text-[14px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                          {exp}
                        </span>
                      </label>
                    ))}
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem value="salary" className="border-none">
                  <AccordionTrigger className="px-0 py-2 hover:no-underline font-bold text-[15px] text-gray-900">
                    Salary Range
                  </AccordionTrigger>
                  <AccordionPanel className="pt-2 pb-4 space-y-3">
                    {[
                      "₹0 - ₹3L",
                      "₹3L - ₹5L",
                      "₹5L - ₹10L",
                      "₹10L+",
                    ].map((sal) => (
                      <label
                        key={sal}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSalary.includes(sal)}
                          onChange={() => toggleSalary(sal)}
                          className="w-4 h-4 rounded border-gray-200 text-wise-green focus:ring-wise-green/20"
                        />
                        <span className="text-[14px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                          {sal}
                        </span>
                      </label>
                    ))}
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem value="job-type" className="border-none">
                  <AccordionTrigger className="px-0 py-2 hover:no-underline font-bold text-[15px] text-gray-900">
                    Job Type
                  </AccordionTrigger>
                  <AccordionPanel className="pt-2 pb-4 space-y-3">
                    {[
                      "Full-time",
                      "Part-time",
                      "Contract",
                      "Freelance",
                      "Internship",
                    ].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedJobTypes.includes(type)}
                          onChange={() => toggleJobType(type)}
                          className="w-4 h-4 rounded border-gray-200 text-wise-green focus:ring-wise-green/20"
                        />
                        <span className="text-[14px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </aside>

          <section className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between mb-4 px-2">
              <p className="text-[14px] text-gray-500 font-medium">
                Showing{" "}
                <span className="text-gray-900 font-bold">{jobs.length}</span>{" "}
                jobs matching your search
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-gray-500 font-medium">
                  Sort by:
                </span>
                <button className="text-[14px] font-bold text-gray-900 flex items-center gap-1">
                  Relevance <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-wise-green/30 transition-all group relative"
              >
                <Link
                  href={`/jobs/${job.id}`}
                  className="absolute inset-0 z-0"
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <div className="flex gap-5 relative z-10 pointer-events-none">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-wise-green/10 transition-colors overflow-hidden">
                    {job.companyLogo ? (
                      <img src={job.companyLogo} alt={job.hiringCompany} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-black text-gray-400 group-hover:text-wise-green transition-colors">
                        {job.hiringCompany?.[0] || "J"}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-[18px] font-black text-gray-900 group-hover:text-wise-green transition-colors leading-tight">
                          {job.jobTitle}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-[14px] font-bold text-gray-500 flex items-center gap-1 hover:text-wise-green transition-colors cursor-pointer pointer-events-auto">
                            <Building className="w-4 h-4" /> {job.hiringCompany}
                          </p>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <p className="text-[14px] font-black text-dark-green bg-wise-green/10 px-2 py-0.5 rounded-lg border border-wise-green/10">
                            {formatSalary(job.minSalary, job.maxSalary)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 relative z-10 pointer-events-auto">
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-wise-green text-dark-green text-[11px] font-black shadow-sm shadow-wise-green/20">
                            <Zap className="w-3 h-3 fill-current" />{" "}
                            {job.matchScore !== undefined ? job.matchScore : 0}%
                            Match
                          </div>
                        </div>
                        <button className="text-gray-300 hover:text-wise-green transition-colors">
                          <Star className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 my-4">
                      <div className="flex items-center gap-1.5 text-[12px] font-bold text-gray-400">
                        <MapPin className="w-3.5 h-3.5" />{" "}
                        {job.jobCity || "Remote"}
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] font-bold text-gray-400">
                        <Briefcase className="w-3.5 h-3.5" /> {job.jobType}
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] font-bold text-gray-400">
                        <Clock className="w-3.5 h-3.5" />{" "}
                        {formatDate(job.created_at)}
                      </div>
                    </div>

                    <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-6 line-clamp-2">
                      {stripHtml(job.description || job.jobDescription || "")}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {(job.skills || []).slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full bg-gray-50 text-[11px] font-bold text-gray-500 border border-gray-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Button className="h-10 px-6 bg-dark-green text-white rounded-xl text-[13px] font-black hover:bg-dark-green/90 transition-all pointer-events-auto">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Right Widget (25%) */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-dark-green rounded-[2rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-wise-green/10 rounded-bl-full pointer-events-none" />
              <h3 className="text-[20px] font-black mb-4 relative z-10 leading-tight">
                Get Matched with AI
              </h3>
              <p className="text-[14px] text-gray-400 font-medium mb-6 relative z-10 leading-relaxed">
                Complete your profile and let our AI matching engine find the
                perfect roles for you.
              </p>
              <Link href="/profile">
                <Button className="w-full bg-wise-green text-dark-green h-12 rounded-xl text-[14px] font-black hover:bg-wise-green/90 transition-all relative z-10">
                  Complete Profile
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
              <h3 className="text-[16px] font-black text-gray-900 mb-6 uppercase tracking-widest">
                Top Companies
              </h3>
              <div className="space-y-4">
                {["Google", "Microsoft", "Amazon", "Meta"].map((comp) => (
                  <div
                    key={comp}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-black text-gray-400">
                        {comp[0]}
                      </div>
                      <span className="text-[14px] font-bold text-gray-900">
                        {comp}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-300 -rotate-90" />
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
