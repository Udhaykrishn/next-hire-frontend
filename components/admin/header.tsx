"use client";

import { Bell, Command, Moon, Search, Sun } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-50 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-wise-green transition-colors" />
          <input
            type="text"
            aria-label="Search"
            placeholder="Search anything..."
            className="w-full h-10 pl-10 pr-12 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-wise-green/20 focus:border-wise-green transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-white border border-gray-100 rounded text-[10px] font-black text-gray-400">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
          <button
            type="button"
            aria-label="Light mode"
            className="p-2 rounded-lg text-gray-400 hover:text-near-black hover:bg-white transition-all"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Dark mode"
            className="p-2 rounded-lg text-gray-400 hover:text-near-black hover:bg-white transition-all"
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 hover:text-near-black transition-all group"
        >
          <Bell className="w-5 h-5 group-hover:rotate-12 duration-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-wise-green border-2 border-white rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-100 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-near-black leading-none mb-1">
              Super Admin
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">
              Global Root
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-near-black text-white flex items-center justify-center font-black text-sm transition-transform group-hover:scale-105 shadow-lg shadow-near-black/10">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
