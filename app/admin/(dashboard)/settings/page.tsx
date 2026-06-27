"use client";

import { Bell, Server, Shield } from "lucide-react";
import { useState } from "react";
import { AdminPageHeader, AdminPrimaryButton } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

type Setting = { name: string; desc: string; enabled: boolean };

const settingGroups: {
  title: string;
  icon: typeof Shield;
  settings: Setting[];
}[] = [
  {
    title: "Platform security",
    icon: Shield,
    settings: [
      {
        name: "Two-factor authentication",
        desc: "Add an extra layer of security to admin accounts.",
        enabled: true,
      },
      {
        name: "IP whitelisting",
        desc: "Restrict admin access to specific IP addresses.",
        enabled: false,
      },
    ],
  },
  {
    title: "Email & notifications",
    icon: Bell,
    settings: [
      {
        name: "New recruiter alert",
        desc: "Notify admins when a new company registers.",
        enabled: true,
      },
      {
        name: "Subscription renewals",
        desc: "Send automated reports for upcoming renewals.",
        enabled: true,
      },
    ],
  },
  {
    title: "System configuration",
    icon: Server,
    settings: [
      {
        name: "Maintenance mode",
        desc: "Put the platform in read-only mode for updates.",
        enabled: false,
      },
      {
        name: "Verbose logging",
        desc: "Enable detailed system logs for troubleshooting.",
        enabled: true,
      },
    ],
  },
];

function Toggle({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-coral/30",
        on ? "bg-coral" : "bg-surface-cream-strong",
      )}
    >
      <span
        className={cn(
          "absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all",
          on ? "left-6" : "left-1",
        )}
      />
    </button>
  );
}

export default function AdminSettings() {
  return (
    <div className="max-w-3xl space-y-6">
      <AdminPageHeader
        title="Settings"
        description="Manage global platform configuration, security, and notification rules."
      />

      <div className="space-y-5">
        {settingGroups.map((group) => (
          <div
            key={group.title}
            className="overflow-hidden rounded-xl border border-hairline bg-white"
          >
            <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-soft text-muted-ink">
                <group.icon className="h-[18px] w-[18px]" />
              </span>
              <h2 className="text-[15px] font-semibold text-ink">
                {group.title}
              </h2>
            </div>
            <div className="divide-y divide-hairline-soft">
              {group.settings.map((setting) => (
                <div
                  key={setting.name}
                  className="flex items-center justify-between gap-6 px-5 py-4"
                >
                  <div>
                    <h3 className="text-sm font-medium text-ink">
                      {setting.name}
                    </h3>
                    <p className="mt-0.5 text-[13px] text-muted-ink">
                      {setting.desc}
                    </p>
                  </div>
                  <Toggle defaultOn={setting.enabled} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="rounded-lg border border-hairline bg-white px-4 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-soft"
        >
          Discard changes
        </button>
        <AdminPrimaryButton>Save configuration</AdminPrimaryButton>
      </div>
    </div>
  );
}
