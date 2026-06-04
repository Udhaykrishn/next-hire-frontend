import { Briefcase } from "lucide-react";
import { motion } from "motion/react";

export function CandidateApplicationsEmptyState() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      className="bg-white border border-gray-100/50 rounded-[32px] p-16 sm:p-24 flex flex-col items-center justify-center text-center shadow-sm"
    >
      <div className="w-24 h-24 bg-gray-50/80 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-gray-900/5">
        <Briefcase className="w-10 h-10 text-gray-300" />
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
        No applications found
      </h3>
      <p className="text-[15px] text-gray-500 font-medium max-w-sm">
        You haven't submitted any applications that match your current filters.
      </p>
    </motion.div>
  );
}
