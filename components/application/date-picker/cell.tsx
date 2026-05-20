"use client";

import {
  getDayOfWeek,
  getLocalTimeZone,
  isToday,
} from "@internationalized/date";
import type { CalendarCellProps as AriaCalendarCellProps } from "react-aria-components";
import {
  CalendarCell as AriaCalendarCell,
  RangeCalendarContext,
  useLocale,
  useSlottedContext,
} from "react-aria-components";
import { cx } from "@/lib/utils/cx";

interface CalendarCellProps extends AriaCalendarCellProps {
  /** Whether the calendar is a range calendar. */
  isRangeCalendar?: boolean;
  /** Whether the cell is highlighted. */
  isHighlighted?: boolean;
  /** Whether to show out of range dates. */
  showOutOfRangeDates?: boolean;
}

export const CalendarCell = ({
  date,
  isHighlighted,
  showOutOfRangeDates = false,
  ...props
}: CalendarCellProps) => {
  const { locale } = useLocale();
  const dayOfWeek = getDayOfWeek(date, locale);
  const rangeCalendarContext = useSlottedContext(RangeCalendarContext);

  const isRangeCalendar = !!rangeCalendarContext;

  const start = rangeCalendarContext?.value?.start;
  const end = rangeCalendarContext?.value?.end;

  const _isAfterStart = start ? date.compare(start) > 0 : true;
  const _isBeforeEnd = end ? date.compare(end) < 0 : true;

  const isAfterOrOnStart = start && date.compare(start) >= 0;
  const isBeforeOrOnEnd = end && date.compare(end) <= 0;
  const isInRange = isAfterOrOnStart && isBeforeOrOnEnd;

  const lastDayOfMonth = new Date(date.year, date.month, 0).getDate();
  const _isLastDayOfMonth = date.day === lastDayOfMonth;
  const _isFirstDayOfMonth = date.day === 1;

  const isTodayDate = isToday(date, getLocalTimeZone());

  return (
    <AriaCalendarCell
      {...props}
      date={date}
      className={({
        isDisabled,
        isFocusVisible,
        isSelectionStart,
        isSelectionEnd,
        isSelected,
        isOutsideMonth,
      }) => {
        const isRoundedLeft = isSelectionStart || dayOfWeek === 0;
        const isRoundedRight = isSelectionEnd || dayOfWeek === 6;

        return cx(
          "relative size-8 focus:outline-none",
          isRoundedLeft && "rounded-l-xl",
          isRoundedRight && "rounded-r-xl",
          isInRange && isDisabled && "bg-gray-100",
          isSelected && isRangeCalendar && "bg-wise-green/30",
          isDisabled ? "pointer-events-none" : "cursor-pointer",
          isFocusVisible ? "z-10" : "z-0",
          isOutsideMonth && "opacity-20",
          isRangeCalendar && isOutsideMonth && !showOutOfRangeDates && "hidden",
        );
      }}
    >
      {({
        isDisabled,
        isFocusVisible,
        isSelectionStart,
        isSelectionEnd,
        isSelected,
        formattedDate,
      }) => {
        const markedAsSelected =
          isSelectionStart ||
          isSelectionEnd ||
          (isSelected && !isDisabled && !isRangeCalendar);

        return (
          <div
            className={cx(
              "relative flex size-full items-center justify-center rounded-xl text-[13px] font-bold transition-all",
              // Default text color
              "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              // Disabled state.
              isDisabled && "text-gray-300",
              // Focus ring
              isFocusVisible ? "ring-2 ring-wise-green ring-offset-1" : "",
              // Selected state (Using Primary Color: Wise Green)
              markedAsSelected &&
                "bg-wise-green text-dark-green hover:opacity-90 shadow-sm scale-105 z-10",
              // Today marker when not selected
              !isSelected && isTodayDate
                ? "text-wise-green bg-wise-green/10"
                : "",
            )}
          >
            {formattedDate}

            {isHighlighted && !markedAsSelected && (
              <div
                className={cx(
                  "absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-wise-green",
                  isDisabled && "opacity-50",
                )}
              />
            )}
          </div>
        );
      }}
    </AriaCalendarCell>
  );
};
