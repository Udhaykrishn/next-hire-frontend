import { m } from "motion/react";

interface GlobalLoaderProps {
  fullScreen?: boolean;
  className?: string;
}

export function GlobalLoader({
  fullScreen = true,
  className = "",
}: GlobalLoaderProps = {}) {
  return (
    <div
      className={`${fullScreen ? "fixed inset-0 z-50" : "relative w-full py-20"} flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl ${className}`}
    >
      <div className="relative flex items-center justify-center size-24">
        {/* Pulsating Outer Ring */}
        <m.div
          className="absolute inset-0 rounded-full border-[3px] border-wise-green/40"
          animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Spinning Accent Ring */}
        <m.div
          className="absolute inset-2 rounded-full border-[3px] border-transparent border-t-dark-green border-r-wise-green"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Pulse */}
        <m.div
          className="absolute inset-4 rounded-full border-[3px] border-transparent border-b-dark-green border-l-wise-green/50"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Core */}
        <m.div
          className="size-10 bg-dark-green rounded-full shadow-lg shadow-wise-green/40 flex items-center justify-center"
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="size-3 bg-white rounded-full opacity-90" />
        </m.div>
      </div>
    </div>
  );
}
