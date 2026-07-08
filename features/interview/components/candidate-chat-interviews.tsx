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
