"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: Date;
  onChange: (date?: Date) => void;
  /** Return true for dates that cannot be picked (e.g. the past). */
  isDisabled?: (date: Date) => boolean;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  isDisabled,
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        className={cn(
          "flex h-11 w-full items-center gap-2.5 rounded-xl border border-hairline bg-white px-3 text-left transition-colors",
          "focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/40",
          open && "border-coral ring-2 ring-coral/40",
        )}
      >
        <CalendarIcon className="h-4 w-4 shrink-0 text-coral/60" />
        <span
          className={cn(
            "truncate text-sm font-medium",
            value ? "text-ink" : "text-muted-soft",
          )}
        >
          {value ? format(value, "EEE, MMM d, yyyy") : placeholder}
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-2">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          disabled={isDisabled}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
