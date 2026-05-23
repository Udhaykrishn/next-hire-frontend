import { useState, useTransition } from "react";
import { useJobsForCandidateQuery } from "./use-jobs-query";

export function useJobList() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [, _startTransition] = useTransition();

  const { data: paginationResult } = useJobsForCandidateQuery({
    search: query,
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

  const jobs = (paginationResult?.data || []).filter((job) => {
    // Location filter
    if (location) {
      const cityMatch = job.jobCity
        ?.toLowerCase()
        .includes(location.toLowerCase());
      const addrMatch = job.officeAddress
        ?.toLowerCase()
        .includes(location.toLowerCase());
      const typeMatch = job.locationType
        ?.toLowerCase()
        .includes(location.toLowerCase());
      if (!cityMatch && !addrMatch && !typeMatch) {
        return false;
      }
    }
    // Experience filter mapping
    if (selectedExperience.length > 0) {
      const jobExp = parseFloat(job.minExperience || "0");
      const matchesExp = selectedExperience.some((exp) => {
        if (exp === "Entry Level") return jobExp <= 1;
        if (exp === "Mid Level") return jobExp > 1 && jobExp <= 3;
        if (exp === "Senior Level") return jobExp > 3 && jobExp <= 7;
        if (exp === "Director") return jobExp > 7;
        return false;
      });
      if (!matchesExp) return false;
    }
    // Job type filter mapping
    if (selectedJobTypes.length > 0) {
      const matchesType = selectedJobTypes.some((type) =>
        job.jobType?.toLowerCase().includes(type.toLowerCase()),
      );
      if (!matchesType) return false;
    }
    // Salary filter mapping
    if (selectedSalary.length > 0) {
      const minSalary = parseFloat(job.minSalary || "0");
      const matchesSal = selectedSalary.some((sal) => {
        if (sal === "$0 - $50k") return minSalary <= 50000;
        if (sal === "$50k - $100k")
          return minSalary > 50000 && minSalary <= 100000;
        if (sal === "$100k - $150k")
          return minSalary > 100000 && minSalary <= 150000;
        if (sal === "$150k+") return minSalary > 150000;
        return false;
      });
      if (!matchesSal) return false;
    }
    return true;
  });

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
  };
}
