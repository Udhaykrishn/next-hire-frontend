"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  AlertTriangle,
  FileText,
  Download,
  Check,
  CheckCheck,
} from "lucide-react";
import type { ChatMessage } from "../types/chat.types";
import { formatTime, formatFileSize } from "../utils/format";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isHistoryLoading: boolean;
  isError: boolean;
  currentUserId: string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatMessageList({
  messages,
  isHistoryLoading,
  isError,
  currentUserId,
  messagesEndRef,
}: ChatMessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-8 space-y-6 scrollbar-thin">
      {isHistoryLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-wise-green" />
        </div>
      ) : isError ? (
        <div className="flex h-full flex-col items-center justify-center p-6 text-center text-red-500">
          <div className="rounded-full bg-red-50 p-4 mb-3 text-red-500 inline-block">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <p className="text-sm font-black text-gray-800 font-display">
            Chat is Unavailable
          </p>
          <p className="text-xs font-semibold text-gray-400 mt-1 max-w-xs mx-auto leading-relaxed">
            Real-time messaging has been disabled by the recruiter for this
            position.
          </p>
        </div>
      ) : (
        <AnimatePresence initial={false}>
          {messages.map((message: ChatMessage) => {
            const isOutgoing =
              message.sender_id === currentUserId ||
              message.sender_id === "current";
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl p-4 relative overflow-hidden ${
                    isOutgoing
                      ? "bg-[#258265] text-white rounded-br-none shadow-sm"
                      : "bg-white text-gray-900 border border-gray-200 shadow-sm rounded-bl-none"
                  }`}
                >
                  {/* Rendering Attachments */}
                  {message.message_type === "image" && message.file_url && (
                    <div className="mb-2 max-w-sm overflow-hidden rounded-lg border border-black/5 bg-gray-50/20">
                      <img
                        src={message.file_url}
                        alt="Chat upload"
                        className="max-h-60 w-full object-cover"
                      />
                    </div>
                  )}

                  {message.message_type === "document" && message.file_url && (
                    <div
                      className={`mb-3 flex items-center justify-between gap-4 rounded-xl p-3 border ${
                        isOutgoing
                          ? "bg-white/10 border-white/20 text-white"
                          : "bg-gray-50 border-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="h-7 w-7 text-rose-500 shrink-0" />
                        <div className="min-w-0 leading-tight">
                          <p className="truncate text-xs font-black">
                            {message.file_name || "Document"}
                          </p>
                          <span className="text-[10px] opacity-75 font-bold">
                            {formatFileSize(message.file_size)}
                          </span>
                        </div>
                      </div>
                      <a
                        href={message.file_url}
                        download={message.file_name || "document"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1.5 rounded-lg shrink-0 ${
                          isOutgoing ? "hover:bg-white/15" : "hover:bg-gray-100"
                        }`}
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  )}

                  {/* Message Text content */}
                  <p className="text-[14px] font-medium leading-relaxed whitespace-pre-wrap break-words">
                    {message.message}
                  </p>

                  {/* Timestamp & viewed ticks */}
                  <div className="flex items-center justify-end gap-1 mt-1.5 leading-none">
                    <span
                      className={`text-[9px] font-bold ${
                        isOutgoing ? "text-white/70" : "text-gray-400"
                      }`}
                    >
                      {formatTime(message.created_at)}
                    </span>
                    {isOutgoing && (
                      <span className="shrink-0">
                        {message.is_viewed ? (
                          <CheckCheck className="h-3 w-3 text-emerald-300" />
                        ) : (
                          <Check className="h-3 w-3 text-white/50" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
