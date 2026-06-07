"use client";

import { useState } from "react";
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
import { cn } from "@/lib/utils";
import type { RecruiterDetail } from "../types/admin.types";

interface RecruiterCompanyInfoProps {
  recruiter: RecruiterDetail;
}

export const RecruiterCompanyInfo = ({
  recruiter,
}: RecruiterCompanyInfoProps) => {
  const [isVerifOpen, setIsVerifOpen] = useState(false);
  const isVerified = recruiter.is_verified_company === true;
  const wasRevoked = !isVerified && !!recruiter.verification_revoked_reason;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200/60 pb-4">
        <div className="w-8 h-8 bg-wise-green/20 rounded-xl flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-wise-green" />
        </div>
        <h4 className="font-black text-sm text-near-black uppercase tracking-widest">
          Company Details
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.02]">
          <div className="w-10 h-10 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3">
            <UserCheck className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
            Company Role
          </p>
          <p className="text-sm font-bold text-near-black">
            {recruiter.company_role || "N/A"}
          </p>
        </div>
        <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.02]">
          <div className="w-10 h-10 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3">
            <LayoutGrid className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
            Category
          </p>
          <p className="text-sm font-bold text-near-black">
            {recruiter.category || "N/A"}
          </p>
        </div>
        <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.02]">
          <div className="w-10 h-10 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3">
            <FileDigit className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
            GSTIN
          </p>
          <p className="text-sm font-bold text-near-black">
            {recruiter.GSTIN || "N/A"}
          </p>
        </div>
        <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.02]">
          <div className="w-10 h-10 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
            CIN
          </p>
          <p className="text-sm font-bold text-near-black">
            {recruiter.CIN || "N/A"}
          </p>
        </div>
        <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.02] md:col-span-2">
          <div className="w-10 h-10 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3">
            <Globe className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
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

        {/* Company Verification */}
        <div className="p-6 bg-white border border-gray-200 rounded-3xl md:col-span-2 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Company Verification
            </p>
            <p className="text-xs text-gray-400 font-bold mb-2">
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
                {isVerified
                  ? "Verified"
                  : wasRevoked
                    ? "Revoked"
                    : "Not Verified"}
              </span>
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-gray-100" />

          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Admin Approval
            </p>
            <p className="text-xs text-gray-400 font-bold mb-2">
              Manual review and approval by platform admin
            </p>
            <div className="flex items-center gap-2">
              <UserCog
                className={cn(
                  "w-4 h-4",
                  recruiter.admin_approved
                    ? "text-wise-green"
                    : "text-gray-400",
                )}
              />
              <span
                className={cn(
                  "text-sm font-black uppercase tracking-widest",
                  recruiter.admin_approved
                    ? "text-wise-green"
                    : "text-gray-400",
                )}
              >
                {recruiter.admin_approved ? "Approved" : "Pending Approval"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center transition-transform hover:scale-[1.02] md:col-span-2">
          <div className="w-10 h-10 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-3">
            <CreditCard className="w-5 h-5 text-wise-green" />
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
            Subscription Plan
          </p>
          <p className="text-sm font-bold text-near-black">
            {recruiter.subscription?.current_plan || "Free"}{" "}
            <span
              className={
                recruiter.subscription?.is_subscribed
                  ? "text-wise-green"
                  : "text-gray-400"
              }
            >
              ({recruiter.subscription?.is_subscribed ? "Active" : "Inactive"})
            </span>
          </p>
        </div>
      </div>

      {/* Company Verification — collapsible dropdown */}
      {(isVerified || wasRevoked) && (
        <div
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
                {isVerified
                  ? "Company Verification Details"
                  : "Revocation Details"}
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
        </div>
      )}
    </section>
  );
};
