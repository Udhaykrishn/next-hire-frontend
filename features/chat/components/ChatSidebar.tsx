"use client";

import { useTransition } from "react";
import { Search, Loader2, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ChatInboxItem } from "../types/chat.types";
import { formatTime } from "../utils/format";

interface ChatSidebarProps {
  inbox: ChatInboxItem[];
  isInboxLoading: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
  currentUserRole: string;
}

export function ChatSidebar({
  inbox,
  isInboxLoading,
  searchQuery,
  setSearchQuery,
  selectedUserId,
  setSelectedUserId,
  currentUserRole,
}: ChatSidebarProps) {
  const [, startTransition] = useTransition();

  const filteredInbox = inbox.filter((item) =>
    item.otherUserName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className={`flex w-full flex-col border-r border-gray-200 bg-white lg:w-80 xl:w-96 shrink-0 ${
        selectedUserId ? "hidden lg:flex" : "flex"
      }`}
    >
      <div className="p-6">
        <h2 className="mb-4 font-display text-[22px] font-black text-gray-900 tracking-tight">
          Messages
        </h2>
        <div className="relative">
          <Search className="absolute top-3.5 left-4 h-4.5 w-4.5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) =>
              startTransition(() => setSearchQuery(e.target.value))
            }
            className="h-12 border-gray-200 bg-gray-50/50 pl-11 pr-4 rounded-xl text-sm font-medium focus:bg-white focus:ring-wise-green/20 focus:border-wise-green/30 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2 scrollbar-thin">
        {isInboxLoading ? (
          <div className="flex h-40 flex-col items-center justify-center gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-wise-green" />
            <p className="text-xs font-semibold text-gray-400">
              Loading chats...
            </p>
          </div>
        ) : filteredInbox.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center p-6 text-center">
            <MessageSquare className="mb-3 h-8 w-8 text-gray-300" />
            <p className="text-sm font-black text-gray-800">No conversations</p>
            <p className="text-xs font-medium text-gray-400 mt-1">
              {currentUserRole === "RECRUITER"
                ? "Shortlisted candidates will appear here once chat is active."
                : "Once a recruiter shortlists you, your conversation will appear here."}
            </p>
          </div>
        ) : (
          filteredInbox.map((item) => {
            const isSelected = item.otherUserId === selectedUserId;
            return (
              <button
                key={item.otherUserId}
                type="button"
                onClick={() => setSelectedUserId(item.otherUserId)}
                className={`group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all border ${
                  isSelected
                    ? "bg-[#258265] text-white border-[#258265] shadow-md shadow-wise-green/10"
                    : "border-transparent hover:bg-gray-50 hover:border-gray-100 text-gray-900"
                }`}
              >
                <Avatar className="h-12 w-12 border-2 border-white/50 shrink-0">
                  <AvatarFallback
                    className={
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-wise-green/10 text-dark-green"
                    }
                  >
                    {item.otherUserName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate text-sm font-black tracking-tight leading-tight">
                      {item.otherUserName}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase shrink-0 tracking-wider ${
                        isSelected ? "text-white/70" : "text-gray-400"
                      }`}
                    >
                      {item.lastMessageTime
                        ? formatTime(item.lastMessageTime)
                        : ""}
                    </span>
                  </div>

                  <div
                    className={`text-[10px] font-black uppercase tracking-wider mt-0.5 ${
                      isSelected ? "text-white/80" : "text-wise-green"
                    }`}
                  >
                    {item.otherUserRole}
                  </div>

                  <p
                    className={`truncate text-xs font-medium mt-1.5 leading-snug ${
                      isSelected ? "text-white/90" : "text-gray-500"
                    }`}
                  >
                    {item.lastMessage}
                  </p>
                </div>

                {item.unreadCount > 0 && !isSelected && (
                  <span className="flex h-5.5 min-w-[22px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-black text-white shrink-0 animate-pulse">
                    {item.unreadCount}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
