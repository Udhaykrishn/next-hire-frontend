import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardMetrics } from "../services/dashboard.api";

export function ChartsSection({
  applicationsTrendData,
  hiringFunnelData,
  timeFilter,
}: {
  applicationsTrendData: DashboardMetrics["applicationsTrendData"];
  hiringFunnelData: DashboardMetrics["hiringFunnelData"];
  timeFilter: string;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Applications Trend */}
      <div className="border border-gray-200 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[13px] font-black uppercase tracking-widest text-near-black">
            Applications Trend
          </h3>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            {timeFilter === "Today" ? "Today" : `This ${timeFilter}`}
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <AreaChart data={applicationsTrendData}>
              <defs>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#163300" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#163300" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6B7280", fontWeight: "bold" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6B7280", fontWeight: "bold" }}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0",
                  border: "1px solid #111827",
                  boxShadow: "4px 4px 0 rgba(17,24,39,0.1)",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              />
              <Area
                type="monotone"
                dataKey="applicants"
                stroke="#111827"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorApps)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hiring Funnel */}
      <div className="border border-gray-200 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[13px] font-black uppercase tracking-widest text-near-black">
            Hiring Funnel
          </h3>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            All Jobs
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart
              data={hiringFunnelData}
              layout="vertical"
              margin={{ left: 40 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#E5E7EB"
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6B7280", fontWeight: "bold" }}
              />
              <YAxis
                dataKey="stage"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#111827", fontWeight: "bold" }}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  borderRadius: "0",
                  border: "1px solid #111827",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              />
              <Bar dataKey="count" fill="#9fe870" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
