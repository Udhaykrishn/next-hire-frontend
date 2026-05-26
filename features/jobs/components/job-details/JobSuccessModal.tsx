import { CheckCircle, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

interface JobSuccessModalProps {
  show: boolean;
  onClose: () => void;
}

export function JobSuccessModal({ show, onClose }: JobSuccessModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-[2rem] p-8 relative shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center mt-4">
          <div className="w-20 h-20 bg-dark-green/10 text-dark-green rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 fill-current text-dark-green opacity-20" />
            <CheckCircle className="w-10 h-10 absolute" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Applied successfully
          </h2>
          <p className="text-gray-500 font-medium mb-8 text-[15px]">
            Your application is successfully sent to HR
          </p>

          <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6 text-left">
            <h3 className="text-[16px] font-bold text-gray-900 mb-1">
              Find out next steps
            </h3>
            <p className="text-[13px] text-gray-500 mb-5">
              Track the status of this job in your dashboard
            </p>
            <Link
              href="/applications"
              className="flex w-full h-12 rounded-xl text-[14px] font-bold text-dark-green bg-white border border-gray-200 hover:bg-gray-50 items-center justify-center transition-colors shadow-sm"
            >
              View My Applications
            </Link>
          </div>

          <Link
            href="/jobs"
            className="w-full h-14 rounded-2xl text-[15px] font-bold bg-dark-green text-white hover:bg-dark-green/90 flex items-center justify-center transition-all shadow-md shadow-dark-green/20"
          >
            Explore similar jobs
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
