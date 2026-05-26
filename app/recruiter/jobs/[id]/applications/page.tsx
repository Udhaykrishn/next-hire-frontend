"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  CheckSquare,
  Clock,
  ExternalLink,
  IndianRupee,
  Mail,
  MapPin,
  MoreVertical,
  Search,
  Square,
  User,
  Users,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BackendJob } from "@/features/admin/types/admin.types";
import {
  useBulkUpdateApplicationStatusMutation,
  useRecruiterJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/features/jobs/hooks/use-recruiter-applications";
import { apiClient } from "@/lib/api-client";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "REVIEWING":
      return "bg-[#38c8ff]/10 text-[#0e0f0c] border-[#38c8ff]/20";
    case "SHORTLISTED":
      return "bg-[#cdffad] text-[#0e0f0c] border-[#9fe870]/30";
    case "HIRED":
      return "bg-[#054d28]/10 text-[#054d28] border-[#054d28]/20";
    case "REJECTED":
      return "bg-[#d03238]/10 text-[#d03238] border-[#d03238]/20";
    default:
      return "bg-[#e8ebe6] text-[#454745] border-[#0e0f0c]/10";
  }
};

export default function JobApplicationsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data: jobData, isLoading: isJobLoading } = useQuery({
    queryKey: ["job-details", id],
    queryFn: async () => {
      const response = await apiClient.get<Record<string, unknown>>(
        `/job/${id}`,
      );
      return response.data;
    },
  });

  const { data: statsData } = useQuery({
    queryKey: ["job-stats", id],
    queryFn: async () => {
      const response = await apiClient.get(`/job/${id}/stats`);
      return response.data;
    },
  });

  const { data, isLoading } = useRecruiterJobApplicationsQuery(
    id,
    1,
    100,
    search,
    statusFilter,
  );
  const { mutate: updateStatus } = useUpdateApplicationStatusMutation(id);
  const { mutateAsync: bulkUpdateStatusAsync, isPending: isBulkUpdating } =
    useBulkUpdateApplicationStatusMutation(id);

  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    action: "SHORTLISTED" | "REJECTED" | null;
  }>({ isOpen: false, action: null });
  const [rejectOthers, setRejectOthers] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  const toggleSelection = (appId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(appId)
        ? prev.filter((id) => id !== appId)
        : [...prev, appId],
    );
  };

  const handleSelectAll = () => {
    if (!data?.data) return;
    if (selectedCandidates.length === data.data.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(data.data.map((app) => app.id));
    }
  };

  const handleSelectTop = (count: number) => {
    if (!data?.data) return;
    const topCandidates = data.data.slice(0, count).map((app) => app.id);
    setSelectedCandidates(topCandidates);
  };

  const handleBulkUpdateClick = (status: "SHORTLISTED" | "REJECTED") => {
    if (selectedCandidates.length === 0) return;
    setConfirmModalState({ isOpen: true, action: status });
    setRejectOthers(true); // Default to true when shortlisting
  };

  const confirmBulkAction = async () => {
    if (!confirmModalState.action || selectedCandidates.length === 0) return;

    setIsConfirming(true);
    try {
      await bulkUpdateStatusAsync({
        applicationIds: selectedCandidates,
        status: confirmModalState.action,
      });

      if (confirmModalState.action === "SHORTLISTED" && rejectOthers) {
        const unselectedIds =
          data?.data
            ?.filter(
              (app) =>
                !selectedCandidates.includes(app.id) &&
                app.status !== "REJECTED" &&
                app.status !== "HIRED",
            )
            .map((app) => app.id) || [];

        if (unselectedIds.length > 0) {
          await bulkUpdateStatusAsync({
            applicationIds: unselectedIds,
            status: "REJECTED",
          });
        }
      }
      setSelectedCandidates([]);
      setConfirmModalState({ isOpen: false, action: null });
    } catch (error) {
      console.error("Bulk update failed:", error);
    } finally {
      setIsConfirming(false);
    }
  };

  const job =
    ((jobData as Record<string, unknown>)?.data as BackendJob) ||
    (jobData as unknown as BackendJob) ||
    null;
  const stats = statsData?.data ||
    statsData || {
      total: 0,
      reviewing: 0,
      interviews: 0,
      offers: 0,
      rejected: 0,
    };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 font-satoshi">
      {/* Top Header & Job Context */}
      <div className="flex flex-col gap-5 pt-2">
        <button
          type="button"
          onClick={() => router.push("/recruiter/dashboard")}
          className="group flex items-center gap-2 w-fit text-[14px] font-[500] text-[#868685] hover:text-[#0e0f0c] transition-colors"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e8ebe6] group-hover:bg-[#cdffad] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Dashboard
        </button>

        <div className="bg-[#ffffff] p-[24px] md:p-[32px] rounded-[16px] border border-[rgba(14,15,12,0.12)] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#9fe870]/10 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#163300]/[0.08] text-[#0e0f0c] font-[600] text-[12px]">
                <Briefcase className="w-3.5 h-3.5" /> Job Context
              </div>

              {isJobLoading ? (
                <div className="space-y-3">
                  <div className="h-8 w-64 bg-[#e8ebe6] rounded animate-pulse" />
                  <div className="h-4 w-96 bg-[#e8ebe6] rounded animate-pulse" />
                </div>
              ) : job ? (
                <>
                  <h1 className="text-[32px] font-[800] text-[#0e0f0c] leading-[40px]">
                    {job.jobTitle || "Untitled Job"}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-[14px] font-[500] text-[#454745]">
                    {job.locationType && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#868685]" />{" "}
                        {job.locationType}
                      </span>
                    )}
                    {job.jobType && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#868685]" />{" "}
                        {job.jobType}
                      </span>
                    )}
                    {(job.minSalary || job.maxSalary) && (
                      <span className="flex items-center gap-1.5">
                        <IndianRupee className="w-4 h-4 text-[#868685]" />
                        {job.minSalary && job.maxSalary
                          ? `₹${job.minSalary} - ₹${job.maxSalary}`
                          : "Negotiable"}
                      </span>
                    )}
                    {job.createdAt && (
                      <span className="flex items-center gap-1.5 text-[#868685] border-l border-[rgba(14,15,12,0.12)] pl-4">
                        Posted{" "}
                        {formatDistanceToNow(parseISO(job.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-[#868685]">
                  Job information unavailable
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 min-w-[140px]">
              <div className="text-[12px] font-[500] text-[#868685] uppercase tracking-wider mb-1">
                Status
              </div>
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#054d28]/10 text-[#054d28] font-[600] border border-[#054d28]/20 text-[14px]">
                <div className="w-2 h-2 rounded-full bg-[#054d28]" />
                Active & Accepting
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Statistics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Applicants", value: stats.total || data?.total || 0 },
          { label: "Reviewing", value: stats.reviewing || 0 },
          { label: "Shortlisted", value: stats.interviews || 0 },
          { label: "Hired", value: stats.offers || 0 },
          { label: "Rejected", value: stats.rejected || 0 },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#ffffff] p-[24px] rounded-[16px] border border-[rgba(14,15,12,0.12)] flex flex-col justify-between h-28"
          >
            <div className="text-[#454745] font-[500] text-[12px] uppercase tracking-wider flex items-center justify-between">
              {stat.label}
            </div>
            <div className="text-[32px] font-[800] text-[#0e0f0c] leading-none">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#ffffff] p-3 rounded-[16px] border border-[rgba(14,15,12,0.12)] flex flex-col lg:flex-row items-center justify-between gap-4 sticky top-4 z-20">
        <div className="relative flex-1 w-full lg:max-w-md ml-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#868685]" />
          <input
            type="text"
            placeholder="Search candidates by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent border-none text-[15px] font-[400] text-[#0e0f0c] placeholder:text-[#868685] focus:ring-0 outline-none"
          />
        </div>
        <div className="flex items-center gap-1 bg-[#e8ebe6] p-1.5 rounded-full w-full lg:w-auto overflow-x-auto no-scrollbar border border-[rgba(14,15,12,0.05)]">
          {[
            "ALL",
            "AI_MATCHED",
            "PENDING",
            "REVIEWING",
            "SHORTLISTED",
            "HIRED",
            "REJECTED",
          ].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setSelectedCandidates([]);
              }}
              className={`px-4 py-2 rounded-full text-[12px] font-[600] transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? "bg-[#ffffff] text-[#0e0f0c] shadow-sm border border-[rgba(14,15,12,0.08)]"
                  : "text-[#454745] hover:text-[#0e0f0c] hover:bg-[rgba(14,15,12,0.04)]"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedCandidates.length > 0 && (
        <div className="bg-[#163300]/[0.05] p-3 rounded-[16px] border border-[#163300]/[0.1] flex flex-col md:flex-row items-center justify-between gap-4 sticky top-[88px] z-20 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3 ml-2">
            <span className="text-[#0e0f0c] font-[700] text-[15px]">
              {selectedCandidates.length} candidate
              {selectedCandidates.length > 1 ? "s" : ""} selected
            </span>
            <button
              type="button"
              onClick={() => setSelectedCandidates([])}
              className="text-[13px] font-[600] text-[#868685] hover:text-[#0e0f0c] transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              disabled={isBulkUpdating || isConfirming}
              onClick={() => handleBulkUpdateClick("SHORTLISTED")}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#cdffad] hover:bg-[#b5f889] text-[#0e0f0c] font-[600] text-[13px] transition-colors disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" /> Shortlist Selected
            </button>
            <button
              type="button"
              disabled={isBulkUpdating || isConfirming}
              onClick={() => handleBulkUpdateClick("REJECTED")}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#ffffff] border border-[rgba(14,15,12,0.12)] hover:bg-[#d03238]/10 hover:text-[#d03238] hover:border-[#d03238]/30 text-[#0e0f0c] font-[600] text-[13px] transition-colors disabled:opacity-50"
            >
              <XCircle className="w-4 h-4" /> Reject Selected
            </button>
          </div>
        </div>
      )}

      {/* Selection Control (Select All & Quick Select) */}
      {data?.data && data.data.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 mb-3 px-1">
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-2 text-[14px] font-[600] text-[#454745] hover:text-[#0e0f0c] transition-colors shrink-0"
          >
            {selectedCandidates.length === data.data.length ? (
              <CheckSquare className="w-5 h-5 text-[#054d28]" />
            ) : (
              <Square className="w-5 h-5 text-[#868685]" />
            )}
            {selectedCandidates.length === data.data.length
              ? "Deselect All"
              : "Select All"}
          </button>

          {/* Dynamic Selection Buttons */}
          {data.data.length >= 10 && (
            <div className="flex items-center gap-2 border-l border-[rgba(14,15,12,0.12)] pl-4">
              <span className="text-[13px] font-[500] text-[#868685]">
                Quick Select:
              </span>
              {[10, 15, 20, 50]
                .filter((c) => c <= data.data.length)
                .map((count) => (
                  <button
                    type="button"
                    key={count}
                    onClick={() => handleSelectTop(count)}
                    className="px-3 py-1 rounded-full text-[12px] font-[600] bg-[#e8ebe6] text-[#454745] hover:bg-[#d4d7d3] hover:text-[#0e0f0c] transition-colors"
                  >
                    Top {count}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Applications List - Fast & Professional (No Animations) */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
            <div className="w-10 h-10 border-4 border-[#e8ebe6] border-t-[#0e0f0c] rounded-full animate-spin" />
            <p className="text-[#868685] font-[500] text-[15px]">
              Loading candidates...
            </p>
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.data.map((app) => (
              <div
                key={app.id}
                className="group bg-[#ffffff] p-[24px] rounded-[16px] border border-[rgba(14,15,12,0.12)] hover:border-[#0e0f0c] transition-colors flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleSelection(app.id)}
                        className="mt-1 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                      >
                        {selectedCandidates.includes(app.id) ? (
                          <CheckSquare className="w-5 h-5 text-[#054d28] drop-shadow-sm" />
                        ) : (
                          <Square className="w-5 h-5 text-[#868685] hover:text-[#454745]" />
                        )}
                      </button>
                      <div className="w-12 h-12 rounded-full bg-[#e8ebe6] overflow-hidden shrink-0">
                        {app.candidate.profileImage ? (
                          <Image
                            src={app.candidate.profileImage}
                            alt={app.candidate.name}
                            width={48}
                            height={48}
                            unoptimized
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#868685]">
                            <User className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <h3
                          className="font-[700] text-[16px] text-[#0e0f0c] group-hover:text-[#054d28] transition-colors cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/recruiter/jobs/${id}/applications/${app.id}?candidateId=${app.candidate.id}`,
                            )
                          }
                        >
                          {app.candidate.name}
                        </h3>
                        <p className="text-[14px] font-[500] text-[#868685] flex items-center gap-1 mt-0.5">
                          <Mail className="w-3.5 h-3.5" /> {app.candidate.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {app.matchScore > 0 && (
                        <div className="px-2.5 py-1 rounded-md text-[12px] font-[600] border bg-indigo-50 text-indigo-700 border-indigo-200">
                          {app.matchScore}% Match
                        </div>
                      )}
                      <div
                        className={`px-2.5 py-1 rounded-md text-[12px] font-[600] border ${getStatusStyles(app.status)}`}
                      >
                        {app.status}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center justify-center h-8 w-8 rounded-full text-[#868685] hover:text-[#0e0f0c] hover:bg-[#e8ebe6] transition-colors focus:outline-none">
                          <MoreVertical className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 font-satoshi rounded-[12px] border-[rgba(14,15,12,0.12)] shadow-lg p-1.5"
                        >
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus({
                                applicationId: app.id,
                                status: "REVIEWING",
                              })
                            }
                            className="text-[14px] font-[500] text-[#0e0f0c] focus:bg-[#e8ebe6] rounded-[8px] cursor-pointer py-2 px-2.5"
                          >
                            Mark as Reviewing
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus({
                                applicationId: app.id,
                                status: "SHORTLISTED",
                              })
                            }
                            className="text-[14px] font-[500] text-[#0e0f0c] focus:bg-[#cdffad] rounded-[8px] cursor-pointer py-2 px-2.5"
                          >
                            Shortlist Candidate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus({
                                applicationId: app.id,
                                status: "HIRED",
                              })
                            }
                            className="text-[14px] font-[500] text-[#054d28] focus:bg-[#e2f6d5] rounded-[8px] cursor-pointer py-2 px-2.5"
                          >
                            Mark as Hired
                          </DropdownMenuItem>
                          <div className="h-px bg-[rgba(14,15,12,0.05)] my-1 mx-1" />
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus({
                                applicationId: app.id,
                                status: "REJECTED",
                              })
                            }
                            className="text-[14px] font-[500] text-[#d03238] focus:bg-[#d03238]/10 rounded-[8px] cursor-pointer py-2 px-2.5"
                          >
                            Reject Candidate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-4 border-t border-[rgba(14,15,12,0.05)] flex items-center justify-between">
                  <p className="text-[12px] font-[500] text-[#868685] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Applied{" "}
                    {formatDistanceToNow(parseISO(app.createdAt), {
                      addSuffix: true,
                    })}
                  </p>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/recruiter/jobs/${id}/applications/${app.id}?candidateId=${app.candidate.id}`,
                        )
                      }
                      className="px-4 py-2 rounded-full bg-[#163300]/[0.08] text-[#0e0f0c] font-[600] text-[14px] hover:bg-[#163300]/[0.12] transition-colors"
                    >
                      View Profile
                    </button>
                    {app.candidate.resume && (
                      <button
                        onClick={() =>
                          window.open(app.candidate.resume as string, "_blank")
                        }
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ffffff] text-[#0e0f0c] font-[600] text-[14px] border border-[rgba(14,15,12,0.12)] hover:bg-[#e8ebe6] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Resume
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#ffffff] rounded-[16px] p-[64px] border border-[rgba(14,15,12,0.12)] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#e8ebe6] text-[#868685] rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-[20px] font-[900] text-[#0e0f0c] mb-2">
              No Candidates Found
            </h2>
            <p className="text-[#868685] font-[500] text-[15px] max-w-sm mx-auto">
              {search || statusFilter !== "ALL"
                ? "We couldn't find any applications matching your current filters."
                : "This position hasn't received any applications yet."}
            </p>
            {(search || statusFilter !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("ALL");
                }}
                className="mt-6 bg-[#ffffff] border border-[rgba(14,15,12,0.12)] text-[#0e0f0c] hover:bg-[#e8ebe6] rounded-full font-[600] h-10 px-6 text-[14px] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModalState.isOpen}
        onClose={() => setConfirmModalState({ isOpen: false, action: null })}
        title="Confirm Bulk Action"
        description={`You are about to mark ${selectedCandidates.length} candidate${selectedCandidates.length !== 1 ? "s" : ""} as ${confirmModalState.action}.`}
        onConfirm={confirmBulkAction}
        isLoading={isConfirming}
        confirmText="Confirm"
        cancelText="Cancel"
        variant={confirmModalState.action === "REJECTED" ? "danger" : "info"}
      >
        {confirmModalState.action === "SHORTLISTED" && (
          <div className="py-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <Checkbox
                checked={rejectOthers}
                onCheckedChange={(checked) =>
                  setRejectOthers(checked as boolean)
                }
                className="mt-1"
              />
              <div className="space-y-1">
                <p className="text-sm font-medium text-near-black">
                  Reject remaining unselected candidates
                </p>
                <p className="text-xs text-gray-500">
                  Automatically update all other active applicants on this page
                  to REJECTED.
                </p>
              </div>
            </label>
          </div>
        )}
      </ConfirmationModal>
    </div>
  );
}
