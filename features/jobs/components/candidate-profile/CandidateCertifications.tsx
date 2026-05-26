import { Award } from "lucide-react";

export interface CandidateCertificationData {
  certificateName?: string;
  issuingOrganization?: string;
  issueDate?: string;
  certificateUrl?: string;
}

interface CandidateCertificationsProps {
  certificates: CandidateCertificationData[];
}

export function CandidateCertifications({
  certificates,
}: CandidateCertificationsProps) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="bg-[#ffffff] p-8 rounded-[20px] border border-[rgba(14,15,12,0.08)] shadow-sm">
      <h3 className="text-[20px] font-[800] text-[#0e0f0c] mb-6 flex items-center gap-2.5">
        <Award className="size-6 text-[#054d28]" /> Certifications
      </h3>
      <div className="grid gap-5 md:grid-cols-2">
        {certificates.map((cert, idx: number) => (
          <div
            key={idx}
            className="p-5 rounded-[16px] bg-[#f9faf9] border border-[rgba(14,15,12,0.05)] flex items-start gap-4 hover:shadow-sm transition-shadow"
          >
            <div className="size-10 rounded-full bg-[#054d28]/10 flex items-center justify-center shrink-0">
              <Award className="size-5 text-[#054d28]" />
            </div>
            <div className="w-full">
              <h4 className="text-[16px] font-[800] text-[#0e0f0c]">
                {cert.certificateName}
              </h4>
              <p className="text-[14px] font-[500] text-[#454745] mt-1 mb-2">
                {cert.issuingOrganization}
              </p>

              {cert.issueDate && (
                <p className="text-[12px] font-[500] text-[#868685]">
                  Issued:{" "}
                  {new Date(cert.issueDate).toLocaleDateString(undefined, {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}

              {cert.certificateUrl && (
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-[13px] font-[600] text-[#054d28] hover:underline"
                >
                  View Credential ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
