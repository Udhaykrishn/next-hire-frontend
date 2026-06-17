export const ICON_OPTIONS = [
  { value: "zap", label: "⚡  Starter", hint: "For entry-level plans" },
  { value: "crown", label: "👑  Pro", hint: "For professional plans" },
  { value: "shield", label: "🛡️  Enterprise", hint: "For premium plans" },
] as const;

export const PERIOD_OPTIONS = ["/month", "/year", "/week", "one-time"] as const;

export const CTA_OPTIONS = [
  "Get Started",
  "Start Free Trial",
  "Choose Plan",
  "Upgrade Now",
  "Contact Sales",
] as const;
