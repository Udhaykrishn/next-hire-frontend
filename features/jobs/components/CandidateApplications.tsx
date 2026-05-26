"use client";

import { GlobalLoader } from "@/components/shared/global-loader";
import { useCandidateApplications } from "../hooks/use-candidate-applications";
import { CandidateApplicationCard } from "./candidate-applications/CandidateApplicationCard";
import { CandidateApplicationsEmptyState } from "./candidate-applications/CandidateApplicationsEmptyState";
import { CandidateApplicationsFilters } from "./candidate-applications/CandidateApplicationsFilters";
import { CandidateApplicationsStats } from "./candidate-applications/CandidateApplicationsStats";

export function CandidateApplications() {
  const {
    filteredApplications,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    clearFilters,
    refetch,
    isLoading,
  } = useCandidateApplications();

  return (
    <div className="w-full space-y-10">
      <CandidateApplicationsStats
        statsData={stats}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <CandidateApplicationsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        clearFilters={clearFilters}
        refetch={refetch}
      />

      <div className="space-y-4 relative min-h-[300px]">
        {isLoading ? (
          <GlobalLoader
            fullScreen={false}
            className="absolute inset-0 bg-white/50 z-10"
          />
        ) : filteredApplications.length === 0 ? (
          <CandidateApplicationsEmptyState />
        ) : (
          filteredApplications.map((applicationData, index) => (
            <CandidateApplicationCard
              key={applicationData.application.id}
              applicationData={applicationData}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
}
