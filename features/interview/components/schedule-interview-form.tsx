"use client";

import { useState } from "react";
import { Clock, FileText, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useScheduleRoundMutation,
  useCompanyTemplatesQuery,
  useCompanyInterviewersQuery,
} from "../hooks/use-interview";
import {
  MultiSelectCombobox,
  SearchableCombobox,
  type ComboboxOption,
} from "./searchable-combobox";
import { DatePicker } from "./date-picker";
import { cn } from "@/lib/utils";

interface ScheduleInterviewFormProps {
  applicationId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const FORMAT_OPTIONS: ComboboxOption[] = [
  { value: "VIDEO", label: "Video Call" },
  { value: "PHONE", label: "Phone Call" },
  { value: "IN_PERSON", label: "In Person" },
];

const DURATION_PRESETS = [15, 30, 45, 60, 90, 120];

// 15-minute slots across the day, labelled in 12-hour form with an explicit
// AM/PM so there's no ambiguity. Value stays 24h ("HH:mm") for date math.
const TIME_OPTIONS: ComboboxOption[] = Array.from({ length: 96 }, (_, i) => {
  const h24 = Math.floor(i / 4);
  const minutes = (i % 4) * 15;
  const value = `${String(h24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  const period = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const label = `${h12}:${String(minutes).padStart(2, "0")} ${period}`;
  return { value, label, keywords: [period.toLowerCase(), value] };
});

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function defaultDate(): Date {
  // Tomorrow is the smart default — you rarely schedule an interview for today.
  const d = startOfToday();
  d.setDate(d.getDate() + 1);
  return d;
}

export function ScheduleInterviewForm({
  applicationId,
  onSuccess,
  onCancel,
}: ScheduleInterviewFormProps) {
  const { data: templates = [], isLoading: isTemplatesLoading } =
    useCompanyTemplatesQuery();
  const { data: interviewers = [], isLoading: isInterviewersLoading } =
    useCompanyInterviewersQuery();
  const scheduleMutation = useScheduleRoundMutation(applicationId);

  const [interviewerIds, setInterviewerIds] = useState<string[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("VIDEO");
  const [timeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [instructions, setInstructions] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState(45);
  const [error, setError] = useState("");

  const isLoading = isTemplatesLoading || isInterviewersLoading;

  const templateKey = (tpl: (typeof templates)[number]) =>
    tpl._id || (tpl as unknown as { id: string }).id;

  const interviewerOptions: ComboboxOption[] = interviewers.map((int) => ({
    value: int._id,
    label: int.email,
    description: [int.department, int.role].filter(Boolean).join(" · "),
    avatarFallback: int.email.charAt(0),
  }));

  const templateOptions: ComboboxOption[] = templates.map((tpl) => ({
    value: templateKey(tpl),
    label: tpl.name,
    description: `${tpl.duration} min`,
  }));

  const handleTemplateChange = (id: string) => {
    setTemplateId(id);
    const selected = templates.find((t) => templateKey(t) === id);
    if (!selected) return;
    setDuration(selected.duration);
    const extra = selected as unknown as {
      defaultType?: string;
      defaultInstructions?: string;
    };
    if (extra.defaultType) setType(extra.defaultType);
    if (extra.defaultInstructions) setInstructions(extra.defaultInstructions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (interviewerIds.length === 0) {
      setError("Please select at least one interviewer.");
      return;
    }
    if (!templateId) {
      setError("Please select an assessment template.");
      return;
    }
    if (!title.trim()) {
      setError("Please provide an interview title.");
      return;
    }
    if (!date || !time) {
      setError("Please select both a date and a time.");
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    const scheduledAt = new Date(date);
    scheduledAt.setHours(hours, minutes, 0, 0);

    if (Number.isNaN(scheduledAt.getTime())) {
      setError("Invalid date or time selected.");
      return;
    }
    if (scheduledAt < new Date()) {
      setError("Scheduled time cannot be in the past.");
      return;
    }

    try {
      await scheduleMutation.mutateAsync({
        applicationId,
        interviewerIds,
        templateId,
        title,
        type,
        timeZone,
        instructions,
        internalNotes,
        scheduledAt: scheduledAt.toISOString(),
        duration,
      });
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to schedule interview round.",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-2xl border border-hairline bg-white py-20">
        <Loader2 className="h-6 w-6 animate-spin text-coral" />
        <span className="text-sm font-bold uppercase tracking-widest text-muted-ink">
          Loading configuration…
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-hairline bg-white p-6 md:p-8 font-satoshi text-ink"
    >
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* Interviewers */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-ink">
          <User className="h-3.5 w-3.5 text-coral/60" /> Assigned Interviewers
        </Label>
        <MultiSelectCombobox
          options={interviewerOptions}
          values={interviewerIds}
          onValuesChange={setInterviewerIds}
          placeholder="Select interviewers"
          searchPlaceholder="Search by email or department…"
          emptyText="No interviewers found."
          itemNoun="interviewer"
        />
      </div>

      {/* Title + Format */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label
            htmlFor="title"
            className="text-xs font-bold uppercase tracking-wider text-muted-ink"
          >
            Interview Title
          </Label>
          <Input
            id="title"
            placeholder="e.g. Technical Round 1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 rounded-xl border-hairline bg-white focus-visible:ring-coral"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-ink">
            Format
          </Label>
          <SearchableCombobox
            options={FORMAT_OPTIONS}
            value={type}
            onValueChange={setType}
            placeholder="Select format"
            searchable={false}
            showAvatar={false}
          />
        </div>
      </div>

      {/* Template */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-ink">
          <FileText className="h-3.5 w-3.5 text-coral/60" /> Assessment Rubric
          Template
        </Label>
        <SearchableCombobox
          options={templateOptions}
          value={templateId}
          onValueChange={handleTemplateChange}
          placeholder="Select template"
          searchPlaceholder="Search templates…"
          emptyText="No templates found."
          showAvatar={false}
        />
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-ink">
            Date
          </Label>
          <DatePicker
            value={date}
            onChange={setDate}
            isDisabled={(d) => d < startOfToday()}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-ink">
            Time
          </Label>
          <SearchableCombobox
            options={TIME_OPTIONS}
            value={time}
            onValueChange={setTime}
            placeholder="Select a time"
            searchPlaceholder="e.g. 2:30 PM"
            emptyText="No matching time."
            showAvatar={false}
          />
        </div>
      </div>

      {/* Duration presets */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-ink">
          <Clock className="h-3.5 w-3.5 text-coral/60" /> Duration
        </Label>
        <div className="flex flex-wrap gap-2">
          {(DURATION_PRESETS.includes(duration)
            ? DURATION_PRESETS
            : [...DURATION_PRESETS, duration].sort((a, b) => a - b)
          ).map((preset) => {
            const active = duration === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => setDuration(preset)}
                className={cn(
                  "h-9 rounded-xl border px-4 text-sm font-bold transition-colors",
                  active
                    ? "border-coral bg-coral text-white"
                    : "border-hairline bg-white text-ink hover:border-coral/50",
                )}
              >
                {preset} min
              </button>
            );
          })}
        </div>
      </div>

      {/* Candidate instructions */}
      <div className="space-y-2">
        <Label
          htmlFor="instructions"
          className="text-xs font-bold uppercase tracking-wider text-muted-ink"
        >
          Candidate Instructions
        </Label>
        <textarea
          id="instructions"
          placeholder="Instructions visible to the candidate"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="h-24 w-full resize-none rounded-xl border border-hairline bg-white p-3 text-sm font-medium text-ink transition-colors focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/40"
        />
      </div>

      {/* Internal notes */}
      <div className="space-y-2">
        <Label
          htmlFor="internalNotes"
          className="text-xs font-bold uppercase tracking-wider text-muted-ink"
        >
          Internal Notes
        </Label>
        <textarea
          id="internalNotes"
          placeholder="Private notes for interviewers"
          value={internalNotes}
          onChange={(e) => setInternalNotes(e.target.value)}
          className="h-24 w-full resize-none rounded-xl border border-hairline bg-white p-3 text-sm font-medium text-ink transition-colors focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/40"
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-hairline pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="h-11 rounded-xl border-hairline px-6 font-bold text-ink hover:bg-surface-soft"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={scheduleMutation.isPending}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-coral px-6 font-bold text-white transition-all hover:bg-coral-active"
        >
          {scheduleMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Scheduling…
            </>
          ) : (
            "Schedule Round"
          )}
        </Button>
      </div>
    </form>
  );
}
