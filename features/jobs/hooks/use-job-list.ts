import { useState, useTransition } from "react";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useDebouncedValue } from "@tanstack/react-pacer";

export function useJobList() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedLocationTypes, setSelectedLocationTypes] = useState<string[]>([]);
  const [_isPending, startTransition] = useTransition();

  const { isLoading: isAuthLoading } = useAuthContext();

  const [debouncedQuery] = useDebouncedValue(query, { wait: 500 });
  const [debouncedLocation] = useDebouncedValue(location, { wait: 500 });

  const toggleExperience = (exp: string) => {
    startTransition(() => {
      setSelectedExperience((prev) =>
        prev.includes(exp)
          ? prev.filter((item) => item !== exp)
          : [...prev, exp],
      );
    });
  };

  const toggleSalary = (sal: string) => {
    startTransition(() => {
      setSelectedSalary((prev) =>
        prev.includes(sal)
          ? prev.filter((item) => item !== sal)
          : [...prev, sal],
      );
    });
  };

  const toggleJobType = (type: string) => {
    startTransition(() => {
      setSelectedJobTypes((prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type)
          : [...prev, type],
      );
    });
  };

  const toggleLocationType = (type: string) => {
    startTransition(() => {
      setSelectedLocationTypes((prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type)
          : [...prev, type],
      );
    });
  };

  const resetFilters = () => {
    startTransition(() => {
      setSelectedExperience([]);
      setSelectedSalary([]);
      setSelectedJobTypes([]);
      setSelectedLocationTypes([]);
      setQuery("");
      setLocation("");
    });
  };

  return {
    query,
    setQuery,
    location,
    setLocation,
    selectedExperience,
    selectedSalary,
    selectedJobTypes,
    selectedLocationTypes,
    toggleExperience,
    toggleSalary,
    toggleJobType,
    toggleLocationType,
    resetFilters,
    debouncedQuery,
    debouncedLocation,
    isPageLoading: isAuthLoading,
  };
}
