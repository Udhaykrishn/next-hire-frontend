import { useState, useTransition } from "react";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useDebounce } from "@/hooks/use-debounce";
import { useJobsForCandidateQuery } from "./use-jobs-query";

export function useJobList() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  // Bolt: ⚡ Performance Optimization
  // Debounce rapid input changes to reduce unnecessary API calls when typing
  const debouncedQuery = useDebounce(query, 400);
  const debouncedLocation = useDebounce(location, 400);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [, _startTransition] = useTransition();

  const { isLoading: isAuthLoading } = useAuthContext();

  const { data: paginationResult } = useJobsForCandidateQuery({
    search: debouncedQuery,
    location: debouncedLocation,
    experience: selectedExperience,
    salary: selectedSalary,
    jobTypes: selectedJobTypes,
  });

  const toggleExperience = (exp: string) => {
    setSelectedExperience((prev) =>
      prev.includes(exp) ? prev.filter((item) => item !== exp) : [...prev, exp],
    );
  };

  const toggleSalary = (sal: string) => {
    setSelectedSalary((prev) =>
      prev.includes(sal) ? prev.filter((item) => item !== sal) : [...prev, sal],
    );
  };

  const toggleJobType = (type: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type],
    );
  };

  const resetFilters = () => {
    setSelectedExperience([]);
    setSelectedSalary([]);
    setSelectedJobTypes([]);
    setQuery("");
    setLocation("");
  };

  const jobs = paginationResult?.data || [];

  return {
    query,
    setQuery,
    location,
    setLocation,
    selectedExperience,
    selectedSalary,
    selectedJobTypes,
    toggleExperience,
    toggleSalary,
    toggleJobType,
    resetFilters,
    jobs,
    isPageLoading: isAuthLoading,
  };
}
