"use client";

import { Bell, Server, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const settingGroups = [
  {
    title: "Platform Security",
    icon: Shield,
    settings: [
      {
        name: "Two-Factor Authentication",
        desc: "Add an extra layer of security to admin accounts.",
        enabled: true,
      },
      {
        name: "IP Whitelisting",
        desc: "Restrict admin access to specific IP addresses.",
        enabled: false,
      },
    ],
  },
  {
    title: "Email & Notifications",
    icon: Bell,
    settings: [
      {
        name: "New Recruiter Alert",
        desc: "Notify admins when a new company registers.",
        enabled: true,
      },
      {
        name: "Subscription Renewals",
        desc: "Send automated reports for upcoming renewals.",
        enabled: true,
      },
    ],
  },
  {
    title: "System Configuration",
    icon: Server,
    settings: [
      {
        name: "Maintenance Mode",
        desc: "Put the platform in read-only mode for updates.",
        enabled: false,
      },
      {
        name: "Verbose Logging",
        desc: "Enable detailed system logs for troubleshooting.",
        enabled: true,
      },
    ],
  },
];

export default function AdminSettings() {
  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black text-near-black tracking-tight">
          System Settings
        </h1>
        <p className="text-gray-500 font-medium">
          Manage global platform configurations and security protocols.
        </p>
      </div>

      <div className="space-y-8">
        {settingGroups.map((group) => (
          <div
            key={group.title}
            className="bg-white rounded-[32px] border border-gray-50 shadow-sm overflow-hidden"
          >
            <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                <group.icon className="w-5 h-5 text-gray-400" />
              </div>
              <h2 className="text-lg font-black text-near-black tracking-tight">
                {group.title}
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {group.settings.map((setting) => (
                <div
                  key={setting.name}
                  className="px-8 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div>
                    <h3 className="text-sm font-black text-near-black mb-1">
                      {setting.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {setting.desc}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={setting.enabled}
                    aria-label={`Toggle ${setting.name}`}
                    className={cn(
                      "w-12 h-6 rounded-full relative transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-wise-green focus-visible:ring-offset-2",
                      setting.enabled
                        ? "bg-wise-green shadow-inner"
                        : "bg-gray-200",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm",
                        setting.enabled ? "right-1" : "left-1",
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          className="px-6 py-3 text-sm font-black text-gray-400 hover:text-near-black transition-colors"
        >
          Discard Changes
        </button>
        <button
          type="button"
          className="px-8 py-3 bg-near-black text-white rounded-2xl text-sm font-black hover:bg-wise-green hover:text-near-black transition-all shadow-xl shadow-near-black/10"
        >
          Save Configurations
        </button>
      </div>
    </div>
  );
}
