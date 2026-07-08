"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";

import {
  useChatInboxQuery,
  useChatHistoryQuery,
  useSendMessageMutation,
  useMarkChatReadMutation,
  useUploadChatFileMutation,
  useSocketSync,
} from "../hooks/use-chat";
import type { ChatInboxItem } from "../types/chat.types";
import { CandidateChatInterviews } from "@/features/interview/components/candidate-chat-interviews";

import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInputArea } from "./ChatInputArea";

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
  }, [selectedUserId, markReadMutation.mutate]);

  // 5. Scroll to bottom
  useEffect(() => {
    if (messages.length > 0) {
      const parent = messagesEndRef.current?.parentElement;
      if (parent) {
        parent.scrollTo({ top: parent.scrollHeight, behavior: "smooth" });
      }
    }
  }, [messages]);

  // 6. Auto-select the first conversation if none is selected
  useEffect(() => {
    if (!selectedUserId && inbox.length > 0) {
      setSelectedUserId(inbox[0].otherUserId);
    }
  }, [selectedUserId, inbox]);

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
    <div className="relative flex h-[80vh] min-h-[500px] w-full overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-wise-green/5">
      {/* Conversations Sidebar Component */}
      <ChatSidebar
        inbox={inbox}
        isInboxLoading={isInboxLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        currentUserRole={_currentUserRole}
      />

      {/* Main Chat Workspace */}
      <div
        className={`flex flex-1 flex-col min-w-0 ${!selectedUserId ? "hidden lg:flex" : "flex"}`}
      >
        {selectedUserId && activeChat ? (
          <>
            {/* Header Component */}
            <div className="flex justify-between items-center border-b border-gray-50 bg-white pr-6">
              <div className="flex-1">
                <ChatHeader
                  activeChat={activeChat}
                  setSelectedUserId={setSelectedUserId}
                />
              </div>
            </div>

            {/* Inline Interviews Component */}
            {_currentUserRole === "CANDIDATE" && <CandidateChatInterviews />}

            {/* Messages List Component */}
            <ChatMessageList
              messages={messages}
              isHistoryLoading={isHistoryLoading}
              isError={isError}
              currentUserId={currentUserId}
              messagesEndRef={messagesEndRef}
            />

            {/* Chat Input Component */}
            <ChatInputArea
              messageText={messageText}
              setMessageText={setMessageText}
              handleSend={handleSend}
              handleKeyDown={handleKeyDown}
              handleFileChange={handleFileChange}
              isUploading={isUploading}
              isPending={sendMessageMutation.isPending}
              isError={isError}
              fileInputRef={fileInputRef}
            />
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
