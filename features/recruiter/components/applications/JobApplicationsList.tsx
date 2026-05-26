import { formatDistanceToNow, parseISO } from "date-fns";
import {
  Calendar,
  CheckSquare,
  ExternalLink,
  Mail,
  MoreVertical,
  Square,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RecruiterJobApplication } from "@/features/jobs/hooks/use-recruiter-applications";

interface JobApplicationsListProps {
  applications: RecruiterJobApplication[];
  isLoading: boolean;
  selectedCandidates: string[];
  toggleSelection: (id: string) => void;
  handleSelectAll: () => void;
  handleSelectTop: (count: number) => void;
  onViewProfile: (appId: string, candidateId: string) => void;
  onUpdateStatus: (params: { applicationId: string; status: string }) => void;
  search: string;
  statusFilter: string;
  onClearFilters: () => void;
}

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

export function JobApplicationsList({
  applications,
  isLoading,
  selectedCandidates,
  toggleSelection,
  handleSelectAll,
  handleSelectTop,
  onViewProfile,
  onUpdateStatus,
  search,
  statusFilter,
  onClearFilters,
}: JobApplicationsListProps) {
  return (
    <>
      {/* Selection Control (Select All & Quick Select) */}
      {!isLoading && applications.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 mb-3 px-1">
          <button
            type="button"
            onClick={handleSelectAll}
            className="flex items-center gap-2 text-[14px] font-[600] text-[#454745] hover:text-[#0e0f0c] transition-colors shrink-0"
          >
            {selectedCandidates.length === applications.length ? (
              <CheckSquare className="w-5 h-5 text-[#054d28]" />
            ) : (
              <Square className="w-5 h-5 text-[#868685]" />
            )}
            {selectedCandidates.length === applications.length
              ? "Deselect All"
              : "Select All"}
          </button>

          {/* Dynamic Selection Buttons */}
          {applications.length >= 10 && (
            <div className="flex items-center gap-2 border-l border-[rgba(14,15,12,0.12)] pl-4">
              <span className="text-[13px] font-[500] text-[#868685]">
                Quick Select:
              </span>
              {[10, 15, 20, 50]
                .filter((c) => c <= applications.length)
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
        ) : applications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="group bg-[#ffffff] p-[24px] rounded-[16px] border border-[rgba(14,15,12,0.12)] hover:border-[#0e0f0c] transition-colors flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-start gap-4">
                      <button
                        type="button"
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
                            onViewProfile(app.id, app.candidate.id)
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
                              onUpdateStatus({
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
                              onUpdateStatus({
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
                              onUpdateStatus({
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
                              onUpdateStatus({
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
                      onClick={() => onViewProfile(app.id, app.candidate.id)}
                      className="px-4 py-2 rounded-full bg-[#163300]/[0.08] text-[#0e0f0c] font-[600] text-[14px] hover:bg-[#163300]/[0.12] transition-colors"
                    >
                      View Profile
                    </button>
                    {app.candidate.resume && (
                      <button
                        type="button"
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
                onClick={onClearFilters}
                className="mt-6 bg-[#ffffff] border border-[rgba(14,15,12,0.12)] text-[#0e0f0c] hover:bg-[#e8ebe6] rounded-full font-[600] h-10 px-6 text-[14px] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
