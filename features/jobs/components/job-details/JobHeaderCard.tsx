import {
  Building,
  CheckCircle,
  Clock,
  DollarSign,
  Loader2,
  MapPin,
  Share2,
  Target,
} from "lucide-react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import type { JobWithMatchScore } from "@/features/jobs/types/job.types";

interface JobHeaderCardProps {
  job: JobWithMatchScore;
  formattedSalary: string;
  isApplying: boolean;
  hasApplied: boolean;
  handleApply: () => void;
  handleShare: () => void;
}

export function JobHeaderCard({
  job,
  formattedSalary,
  isApplying,
  hasApplied,
  handleApply,
  handleShare,
}: JobHeaderCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
      <div className="flex gap-4 md:gap-6 mb-6">
        <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-bold text-2xl text-gray-500 shadow-sm shrink-0">
          {job.hiringCompany?.[0] || "C"}
        </div>
        <div>
          <h1 className="text-[22px] font-bold text-gray-900 mb-1 leading-tight">
            {job.jobTitle}
          </h1>
          <p className="text-[15px] text-gray-500 font-medium">
            {job.hiringCompany}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-gray-600 text-[14px]">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{job.jobCity || "Remote"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-[14px]">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span>{formattedSalary}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded text-[13px] font-medium border border-gray-100">
          <Building className="w-3.5 h-3.5 text-gray-400" />
          Office
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded text-[13px] font-medium border border-gray-100">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          {job.jobType}
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded text-[13px] font-medium border border-gray-100">
          <Target className="w-3.5 h-3.5 text-gray-400" />
          {job.minExperience ? `Min. ${job.minExperience} year(s)` : "Fresher"}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 lg:flex">
        <Button
          onClick={handleApply}
          disabled={isApplying || hasApplied || job.status !== "OPEN"}
          className={`flex-1 h-12 rounded-lg text-[15px] font-semibold transition-all flex items-center justify-center gap-2 ${
            hasApplied || job.status !== "OPEN"
              ? "bg-gray-100 text-gray-500 cursor-default"
              : "bg-dark-green text-white hover:bg-dark-green/90"
          }`}
        >
          {isApplying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Applying...
            </>
          ) : hasApplied ? (
            <>
              <CheckCircle className="w-4 h-4" /> Applied
            </>
          ) : job.status !== "OPEN" ? (
            "Job Unavailable"
          ) : (
            "Apply on NextHire"
          )}
        </Button>
        <button
          onClick={handleShare}
          className="h-12 px-6 rounded-lg border border-dark-green text-dark-green font-medium flex items-center justify-center gap-2 hover:bg-dark-green/5 transition-colors"
        >
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>
    </div>
  );
}
