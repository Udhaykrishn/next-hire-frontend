import { m } from "framer-motion";
import { Edit3 } from "lucide-react";
import type { EditSection } from "@/features/recruiter/hooks/use-recruiter-profile";
import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  subtitle,
  icon,
  sectionKey,
  editSection,
  onEdit,
  children,
  isActive,
  hideEdit,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  sectionKey: EditSection;
  editSection: EditSection;
  onEdit: (section: EditSection) => void;
  children: React.ReactNode;
  isActive: boolean;
  hideEdit?: boolean;
}) {
  return (
    <m.div
      layout
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={cn(
        "bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden",
        isActive
          ? "border-wise-green shadow-xl shadow-wise-green/8 ring-1 ring-wise-green/20"
          : "border-gray-100 shadow-sm hover:border-gray-200",
      )}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between p-7 pb-5 border-b border-gray-50">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "size-11 rounded-2xl flex items-center justify-center transition-colors",
              isActive
                ? "bg-wise-green text-near-black"
                : "bg-wise-green/10 text-wise-green",
            )}
          >
            {icon}
          </div>
          <div>
            <h2 className="text-[18px] font-black text-near-black leading-none mb-0.5">
              {title}
            </h2>
            <p className="text-[12px] text-gray-400 font-medium">{subtitle}</p>
          </div>
        </div>

        {!isActive && editSection === null && !hideEdit && (
          <button
            type="button"
            onClick={() => onEdit(sectionKey)}
            className="flex items-center gap-1.5 text-[12px] font-black text-gray-400 hover:text-wise-green transition-colors px-3 py-1.5 rounded-xl hover:bg-wise-green/5"
          >
            <Edit3 className="size-3.5" />
            Edit
          </button>
        )}
        {isActive && (
          <span className="text-[10px] font-black text-wise-green bg-wise-green/10 px-3 py-1 rounded-full uppercase tracking-widest">
            Editing
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-7 pt-6">{children}</div>
    </m.div>
  );
}
