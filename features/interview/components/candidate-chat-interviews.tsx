"use client";

import { Calendar, Clock, Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  useCandidateRoundsQuery,
  useConfirmRoundMutation,
} from "../hooks/use-interview";

// Compact interview-round panel shown inside the candidate's chat thread.
// Candidates confirm/decline scheduled interview times here (the standalone
// /applications page was removed). Join link appears once confirmed.
export function CandidateChatInterviews() {
  const { data: rounds = [], isLoading } = useCandidateRoundsQuery();
  const confirmMutation = useConfirmRoundMutation();

  if (isLoading) return null;

  // Only surface rounds that still need attention or are joinable.
  const relevant = rounds.filter(
    (r) =>
      r.status !== "CANCELLED" &&
      r.status !== "COMPLETED" &&
      r.candidateConfirmation !== "DECLINED",
  );

  if (relevant.length === 0) return null;

  const formatWhen = (dateStr: string) => {
    const d = new Date(dateStr);
    if (!dateStr || Number.isNaN(d.getTime())) return "Time to be confirmed";
    return `${d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} · ${d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="border-b border-amber-100 bg-amber-50/60 px-6 py-3 space-y-2">
      {relevant.map((round) => {
        const isPending = round.candidateConfirmation === "PENDING";
        const isConfirmed = round.candidateConfirmation === "CONFIRMED";

        return (
          <div
            key={round.id}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
              <Video className="h-4 w-4 text-coral shrink-0" />
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-coral/70" />
                {formatWhen(round.scheduledAt)}
              </span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <Clock className="h-3.5 w-3.5 text-coral/70" />
                {round.duration} min
              </span>
            </div>

            {isPending ? (
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    confirmMutation.mutate({
                      roundId: round.id,
                      status: "DECLINED",
                    })
                  }
                  disabled={confirmMutation.isPending}
                  variant="ghost"
                  className="h-8 px-3 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-bold text-[11px]"
                >
                  Decline
                </Button>
                <Button
                  onClick={() =>
                    confirmMutation.mutate({
                      roundId: round.id,
                      status: "CONFIRMED",
                    })
                  }
                  disabled={confirmMutation.isPending}
                  className="h-8 px-4 rounded-lg bg-coral hover:bg-coral-active text-white font-bold text-[11px]"
                >
                  Confirm time
                </Button>
              </div>
            ) : isConfirmed ? (
              <Link
                href={`/interview/room/${round.meetingCode}`}
                className="inline-flex h-8 px-4 rounded-lg bg-coral hover:bg-coral-active text-white font-bold text-[11px] items-center gap-1.5"
              >
                <Video className="h-3.5 w-3.5" /> Join room
              </Link>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
