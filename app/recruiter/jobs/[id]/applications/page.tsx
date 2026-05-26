"use client";

import { BulkConfirmationModal } from "@/features/recruiter/components/applications/BulkConfirmationModal";
import { JobApplicationsHeader } from "@/features/recruiter/components/applications/JobApplicationsHeader";
import { JobApplicationsList } from "@/features/recruiter/components/applications/JobApplicationsList";
import { JobApplicationsStats } from "@/features/recruiter/components/applications/JobApplicationsStats";
import { JobApplicationsToolbar } from "@/features/recruiter/components/applications/JobApplicationsToolbar";
import { useJobApplications } from "@/features/recruiter/hooks/use-job-applications";

export default function JobApplicationsPage() {
  const {
    jobId,
    router,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    job,
    isJobLoading,
    stats,
    applications,
    isApplicationsLoading,
    updateStatus,
    isBulkUpdating,
    selectedCandidates,
    setSelectedCandidates,
    confirmModalState,
    setConfirmModalState,
    rejectOthers,
    setRejectOthers,
    isConfirming,
    toggleSelection,
    handleSelectAll,
    handleSelectTop,
    handleBulkUpdateClick,
    confirmBulkAction,
  } = useJobApplications();

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 font-satoshi">
      {/* Top Header & Job Context */}
      <JobApplicationsHeader
        job={job}
        isJobLoading={isJobLoading}
        onBackClick={() => router.push("/recruiter/dashboard")}
      />

      {/* Professional Statistics Dashboard */}
      <JobApplicationsStats stats={stats} />

      {/* Filter Toolbar */}
      <JobApplicationsToolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        selectedCandidates={selectedCandidates}
        onClearSelection={() => setSelectedCandidates([])}
        isBulkUpdating={isBulkUpdating}
        isConfirming={isConfirming}
        onBulkUpdateClick={handleBulkUpdateClick}
      />

      {/* Applications List */}
      <JobApplicationsList
        applications={applications}
        isLoading={isApplicationsLoading}
        selectedCandidates={selectedCandidates}
        toggleSelection={toggleSelection}
        handleSelectAll={handleSelectAll}
        handleSelectTop={handleSelectTop}
        onViewProfile={(appId, candidateId) =>
          router.push(
            `/recruiter/jobs/${jobId}/applications/${appId}?candidateId=${candidateId}`,
          )
        }
        onUpdateStatus={(params) => updateStatus(params)}
        search={search}
        statusFilter={statusFilter}
        onClearFilters={() => {
          setSearch("");
          setStatusFilter("ALL");
        }}
      />

      {/* Confirmation Modal */}
      <BulkConfirmationModal
        isOpen={confirmModalState.isOpen}
        onClose={() => setConfirmModalState({ isOpen: false, action: null })}
        action={confirmModalState.action}
        selectedCount={selectedCandidates.length}
        onConfirm={confirmBulkAction}
        isConfirming={isConfirming}
        rejectOthers={rejectOthers}
        setRejectOthers={setRejectOthers}
      />
    </div>
  );
}
