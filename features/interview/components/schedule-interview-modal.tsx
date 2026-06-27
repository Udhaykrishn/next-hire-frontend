"use client";

import { useState } from "react";
import { Calendar, Clock, Loader2, User, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useScheduleRoundMutation,
  useCompanyTemplatesQuery,
  useCompanyInterviewersQuery,
} from "../hooks/use-interview";

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
}

export function ScheduleInterviewModal({
  isOpen,
  onClose,
  applicationId,
}: ScheduleInterviewModalProps) {
  const { data: templates = [], isLoading: isTemplatesLoading } =
    useCompanyTemplatesQuery();
  const { data: interviewers = [], isLoading: isInterviewersLoading } =
    useCompanyInterviewersQuery();
  const scheduleMutation = useScheduleRoundMutation(applicationId);

  const [interviewerId, setInterviewerId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(45);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!interviewerId) {
      setError("Please select an interviewer.");
      return;
    }
    if (!templateId) {
      setError("Please select an assessment template.");
      return;
    }
    if (!date || !time) {
      setError("Please select both date and time.");
      return;
    }

    // Combine date and time
    const scheduledAt = new Date(`${date}T${time}`);
    if (Number.isNaN(scheduledAt.getTime())) {
      setError("Invalid date or time format selected.");
      return;
    }

    if (scheduledAt < new Date()) {
      setError("Scheduled time cannot be in the past.");
      return;
    }

    try {
      await scheduleMutation.mutateAsync({
        applicationId,
        interviewerId,
        templateId,
        scheduledAt: scheduledAt.toISOString(),
        duration,
      });
      onClose();
      // Clear fields
      setInterviewerId("");
      setTemplateId("");
      setDate("");
      setTime("");
      setDuration(45);
    } catch (err) {
      const errMessage =
        err instanceof Error
          ? err.message
          : "Failed to schedule interview round.";
      setError(errMessage);
    }
  };

  const isLoading = isTemplatesLoading || isInterviewersLoading;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-canvas border border-hairline rounded-2xl shadow-xl p-6 font-satoshi text-ink">
        <DialogHeader className="relative pr-6">
          <DialogTitle className="text-xl font-display font-black tracking-tight text-ink flex items-center gap-2">
            <Calendar className="w-5 h-5 text-coral" /> Schedule Interview Round
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-muted-ink mt-1">
            Create a new interview evaluation round for this applicant.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-coral" />
              <span className="text-sm font-bold text-muted-ink uppercase tracking-widest">
                Loading configurations...
              </span>
            </div>
          ) : (
            <>
              {/* Select Interviewer */}
              <div className="space-y-2">
                <Label
                  htmlFor="interviewer"
                  className="text-xs font-bold uppercase tracking-wider text-muted-ink flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-coral/60" /> Assigned
                  Interviewer
                </Label>
                <select
                  id="interviewer"
                  value={interviewerId}
                  onChange={(e) => setInterviewerId(e.target.value)}
                  className="w-full h-11 px-3 bg-white border border-hairline rounded-xl text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral transition-colors"
                >
                  <option value="">Select Interviewer</option>
                  {interviewers.map((int) => (
                    <option key={int._id} value={int._id}>
                      {int.email} ({int.department} - {int.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Template */}
              <div className="space-y-2">
                <Label
                  htmlFor="template"
                  className="text-xs font-bold uppercase tracking-wider text-muted-ink flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-coral/60" /> Assessment
                  Rubric Template
                </Label>
                <select
                  id="template"
                  value={templateId}
                  onChange={(e) => setTemplateId(e.target.value)}
                  className="w-full h-11 px-3 bg-white border border-hairline rounded-xl text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral transition-colors"
                >
                  <option value="">Select Template</option>
                  {templates.map((tpl) => (
                    <option key={tpl._id} value={tpl._id}>
                      {tpl.name} ({tpl.duration} min)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="date"
                    className="text-xs font-bold uppercase tracking-wider text-muted-ink"
                  >
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-white border-hairline h-11 rounded-xl focus-visible:ring-coral"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="time"
                    className="text-xs font-bold uppercase tracking-wider text-muted-ink"
                  >
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-white border-hairline h-11 rounded-xl focus-visible:ring-coral"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label
                  htmlFor="duration"
                  className="text-xs font-bold uppercase tracking-wider text-muted-ink flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-coral/60" /> Duration
                  (minutes)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  max="180"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="bg-white border-hairline h-11 rounded-xl focus-visible:ring-coral"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-11 rounded-xl border-hairline text-ink hover:bg-surface-soft font-bold transition-all"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={scheduleMutation.isPending}
                  className="flex-1 h-11 rounded-xl bg-coral hover:bg-coral-active text-white font-bold transition-all flex items-center justify-center gap-2"
                >
                  {scheduleMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    "Schedule Round"
                  )}
                </Button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
