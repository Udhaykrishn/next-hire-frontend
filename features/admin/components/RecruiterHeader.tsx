"use client";

import { Ban, Mail, Phone, ShieldX, Unlock } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui";
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
import { useRecruiterActions } from "../hooks/use-recruiter-actions";
import type { RecruiterDetail } from "../types/admin.types";

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

type BadgeTone = "success" | "warning" | "danger" | "coral" | "neutral";

const statusTone = (status: string): BadgeTone => {
  if (status === "Active") return "success";
  if (status === "Pending") return "warning";
  if (status === "Blocked") return "danger";
  return "neutral";
};

interface RecruiterHeaderProps {
  recruiter: RecruiterDetail;
  id: string;
}

export const RecruiterHeader = ({ recruiter, id }: RecruiterHeaderProps) => {
  const {
    isRestricting,
    isRevoking,
    isBlocking,
    setIsBlocking,
    isRevokingModal,
    setIsRevokingModal,
    revokeReason,
    setRevokeReason,
    selectedPreset,
    setSelectedPreset,
    handleConfirmBlock,
    handleConfirmRevoke,
  } = useRecruiterActions(id);

  const isVerified = recruiter.is_verified_company === true;

  return (
    <>
      <div className="flex flex-col justify-between gap-6 border-b border-hairline-soft bg-surface-soft/40 p-6 md:flex-row md:items-center">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-navy text-2xl font-semibold text-on-dark">
            {recruiter.name.charAt(0)}
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
              <h1 className="text-[24px] font-semibold leading-tight tracking-[-0.01em] text-ink">
                {recruiter.name}
              </h1>
              <StatusBadge tone={statusTone(recruiter.status)}>
                {recruiter.status}
              </StatusBadge>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-[13px] text-muted-ink md:justify-start">
              <span className="font-medium text-ink">{recruiter.company}</span>
              <span className="h-1 w-1 rounded-full bg-hairline" />
              <span className="tabular-nums">Joined {recruiter.joined}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-1 md:justify-start">
              <a
                href={`mailto:${recruiter.email}`}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-hairline bg-white px-3 text-[13px] font-medium text-body transition-colors hover:bg-surface-soft"
              >
                <Mail className="h-3.5 w-3.5 text-muted-soft" />
                {recruiter.email}
              </a>
              <a
                href={`tel:${recruiter.phone}`}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-hairline bg-white px-3 text-[13px] font-medium text-body transition-colors hover:bg-surface-soft"
              >
                <Phone className="h-3.5 w-3.5 text-muted-soft" />
                {recruiter.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsBlocking(true)}
            disabled={isRestricting}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors disabled:opacity-50",
              recruiter.status === "Blocked"
                ? "border-hairline bg-white text-body hover:bg-surface-soft"
                : "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/15",
            )}
            title={
              recruiter.status === "Blocked"
                ? "Restore Partner Access"
                : "Restrict Partner Access"
            }
          >
            {recruiter.status === "Blocked" ? (
              <>
                <Unlock className="h-4 w-4" />
                Restore access
              </>
            ) : (
              <>
                <Ban className="h-4 w-4" />
                Restrict access
              </>
            )}
          </button>

          {isVerified && (
            <button
              type="button"
              onClick={() => setIsRevokingModal(true)}
              disabled={isRevoking}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-hairline bg-white px-4 text-sm font-medium text-body transition-colors hover:bg-surface-soft disabled:opacity-50"
              title="Revoke Company Verification"
            >
              <ShieldX className="h-4 w-4 text-muted-ink" />
              Revoke verification
            </button>
          )}
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
          recruiter.status === "Blocked"
            ? "Confirm Restore"
            : "Confirm Restriction"
        }
        variant={recruiter.status === "Blocked" ? "info" : "danger"}
      />

      {/* Revoke Verification Modal */}
      {isRevokingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md space-y-6 rounded-xl border border-hairline bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-soft text-muted-ink">
                <ShieldX className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-ink">
                  Revoke company verification
                </h2>
                <p className="text-[13px] text-muted-soft">
                  This action cannot be undone without recruiter
                  re-verification.
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <label
                htmlFor="revoke-preset"
                className="text-[13px] font-medium text-muted-soft"
              >
                Reason for revocation
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
                <SelectTrigger className="h-10 w-full rounded-lg border border-hairline bg-white px-3 text-sm font-medium text-ink focus:border-coral/60 focus:ring-2 focus:ring-coral/15">
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
                  className="w-full resize-none rounded-lg border border-hairline bg-white px-3 py-2.5 text-sm text-ink transition-colors placeholder:text-muted-soft focus:border-coral/60 focus:outline-none focus:ring-2 focus:ring-coral/15"
                />
              )}

              <p className="text-[13px] text-muted-soft">
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
                className="h-10 flex-1 rounded-lg border-hairline text-sm font-medium text-body"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmRevoke}
                disabled={isRevoking || !revokeReason.trim()}
                className="h-10 flex-1 rounded-lg border-0 bg-coral text-sm font-semibold text-white hover:bg-coral-active"
              >
                {isRevoking ? "Revoking..." : "Confirm revoke"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
