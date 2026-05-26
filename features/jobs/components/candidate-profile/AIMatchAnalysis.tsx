import { BrainCircuit, Sparkles } from "lucide-react";

interface AIMatchAnalysisProps {
  matchScore: number | null;
  matchBreakdown: { keywords: string[]; notes: string } | null;
  isAnalyzing: boolean;
  onAnalyze: (retry?: boolean) => void;
}

export function AIMatchAnalysis({
  matchScore,
  matchBreakdown,
  isAnalyzing,
  onAnalyze,
}: AIMatchAnalysisProps) {
  return (
    <div className="bg-[#ffffff] p-6 rounded-[20px] border border-[#38c8ff]/30 shadow-sm gap-y-4 relative overflow-hidden group">
      <div className="absolute top-0 right-0 size-32 bg-[#38c8ff]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none transition-all group-hover:bg-[#38c8ff]/10"></div>
      <h3 className="text-[16px] font-[800] text-[#0e0f0c] border-b border-[rgba(14,15,12,0.08)] pb-3 flex items-center gap-2">
        <BrainCircuit className="size-5 text-[#38c8ff]" /> AI Match Analysis
      </h3>

      {matchScore === null ? (
        <div className="flex flex-col items-center justify-center py-4 relative z-10">
          <p className="text-[13px] text-[#868685] text-center mb-4">
            Analyze the candidate's resume, skills, and experience against the
            job requirements.
          </p>
          <button
            type="button"
            onClick={() => onAnalyze()}
            disabled={isAnalyzing}
            className="w-full py-2.5 bg-[#f9faf9] border border-[#38c8ff]/30 text-[#054d28] rounded-[12px] text-[14px] font-[700] hover:bg-[#38c8ff]/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="size-4 border-2 border-[#38c8ff] border-t-transparent rounded-full animate-spin"></div>
                Analyzing Resume...
              </>
            ) : (
              <>
                <Sparkles className="size-4 text-[#38c8ff]" /> Calculate Match
                Score
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-2 gap-y-3 relative z-10">
          <div className="relative flex items-center justify-center size-28">
            <svg className="size-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-[#f4f6f3]"
              />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="301.59"
                strokeDashoffset={301.59 - (301.59 * matchScore) / 100}
                strokeLinecap="round"
                className={`transition-all duration-1000 ease-out ${matchScore >= 75 ? "text-[#054d28]" : matchScore >= 50 ? "text-[#38c8ff]" : "text-[#d03238]"}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[26px] font-[800] text-[#0e0f0c]">
                {matchScore}%
              </span>
            </div>
          </div>
          <p className="text-[14px] font-[700] text-[#0e0f0c]">
            {matchScore >= 80
              ? "Excellent Match"
              : matchScore >= 60
                ? "Good Match"
                : matchScore >= 40
                  ? "Fair Match"
                  : "Poor Match"}
          </p>
          <div className="flex gap-2 mt-2 w-full">
            <button
              type="button"
              onClick={() => onAnalyze(true)}
              className="flex-1 text-[12px] font-[600] text-[#868685] hover:text-[#054d28] bg-[#f9faf9] border border-[rgba(14,15,12,0.05)] py-1.5 rounded-lg transition-colors"
            >
              Re-analyze
            </button>
          </div>

          {matchBreakdown && (
            <div className="mt-4 w-full text-left gap-y-3 bg-[#f4f6f3] p-4 rounded-[12px] border border-[rgba(14,15,12,0.05)]">
              <div>
                <p className="text-[12px] font-[600] text-[#868685] uppercase tracking-wider mb-1.5">
                  AI Notes
                </p>
                <p className="text-[13px] font-[500] text-[#454745] leading-relaxed">
                  {matchBreakdown.notes}
                </p>
              </div>
              {matchBreakdown.keywords &&
                matchBreakdown.keywords.length > 0 && (
                  <div>
                    <p className="text-[12px] font-[600] text-[#868685] uppercase tracking-wider mb-2">
                      Matched Keywords
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {matchBreakdown.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="text-[11px] font-[600] text-[#054d28] bg-[#054d28]/10 px-2 py-0.5 rounded-full border border-[#054d28]/20"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
