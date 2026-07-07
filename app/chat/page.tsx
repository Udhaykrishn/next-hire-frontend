"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LandingNavbar } from "@/components/landing-navbar";
import { LandingFooter } from "@/components/landing-footer";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { ChatLayout } from "@/features/chat/components/ChatLayout";
import { Loader2 } from "lucide-react";

function ChatPageContent() {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [userId, setUserId] = useState<string | null>(
    searchParams.get("userId"),
  );
  const [name, setName] = useState<string | null>(searchParams.get("name"));
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Attempt to load from session storage (secure redirect)
    const storedUserId = sessionStorage.getItem("pendingChatUserId");
    const storedName = sessionStorage.getItem("pendingChatUserName");

    if (storedUserId) {
      setUserId(storedUserId);
      setName(storedName);
      sessionStorage.removeItem("pendingChatUserId");
      sessionStorage.removeItem("pendingChatUserName");
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (
      isInitialized &&
      !isLoading &&
      (!isAuthenticated || user?.role !== "CANDIDATE")
    ) {
      router.replace("/login");
    }
  }, [isInitialized, isLoading, isAuthenticated, user, router]);

  if (
    !isInitialized ||
    isLoading ||
    !isAuthenticated ||
    user?.role !== "CANDIDATE"
  ) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-wise-green" />
      </div>
    );
  }

  return (
    <ChatLayout
      currentUserId={user.id}
      currentUserRole="CANDIDATE"
      initialSelectedUserId={userId}
      initialSelectedUserName={name}
    />
  );
}

export default function CandidateChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-satoshi selection:bg-wise-green selection:text-dark-green">
      <LandingNavbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Suspense
            fallback={
              <div className="flex min-h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-wise-green" />
              </div>
            }
          >
            <ChatPageContent />
          </Suspense>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
