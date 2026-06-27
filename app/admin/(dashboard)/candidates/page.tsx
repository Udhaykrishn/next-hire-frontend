"use client";

import { AdminPageHeader } from "@/components/admin/ui";
import { CandidateList } from "@/features/admin/components/CandidateList";

export default function CandidatesAdminPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Candidates"
        description="Monitor talent accounts, moderate applications, and keep profile quality high."
      />
      <CandidateList />
    </div>
  );
}
