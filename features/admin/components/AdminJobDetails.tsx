"use client";

import DOMPurify from "isomorphic-dompurify";
import {
  ArrowLeft,
  Ban,
  Briefcase,
  Building,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Gift,
  Heart,
  MapPin,
  Phone,
  ShieldAlert,
  Target,
  Unlock,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type ElementType, useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { formatSalaryAmount } from "@/lib/salary";
import { useAdminJobDetails } from "../hooks/use-admin-job-details";
import { useAdminJobStats } from "../hooks/use-admin-job-stats";
import { useAdminJobs } from "../hooks/use-admin-jobs";

import { AdminJobApplicationsList } from "./AdminJobApplicationsList";

// Helper components for the premium UI
const SectionHeader = ({
  icon: Icon,
  title,
}: {
  icon: ElementType;
  title: string;
}) => (
  <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
    <div className="w-10 h-10 bg-wise-green/10 rounded-2xl flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-wise-green" />
    </div>
    <h3 className="font-black text-lg text-near-black tracking-tight">
      {title}
    </h3>
  </div>
);

const MetaField = ({
  label,
  value,
  highlight = false,
  icon: Icon,
}: {
  label: string;
  value?: string | number | null;
  highlight?: boolean;
  icon?: ElementType;
}) => {
  if (!value || value === "N/A" || value === "None") return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-gray-400" />}
        {label}
      </span>
      <span
        className={`text-sm ${highlight ? "font-black text-near-black" : "font-semibold text-gray-700"}`}
      >
        {value}
      </span>
    </div>
  );
};

