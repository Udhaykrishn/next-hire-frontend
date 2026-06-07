import { Filter, RefreshCw, Search, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

interface CandidateApplicationsFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  clearFilters: () => void;
  refetch: () => void;
}

export function CandidateApplicationsFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  clearFilters,
  refetch,
}: CandidateApplicationsFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
      className="flex flex-col lg:flex-row gap-4 justify-between items-center"
    >
      <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
        {/* Search */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-wise-green transition-colors duration-300" />
          <input
            type="text"
            placeholder="Filter by company or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[52px] pl-[3.25rem] pr-4 bg-white border border-gray-200/60 rounded-xl text-[14px] font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-wise-green/50 focus:border-wise-green outline-none transition-all duration-300 shadow-sm hover:shadow-md"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full md:w-48 group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-[52px] pl-4 pr-10 bg-white border border-gray-200/60 rounded-xl text-[14px] font-medium text-gray-700 appearance-none focus:ring-2 focus:ring-wise-green/50 focus:border-wise-green outline-none transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="REVIEWING">In Review</option>
            <option value="INTERVIEWS">Interviews</option>
            <option value="OFFERS">Offers</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
        </div>
      </div>

      <div className="flex gap-3 w-full lg:w-auto mt-2 lg:mt-0">
        <button
          type="button"
          onClick={clearFilters}
          className="flex-1 md:flex-none h-[52px] px-6 bg-white border border-gray-200/60 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2.5 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md text-gray-600 hover:text-gray-900 group"
        >
          <Filter className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />{" "}
          Clear
        </button>
        <button
          type="button"
          onClick={refetch}
          className="flex-1 md:flex-none h-[52px] px-6 bg-gray-900 text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2.5 hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg shadow-gray-900/20 active:scale-95 group"
        >
          <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:rotate-180 transition-all duration-500" />{" "}
          Refresh
        </button>
      </div>
    </motion.div>
  );
}
