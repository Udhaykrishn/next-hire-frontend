"use client";

import {
  Briefcase,
  Clock,
  DollarSign,
  Eye,
  Filter,
  ListChecks,
  MapPin,
  MoreHorizontal,
  Search,
  Ban,
  Unlock,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from "@/components/animate-ui/components/headless/dialog";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { Pagination } from "@/components/shared/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAdminJobs } from "../hooks/use-admin-jobs";
import type { AdminJobDetail } from "../types/admin.types";

export const JobList = () => {
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
  const [dialogType, setDialogType] = useState<
    "block" | "unblock" | "details" | null
  >(null);

  const totalPages = Math.ceil(total / itemsPerPage);

  const handleAction = (
    job: AdminJobDetail,
    action: "block" | "unblock" | "details",
  ) => {
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
          <PopoverTrigger
            className="h-14 px-6 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-near-black"
          >
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
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      {job.minSalary} - {job.maxSalary}
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
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-xl transition-all outline-none">
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 p-2 rounded-2xl shadow-xl border-gray-100 bg-white"
                      >
                        <DropdownMenuItem
                          onClick={() => handleAction(job, "details")}
                          className="rounded-xl font-bold text-sm cursor-pointer p-3 focus:bg-gray-50 focus:text-near-black"
                        >
                          View Details
                        </DropdownMenuItem>
                        {job.status === "OPEN" ? (
                          <DropdownMenuItem
                            onClick={() => handleAction(job, "block")}
                            className="rounded-xl font-bold text-sm cursor-pointer p-3 text-red-600 focus:bg-red-50 focus:text-red-700"
                          >
                            <Ban className="w-4 h-4 mr-2" />
                            Flag as Threat / Scam
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleAction(job, "unblock")}
                            className="rounded-xl font-bold text-sm cursor-pointer p-3 text-green-600 focus:bg-green-50 focus:text-green-700"
                          >
                            <Unlock className="w-4 h-4 mr-2" />
                            Activate Job Post
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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

      <Dialog open={dialogType === "details"} onClose={closeDialog}>
        <DialogPanel className="max-w-2xl p-0 overflow-hidden animate-in zoom-in-95 duration-200 bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl">
          <DialogHeader className="p-8 bg-gray-50/50 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-wise-green/10 rounded-2xl flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-wise-green" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black text-near-black tracking-tight">
                  {selectedJob?.jobTitle}
                </DialogTitle>
                <DialogDescription className="text-gray-500 font-medium italic">
                  {selectedJob?.hiringCompany} • {selectedJob?.jobType}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedJob && (
            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                  <DollarSign className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Salary Range
                  </p>
                  <p className="text-xs font-bold text-near-black">
                    {selectedJob.minSalary} - {selectedJob.maxSalary}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                  <MapPin className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Location Type
                  </p>
                  <p className="text-xs font-bold text-near-black">
                    {selectedJob.locationType}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                  <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Posted Date
                  </p>
                  <p className="text-xs font-bold text-near-black">
                    {selectedJob.posted}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-wise-green" />
                  <h4 className="font-black text-xs text-near-black uppercase tracking-widest">
                    Job Description
                  </h4>
                </div>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {selectedJob.description || "No description provided."}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-wise-green" />
                  <h4 className="font-black text-xs text-near-black uppercase tracking-widest">
                    Experience / Skills
                  </h4>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">
                    <span className="font-bold">Required Experience: </span>
                    {selectedJob.experience}
                  </p>
                  {selectedJob.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
            <DialogClose className="h-12 rounded-xl px-6 text-sm font-black uppercase tracking-wider bg-transparent hover:bg-gray-100 text-near-black">
              Close Overview
            </DialogClose>
            {selectedJob?.status === "OPEN" ? (
              <Button
                onClick={() => handleAction(selectedJob, "block")}
                variant="destructive"
                className="h-12 rounded-xl px-6 text-sm font-black uppercase tracking-wider"
              >
                Flag as Threat
              </Button>
            ) : (
              <Button
                onClick={() => handleAction(selectedJob!, "unblock")}
                className="bg-wise-green text-dark-green h-12 rounded-xl px-6 text-sm font-black uppercase tracking-wider hover:bg-wise-green/90 shadow-lg shadow-wise-green/20"
              >
                Unblock Post
              </Button>
            )}
          </DialogFooter>
        </DialogPanel>
      </Dialog>

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
