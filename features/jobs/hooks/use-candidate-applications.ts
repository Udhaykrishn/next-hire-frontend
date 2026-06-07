import { useState, useEffect } from "react";
import { useCandidateApplicationsQuery } from "./use-jobs-query";

// Simple custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

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
