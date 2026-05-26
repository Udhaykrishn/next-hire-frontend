import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function ActiveFilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#e2f6d5] text-[#163300] text-[11px] font-bold border border-[#9fe870]/30"
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="hover:bg-[#9fe870] rounded p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163300]/20"
      >
        <X className="size-3" />
      </button>
    </motion.span>
  );
}

interface JobActiveFiltersProps {
  activeFilterCount: number;
  resetFilters: () => void;
  selectedExperience: string[];
  toggleExperience: (exp: string) => void;
  salaryRange: [number, number];
  setSalaryRange: (range: [number, number]) => void;
  selectedJobTypes: string[];
  toggleJobType: (type: string) => void;
}

export function JobActiveFilters({
  activeFilterCount,
  resetFilters,
  selectedExperience,
  toggleExperience,
  salaryRange,
  setSalaryRange,
  selectedJobTypes,
  toggleJobType,
}: JobActiveFiltersProps) {
  return (
    <AnimatePresence>
      {activeFilterCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 overflow-hidden"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">
              Active:
            </span>
            <AnimatePresence mode="popLayout">
              {selectedExperience.map((exp) => (
                <ActiveFilterTag
                  key={exp}
                  label={exp}
                  onRemove={() => toggleExperience(exp)}
                />
              ))}
              {(salaryRange[0] > 0 || salaryRange[1] < 2000000) && (
                <ActiveFilterTag
                  key="salary"
                  label={`₹${(salaryRange[0] / 100000).toFixed(1)}L - ₹${(salaryRange[1] / 100000).toFixed(1)}L`}
                  onRemove={() => setSalaryRange([0, 2000000])}
                />
              )}
              {selectedJobTypes.map((type) => (
                <ActiveFilterTag
                  key={type}
                  label={type}
                  onRemove={() => toggleJobType(type)}
                />
              ))}
            </AnimatePresence>
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] font-bold text-red-400 hover:text-red-500 ml-2 transition-colors"
            >
              Clear all
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
