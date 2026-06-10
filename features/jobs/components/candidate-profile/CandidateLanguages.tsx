interface CandidateLanguagesProps {
  languages: Array<{ name: string; proficiency: string }>;
}

export function CandidateLanguages({ languages }: CandidateLanguagesProps) {
  if (!languages || languages.length === 0) return null;

  return (
    <div className="bg-[#ffffff] p-6 rounded-[20px] border border-[rgba(14,15,12,0.08)] shadow-sm space-y-4">
      <h3 className="text-[16px] font-[800] text-[#0e0f0c] border-b border-[rgba(14,15,12,0.08)] pb-3">
        Languages
      </h3>
      <div className="flex flex-col gap-3">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center justify-between">
            <span className="text-[15px] font-[600] text-[#0e0f0c]">
              {lang.name}
            </span>
            <span className="text-[13px] font-[500] text-[#054d28] bg-[#054d28]/5 px-2.5 py-1 rounded-full">
              {lang.proficiency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
