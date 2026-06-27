import { JOB_CATEGORIES } from "@/app/recruiter/jobs/create/new/constants";

/**
 * Candidate-facing job filter vocabulary.
 *
 * IMPORTANT: `value` must match the vocabulary recruiters actually store
 * (see the recruiter create-job form). The backend matches these with a
 * case-insensitive regex, so a label/value mismatch silently returns zero
 * jobs. `label` is what we show; `value` is what we send.
 */

export interface FilterOption {
  label: string;
  value: string;
}

// Stored as "Full Time" / "Part Time" / "Both (Full-Time And Part-Time)".
export const JOB_TYPE_OPTIONS: FilterOption[] = [
  { label: "Full time", value: "Full Time" },
  { label: "Part time", value: "Part Time" },
  { label: "Full & part time", value: "Both" },
];

// Stored as "Work From Office" / "Work From Home" / "Field Job".
export const WORK_TYPE_OPTIONS: FilterOption[] = [
  { label: "Work from office", value: "Work From Office" },
  { label: "Work from home", value: "Work From Home" },
  { label: "Field job", value: "Field Job" },
];

// Mapped to numeric minExperience ranges on the backend.
export const EXPERIENCE_OPTIONS: FilterOption[] = [
  { label: "Entry level · 0–1 yrs", value: "Entry Level" },
  { label: "Mid level · 1–3 yrs", value: "Mid Level" },
  { label: "Senior · 3–7 yrs", value: "Senior Level" },
  { label: "Director · 7+ yrs", value: "Director" },
];

// Mapped to numeric maxSalary ranges on the backend.
export const SALARY_OPTIONS: FilterOption[] = [
  { label: "Up to ₹3L", value: "₹0 - ₹3L" },
  { label: "₹3L – ₹5L", value: "₹3L - ₹5L" },
  { label: "₹5L – ₹10L", value: "₹5L - ₹10L" },
  { label: "₹10L and above", value: "₹10L+" },
];

export const CATEGORY_OPTIONS: FilterOption[] = JOB_CATEGORIES.map((c) => ({
  label: c,
  value: c,
}));

export const DATE_POSTED_OPTIONS: FilterOption[] = [
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
];

export const SORT_OPTIONS: FilterOption[] = [
  { label: "Best match", value: "Relevance" },
  { label: "Newest", value: "Newest" },
  { label: "Salary: high to low", value: "Salary (High to Low)" },
  { label: "Salary: low to high", value: "Salary (Low to High)" },
];

export const DEFAULT_SORT = "Relevance";
