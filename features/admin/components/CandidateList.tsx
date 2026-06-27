"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  Ban,
  Briefcase,
  MoreHorizontal,
  ShieldAlert,
  UserCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  AdminListToolbar,
  AdminTableEmpty,
  AdminTableFrame,
  AdminTableHeadRow,
  AdminTableLoading,
  AdminTh,
} from "@/components/admin/list-ui";
import { StatusBadge } from "@/components/admin/ui";
import { Pagination } from "@/components/shared/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    return <AdminTableLoading label="Loading candidates" />;
  }

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="space-y-4">
      <AdminListToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search by name, role or email"
        statuses={["Active", "Pending", "Blocked"]}
        selected={selectedStatuses}
        onToggle={handleStatusToggle}
        onClear={clearFilters}
      />

      <AdminTableFrame>
        <AdminTableHeadRow>
          <AdminTh>Candidate</AdminTh>
          <AdminTh>Role</AdminTh>
          <AdminTh>Status</AdminTh>
          <AdminTh>Joined</AdminTh>
          <AdminTh align="right">Actions</AdminTh>
        </AdminTableHeadRow>
        <tbody>
          {candidates.length === 0 ? (
            <AdminTableEmpty
              colSpan={5}
              icon={<Users className="h-5 w-5" />}
              title="No candidates found"
              hint="Try adjusting your search or filters."
            />
          ) : (
            candidates.map((candidate: CandidateDetail) => (
              <tr
                key={candidate.id}
                className={cn(
                  "border-b border-hairline-soft transition-colors last:border-0 hover:bg-surface-soft/50",
                  candidate.status === "Blocked" && "opacity-70",
                )}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold",
                        candidate.status === "Blocked"
                          ? "bg-surface-card text-muted-soft"
                          : "bg-navy text-on-dark",
                      )}
                    >
                      {candidate.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/candidates/${candidate.id}`}
                          className={cn(
                            "text-sm font-medium text-ink transition-colors hover:text-coral",
                            candidate.status === "Blocked" &&
                              "text-muted-soft line-through",
                          )}
                        >
                          {candidate.name}
                        </Link>
                        {candidate.status === "Blocked" && (
                          <StatusBadge tone="danger">
                            <ShieldAlert className="h-3 w-3" />
                            Restricted
                          </StatusBadge>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-[13px] text-muted-soft">
                        {candidate.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 text-sm text-body">
                    <Briefcase className="h-4 w-4 text-muted-soft" />
                    {candidate.role}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge
                    tone={
                      candidate.status === "Active"
                        ? "success"
                        : candidate.status === "Pending"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {candidate.status === "Active" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    )}
                    {candidate.status}
                  </StatusBadge>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-ink tabular-nums">
                  {candidate.joined}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg p-1.5 text-muted-ink transition-colors hover:bg-surface-soft hover:text-ink"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-52 rounded-xl border-hairline p-1.5 shadow-lg"
                    >
                      <Link href={`/admin/candidates/${candidate.id}`}>
                        <DropdownMenuItem className="flex h-9 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium text-body">
                          <UserCircle className="h-4 w-4 text-muted-ink" />
                          View profile
                          <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-40" />
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() => openBlockModal(candidate.id)}
                        className={cn(
                          "flex h-9 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium",
                          candidate.status === "Blocked"
                            ? "text-success hover:bg-success/10"
                            : "text-destructive hover:bg-destructive/10",
                        )}
                      >
                        {candidate.status === "Blocked" ? (
                          <>
                            <BadgeCheck className="h-4 w-4" />
                            Restore access
                          </>
                        ) : (
                          <>
                            <Ban className="h-4 w-4" />
                            Restrict access
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </AdminTableFrame>

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
