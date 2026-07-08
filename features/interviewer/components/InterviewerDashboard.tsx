"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useInterviewerDashboard } from "../hooks/use-interviewer-dashboard";
import {
  Clock,
  Star,
  Calendar,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  User,
  ChevronRight,
  Video,
  X,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

const formatType = (t?: string) =>
  t === "PHONE" ? "Phone call" : t === "IN_PERSON" ? "In person" : "Video call";

export default function InterviewerDashboard() {
  const {
    assignedRounds,
    selectedRound,
    setSelectedRound,
    overallScore,
    setOverallScore,
    feedbackText,
    setFeedbackText,
    ratings,
    handleRatingChange,
    isSubmitting,
    startEvaluation,
    handleSubmit,
  } = useInterviewerDashboard();

  // Backend status vocab is SCHEDULED/RESCHEDULED/COMPLETED/CANCELLED/NO_SHOW.
  // Anything not finished or cancelled is an upcoming round to action.
  const pendingRounds = assignedRounds.filter(
    (r) => !["COMPLETED", "CANCELLED", "NO_SHOW"].includes(r.status),
  );
  const completedRounds = assignedRounds.filter(
    (r) => r.status === "COMPLETED",
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto relative">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-ink font-display">
          Interviewer Dashboard
        </h1>
        <p className="text-muted-soft mt-1">
          Review candidates, access evaluation rubrics, and submit final
          feedback.
        </p>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-hairline shadow-sm bg-white rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/10 text-coral">
              <Calendar className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold text-muted-soft uppercase tracking-wider">
                Pending Evaluations
              </p>
              <h3 className="text-2xl font-black text-ink">
                {pendingRounds.length}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-hairline shadow-sm bg-white rounded-2xl">
          <CardContent className="p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-wise-green/10 text-wise-green">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold text-muted-soft uppercase tracking-wider">
                Completed Assessments
              </p>
              <h3 className="text-2xl font-black text-ink">
                {completedRounds.length}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue Sections */}
      <div className="space-y-8">
        {/* Pending Queue */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-ink flex items-center gap-2">
            <span>Pending Interviews</span>
            {pendingRounds.length > 0 && (
              <span className="bg-coral text-white text-xs px-2 py-0.5 rounded-full">
                {pendingRounds.length}
              </span>
            )}
          </h2>

          {pendingRounds.length === 0 ? (
            <Card className="border-hairline shadow-sm bg-white/50 border-dashed rounded-2xl p-8 text-center">
              <CheckCircle2 className="h-8 w-8 text-wise-green mx-auto mb-2" />
              <p className="font-bold text-ink text-base">All caught up!</p>
              <p className="text-muted-soft text-sm mt-0.5">
                No pending rounds assigned to you.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingRounds.map((round) => (
                <Card
                  key={round.id}
                  className="border-hairline shadow-sm bg-white hover:border-coral/40 transition-colors rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-coral bg-coral/10 px-2 py-0.5 rounded">
                          {round.template.name}
                        </span>
                        {round.title ? (
                          <p className="text-sm font-bold text-ink mt-1.5">
                            {round.title}
                          </p>
                        ) : null}
                        <h3 className="font-bold text-ink text-lg mt-2">
                          {round.candidate.name}
                        </h3>
                        <p className="text-xs text-muted-soft">
                          {round.candidate.email}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-soft font-semibold bg-canvas px-2.5 py-1 rounded-lg">
                        <Clock className="h-3.5 w-3.5 text-coral" />
                        <span>
                          {round.duration ?? round.template.duration}m
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-hairline pt-3">
                      <div className="flex items-center gap-2 text-xs text-muted-soft">
                        <User className="h-3.5 w-3.5" />
                        <span>
                          Role:{" "}
                          <strong className="text-ink/80">
                            {round.job.title}
                          </strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-soft">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          Scheduled:{" "}
                          <strong className="text-ink/80">
                            {format(new Date(round.scheduledAt), "PPP p")}
                          </strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-soft">
                        <Video className="h-3.5 w-3.5" />
                        <span>
                          Format:{" "}
                          <strong className="text-ink/80">
                            {formatType(round.type)}
                          </strong>
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-soft mb-1">
                        Rubric Criteria
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {round.template.rubric.map((r) => (
                          <span
                            key={r}
                            className="text-[10px] px-2 py-0.5 bg-canvas border border-hairline rounded text-ink/80 font-medium"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-hairline bg-canvas p-4 flex gap-2">
                    {round.meetingCode ? (
                      <Link
                        href={`/interview/room/${round.meetingCode}`}
                        className="flex-1 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-hairline bg-white font-bold text-ink hover:border-coral/40 transition-colors"
                      >
                        <Video className="h-4 w-4 text-coral" />
                        <span>Join Room</span>
                      </Link>
                    ) : null}
                    <Button
                      onClick={() => startEvaluation(round)}
                      className="flex-1 bg-coral hover:bg-coral/95 text-white font-bold h-10 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Submit Evaluation</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Completed Assessments */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-ink">Evaluation History</h2>

          {completedRounds.length === 0 ? (
            <Card className="border-hairline shadow-sm bg-white/50 border-dashed rounded-2xl p-8 text-center">
              <p className="font-semibold text-muted-soft text-sm">
                No assessments submitted yet.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {completedRounds.map((round) => (
                <Card
                  key={round.id}
                  className="border-hairline shadow-sm bg-white rounded-2xl overflow-hidden"
                >
                  <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-1 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-wise-green bg-wise-green/10 px-2 py-0.5 rounded">
                        {round.template.name}
                      </span>
                      <h3 className="font-bold text-ink text-base mt-2">
                        {round.candidate.name}
                      </h3>
                      <p className="text-xs text-muted-soft">
                        {round.candidate.email}
                      </p>
                      <p className="text-xs text-ink/80 pt-1 font-semibold">
                        {round.job.title}
                      </p>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-soft mb-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-coral" />
                          <span>Rubric Ratings</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {round.rubricRatings &&
                            Object.entries(round.rubricRatings).map(
                              ([criterion, val]) => (
                                <div
                                  key={criterion}
                                  className="flex items-center gap-1 bg-canvas border border-hairline px-2 py-0.5 rounded text-xs font-semibold text-ink"
                                >
                                  <span className="text-muted-soft font-normal">
                                    {criterion}:
                                  </span>
                                  <span>{val}</span>
                                </div>
                              ),
                            )}
                        </div>
                      </div>

                      {round.feedback && (
                        <div className="border-t border-hairline pt-2">
                          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-soft mb-1">
                            <MessageSquare className="h-3.5 w-3.5 text-coral" />
                            <span>Evaluation Feedback</span>
                          </div>
                          <p className="text-ink text-xs leading-relaxed line-clamp-3 italic">
                            "{round.feedback}"
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-1 flex flex-col md:items-end gap-2">
                      <div className="flex items-center gap-1 text-xs text-muted-soft font-semibold bg-canvas px-2.5 py-1 rounded-lg w-fit">
                        <Clock className="h-3.5 w-3.5 text-coral" />
                        <span>
                          {format(new Date(round.scheduledAt), "PPP")}
                        </span>
                      </div>

                      {round.score !== undefined && (
                        <div className="flex items-center gap-1.5 bg-coral/10 text-coral font-bold px-3 py-1 rounded-xl text-base w-fit">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{round.score} / 10</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Evaluation Modal Dialog Overlay */}
      {selectedRound && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-hairline rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-hairline p-6 bg-canvas">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-coral bg-coral/10 px-2 py-0.5 rounded">
                  Rubric Assessment
                </span>
                <h3 className="text-2xl font-black text-ink mt-2">
                  Evaluate {selectedRound.candidate.name}
                </h3>
                <p className="text-sm text-muted-soft">
                  Round: {selectedRound.template.name} (
                  {selectedRound.job.title})
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedRound(null)}
                className="text-muted hover:text-ink rounded-lg h-9 w-9"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-6 max-h-[70vh] overflow-y-auto"
            >
              {/* Rubric Criteria sliders */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-soft uppercase tracking-wider border-b border-hairline pb-1.5">
                  Criterion Scores (1 - 10)
                </h4>

                <div className="space-y-4">
                  {selectedRound.template.rubric.map((criterion) => (
                    <div key={criterion} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <Label className="font-semibold text-ink text-sm">
                          {criterion}
                        </Label>
                        <span className="text-sm font-bold text-coral bg-coral/10 px-2 py-0.5 rounded">
                          {ratings[criterion] || 7}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-soft">
                          Weak (1)
                        </span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={ratings[criterion] || 7}
                          onChange={(e) =>
                            handleRatingChange(
                              criterion,
                              Number(e.target.value),
                            )
                          }
                          className="flex-1 accent-coral h-1.5 bg-canvas rounded-lg cursor-pointer"
                        />
                        <span className="text-xs text-muted-soft">
                          Strong (10)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overall Score Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-muted-soft uppercase tracking-wider block">
                  Overall Score recommendation
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((scoreVal) => (
                    <button
                      key={scoreVal}
                      type="button"
                      onClick={() => setOverallScore(scoreVal)}
                      className={`h-10 w-10 rounded-xl text-sm font-bold transition-all border ${
                        overallScore === scoreVal
                          ? "bg-coral border-coral text-white shadow-sm shadow-coral/30"
                          : "bg-white border-hairline text-ink hover:bg-canvas"
                      }`}
                    >
                      {scoreVal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback text notes */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="feedbackText"
                  className="text-xs font-bold text-muted-soft uppercase tracking-wider"
                >
                  Detailed Feedback Comments
                </Label>
                <Textarea
                  id="feedbackText"
                  placeholder="Provide structured feedback notes, candidate strengths, weaknesses and reasoning behind the rubric grades..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="bg-white border-hairline focus:border-coral focus:ring-1 focus:ring-coral/20 rounded-xl min-h-[120px] text-sm"
                  required
                />
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-hairline">
                <Button
                  type="button"
                  onClick={() => setSelectedRound(null)}
                  variant="outline"
                  className="rounded-xl font-bold h-11 border-hairline"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-coral hover:bg-coral/95 text-white font-bold h-11 px-6 rounded-xl shadow-sm"
                >
                  {isSubmitting ? "Submitting..." : "Submit Evaluation"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
