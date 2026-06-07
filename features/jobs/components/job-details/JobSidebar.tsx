import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  JobWithMatchScore,
  CandidateApplicationResponse,
} from "@/features/jobs/types/job.types";
import { getStatusColor, formatDaysAgo } from "../../utils/job-status.utils";

interface JobSidebarProps {
  job: JobWithMatchScore;
  hasApplied: boolean;
  applicationStatus: string | null;
  existingApplication?: CandidateApplicationResponse;
  isAuthenticated: boolean;
  isCandidate: boolean;
  isProfileComplete: boolean;
  missingFields: string[];
  isApplying: boolean;
  handleApply: () => void;
}

export function JobSidebar({
  job,
  hasApplied,
  applicationStatus,
  existingApplication,
  isAuthenticated,
  isCandidate,
  isProfileComplete,
  missingFields,
  isApplying,
  handleApply,
}: JobSidebarProps) {
  return (
    <aside className="lg:col-span-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2.5rem] p-8 relative overflow-hidden border border-gray-100 shadow-xl shadow-wise-green/5"
      >
        {/* Decorative Background Elements - Light Version */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-wise-green/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10">
          {hasApplied ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">
                  Application Status
                </h3>
                <span
                  className={`px-3 py-1.5 text-[11px] font-black uppercase rounded-full border ${getStatusColor(applicationStatus)}`}
                >
                  {applicationStatus === "HIRED"
                    ? "Hired"
                    : applicationStatus === "REJECTED"
                      ? "Rejected"
                      : applicationStatus === "SHORTLISTED"
                        ? "Shortlisted"
                        : applicationStatus === "INTERVIEWING"
                          ? "Interviewing"
                          : applicationStatus === "REVIEWING"
                            ? "Under Review"
                            : "Applied"}
                </span>
              </div>
              <p className="text-[14px] text-gray-500 font-medium pb-6 border-b border-gray-100 leading-relaxed">
                You submitted your application{" "}
                <strong className="text-gray-900 font-bold">
                  {formatDaysAgo(existingApplication?.application?.createdAt)}
                </strong>
                . We will notify you when the employer updates your status.
              </p>

              <Link
                href="/applications"
                className="w-full h-14 rounded-2xl text-[15px] font-black transition-all flex items-center justify-center gap-2 bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm"
              >
                View All Applications
              </Link>
            </div>
          ) : (
            <>
              {isAuthenticated && isCandidate && !isProfileComplete && (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 mb-6 space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[14px] font-black text-amber-900 leading-tight">
                        Profile Incomplete
                      </h4>
                      <p className="text-[12px] text-amber-700 font-medium leading-normal">
                        You must complete your profile and upload a resume
                        before you can apply to this job.
                      </p>
                    </div>
                  </div>

                  <div className="pl-11 space-y-2">
                    <p className="text-[11px] font-black text-amber-800 uppercase tracking-wider">
                      Missing Fields:
                    </p>
                    <ul className="grid grid-cols-1 gap-1.5">
                      {missingFields.map((field) => (
                        <li
                          key={field}
                          className="flex items-center gap-2 text-[12px] text-amber-700 font-bold"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {field}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pl-11 pt-2">
                    <Link
                      href="/profile"
                      className="inline-flex items-center gap-1.5 text-[12px] font-black text-amber-900 hover:text-black uppercase tracking-wider transition-colors group/link"
                    >
                      Complete Profile Now
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}

              <Button
                onClick={handleApply}
                disabled={isApplying || job.status !== "OPEN"}
                className={`w-full h-14 rounded-2xl text-[15px] font-black transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${
                  job.status !== "OPEN"
                    ? "bg-gray-100 text-gray-500 cursor-default shadow-none pointer-events-none"
                    : "bg-dark-green text-white hover:bg-dark-green/90 shadow-dark-green/20"
                }`}
              >
                {isApplying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Applying...
                  </>
                ) : job.status !== "OPEN" ? (
                  "Job Unavailable"
                ) : (
                  "Apply Now"
                )}
              </Button>
            </>
          )}
        </div>
      </motion.div>

      {/* Safety/Verification Widget */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-wise-green/10 shadow-lg shadow-wise-green/5 relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-wise-green/5 rounded-bl-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-wise-green/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-dark-green" />
            </div>
            <h4 className="text-[14px] font-black text-dark-green uppercase tracking-widest">
              Verified Employer
            </h4>
          </div>
          <p className="text-[13px] text-gray-600 font-medium leading-relaxed mb-6">
            <strong className="text-dark-green">{job.hiringCompany}</strong> has
            a verified presence on Next Hire.
          </p>
        </div>
      </div>
    </aside>
  );
}
