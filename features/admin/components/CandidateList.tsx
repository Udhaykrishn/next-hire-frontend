"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  Ban,
  Briefcase,
  Filter,
  MoreHorizontal,
  Search,
  ShieldAlert,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/animate-ui/components/buttons/button";
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
import { useAdminCandidates } from "../hooks/use-admin-candidates";
import type { CandidateDetail } from "../types/admin.types";
import { BlockStatusModal } from "./BlockStatusModal";

export const CandidateList = () => {
  const {
    candidates,
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
    isBlockingPending,
    isPending,
  } = useAdminCandidates();

  const [isBlocking, setIsBlocking] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null,
  );

  const selectedCandidate = candidates.find(
    (c) => c.id === selectedCandidateId,
  );

  const openBlockModal = (id: string) => {
    setSelectedCandidateId(id);
    setIsBlocking(true);
  };

  const confirmBlock = (reason: string) => {
    if (selectedCandidateId && selectedCandidate) {
      const nextStatus =
        selectedCandidate.status === "Blocked" ? "Active" : "Blocked";
      handleConfirmBlock(selectedCandidateId, nextStatus, reason);
      setIsBlocking(false);
      setSelectedCandidateId(null);
    }
  };

  if (isPending) {
    return (
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-8 text-center">
          <div className="size-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Loading candidates…
          </p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="gap-y-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 group-focus-within:text-wise-green transition-colors" />
          <input aria-label="Control"
            type="text"
            placeholder="Search by name, role or email…"
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
            <Filter className="size-4" />
            Advanced Filters
            {selectedStatuses.length > 0 && (
              <span className="size-5 bg-wise-green text-near-black rounded-full flex items-center justify-center text-[8px]">
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
            <div className="gap-y-3">
              {["Active", "Pending", "Blocked"].map((status) => (
                <div
                  key={status}
                  onClick={() => handleStatusToggle(status)}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <div
                    className={cn(
                      "size-5 rounded-lg border-2 transition-all flex items-center justify-center",
                      selectedStatuses.includes(status)
                        ? "bg-near-black border-near-black"
                        : "border-gray-200 group-hover:border-wise-green",
                    )}
                  >
                    {selectedStatuses.includes(status) && (
                      <div className="size-2 rounded-sm bg-wise-green" />
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
                  Candidate Identity
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-near-black/40">
                  Current Role
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
              {candidates.map((candidate: CandidateDetail) => (
                <tr
                  key={candidate.id}
                  className={cn(
                    "group hover:bg-gray-50/30 transition-all",
                    candidate.status === "Blocked" &&
                      "opacity-75 hover:opacity-100",
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "size-12 rounded-2xl flex items-center justify-center text-sm font-black shadow-lg group-hover:rotate-6 transition-transform",
                          candidate.status === "Blocked"
                            ? "bg-gray-100 text-gray-400 shadow-gray-200/10"
                            : "bg-near-black text-wise-green shadow-near-black/10",
                        )}
                      >
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/candidates/${candidate.id}`}
                            className={cn(
                              "text-sm font-black text-near-black uppercase tracking-tight hover:text-wise-green transition-colors",
                              candidate.status === "Blocked" &&
                                "line-through text-gray-400",
                            )}
                          >
                            {candidate.name}
                          </Link>
                          {candidate.status === "Blocked" && (
                            <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest bg-red-50 text-red-500 rounded-md border border-red-100 flex items-center gap-1 font-mono">
                              <ShieldAlert className="size-2.5" />
                              Restricted
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5">
                          {candidate.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <Briefcase className="size-3.5 text-gray-300" />
                      {candidate.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1.5",
                        candidate.status === "Active"
                          ? "bg-green-50 text-green-600 border border-green-100"
                          : candidate.status === "Pending"
                            ? "bg-blue-50 text-blue-500 border border-blue-100"
                            : "bg-red-50 text-red-500 border border-red-100",
                      )}
                    >
                      {candidate.status === "Active" && (
                        <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                      )}
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-400">
                    {candidate.joined}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        type="button"
                        className="p-2 hover:bg-white border border-transparent hover:border-gray-100 rounded-xl transition-all flex items-center justify-center"
                      >
                        <MoreHorizontal className="size-5 text-gray-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-56 p-2 rounded-2xl border-gray-100 shadow-xl"
                      >
                        <Link href={`/admin/candidates/${candidate.id}`}>
                          <DropdownMenuItem className="h-12 px-4 rounded-xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest cursor-pointer">
                            <UserCircle className="size-4 text-wise-green" />
                            View Detail Profile
                            <ArrowUpRight className="size-3.5 ml-auto opacity-40" />
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onClick={() => openBlockModal(candidate.id)}
                          className={cn(
                            "h-12 px-4 rounded-xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest cursor-pointer",
                            candidate.status === "Blocked"
                              ? "text-green-600 hover:bg-green-50 hover:text-green-700"
                              : "text-red-500 hover:bg-red-50 hover:text-red-600",
                          )}
                        >
                          {candidate.status === "Blocked" ? (
                            <>
                              <BadgeCheck className="size-4 text-green-600" />
                              Restore Access
                            </>
                          ) : (
                            <>
                              <Ban className="size-4 text-red-500" />
                              Restrict Access
                            </>
                          )}
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

      {selectedCandidate && (
        <BlockStatusModal
          isOpen={isBlocking}
          onClose={() => setIsBlocking(false)}
          onConfirm={confirmBlock}
          candidateName={selectedCandidate.name}
          isBlocked={selectedCandidate.status === "Blocked"}
          isLoading={isBlockingPending}
        />
      )}
    </div>
  );
};
