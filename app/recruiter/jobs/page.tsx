"use client";

import { addDays, format, isBefore } from "date-fns";
import { Briefcase, Lock, Plus, Send } from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRecruiterJobsQuery } from "@/features/jobs/hooks/use-jobs-query";
import { updateJob } from "@/features/jobs/services/job.api";
import type { JobResponse } from "@/features/jobs/types/job.types";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const EXPIRY_DAYS = 15;

function getExpiryLabel(createdAt: string): {
  label: string;
  expired: boolean;
} {
  const expiresAt = addDays(new Date(createdAt), EXPIRY_DAYS);
  const expired = isBefore(expiresAt, new Date());
  return {
    label: `Expires ${format(expiresAt, "MMM d, yyyy")}`,
    expired,
  };
}

function JobCard({ job }: { job: JobResponse }) {
  const queryClient = useQueryClient();
  const [publishing, setPublishing] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const count = job.stats?.total ?? 0;
  const countLoading = false;

  const expiry = job.created_at ? getExpiryLabel(job.created_at) : null;
  const isPublished = job.is_published;

  const handlePublish = async () => {
    setPublishing(true);
    try {
      await updateJob(job.id, { is_published: true });
      toast.success(`"${job.jobTitle}" is now live!`);
      queryClient.invalidateQueries({ queryKey: ["recruiter", "jobs"] });
    } catch {
      toast.error("Failed to publish job. Please try again.");
    } finally {
      setPublishing(false);
      setConfirming(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-wise-green/50 transition-colors">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-wise-green/10 transition-colors">
          <Briefcase className="w-6 h-6 text-slate-400 group-hover:text-wise-green transition-colors" />
        </div>

        <div>
          {/* Title + badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-bold text-near-black">
              {job.jobTitle}
            </h3>

            {/* Status badge (OPEN / CLOSED) */}
            <span
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-black rounded-full ${
                job.status === "OPEN"
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {job.status}
            </span>

            {/* Draft badge — only when NOT published */}
            {!isPublished && (
              <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-black rounded-full bg-yellow-100 text-yellow-700">
                Draft
              </span>
            )}
          </div>

          {/* Subtitle */}
          <p className="text-sm text-slate-500 font-medium mt-1">
            {job.hiringCompany} • {job.jobType} • {job.locationType}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 mt-3 text-xs text-slate-400 font-medium flex-wrap">
            <span>
              Posted{" "}
              {job.created_at
                ? format(new Date(job.created_at), "MMM d, yyyy")
                : "Recently"}
            </span>

            {/* Expiry — only for published jobs */}
            {isPublished && expiry && (
              <>
                <span>•</span>
                <span
                  className={`font-bold ${
                    expiry.expired ? "text-red-500" : "text-slate-400"
                  }`}
                >
                  {expiry.label}
                </span>
              </>
            )}

            <span>•</span>

            {/* Application count */}
            <span className="text-wise-green/80 font-bold">
              {countLoading ? (
                <span className="inline-block w-20 h-3 bg-slate-100 rounded animate-pulse" />
              ) : (
                `${count ?? 0} ${count === 1 ? "Application" : "Applications"}`
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 shrink-0">
        {isPublished ? (
          /* Published — edit is locked, only view details */
          <>
            <span className="px-4 py-2 text-sm font-bold text-slate-300 flex items-center gap-1.5 cursor-not-allowed select-none">
              <Lock className="w-3.5 h-3.5" />
              Edit Locked
            </span>
            <Link
              href={`/recruiter/jobs/${job.id}/applications`}
              className="px-4 py-2 text-sm font-bold text-near-black bg-slate-50 hover:bg-slate-100 transition-colors rounded-full border border-slate-200"
            >
              View Details
            </Link>
          </>
        ) : (
          /* Draft — can edit + publish */
          <>
            <Link
              href={`/recruiter/jobs/edit/${job.id}`}
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-near-black transition-colors rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200"
            >
              Edit Job
            </Link>
            <button
              type="button"
              onClick={() => setConfirming(true)}
              disabled={publishing}
              className="px-4 py-2 text-sm font-bold text-white bg-wise-green hover:bg-wise-green/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors rounded-full flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              {publishing ? "Publishing..." : "Publish"}
            </button>
          </>
        )}
      </div>

      <ConfirmationModal
        isOpen={confirming}
        onClose={() => setConfirming(false)}
        title="Publish Job"
        description="Are you sure you want to publish this job? Once published, candidates will be able to view and apply for this position."
        onConfirm={handlePublish}
        confirmText="Publish"
        cancelText="Cancel"
        variant="success"
      />
    </div>
  );
}

export default function RecruiterJobsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const {
    data: jobsResponse,
    isLoading,
    error,
  } = useRecruiterJobsQuery(page, limit);
  const jobs = jobsResponse?.data || [];
  const pagination = jobsResponse || {
    totalPages: 1,
    total: 0,
    page: 1,
    limit: 10,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-near-black tracking-tight">
            Your Jobs
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Manage your job postings and view applications.
          </p>
        </div>
        <Link
          href="/recruiter/jobs/create/new"
          className="bg-wise-green text-near-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-wise-green/90 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" />
          Post New Job
        </Link>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wise-green" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-100">
          Failed to load jobs. Please try again.
        </div>
      ) : jobs && jobs.length > 0 ? (
        <div className="grid gap-4">
          {jobs.map((job: JobResponse) => (
            <JobCard key={job.id} job={job} />
          ))}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-10 pb-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage(Math.max(1, page - 1))}
                      className={
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  ).map((p) => {
                    if (
                      p === 1 ||
                      p === pagination.totalPages ||
                      (p >= page - 1 && p <= page + 1)
                    ) {
                      return (
                        <PaginationItem key={p}>
                          <PaginationLink
                            isActive={page === p}
                            onClick={() => setPage(p)}
                            className="cursor-pointer"
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    if (p === page - 2 || p === page + 2) {
                      return (
                        <PaginationItem key={p}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage(Math.min(pagination.totalPages, page + 1))
                      }
                      className={
                        page === pagination.totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Briefcase className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-near-black mb-2">
            No jobs posted yet
          </h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            You haven&apos;t created any job listings. Post your first job to
            start receiving applications.
          </p>
          <Link
            href="/recruiter/jobs/create/new"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-near-black px-6 py-3 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Create First Job
          </Link>
        </div>
      )}
    </div>
  );
}
