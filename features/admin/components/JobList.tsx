"use client";

import { Ban, Briefcase, Eye, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { formatSalaryAmount } from "@/lib/salary";
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
    return <AdminTableLoading label="Loading job listings" />;
  }

  return (
    <div className="space-y-4">
      <AdminListToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search by job title or hiring company"
        statuses={["OPEN", "BLOCKED"]}
        selected={selectedStatuses}
        onToggle={handleStatusToggle}
      />

      <AdminTableFrame>
        <AdminTableHeadRow>
          <AdminTh>Job title</AdminTh>
          <AdminTh>Company</AdminTh>
          <AdminTh>Salary range</AdminTh>
          <AdminTh>Status</AdminTh>
          <AdminTh>Posted</AdminTh>
          <AdminTh>Expires</AdminTh>
          <AdminTh align="right">Actions</AdminTh>
        </AdminTableHeadRow>
        <tbody>
          {jobs.length === 0 ? (
            <AdminTableEmpty
              colSpan={7}
              icon={<Briefcase className="h-5 w-5" />}
              title="No job listings found"
              hint="Try adjusting your search or filters."
            />
          ) : (
            jobs.map((job: AdminJobDetail) => (
              <tr
                key={job.id}
                className="border-b border-hairline-soft transition-colors last:border-0 hover:bg-surface-soft/50"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-soft text-muted-ink">
                      <Briefcase className="h-[18px] w-[18px]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {job.jobTitle}
                      </p>
                      <p className="text-[13px] text-muted-soft">
                        {job.jobType} · {job.locationType}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-body">
                  {job.hiringCompany}
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-ink tabular-nums">
                  {formatSalaryAmount(job.minSalary, "INR", "full")} –{" "}
                  {formatSalaryAmount(job.maxSalary, "INR", "full")}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge
                    tone={job.status === "OPEN" ? "success" : "danger"}
                  >
                    {job.status === "OPEN" ? "Active" : "Blocked"}
                  </StatusBadge>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-ink tabular-nums">
                  {job.posted}
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-ink tabular-nums">
                  {job.expireIn}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-0.5">
                    <button
                      type="button"
                      aria-label="View details"
                      onClick={() => handleAction(job, "details")}
                      className="rounded-lg p-1.5 text-muted-ink outline-none transition-colors hover:bg-surface-soft hover:text-ink"
                      title="View details"
                    >
                      <Eye className="h-[18px] w-[18px]" />
                    </button>
                    {job.status === "OPEN" ? (
                      <button
                        type="button"
                        aria-label="Flag as scam"
                        onClick={() => handleAction(job, "block")}
                        className="rounded-lg p-1.5 text-muted-ink outline-none transition-colors hover:bg-destructive/10 hover:text-destructive"
                        title="Flag as scam"
                      >
                        <Ban className="h-[18px] w-[18px]" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        aria-label="Activate job post"
                        onClick={() => handleAction(job, "unblock")}
                        className="rounded-lg p-1.5 text-muted-ink outline-none transition-colors hover:bg-success/15 hover:text-[#2f6e44]"
                        title="Activate job post"
                      >
                        <Unlock className="h-[18px] w-[18px]" />
                      </button>
                    )}
                  </div>
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
        isOpen={dialogType === "block"}
        onClose={closeDialog}
        title="Flag job as scam?"
        description={`Block "${selectedJob?.jobTitle}"? This hides the post from candidates.`}
        onConfirm={handleConfirmAction}
        variant="destructive"
        confirmText="Confirm block"
      />

      <ConfirmationModal
        isOpen={dialogType === "unblock"}
        onClose={closeDialog}
        title="Activate job listing?"
        description={`Reactivate the job post "${selectedJob?.jobTitle}"?`}
        onConfirm={handleConfirmAction}
        variant="success"
        confirmText="Activate"
      />
    </div>
  );
};
