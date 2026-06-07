import { Code } from "lucide-react";

interface CandidateSkillsProps {
  skills: string[];
}

export function CandidateSkills({ skills }: CandidateSkillsProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="bg-[#ffffff] p-8 rounded-[20px] border border-[rgba(14,15,12,0.08)] shadow-sm">
      <h3 className="text-[20px] font-[800] text-[#0e0f0c] mb-5 flex items-center gap-2.5">
        <Code className="w-6 h-6 text-[#054d28]" /> Skills & Technologies
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill: string, idx: number) => (
          <span
            key={idx}
            className="px-4 py-2 bg-[#f4f6f3] border border-[rgba(14,15,12,0.08)] text-[#0e0f0c] font-[600] text-[14px] rounded-full hover:bg-[#e8ebe6] transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
