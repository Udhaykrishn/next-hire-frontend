"use client";

import {
  ArrowUpRight,
  Ban,
  Building2,
  Mail,
  MapPin,
  MoreHorizontal,
  ShieldCheck,
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
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { Pagination } from "@/components/shared/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAdminRecruiters } from "../hooks/use-admin-recruiters";
import type { RecruiterDetail } from "../types/admin.types";

type BadgeTone = "success" | "warning" | "danger" | "coral" | "neutral";

const statusTone = (status: string): BadgeTone => {
  if (status === "Active") return "success";
  if (status === "Pending") return "warning";
  if (status === "Blocked") return "danger";
  return "neutral";
};

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
    return <AdminTableLoading label="Loading recruiters" />;
  }

  return (
    <div className="space-y-4">
      <AdminListToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search by name, company or email"
        statuses={["Active", "Pending", "Blocked"]}
        selected={selectedStatuses}
        onToggle={handleStatusToggle}
        onClear={clearFilters}
      />

      <AdminTableFrame>
        <AdminTableHeadRow>
          <AdminTh>Recruiter / company</AdminTh>
          <AdminTh>Contact</AdminTh>
          <AdminTh>Status</AdminTh>
          <AdminTh>Joined</AdminTh>
          <AdminTh align="right">Actions</AdminTh>
        </AdminTableHeadRow>
        <tbody>
          {recruiters.length === 0 ? (
            <AdminTableEmpty
              colSpan={5}
              icon={<Users className="h-5 w-5" />}
              title="No recruiters found"
              hint="Try adjusting your search or filters."
            />
          ) : (
            recruiters.map((recruiter: RecruiterDetail) => (
              <tr
                key={recruiter.id}
                className="border-b border-hairline-soft transition-colors last:border-0 hover:bg-surface-soft/50"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-on-dark">
                      <Building2 className="h-[18px] w-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/admin/recruiters/${recruiter.id}`}
                        className="text-sm font-medium text-ink transition-colors hover:text-coral"
                      >
                        {recruiter.company}
                      </Link>
                      <p className="mt-0.5 text-[13px] text-muted-soft">
                        Admin: {recruiter.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-body">
                      <Mail className="h-3.5 w-3.5 text-muted-soft" />
                      {recruiter.email}
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-muted-soft">
                      <MapPin className="h-3.5 w-3.5 text-muted-soft" />
                      {recruiter.location}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge tone={statusTone(recruiter.status)}>
                    {recruiter.status}
                  </StatusBadge>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-ink tabular-nums">
                  {recruiter.joined}
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
                      <Link href={`/admin/recruiters/${recruiter.id}`}>
                        <DropdownMenuItem className="flex h-9 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium text-body">
                          <UserCircle className="h-4 w-4 text-muted-ink" />
                          Company profile
                          <ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-40" />
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() =>
                          openBlockModal(recruiter.id, recruiter.status)
                        }
                        className={cn(
                          "flex h-9 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium",
                          recruiter.status === "Blocked"
                            ? "text-success hover:bg-success/10"
                            : "text-destructive hover:bg-destructive/10",
                        )}
                      >
                        {recruiter.status === "Blocked" ? (
                          <ShieldCheck className="h-4 w-4" />
                        ) : (
                          <Ban className="h-4 w-4" />
                        )}
                        {recruiter.status === "Blocked"
                          ? "Restore access"
                          : "Restrict access"}
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

      <ConfirmationModal
        isOpen={isBlocking}
        onClose={() => setIsBlocking(false)}
        onConfirm={confirmBlock}
        title={
          selectedRecruiter?.status === "Blocked"
            ? "Restore recruiter access"
            : "Restrict recruiter access"
        }
        description={
          selectedRecruiter?.status === "Blocked"
            ? "This will restore account access and enable all active job postings for this company."
            : "This will immediately revoke account access and disable all active job postings for this company."
        }
        confirmText={
          selectedRecruiter?.status === "Blocked"
            ? "Confirm restore"
            : "Confirm restriction"
        }
        variant={selectedRecruiter?.status === "Blocked" ? "info" : "danger"}
      />
    </div>
  );
};
