import { GraduationCap } from "lucide-react";

export interface CandidateEducationData {
  degree?: string;
  institutionName?: string;
  startDate?: string;
  endDate?: string;
  fieldOfStudy?: string;
  gpa?: string;
}

interface CandidateEducationProps {
  education: CandidateEducationData[];
}

export function CandidateEducation({ education }: CandidateEducationProps) {
  return (
    <div className="bg-[#ffffff] p-8 rounded-[20px] border border-[rgba(14,15,12,0.08)] shadow-sm">
      <h3 className="text-[20px] font-[800] text-[#0e0f0c] mb-6 flex items-center gap-2.5">
        <GraduationCap className="size-6 text-[#054d28]" /> Education
      </h3>
      {education && education.length > 0 ? (
        <div className="grid gap-5">
          {education.map((edu, idx: number) => (
            <div
              key={idx}
              className="flex gap-5 p-6 rounded-[16px] bg-[#f9faf9] border border-[rgba(14,15,12,0.05)] hover:shadow-sm transition-shadow"
            >
              <div className="size-12 rounded-full bg-[#ffffff] shadow-sm border border-[rgba(14,15,12,0.08)] flex items-center justify-center shrink-0">
                <GraduationCap className="size-6 text-[#054d28]" />
              </div>
              <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                  <div>
                    <h4 className="text-[18px] font-[800] text-[#0e0f0c]">
                      {edu.degree}
                    </h4>
                    <p className="text-[16px] font-[600] text-[#054d28] mb-1">
                      {edu.institutionName}
                    </p>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <div className="text-[13px] font-[600] text-[#868685] bg-white px-3 py-1 rounded-full border border-[rgba(14,15,12,0.05)] whitespace-nowrap self-start">
                      {edu.startDate
                        ? new Date(edu.startDate).getFullYear()
                        : ""}
                      {" - "}
                      {edu.endDate
                        ? new Date(edu.endDate).getFullYear()
                        : "Present"}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[15px] text-[#454745]">
                    {edu.fieldOfStudy}
                  </p>
                  {edu.gpa && (
                    <p className="text-[13px] font-[600] text-[#0e0f0c] bg-[#e8ebe6] px-2 py-0.5 rounded-md">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#f9faf9] p-8 rounded-[16px] border border-[rgba(14,15,12,0.05)] text-center">
          <GraduationCap className="size-8 text-[#868685] mx-auto mb-3 opacity-50" />
          <p className="text-[#868685] text-[15px] font-[500]">
            No education details provided.
          </p>
        </div>
      )}
    </div>
  );
}
