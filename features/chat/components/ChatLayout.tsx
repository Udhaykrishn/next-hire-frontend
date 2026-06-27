"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import {
  Send,
  Paperclip,
  FileText,
  Download,
  Loader2,
  Check,
  CheckCheck,
  MessageSquare,
  Search,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  useChatInboxQuery,
  useChatHistoryQuery,
  useSendMessageMutation,
  useMarkChatReadMutation,
  useUploadChatFileMutation,
  useSocketSync,
} from "../hooks/use-chat";
import type { ChatInboxItem, ChatMessage } from "../types/chat.types";
import { CandidateChatInterviews } from "@/features/interview/components/candidate-chat-interviews";

interface ChatLayoutProps {
  currentUserId: string;
  currentUserRole: "CANDIDATE" | "RECRUITER" | "ADMIN";
  initialSelectedUserId?: string | null;
  initialSelectedUserName?: string | null;
}

export function ChatLayout({
  currentUserId,
  currentUserRole: _currentUserRole,
  initialSelectedUserId = null,
  initialSelectedUserName = null,
}: ChatLayoutProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    initialSelectedUserId,
  );
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [, startTransition] = useTransition();

  // 1. Fetch Inbox & Chat History
  const { data: inbox = [], isLoading: isInboxLoading } = useChatInboxQuery();
  const {
    data: messages = [],
    isLoading: isHistoryLoading,
    isError,
  } = useChatHistoryQuery(selectedUserId || "");

  // 2. Real-time Websocket syncing
  useSocketSync(currentUserId, selectedUserId || undefined);

  // 3. Mutations
  const sendMessageMutation = useSendMessageMutation(selectedUserId || "");
  const markReadMutation = useMarkChatReadMutation();
  const uploadFileMutation = useUploadChatFileMutation();

  // 4. Mark read on selected chat change
  useEffect(() => {
    if (selectedUserId) {
      markReadMutation.mutate(selectedUserId);
    }
  }, [selectedUserId, markReadMutation]);

  // 5. Scroll to bottom
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!messageText.trim() || !selectedUserId || sendMessageMutation.isPending)
      return;

    sendMessageMutation.mutate({
      receiverId: selectedUserId,
      message: messageText,
      messageType: "text",
    });
    setMessageText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedUserId) return;

    const file = files[0];
    setIsUploading(true);
    try {
      const uploadRes = await uploadFileMutation.mutateAsync(file);

      const isImage = file.type.startsWith("image/");
      sendMessageMutation.mutate({
        receiverId: selectedUserId,
        message: `Sent a ${isImage ? "photo" : "document"}: ${file.name}`,
        messageType: isImage ? "image" : "document",
        fileUrl: uploadRes.url,
        fileName: uploadRes.fileName,
        fileSize: uploadRes.fileSize,
        fileKey: uploadRes.key,
      });
    } catch (err) {
      console.error("File upload failed", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const formatTime = (timeStr: string): string => {
    try {
      const date = new Date(timeStr);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
  };

  const filteredInbox = inbox.filter((item) =>
    item.otherUserName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Fall back to a synthetic thread when the selected user isn't in the inbox
  // yet (e.g. candidate arriving from a job's "Chat with Recruiter" link before
  // any message exists). This renders the compose pane so the conversation can
  // actually be started.
  const activeChat: ChatInboxItem | undefined = selectedUserId
    ? (inbox.find((item) => item.otherUserId === selectedUserId) ?? {
        otherUserId: selectedUserId,
        otherUserName:
          initialSelectedUserName ||
          (_currentUserRole === "CANDIDATE" ? "Recruiter" : "Candidate"),
        otherUserRole:
          _currentUserRole === "CANDIDATE" ? "RECRUITER" : "CANDIDATE",
        lastMessage: "",
        lastMessageTime: "",
        unreadCount: 0,
      })
    : undefined;

  return (
    <div className="flex h-[80vh] min-h-[500px] w-full overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-2xl shadow-wise-green/5">
      {/* Conversations Sidebar */}
      <div
        className={`flex w-full flex-col border-r border-gray-50 bg-gray-50/30 md:w-80 lg:w-96 ${
          selectedUserId ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Sidebar Search */}
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
              className="h-12 border-gray-100 bg-white pl-11 pr-4 rounded-xl text-sm font-medium focus:ring-wise-green/10"
            />
          </div>
        </div>

        {/* Conversations List */}
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
              <p className="text-sm font-black text-gray-800">
                No conversations
              </p>
              <p className="text-xs font-medium text-gray-400 mt-1">
                {_currentUserRole === "RECRUITER"
                  ? "Shortlisted candidates will appear here once chat is active."
                  : "Once a recruiter shortlists you, your conversation will appear here."}
              </p>
            </div>
          ) : (
            filteredInbox.map((item: ChatInboxItem) => {
              const isSelected = item.otherUserId === selectedUserId;
              return (
                <button
                  key={item.otherUserId}
                  type="button"
                  onClick={() => setSelectedUserId(item.otherUserId)}
                  className={`group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all ${
                    isSelected
                      ? "bg-[#258265] text-white shadow-lg shadow-wise-green/20"
                      : "hover:bg-gray-50 text-gray-900"
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

      {/* Main Chat Workspace */}
      <div
        className={`flex flex-1 flex-col ${!selectedUserId ? "hidden md:flex" : "flex"}`}
      >
        {selectedUserId && activeChat ? (
          <>
            {/* Chat Header */}
            <div className="flex h-18 items-center justify-between border-b border-gray-50 bg-white px-6 shrink-0">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedUserId(null)}
                  className="md:hidden h-10 w-10 text-gray-500 hover:bg-gray-50 shrink-0"
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

            {/* Candidate: confirm/decline scheduled interview times inline */}
            {_currentUserRole === "CANDIDATE" && <CandidateChatInterviews />}

            {/* Messages list */}
            <div className="flex-1 overflow-y-auto bg-gray-50/40 p-6 space-y-4 scrollbar-thin">
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
                    Real-time messaging has been disabled by the recruiter for
                    this position.
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
                          className={`max-w-[70%] rounded-2xl p-4 shadow-sm relative overflow-hidden ${
                            isOutgoing
                              ? "bg-[#258265] text-white rounded-br-none"
                              : "bg-white text-gray-900 border border-gray-100 rounded-bl-none"
                          }`}
                        >
                          {/* Rendering Attachments */}
                          {message.message_type === "image" &&
                            message.file_url && (
                              <div className="mb-2 max-w-sm overflow-hidden rounded-lg border border-black/5 bg-gray-50/20">
                                <img
                                  src={message.file_url}
                                  alt="Chat upload"
                                  className="max-h-60 w-full object-cover"
                                />
                              </div>
                            )}

                          {message.message_type === "document" &&
                            message.file_url && (
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
                                    isOutgoing
                                      ? "hover:bg-white/15"
                                      : "hover:bg-gray-100"
                                  }`}
                                >
                                  <Download className="h-4 w-4" />
                                </a>
                              </div>
                            )}

                          {/* Message Text content */}
                          <p className="text-xs font-semibold leading-relaxed whitespace-pre-wrap break-words">
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

            {/* Chat Input panel */}
            <div className="border-t border-gray-50 bg-white p-4 shrink-0">
              <div className="flex items-center gap-2">
                {/* Attachment Picker */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.webp,.gif,.pdf,.doc,.docx,.xlsx,.txt"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  disabled={
                    isUploading || sendMessageMutation.isPending || isError
                  }
                  onClick={() => fileInputRef.current?.click()}
                  className="h-12 w-12 rounded-xl border border-gray-100 text-gray-500 hover:bg-gray-50"
                >
                  {isUploading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-wise-green" />
                  ) : (
                    <Paperclip className="h-5 w-5" />
                  )}
                </Button>

                {/* Message Textarea Input */}
                <textarea
                  placeholder={
                    isError
                      ? "Chat has been disabled for this position..."
                      : "Write your message..."
                  }
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={sendMessageMutation.isPending || isError}
                  className="flex-1 max-h-24 min-h-[48px] h-12 border border-gray-100 rounded-xl px-4 py-3.5 text-xs font-bold placeholder:text-gray-400 resize-none outline-none focus:ring-1 focus:ring-wise-green/30"
                />

                {/* Send Button */}
                <Button
                  onClick={handleSend}
                  disabled={
                    !messageText.trim() ||
                    sendMessageMutation.isPending ||
                    isError
                  }
                  className="h-12 w-12 rounded-xl bg-[#258265] text-white hover:bg-[#258265]/90 shrink-0"
                >
                  {sendMessageMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* No Conversation Selected Splash */
          <div className="flex flex-1 flex-col items-center justify-center bg-gray-50/20 p-8 text-center">
            <div className="mb-6 rounded-full bg-wise-green/10 p-6 text-wise-green">
              <MessageSquare className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              Your Inbox
            </h3>
            <p className="text-sm font-medium text-gray-500 max-w-sm mt-2 leading-relaxed">
              Choose a conversation from the sidebar to view documents, share
              details, and chat in real-time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
