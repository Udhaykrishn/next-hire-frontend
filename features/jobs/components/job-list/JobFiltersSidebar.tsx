import { Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const EXPERIENCE_OPTIONS = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Director",
];
const JOB_TYPE_OPTIONS = ["Full Time", "Part Time", "Contract", "Internship"];

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 border outline-none focus-visible:ring-2 focus-visible:ring-wise-green/50 ${
        active
          ? "bg-[#e2f6d5] text-[#163300] border-[#9fe870] shadow-sm"
          : "bg-white text-gray-500 border-gray-200 hover:border-[#9fe870] hover:text-[#163300] hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

interface JobFiltersSidebarProps {
  activeFilterCount: number;
  resetFilters: () => void;
  selectedExperience: string[];
  toggleExperience: (exp: string) => void;
  salaryRange: [number, number];
  setSalaryRange: (range: [number, number]) => void;
  selectedJobTypes: string[];
  toggleJobType: (type: string) => void;
}

export function JobFiltersSidebar({
  activeFilterCount,
  resetFilters,
  selectedExperience,
  toggleExperience,
  salaryRange,
  setSalaryRange,
  selectedJobTypes,
  toggleJobType,
}: JobFiltersSidebarProps) {
  return (
    <aside className="lg:col-span-3">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sticky top-28">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-dark-green/5 flex items-center justify-center">
              <Filter className="w-3.5 h-3.5 text-dark-green" />
            </div>
            <span className="text-[13px] font-black text-gray-900 uppercase tracking-wider">
              Filters
            </span>
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] font-bold text-wise-green hover:text-dark-green transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        {/* Experience */}
        <div className="mb-5">
          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
            Experience
          </h4>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCE_OPTIONS.map((exp) => (
              <FilterPill
                key={exp}
                label={exp}
                active={selectedExperience.includes(exp)}
                onClick={() => toggleExperience(exp)}
              />
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-100 my-4" />

        {/* Salary */}
        <div className="mb-5 px-1">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Salary Range
            </h4>
            <span className="text-[12px] font-bold text-dark-green bg-wise-green/10 px-2 py-0.5 rounded-md">
              ₹{(salaryRange[0] / 100000).toFixed(1)}L - ₹
              {(salaryRange[1] / 100000).toFixed(1)}L
            </span>
          </div>
          <div className="px-2">
            <Slider
              min={0}
              max={2000000}
              step={100000}
              value={salaryRange}
              onValueChange={(val) => setSalaryRange(val as [number, number])}
              className="w-full"
            />
            <div className="flex items-center justify-between mt-3 text-[10px] font-bold text-gray-400">
              <span>₹0</span>
              <span>₹20L+</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100 my-4" />

        {/* Job Type */}
        <div>
          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
            Job Type
          </h4>
          <div className="flex flex-wrap gap-2">
            {JOB_TYPE_OPTIONS.map((type) => (
              <FilterPill
                key={type}
                label={type}
                active={selectedJobTypes.includes(type)}
                onClick={() => toggleJobType(type)}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