export const AdminJobDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data: job } = useAdminJobDetails(id);
  const { data: statsData } = useAdminJobStats(id);
  const { handleConfirmBlock } = useAdminJobs();

  const [dialogType, setDialogType] = useState<"block" | "unblock" | null>(
    null,
  );

  const handleAction = (action: "block" | "unblock") => {
    setDialogType(action);
  };

  const closeDialog = () => {
    setDialogType(null);
  };

  const handleConfirmAction = () => {
    if (job) {
      handleConfirmBlock(job.id);
    }
    closeDialog();
  };

  if (!job) return null;

  const stats = statsData || {
    total: 0,
    reviewing: 0,
    interviews: 0,
    offers: 0,
  };
  const isBlocked = job.status !== "OPEN";

  return (
    <div className="max-w-7xl mx-auto pb-16 space-y-6">
      {/* Navigation */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="text-gray-500 hover:text-near-black flex items-center gap-2 px-0"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </Button>

      {/* Main Layout Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN - MAIN CONTENT (Span 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Hero Header Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-wise-green/10 to-transparent rounded-bl-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm ${
                      !isBlocked
                        ? "bg-wise-green/20 text-dark-green border border-wise-green/30"
                        : "bg-red-50 text-red-700 border border-red-100"
                    }`}
                  >
                    {job.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gray-50 text-gray-500 border border-gray-100">
                    {job.jobType}
                  </span>
                  <span className="text-sm font-semibold text-gray-400">•</span>
                  <span className="text-sm font-semibold text-gray-500">
                    Posted {job.posted}
                  </span>
                </div>

                {/* Minimal Admin Actions in Header */}
                <div>
                  {!isBlocked ? (
                    <Button
                      onClick={() => handleAction("block")}
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300 font-bold rounded-xl h-8 text-xs shadow-sm"
                    >
                      <Ban className="w-3.5 h-3.5 mr-1.5" /> Block Job
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAction("unblock")}
                      size="sm"
                      className="bg-wise-green text-dark-green hover:bg-[#8ade55] font-bold rounded-xl h-8 text-xs shadow-sm"
                    >
                      <Unlock className="w-3.5 h-3.5 mr-1.5" /> Reactivate Job
                    </Button>
                  )}
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-near-black tracking-tight mb-3 leading-tight">
                {job.jobTitle}
              </h1>

              <div className="flex items-center gap-2 text-lg font-medium text-gray-600 mb-8">
                <Building className="w-5 h-5 text-gray-400" />
                <span className="font-bold text-near-black">
                  {job.hiringCompany}
                </span>
                {job.belongingCompany &&
                  job.belongingCompany !== job.hiringCompany && (
                    <span className="text-sm text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                      via {job.belongingCompany}
                    </span>
                  )}
              </div>

              {/* Core Metrics Ribbon */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                <MetaField
                  icon={DollarSign}
                  label="Salary Range"
                  value={`${formatSalaryAmount(job.minSalary, "INR", "short")} - ${formatSalaryAmount(job.maxSalary, "INR", "short")}`}
                  highlight
                />
                <MetaField
                  icon={MapPin}
                  label="Location"
                  value={job.locationType}
                  highlight
                />
                <MetaField
                  icon={Briefcase}
                  label="Experience"
                  value={job.experience}
                  highlight
                />
                <MetaField
                  icon={Clock}
                  label="Expires On"
                  value={job.expireIn}
                />
              </div>
            </div>
          </div>

          {/* Job Overview & Description */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <SectionHeader
              icon={FileText}
              title="Job Description & Responsibilities"
            />

            {job.description && (
              <div className="mb-8">
                <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Brief Overview
                </h4>
                <div
                  className="text-gray-700 font-medium leading-relaxed prose prose-sm max-w-none bg-gray-50/50 p-5 rounded-2xl border border-gray-100"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: Sanitized with DOMPurify
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(job.description),
                  }}
                />
              </div>
            )}

            {job.jobDescription ? (
              <div>
                <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Detailed Responsibilities
                </h4>
                <div
                  className="text-gray-700 font-medium leading-relaxed prose prose-sm max-w-none prose-p:mb-4 prose-ul:list-disc prose-ul:pl-4 prose-li:mb-1 marker:text-wise-green"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: Sanitized with DOMPurify
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(job.jobDescription),
                  }}
                />
              </div>
            ) : (
              <p className="text-gray-400 italic font-medium">
                No detailed description provided.
              </p>
            )}
          </div>

          {/* Qualifications & Skills */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <SectionHeader
              icon={Target}
              title="Requirements & Qualifications"
            />

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-5">
                <MetaField label="Minimum Education" value={job.education} />
                <MetaField
                  label="Degree Specializations"
                  value={job.degreeSpecialization?.join(", ")}
                />
                <MetaField label="English Level" value={job.englishLevel} />
                <MetaField
                  label="Regional Languages"
                  value={job.regionalLanguages?.join(", ")}
                />
              </div>
              <div className="space-y-5">
                <MetaField
                  label="Minimum Experience"
                  value={`${job.minExperience} Years`}
                />
                <MetaField
                  label="Age Requirements"
                  value={
                    job.minAge && job.maxAge
                      ? `${job.minAge} to ${job.maxAge} years`
                      : undefined
                  }
                />
                <MetaField label="Gender Preference" value={job.gender} />
                <MetaField
                  label="Night Shift"
                  value={job.isNightShift ? "Yes - Required" : "No"}
                />
              </div>
            </div>

            {job.skills && job.skills.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Required Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-wise-green/10 border border-wise-green/20 rounded-xl text-xs font-bold text-dark-green cursor-default hover:bg-wise-green/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Perks, Benefits & Financials */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <SectionHeader icon={Heart} title="Perks, Benefits & Financials" />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <MetaField
                  icon={Gift}
                  label="Additional Perks"
                  value={job.perks?.join(", ")}
                  highlight
                />
                <MetaField
                  label="Incentives / Bonus"
                  value={job.incentiveAmount}
                />
                <MetaField label="Pay Type Structure" value={job.payType} />
              </div>
              <div className="space-y-5">
                <div className="flex flex-col gap-1 p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> Joining Fee Status
                  </span>
                  {job.hasJoiningFee === "Yes" ? (
                    <div className="mt-1 space-y-2">
                      <span className="text-sm font-black text-red-600 block">
                        Requires Fee: {job.feeAmount}
                      </span>
                      <p className="text-xs text-gray-600 font-medium border-l-2 border-red-200 pl-2">
                        {job.feeReason} • {job.feePaymentTiming} <br />
                        <span className="text-gray-400 mt-1 block">
                          {job.feeDetails}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-green-600 mt-1">
                      No Joining Fee
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Render Job Applications List at the bottom of the main content */}
          <div className="pt-4">
            <AdminJobApplicationsList jobId={id} />
          </div>
        </div>

        {/* RIGHT COLUMN - SIDEBAR (Span 4) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
          {/* Application Insights Compact */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-bold text-near-black mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
              <Users className="w-4 h-4 text-gray-400" /> Applicant Pipeline
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Total Apps
                </span>
                <p className="text-2xl font-black text-near-black mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-50">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                  In Review
                </span>
                <p className="text-2xl font-black text-blue-900 mt-1">
                  {stats.reviewing}
                </p>
              </div>
              <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-50">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                  Interviews
                </span>
                <p className="text-2xl font-black text-purple-900 mt-1">
                  {stats.interviews}
                </p>
              </div>
              <div className="bg-wise-green/10 rounded-2xl p-4 border border-wise-green/20">
                <span className="text-[10px] font-bold text-dark-green uppercase tracking-widest">
                  Offers
                </span>
                <p className="text-2xl font-black text-dark-green mt-1">
                  {stats.offers}
                </p>
              </div>
            </div>
          </div>

          {/* Company & Contact Details */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-bold text-near-black mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
              <Phone className="w-4 h-4 text-gray-400" /> Contact & Hiring Rep
            </h4>
            <div className="space-y-4">
              <MetaField label="HR Name" value={job.hrName} />
              <MetaField label="Contact Number" value={job.hrPhone} />
              <MetaField label="Email Address" value={job.hrEmail} />
              <MetaField
                label="Contact Preference"
                value={job.contactPreference}
              />
              <MetaField
                label="Direct Candidate Contact"
                value={job.canCandidateContact}
              />
              <MetaField label="WhatsApp Alerts" value={job.whatsappAlerts} />

              {job.otherRecruiterName && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                    Secondary Recruiter
                  </span>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
                    <p className="text-sm font-bold text-near-black">
                      {job.otherRecruiterName}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      {job.otherRecruiterEmail}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      WA: {job.otherRecruiterWhatsapp}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location & Walk-In Details */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h4 className="font-bold text-near-black mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
              <MapPin className="w-4 h-4 text-gray-400" /> Location Details
            </h4>
            <div className="space-y-4">
              <MetaField label="Job City" value={job.jobCity} />
              <MetaField label="Office Address" value={job.officeAddress} />
              <MetaField
                label="Industry Category"
                value={job.industry?.join(", ")}
              />

              {job.isWalkIn && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                    <Calendar className="w-3.5 h-3.5" /> Walk-In Drive
                  </span>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                        Dates
                      </span>
                      <p className="text-sm font-bold text-blue-900">
                        {job.walkInStartDate} to {job.walkInEndDate}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                        Timings
                      </span>
                      <p className="text-sm font-bold text-blue-900">
                        {job.walkInStartTime} - {job.walkInEndTime}
                      </p>
                    </div>
                    <div className="border-t border-blue-200/50 pt-2 mt-2">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                        Instructions
                      </span>
                      <p className="text-xs text-blue-800 font-medium mt-1">
                        {job.interviewInstructions}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mt-2">
                        Venue
                      </span>
                      <p className="text-xs text-blue-800 font-medium mt-1">
                        {job.interviewAddress}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={dialogType === "block"}
        onClose={closeDialog}
        title="Flag Job as Threat / Scam?"
        description={`Are you sure you want to block "${job.jobTitle}"? This will hide the post from all candidates immediately.`}
        onConfirm={handleConfirmAction}
        variant="destructive"
        confirmText="Confirm Block"
      />

      <ConfirmationModal
        isOpen={dialogType === "unblock"}
        onClose={closeDialog}
        title="Activate Job Listing?"
        description={`Are you sure you want to reactivate "${job.jobTitle}"?`}
        onConfirm={handleConfirmAction}
        variant="success"
        confirmText="Activate"
      />
    </div>
  );
};
