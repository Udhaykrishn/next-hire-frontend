import { cn } from "@/lib/utils";

export function FieldView({
  label,
  value,
  icon,
  placeholder = "Not set",
}: {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <div className="gap-y-1.5">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
        {label}
      </p>
      <div className="flex items-center gap-2.5 min-h-[2rem]">
        {icon && <span className="text-gray-300 shrink-0">{icon}</span>}
        <p
          className={cn(
            "text-[15px] font-bold leading-snug",
            value ? "text-near-black" : "text-gray-300 italic",
          )}
        >
          {value || placeholder}
        </p>
      </div>
    </div>
  );
}
