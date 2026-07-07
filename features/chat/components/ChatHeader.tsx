"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ChatInboxItem } from "../types/chat.types";

interface ChatHeaderProps {
  activeChat: ChatInboxItem;
  setSelectedUserId: (id: string | null) => void;
}

export function ChatHeader({ activeChat, setSelectedUserId }: ChatHeaderProps) {
  return (
    <div className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8 shrink-0">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedUserId(null)}
          className="lg:hidden h-10 w-10 text-gray-500 hover:bg-gray-50 shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10 border border-gray-100">
          <AvatarFallback className="bg-wise-green/10 text-dark-green font-bold">
            {activeChat.otherUserName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-black text-gray-900 leading-tight">
            {activeChat.otherUserName}
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider text-wise-green">
            {activeChat.otherUserRole}
          </span>
        </div>
      </div>
    </div>
  );
}
