"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCandidateRounds } from "../hooks/use-candidate-rounds";
import { Calendar, Clock, Star, AlertCircle, Award } from "lucide-react";
import { format } from "date-fns";

export default function CandidateInterviewsContent({
  applicationId,
}: {
  applicationId: string;
}) {
  const {
    interviewers,
    templates,
    rounds,
    interviewerId,
    setInterviewerId,
    templateId,
    setTemplateId,
    scheduledAt,
    setScheduledAt,
    isSubmitting,
    handleSchedule,
  } = useCandidateRounds(applicationId);

  return (
    <div className="space-y-6">
      {/* Schedule A Round */}
      <Card className="border-hairline shadow-sm rounded-2xl bg-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/10 text-coral">
              <Calendar className="h-4 w-4" />
            </span>
            <CardTitle className="text-lg font-bold">
              Schedule Interview Round
            </CardTitle>
          </div>
          <CardDescription>
            Assign an authorized interviewer and template for this candidate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSchedule}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
          >
            <div className="space-y-1.5 md:col-span-1">
              <Label
                htmlFor="interviewerId"
                className="text-xs font-bold text-muted-soft uppercase tracking-wider"
              >
                Interviewer
              </Label>
              <select
                id="interviewerId"
                value={interviewerId}
                onChange={(e) => setInterviewerId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-hairline bg-white text-sm focus:border-coral focus:ring-1 focus:ring-coral/20"
                required
              >
                <option value="">Select Interviewer</option>
                {interviewers.map((int) => (
                  <option key={int.id} value={int.id}>
                    {int.email} ({int.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 md:col-span-1">
              <Label
                htmlFor="templateId"
                className="text-xs font-bold text-muted-soft uppercase tracking-wider"
              >
                Round Template
              </Label>
              <select
                id="templateId"
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-hairline bg-white text-sm focus:border-coral focus:ring-1 focus:ring-coral/20"
                required
              >
                <option value="">Select Template</option>
                {templates.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.name} ({tpl.duration} min)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 md:col-span-1">
              <Label
                htmlFor="scheduledAt"
                className="text-xs font-bold text-muted-soft uppercase tracking-wider"
              >
                Date & Time
              </Label>
              <Input
                id="scheduledAt"
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="h-10 bg-white border-hairline focus:border-coral focus:ring-1 focus:ring-coral/20 rounded-xl"
                required
              />
            </div>

            <div className="md:col-span-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-coral hover:bg-coral/95 text-white font-bold h-10 rounded-xl shadow-sm"
              >
                {isSubmitting ? "Scheduling..." : "Schedule Round"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Rounds List */}
      <Card className="border-hairline shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="border-b border-hairline pb-4">
          <CardTitle className="text-lg font-bold">
            Interview Progress
          </CardTitle>
          <CardDescription>
            View scheduled rounds, scores, and detailed evaluator feedback.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {rounds.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-8 w-8 text-muted-soft/60 mb-2" />
              <p className="text-ink font-bold text-sm">
                No interviews scheduled yet
              </p>
              <p className="text-muted-soft text-xs mt-0.5">
                Assign a round to start the evaluation workflow.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-hairline">
              {rounds.map((round) => (
                <div
                  key={round.id}
                  className="p-6 space-y-4 hover:bg-canvas/30 transition-colors"
                >
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-ink text-base">
                          {round.templateName}
                        </h4>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                            round.status === "COMPLETED"
                              ? "bg-wise-green/10 text-wise-green"
                              : "bg-coral/10 text-coral"
                          }`}
                        >
                          {round.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-soft">
                        Interviewer:{" "}
                        <span className="font-semibold text-ink/80">
                          {round.interviewerEmail}
                        </span>{" "}
                        ({round.interviewerDepartment})
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 text-right">
                      <div className="flex items-center gap-1.5 text-xs text-muted-soft font-semibold">
                        <Clock className="h-3.5 w-3.5 text-coral" />
                        <span>
                          {format(new Date(round.scheduledAt), "PPP p")}
                        </span>
                      </div>
                      {round.score !== undefined && (
                        <div className="flex items-center gap-1 bg-coral/10 text-coral font-bold px-2 py-0.5 rounded text-sm">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{round.score} / 10</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {round.status === "COMPLETED" && (
                    <div className="bg-canvas/60 border border-hairline rounded-xl p-4 space-y-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-soft uppercase tracking-wider mb-1">
                          <Award className="h-3.5 w-3.5 text-coral" />
                          <span>Rubric Ratings</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {round.rubricRatings &&
                            Object.entries(round.rubricRatings).map(
                              ([key, val]) => (
                                <div
                                  key={key}
                                  className="flex items-center gap-1.5 bg-white border border-hairline px-2.5 py-1 rounded-lg text-xs"
                                >
                                  <span className="text-muted-soft font-medium">
                                    {key}:
                                  </span>
                                  <span className="font-bold text-ink">
                                    {val}
                                  </span>
                                </div>
                              ),
                            )}
                        </div>
                      </div>

                      {round.feedback && (
                        <div className="pt-2 border-t border-hairline">
                          <span className="text-xs font-bold text-muted-soft uppercase tracking-wider block mb-1">
                            Feedback Notes
                          </span>
                          <p className="text-ink text-sm leading-relaxed whitespace-pre-wrap">
                            {round.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
