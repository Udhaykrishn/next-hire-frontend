"use client";

import { useDebouncedValue } from "@tanstack/react-pacer";
import { ExternalLink, FileText, Filter, Search, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { StatusBadge } from "@/components/admin/ui";
import { useAdminJobApplications } from "../hooks/use-admin-job-applications";

const STATUS_TONES = {
  HIRED: "success",
  REJECTED: "danger",
  INTERVIEW: "coral",
  REVIEWING: "warning",
} as const;

export const AdminJobApplicationsList = ({ jobId }: { jobId: string }) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchTerm, { wait: 500 });
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data, isLoading } = useAdminJobApplications(
    jobId,
    page,
    limit,
    debouncedSearch,
    statusFilter,
  );

  return (
    <div className="rounded-xl border border-hairline bg-white p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 border-b border-hairline-soft pb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-soft text-muted-ink">
            <Users className="h-[18px] w-[18px]" />
          </div>
          <h3 className="text-[15px] font-semibold text-ink">
            Recent applications{" "}
            {data?.total !== undefined ? (
              <span className="text-muted-soft tabular-nums">
                ({data.total})
              </span>
            ) : (
              ""
            )}
          </h3>
        </div>

        <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-soft" />
            <input
              type="text"
              placeholder="Search by candidate name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="h-10 w-full rounded-lg border border-hairline bg-white pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted-soft focus:border-coral/60 focus:ring-2 focus:ring-coral/15"
            />
          </div>
          <div className="relative w-full sm:w-48">
            <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-ink" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="h-10 w-full appearance-none rounded-lg border border-hairline bg-white pl-10 pr-4 text-sm font-medium text-ink outline-none transition-colors focus:border-coral/60 focus:ring-2 focus:ring-coral/15"
            >
              <option value="ALL">All statuses</option>
              <option value="PENDING">Pending</option>
              <option value="REVIEWING">Reviewing</option>
              <option value="INTERVIEW">Interview</option>
              <option value="HIRED">Hired</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-surface-soft" />
          ))}
        </div>
      ) : !data || data.data.length === 0 ? (
        <div className="rounded-xl border border-hairline-soft bg-surface-soft/50 py-16 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-muted-soft">
            <Users className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold text-ink">
            No applications found
          </p>
          <p className="mt-1 text-[13px] text-muted-ink">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-hairline bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted-soft">
                      Candidate
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted-soft">
                      Applied date
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-xs font-medium text-muted-soft">
                      Status
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right text-xs font-medium text-muted-soft">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((app) => (
                    <tr
                      key={app.id}
                      className="group border-b border-hairline-soft transition-colors last:border-0 hover:bg-surface-soft/50"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-surface-soft">
                            {app.candidate.profileImage ? (
                              <Image
                                src={app.candidate.profileImage}
                                alt={app.candidate.name}
                                width={36}
                                height={36}
                                unoptimized
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-surface-soft text-sm font-semibold text-muted-ink">
                                {app.candidate.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-ink">
                              {app.candidate.name}
                            </p>
                            <p className="text-[13px] text-muted-soft">
                              {app.candidate.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted-ink tabular-nums">
                        {new Date(app.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge
                          tone={
                            STATUS_TONES[
                              app.status as keyof typeof STATUS_TONES
                            ] ?? "neutral"
                          }
                        >
                          {app.status}
                        </StatusBadge>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                          {app.candidate.resume && (
                            <a
                              href={app.candidate.resume}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-white px-3 py-1.5 text-sm font-medium text-body transition-colors hover:bg-surface-soft"
                            >
                              <FileText className="h-3.5 w-3.5 text-muted-ink" />
                              Resume
                            </a>
                          )}
                          <Link
                            href={`/admin/candidates/${app.candidate.id}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-white px-3 py-1.5 text-sm font-medium text-body transition-colors hover:bg-surface-soft"
                          >
                            <ExternalLink className="h-3.5 w-3.5 text-muted-ink" />
                            Profile
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {Math.ceil(data.total / limit) > 1 && (
            <div className="mt-5 flex items-center justify-between border-t border-hairline-soft pt-5">
              <p className="text-[13px] text-muted-soft tabular-nums">
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, data.total)} of {data.total} entries
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-hairline bg-white px-4 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-soft disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPage((p) =>
                      Math.min(Math.ceil(data.total / limit), p + 1),
                    )
                  }
                  disabled={page === Math.ceil(data.total / limit)}
                  className="rounded-lg border border-hairline bg-white px-4 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-soft disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
