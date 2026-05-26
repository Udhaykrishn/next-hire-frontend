export interface JobStats {
  total: number;
  reviewing: number;
  interviews: number;
  offers: number;
  rejected: number;
}

export interface ConfirmModalState {
  isOpen: boolean;
  action: "SHORTLISTED" | "REJECTED" | null;
}
