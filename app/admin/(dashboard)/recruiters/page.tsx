"use client";

import { AdminPageHeader } from "@/components/admin/ui";
import { RecruiterList } from "@/features/admin/components/RecruiterList";

export default function RecruitersAdminPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Recruiters"
        description="Manage company profiles, monitor recruitment activity, and keep job providers high-quality."
      />
      <RecruiterList />
    </div>
  );
}
