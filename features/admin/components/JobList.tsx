"use client";

import { Ban, Briefcase, Eye, Filter, Search, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { Pagination } from "@/components/shared/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatSalaryAmount } from "@/lib/salary";
import { cn } from "@/lib/utils";
import { useAdminJobs } from "../hooks/use-admin-jobs";
import type { AdminJobDetail } from "../types/admin.types";

export const JobList = () => {
  const router = useRouter();
  const {
    jobs,
    total,
    searchQuery,
    setSearchQuery,
    selectedStatuses,
    handleStatusToggle,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleConfirmBlock,
    isPending,
  } = useAdminJobs();

  const [selectedJob, setSelectedJob] = useState<AdminJobDetail | null>(null);
  const [dialogType, setDialogType] = useState<"block" | "unblock" | null>(
    null,
  );

  const totalPages = Math.ceil(total / itemsPerPage);

  const handleAction = (
    job: AdminJobDetail,
    action: "block" | "unblock" | "details",
  ) => {
    if (action === "details") {
      router.push(`/admin/jobs/${job.id}`);
      return;
    }
    setSelectedJob(job);
    setDialogType(action);
  };

  const closeDialog = () => {
    setSelectedJob(null);
    setDialogType(null);
  };

  const handleConfirmAction = () => {
    if (selectedJob) {
      handleConfirmBlock(selectedJob.id);
    }
    closeDialog();
  };

  if (isPending) {
    return (
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-8 text-center">
          <div className="w-8 h-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Loading job listings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-wise-green transition-colors" />
          <input
            type="text"
            placeholder="Search by job title, hiring company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-wise-green/20 focus:border-wise-green transition-all outline-none"
          />
        </div>
        <Popover>
          <PopoverTrigger className="h-14 px-6 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-near-black">
            <Filter className="w-4 h-4" />
            Advanced Filters
            {selectedStatuses.length > 0 && (
              <span className="w-5 h-5 bg-wise-green text-near-black rounded-full flex items-center justify-center text-[8px]">
                {selectedStatuses.length}
              </span>
            )}
          </PopoverTrigger>
          <PopoverContent
            className="w-64 p-6 rounded-[2rem] border-gray-100 shadow-2xl bg-white"
            align="end"
          >
            <h4 className="text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-4 ml-1">
              Filter by Status
            </h4>
            <div className="space-y-3">
              {["OPEN", "BLOCKED"].map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    onClick={() => handleStatusToggle(status)}
                    className={cn(
                      "w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center",
                      selectedStatuses.includes(status)
                        ? "bg-near-black border-near-black"
                        : "border-gray-200 group-hover:border-wise-green",
                    )}
                  >
                    {selectedStatuses.includes(status) && (
                      <div className="w-2 h-2 rounded-sm bg-wise-green" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-near-black uppercase tracking-widest">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm shadow-gray-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Job Title
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Company
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Salary Range
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Posted Date
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Expires On
                </th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs.map((job: AdminJobDetail) => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-near-black font-black group-hover:bg-wise-green group-hover:text-dark-green transition-all">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-near-black text-[14px]">
                          {job.jobTitle}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">
                          {job.jobType} • {job.locationType}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[14px] font-bold text-near-black">
                    {job.hiringCompany}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-bold">
                      {formatSalaryAmount(job.minSalary, "INR", "full")} -{" "}
                      {formatSalaryAmount(job.maxSalary, "INR", "full")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider",
                        job.status === "OPEN"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700",
                      )}
                    >
                      {job.status === "OPEN" ? "Active" : "Scam / Blocked"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-400">
                    {job.posted}
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-400">
                    {job.expireIn}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleAction(job, "details")}
                        className="p-2 text-gray-400 hover:text-wise-green hover:bg-wise-green/10 rounded-xl transition-all outline-none"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {job.status === "OPEN" ? (
                        <button
                          type="button"
                          onClick={() => handleAction(job, "block")}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all outline-none"
                          title="Flag as Threat / Scam"
                        >
                          <Ban className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAction(job, "unblock")}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all outline-none"
                          title="Activate Job Post"
                        >
                          <Unlock className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <ConfirmationModal
        isOpen={dialogType === "block"}
        onClose={closeDialog}
        title="Flag Job as Threat / Scam?"
        description={`Are you sure you want to block "${selectedJob?.jobTitle}"? This will hide the post from candidates.`}
        onConfirm={handleConfirmAction}
        variant="destructive"
        confirmText="Confirm Block"
      />

      <ConfirmationModal
        isOpen={dialogType === "unblock"}
        onClose={closeDialog}
        title="Activate Job Listing?"
        description={`Are you sure you want to reactivate the job post "${selectedJob?.jobTitle}"?`}
        onConfirm={handleConfirmAction}
        variant="success"
        confirmText="Activate"
      />
    </div>
  );
};
