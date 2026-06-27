"use client";

import {
  Ban,
  Briefcase,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import { useCandidateDetails } from "../hooks/use-candidate-details";
import { BlockStatusModal } from "./BlockStatusModal";

interface CandidateDetailsProps {
  id: string;
}

export const CandidateDetails = ({ id }: CandidateDetailsProps) => {
  const {
    data: candidate,
    education,
    experience,
    certificates,
    isPending,
    statusMutation,
  } = useCandidateDetails(id);

  const [isBlockingModalOpen, setIsBlockingModalOpen] = useState(false);

  const isBlocked = candidate?.status === "Blocked";

  const handleConfirmStatusChange = (reason: string) => {
    const nextStatus = isBlocked ? "Active" : "Blocked";
    statusMutation.mutate({ status: nextStatus, description: reason });
    setIsBlockingModalOpen(false);
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-hairline border-t-coral" />
        <p className="text-[13px] font-medium text-muted-soft">
          Loading profile…
        </p>
      </div>
    );
  }

  if (!candidate) return null;

  return (
    <div className="space-y-6">
      {isBlocked && (
        <div className="flex items-start gap-4 rounded-xl border border-destructive/20 bg-destructive/10 p-5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-destructive">
            <Ban className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-ink">
              Profile restricted
            </h4>
            <p className="text-[13px] text-muted-ink">
              This candidate account has been blocked by administrators.
            </p>
            {candidate.block_description && (
              <p className="mt-2 inline-block rounded-md bg-white px-2.5 py-1 text-[13px] text-destructive">
                Reason: {candidate.block_description}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Profile Card */}
        <div className="space-y-6">
          <section className="rounded-xl border border-hairline bg-white p-6">
            <div className="space-y-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-navy text-2xl font-semibold text-on-dark">
                {candidate.name.charAt(0)}
              </div>

              <div>
                <h1 className="text-[24px] font-semibold leading-tight tracking-[-0.01em] text-ink">
                  {candidate.name}
                </h1>
                <p className="mt-1 text-sm text-muted-ink">{candidate.role}</p>
              </div>

              <div className="space-y-3 border-t border-hairline-soft pt-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-soft text-muted-ink">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="truncate text-sm text-body">
                    {candidate.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-soft text-muted-ink">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-body tabular-nums">
                    {candidate.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-soft text-muted-ink">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-body">
                    {candidate.location}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-hairline bg-white p-6">
            <h3 className="mb-4 text-[15px] font-semibold text-ink">
              Core competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills && candidate.skills.length > 0 ? (
                candidate.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-md border border-hairline bg-surface-soft px-2.5 py-1 text-[13px] font-medium text-body"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-[13px] text-muted-soft">
                  No skills listed
                </span>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Details & Experience */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-hairline bg-white p-6">
            <h2 className="mb-3 text-[15px] font-semibold text-ink">About</h2>
            <p className="text-sm leading-relaxed text-body">
              {candidate.about || "No professional narrative provided yet."}
            </p>
          </section>

          {/* Education & Experience Dynamic Sections */}
          <div className="grid grid-cols-1 gap-6">
            <section className="rounded-xl border border-hairline bg-white p-6">
              <h3 className="mb-5 flex items-center gap-2 border-b border-hairline-soft pb-3 text-[15px] font-semibold text-ink">
                <Briefcase className="h-4 w-4 text-muted-ink" />
                Work history & experience
              </h3>
              <div className="space-y-6">
                {experience && experience.length > 0 ? (
                  experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="relative border-l border-hairline pb-6 pl-6 last:pb-0"
                    >
                      <div className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full border-2 border-white bg-muted-soft" />
                      <p className="text-sm font-semibold text-ink">
                        {exp.projectName}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-muted-ink">
                        <span className="font-medium text-body">
                          {exp.company || "Independent"}
                        </span>
                        <span className="text-muted-soft">•</span>
                        <span>{exp.role || "Developer"}</span>
                        <span className="text-muted-soft">•</span>
                        <span className="text-muted-soft">
                          {exp.location || "Remote"}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] text-muted-soft tabular-nums">
                        {exp.employmentType || "Full-time"} |{" "}
                        {new Date(exp.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        —{" "}
                        {exp.currentlyWorking
                          ? "Present"
                          : new Date(exp.endDate).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                      </p>
                      <p className="mt-3 whitespace-pre-wrap rounded-lg border border-hairline-soft bg-surface-soft p-4 text-[13px] leading-relaxed text-body">
                        {exp.description}
                      </p>
                      {exp.skillsLearned && exp.skillsLearned.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {exp.skillsLearned.map((s) => (
                            <span
                              key={s}
                              className="rounded-md border border-hairline bg-surface-soft px-2 py-0.5 text-[13px] font-medium text-body"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="py-2 text-[13px] text-muted-soft">
                    No work history or experiences added yet.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-xl border border-hairline bg-white p-6">
              <h3 className="mb-5 flex items-center gap-2 border-b border-hairline-soft pb-3 text-[15px] font-semibold text-ink">
                <GraduationCap className="h-4 w-4 text-muted-ink" />
                Educational background
              </h3>
              <div className="space-y-5">
                {education && education.length > 0 ? (
                  education.map((edu) => (
                    <div
                      key={edu.id}
                      className="relative border-l border-hairline pb-6 pl-6 last:pb-0"
                    >
                      <div className="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full border-2 border-white bg-muted-soft" />
                      <p className="text-sm font-semibold text-ink">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                      <p className="mt-0.5 text-[13px] font-medium text-body">
                        {edu.institutionName}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-muted-soft tabular-nums">
                        <span>
                          {new Date(edu.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          —{" "}
                          {edu.endDate
                            ? new Date(edu.endDate).toLocaleDateString(
                                "en-US",
                                { month: "short", year: "numeric" },
                              )
                            : "Present"}
                        </span>
                        {edu.gpa && (
                          <>
                            <span>•</span>
                            <span className="rounded-md bg-surface-soft px-2 py-0.5 font-medium text-body">
                              GPA: {edu.gpa}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-2 text-[13px] text-muted-soft">
                    No educational credentials added yet.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Certifications Dynamic Section */}
          <section className="rounded-xl border border-hairline bg-white p-6">
            <h3 className="mb-5 border-b border-hairline-soft pb-3 text-[15px] font-semibold text-ink">
              Certifications & awards
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {certificates && certificates.length > 0 ? (
                certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-center gap-3 rounded-lg border border-hairline-soft bg-surface-soft p-4 transition-colors hover:border-hairline"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-semibold text-muted-ink">
                      {cert.certificateName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-tight text-ink">
                        {cert.certificateName}
                      </p>
                      <p className="mt-0.5 text-[13px] text-muted-ink">
                        {cert.issuingOrganization}
                      </p>
                      <p className="mt-1 text-[13px] text-muted-soft tabular-nums">
                        Earned:{" "}
                        {new Date(cert.issueDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-2 text-[13px] text-muted-soft md:col-span-2">
                  No certifications listed yet.
                </p>
              )}
            </div>
          </section>

          {/* Active Applications Section */}
          <section className="rounded-xl border border-hairline bg-white p-6">
            <div className="mb-5 flex items-center justify-between border-b border-hairline-soft pb-3">
              <h3 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                <Clock className="h-4 w-4 text-muted-ink" />
                Active job applications
              </h3>
              <span className="text-[13px] text-muted-soft tabular-nums">
                {candidate.applications?.length || 0} ongoing
              </span>
            </div>
            <div className="space-y-3">
              {candidate.applications && candidate.applications.length > 0 ? (
                candidate.applications.map((app) => (
                  <div
                    key={`${app.company}-${app.jobTitle}`}
                    className="flex items-center justify-between rounded-lg border border-hairline-soft bg-surface-soft p-4 transition-colors hover:border-hairline"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {app.jobTitle}
                      </p>
                      <p className="mt-0.5 text-[13px] text-muted-ink">
                        {app.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <StatusBadge
                        tone={
                          app.status === "Interviewing" ? "success" : "neutral"
                        }
                      >
                        {app.status}
                      </StatusBadge>
                      <p className="mt-1.5 text-[13px] text-muted-soft tabular-nums">
                        {app.date}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[13px] text-muted-soft">
                  No active job applications.
                </p>
              )}
            </div>
          </section>

          {/* Documents Section */}
          <section className="rounded-xl border border-hairline bg-white p-6">
            <h3 className="mb-5 flex items-center gap-2 border-b border-hairline-soft pb-3 text-[15px] font-semibold text-ink">
              <FileText className="h-4 w-4 text-muted-ink" />
              Documents & attachments
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {candidate.documents && candidate.documents.length > 0 ? (
                candidate.documents.map((doc) => (
                  <a
                    key={doc.name}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-hairline-soft bg-surface-soft p-4 transition-colors hover:border-hairline"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-muted-ink">
                        <FileText className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="max-w-[140px] truncate text-sm font-medium text-ink">
                          {doc.name}
                        </p>
                        <p className="text-[13px] text-muted-soft">
                          {doc.type} file
                        </p>
                      </div>
                    </div>
                    <Download className="h-4 w-4 text-muted-soft transition-colors group-hover:text-ink" />
                  </a>
                ))
              ) : (
                <p className="py-2 text-[13px] text-muted-soft md:col-span-2">
                  No documents attached yet.
                </p>
              )}
            </div>
          </section>

          {/* Action Row */}
          <div className="flex justify-end gap-3 border-t border-hairline pt-6">
            <button
              type="button"
              onClick={() => setIsBlockingModalOpen(true)}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/30 active:translate-y-px",
                isBlocked
                  ? "border border-hairline bg-white text-body hover:bg-surface-soft"
                  : "border border-transparent bg-destructive text-white hover:bg-destructive/90",
              )}
            >
              {isBlocked ? "Restore access" : "Restrict access"}
            </button>
          </div>
        </div>
      </div>

      <BlockStatusModal
        isOpen={isBlockingModalOpen}
        onClose={() => setIsBlockingModalOpen(false)}
        onConfirm={handleConfirmStatusChange}
        candidateName={candidate.name}
        isBlocked={isBlocked}
        isLoading={statusMutation.isPending}
      />
    </div>
  );
};
