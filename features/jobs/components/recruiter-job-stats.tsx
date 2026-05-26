import { useQuery } from "@tanstack/react-query";
import { Database } from "lucide-react";
import { adminService } from "@/features/admin/services/admin.api";

export function RecruiterJobStats({ jobId }: { jobId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["jobStats", jobId],
    queryFn: () => adminService.getJobStats(jobId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-10 md:border-x border-gray-100 md:px-10 h-16 opacity-50">
        <div className="flex flex-col items-center">
          <span className="text-[18px] font-black text-gray-200 leading-none">
            -
          </span>
          <span className="text-[10px] font-bold text-gray-400 mt-1.5 text-center leading-tight">
            Applied
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 leading-none">
            <span className="text-[18px] font-black text-gray-200">-</span>
            <Database className="size-3.5 text-gray-200" />
          </div>
          <span className="text-[10px] font-bold text-gray-400 mt-1.5 text-center leading-tight">
            Matches
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-10 md:border-x border-gray-100 md:px-10 h-16">
      <div className="flex flex-col items-center">
        <span className="text-[18px] font-black text-near-black leading-none">
          {data?.total || 0}
        </span>
        <span className="text-[10px] font-bold text-gray-400 mt-1.5 text-center leading-tight">
          Applied
        </span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 leading-none">
          <span className="text-[18px] font-black text-near-black">
            {data?.interviews || 0}
          </span>
          <Database className="size-3.5 text-wise-green" />
        </div>
        <span className="text-[10px] font-bold text-wise-green mt-1.5 text-center leading-tight">
          Shortlisted
        </span>
      </div>
    </div>
  );
}
