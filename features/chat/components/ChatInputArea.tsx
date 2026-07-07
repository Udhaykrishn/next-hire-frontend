"use client";

import { Send, Paperclip, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputAreaProps {
  messageText: string;
  setMessageText: (text: string) => void;
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  isPending: boolean;
  isError: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function ChatInputArea({
  messageText,
  setMessageText,
  handleSend,
  handleKeyDown,
  handleFileChange,
  isUploading,
  isPending,
  isError,
  fileInputRef,
}: ChatInputAreaProps) {
  return (
    <div className="border-t border-gray-200 bg-white p-6 shrink-0">
      <div className="flex items-center gap-3">
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
          disabled={isUploading || isPending || isError}
          onClick={() => fileInputRef.current?.click()}
          className="h-14 w-14 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors shrink-0"
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
          disabled={isPending || isError}
          className="flex-1 max-h-32 min-h-[56px] h-14 bg-gray-50/50 border border-gray-200 rounded-xl px-5 py-4 text-[14px] font-medium placeholder:text-gray-400 resize-none outline-none focus:bg-white focus:ring-2 focus:ring-wise-green/20 focus:border-wise-green/30 transition-all scrollbar-thin"
        />

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!messageText.trim() || isPending || isError}
          className="h-14 w-14 rounded-xl bg-[#258265] text-white hover:bg-[#1f6e55] shadow-sm shadow-wise-green/20 shrink-0 transition-all"
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
