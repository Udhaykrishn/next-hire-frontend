import { Building, ChevronRight, IndianRupee, MoreVertical } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatSalaryRange } from "@/lib/salary";
import { CandidateApplicationResponse } from "../../types/job.types";
import { getStatusConfig } from "../../utils/application-status.utils";

interface CandidateApplicationCardProps {
  applicationData: CandidateApplicationResponse;
  index: number;
}

export function CandidateApplicationCard({ applicationData, index }: CandidateApplicationCardProps) {
  const router = useRouter();
  const { application, job } = applicationData;
  const statusConfig = getStatusConfig(application.status);
  
  const appliedDate = new Date(application.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  
  const salaryStr = formatSalaryRange(
    job.minSalary,
    job.maxSalary,
    "INR",
    job.payType,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.05, duration: 0.4, ease: "easeOut" }}
      className="group bg-white border border-gray-200/60 hover:border-wise-green/40 rounded-[24px] p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-wise-green/5 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
    >
      {/* Left: Company Logo & Details */}
      <div className="flex items-center gap-5 flex-1 min-w-0">
        <div className="w-16 h-16 shrink-0 bg-gray-50/80 rounded-2xl flex items-center justify-center font-black text-xl text-gray-400 border border-gray-100 group-hover:bg-wise-green/10 group-hover:text-wise-green transition-colors duration-300 uppercase shadow-sm">
          {job.hiringCompany?.[0] || job.jobTitle?.[0] || "?"}
        </div>
        <div className="min-w-0">
          <Link
            href={`/jobs/${job.id}`}
            className="hover:underline hover:text-wise-green transition-colors outline-none focus-visible:ring-2 focus-visible:ring-wise-green focus-visible:ring-offset-2 rounded"
          >
            <h4 className="text-[17px] font-black text-gray-900 truncate mb-1.5 tracking-tight group-hover:text-wise-green transition-colors">
              {job.jobTitle}
            </h4>
          </Link>
          <p className="text-[13px] font-bold text-gray-500 flex items-center gap-1.5 truncate">
            <Building className="w-3.5 h-3.5 shrink-0 opacity-70" />
            {job.hiringCompany || "Unknown"}
          </p>
        </div>
      </div>

      {/* Middle: Details (Date & Salary) */}
      <div className="flex items-center gap-8 md:gap-14 flex-1 md:justify-end">
        <div className="hidden sm:block">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">
            Applied On
          </p>
          <p className="text-[14px] font-bold text-gray-800">
            {appliedDate}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">
            Salary
          </p>
          <p className="text-[14px] font-bold text-gray-800 flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5 text-gray-400 group-hover:text-wise-green transition-colors" />
            {salaryStr}
          </p>
        </div>
      </div>

      {/* Right: Status & Action */}
      <div className="flex items-center justify-between w-full md:w-auto gap-5 shrink-0">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[12px] font-black uppercase tracking-wider shadow-sm border border-transparent ${statusConfig.color}`}
        >
          <div className="scale-90">{statusConfig.icon}</div>
          {statusConfig.label}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="p-2.5 bg-white border border-gray-200/60 hover:bg-gray-50 hover:border-gray-300 rounded-xl transition-all duration-300 outline-none focus:ring-2 focus:ring-wise-green/50 flex items-center justify-center text-gray-400 hover:text-gray-600 shadow-sm"
            >
              <MoreVertical className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl p-1.5 font-satoshi shadow-xl shadow-gray-900/10 border-gray-100"
            >
              <DropdownMenuLabel className="text-[11px] text-gray-400 font-bold uppercase tracking-widest px-2.5 py-2">
                Application Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-100/50 my-1" />
              <DropdownMenuItem
                onClick={() => router.push(`/jobs/${job.id}`)}
                className="rounded-lg cursor-pointer hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900 w-full flex items-center text-[13px] font-medium py-2"
              >
                View Job Details
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-red-50 focus:bg-red-50 focus:text-red-700 text-red-600 font-medium text-[13px] py-2">
                Withdraw Application
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={`/jobs/${job.id}`} passHref>
            <button
              type="button"
              className="w-[42px] h-[42px] flex items-center justify-center bg-gray-900 text-white hover:bg-wise-green hover:text-dark-green rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-wise-green/20 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-wise-green focus-visible:ring-offset-2 group/btn"
            >
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
