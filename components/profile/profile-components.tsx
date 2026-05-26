import { Edit2, MapPin, Plus, Trash2 } from "lucide-react";
import { m } from "motion/react";
import Link from "next/link";

interface ProfileSectionProps {
  title: string;
  icon: React.ReactNode;
  onAddClick?: () => void;
  href?: string;
  children: React.ReactNode;
}

export const ProfileSection = ({
  title,
  icon,
  onAddClick,
  href,
  children,
}: ProfileSectionProps) => {
  return (
    <m.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-gray-50 flex items-center justify-center text-wise-green border border-gray-100">
            {icon}
          </div>
          <h2 className="text-[20px] font-black text-gray-900 tracking-tight">
            {title}
          </h2>
        </div>
        {href ? (
          <Link
            href={href}
            className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-wise-green hover:bg-wise-green/10 transition-all border border-gray-100"
          >
            <Plus className="size-5" />
          </Link>
        ) : (
          onAddClick && (
            <button
              type="button"
              onClick={onAddClick}
              className="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-wise-green hover:bg-wise-green/10 transition-all border border-gray-100"
            >
              <Plus className="size-5" />
            </button>
          )
        )}
      </div>
      <div className="gap-y-6">{children}</div>
    </m.section>
  );
};

interface ProfileItemCardProps {
  title: string;
  subtitle: string;
  period?: string;
  logo: string;
  description?: string;
  badges?: string[];
  location?: string;
  industry?: string;
  role?: string;
  isCurrent?: boolean;
  editHref?: string;
  onDeleteClick?: () => void;
}

export const ProfileItemCard = ({
  title,
  subtitle,
  period,
  logo,
  description,
  badges,
  location,
  industry,
  role,
  isCurrent,
  editHref,
  onDeleteClick,
}: ProfileItemCardProps) => {
  return (
    <div
      className={`flex gap-5 group relative p-3 -mx-3 rounded-[2rem] transition-all hover:bg-gray-50/50 ${isCurrent ? "bg-wise-green/[0.02] border border-wise-green/10" : ""}`}
    >
      <div className="size-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[18px] font-black text-wise-green shrink-0 group-hover:scale-105 transition-all shadow-sm">
        {logo}
      </div>
      <div className="flex-1 gap-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-[17px] font-black text-gray-900 leading-tight">
                {title}
              </h3>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {editHref && (
                  <Link
                    href={editHref}
                    className="p-1.5 rounded-lg hover:bg-wise-green/10 text-gray-400 hover:text-wise-green transition-colors"
                  >
                    <Edit2 className="size-3.5" />
                  </Link>
                )}
                {onDeleteClick && (
                  <button
                    type="button"
                    onClick={onDeleteClick}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[14px] font-bold text-gray-500">{subtitle}</p>
              {role && (
                <>
                  <span className="size-1 rounded-full bg-gray-300" />
                  <span className="text-[12px] font-black text-wise-green uppercase tracking-wider">
                    {role}
                  </span>
                </>
              )}
            </div>
          </div>
          {period && (
            <span className="text-[12px] font-black text-wise-green bg-wise-green/5 px-4 py-1.5 rounded-full border border-wise-green/10 self-start md:self-center">
              {period}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {location && (
            <div className="flex items-center gap-2.5 bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100/50">
              <MapPin className="size-3.5 text-gray-400" />
              <span className="text-[12px] font-bold text-gray-600">
                {location}
              </span>
            </div>
          )}
          {industry && (
            <div className="flex items-center gap-2.5 bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100/50">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Industry
              </span>
              <span className="text-[12px] font-bold text-gray-600">
                {industry}
              </span>
            </div>
          )}
        </div>

        {description && (
          <p className="text-[14px] font-medium text-gray-500 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {badges.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[11px] font-bold text-gray-500 uppercase tracking-wider"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
