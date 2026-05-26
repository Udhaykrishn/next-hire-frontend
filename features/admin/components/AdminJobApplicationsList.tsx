"use client";

import { useDebouncedValue } from "@tanstack/react-pacer";
import { ExternalLink, FileText, Filter, Search, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { useAdminJobApplications } from "../hooks/use-admin-job-applications";

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
    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-5">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Users className="size-5 text-blue-600" />
          </div>
          <h4 className="font-black text-lg text-near-black tracking-tight">
            Recent Applications{" "}
            {data?.total !== undefined ? `(${data.total})` : ""}
          </h4>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by candidate name…"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-wise-green/20 focus:border-wise-green/50 transition-all"
            />
          </div>
          <div className="relative w-full sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-wise-green/20 focus:border-wise-green/50 transition-all appearance-none"
            >
              <option value="ALL">All Statuses</option>
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
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-50 rounded-xl"></div>
          ))}
        </div>
      ) : !data || data.data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Users className="size-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">
            No applications found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest px-4">
                    Candidate
                  </th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest px-4">
                    Applied Date
                  </th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest px-4">
                    Status
                  </th>
                  <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest px-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.data.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                          {app.candidate.profileImage ? (
                            <Image
                              src={app.candidate.profileImage}
                              alt={app.candidate.name}
                              width={40}
                              height={40}
                              unoptimized
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="size-full flex items-center justify-center bg-gray-200 text-gray-500 font-bold">
                              {app.candidate.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <h5 className="font-bold text-near-black text-sm">
                            {app.candidate.name}
                          </h5>
                          <p className="text-xs text-gray-500 font-medium">
                            {app.candidate.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-600">
                        {new Date(app.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                          app.status === "HIRED"
                            ? "bg-green-100 text-green-700"
                            : app.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : app.status === "INTERVIEW"
                                ? "bg-purple-100 text-purple-700"
                                : app.status === "REVIEWING"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {app.candidate.resume && (
                          <a
                            href={app.candidate.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-near-black transition-colors"
                          >
                            <FileText className="size-3.5" />
                            Resume
                          </a>
                        )}
                        <Link
                          href={`/admin/candidates/${app.candidate.id}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-near-black transition-colors"
                        >
                          <ExternalLink className="size-3.5" />
                          Profile
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {Math.ceil(data.total / limit) > 1 && (
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500">
                Showing {(page - 1) * limit + 1} to{" "}
                {Math.min(page * limit, data.total)} of {data.total} entries
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-xl border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setPage((p) =>
                      Math.min(Math.ceil(data.total / limit), p + 1),
                    )
                  }
                  disabled={page === Math.ceil(data.total / limit)}
                  className="rounded-xl border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
