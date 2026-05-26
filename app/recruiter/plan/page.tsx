"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { PricingContent } from "@/app/pricing/page";
import { Button } from "@/components/animate-ui/components/buttons/button";



export default function RecruiterPlanPage() {
  const { push } = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="h-16 px-8 border-b border-gray-100 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-50">
        <Button
          variant="ghost"
          onClick={() => push("/recruiter/dashboard")}
          className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-gray-500 hover:text-near-black"
        >
          <ChevronLeft className="size-4" />
          Dashboard
        </Button>
        <span className="text-[14px] font-black tracking-tighter text-near-black">
          next<span className="text-wise-green italic">Hire</span> Subscriptions
        </span>
        <div className="w-20" />
      </header>

      <Suspense
        fallback={
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="size-8 border-4 border-wise-green border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <PricingContent hideNavbar={true} />
      </Suspense>
    </div>
  );
}
