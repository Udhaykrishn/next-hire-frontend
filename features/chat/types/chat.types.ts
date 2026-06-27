export interface ChatMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  is_viewed: boolean;
  created_at: string;
  message_type: "text" | "image" | "document";
  file_url: string | null;
  file_name: string | null;
  file_size: number | null;
  file_key: string | null;
}

export interface ChatInboxItem {
  otherUserId: string;
  otherUserName: string;
  otherUserRole: "CANDIDATE" | "RECRUITER";
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface ChatUploadResponse {
  key: string;
  url: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

export interface SendMessagePayload {
  receiverId: string;
  message: string;
  messageType?: "text" | "image" | "document";
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  fileKey?: string | null;
}

export interface AppNotification {
  id: string;
  recipient_id: string;
  title: string;
  message: string;
  is_read: boolean;
  type: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}
