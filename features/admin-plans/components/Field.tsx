import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="block text-[12px] font-[700] uppercase tracking-wider text-gray-400">
        {label}
      </div>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] text-red-500 font-[500]"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
