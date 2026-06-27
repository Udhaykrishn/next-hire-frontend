"use client";

import { Bell, Command, Search } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-hairline bg-canvas/85 px-8 backdrop-blur-md">
      <div className="flex max-w-md flex-1 items-center">
        <div className="group relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-soft" />
          <input
            type="text"
            aria-label="Search"
            placeholder="Search candidates, recruiters, jobs..."
            className="h-10 w-full rounded-lg border border-hairline bg-white pl-10 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-muted-soft focus:border-coral/60 focus:ring-2 focus:ring-coral/15"
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded border border-hairline bg-canvas px-1.5 py-0.5 text-[10px] font-medium text-muted-soft">
            <Command className="size-2.5" /> K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-9 items-center justify-center rounded-lg border border-hairline bg-white text-muted-ink transition-colors hover:bg-surface-soft hover:text-ink"
        >
          <Bell className="size-[18px]" />
          <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full border border-white bg-coral" />
        </button>
      </div>
    </header>
  );
}
