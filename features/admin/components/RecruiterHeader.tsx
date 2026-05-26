"use client";

import { Ban, Mail, Phone, ShieldX, Unlock } from "lucide-react";
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
      <div className="p-8 bg-gray-50/50 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative group shrink-0">
            <div className="size-24 rounded-[2rem] bg-near-black flex items-center justify-center text-4xl font-black text-wise-green shadow-xl shadow-near-black/20 group-hover:rotate-6 transition-transform">
              {recruiter.name.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -right-1 size-8 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-50">
              <div className="size-2.5 rounded-full bg-wise-green shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
            </div>
          </div>
          <div className="flex-1 gap-y-3 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl font-black text-near-black tracking-tight uppercase">
                {recruiter.name}
              </h1>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                  recruiter.status === "Active"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200",
                )}
              >
                {recruiter.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm font-bold text-gray-500">
              <span className="text-near-black">{recruiter.company}</span>
              <span className="size-1 rounded-full bg-gray-300" />
              Joined {recruiter.joined}
            </div>
            <div className="pt-1 flex flex-wrap justify-center md:justify-start gap-3">
              <a
                href={`mailto:${recruiter.email}`}
                className="h-10 px-4 bg-white hover:bg-gray-50 rounded-xl flex items-center gap-2 text-xs font-bold text-gray-600 transition-all border border-gray-200 shadow-sm"
              >
                <Mail className="size-3.5 text-gray-400" />
                {recruiter.email}
              </a>
              <a
                href={`tel:${recruiter.phone}`}
                className="h-10 px-4 bg-white hover:bg-gray-50 rounded-xl flex items-center gap-2 text-xs font-bold text-gray-600 transition-all border border-gray-200 shadow-sm"
              >
                <Phone className="size-3.5 text-gray-400" />
                {recruiter.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsBlocking(true)}
            disabled={isRestricting}
            className={cn(
              "p-4 rounded-2xl transition-all outline-none border shadow-sm",
              recruiter.status === "Blocked"
                ? "bg-green-50 text-green-600 hover:bg-green-100 border-green-100"
                : "bg-red-50 text-red-600 hover:bg-red-100 border-red-100",
            )}
            title={
              recruiter.status === "Blocked"
                ? "Restore Partner Access"
                : "Restrict Partner Access"
            }
          >
            {recruiter.status === "Blocked" ? (
              <Unlock className="size-6" />
            ) : (
              <Ban className="size-6" />
            )}
          </button>

          {isVerified && (
            <button
              type="button"
              onClick={() => setIsRevokingModal(true)}
              disabled={isRevoking}
              className="p-4 rounded-2xl transition-all outline-none border shadow-sm bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-100"
              title="Revoke Company Verification"
            >
              <ShieldX className="size-6" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-8 shadow-2xl w-full max-w-md mx-4 gap-y-6">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                <ShieldX className="size-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-near-black">
                  Revoke Company Verification
                </h2>
                <p className="text-xs text-gray-400 font-bold">
                  This action cannot be undone without recruiter
                  re-verification.
                </p>
              </div>
            </div>

            <div className="gap-y-3">
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
                  <SelectValue placeholder="Select a reason…" />
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
                <textarea aria-label="Control"
                  id="revoke-reason-custom"
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  placeholder="Describe the reason in detail…"
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
                {isRevoking ? "Revoking…" : "Confirm Revoke"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
