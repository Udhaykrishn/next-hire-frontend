"use client";

import { motion } from "motion/react";
import { Users, Filter, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/animate-ui/components/buttons/button";

export default function RecruiterApplicationsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-satoshi selection:bg-wise-green selection:text-dark-green">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Job Applications
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Review and manage candidates who applied to your jobs.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="h-11 rounded-xl text-[14px] font-bold text-gray-700 bg-white border-gray-200 hover:bg-gray-50 shadow-sm flex items-center gap-2"
          >
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>
      </div>

      {/* Empty State Mock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] p-12 border border-gray-100 shadow-xl shadow-[#258265]/5 flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-24 h-24 bg-[#258265]/10 text-[#258265] rounded-full flex items-center justify-center mb-8 relative">
          <Users className="w-10 h-10" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
            <CheckCircle className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-gray-900 mb-4">
          No Applications Yet
        </h2>
        <p className="text-gray-500 font-medium max-w-md mx-auto leading-relaxed mb-8">
          Once candidates apply to your active job postings, their applications
          will appear here for you to review and manage.
        </p>
      </motion.div>
    </div>
  );
}
