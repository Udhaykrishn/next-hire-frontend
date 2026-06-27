interface SectionHeaderProps {
  step: string;
  label: string;
}

export function SectionHeader({ step, label }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-surface-soft text-[11px] font-semibold text-muted-ink tabular-nums">
        {step}
      </span>
      <h2 className="text-[15px] font-semibold text-ink">{label}</h2>
    </div>
  );
}
