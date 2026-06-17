import { Building, Briefcase, Clock, MapPin, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { useJobsForCandidateQuery } from "../hooks/use-jobs-query";

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
  search: string;
  location: string;
  experience: string[];
  salary: string[];
  jobTypes: string[];
}

export function JobResultsList({
  search,
  location,
  experience,
  salary,
  jobTypes,
}: JobResultsListProps) {
  const { data: paginationResult } = useJobsForCandidateQuery({
    search,
    location,
    experience,
    salary,
    jobTypes,
  });

  const jobs = paginationResult?.data || [];

  return (
    <section className="lg:col-span-6 space-y-6">
      <div className="flex items-center justify-between mb-4 px-2">
        <p className="text-[14px] text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-bold">{jobs.length}</span>{" "}
          jobs matching your search
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-gray-500 font-medium">
            Sort by:
          </span>
          <button
            type="button"
            className="text-[14px] font-bold text-gray-900 flex items-center gap-1"
          >
            Relevance <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {jobs.map((job, index) => (
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
                  <Clock className="w-3.5 h-3.5" /> {formatDate(job.created_at)}
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
  );
}
