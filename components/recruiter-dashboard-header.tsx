import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Menu } from "lucide-react";
import { CompanySwitcher } from "@/features/company/components/CompanySwitcher";
import { useRouter } from "next/navigation";

interface RecruiterDashboardHeaderProps {
  onMenuClick: () => void;
}

export function RecruiterDashboardHeader({
  onMenuClick,
}: RecruiterDashboardHeaderProps) {
  const router = useRouter();

  return (
    <div className="px-4 lg:px-8 pt-4 lg:pt-6 pb-4 sticky top-0 z-30 bg-gradient-to-b from-[#fcfdfd] via-[#fcfdfd]/95 to-transparent backdrop-blur-md">
      <header className="h-16 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between px-3 lg:px-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="flex items-center gap-2 lg:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-near-black hover:bg-wise-green/10 hover:text-wise-green transition-colors"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="hidden sm:block">
            <CompanySwitcher />
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-6 pr-1 lg:pr-2">
          <div className="flex items-center gap-3 bg-gray-50/50 rounded-xl px-3 py-1.5 border border-gray-100/50 hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="hidden sm:flex flex-col items-end justify-center">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1 group-hover:text-wise-green transition-colors">
                Available Credits
              </span>
              <span className="text-[14px] font-black text-near-black leading-none">
                2,450
              </span>
            </div>
            <div className="w-8 h-8 rounded-[10px] bg-wise-green/20 border border-wise-green/30 flex items-center justify-center text-dark-green group-hover:bg-wise-green group-hover:text-near-black transition-all duration-300 shadow-inner">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>

          <div className="h-8 w-[1px] bg-gray-100 hidden sm:block" />

          <div
            onClick={() => router.push("/recruiter/profile")}
            className="flex items-center cursor-pointer group relative"
          >
            <div className="absolute inset-0 bg-wise-green rounded-full blur opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-near-black to-gray-800 p-[2px] shadow-sm shadow-near-black/10 relative z-10 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full border-2 border-white bg-near-black text-white flex items-center justify-center font-bold text-sm relative overflow-hidden">
                <span className="relative z-10">U</span>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-white/10" />
              </div>
            </div>
            {/* Active Status Indicator */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-wise-green border-2 border-white rounded-full z-20 shadow-sm" />
          </div>
        </div>
      </header>
    </div>
  );
}
