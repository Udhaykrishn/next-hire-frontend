interface SectionHeaderProps {
  step: string;
  label: string;
}

export function SectionHeader({ step, label }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-[800] tracking-widest text-wise-green bg-dark-green px-2.5 py-1 rounded-full">
        {step}
      </span>
      <h2 className="text-[16px] font-[800] text-near-black">{label}</h2>
    </div>
  );
}
