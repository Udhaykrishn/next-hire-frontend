"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  MessageSquare,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import {
  useNotificationsQuery,
  useUnreadNotificationsCountQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "../hooks/use-chat";
import type { AppNotification } from "../types/chat.types";

interface NotificationCenterProps {
  userRole: "CANDIDATE" | "RECRUITER";
}

export function NotificationCenter({ userRole }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { data: notifications = [] } = useNotificationsQuery();
  const { data: unreadCount = 0 } = useUnreadNotificationsCountQuery();
  const markAllReadMutation = useMarkAllNotificationsReadMutation();
  const markReadMutation = useMarkNotificationReadMutation();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = async (notif: AppNotification) => {
    if (!notif.is_read) {
      await markReadMutation.mutateAsync(notif.id);
    }
    setIsOpen(false);

    // Route if it's a chat notification
    if (notif.type === "chat" && notif.metadata?.senderId) {
      const targetPath = userRole === "RECRUITER" ? "/recruiter/chat" : "/chat";
      router.push(`${targetPath}?userId=${notif.metadata.senderId}`);
    } else {
      // Other notifications, route to applications list
      const targetPath =
        userRole === "RECRUITER" ? "/recruiter/applications" : "/jobs/status";
      router.push(targetPath);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageSquare className="h-4.5 w-4.5 text-blue-500" />;
      case "shortlist":
        return <Sparkles className="h-4.5 w-4.5 text-amber-500" />;
      case "reject":
        return <AlertTriangle className="h-4.5 w-4.5 text-rose-500" />;
      case "hired":
        return <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />;
      default:
        return <Bell className="h-4.5 w-4.5 text-gray-500" />;
    }
  };

  const accentColor = userRole === "RECRUITER" ? "bg-coral" : "bg-[#258265]";
  const hoverAccentBg =
    userRole === "RECRUITER" ? "hover:bg-coral/10" : "hover:bg-[#258265]/10";
  const textAccentColor =
    userRole === "RECRUITER" ? "text-coral" : "text-[#258265]";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200/80 bg-white text-gray-500 transition-colors hover:text-gray-900 ${
          isOpen ? "border-gray-300 bg-gray-50/50" : ""
        }`}
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <span
            className={`absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white ${accentColor}`}
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 origin-top-right rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
            <span className="text-sm font-black text-gray-900">
              Notifications
            </span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => markAllReadMutation.mutate()}
                className={`text-[11px] font-black uppercase tracking-wider ${textAccentColor} ${hoverAccentBg} px-2.5 py-1.5 rounded-lg transition-colors`}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[350px] overflow-y-auto divide-y divide-gray-50 scrollbar-thin">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-5 text-center">
                <Bell className="h-8 w-8 text-gray-300 mb-3" />
                <p className="text-xs font-black text-gray-800">
                  All caught up!
                </p>
                <p className="text-[10px] font-medium text-gray-400 mt-0.5">
                  You have no new notifications.
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <button
                  key={notif.id}
                  type="button"
                  onClick={() => handleNotificationClick(notif)}
                  className={`flex w-full items-start gap-3.5 px-5 py-4 text-left transition-colors hover:bg-gray-50/70 ${
                    !notif.is_read ? "bg-gray-50/30" : ""
                  }`}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 border border-gray-100">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-xs font-black truncate leading-tight ${!notif.is_read ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {notif.title}
                      </p>
                      {!notif.is_read && (
                        <span
                          className={`h-2 w-2 rounded-full mt-1 shrink-0 ${accentColor}`}
                        />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium mt-1 leading-normal line-clamp-2">
                      {notif.message}
                    </p>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-2.5 block">
                      {formatDistanceToNow(new Date(notif.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
