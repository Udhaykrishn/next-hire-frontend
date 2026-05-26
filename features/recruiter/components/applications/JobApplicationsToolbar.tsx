import { CheckCircle2, Search, X, XCircle } from "lucide-react";

interface JobApplicationsToolbarProps {
  search: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  selectedCandidates: string[];
  onClearSelection: () => void;
  isBulkUpdating: boolean;
  isConfirming: boolean;
  onBulkUpdateClick: (status: "SHORTLISTED" | "REJECTED") => void;
}

export function JobApplicationsToolbar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  selectedCandidates,
  onClearSelection,
  isBulkUpdating,
  isConfirming,
  onBulkUpdateClick,
}: JobApplicationsToolbarProps) {
  const filterTabs = [
    "ALL",
    "AI_MATCHED",
    "PENDING",
    "REVIEWING",
    "SHORTLISTED",
    "HIRED",
    "REJECTED",
  ];

  return (
    <>
      {/* Filter Toolbar */}
      <div className="bg-[#ffffff] p-3 rounded-[16px] border border-[rgba(14,15,12,0.12)] flex flex-col lg:flex-row items-center justify-between gap-4 sticky top-4 z-20">
        <div className="relative flex-1 w-full lg:max-w-md ml-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-[#868685]" />
          <input
            aria-label="Control"
            type="text"
            placeholder="Search candidates by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent border-none text-[15px] font-[400] text-[#0e0f0c] placeholder:text-[#868685] focus:ring-0 outline-none"
          />
        </div>
        <div className="flex items-center gap-1 bg-[#e8ebe6] p-1.5 rounded-full w-full lg:w-auto overflow-x-auto no-scrollbar border border-[rgba(14,15,12,0.05)]">
          {filterTabs.map((st) => (
            <button
              type="button"
              key={st}
              onClick={() => {
                setStatusFilter(st);
                onClearSelection();
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
              onClick={onClearSelection}
              className="text-[13px] font-[600] text-[#868685] hover:text-[#0e0f0c] transition-colors flex items-center gap-1"
            >
              <X className="size-3.5" /> Clear
            </button>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              disabled={isBulkUpdating || isConfirming}
              onClick={() => onBulkUpdateClick("SHORTLISTED")}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#cdffad] hover:bg-[#b5f889] text-[#0e0f0c] font-[600] text-[13px] transition-colors disabled:opacity-50"
            >
              <CheckCircle2 className="size-4" /> Shortlist Selected
            </button>
            <button
              type="button"
              disabled={isBulkUpdating || isConfirming}
              onClick={() => onBulkUpdateClick("REJECTED")}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#ffffff] border border-[rgba(14,15,12,0.12)] hover:bg-[#d03238]/10 hover:text-[#d03238] hover:border-[#d03238]/30 text-[#0e0f0c] font-[600] text-[13px] transition-colors disabled:opacity-50"
            >
              <XCircle className="size-4" /> Reject Selected
            </button>
          </div>
        </div>
      )}
    </>
  );
}
