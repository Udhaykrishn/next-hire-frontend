import { ConfirmationModal } from "@/components/shared/confirmation-modal";
import { Checkbox } from "@/components/ui/checkbox";

interface BulkConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: "SHORTLISTED" | "REJECTED" | null;
  selectedCount: number;
  onConfirm: () => Promise<void>;
  isConfirming: boolean;
  rejectOthers: boolean;
  setRejectOthers: (b: boolean) => void;
}

export function BulkConfirmationModal({
  isOpen,
  onClose,
  action,
  selectedCount,
  onConfirm,
  isConfirming,
  rejectOthers,
  setRejectOthers,
}: BulkConfirmationModalProps) {
  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Bulk Action"
      description={`You are about to mark ${selectedCount} candidate${selectedCount !== 1 ? "s" : ""} as ${action || ""}.`}
      onConfirm={onConfirm}
      isLoading={isConfirming}
      confirmText="Confirm"
      cancelText="Cancel"
      variant={action === "REJECTED" ? "danger" : "info"}
    >
      {action === "SHORTLISTED" && (
        <div className="py-4">
          <label className="flex items-start gap-x-3 cursor-pointer">
            <Checkbox
              checked={rejectOthers}
              onCheckedChange={(checked) => setRejectOthers(checked as boolean)}
              className="mt-1"
            />
            <div className="gap-y-1">
              <p className="text-sm font-medium text-near-black">
                Reject remaining unselected candidates
              </p>
              <p className="text-xs text-gray-500">
                Automatically update all other active applicants on this page to
                REJECTED.
              </p>
            </div>
          </label>
        </div>
      )}
    </ConfirmationModal>
  );
}
