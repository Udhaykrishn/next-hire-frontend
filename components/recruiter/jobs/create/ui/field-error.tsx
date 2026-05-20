"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface FieldErrorProps {
  name: string;
  errors: Record<string, string>;
}

export const FieldError = ({ name, errors }: FieldErrorProps) => {
  if (!errors[name]) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-[11px] font-black text-red-500 mt-1.5 flex items-center gap-1.5"
    >
      <AlertCircle className="w-3 h-3" /> {errors[name]}
    </motion.p>
  );
};
