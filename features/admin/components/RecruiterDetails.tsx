"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { useRecruiterDetails } from "../hooks/use-recruiter-details";
import { RecruiterActivityList } from "./RecruiterActivityList";
import { RecruiterCompanyInfo } from "./RecruiterCompanyInfo";
import { RecruiterHeader } from "./RecruiterHeader";
import { RecruiterJobsList } from "./RecruiterJobsList";
import { RecruiterSidebar } from "./RecruiterSidebar";

interface RecruiterDetailsProps {
  id: string;
}

export const RecruiterDetails = ({ id }: RecruiterDetailsProps) => {
  const router = useRouter();
  const { data: recruiter } = useRecruiterDetails(id);

  if (!recruiter) return null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="text-gray-500 hover:text-near-black flex items-center gap-2 px-0"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Partners
      </Button>

      <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm shadow-gray-200/50 overflow-hidden">
        <RecruiterHeader recruiter={recruiter} id={id} />

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <RecruiterCompanyInfo recruiter={recruiter} />
              <RecruiterActivityList activity={recruiter.activity} />
              <RecruiterJobsList id={id} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <RecruiterSidebar recruiter={recruiter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
