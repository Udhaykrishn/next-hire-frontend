import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useCandidateApplicationsQuery } from "./use-jobs-query";

const defaultStats = { total: 0, reviewing: 0, interviews: 0, offers: 0 };

export function useCandidateApplications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const debouncedSearch = useDebounce(searchQuery, 400);

  const {
    data: response,
    refetch,
    isFetching,
  } = useCandidateApplicationsQuery({
    search: debouncedSearch,
    status: statusFilter,
  });

  const applications = response?.data || [];
  const stats = response?.stats || defaultStats;

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
  };

  return {
    applications,
    filteredApplications: applications,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    clearFilters,
    refetch,
    isLoading: isFetching,
  };
}
