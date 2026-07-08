"use client";

import { Calendar, Clock, Video } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  useCandidateRoundsQuery,
  useConfirmRoundMutation,
  useRequestRescheduleMutation,
} from "../hooks/use-interview";

// Compact interview-round panel shown inside the candidate's chat thread.
// Candidates confirm/decline scheduled interview times here (the standalone
// /applications page was removed). Join link appears once confirmed.
export function CandidateChatInterviews() {
  const { data: rounds = [], isLoading } = useCandidateRoundsQuery();
  const confirmMutation = useConfirmRoundMutation();
  const requestRescheduleMutation = useRequestRescheduleMutation();

  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [error, setError] = useState("");

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

  const formatType = (t?: string) =>
    t === "PHONE"
      ? "Phone call"
      : t === "IN_PERSON"
        ? "In person"
        : "Video call";

  return (
    <div className="border-b border-amber-100 bg-amber-50/60 px-6 py-3 space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700/80">
        Upcoming interviews
      </p>
      {relevant.map((round) => {
        const isPending = round.candidateConfirmation === "PENDING";
        const isConfirmed = round.candidateConfirmation === "CONFIRMED";

        return (
          <div
            key={round.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-100 bg-white/70 px-3 py-2"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">
                {round.title || "Interview Round"}
              </p>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] font-semibold text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-coral/70" />
                  {formatWhen(round.scheduledAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-coral/70" />
                  {round.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <Video className="h-3.5 w-3.5 text-coral/70" />
                  {formatType(round.type)}
                </span>
              </div>
              {round.instructions ? (
                <p className="mt-1 line-clamp-2 text-[11px] text-gray-500">
                  {round.instructions}
                </p>
              ) : null}
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
                  onClick={() => {
                    setSelectedRoundId(round.id);
                    setRescheduleModalOpen(true);
                  }}
                  disabled={confirmMutation.isPending}
                  variant="outline"
                  className="h-8 px-3 rounded-lg border-hairline hover:bg-surface-soft font-bold text-[11px]"
                >
                  Reschedule
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

      {/* Reschedule Modal */}
      <Dialog open={rescheduleModalOpen} onOpenChange={setRescheduleModalOpen}>
        <DialogContent className="max-w-md bg-canvas border border-hairline rounded-2xl shadow-xl p-6 font-satoshi text-ink">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-black tracking-tight">
              Request Reschedule
            </DialogTitle>
            <DialogDescription>
              Suggest a new date and time for your interview.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="reschedule-date"
                  className="text-xs font-bold uppercase tracking-wider text-muted-ink"
                >
                  Date
                </Label>
                <Input
                  id="reschedule-date"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="bg-white border-hairline h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reschedule-time"
                  className="text-xs font-bold uppercase tracking-wider text-muted-ink"
                >
                  Time
                </Label>
                <Input
                  id="reschedule-time"
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="bg-white border-hairline h-11 rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="reschedule-reason"
                className="text-xs font-bold uppercase tracking-wider text-muted-ink"
              >
                Reason (optional)
              </Label>
              <textarea
                id="reschedule-reason"
                value={rescheduleReason}
                onChange={(e) => setRescheduleReason(e.target.value)}
                className="w-full h-20 p-3 bg-white border border-hairline rounded-xl text-sm font-medium text-ink resize-none focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral"
                placeholder="Let the recruiter know why you need to reschedule"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setRescheduleModalOpen(false)}
                className="flex-1 h-11 rounded-xl border-hairline"
              >
                Cancel
              </Button>
              <Button
                disabled={requestRescheduleMutation.isPending}
                onClick={async () => {
                  setError("");
                  if (!newDate || !newTime || !selectedRoundId) {
                    setError("Please select a date and time.");
                    return;
                  }
                  const scheduledAt = new Date(`${newDate}T${newTime}`);
                  if (Number.isNaN(scheduledAt.getTime())) {
                    setError("Invalid date/time.");
                    return;
                  }
                  if (scheduledAt < new Date()) {
                    setError("Cannot reschedule to the past.");
                    return;
                  }
                  try {
                    await requestRescheduleMutation.mutateAsync({
                      roundId: selectedRoundId,
                      newScheduledAt: scheduledAt.toISOString(),
                      reason: rescheduleReason,
                    });
                    setRescheduleModalOpen(false);
                  } catch (_e) {
                    setError("Failed to request reschedule.");
                  }
                }}
                className="flex-1 h-11 rounded-xl bg-coral hover:bg-coral-active text-white"
              >
                Send Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
