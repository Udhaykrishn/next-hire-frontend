import { useState } from "react";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BLOCK_REASONS = [
  "Terms of Service Violation",
  "Spam or fraudulent activity",
  "Harassment or inappropriate behavior",
  "Fake profile or invalid documents",
] as const;

interface BlockStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  candidateName: string;
  isBlocked: boolean;
  isLoading?: boolean;
}

export const BlockStatusModal = ({
  isOpen,
  onClose,
  onConfirm,
  candidateName,
  isBlocked,
  isLoading,
}: BlockStatusModalProps) => {
  const [selectedReason, setSelectedReason] = useState(
    "Terms of Service Violation",
  );
  const [customReason, setCustomReason] = useState("");

  const handleConfirm = () => {
    if (isBlocked) {
      onConfirm("");
      return;
    }
    const finalReason =
      selectedReason === "Other" ? customReason : selectedReason;
    if (!finalReason.trim()) return;
    onConfirm(finalReason);
    setSelectedReason("Terms of Service Violation");
    setCustomReason("");
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={
        isBlocked ? "Restore candidate access" : "Restrict candidate access"
      }
      description={
        isBlocked
          ? `Unblock ${candidateName}? They will regain full access to their profile and job applications.`
          : `Block ${candidateName}? They will lose access to the platform.`
      }
      confirmText={isBlocked ? "Confirm unblock" : "Confirm restriction"}
      variant={isBlocked ? "success" : "danger"}
      isLoading={isLoading}
    >
      {!isBlocked && (
        <div className="mt-4 w-full space-y-4 animate-in fade-in duration-200">
          <div className="space-y-2">
            <span className="block text-[13px] font-medium text-muted-soft">
              Choose reason <span className="text-destructive">*</span>
            </span>
            <Select
              value={selectedReason}
              onValueChange={(value) => setSelectedReason(value ?? "")}
            >
              <SelectTrigger className="h-10 w-full rounded-lg border border-hairline bg-white px-3 text-sm font-medium text-ink focus:border-coral/60 focus:ring-2 focus:ring-coral/15">
                <SelectValue placeholder="Select a reason..." />
              </SelectTrigger>
              <SelectContent>
                {BLOCK_REASONS.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other (specify below)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedReason === "Other" && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <label
                htmlFor="custom-reason-textarea"
                className="block text-[13px] font-medium text-muted-soft"
              >
                Custom description <span className="text-destructive">*</span>
              </label>
              <textarea
                id="custom-reason-textarea"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Enter details of policy violation..."
                className="h-24 w-full resize-none rounded-lg border border-hairline bg-white p-3 text-sm font-medium text-body outline-none transition-colors placeholder:text-muted-soft focus:border-coral/60 focus-visible:ring-2 focus-visible:ring-coral/30"
                required
              />
            </div>
          )}
        </div>
      )}
    </ConfirmationModal>
  );
};
