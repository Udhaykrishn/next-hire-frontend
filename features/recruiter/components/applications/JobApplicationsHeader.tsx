import { formatDistanceToNow, parseISO } from "date-fns";
import { ArrowLeft, Briefcase, Clock, IndianRupee, MapPin } from "lucide-react";
import type { BackendJob } from "@/features/admin/types/admin.types";

interface JobApplicationsHeaderProps {
  job: BackendJob | null | undefined;
  isJobLoading: boolean;
  onBackClick: () => void;
}

export function JobApplicationsHeader({
  job,
  isJobLoading,
  onBackClick,
}: JobApplicationsHeaderProps) {
  return (
    <div className="flex flex-col gap-5 pt-2">
      <button
        type="button"
        onClick={onBackClick}
        className="group flex items-center gap-2 w-fit text-[14px] font-[500] text-[#868685] hover:text-[#0e0f0c] transition-colors"
      >
        <div className="flex items-center justify-center size-8 rounded-full bg-[#e8ebe6] group-hover:bg-[#cdffad] transition-colors">
          <ArrowLeft className="size-4" />
        </div>
        Back to Dashboard
      </button>

      <div className="bg-[#ffffff] p-[24px] md:p-[32px] rounded-[16px] border border-[rgba(14,15,12,0.12)] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 size-64 bg-gradient-to-br from-[#9fe870]/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#163300]/[0.08] text-[#0e0f0c] font-[600] text-[12px]">
              <Briefcase className="size-3.5" /> Job Context
            </div>

            {isJobLoading ? (
              <div className="space-y-3">
                <div className="h-8 w-64 bg-[#e8ebe6] rounded animate-pulse" />
                <div className="h-4 w-96 bg-[#e8ebe6] rounded animate-pulse" />
              </div>
            ) : job ? (
              <>
                <h1 className="text-[32px] font-[800] text-[#0e0f0c] leading-[40px]">
                  {job.jobTitle || "Untitled Job"}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-[14px] font-[500] text-[#454745]">
                  {job.locationType && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4 text-[#868685]" />{" "}
                      {job.locationType}
                    </span>
                  )}
                  {job.jobType && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-4 text-[#868685]" /> {job.jobType}
                    </span>
                  )}
                  {(job.minSalary || job.maxSalary) && (
                    <span className="flex items-center gap-1.5">
                      <IndianRupee className="size-4 text-[#868685]" />
                      {job.minSalary && job.maxSalary
                        ? `₹${job.minSalary} - ₹${job.maxSalary}`
                        : "Negotiable"}
                    </span>
                  )}
                  {job.createdAt && (
                    <span className="flex items-center gap-1.5 text-[#868685] border-l border-[rgba(14,15,12,0.12)] pl-4">
                      Posted{" "}
                      {formatDistanceToNow(parseISO(job.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="text-[#868685]">Job information unavailable</div>
            )}
          </div>

          <div className="flex flex-col gap-2 min-w-[140px]">
            <div className="text-[12px] font-[500] text-[#868685] uppercase tracking-wider mb-1">
              Status
            </div>
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#054d28]/10 text-[#054d28] font-[600] border border-[#054d28]/20 text-[14px]">
              <div className="size-2 rounded-full bg-[#054d28]" />
              Active & Accepting
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
