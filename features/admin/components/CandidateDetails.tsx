"use client";

import {
  BadgeCheck,
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
import { Button } from "@/components/animate-ui/components/buttons/button";
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">
          Analyzing Profile Data...
        </p>
      </div>
    );
  }

  if (!candidate) return null;

  return (
    <div className="space-y-8">
      {isBlocked && (
        <div className="bg-red-50/70 border border-red-100 rounded-[2rem] p-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 shrink-0">
            <Ban className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-red-600 uppercase tracking-widest">
              Profile Restricted
            </h4>
            <p className="text-xs font-bold text-gray-500">
              This candidate account has been blocked by administrators.
            </p>
            {candidate.block_description && (
              <p className="text-xs font-medium text-red-500/80 bg-red-100/30 px-3 py-1.5 rounded-lg border border-red-500/10 mt-2 inline-block">
                Reason: {candidate.block_description}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Profile Card */}
        <div className="space-y-8">
          <section className="bg-white border border-gray-100 rounded-[3rem] p-10 shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-wise-green/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-wise-green/20 transition-all" />

            <div className="relative z-10 space-y-6">
              <div className="w-32 h-32 rounded-[2.5rem] bg-wise-green flex items-center justify-center text-4xl font-black text-near-black shadow-2xl">
                {candidate.name.charAt(0)}
              </div>

              <div>
                <h1 className="text-3xl font-black tracking-tight uppercase text-near-black">
                  {candidate.name}
                </h1>
                <p className="text-positive-green font-bold text-sm mt-1">
                  {candidate.role}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-wise-green" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 truncate max-w-[200px]">
                    {candidate.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-wise-green" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {candidate.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-wise-green" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {candidate.location}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-gray-50 pb-3">
              <BadgeCheck className="w-5 h-5 text-wise-green" />
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills && candidate.skills.length > 0 ? (
                candidate.skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-50 text-near-black text-xs font-black uppercase tracking-widest rounded-xl border border-gray-100 hover:border-wise-green/30 hover:bg-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 font-bold italic">
                  No skills listed
                </span>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Details & Experience */}
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-wise-green rounded-full" />
              <h2 className="text-lg font-extrabold text-slate-800 uppercase tracking-wider">
                Professional Narrative
              </h2>
            </div>
            <p className="text-base font-bold text-slate-600 leading-relaxed italic">
              "{candidate.about || "No professional narrative provided yet."}"
            </p>
          </section>

          {/* Education & Experience Dynamic Sections */}
          <div className="grid grid-cols-1 gap-8">
            <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-gray-50 pb-3">
                <Briefcase className="w-5 h-5 text-wise-green" />
                Work History & Experience
              </h3>
              <div className="space-y-8">
                {experience && experience.length > 0 ? (
                  experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="relative pl-8 border-l-2 border-slate-100 pb-6 last:pb-0"
                    >
                      <div className="absolute top-1 -left-[6px] w-2.5 h-2.5 rounded-full bg-wise-green border-2 border-white shadow-sm" />
                      <p className="text-base font-extrabold text-slate-800">
                        {exp.projectName}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 mt-1">
                        <span className="text-slate-800 font-black">
                          {exp.company || "Independent"}
                        </span>
                        <span>•</span>
                        <span>{exp.role || "Developer"}</span>
                        <span>•</span>
                        <span className="text-slate-400">
                          {exp.location || "Remote"}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 mt-1">
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
                      <p className="text-xs text-slate-600 mt-3 font-bold bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 leading-relaxed whitespace-pre-wrap">
                        {exp.description}
                      </p>
                      {exp.skillsLearned && exp.skillsLearned.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.skillsLearned.map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-3 text-slate-400 italic py-4">
                    <p className="text-sm font-bold">
                      No work history or experiences added yet.
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-gray-50 pb-3">
                <GraduationCap className="w-5 h-5 text-wise-green" />
                Educational Background
              </h3>
              <div className="space-y-6">
                {education && education.length > 0 ? (
                  education.map((edu) => (
                    <div
                      key={edu.id}
                      className="relative pl-8 border-l-2 border-slate-100 pb-6 last:pb-0"
                    >
                      <div className="absolute top-1 -left-[6px] w-2.5 h-2.5 rounded-full bg-wise-green border-2 border-white shadow-sm" />
                      <p className="text-base font-extrabold text-slate-800">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                      <p className="text-xs font-extrabold text-slate-700 mt-0.5">
                        {edu.institutionName}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400 mt-1">
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
                            <span className="text-wise-green font-black bg-wise-green/5 px-2 py-0.5 rounded-lg border border-wise-green/10">
                              GPA: {edu.gpa}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-3 text-slate-400 italic py-4">
                    <p className="text-sm font-bold">
                      No educational credentials added yet.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Certifications Dynamic Section */}
          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-6 border-b border-gray-50 pb-3">
              Professional Certifications & Awards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates && certificates.length > 0 ? (
                certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-center gap-4 p-5 bg-slate-50/50 hover:bg-slate-50 rounded-3xl border border-slate-100/50 transition-all hover:shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-wise-green/10 text-wise-green flex items-center justify-center font-black text-lg shrink-0">
                      {cert.certificateName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-800 leading-tight">
                        {cert.certificateName}
                      </p>
                      <p className="text-xs font-bold text-slate-500 mt-0.5">
                        {cert.issuingOrganization}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">
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
                <div className="md:col-span-2 text-slate-400 italic py-4 text-sm font-bold">
                  No certifications listed yet.
                </div>
              )}
            </div>
          </section>

          {/* Active Applications Section */}
          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-5 h-5 text-wise-green" />
                Active Job Applications
              </h3>
              <span className="text-[10px] font-black text-wise-green uppercase tracking-widest bg-wise-green/5 px-4 py-2 rounded-xl">
                {candidate.applications?.length || 0} Ongoing
              </span>
            </div>
            <div className="space-y-4">
              {candidate.applications && candidate.applications.length > 0 ? (
                candidate.applications.map((app, idx: number) => (
                  <div
                    key={idx}
                    className="p-6 bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 rounded-3xl border border-transparent hover:border-gray-100 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-near-black uppercase tracking-tight">
                          {app.jobTitle}
                        </p>
                        <p className="text-xs font-bold text-gray-400 mt-1">
                          {app.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={cn(
                            "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                            app.status === "Interviewing"
                              ? "bg-green-50 text-green-600"
                              : "bg-blue-50 text-blue-500",
                          )}
                        >
                          {app.status}
                        </span>
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-2">
                          {app.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 italic text-sm font-bold">
                  No active job applications.
                </div>
              )}
            </div>
          </section>

          {/* Documents Section */}
          <section className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-wise-green" />
              Credential Dossier & Attachments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidate.documents && candidate.documents.length > 0 ? (
                candidate.documents.map((doc, idx: number) => (
                  <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 group hover:border-wise-green transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-wise-green/10 transition-colors">
                        <FileText className="w-5 h-5 text-near-black" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-near-black truncate max-w-[120px] uppercase tracking-tight">
                          {doc.name}
                        </p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                          {doc.type} File
                        </p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-300 group-hover:text-wise-green transition-colors" />
                  </a>
                ))
              ) : (
                <div className="text-slate-400 italic text-sm font-bold md:col-span-2">
                  No documents attached yet.
                </div>
              )}
            </div>
          </section>

          {/* Action Row */}
          <div className="pt-8 border-t border-gray-100 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setIsBlockingModalOpen(true)}
              className={cn(
                "h-12 px-8 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                isBlocked
                  ? "border-green-100 text-green-600 hover:bg-green-50 hover:border-green-200"
                  : "border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200",
              )}
            >
              {isBlocked ? "Restore Access" : "Restrict Access"}
            </Button>
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
