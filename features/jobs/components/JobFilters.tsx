"use client";

import { type ReactNode, useState } from "react";
import { ChevronDown, Moon, SlidersHorizontal } from "lucide-react";
import {
  CATEGORY_OPTIONS,
  DATE_POSTED_OPTIONS,
  EXPERIENCE_OPTIONS,
  JOB_TYPE_OPTIONS,
  SALARY_OPTIONS,
  WORK_TYPE_OPTIONS,
  type FilterOption,
} from "../constants/filters";
import type { useJobList } from "../hooks/use-job-list";

type JobListApi = ReturnType<typeof useJobList>;

interface JobFiltersProps {
  filters: JobListApi;
}

function FilterPill({
  option,
  active,
  onClick,
}: {
  option: FilterOption;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-3.5 py-2 rounded-full text-[13px] font-bold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wise-green/40 ${
        active
          ? "bg-wise-green/15 border-wise-green text-dark-green"
          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
      }`}
    >
      {option.label}
    </button>
  );
}

function FilterSection({
  title,
  count,
  defaultOpen = false,
  children,
}: {
  title: string;
  count: number;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-b-0 py-4 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 group focus-visible:outline-none"
      >
        <span className="flex items-center gap-2 text-[14px] font-black text-gray-900">
          {title}
          {count > 0 && (
            <span className="min-w-5 h-5 px-1.5 inline-flex items-center justify-center rounded-full bg-wise-green text-dark-green text-[11px] font-black">
              {count}
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-out ${
          open
            ? "grid-rows-[1fr] opacity-100 mt-3"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export function JobFilters({ filters }: JobFiltersProps) {
  const {
    jobTypes,
    workTypes,
    experience,
    salary,
    categories,
    datePosted,
    nightShiftOnly,
    toggleJobType,
    toggleWorkType,
    toggleExperience,
    toggleSalary,
    toggleCategory,
    selectDatePosted,
    toggleNightShift,
    activeFilterCount,
    resetFilters,
  } = filters;

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[15px] font-black text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-wise-green" /> Filters
          {activeFilterCount > 0 && (
            <span className="text-gray-400 font-bold">
              · {activeFilterCount}
            </span>
          )}
        </h2>
        <button
          type="button"
          onClick={resetFilters}
          disabled={activeFilterCount === 0}
          className="text-[12px] font-bold text-wise-green hover:underline disabled:text-gray-300 disabled:no-underline disabled:cursor-not-allowed"
        >
          Clear all
        </button>
      </div>

      <FilterSection title="Job type" count={jobTypes.length} defaultOpen>
        <div className="flex flex-wrap gap-2">
          {JOB_TYPE_OPTIONS.map((o) => (
            <FilterPill
              key={o.value}
              option={o}
              active={jobTypes.includes(o.value)}
              onClick={() => toggleJobType(o.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Work type" count={workTypes.length} defaultOpen>
        <div className="flex flex-wrap gap-2">
          {WORK_TYPE_OPTIONS.map((o) => (
            <FilterPill
              key={o.value}
              option={o}
              active={workTypes.includes(o.value)}
              onClick={() => toggleWorkType(o.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Experience" count={experience.length}>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE_OPTIONS.map((o) => (
            <FilterPill
              key={o.value}
              option={o}
              active={experience.includes(o.value)}
              onClick={() => toggleExperience(o.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Salary range" count={salary.length}>
        <div className="flex flex-wrap gap-2">
          {SALARY_OPTIONS.map((o) => (
            <FilterPill
              key={o.value}
              option={o}
              active={salary.includes(o.value)}
              onClick={() => toggleSalary(o.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Category" count={categories.length}>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((o) => (
            <FilterPill
              key={o.value}
              option={o}
              active={categories.includes(o.value)}
              onClick={() => toggleCategory(o.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Date posted" count={datePosted ? 1 : 0}>
        <div className="flex flex-wrap gap-2">
          {DATE_POSTED_OPTIONS.map((o) => (
            <FilterPill
              key={o.value}
              option={o}
              active={datePosted === o.value}
              onClick={() => selectDatePosted(o.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Shift" count={nightShiftOnly ? 1 : 0}>
        <button
          type="button"
          onClick={toggleNightShift}
          aria-pressed={nightShiftOnly}
          className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border transition-all ${
            nightShiftOnly
              ? "bg-wise-green/15 border-wise-green"
              : "bg-gray-50 border-gray-100 hover:border-gray-200"
          }`}
        >
          <span className="flex items-center gap-2 text-[13px] font-bold text-gray-700">
            <Moon className="w-4 h-4 text-gray-400" /> Night shift only
          </span>
          <span
            className={`relative w-9 h-5 rounded-full transition-colors ${
              nightShiftOnly ? "bg-wise-green" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                nightShiftOnly ? "translate-x-4" : ""
              }`}
            />
          </span>
        </button>
      </FilterSection>
    </div>
  );
}
