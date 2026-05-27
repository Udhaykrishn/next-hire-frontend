"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, FileText, Info, RefreshCw, ShieldCheck, ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { CompanyProfileData } from "./companies-managed-card";
import { SectionCard } from "./section-card";
import { FieldView } from "./field-view";

interface CompanyVerificationCardProps {
  company: CompanyProfileData | null;
}

export function CompanyVerificationCard({ company }: CompanyVerificationCardProps) {
  const router = useRouter();

  if (!company) return null;

  const isVerified = company.isVerified;
  // Use a mocked revocation status or reason if needed, or simply treat false as pending
  const isRevoked = false; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <SectionCard
        title="CIN Verification"
        subtitle={`Legal and tax verification for ${company.name}`}
        icon={<FileText className="w-5 h-5" />}
        sectionKey="verification"
        editSection={null}
        onEdit={() => {}}
        isActive={false}
        hideEdit={true}
      >
        <div
          className={`mb-5 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-[12px] font-black w-fit ${
            isVerified
              ? "bg-wise-green/10 text-wise-green"
              : isRevoked
                ? "bg-red-50 text-red-600 border border-red-100"
                : "bg-amber-50 text-amber-600 border border-amber-100"
          }`}
        >
          {isVerified ? (
            <ShieldCheck className="w-4 h-4" />
          ) : isRevoked ? (
            <ShieldX className="w-4 h-4" />
          ) : (
            <ShieldCheck className="w-4 h-4" />
          )}
          {isVerified
            ? "Company Verified"
            : isRevoked
              ? "Verification Revoked"
              : "Verification Pending"}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="space-y-6"
        >
          <FieldView
            label="Corporate Identity Number (CIN)"
            value={company.cin}
            icon={
              isVerified ? (
                <CheckCircle2 className="w-4 h-4 text-wise-green" />
              ) : (
                <Info className="w-4 h-4" />
              )
            }
            placeholder="No CIN provided"
          />

          {!isVerified && (
            <div className="pt-2">
              <Button
                onClick={() => router.push(`/recruiter/verify-company?companyId=${company.id}`)}
                className="h-11 px-6 rounded-xl font-bold bg-near-black text-white hover:bg-near-black/90 shadow-lg shadow-near-black/20 gap-2"
              >
                Start Verification
              </Button>
              <p className="text-[12px] font-medium text-gray-400 mt-3">
                You must verify this company using its Corporate Identity Number (CIN) before you can post jobs under its name.
              </p>
            </div>
          )}
        </motion.div>
      </SectionCard>
    </motion.div>
  );
}
