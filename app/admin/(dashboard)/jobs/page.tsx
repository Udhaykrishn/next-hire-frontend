"use client";

import { AdminPageHeader } from "@/components/admin/ui";
import { JobList } from "@/features/admin/components/JobList";

export default function JobsAdminPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Job posts"
        description="Review job postings, flag scam submissions, and moderate active listings."
      />
      <JobList />
    </div>
  );
}
