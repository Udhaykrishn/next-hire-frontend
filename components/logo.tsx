"use client";

import { m } from "motion/react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  withText?: boolean;
}

export function Logo({
  className = "",
  size = "md",
  withText = true,
}: LogoProps) {
  const sizeClasses = {
    sm: "size-6",
    md: "size-8",
    lg: "size-12",
    xl: "size-16",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <m.div
        className={`${sizeClasses[size]} relative flex-shrink-0`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <m.div
          className="absolute inset-0 bg-wise-green rounded-xl rotate-45 opacity-20"
          animate={{ rotate: [45, 90, 45] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute inset-0 bg-wise-green rounded-xl"
          animate={{ rotate: [0, 45, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-black text-dark-green z-10 text-opacity-90">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-3/4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
      </m.div>

      {withText && (
        <div
          className={`font-black tracking-tighter flex items-center ${textSizeClasses[size]}`}
        >
          <span className="text-foreground">Next</span>
          <span className="text-wise-green">Hire</span>
          <m.div
            className="size-1.5 rounded-full bg-wise-green ml-1 mb-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      )}
    </div>
  );
}
