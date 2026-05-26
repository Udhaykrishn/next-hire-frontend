import {
  Briefcase,
  Building2,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { JobResponse } from "@/features/jobs/types/job.types";

const formatSalary = (
  min: number | string | undefined,
  max: number | string | undefined,
) => {
  const minVal = Number(min) || 0;
  const maxVal = Number(max) || 0;
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

interface JobCardProps {
  job: JobResponse;
}

export function JobCard({ job }: JobCardProps) {
  return (
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
            <Image
              src={job.companyLogo}
              alt={job.hiringCompany}
              width={48}
              height={48}
              unoptimized
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
                <span className="truncate">{job.hiringCompany}</span>
              </p>
            </div>
            <span className="shrink-0 px-3 py-1 rounded-lg bg-wise-green/10 text-dark-green text-[12px] font-black border border-wise-green/15">
              {formatSalary(
                job.minSalary as number | string,
                job.maxSalary as number | string,
              )}
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
            {stripHtml(job.description || job.jobDescription || "")}
          </p>

          {/* Skills + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 overflow-hidden">
              {(job.skills || []).slice(0, 3).map((skill: string) => (
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
  );
}
