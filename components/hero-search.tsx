"use client";

import { Search } from "lucide-react";
import { LazyMotion, m, domAnimation } from "motion/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";

export function HeroSearch() {
  const { push } = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (location) params.append("l", location);
    push(`/jobs?${params.toString()}`);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-2xl mb-8"
    >
      <form
        onSubmit={handleSearch}
        className="relative flex items-center bg-white border border-gray-100 rounded-full shadow-2xl shadow-gray-200/50 p-2 group focus-within:ring-2 focus-within:ring-wise-green/20 transition-all"
      >
        <div className="flex-1 flex items-center px-4 group/item">
          <Search className="size-5 text-gray-400 group-focus-within:text-wise-green transition-colors shrink-0" />
          <input aria-label="Control"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Skills, Designation"
            className="w-full h-12 ml-3 bg-transparent text-gray-900 placeholder:text-gray-400 text-base font-medium outline-none"
          />
        </div>
        <div className="w-[1px] h-8 bg-gray-100" />
        <div className="flex-1 flex items-center px-4 group/item">
          <div className="size-5 flex items-center justify-center shrink-0">
            <div className="size-1.5 rounded-full bg-gray-400 group-focus-within:bg-wise-green transition-colors" />
          </div>
          <input aria-label="Control"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full h-12 ml-3 bg-transparent text-gray-900 placeholder:text-gray-400 text-base font-medium outline-none"
          />
        </div>
        <Button
          type="submit"
          className="h-12 px-8 bg-dark-green text-white rounded-full text-base font-bold hover:bg-dark-green/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Search
        </Button>
      </form>
    </m.div>
  );
}
