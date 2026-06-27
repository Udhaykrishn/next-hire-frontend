import { apiClient } from "@/lib/api-client";
import type {
  ChatMessage,
  ChatInboxItem,
  ChatUploadResponse,
  SendMessagePayload,
  AppNotification,
} from "../types/chat.types";

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  statusCode?: number;
}

export const chatService = {
  getHistory: async (otherUserId: string): Promise<ChatMessage[]> => {
    const res = (await apiClient.get(
      `/chats/history?otherUserId=${otherUserId}`,
    )) as ApiResponse<ChatMessage[]>;
    return res.data;
  },

  getInbox: async (): Promise<ChatInboxItem[]> => {
    const res = (await apiClient.get("/chats/inbox")) as ApiResponse<
      ChatInboxItem[]
    >;
    return res.data;
  },

  sendMessage: async (payload: SendMessagePayload): Promise<ChatMessage> => {
    const res = (await apiClient.post(
      "/chats/send",
      payload,
    )) as ApiResponse<ChatMessage>;
    return res.data;
  },

  markAsRead: async (senderId: string): Promise<{ success: boolean }> => {
    const res = (await apiClient.patch(
      `/chats/mark-read/${senderId}`,
    )) as ApiResponse<{ success: boolean }>;
    return res.data;
  },

  uploadFile: async (file: File): Promise<ChatUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = (await apiClient.post("/chats/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })) as ApiResponse<ChatUploadResponse>;
    return res.data;
  },

  getNotifications: async (): Promise<AppNotification[]> => {
    const res = (await apiClient.get("/notifications")) as ApiResponse<
      AppNotification[]
    >;
    return res.data;
  },

  getUnreadNotificationsCount: async (): Promise<number> => {
    const res = (await apiClient.get(
      "/notifications/unread-count",
    )) as ApiResponse<{ count: number }>;
    return res.data.count;
  },

  markAllNotificationsRead: async (): Promise<{ success: boolean }> => {
    const res = (await apiClient.patch(
      "/notifications/mark-all-read",
    )) as ApiResponse<{ success: boolean }>;
    return res.data;
  },

  markNotificationRead: async (id: string): Promise<{ success: boolean }> => {
    const res = (await apiClient.patch(
      `/notifications/mark-read/${id}`,
    )) as ApiResponse<{ success: boolean }>;
    return res.data;
  },
};
