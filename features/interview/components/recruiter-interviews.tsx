"use client";

import { Calendar, Video, Plus, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoundsForApplicationQuery } from "../hooks/use-interview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { interviewApi } from "../services/interview.api";
import Link from "next/link";

interface RecruiterInterviewsProps {
  applicationId: string;
  jobId?: string;
  candidateName?: string;
}

export function RecruiterInterviews({
  applicationId,
  jobId,
  candidateName,
}: RecruiterInterviewsProps) {
  const { data: rounds = [], isLoading } =
    useRoundsForApplicationQuery(applicationId);

  const scheduleParams = new URLSearchParams({ applicationId });
  if (jobId) scheduleParams.set("jobId", jobId);
  if (candidateName) scheduleParams.set("candidate", candidateName);
  const scheduleHref = `/recruiter/interview-rounds/schedule?${scheduleParams.toString()}`;

  const queryClient = useQueryClient();
  const approveRescheduleMutation = useMutation({
    mutationFn: (roundId: string) => interviewApi.approveReschedule(roundId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interview-rounds", applicationId],
      });
    },
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string, confirmation: string) => {
    if (status === "CANCELLED" || confirmation === "DECLINED") {
      return "bg-red-50 text-red-700 border-red-200";
    }
    if (status === "RESCHEDULED") {
      return "bg-purple-50 text-purple-700 border-purple-200";
    }
    if (status === "COMPLETED") {
      return "bg-green-50 text-green-700 border-green-200";
    }
    if (confirmation === "CONFIRMED") {
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    }
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  const getStatusLabel = (status: string, confirmation: string) => {
    if (status === "CANCELLED" || confirmation === "DECLINED") {
      return "Cancelled / Declined";
    }
    if (status === "RESCHEDULED") {
      return "Reschedule Requested";
    }
    if (status === "COMPLETED") {
      return "Completed";
    }
    if (confirmation === "CONFIRMED") {
      return "Confirmed & Scheduled";
    }
    return "Awaiting Confirmation";
  };

  return (
    <div className="bg-[#ffffff] p-[24px] rounded-[16px] border border-[rgba(14,15,12,0.12)] shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-[700] text-[#0e0f0c] leading-none flex items-center gap-2">
          <Calendar className="w-5 h-5 text-coral" /> Interview Rounds
        </h3>
        <Link
          href={scheduleHref}
          className="h-8 px-3 text-xs bg-coral text-white hover:bg-coral-active hover:text-white rounded-lg font-black transition-all flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Schedule
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-coral" />
        </div>
      ) : rounds.length > 0 ? (
        <div className="space-y-4">
          {rounds.map((round) => {
            const isConfirmed = round.candidateConfirmation === "CONFIRMED";
            const isCompleted = round.status === "COMPLETED";
            const isRescheduled = round.status === "RESCHEDULED";
            const isCancelled =
              round.status === "CANCELLED" ||
              round.candidateConfirmation === "DECLINED";

            return (
              <div
                key={round.id}
                className="p-4 rounded-xl border border-[rgba(14,15,12,0.08)] bg-canvas flex flex-col justify-between gap-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-ink leading-tight">
                      {round.title ||
                        (round.templateId &&
                        typeof round.templateId === "object"
                          ? round.templateId.name
                          : "Interview Evaluation")}
                    </h4>
                    <p className="text-[11px] text-muted-ink font-semibold uppercase tracking-wider mt-0.5 flex gap-2 items-center">
                      <span>{round.duration} min</span>
                      <span>·</span>
                      <span>{round.type || "VIDEO"}</span>
                    </p>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-[700] uppercase tracking-wider border ${getStatusColor(
                      round.status,
                      round.candidateConfirmation,
                    )}`}
                  >
                    {getStatusLabel(round.status, round.candidateConfirmation)}
                  </span>
                </div>

                {/* Date, Time & Interviewer */}
                <div className="grid grid-cols-2 gap-2 text-xs text-body font-medium">
                  <div>
                    <span className="text-muted-ink block text-[10px] uppercase font-bold tracking-wider">
                      Date & Time
                    </span>
                    <span>
                      {formatDate(round.scheduledAt)} @{" "}
                      {formatTime(round.scheduledAt)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-ink block text-[10px] uppercase font-bold tracking-wider">
                      Interviewers
                    </span>
                    <span className="truncate block max-w-full">
                      {round.interviewers && round.interviewers.length > 0
                        ? round.interviewers.map((i) => i.email).join(", ")
                        : "No interviewers assigned"}
                    </span>
                  </div>
                </div>

                {/* Instructions & Notes */}
                {(round.instructions || round.internalNotes) && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {round.instructions && (
                      <div className="bg-surface-soft p-2 rounded-lg">
                        <span className="text-muted-ink block text-[10px] uppercase font-bold tracking-wider mb-1">
                          Candidate Instructions
                        </span>
                        <p className="text-ink/80">{round.instructions}</p>
                      </div>
                    )}
                    {round.internalNotes && (
                      <div className="bg-surface-soft p-2 rounded-lg">
                        <span className="text-muted-ink block text-[10px] uppercase font-bold tracking-wider mb-1">
                          Internal Notes
                        </span>
                        <p className="text-ink/80">{round.internalNotes}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Completed Feedback details */}
                {isCompleted && (
                  <div className="mt-1 p-3 rounded-lg bg-green-50/50 border border-green-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold text-green-800">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Outcome:{" "}
                        {round.candidateStatus}
                      </span>
                      <span>Score: {round.score}/10</span>
                    </div>
                    {round.feedback && (
                      <p className="text-green-900/80 italic font-medium">
                        "{round.feedback}"
                      </p>
                    )}
                  </div>
                )}

                {/* Reschedule actions */}
                {isRescheduled && (
                  <div className="mt-2 p-3 bg-purple-50/50 border border-purple-100 rounded-lg flex items-center justify-between">
                    <div className="text-xs text-purple-900 font-medium">
                      Candidate requested to reschedule to: <br />
                      <strong className="font-bold">
                        {formatDate(round.scheduledAt)} @{" "}
                        {formatTime(round.scheduledAt)}
                      </strong>
                    </div>
                    <Button
                      onClick={() => approveRescheduleMutation.mutate(round.id)}
                      disabled={approveRescheduleMutation.isPending}
                      className="h-8 px-3 text-xs bg-purple-600 text-white hover:bg-purple-700 rounded-lg font-bold"
                    >
                      {approveRescheduleMutation.isPending
                        ? "Approving..."
                        : "Approve New Time"}
                    </Button>
                  </div>
                )}

                {/* Join meeting button */}
                {!isCompleted &&
                  !isCancelled &&
                  isConfirmed &&
                  !isRescheduled && (
                    <div className="flex justify-end pt-2 border-t border-hairline/60">
                      <Link
                        href={`/interview/room/${round.meetingCode}`}
                        className="inline-flex h-9 px-4 rounded-lg bg-coral hover:bg-coral-active text-white hover:text-white font-bold text-xs items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        <Video className="w-3.5 h-3.5" /> Enter Room
                      </Link>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-6 text-center border border-dashed border-[rgba(14,15,12,0.1)] rounded-xl bg-canvas flex flex-col items-center justify-center text-xs">
          <Calendar className="w-8 h-8 text-[rgba(14,15,12,0.2)] mb-2" />
          <p className="text-muted-ink font-semibold">
            No interview rounds scheduled yet.
          </p>
          <p className="text-[10px] text-muted-soft mt-0.5">
            Click Schedule above to set up the first round.
          </p>
        </div>
      )}
    </div>
  );
}
