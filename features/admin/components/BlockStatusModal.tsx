import { useState } from "react";
import { ConfirmationModal } from "@/components/shared/confirmation-modal";

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
        isBlocked ? "Restore Candidate Access" : "Restrict Candidate Access"
      }
      description={
        isBlocked
          ? `Are you sure you want to unblock ${candidateName}? They will regain full access to their profile and job applications.`
          : `Are you sure you want to block ${candidateName}? They will lose access to the platform.`
      }
      confirmText={isBlocked ? "Confirm Unblock" : "Confirm Restriction"}
      variant={isBlocked ? "success" : "danger"}
      isLoading={isLoading}
    >
      {!isBlocked && (
        <div className="gap-y-4 mt-4 w-full animate-in fade-in duration-300">
          <div className="gap-y-2">
            <label className="text-[10px] font-black text-near-black uppercase tracking-wider block">
              Choose Reason <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-wise-green/20 focus:border-wise-green bg-white transition-all outline-none font-bold text-near-black cursor-pointer"
            >
              <option value="Terms of Service Violation">
                Terms of Service Violation
              </option>
              <option value="Spam or fraudulent activity">
                Spam or fraudulent activity
              </option>
              <option value="Harassment or inappropriate behavior">
                Harassment or inappropriate behavior
              </option>
              <option value="Fake profile or invalid documents">
                Fake profile or invalid documents
              </option>
              <option value="Other">Other (specify below)</option>
            </select>
          </div>

          {selectedReason === "Other" && (
            <div className="gap-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-black text-near-black uppercase tracking-wider block">
                Custom Description <span className="text-red-500">*</span>
              </label>
              <textarea aria-label="Control"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Enter details of policy violation…"
                className="w-full h-24 p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-wise-green/20 focus:border-wise-green transition-all resize-none font-medium text-gray-700"
                required
              />
            </div>
          )}
        </div>
      )}
    </ConfirmationModal>
  );
};
