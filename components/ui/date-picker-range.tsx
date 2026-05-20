"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerWithRangeProps {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
  className?: string;
  label?: string;
}

export function DatePickerWithRange({
  date,
  onDateChange,
  className,
  label,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      {label && (
        <Label className="text-[14px] font-black text-near-black">
          {label}
        </Label>
      )}
      <Popover>
        <PopoverTrigger
          render={
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "h-14 w-full justify-start text-left font-bold rounded-xl border-gray-200 bg-white",
                !date && "text-gray-400",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-wise-green" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
