import { Calendar, FileText } from "lucide-react";

interface ApplicationDetailsProps {
  status: string;
  createdAt: string;
  resumeUrl: string | null;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "REVIEWING":
      return "bg-[#38c8ff]/10 text-[#0e0f0c] border-[#38c8ff]/20";
    case "SHORTLISTED":
      return "bg-[#cdffad] text-[#054d28] border-[#9fe870]/30";
    case "HIRED":
      return "bg-[#054d28]/10 text-[#054d28] border-[#054d28]/20";
    case "REJECTED":
      return "bg-[#d03238]/10 text-[#d03238] border-[#d03238]/20";
    default:
      return "bg-[#e8ebe6] text-[#454745] border-[#0e0f0c]/10";
  }
};

export function ApplicationDetails({
  status,
  createdAt,
  resumeUrl,
}: ApplicationDetailsProps) {
  return (
    <div className="bg-[#ffffff] p-6 rounded-[20px] border border-[rgba(14,15,12,0.08)] shadow-sm space-y-5">
      <h3 className="text-[16px] font-[800] text-[#0e0f0c] border-b border-[rgba(14,15,12,0.08)] pb-3">
        Application Details
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[12px] font-[600] text-[#868685] uppercase tracking-wider mb-1.5">
            Status
          </p>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-[700] border ${getStatusStyles(status)}`}
          >
            {status}
          </span>
        </div>
        <div>
          <p className="text-[12px] font-[600] text-[#868685] uppercase tracking-wider mb-1.5">
            Applied On
          </p>
          <p className="text-[14px] font-[600] text-[#0e0f0c] flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#868685]" />
            {new Date(createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {resumeUrl && (
        <div className="pt-3">
          <button
            type="button"
            onClick={() => window.open(resumeUrl, "_blank")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] bg-[#054d28] text-white font-[600] text-[15px] hover:bg-[#054d28]/90 transition-all shadow-sm"
          >
            <FileText className="w-5 h-5" /> View Resume PDF
          </button>
        </div>
      )}
    </div>
  );
}
