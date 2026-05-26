import { MapPin, Search } from "lucide-react";

interface JobSearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  location: string;
  setLocation: (val: string) => void;
}

export function JobSearchBar({
  query,
  setQuery,
  location,
  setLocation,
}: JobSearchBarProps) {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-2 flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 flex items-center bg-gray-50/80 rounded-xl px-4 py-3 group focus-within:bg-white focus-within:ring-1 focus-within:ring-wise-green/30 focus-within:shadow-sm transition-all">
          <Search className="w-[18px] h-[18px] text-gray-400 group-focus-within:text-dark-green transition-colors shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, skill, or keyword…"
            className="bg-transparent border-none outline-none ml-3 w-full text-[14px] font-medium text-gray-900 placeholder:text-gray-400"
          />
        </div>
        <div className="w-px h-8 bg-gray-100 hidden md:block" />
        <div className="flex-1 flex items-center bg-gray-50/80 rounded-xl px-4 py-3 group focus-within:bg-white focus-within:ring-1 focus-within:ring-wise-green/30 focus-within:shadow-sm transition-all">
          <MapPin className="w-[18px] h-[18px] text-gray-400 group-focus-within:text-dark-green transition-colors shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, state, or remote"
            className="bg-transparent border-none outline-none ml-3 w-full text-[14px] font-medium text-gray-900 placeholder:text-gray-400"
          />
        </div>
        <button
          type="button"
          className="h-11 px-8 bg-dark-green text-white rounded-xl text-[13px] font-black hover:bg-dark-green/90 transition-all shrink-0 flex items-center gap-2"
        >
          <Search className="size-4" />
          Search
        </button>
      </div>
    </div>
  );
}
