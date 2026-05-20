"use client";

import {
  Building,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  Filter,
  MessageSquare,
  MoreVertical,
  Search,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNavbar } from "@/components/landing-navbar";

export default function JobStatusPage() {
  const applications = [
    {
      id: 1,
      role: "Senior Frontend Engineer",
      company: "Google",
      location: "Mountain View, CA",
      date: "Oct 24, 2023",
      status: "In Review",
      color: "text-blue-500 bg-blue-50",
      icon: <Clock className="w-4 h-4" />,
      matchScore: 94,
      salary: "$140k - $180k",
    },
    {
      id: 2,
      role: "Product Designer",
      company: "Linear",
      location: "Remote",
      date: "Oct 22, 2023",
      status: "Interviewing",
      color: "text-wise-green bg-wise-green/10",
      icon: <MessageSquare className="w-4 h-4" />,
      matchScore: 89,
      salary: "$120k - $160k",
    },
    {
      id: 3,
      role: "Full Stack Developer",
      company: "Vercel",
      location: "San Francisco, CA",
      date: "Oct 18, 2023",
      status: "Applied",
      color: "text-gray-500 bg-gray-50",
      icon: <CheckCircle2 className="w-4 h-4" />,
      matchScore: 82,
      salary: "$150k - $200k",
    },
    {
      id: 4,
      role: "UI Engineer",
      company: "Meta",
      location: "Menlo Park, CA",
      date: "Oct 12, 2023",
      status: "Closed",
      color: "text-red-500 bg-red-50",
      icon: <XCircle className="w-4 h-4" />,
      matchScore: 78,
      salary: "$160k - $220k",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      <LandingNavbar />

      <main className="flex-1 pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <header className="mb-12">
          <h1 className="text-[32px] font-black text-gray-900 leading-[40px] mb-2">
            My Applications
          </h1>
          <p className="text-[15px] text-gray-500 font-medium">
            Track and manage your active job applications in one place.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total", value: 12, color: "bg-gray-900 text-white" },
            { label: "In Review", value: 4, color: "bg-white text-gray-900" },
            {
              label: "Interviews",
              value: 2,
              color: "bg-wise-green text-dark-green",
            },
            { label: "Offers", value: 1, color: "bg-white text-gray-900" },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-8 rounded-[2.5rem] border border-gray-100 shadow-sm ${stat.color}`}
            >
              <p className="text-[12px] font-black uppercase tracking-widest opacity-60 mb-2">
                {stat.label}
              </p>
              <p className="text-[32px] font-black leading-none">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-wise-green transition-colors" />
            <input
              type="text"
              placeholder="Filter by company or role..."
              className="w-full h-12 pl-12 pr-4 bg-white border border-gray-100 rounded-2xl text-[14px] font-medium focus:ring-2 focus:ring-wise-green/20 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none h-12 px-6 bg-white border border-gray-100 rounded-2xl text-[14px] font-black flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="flex-1 md:flex-none h-12 px-6 bg-gray-900 text-white rounded-2xl text-[14px] font-black hover:bg-gray-800 transition-colors shadow-sm">
              Refresh Status
            </button>
          </div>
        </div>

        {/* Application List */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-8 py-6 text-[12px] font-black text-gray-400 uppercase tracking-widest">
                    Company & Role
                  </th>
                  <th className="px-8 py-6 text-[12px] font-black text-gray-400 uppercase tracking-widest">
                    Date Applied
                  </th>
                  <th className="px-8 py-6 text-[12px] font-black text-gray-400 uppercase tracking-widest">
                    Salary
                  </th>
                  <th className="px-8 py-6 text-[12px] font-black text-gray-400 uppercase tracking-widest">
                    Match Score
                  </th>
                  <th className="px-8 py-6 text-[12px] font-black text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {applications.map((app) => (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center font-black text-gray-400 border border-gray-100 group-hover:bg-wise-green/10 group-hover:text-wise-green transition-colors">
                          {app.company[0]}
                        </div>
                        <div>
                          <h4 className="text-[15px] font-black text-gray-900 leading-tight">
                            {app.role}
                          </h4>
                          <p className="text-[13px] font-bold text-gray-500 flex items-center gap-1">
                            <Building className="w-3 h-3" /> {app.company}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[14px] font-bold text-gray-500">
                      {app.date}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1.5 text-[14px] font-bold text-gray-900">
                        <DollarSign className="w-3.5 h-3.5 text-wise-green" />{" "}
                        {app.salary}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black shadow-sm ${
                            app.matchScore >= 90
                              ? "bg-wise-green text-dark-green shadow-wise-green/20"
                              : app.matchScore >= 80
                                ? "bg-gray-900 text-white shadow-black/10"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Zap
                            className={`w-3 h-3 ${app.matchScore >= 80 ? "fill-current" : ""}`}
                          />{" "}
                          {app.matchScore}% Match
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-black uppercase tracking-wider ${app.color}`}
                      >
                        {app.icon}
                        {app.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-gray-200">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-wise-green transition-all group-hover:translate-x-1" />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
