"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { chatService } from "../services/chat.api";
import { socketService } from "../services/socket.api";
import type {
  ChatMessage,
  ChatInboxItem,
  SendMessagePayload,
  AppNotification,
} from "../types/chat.types";

export const useChatInboxQuery = () => {
  return useQuery<ChatInboxItem[], Error>({
    queryKey: ["chat-inbox"],
    queryFn: () => chatService.getInbox(),
    refetchOnWindowFocus: false,
  });
};

export const useChatHistoryQuery = (otherUserId: string) => {
  return useQuery<ChatMessage[], Error>({
    queryKey: ["chat-history", otherUserId],
    queryFn: () => chatService.getHistory(otherUserId),
    enabled: !!otherUserId,
    refetchOnWindowFocus: false,
  });
};

export const useSendMessageMutation = (otherUserId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    ChatMessage,
    Error,
    SendMessagePayload,
    { previousHistory: ChatMessage[] | undefined }
  >({
    mutationFn: (payload) => chatService.sendMessage(payload),
    onMutate: async (newMessage) => {
      // Cancel outgoing history refetches
      await queryClient.cancelQueries({
        queryKey: ["chat-history", otherUserId],
      });

      // Snapshot the previous value
      const previousHistory = queryClient.getQueryData<ChatMessage[]>([
        "chat-history",
        otherUserId,
      ]);

      // Optimistically update to the new value
      if (previousHistory) {
        const optimisticMsg: ChatMessage = {
          id: `temp-${Date.now()}`,
          sender_id: "current", // temporary identifier, will be replaced by server
          receiver_id: newMessage.receiverId,
          message: newMessage.message,
          is_viewed: false,
          created_at: new Date().toISOString(),
          message_type: newMessage.messageType || "text",
          file_url: newMessage.fileUrl || null,
          file_name: newMessage.fileName || null,
          file_size: newMessage.fileSize || null,
          file_key: newMessage.fileKey || null,
        };
        queryClient.setQueryData<ChatMessage[]>(
          ["chat-history", otherUserId],
          [...previousHistory, optimisticMsg],
        );
      }

      return { previousHistory };
    },
    onError: (err, _newMessage, context) => {
      if (context?.previousHistory) {
        queryClient.setQueryData(
          ["chat-history", otherUserId],
          context.previousHistory,
        );
      }
      toast.error(err.message || "Failed to send message");
    },
    onSuccess: (data) => {
      // Update with actual saved message
      queryClient.setQueryData<ChatMessage[]>(
        ["chat-history", otherUserId],
        (old) => {
          if (!old) return [data];
          return old.map((msg) =>
            msg.id.startsWith("temp-") && msg.message === data.message
              ? data
              : msg,
          );
        },
      );
      // Invalidate inbox to refresh latest message
      queryClient.invalidateQueries({ queryKey: ["chat-inbox"] });
    },
  });
};

export const useMarkChatReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: (senderId) => chatService.markAsRead(senderId),
    onSuccess: (_, senderId) => {
      queryClient.invalidateQueries({ queryKey: ["chat-inbox"] });
      queryClient.invalidateQueries({ queryKey: ["chat-history", senderId] });
    },
  });
};

export const useUploadChatFileMutation = () => {
  return useMutation({
    mutationFn: (file: File) => chatService.uploadFile(file),
    onError: (err) => {
      toast.error(err.message || "Failed to upload file");
    },
  });
};

// --- Notifications Hooks ---

export const useNotificationsQuery = () => {
  return useQuery<AppNotification[], Error>({
    queryKey: ["notifications"],
    queryFn: () => chatService.getNotifications(),
    refetchOnWindowFocus: false,
  });
};

export const useUnreadNotificationsCountQuery = () => {
  return useQuery<number, Error>({
    queryKey: ["unread-notifications-count"],
    queryFn: () => chatService.getUnreadNotificationsCount(),
    refetchOnWindowFocus: false,
  });
};

export const useMarkAllNotificationsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, void>({
    mutationFn: () => chatService.markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["unread-notifications-count"],
      });
    },
  });
};

export const useMarkNotificationReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: (id) => chatService.markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["unread-notifications-count"],
      });
    },
  });
};

// --- Realtime WebSocket Connection Handler Hook ---

export const useSocketSync = (
  currentUserId?: string,
  activeChatUserId?: string,
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!currentUserId) return;

    // Connect to websocket
    socketService.connect();

    // Listen for new messages
    const unsubscribeMessage = socketService.subscribe<ChatMessage>(
      "new_message",
      (message) => {
        const otherUserId =
          message.sender_id === currentUserId
            ? message.receiver_id
            : message.sender_id;

        // 1. Update history for the matching conversation
        queryClient.setQueryData<ChatMessage[]>(
          ["chat-history", otherUserId],
          (old) => {
            if (!old) return [message];
            // Avoid duplicates if optimistically added
            if (old.some((m) => m.id === message.id)) return old;
            return [...old, message];
          },
        );

        // 2. Refresh inbox list
        queryClient.invalidateQueries({ queryKey: ["chat-inbox"] });

        // 3. Auto-read if we are currently chatting with this user
        if (activeChatUserId && message.sender_id === activeChatUserId) {
          chatService.markAsRead(activeChatUserId).then(() => {
            queryClient.invalidateQueries({ queryKey: ["chat-inbox"] });
          });
        }
      },
    );

    // Listen for read status confirmations
    const unsubscribeRead = socketService.subscribe<{ readerId: string }>(
      "messages_read",
      (payload) => {
        queryClient.setQueryData<ChatMessage[]>(
          ["chat-history", payload.readerId],
          (old) => {
            if (!old) return old;
            return old.map((m) =>
              m.receiver_id === payload.readerId
                ? { ...m, is_viewed: true }
                : m,
            );
          },
        );
        queryClient.invalidateQueries({ queryKey: ["chat-inbox"] });
      },
    );

    // Listen for new notifications
    const unsubscribeNotification = socketService.subscribe<AppNotification>(
      "notification",
      (notification) => {
        queryClient.invalidateQueries({
          queryKey: ["unread-notifications-count"],
        });
        queryClient.invalidateQueries({ queryKey: ["notifications"] });

        // Suppress chat toast if user is already chatting with this sender
        if (
          notification.type === "chat" &&
          activeChatUserId &&
          notification.metadata?.senderId === activeChatUserId
        ) {
          return;
        }

        // Render real-time Sonner toast
        toast(notification.title, {
          description: notification.message,
          duration: 5000,
        });
      },
    );

    return () => {
      unsubscribeMessage();
      unsubscribeRead();
      unsubscribeNotification();
      socketService.disconnect();
    };
  }, [currentUserId, activeChatUserId, queryClient]);
};
