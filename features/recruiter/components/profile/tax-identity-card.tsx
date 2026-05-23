import { motion } from "framer-motion";
import { CheckCircle2, FileText, Info, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type {
  EditSection,
  RecruiterFormValues,
} from "@/features/recruiter/hooks/use-recruiter-profile";
import type { RecruiterProfile } from "@/features/recruiter/types/recruiter.types";
import { cn } from "@/lib/utils";
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
        <div
          className={cn(
            "mb-5 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-[12px] font-black w-fit",
            recruiterProfile?.is_verified_company
              ? "bg-wise-green/10 text-wise-green"
              : "bg-amber-50 text-amber-600 border border-amber-100",
          )}
        >
          <ShieldCheck className="w-4 h-4" />
          {recruiterProfile?.is_verified_company
            ? "Company Verified"
            : "Verification Pending"}
        </div>

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
              recruiterProfile?.is_verified_company ? (
                <CheckCircle2 className="w-4 h-4 text-wise-green" />
              ) : (
                <Info className="w-4 h-4" />
              )
            }
            placeholder="Not provided"
          />

          {!recruiterProfile?.is_verified_company && (
            <div className="pt-2">
              <Button
                onClick={() => router.push("/recruiter/verify-company")}
                className="h-11 px-6 rounded-xl font-bold bg-near-black text-white hover:bg-near-black/90 shadow-lg shadow-near-black/20 gap-2"
              >
                Click to Verify
              </Button>
            </div>
          )}
        </motion.div>
      </SectionCard>
    </motion.div>
  );
}
