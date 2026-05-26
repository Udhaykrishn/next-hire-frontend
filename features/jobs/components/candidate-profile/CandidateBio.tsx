import { User } from "lucide-react";

interface CandidateBioProps {
  bio: string | null;
}

export function CandidateBio({ bio }: CandidateBioProps) {
  if (!bio) return null;

  return (
    <div className="bg-[#ffffff] p-8 rounded-[20px] border border-[rgba(14,15,12,0.08)] shadow-sm">
      <h3 className="text-[20px] font-[800] text-[#0e0f0c] mb-4 flex items-center gap-2.5">
        <User className="size-6 text-[#054d28]" /> About Candidate
      </h3>
      <div className="text-[16px] font-[500] text-[#454745] leading-relaxed whitespace-pre-wrap bg-[#f9faf9] p-5 rounded-[12px] border border-[rgba(14,15,12,0.04)]">
        {bio}
      </div>
    </div>
  );
}
