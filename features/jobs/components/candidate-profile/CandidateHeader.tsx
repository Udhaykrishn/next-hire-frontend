import { ArrowLeft } from "lucide-react";

interface CandidateHeaderProps {
  status: string;
  onGoBack: () => void;
  onUpdateStatus: (status: string) => void;
}

export function CandidateHeader({ status, onGoBack, onUpdateStatus }: CandidateHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[rgba(14,15,12,0.08)]">
      <button
        onClick={onGoBack}
        className="flex items-center gap-2 text-[#454745] hover:text-[#0e0f0c] font-[600] transition-colors self-start bg-white px-4 py-2 rounded-full border border-[rgba(14,15,12,0.08)] shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back to List
      </button>

      <div className="flex items-center gap-2 bg-[#ffffff] p-1.5 rounded-full border border-[rgba(14,15,12,0.08)] shadow-sm">
        <button
          onClick={() => onUpdateStatus("REVIEWING")}
          className={`px-5 py-2 rounded-full text-[14px] font-[600] transition-all ${status === 'REVIEWING' ? 'bg-[#38c8ff]/10 text-[#0e0f0c] shadow-sm' : 'hover:bg-[#e8ebe6] text-[#868685]'}`}
        >
          Reviewing
        </button>
        <button
          onClick={() => onUpdateStatus("SHORTLISTED")}
          className={`px-5 py-2 rounded-full text-[14px] font-[600] transition-all ${status === 'SHORTLISTED' ? 'bg-[#054d28] text-white shadow-sm' : 'hover:bg-[#e8ebe6] text-[#868685]'}`}
        >
          Shortlist
        </button>
        <button
          onClick={() => onUpdateStatus("REJECTED")}
          className={`px-5 py-2 rounded-full text-[14px] font-[600] transition-all ${status === 'REJECTED' ? 'bg-[#d03238]/10 text-[#d03238] shadow-sm' : 'hover:bg-[#e8ebe6] text-[#868685]'}`}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
