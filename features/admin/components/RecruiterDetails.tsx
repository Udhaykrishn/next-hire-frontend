"use client";

import {
  Briefcase,
  ChevronDown,
  Clock,
  Eye,
  Mail,
  Phone,
  PlusCircle,
  Settings,
  ShieldCheck,
  ShieldOff,
  ShieldX,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRecruiterDetails } from "../hooks/use-recruiter-details";
import { useRecruiterJobs } from "../hooks/use-recruiter-jobs";
import { useRestrictRecruiter } from "../hooks/use-restrict-recruiter";
import { useRevokeCompanyVerification } from "../hooks/use-revoke-company-verification";

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "job_created":
      return <PlusCircle className="w-4 h-4 text-wise-green" />;
    case "view_details":
      return <Eye className="w-4 h-4 text-wise-green" />;
    case "settings_update":
      return <Settings className="w-4 h-4 text-gray-400" />;
    case "job_status":
      return <Briefcase className="w-4 h-4 text-orange-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-300" />;
  }
};

interface RecruiterDetailsProps {
  id: string;
}

const REVOCATION_REASONS = [
  "Invalid or fraudulent CIN number provided",
  "Company no longer registered or dissolved",
  "Mismatched company details (name, address, or ownership)",
  "Duplicate or impersonation account detected",
  "Company under legal investigation or regulatory action",
  "Recruiter violated platform terms of service",
  "False or misleading information submitted during verification",
  "Company failed re-verification after suspension",
] as const;

