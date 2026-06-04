import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Info,
  RefreshCw,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type {
  EditSection,
  RecruiterFormValues,
} from "@/features/recruiter/hooks/use-recruiter-profile";
import type { RecruiterProfile } from "@/features/recruiter/types/recruiter.types";
import { FieldView } from "./field-view";
import { SectionCard } from "./section-card";

export function TaxIdentityCard({
  recruiterProfile,
  formData,
  editSection,
  startEdit,
}: {
  recruiterProfile: RecruiterProfile | null;
  formData: RecruiterFormValues;
  editSection: EditSection;
  startEdit: (section: EditSection) => void;
}) {
  const router = useRouter();

  const isVerified = recruiterProfile?.is_verified_company === true;
  const isRevoked =
    !isVerified && !!recruiterProfile?.verification_revoked_reason;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <SectionCard
        title="GST / Corporate Identity"
        subtitle="Tax credentials and company verification"
        icon={<FileText className="w-5 h-5" />}
        sectionKey="tax"
        editSection={editSection}
        onEdit={startEdit}
        isActive={false}
        hideEdit={true}
      >
        {/* Status badge */}
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

        {/* Revocation reason banner */}
        {isRevoked && recruiterProfile.verification_revoked_reason && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-start gap-3 px-4 py-3.5 rounded-2xl bg-red-50 border border-red-100"
          >
            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-black text-red-600 uppercase tracking-widest mb-0.5">
                Revocation Reason
              </p>
              <p className="text-sm font-medium text-red-700 leading-relaxed">
                {recruiterProfile.verification_revoked_reason}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="space-y-6"
        >
          <FieldView
            label="Registered CIN"
            value={recruiterProfile?.CIN || formData.cinNumber}
            icon={
              isVerified ? (
                <CheckCircle2 className="w-4 h-4 text-wise-green" />
              ) : (
                <Info className="w-4 h-4" />
              )
            }
            placeholder="Not provided"
          />

          {/* CTA button — not shown when verified */}
          {!isVerified && (
            <div className="pt-2">
              {isRevoked ? (
                <div className="space-y-2">
                  <Button
                    onClick={() => router.push("/recruiter/verify-company")}
                    className="h-11 px-6 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20 gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry Verification
                  </Button>
                  <p className="text-[11px] font-bold text-red-400">
                    Re-submit your CIN to request a new verification review.
                  </p>
                </div>
              ) : (
                <Button
                  onClick={() => router.push("/recruiter/verify-company")}
                  className="h-11 px-6 rounded-xl font-bold bg-near-black text-white hover:bg-near-black/90 shadow-lg shadow-near-black/20 gap-2"
                >
                  Click to Verify
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </SectionCard>
    </motion.div>
  );
}
