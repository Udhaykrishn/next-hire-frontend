import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  useBulkUpdateApplicationStatusMutation,
  useRecruiterJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/features/jobs/hooks/use-recruiter-applications";
import {
  getJobDetails,
  getJobStats,
} from "../services/recruiter-applications.api";
import type { ConfirmModalState } from "../types/applications.types";

export function useJobApplications() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data: job, isLoading: isJobLoading } = useQuery({
    queryKey: ["job-details", id],
    queryFn: () => getJobDetails(id),
  });

  const { data: statsData } = useQuery({
    queryKey: ["job-stats", id],
    queryFn: () => getJobStats(id),
  });

  const { data: applicationsData, isLoading: isApplicationsLoading } =
    useRecruiterJobApplicationsQuery(id, 1, 100, search, statusFilter);

  const { mutate: updateStatus } = useUpdateApplicationStatusMutation(id);
  const { mutateAsync: bulkUpdateStatusAsync, isPending: isBulkUpdating } =
    useBulkUpdateApplicationStatusMutation(id);

  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [confirmModalState, setConfirmModalState] = useState<ConfirmModalState>(
    {
      isOpen: false,
      action: null,
    },
  );
  const [rejectOthers, setRejectOthers] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  const toggleSelection = (appId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(appId)
        ? prev.filter((candidateId) => candidateId !== appId)
        : [...prev, appId],
    );
  };

  const handleSelectAll = () => {
    if (!applicationsData?.data) return;
    if (selectedCandidates.length === applicationsData.data.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(applicationsData.data.map((app) => app.id));
    }
  };

  const handleSelectTop = (count: number) => {
    if (!applicationsData?.data) return;
    const topCandidates = applicationsData.data
      .slice(0, count)
      .map((app) => app.id);
    setSelectedCandidates(topCandidates);
  };

  const handleBulkUpdateClick = (status: "SHORTLISTED" | "REJECTED") => {
    if (selectedCandidates.length === 0) return;
    setConfirmModalState({ isOpen: true, action: status });
    setRejectOthers(true); // Default to true when shortlisting
  };

  const confirmBulkAction = async () => {
    if (!confirmModalState.action || selectedCandidates.length === 0) return;

    setIsConfirming(true);
    try {
      await bulkUpdateStatusAsync({
        applicationIds: selectedCandidates,
        status: confirmModalState.action,
      });

      if (confirmModalState.action === "SHORTLISTED" && rejectOthers) {
        const unselectedIds =
          applicationsData?.data
            ?.filter(
              (app) =>
                !selectedCandidates.includes(app.id) &&
                app.status !== "REJECTED" &&
                app.status !== "HIRED",
            )
            .map((app) => app.id) || [];

        if (unselectedIds.length > 0) {
          await bulkUpdateStatusAsync({
            applicationIds: unselectedIds,
            status: "REJECTED",
          });
        }
      }
      setSelectedCandidates([]);
      setConfirmModalState({ isOpen: false, action: null });
    } catch (error) {
      console.error("Bulk update failed:", error);
    } finally {
      setIsConfirming(false);
    }
  };

  const stats = statsData || {
    total: 0,
    reviewing: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  };

  return {
    jobId: id,
    router,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    job,
    isJobLoading,
    stats,
    applications: applicationsData?.data || [],
    totalApplicationsCount: applicationsData?.total || 0,
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
  };
}
