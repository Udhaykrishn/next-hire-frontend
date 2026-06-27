"use client";

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
import { StatusBadge } from "@/components/admin/ui";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { RichTextViewer } from "@/components/ui/rich-text-viewer";
import { formatSalaryAmount } from "@/lib/salary";
import { useAdminJobDetails } from "../hooks/use-admin-job-details";
import { useAdminJobStats } from "../hooks/use-admin-job-stats";
import { useAdminJobs } from "../hooks/use-admin-jobs";

import { AdminJobApplicationsList } from "./AdminJobApplicationsList";

// Helper components for the calm, neutral admin UI
const SectionHeader = ({
  icon: Icon,
  title,
}: {
  icon: ElementType;
  title: string;
}) => (
  <div className="mb-6 flex items-center gap-3 border-b border-hairline-soft pb-4">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-soft text-muted-ink">
      <Icon className="h-[18px] w-[18px]" />
    </div>
    <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
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
      <span className="flex items-center gap-1.5 text-[13px] font-medium text-muted-soft">
        {Icon && <Icon className="h-3.5 w-3.5 text-muted-soft" />}
        {label}
      </span>
      <span
        className={
          highlight
            ? "text-sm font-semibold text-ink"
            : "text-sm font-medium text-body"
        }
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
    <div className="mx-auto max-w-7xl space-y-6 pb-16">
      {/* Navigation */}
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-ink transition-colors hover:text-ink"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-white">
          <ArrowLeft className="h-4 w-4" />
        </span>
        Back to jobs
      </button>

      {/* Main Layout Grid */}
      <div className="grid items-start gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN - MAIN CONTENT (Span 8) */}
        <div className="space-y-6 lg:col-span-8">
          {/* Hero Header Card */}
          <div className="rounded-xl border border-hairline bg-white p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <StatusBadge tone={!isBlocked ? "success" : "danger"}>
                  {job.status}
                </StatusBadge>
                <StatusBadge tone="neutral">{job.jobType}</StatusBadge>
                <span className="text-[13px] text-muted-soft">·</span>
                <span className="text-[13px] text-muted-ink tabular-nums">
                  Posted {job.posted}
                </span>
              </div>

              {/* Admin Action in Header */}
              <div>
                {!isBlocked ? (
                  <button
                    type="button"
                    onClick={() => handleAction("block")}
                    className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 active:translate-y-px"
                  >
                    <Ban className="h-4 w-4" /> Block job
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleAction("unblock")}
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-coral px-4 text-sm font-semibold text-white transition-colors hover:bg-coral-active active:translate-y-px"
                  >
                    <Unlock className="h-4 w-4" /> Reactivate job
                  </button>
                )}
              </div>
            </div>

            <h1 className="text-[24px] font-semibold leading-tight tracking-[-0.01em] text-ink">
              {job.jobTitle}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-body">
              <Building className="h-4 w-4 text-muted-ink" />
              <span className="font-semibold text-ink">
                {job.hiringCompany}
              </span>
              {job.belongingCompany &&
                job.belongingCompany !== job.hiringCompany && (
                  <span className="rounded-md border border-hairline bg-surface-soft px-2 py-0.5 text-[13px] text-muted-ink">
                    via {job.belongingCompany}
                  </span>
                )}
            </div>

            {/* Core Metrics Ribbon */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-hairline-soft pt-6 md:grid-cols-4">
              <MetaField
                icon={DollarSign}
                label="Salary range"
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
              <MetaField icon={Clock} label="Expires on" value={job.expireIn} />
            </div>
          </div>

          {/* Job Overview & Description */}
          <div className="rounded-xl border border-hairline bg-white p-6">
            <SectionHeader
              icon={FileText}
              title="Job description & responsibilities"
            />

            {job.description && (
              <div className="mb-8">
                <h4 className="mb-3 text-[13px] font-medium text-muted-soft">
                  Brief overview
                </h4>
                <RichTextViewer
                  content={job.description}
                  className="prose prose-sm max-w-none rounded-lg border border-hairline-soft bg-surface-soft/50 p-5 leading-relaxed text-body"
                />
              </div>
            )}

            {job.jobDescription ? (
              <div>
                <h4 className="mb-3 text-[13px] font-medium text-muted-soft">
                  Detailed responsibilities
                </h4>
                <RichTextViewer
                  content={job.jobDescription}
                  className="prose prose-sm max-w-none leading-relaxed text-body prose-p:mb-4 prose-ul:list-disc prose-ul:pl-4 prose-li:mb-1 marker:text-muted-ink"
                />
              </div>
            ) : (
              <p className="text-sm text-muted-soft">
                No detailed description provided.
              </p>
            )}
          </div>

          {/* Qualifications & Skills */}
          <div className="rounded-xl border border-hairline bg-white p-6">
            <SectionHeader
              icon={Target}
              title="Requirements & qualifications"
            />

            <div className="mb-8 grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <MetaField label="Minimum education" value={job.education} />
                <MetaField
                  label="Degree specializations"
                  value={job.degreeSpecialization?.join(", ")}
                />
                <MetaField label="English level" value={job.englishLevel} />
                <MetaField
                  label="Regional languages"
                  value={job.regionalLanguages?.join(", ")}
                />
              </div>
              <div className="space-y-5">
                <MetaField
                  label="Minimum experience"
                  value={`${job.minExperience} Years`}
                />
                <MetaField
                  label="Age requirements"
                  value={
                    job.minAge && job.maxAge
                      ? `${job.minAge} to ${job.maxAge} years`
                      : undefined
                  }
                />
                <MetaField label="Gender preference" value={job.gender} />
                <MetaField
                  label="Night shift"
                  value={job.isNightShift ? "Yes - Required" : "No"}
                />
              </div>
            </div>

            {job.skills && job.skills.length > 0 && (
              <div className="border-t border-hairline-soft pt-6">
                <h4 className="mb-4 text-[13px] font-medium text-muted-soft">
                  Required skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-hairline bg-surface-soft px-3 py-1.5 text-sm font-medium text-body"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Perks, Benefits & Financials */}
          <div className="rounded-xl border border-hairline bg-white p-6">
            <SectionHeader icon={Heart} title="Perks, benefits & financials" />

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <MetaField
                  icon={Gift}
                  label="Additional perks"
                  value={job.perks?.join(", ")}
                  highlight
                />
                <MetaField
                  label="Incentives / bonus"
                  value={job.incentiveAmount}
                />
                <MetaField label="Pay type structure" value={job.payType} />
              </div>
              <div className="space-y-5">
                <div className="flex flex-col gap-1 rounded-lg border border-hairline-soft bg-surface-soft/50 p-4">
                  <span className="flex items-center gap-1.5 text-[13px] font-medium text-muted-soft">
                    <ShieldAlert className="h-3.5 w-3.5 text-muted-soft" />{" "}
                    Joining fee status
                  </span>
                  {job.hasJoiningFee === "Yes" ? (
                    <div className="mt-1 space-y-2">
                      <span className="block text-sm font-semibold text-destructive">
                        Requires fee: {job.feeAmount}
                      </span>
                      <p className="border-l-2 border-destructive/30 pl-2 text-[13px] text-muted-ink">
                        {job.feeReason} • {job.feePaymentTiming} <br />
                        <span className="mt-1 block text-muted-soft">
                          {job.feeDetails}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <span className="mt-1 text-sm font-medium text-[#2f6e44]">
                      No joining fee
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Render Job Applications List at the bottom of the main content */}
          <div>
            <AdminJobApplicationsList jobId={id} />
          </div>
        </div>

        {/* RIGHT COLUMN - SIDEBAR (Span 4) */}
        <div className="space-y-6 lg:sticky lg:top-8 lg:col-span-4">
          {/* Application Insights Compact */}
          <div className="rounded-xl border border-hairline bg-white p-5">
            <h4 className="mb-5 flex items-center gap-2 border-b border-hairline-soft pb-4 text-[15px] font-semibold text-ink">
              <Users className="h-4 w-4 text-muted-ink" /> Applicant pipeline
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-hairline-soft bg-surface-soft/50 p-4">
                <span className="text-[13px] font-medium text-muted-soft">
                  Total apps
                </span>
                <p className="mt-1 text-2xl font-semibold text-ink tabular-nums">
                  {stats.total}
                </p>
              </div>
              <div className="rounded-lg border border-hairline-soft bg-surface-soft/50 p-4">
                <span className="text-[13px] font-medium text-muted-soft">
                  In review
                </span>
                <p className="mt-1 text-2xl font-semibold text-ink tabular-nums">
                  {stats.reviewing}
                </p>
              </div>
              <div className="rounded-lg border border-hairline-soft bg-surface-soft/50 p-4">
                <span className="text-[13px] font-medium text-muted-soft">
                  Interviews
                </span>
                <p className="mt-1 text-2xl font-semibold text-ink tabular-nums">
                  {stats.interviews}
                </p>
              </div>
              <div className="rounded-lg border border-hairline-soft bg-surface-soft/50 p-4">
                <span className="text-[13px] font-medium text-muted-soft">
                  Offers
                </span>
                <p className="mt-1 text-2xl font-semibold text-ink tabular-nums">
                  {stats.offers}
                </p>
              </div>
            </div>
          </div>

          {/* Company & Contact Details */}
          <div className="rounded-xl border border-hairline bg-white p-5">
            <h4 className="mb-5 flex items-center gap-2 border-b border-hairline-soft pb-4 text-[15px] font-semibold text-ink">
              <Phone className="h-4 w-4 text-muted-ink" /> Contact & hiring rep
            </h4>
            <div className="space-y-4">
              <MetaField label="HR name" value={job.hrName} />
              <MetaField label="Contact number" value={job.hrPhone} />
              <MetaField label="Email address" value={job.hrEmail} />
              <MetaField
                label="Contact preference"
                value={job.contactPreference}
              />
              <MetaField
                label="Direct candidate contact"
                value={job.canCandidateContact}
              />
              <MetaField label="WhatsApp alerts" value={job.whatsappAlerts} />

              {job.otherRecruiterName && (
                <div className="mt-4 border-t border-hairline-soft pt-4">
                  <span className="mb-2 block text-[13px] font-medium text-muted-soft">
                    Secondary recruiter
                  </span>
                  <div className="space-y-1 rounded-lg border border-hairline-soft bg-surface-soft/50 p-3">
                    <p className="text-sm font-medium text-ink">
                      {job.otherRecruiterName}
                    </p>
                    <p className="text-[13px] text-muted-ink">
                      {job.otherRecruiterEmail}
                    </p>
                    <p className="text-[13px] text-muted-ink">
                      WA: {job.otherRecruiterWhatsapp}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location & Walk-In Details */}
          <div className="rounded-xl border border-hairline bg-white p-5">
            <h4 className="mb-5 flex items-center gap-2 border-b border-hairline-soft pb-4 text-[15px] font-semibold text-ink">
              <MapPin className="h-4 w-4 text-muted-ink" /> Location details
            </h4>
            <div className="space-y-4">
              <MetaField label="Job city" value={job.jobCity} />
              <MetaField label="Office address" value={job.officeAddress} />
              <MetaField
                label="Industry category"
                value={job.industry?.join(", ")}
              />

              {job.isWalkIn && (
                <div className="mt-4 border-t border-hairline-soft pt-4">
                  <span className="mb-3 flex items-center gap-1.5 text-[13px] font-medium text-muted-soft">
                    <Calendar className="h-3.5 w-3.5 text-muted-soft" /> Walk-in
                    drive
                  </span>
                  <div className="space-y-3 rounded-lg border border-hairline-soft bg-surface-soft/50 p-4">
                    <div>
                      <span className="block text-[13px] font-medium text-muted-soft">
                        Dates
                      </span>
                      <p className="text-sm font-medium text-ink tabular-nums">
                        {job.walkInStartDate} to {job.walkInEndDate}
                      </p>
                    </div>
                    <div>
                      <span className="block text-[13px] font-medium text-muted-soft">
                        Timings
                      </span>
                      <p className="text-sm font-medium text-ink tabular-nums">
                        {job.walkInStartTime} - {job.walkInEndTime}
                      </p>
                    </div>
                    <div className="border-t border-hairline pt-2">
                      <span className="block text-[13px] font-medium text-muted-soft">
                        Instructions
                      </span>
                      <p className="mt-1 text-[13px] text-body">
                        {job.interviewInstructions}
                      </p>
                    </div>
                    <div>
                      <span className="block text-[13px] font-medium text-muted-soft">
                        Venue
                      </span>
                      <p className="mt-1 text-[13px] text-body">
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
