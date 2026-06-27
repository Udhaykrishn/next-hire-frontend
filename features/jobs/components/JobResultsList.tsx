import { Building, Briefcase, Clock, MapPin, SearchX } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { SORT_OPTIONS } from "../constants/filters";
import { useJobsForCandidateQuery } from "../hooks/use-jobs-query";
import type { SearchJobsParams } from "../types/job.types";

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

interface JobResultsListProps {
  params: SearchJobsParams;
  sort: string;
  onSortChange: (value: string) => void;
  activeFilterCount: number;
  onResetFilters: () => void;
}

export function JobResultsList({
  params,
  sort,
  onSortChange,
  activeFilterCount,
  onResetFilters,
}: JobResultsListProps) {
  const { data: paginationResult } = useJobsForCandidateQuery(params);

  const jobs = paginationResult?.data || [];
  const total = paginationResult?.total ?? jobs.length;

  return (
    <section className="lg:col-span-6 space-y-6">
      <div className="flex items-center justify-between gap-4 mb-4 px-2">
        <p className="text-[14px] text-gray-500 font-medium">
          <span className="text-gray-900 font-bold">{total}</span>{" "}
          {total === 1 ? "job" : "jobs"}
          {activeFilterCount > 0 ? " match your filters" : " available"}
        </p>
        <label className="flex items-center gap-2 shrink-0">
          <span className="text-[14px] text-gray-500 font-medium hidden sm:inline">
            Sort by
          </span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-[14px] font-bold text-gray-900 bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-wise-green/30 appearance-none bg-[length:16px] bg-[right_0.5rem_center] bg-no-repeat"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white p-12 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center mt-6">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <SearchX className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-[20px] font-black text-gray-900 mb-2">
            No jobs found
          </h3>
          <p className="text-[15px] font-medium text-gray-500 max-w-md mb-6">
            {activeFilterCount > 0
              ? "Nothing matches these filters yet. Try removing a few to widen your search."
              : "There are no published jobs right now. Check back soon — new roles are added regularly."}
          </p>
          {activeFilterCount > 0 && (
            <Button
              onClick={onResetFilters}
              className="h-11 px-6 bg-dark-green text-white rounded-xl text-[14px] font-black hover:bg-dark-green/90 transition-all"
            >
              Clear all filters
            </Button>
          )}
        </div>
      ) : (
        jobs.map((job, index) => (
          <motion.div
            key={`${job.id || "job"}-${index}`}
            layout
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
              <div className="w-16 h-16 relative bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-wise-green/10 transition-colors overflow-hidden">
                {job.companyLogo ? (
                  <Image
                    unoptimized
                    src={job.companyLogo}
                    alt={job.hiringCompany}
                    fill
                    className="object-cover"
                  />
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
                </div>

                <div className="flex flex-wrap gap-4 my-4">
                  <div className="flex items-center gap-1.5 text-[12px] font-bold text-gray-400">
                    <MapPin className="w-3.5 h-3.5" /> {job.jobCity || "Remote"}
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
        ))
      )}
    </section>
  );
}
