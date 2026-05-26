"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const recentActivities = [
  {
    id: 1,
    user: "Tech Solutions Inc.",
    action: "Posted new job: Senior React Dev",
    time: "2 mins ago",
    type: "job",
  },
  {
    id: 2,
    user: "Rahul Sharma",
    action: "Upgraded to Professional Plan",
    time: "15 mins ago",
    type: "billing",
  },
  {
    id: 3,
    user: "Global Systems",
    action: "Verified company profile",
    time: "1 hour ago",
    type: "verification",
  },
  {
    id: 4,
    user: "Priya Patel",
    action: "Applied for UI/UX Designer at Meta",
    time: "2 hours ago",
    type: "application",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-near-black tracking-tight">
            Admin Overview
          </h1>
          <p className="text-gray-500 font-medium">
            Welcome back, here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
          >
            Download Report
          </button>
          <button className="px-5 py-2.5 bg-near-black text-white rounded-xl text-sm font-black hover:bg-wise-green hover:text-near-black transition-all shadow-lg shadow-near-black/10">
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mock Chart Section */}
        <div className="lg:col-span-2 p-8 bg-white rounded-3xl border border-gray-50 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-near-black tracking-tight">
                Platform Growth
              </h3>
              <p className="text-sm text-gray-400 font-medium italic">
                Monthly user registration & revenue
              </p>
            </div>
            <select className="bg-gray-50 border-none text-xs font-black p-2 rounded-lg focus:ring-0">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
            </select>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 pt-4">
            {[40, 60, 45, 90, 65, 85, 40, 75, 95, 60, 80, 70].map(
              (height, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-3 group"
                >
                  <div className="w-full relative">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: i * 0.05 }}
                      className={cn(
                        "w-full rounded-t-xl transition-all duration-300 group-hover:opacity-80",
                        i % 3 === 0 ? "bg-wise-green" : "bg-near-black",
                      )}
                    />
                  </div>
                  <span className="text-[10px] font-black text-gray-300 uppercase">
                    {
                      [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ][i]
                    }
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="p-8 bg-near-black rounded-3xl shadow-2xl shadow-near-black/20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-wise-green/10 rounded-full blur-3xl" />
          <h3 className="text-xl font-black mb-6 relative z-10">Live Feed</h3>
          <div className="space-y-6 relative z-10">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 group cursor-pointer"
              >
                <div className="w-1.5 h-10 rounded-full bg-wise-green/20 group-hover:bg-wise-green transition-colors" />
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-wise-green transition-colors">
                    {activity.user}
                  </p>
                  <p className="text-[11px] text-gray-400 font-medium mb-1">
                    {activity.action}
                  </p>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/10"
          >
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
