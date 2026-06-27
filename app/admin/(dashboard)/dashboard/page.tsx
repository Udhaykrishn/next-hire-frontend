"use client";

import {
  Briefcase,
  Download,
  TrendingUp,
  UserSquare2,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import {
  AdminPageHeader,
  AdminPrimaryButton,
  StatCard,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Active candidates",
    value: "2.4M",
    hint: "+12% this month",
    icon: <UserSquare2 className="h-4 w-4" />,
    tone: "coral" as const,
  },
  {
    label: "Hiring companies",
    value: "10.2k",
    hint: "+340 new",
    icon: <Users className="h-4 w-4" />,
    tone: "ink" as const,
  },
  {
    label: "Live job posts",
    value: "48.9k",
    hint: "+5% this week",
    icon: <Briefcase className="h-4 w-4" />,
    tone: "teal" as const,
  },
  {
    label: "Monthly revenue",
    value: "$182k",
    hint: "+18% vs last month",
    icon: <TrendingUp className="h-4 w-4" />,
    tone: "amber" as const,
  },
];

const chart = [
  { month: "Jan", height: 40 },
  { month: "Feb", height: 60 },
  { month: "Mar", height: 45 },
  { month: "Apr", height: 90 },
  { month: "May", height: 65 },
  { month: "Jun", height: 85 },
  { month: "Jul", height: 50 },
  { month: "Aug", height: 75 },
  { month: "Sep", height: 95 },
  { month: "Oct", height: 60 },
  { month: "Nov", height: 80 },
  { month: "Dec", height: 70 },
];

const recentActivities = [
  {
    id: 1,
    user: "Tech Solutions Inc.",
    action: "Posted new job: Senior React Dev",
    time: "2 mins ago",
  },
  {
    id: 2,
    user: "Rahul Sharma",
    action: "Upgraded to Professional plan",
    time: "15 mins ago",
  },
  {
    id: 3,
    user: "Global Systems",
    action: "Verified company profile",
    time: "1 hour ago",
  },
  {
    id: 4,
    user: "Priya Patel",
    action: "Applied for UI/UX Designer at Meta",
    time: "2 hours ago",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Overview"
        description="A snapshot of platform health, growth, and the latest marketplace activity."
        actions={
          <AdminPrimaryButton>
            <Download className="h-4 w-4" /> Export data
          </AdminPrimaryButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Growth chart */}
        <div className="rounded-xl border border-hairline bg-white p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-ink">
                Platform growth
              </h3>
              <p className="mt-0.5 text-[13px] text-muted-ink">
                Monthly registrations &amp; revenue
              </p>
            </div>
            <select className="rounded-lg border border-hairline bg-white px-3 py-1.5 text-xs font-medium text-body focus:outline-none focus:ring-2 focus:ring-coral/20">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
            </select>
          </div>
          <div className="flex h-60 items-end justify-between gap-2 pt-2">
            {chart.map(({ month, height }, i) => (
              <div
                key={month}
                className="group flex flex-1 flex-col items-center gap-3"
              >
                <div className="flex h-full w-full items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.04,
                      ease: "easeOut",
                    }}
                    className={cn(
                      "w-full rounded-t-md transition-colors",
                      i % 3 === 0
                        ? "bg-coral/80 group-hover:bg-coral"
                        : "bg-surface-cream-strong group-hover:bg-navy/30",
                    )}
                  />
                </div>
                <span className="text-[11px] font-medium text-muted-soft">
                  {month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live feed (navy) */}
        <div className="overflow-hidden rounded-xl bg-navy p-6 text-on-dark">
          <h3 className="text-base font-semibold">Live feed</h3>
          <div className="mt-5 space-y-4">
            {recentActivities.map((a) => (
              <div key={a.id} className="group flex gap-3">
                <span className="mt-0.5 h-8 w-0.5 shrink-0 rounded-full bg-coral/40 transition-colors group-hover:bg-coral" />
                <div>
                  <p className="text-sm font-medium">{a.user}</p>
                  <p className="text-[13px] text-on-dark-soft">{a.action}</p>
                  <span className="text-[11px] text-on-dark-soft/60">
                    {a.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-lg border border-white/10 bg-white/[0.05] py-2.5 text-[13px] font-medium text-on-dark transition-colors hover:bg-white/[0.1]"
          >
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
}
