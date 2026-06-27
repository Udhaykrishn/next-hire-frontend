"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/features/auth/context/auth-context";
import { ChatLayout } from "@/features/chat/components/ChatLayout";
import { Loader2 } from "lucide-react";

function RecruiterChatPageContent() {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "RECRUITER")) {
      router.replace("/recruiter/login");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !isAuthenticated || user?.role !== "RECRUITER") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-coral" />
      </div>
    );
  }

  return (
    <ChatLayout
      currentUserId={user.id}
      currentUserRole="RECRUITER"
      initialSelectedUserId={userId}
    />
  );
}

export default function RecruiterChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-coral" />
        </div>
      }
    >
      <RecruiterChatPageContent />
    </Suspense>
  );
}
