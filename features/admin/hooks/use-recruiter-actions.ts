import { useState } from "react";
import { useRestrictRecruiter } from "./use-restrict-recruiter";
import { useRevokeCompanyVerification } from "./use-revoke-company-verification";

export function useRecruiterActions(id: string) {
  const { mutate: restrictRecruiter, isPending: isRestricting } = useRestrictRecruiter();
  const { mutate: revokeVerification, isPending: isRevoking } = useRevokeCompanyVerification();
  
  const [isBlocking, setIsBlocking] = useState(false);
  const [isRevokingModal, setIsRevokingModal] = useState(false);
  const [revokeReason, setRevokeReason] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");

  const handleConfirmBlock = () => {
    restrictRecruiter({ id });
    setIsBlocking(false);
  };

  const handleConfirmRevoke = () => {
    if (!revokeReason.trim()) return;
    revokeVerification(
      { id, reason: revokeReason.trim() },
      {
        onSuccess: () => {
          setIsRevokingModal(false);
          setRevokeReason("");
          setSelectedPreset("");
        },
      }
    );
  };

  return {
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
    handleConfirmRevoke
  };
}
