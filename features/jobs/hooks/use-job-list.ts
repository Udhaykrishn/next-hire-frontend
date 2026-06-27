import {
  type Dispatch,
  type SetStateAction,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { useDebouncedValue } from "@tanstack/react-pacer";
import type { SearchJobsParams } from "../types/job.types";
import {
  CATEGORY_OPTIONS,
  DATE_POSTED_OPTIONS,
  DEFAULT_SORT,
  EXPERIENCE_OPTIONS,
  JOB_TYPE_OPTIONS,
  SALARY_OPTIONS,
  WORK_TYPE_OPTIONS,
} from "../constants/filters";

export type FilterGroup =
  | "jobType"
  | "workType"
  | "experience"
  | "salary"
  | "category"
  | "datePosted"
  | "nightShift";

export interface ActiveFilterChip {
  group: FilterGroup;
  value: string;
  label: string;
}

const labelFor = (
  options: { label: string; value: string }[],
  value: string,
): string => options.find((o) => o.value === value)?.label ?? value;

export function useJobList() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [salary, setSalary] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [datePosted, setDatePosted] = useState<string>("");
  const [nightShiftOnly, setNightShiftOnly] = useState(false);
  const [sort, setSort] = useState<string>(DEFAULT_SORT);
  const [_isPending, startTransition] = useTransition();

  const { isLoading: isAuthLoading } = useAuthContext();

  const [debouncedQuery] = useDebouncedValue(query, { wait: 400 });
  const [debouncedLocation] = useDebouncedValue(location, { wait: 400 });

  const makeToggle =
    (setter: Dispatch<SetStateAction<string[]>>) => (value: string) => {
      startTransition(() => {
        setter((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value],
        );
      });
    };

  const toggleJobType = makeToggle(setJobTypes);
  const toggleWorkType = makeToggle(setWorkTypes);
  const toggleExperience = makeToggle(setExperience);
  const toggleSalary = makeToggle(setSalary);
  const toggleCategory = makeToggle(setCategories);

  const selectDatePosted = (value: string) => {
    startTransition(() => {
      setDatePosted((prev) => (prev === value ? "" : value));
    });
  };

  const toggleNightShift = () => {
    startTransition(() => setNightShiftOnly((prev) => !prev));
  };

  const changeSort = (value: string) => {
    startTransition(() => setSort(value));
  };

  const resetFilters = () => {
    startTransition(() => {
      setJobTypes([]);
      setWorkTypes([]);
      setExperience([]);
      setSalary([]);
      setCategories([]);
      setDatePosted("");
      setNightShiftOnly(false);
      setSort(DEFAULT_SORT);
      setQuery("");
      setLocation("");
    });
  };

  const removeChip = (group: FilterGroup, value: string) => {
    switch (group) {
      case "jobType":
        return toggleJobType(value);
      case "workType":
        return toggleWorkType(value);
      case "experience":
        return toggleExperience(value);
      case "salary":
        return toggleSalary(value);
      case "category":
        return toggleCategory(value);
      case "datePosted":
        return startTransition(() => setDatePosted(""));
      case "nightShift":
        return startTransition(() => setNightShiftOnly(false));
    }
  };

  const activeChips = useMemo<ActiveFilterChip[]>(() => {
    const chips: ActiveFilterChip[] = [];
    jobTypes.forEach((v) => {
      chips.push({
        group: "jobType",
        value: v,
        label: labelFor(JOB_TYPE_OPTIONS, v),
      });
    });
    workTypes.forEach((v) => {
      chips.push({
        group: "workType",
        value: v,
        label: labelFor(WORK_TYPE_OPTIONS, v),
      });
    });
    experience.forEach((v) => {
      chips.push({
        group: "experience",
        value: v,
        label: labelFor(EXPERIENCE_OPTIONS, v),
      });
    });
    salary.forEach((v) => {
      chips.push({
        group: "salary",
        value: v,
        label: labelFor(SALARY_OPTIONS, v),
      });
    });
    categories.forEach((v) => {
      chips.push({
        group: "category",
        value: v,
        label: labelFor(CATEGORY_OPTIONS, v),
      });
    });
    if (datePosted)
      chips.push({
        group: "datePosted",
        value: datePosted,
        label: labelFor(DATE_POSTED_OPTIONS, datePosted),
      });
    if (nightShiftOnly)
      chips.push({ group: "nightShift", value: "true", label: "Night shift" });
    return chips;
  }, [
    jobTypes,
    workTypes,
    experience,
    salary,
    categories,
    datePosted,
    nightShiftOnly,
  ]);

  const activeFilterCount = activeChips.length;

  const params = useMemo<SearchJobsParams>(
    () => ({
      search: debouncedQuery,
      location: debouncedLocation,
      jobTypes,
      locationTypes: workTypes,
      experience,
      salary,
      jobCategories: categories,
      datePosted,
      nightShift: nightShiftOnly,
      sort,
    }),
    [
      debouncedQuery,
      debouncedLocation,
      jobTypes,
      workTypes,
      experience,
      salary,
      categories,
      datePosted,
      nightShiftOnly,
      sort,
    ],
  );

  return {
    query,
    setQuery,
    location,
    setLocation,
    jobTypes,
    workTypes,
    experience,
    salary,
    categories,
    datePosted,
    nightShiftOnly,
    sort,
    toggleJobType,
    toggleWorkType,
    toggleExperience,
    toggleSalary,
    toggleCategory,
    selectDatePosted,
    toggleNightShift,
    changeSort,
    resetFilters,
    removeChip,
    activeChips,
    activeFilterCount,
    params,
    isPageLoading: isAuthLoading,
  };
}