export const RecruiterDetails = ({ id }: RecruiterDetailsProps) => {
  const { data: recruiter } = useRecruiterDetails(id);
  const { mutate: restrictRecruiter, isPending: isRestricting } =
    useRestrictRecruiter();
  const { mutate: revokeVerification, isPending: isRevoking } =
    useRevokeCompanyVerification();
  const { data: jobs = [], isLoading: isJobsLoading } = useRecruiterJobs(id);
  const [isBlocking, setIsBlocking] = useState(false);
  const [isRevokingModal, setIsRevokingModal] = useState(false);
  const [revokeReason, setRevokeReason] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [isVerifOpen, setIsVerifOpen] = useState(false);

  if (!recruiter) return null;

  const handleConfirmBlock = () => {
    restrictRecruiter({ id });
    setIsBlocking(false);
  };

  const handleConfirmRevoke = () => {
    if (!revokeReason.trim()) return;
    revokeVerification(
      { id, reason: revokeReason.trim() },
      {
        onSuccess: () => {
          setIsRevokingModal(false);
          setRevokeReason("");
        },
      },
    );
  };

  const isVerified = recruiter.is_verified_company === true;
  const wasRevoked =
    !isVerified &&
    !!recruiter.verification_revoked_reason;

  return (
    <div className="space-y-12">
      {/* Profile Identity */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="relative group">
          <div className="w-40 h-40 rounded-[3rem] bg-near-black flex items-center justify-center text-5xl font-black text-wise-green shadow-2xl shadow-near-black/20 group-hover:rotate-6 transition-transform">
            {recruiter.name.charAt(0)}
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-50">
            <div className="w-3 h-3 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
          </div>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-2">
              <h1 className="text-5xl font-black text-near-black tracking-tighter uppercase">
                {recruiter.name}
              </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold text-gray-400">
              <span className="text-near-black">{recruiter.company}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              Joined {recruiter.joined}
              <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest",
                  recruiter.status === "Active"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600",
                )}
              >
                {recruiter.status}
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-3">
            <a
              href={`mailto:${recruiter.email}`}
              className="h-12 px-6 bg-white hover:bg-wise-green/5 rounded-2xl flex items-center gap-2 text-sm font-bold text-near-black transition-all border border-gray-100 hover:border-wise-green/30"
            >
              <Mail className="w-4 h-4 text-wise-green" />
              {recruiter.email}
            </a>
            <a
              href={`tel:${recruiter.phone}`}
              className="h-12 px-6 bg-white hover:bg-wise-green/5 rounded-2xl flex items-center gap-2 text-sm font-bold text-near-black transition-all border border-gray-100 hover:border-wise-green/30"
            >
              <Phone className="w-4 h-4 text-wise-green" />
              {recruiter.phone}
            </a>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Company Details */}
          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="text-[10px] font-black text-near-black uppercase tracking-[0.4em] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
                Company Details
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Company Role
                </p>
                <p className="text-sm font-bold text-near-black">
                  {recruiter.company_role || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Category
                </p>
                <p className="text-sm font-bold text-near-black">
                  {recruiter.category || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  GSTIN
                </p>
                <p className="text-sm font-bold text-near-black">
                  {recruiter.GSTIN || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  CIN
                </p>
                <p className="text-sm font-bold text-near-black">
                  {recruiter.CIN || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Website
                </p>
                {recruiter.website_link ? (
                  <a
                    href={recruiter.website_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-wise-green hover:underline"
                  >
                    {recruiter.website_link}
                  </a>
                ) : (
                  <p className="text-sm font-bold text-near-black">N/A</p>
                )}
              </div>
              {/* Company Verification — did the recruiter go through CIN + OTP flow? */}
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Company Verification
                </p>
                <p className="text-[9px] text-gray-400 font-bold mb-2 leading-relaxed">
                  Recruiter self-verified via CIN + OTP flow
                </p>
                <div className="flex items-center gap-2">
                  {isVerified ? (
                    <ShieldCheck className="w-4 h-4 text-wise-green" />
                  ) : wasRevoked ? (
                    <ShieldX className="w-4 h-4 text-red-500" />
                  ) : (
                    <ShieldOff className="w-4 h-4 text-gray-400" />
                  )}
                  <span
                    className={cn(
                      "text-sm font-black uppercase tracking-widest",
                      isVerified
                        ? "text-wise-green"
                        : wasRevoked
                          ? "text-red-500"
                          : "text-gray-400",
                    )}
                  >
                    {isVerified ? "Verified" : wasRevoked ? "Revoked" : "Not Verified"}
                  </span>
                </div>
              </div>

              {/* Admin Approval — did an admin manually approve this recruiter? */}
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Admin Approval
                </p>
                <p className="text-[9px] text-gray-400 font-bold mb-2 leading-relaxed">
                  Manual review and approval by platform admin
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      recruiter.admin_approved ? "bg-wise-green shadow-[0_0_6px_rgba(159,232,112,0.8)]" : "bg-gray-300",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-black uppercase tracking-widest",
                      recruiter.admin_approved ? "text-wise-green" : "text-gray-400",
                    )}
                  >
                    {recruiter.admin_approved ? "Approved" : "Pending Approval"}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl md:col-span-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Subscription Plan
                </p>
                <p className="text-sm font-bold text-near-black">
                  {recruiter.subscription?.current_plan || "Free"}{" "}
                  {recruiter.subscription?.is_subscribed
                    ? "(Active)"
                    : "(Inactive)"}
                </p>
              </div>
            </div>
          </section>

          {/* Company Verification — collapsible dropdown */}
          {(isVerified || wasRevoked) && (
            <section
              className={cn(
                "border rounded-[2.5rem] overflow-hidden transition-all",
                isVerified ? "border-green-100" : "border-red-100",
              )}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setIsVerifOpen((v) => !v)}
                className={cn(
                  "w-full flex items-center justify-between px-8 py-5 transition-colors",
                  isVerified
                    ? "bg-green-50/60 hover:bg-green-50"
                    : "bg-red-50/60 hover:bg-red-50",
                )}
              >
                <div className="flex items-center gap-3">
                  {isVerified ? (
                    <ShieldCheck className="w-5 h-5 text-wise-green" />
                  ) : (
                    <ShieldX className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-near-black">
                    {isVerified ? "Company Verification Details" : "Revocation Details"}
                  </span>
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                      isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600",
                    )}
                  >
                    {isVerified ? "Active" : "Revoked"}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-gray-400 transition-transform duration-200",
                    isVerifOpen && "rotate-180",
                  )}
                />
              </button>

              {/* Accordion Body */}
              {isVerifOpen && (
                <div
                  className={cn(
                    "px-8 pb-8 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4",
                    isVerified ? "bg-green-50/30" : "bg-red-50/30",
                  )}
                >
                  <div className="p-4 bg-white/80 rounded-2xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      CIN Verified
                    </p>
                    <p className="text-sm font-bold text-near-black">
                      {recruiter.CIN || "N/A"}
                    </p>
                  </div>
                  <div className="p-4 bg-white/80 rounded-2xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Verification State
                    </p>
                    <p
                      className={cn(
                        "text-sm font-black uppercase tracking-widest",
                        isVerified ? "text-wise-green" : "text-red-500",
                      )}
                    >
                      {isVerified ? "Active" : "Revoked"}
                    </p>
                  </div>
                  {wasRevoked && recruiter.verification_revoked_reason && (
                    <div className="p-4 bg-white/80 rounded-2xl md:col-span-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                        Revocation Reason
                      </p>
                      <p className="text-sm font-bold text-red-600">
                        {recruiter.verification_revoked_reason}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Activity */}
          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="text-xs font-black text-near-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-wise-green" />
              User Activity
            </div>
            <div className="space-y-8">
              {recruiter.activity.map((act, idx) => (
                <div
                  key={idx}
                  className="relative pl-8 border-l-2 border-gray-50 last:border-0 pb-2"
                >
                  <div className="absolute top-0 -left-[11px] w-5 h-5 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                    <ActivityIcon type={act.type} />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-[15px] font-bold text-near-black leading-tight">
                      {act.description}
                    </p>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest whitespace-nowrap">
                      {act.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Jobs Created */}
          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="text-[10px] font-black text-near-black uppercase tracking-[0.4em] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
                Jobs Created
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                {isJobsLoading ? "..." : jobs.length} Postings
              </span>
            </div>

            <div className="space-y-4">
              {isJobsLoading ? (
                <div className="p-6 text-center text-gray-400 text-sm font-bold">
                  Loading jobs...
                </div>
              ) : jobs.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm font-bold">
                  No jobs created yet.
                </div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 bg-white border border-gray-100 rounded-2xl flex items-center justify-between group hover:border-wise-green/30 transition-all hover:shadow-sm"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-near-black mb-1">
                        {job.jobTitle}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400">
                        <span className="uppercase tracking-widest">
                          {job.jobType}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-200" />
                        <span className="uppercase tracking-widest">
                          {job.locationType}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-gray-300 uppercase tracking-widest">
                        {job.posted}
                      </span>
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          job.status === "OPEN" || job.status === "PUBLISHED"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500",
                        )}
                      >
                        {job.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="text-xs font-black text-near-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              About
            </div>
            <p className="text-sm font-medium text-gray-500 leading-relaxed italic">
              &quot;{recruiter.about}&quot;
            </p>
          </section>

          {/* Moderator Tools */}
          <section className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8">
            <h3 className="text-[10px] font-black text-near-black uppercase tracking-widest mb-6">
              Moderator Tools
            </h3>
            <div className="space-y-3">
              {/* Block / Restore */}
              <Button
                variant="outline"
                onClick={() => setIsBlocking(true)}
                disabled={isRestricting}
                className={cn(
                  "w-full h-12 rounded-xl justify-start text-xs font-black uppercase tracking-widest transition-colors",
                  recruiter.status === "Blocked"
                    ? "border-green-100 text-green-500 hover:bg-green-50 hover:border-green-200"
                    : "border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200",
                )}
              >
                {recruiter.status === "Blocked"
                  ? "Restore Partner Access"
                  : "Restrict Partner Access"}
              </Button>

              {/* Revoke Verification — only when verified */}
              {isVerified && (
                <Button
                  variant="outline"
                  onClick={() => setIsRevokingModal(true)}
                  disabled={isRevoking}
                  className="w-full h-12 rounded-xl justify-start text-xs font-black uppercase tracking-widest border-orange-100 text-orange-500 hover:bg-orange-50 hover:border-orange-200 transition-colors"
                >
                  <ShieldX className="w-4 h-4 mr-2" />
                  Revoke Company Verification
                </Button>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Block / Restore Modal */}
      <ConfirmationModal
        isOpen={isBlocking}
        onClose={() => setIsBlocking(false)}
        onConfirm={handleConfirmBlock}
        title={
          recruiter.status === "Blocked"
            ? "Restore Recruiter Access"
            : "Restrict Recruiter Access"
        }
        description={
          recruiter.status === "Blocked"
            ? "This will restore account access and enable all active job postings for this company."
            : "This will immediately revoke account access and disable all active job postings for this company."
        }
        confirmText={
          recruiter.status === "Blocked" ? "Confirm Restore" : "Confirm Restriction"
        }
        variant={recruiter.status === "Blocked" ? "info" : "danger"}
      />

      {/* Revoke Verification Modal */}
      {isRevokingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-8 shadow-2xl w-full max-w-md mx-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                <ShieldX className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-near-black">
                  Revoke Company Verification
                </h2>
                <p className="text-xs text-gray-400 font-bold">
                  This action cannot be undone without recruiter re-verification.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="revoke-preset"
                className="text-[10px] font-black text-gray-500 uppercase tracking-widest"
              >
                Reason for Revocation
              </label>

              {/* shadcn Select */}
              <Select
                value={selectedPreset}
                onValueChange={(value) => {
                  const safe = value ?? "";
                  setSelectedPreset(safe);
                  setRevokeReason(safe);
                }}
              >
                <SelectTrigger className="w-full h-11 rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-near-black focus:border-orange-300 focus:ring-0">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  {REVOCATION_REASONS.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Custom reason — only shown when "Other" is selected */}
              {selectedPreset === "Other" && (
                <textarea
                  id="revoke-reason-custom"
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  placeholder="Describe the reason in detail..."
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-near-black placeholder:text-gray-300 focus:border-orange-300 focus:bg-white focus:outline-none transition-colors"
                />
              )}

              <p className="text-[10px] text-gray-400 font-bold">
                This reason will be visible to the recruiter.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsRevokingModal(false);
                  setRevokeReason("");
                  setSelectedPreset("");
                }}
                className="flex-1 h-11 rounded-xl text-xs font-black uppercase tracking-widest"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmRevoke}
                disabled={isRevoking || !revokeReason.trim()}
                className="flex-1 h-11 rounded-xl text-xs font-black uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white border-0"
              >
                {isRevoking ? "Revoking..." : "Confirm Revoke"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
