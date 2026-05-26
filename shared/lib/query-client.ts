import { QueryClient } from "@tanstack/react-query";

let globalQueryClient: QueryClient | null = null;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always create a new client
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
        },
      },
    });
  } else {
    // Client: create a singleton
    if (!globalQueryClient) {
      globalQueryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      });
    }
    return globalQueryClient;
  }
}
