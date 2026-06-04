"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type React from "react";
import { useState } from "react";
import { OverlayProvider } from "react-aria";
import { Toaster } from "sonner";
import { ProfileProvider } from "@/context/profile-context";
import { AuthProvider } from "@/features/auth/context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
          <ProfileProvider>
            <OverlayProvider>
              {children}
              <Toaster
                position="top-right"
                richColors
                expand={false}
                toastOptions={{
                  className:
                    "rounded-2xl border-gray-100 shadow-2xl font-bold text-xs uppercase tracking-widest",
                }}
              />
            </OverlayProvider>
          </ProfileProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
