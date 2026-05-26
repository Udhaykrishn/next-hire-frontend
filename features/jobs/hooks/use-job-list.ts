import { useState, useTransition } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useJobsForCandidateQuery } from "./use-jobs-query";

export function useJobList() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [debouncedQuery] = useDebounceValue(query, 500);
  const [debouncedLocation] = useDebounceValue(location, 500);

  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([
    0, 2000000,
  ]); // 0 to 20L defaults
  const [debouncedSalaryRange] = useDebounceValue(salaryRange, 500);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [sort, setSort] = useState("Relevance");

  const { isLoading: isAuthLoading } = useAuthContext();

  const {
    data: paginationResult,
    isFetching,
    isPending,
  } = useJobsForCandidateQuery({
    search: debouncedQuery,
    location: debouncedLocation,
    experience: selectedExperience,
    minSalary:
      debouncedSalaryRange[0] > 0 ? debouncedSalaryRange[0] : undefined,
    maxSalary:
      debouncedSalaryRange[1] < 2000000 ? debouncedSalaryRange[1] : undefined,
    jobTypes: selectedJobTypes,
    sort,
  });

  const toggleExperience = (exp: string) => {
    setSelectedExperience((prev) =>
      prev.includes(exp) ? prev.filter((item) => item !== exp) : [...prev, exp],
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
    setSalaryRange([0, 2000000]);
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
    salaryRange,
    setSalaryRange,
    selectedJobTypes,
    sort,
    setSort,
    toggleExperience,
    toggleJobType,
    resetFilters,
    jobs,
    isPageLoading: isAuthLoading && isPending,
    isListLoading: isFetching,
  };
}
