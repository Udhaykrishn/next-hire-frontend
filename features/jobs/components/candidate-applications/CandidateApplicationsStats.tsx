import { Award, Briefcase, FileText, PlayCircle } from "lucide-react";
import { motion } from "motion/react";

interface CandidateApplicationsStatsProps {
  statsData: {
    total: number;
    reviewing: number;
    interviews: number;
    offers: number;
  };
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export function CandidateApplicationsStats({
  statsData,
  statusFilter,
  setStatusFilter,
}: CandidateApplicationsStatsProps) {
  const stats = [
    {
      id: "ALL",
      label: "Total Apps",
      value: statsData.total,
      activeColor:
        "bg-gray-900 text-white shadow-lg shadow-gray-900/20 border-transparent ring-1 ring-gray-900/5",
      inactiveColor:
        "bg-white text-gray-500 border border-gray-200/60 hover:border-gray-300 hover:shadow-sm hover:text-gray-900",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: "REVIEWING",
      label: "In Review",
      value: statsData.reviewing,
      activeColor:
        "bg-blue-600 text-white shadow-lg shadow-blue-600/20 border-transparent ring-1 ring-blue-600/5",
      inactiveColor:
        "bg-white text-gray-500 border border-gray-200/60 hover:border-blue-200 hover:shadow-sm hover:text-blue-600",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "INTERVIEWS",
      label: "Interviews",
      value: statsData.interviews,
      activeColor:
        "bg-wise-green text-dark-green shadow-lg shadow-wise-green/20 border-transparent ring-1 ring-wise-green/5",
      inactiveColor:
        "bg-white text-gray-500 border border-gray-200/60 hover:border-wise-green/50 hover:shadow-sm hover:text-dark-green",
      icon: <PlayCircle className="w-4 h-4" />,
    },
    {
      id: "OFFERS",
      label: "Offers",
      value: statsData.offers,
      activeColor:
        "bg-yellow-500 text-yellow-950 shadow-lg shadow-yellow-500/20 border-transparent ring-1 ring-yellow-500/5",
      inactiveColor:
        "bg-white text-gray-500 border border-gray-200/60 hover:border-yellow-300 hover:shadow-sm hover:text-yellow-600",
      icon: <Award className="w-4 h-4" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, i) => {
        const isActive = statusFilter === stat.id;
        return (
          <motion.button
            type="button"
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" }}
            onClick={() => setStatusFilter(stat.id)}
            className={`
              relative p-4 md:p-5 rounded-2xl flex flex-col justify-between h-[100px] md:h-[110px] transition-all duration-300 ease-out text-left outline-none
              focus-visible:ring-2 focus-visible:ring-wise-green focus-visible:ring-offset-1
              ${isActive ? stat.activeColor : stat.inactiveColor}
              overflow-hidden group
            `}
          >
            {/* Subtle background glow effect for active state */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            )}

            <div className="flex items-center justify-between w-full relative z-10">
              <p
                className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? "opacity-90" : "opacity-70 group-hover:opacity-100 transition-opacity"}`}
              >
                {stat.label}
              </p>
              <div
                className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
              >
                {stat.icon}
              </div>
            </div>

            <p className="text-[28px] md:text-[32px] font-black leading-none tracking-tight relative z-10">
              {stat.value}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
