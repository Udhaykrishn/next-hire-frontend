"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Clock,
  Database,
  Info,
  MoreVertical,
  Navigation,
  Plus,
  User2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { JobCreationModal } from "@/components/recruiter/modals";
import { Button } from "@/components/ui/button";
import { type JobListing, useRecruiter } from "@/hooks/use-recruiter";

export default function RecruiterDashboard() {
  const router = useRouter();
  const { jobs, isLoading, isJobModalOpen, setIsJobModalOpen } = useRecruiter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-wise-green/10 border-t-wise-green rounded-full animate-spin" />
          <p className="text-gray-300 font-black text-[9px] uppercase tracking-widest animate-pulse">
            Synchronizing Jobs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-black text-near-black tracking-tight">
          All Jobs <span className="text-gray-300 ml-1">({jobs.length})</span>
        </h1>
        <Button
          onClick={() => router.push("/recruiter/jobs/create")}
          className="h-10 px-5 bg-wise-green text-near-black hover:bg-near-black hover:text-white transition-all rounded-xl font-black text-[13px] shadow-lg shadow-wise-green/10 group"
        >
          <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Post a new job
        </Button>
      </div>

      {/* Jobs List - Compact Satoshi Style */}
      <div className="space-y-4">
        {jobs.map((job: JobListing) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group"
          >
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
              {/* Left Column: Job Primary Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-[18px] font-black text-near-black group-hover:text-wise-green transition-colors leading-none tracking-tight">
                    {job.title}
                  </h2>
                  <div className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 text-[8px] font-black uppercase tracking-widest border border-orange-100">
                    Select Plan
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[12px] font-medium">
                    <Navigation className="w-3.5 h-3.5 text-wise-green/40" />
                    {job.location || "Kochi, Kerala"}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-[12px] font-medium">
                    <Clock className="w-3.5 h-3.5 text-wise-green/40" />
                    Posted: {job.posted}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-[12px] font-medium">
                    <User2 className="w-3.5 h-3.5 text-gray-200" />
                    {job.postedBy || "Uday krishna"}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gray-50/50 border border-gray-100/50 text-[12px] font-medium text-gray-400">
                  <Info className="w-3.5 h-3.5 text-wise-green" />
                  Finish job posting to start receiving candidates
                </div>
              </div>

              {/* Middle Column: Stats Display */}
              <div className="flex items-center gap-10 md:border-x border-gray-100 md:px-10 h-16">
                <div className="flex flex-col items-center">
                  <span className="text-[18px] font-black text-gray-200 leading-none">
                    -
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 mt-1.5 text-center leading-tight">
                    Applied
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-[18px] font-black text-near-black">
                      0
                    </span>
                    <Database className="w-3.5 h-3.5 text-wise-green/50" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 mt-1.5 text-center leading-tight">
                    Matches
                  </span>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="h-10 px-6 rounded-full border-gray-100 font-black text-[13px] text-near-black hover:border-wise-green hover:bg-wise-green/5 transition-all"
                >
                  Finish posting
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-gray-50 text-gray-300"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Empty State */}
        {jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-[2rem] border border-dashed border-gray-200">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-gray-100" />
            </div>
            <h3 className="text-[18px] font-black text-near-black mb-1">
              No active listings
            </h3>
            <p className="text-gray-400 font-medium text-[13px] mb-6 text-center">
              Deploy your first role to start <br />
              matching with elite talent.
            </p>
            <Button
              onClick={() => router.push("/recruiter/jobs/create")}
              className="h-12 px-8 bg-wise-green text-near-black hover:bg-near-black hover:text-white transition-all rounded-full font-black text-sm shadow-xl shadow-wise-green/10"
            >
              Initialize Deployment
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <JobCreationModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
      />
    </div>
  );
}
