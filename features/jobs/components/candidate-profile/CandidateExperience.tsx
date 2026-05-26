import { Briefcase } from "lucide-react";

export interface CandidateExperienceData {
  projectName?: string;
  role?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  location?: string;
  employmentType?: string;
  description?: string;
  skillsLearned?: string[];
}

interface CandidateExperienceProps {
  experience: CandidateExperienceData[];
}

export function CandidateExperience({ experience }: CandidateExperienceProps) {
  return (
    <div className="bg-[#ffffff] p-8 rounded-[20px] border border-[rgba(14,15,12,0.08)] shadow-sm">
      <h3 className="text-[20px] font-[800] text-[#0e0f0c] mb-6 flex items-center gap-2.5">
        <Briefcase className="w-6 h-6 text-[#054d28]" /> Work Experience
      </h3>
      {experience && experience.length > 0 ? (
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#054d28]/20 before:via-[#054d28]/10 before:to-transparent">
          {experience.map((exp, idx: number) => (
            <div key={idx} className="relative flex items-start gap-6 md:justify-start">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f4f6f3] border-2 border-[#ffffff] shadow-sm z-10 shrink-0">
                <Briefcase className="w-5 h-5 text-[#054d28]" />
              </div>
              <div className="bg-[#f9faf9] p-6 rounded-[16px] border border-[rgba(14,15,12,0.05)] w-full hover:shadow-sm transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-[18px] font-[800] text-[#0e0f0c]">{exp.projectName}</h4>
                    <p className="text-[15px] font-[600] text-[#054d28]">{exp.role} {exp.company ? `at ${exp.company}` : ''}</p>
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <div className="text-[13px] font-[600] text-[#868685] bg-white px-3 py-1 rounded-full border border-[rgba(14,15,12,0.05)] whitespace-nowrap">
                      {exp.startDate ? new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ''} 
                      {" - "} 
                      {exp.currentlyWorking ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Present')}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-4 text-[13px] font-[500] text-[#868685] mb-3">
                  {exp.location && <span>{exp.location}</span>}
                  {exp.employmentType && <span>• {exp.employmentType}</span>}
                </div>

                {exp.description && (
                  <p className="text-[15px] text-[#454745] leading-relaxed mb-4">{exp.description}</p>
                )}
                
                {exp.skillsLearned && exp.skillsLearned.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 pt-4 border-t border-[rgba(14,15,12,0.05)]">
                    {exp.skillsLearned.map((skill: string, sIdx: number) => (
                      <span key={sIdx} className="px-2.5 py-1 bg-[#ffffff] border border-[rgba(14,15,12,0.08)] text-[#454745] font-[500] text-[12px] rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#f9faf9] p-8 rounded-[16px] border border-[rgba(14,15,12,0.05)] text-center">
          <Briefcase className="w-8 h-8 text-[#868685] mx-auto mb-3 opacity-50" />
          <p className="text-[#868685] text-[15px] font-[500]">No experience details provided.</p>
        </div>
      )}
    </div>
  );
}
