import { io, type Socket } from "socket.io-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
const SOCKET_URL = API_URL.replace("/api/v1", "");

let socket: Socket | null = null;

export const socketService = {
  connect: (): Socket => {
    if (socket?.connected) return socket;

    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("WebSocket connected successfully");
    });

    socket.on("disconnect", (reason) => {
      console.log("WebSocket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    return socket;
  },

  disconnect: (): void => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  getSocket: (): Socket | null => {
    return socket;
  },

  emit: (event: string, data: unknown): void => {
    if (socket?.connected) {
      socket.emit(event, data);
    } else {
      console.warn(`Cannot emit event "${event}": Socket is not connected`);
    }
  },

  subscribe: <T>(event: string, callback: (data: T) => void): (() => void) => {
    const currentSocket = socketService.connect();
    currentSocket.on(event, callback);

    return () => {
      currentSocket.off(event, callback);
    };
  },
};
