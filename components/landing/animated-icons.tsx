"use client";

import { motion, type Variants } from "motion/react";

/**
 * Hand-built line icons (DESIGN.md coral/navy stroke style). Each icon draws
 * its strokes on scroll-into-view and adds a small micro-interaction on hover
 * of the nearest `.group`. No icon-library dependency, CSP-safe.
 */

type IconProps = {
  className?: string;
  /** stroke width, defaults to the editorial 1.6 */
  weight?: number;
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.12, duration: 0.6, ease: "easeInOut" },
      opacity: { delay: i * 0.12, duration: 0.2 },
    },
  }),
};

function Svg({
  className,
  weight = 1.6,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={className}
      aria-hidden="true"
    >
      {children}
    </motion.svg>
  );
}

/** Precision matching — target + locked center dot */
export function IconPrecision(props: IconProps) {
  return (
    <Svg {...props}>
      <motion.circle cx="12" cy="12" r="9" variants={draw} custom={0} />
      <motion.circle cx="12" cy="12" r="5" variants={draw} custom={1} />
      <motion.circle cx="12" cy="12" r="1.4" variants={draw} custom={2} />
      <motion.path
        d="M12 1.5V4M12 20v2.5M1.5 12H4M20 12h2.5"
        variants={draw}
        custom={2}
      />
    </Svg>
  );
}

/** Candidate profiling — person on a card */
export function IconProfile(props: IconProps) {
  return (
    <Svg {...props}>
      <motion.rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2.5"
        variants={draw}
        custom={0}
      />
      <motion.circle cx="9" cy="10.5" r="2.4" variants={draw} custom={1} />
      <motion.path
        d="M5.5 16.5c.6-2 1.9-3 3.5-3s2.9 1 3.5 3"
        variants={draw}
        custom={2}
      />
      <motion.path d="M15 9h4M15 12.5h4M15 16h2.5" variants={draw} custom={2} />
    </Svg>
  );
}

/** Smart resume builder — document with auto lines + spark */
export function IconResume(props: IconProps) {
  return (
    <Svg {...props}>
      <motion.path
        d="M6 3h7l5 5v13a0 0 0 0 1 0 0H6a0 0 0 0 1 0 0V3z"
        variants={draw}
        custom={0}
      />
      <motion.path d="M13 3v5h5" variants={draw} custom={1} />
      <motion.path
        d="M8.5 13h7M8.5 16.5h7M8.5 9.5h2.5"
        variants={draw}
        custom={2}
      />
    </Svg>
  );
}

/** One-click apply — lightning bolt */
export function IconOneClick(props: IconProps) {
  return (
    <Svg {...props}>
      <motion.path
        d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8z"
        variants={draw}
        custom={0}
      />
    </Svg>
  );
}

/** Interview prep — speech bubbles */
export function IconInterview(props: IconProps) {
  return (
    <Svg {...props}>
      <motion.path
        d="M3 6.5A2.5 2.5 0 0 1 5.5 4h9A2.5 2.5 0 0 1 17 6.5V11A2.5 2.5 0 0 1 14.5 13.5H8L4 17v-3.5A2.5 2.5 0 0 1 3 11z"
        variants={draw}
        custom={0}
      />
      <motion.path d="M7 8.2h6M7 10.4h3.5" variants={draw} custom={1} />
      <motion.path
        d="M17.5 9.5h1A2.5 2.5 0 0 1 21 12v3.5a2.5 2.5 0 0 1-2.5 2.5H17l-2.5 2v-2"
        variants={draw}
        custom={2}
      />
    </Svg>
  );
}

/** Global reach — globe + meridians */
export function IconGlobe(props: IconProps) {
  return (
    <Svg {...props}>
      <motion.circle cx="12" cy="12" r="9" variants={draw} custom={0} />
      <motion.path d="M3 12h18" variants={draw} custom={1} />
      <motion.path
        d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9z"
        variants={draw}
        custom={2}
      />
    </Svg>
  );
}

/** Step 1 — upload a resume */
export function IconUpload(props: IconProps) {
  return (
    <Svg {...props}>
      <motion.path d="M12 15V4" variants={draw} custom={0} />
      <motion.path d="M7.5 8.5 12 4l4.5 4.5" variants={draw} custom={1} />
      <motion.path
        d="M4 14v4.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V14"
        variants={draw}
        custom={2}
      />
    </Svg>
  );
}

/** Step 2 — AI match / connect */
export function IconMatch(props: IconProps) {
  return (
    <Svg {...props}>
      <motion.circle cx="7.5" cy="12" r="4.5" variants={draw} custom={0} />
      <motion.circle cx="16.5" cy="12" r="4.5" variants={draw} custom={1} />
      <motion.path d="M10.5 12h3" variants={draw} custom={2} />
    </Svg>
  );
}

/** Step 3 — apply / send */
export function IconSend(props: IconProps) {
  return (
    <Svg {...props}>
      <motion.path d="M21 3 10.5 13.5" variants={draw} custom={0} />
      <motion.path
        d="M21 3 14.5 21l-4-7.5L3 9.5 21 3z"
        variants={draw}
        custom={1}
      />
    </Svg>
  );
}

/** Inline arrow used on CTAs (animates with framer on hover via parent group) */
export function IconArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

/** Small spark used on eyebrows / badges */
export function IconSpark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2c.4 4.6 2.4 6.6 7 7-4.6.4-6.6 2.4-7 7-.4-4.6-2.4-6.6-7-7 4.6-.4 6.6-2.4 7-7z" />
    </svg>
  );
}
