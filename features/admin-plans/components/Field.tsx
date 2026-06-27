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
      <div className="block text-[13px] font-medium text-body">{label}</div>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
