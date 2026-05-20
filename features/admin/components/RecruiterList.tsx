"use client";

import {
  ArrowUpRight,
  Ban,
  Building2,
  Filter,
  Mail,
  MapPin,
  MoreHorizontal,
  Search,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/animate-ui/components/buttons/button";
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
import { useAdminRecruiters } from "../hooks/use-admin-recruiters";
import type { RecruiterDetail } from "../types/admin.types";

export const RecruiterList = () => {
  const {
    recruiters,
    total,
    searchQuery,
    setSearchQuery,
    selectedStatuses,
    handleStatusToggle,
    clearFilters,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleConfirmBlock,
    isPending,
  } = useAdminRecruiters();

  const [isBlocking, setIsBlocking] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState<{
    id: string;
    status: string;
  } | null>(null);

  const openBlockModal = (id: string, status: string) => {
    setSelectedRecruiter({ id, status });
    setIsBlocking(true);
  };

  const confirmBlock = () => {
    if (selectedRecruiter) {
      handleConfirmBlock(selectedRecruiter.id);
      setIsBlocking(false);
      setSelectedRecruiter(null);
    }
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  if (isPending) {
    return (
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-8 text-center">
          <div className="w-8 h-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Loading recruiters...
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
            placeholder="Search by name, company or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-white border border-gray-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-wise-green/20 focus:border-wise-green transition-all outline-none"
          />
        </div>
        <Popover>
          <PopoverTrigger
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-14 px-6 rounded-2xl border-gray-100 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest",
            )}
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
            className="w-64 p-6 rounded-[2rem] border-gray-100 shadow-2xl"
            align="end"
          >
            <h4 className="text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-4 ml-1">
              Filter by Status
            </h4>
            <div className="space-y-3">
              {["Active", "Pending", "Blocked"].map((status) => (
                <div
                  key={status}
                  onClick={() => handleStatusToggle(status)}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <div
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
                </div>
              ))}
            </div>
            {selectedStatuses.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 w-full h-10 bg-red-50 text-red-500 hover:bg-red-100/80 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300"
              >
                Clear Filter
              </button>
            )}
          </PopoverContent>
        </Popover>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                  Recruiter / Company
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                  Joined
                </th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-near-black/40">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recruiters.map((recruiter: RecruiterDetail) => (
                <tr
                  key={recruiter.id}
                  className="group hover:bg-gray-50/30 transition-all"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-near-black flex items-center justify-center text-sm font-black text-wise-green shadow-lg shadow-near-black/10 group-hover:rotate-6 transition-transform">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <Link
                          href={`/admin/recruiters/${recruiter.id}`}
                          className="text-sm font-black text-near-black uppercase tracking-tight hover:text-wise-green transition-colors"
                        >
                          {recruiter.company}
                        </Link>
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5">
                          Admin: {recruiter.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                        <Mail className="w-3.5 h-3.5 text-gray-300" />
                        {recruiter.email}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                        <MapPin className="w-3 h-3 text-gray-300" />
                        {recruiter.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                        recruiter.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : recruiter.status === "Pending"
                            ? "bg-blue-50 text-blue-500"
                            : "bg-red-50 text-red-500",
                      )}
                    >
                      {recruiter.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-400">
                    {recruiter.joined}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        type="button"
                        className="p-2 hover:bg-white border border-transparent hover:border-gray-100 rounded-xl transition-all flex items-center justify-center"
                      >
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-56 p-2 rounded-2xl border-gray-100 shadow-xl"
                      >
                        <Link href={`/admin/recruiters/${recruiter.id}`}>
                          <DropdownMenuItem className="h-12 px-4 rounded-xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest cursor-pointer">
                            <UserCircle className="w-4 h-4 text-wise-green" />
                            Company Profile
                            <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-40" />
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onClick={() =>
                            openBlockModal(recruiter.id, recruiter.status)
                          }
                          className={cn(
                            "h-12 px-4 rounded-xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest cursor-pointer",
                            recruiter.status === "Blocked"
                              ? "text-green-500 hover:bg-green-50 hover:text-green-600"
                              : "text-red-500 hover:bg-red-50 hover:text-red-600",
                          )}
                        >
                          <Ban className="w-4 h-4" />
                          {recruiter.status === "Blocked"
                            ? "Restore Access"
                            : "Restrict Access"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <ConfirmationModal
        isOpen={isBlocking}
        onClose={() => setIsBlocking(false)}
        onConfirm={confirmBlock}
        title={
          selectedRecruiter?.status === "Blocked"
            ? "Restore Recruiter Access"
            : "Restrict Recruiter Access"
        }
        description={
          selectedRecruiter?.status === "Blocked"
            ? "This will restore account access and enable all active job postings for this company."
            : "This will immediately revoke account access and disable all active job postings for this company."
        }
        confirmText={
          selectedRecruiter?.status === "Blocked"
            ? "Confirm Restore"
            : "Confirm Restriction"
        }
        variant={selectedRecruiter?.status === "Blocked" ? "info" : "danger"}
      />
    </div>
  );
};
