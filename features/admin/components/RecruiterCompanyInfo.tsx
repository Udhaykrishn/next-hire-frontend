"use client";

import {
  Briefcase,
  Building2,
  ChevronDown,
  CreditCard,
  FileDigit,
  Globe,
  LayoutGrid,
  ShieldCheck,
  ShieldOff,
  ShieldX,
  UserCheck,
  UserCog,
} from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { RecruiterDetail } from "../types/admin.types";

interface RecruiterCompanyInfoProps {
  recruiter: RecruiterDetail;
}

const InfoCell = ({
  icon,
  label,
  children,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-lg border border-hairline bg-surface-soft/40 p-4",
      className,
    )}
  >
    <div className="flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-muted-ink">
        {icon}
      </span>
      <p className="text-[13px] font-medium text-muted-soft">{label}</p>
    </div>
    <div className="mt-2 text-sm font-medium text-ink">{children}</div>
  </div>
);

export const RecruiterCompanyInfo = ({
  recruiter,
}: RecruiterCompanyInfoProps) => {
  const [isVerifOpen, setIsVerifOpen] = useState(false);
  const isVerified = recruiter.is_verified_company === true;
  const wasRevoked = !isVerified && !!recruiter.verification_revoked_reason;

  return (
    <section className="rounded-xl border border-hairline bg-white p-6">
      <div className="mb-5 flex items-center gap-2.5 border-b border-hairline-soft pb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-soft text-muted-ink">
          <Briefcase className="h-4 w-4" />
        </span>
        <h4 className="text-[15px] font-semibold text-ink">Company details</h4>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InfoCell icon={<UserCheck className="h-4 w-4" />} label="Company role">
          {recruiter.company_role || "N/A"}
        </InfoCell>
        <InfoCell icon={<LayoutGrid className="h-4 w-4" />} label="Category">
          {recruiter.category || "N/A"}
        </InfoCell>
        <InfoCell icon={<FileDigit className="h-4 w-4" />} label="GSTIN">
          <span className="tabular-nums">{recruiter.GSTIN || "N/A"}</span>
        </InfoCell>
        <InfoCell icon={<Building2 className="h-4 w-4" />} label="CIN">
          <span className="tabular-nums">{recruiter.CIN || "N/A"}</span>
        </InfoCell>
        <InfoCell
          icon={<Globe className="h-4 w-4" />}
          label="Website"
          className="md:col-span-2"
        >
          {recruiter.website_link ? (
            <a
              href={recruiter.website_link}
              target="_blank"
              rel="noreferrer"
              className="text-ink transition-colors hover:text-coral"
            >
              {recruiter.website_link}
            </a>
          ) : (
            "N/A"
          )}
        </InfoCell>

        {/* Company Verification */}
        <div className="flex flex-col justify-between gap-4 rounded-lg border border-hairline bg-white p-5 md:col-span-2 md:flex-row md:items-center">
          <div>
            <p className="mb-0.5 text-[13px] font-medium text-muted-soft">
              Company verification
            </p>
            <p className="mb-2 text-[13px] text-muted-soft">
              Recruiter self-verified via CIN + OTP flow
            </p>
            <div className="flex items-center gap-2">
              {isVerified ? (
                <ShieldCheck className="h-4 w-4 text-muted-ink" />
              ) : wasRevoked ? (
                <ShieldX className="h-4 w-4 text-muted-ink" />
              ) : (
                <ShieldOff className="h-4 w-4 text-muted-ink" />
              )}
              <StatusBadge
                tone={
                  isVerified ? "success" : wasRevoked ? "danger" : "neutral"
                }
              >
                {isVerified
                  ? "Verified"
                  : wasRevoked
                    ? "Revoked"
                    : "Not verified"}
              </StatusBadge>
            </div>
          </div>

          <div className="hidden h-16 w-px bg-hairline-soft md:block" />

          <div>
            <p className="mb-0.5 text-[13px] font-medium text-muted-soft">
              Admin approval
            </p>
            <p className="mb-2 text-[13px] text-muted-soft">
              Manual review and approval by platform admin
            </p>
            <div className="flex items-center gap-2">
              <UserCog className="h-4 w-4 text-muted-ink" />
              <StatusBadge
                tone={recruiter.admin_approved ? "success" : "neutral"}
              >
                {recruiter.admin_approved ? "Approved" : "Pending approval"}
              </StatusBadge>
            </div>
          </div>
        </div>

        <InfoCell
          icon={<CreditCard className="h-4 w-4" />}
          label="Subscription plan"
          className="md:col-span-2"
        >
          {recruiter.subscription?.current_plan || "Free"}{" "}
          <span className="text-muted-soft">
            ({recruiter.subscription?.is_subscribed ? "Active" : "Inactive"})
          </span>
        </InfoCell>
      </div>

      {/* Company Verification — collapsible dropdown */}
      {(isVerified || wasRevoked) && (
        <div className="mt-3 overflow-hidden rounded-lg border border-hairline">
          {/* Accordion Header */}
          <button
            type="button"
            onClick={() => setIsVerifOpen((v) => !v)}
            className="flex w-full items-center justify-between bg-surface-soft/40 px-5 py-4 transition-colors hover:bg-surface-soft/70"
          >
            <div className="flex items-center gap-2.5">
              {isVerified ? (
                <ShieldCheck className="h-4 w-4 text-muted-ink" />
              ) : (
                <ShieldX className="h-4 w-4 text-muted-ink" />
              )}
              <span className="text-[13px] font-medium text-ink">
                {isVerified
                  ? "Company verification details"
                  : "Revocation details"}
              </span>
              <StatusBadge tone={isVerified ? "success" : "danger"}>
                {isVerified ? "Active" : "Revoked"}
              </StatusBadge>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-soft transition-transform duration-200",
                isVerifOpen && "rotate-180",
              )}
            />
          </button>

          {/* Accordion Body */}
          {isVerifOpen && (
            <div className="grid grid-cols-1 gap-3 border-t border-hairline-soft px-5 pb-5 pt-4 md:grid-cols-2">
              <div className="rounded-lg border border-hairline bg-surface-soft/40 p-4">
                <p className="mb-1 text-[13px] font-medium text-muted-soft">
                  CIN verified
                </p>
                <p className="text-sm font-medium text-ink tabular-nums">
                  {recruiter.CIN || "N/A"}
                </p>
              </div>
              <div className="rounded-lg border border-hairline bg-surface-soft/40 p-4">
                <p className="mb-1 text-[13px] font-medium text-muted-soft">
                  Verification state
                </p>
                <p className="text-sm font-medium text-ink">
                  {isVerified ? "Active" : "Revoked"}
                </p>
              </div>
              {wasRevoked && recruiter.verification_revoked_reason && (
                <div className="rounded-lg border border-hairline bg-surface-soft/40 p-4 md:col-span-2">
                  <p className="mb-1 text-[13px] font-medium text-muted-soft">
                    Revocation reason
                  </p>
                  <p className="text-sm font-medium text-destructive">
                    {recruiter.verification_revoked_reason}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
