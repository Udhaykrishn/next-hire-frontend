"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "@untitledui/icons";
import type { PropsWithChildren, ReactNode } from "react";
import { Fragment, useState } from "react";
import type {
  CalendarProps as AriaCalendarProps,
  DateValue,
} from "react-aria-components";
import {
  Calendar as AriaCalendar,
  CalendarContext as AriaCalendarContext,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridBody as AriaCalendarGridBody,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  Heading as AriaHeading,
  useSlottedContext,
} from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { InputDateBase } from "@/components/base/input/input-date";
import { cx } from "@/lib/utils/cx";
import { CalendarCell } from "./cell";

export const CalendarContextProvider = ({ children }: PropsWithChildren) => {
  const [value, onChange] = useState<DateValue | null>(null);
  const [focusedValue, onFocusChange] = useState<DateValue | undefined>();

  return (
    <AriaCalendarContext.Provider
      // @ts-expect-error - React Aria Types mismatch
      value={{ value, onChange, focusedValue, onFocusChange }}
    >
      {children}
    </AriaCalendarContext.Provider>
  );
};

interface CalendarProps extends AriaCalendarProps<DateValue> {
  /** The dates to highlight. */
  highlightedDates?: DateValue[];
  /**
   * The content to render between the header and the calendar grid.
   * If not provided, a default layout will be rendered with a date input and a today button.
   */
  children?: ReactNode;
}

export const Calendar = ({
  highlightedDates,
  className,
  children,
  ...props
}: CalendarProps) => {
  const context = useSlottedContext(AriaCalendarContext);

  const ContextWrapper = context ? Fragment : CalendarContextProvider;

  return (
    <ContextWrapper>
      <AriaCalendar
        {...props}
        className={(state) =>
          cx(
            "flex flex-col gap-4",
            typeof className === "function" ? className(state) : className,
          )
        }
      >
        {({ state }) => (
          <>
            <header className="flex items-center justify-between px-1">
              <AriaHeading className="text-[16px] font-black text-gray-900" />
              <div className="flex gap-1.5">
                <Button
                  slot="previous"
                  iconLeading={ChevronLeft}
                  size="xs"
                  color="tertiary"
                  className="size-8 rounded-lg hover:bg-gray-50 border border-gray-100 shadow-sm"
                />
                <Button
                  slot="next"
                  iconLeading={ChevronRight}
                  size="xs"
                  color="tertiary"
                  className="size-8 rounded-lg hover:bg-gray-50 border border-gray-100 shadow-sm"
                />
              </div>
            </header>

            {children || (
              <div className="flex gap-2 bg-gray-50/80 p-1.5 rounded-xl border border-gray-100/50 backdrop-blur-sm">
                <InputDateBase
                  aria-label="Date"
                  size="sm"
                  wrapperClassName="bg-white border-none shadow-none h-9 px-2.5"
                  className="flex-1"
                />
                <Button
                  slot={null}
                  size="sm"
                  className="h-9 bg-wise-green text-dark-green font-black rounded-lg px-4 hover:opacity-90 transition-all shadow-sm border-none text-[12px]"
                  onClick={() => {
                    state.setValue(today(getLocalTimeZone()));
                    state.setFocusedDate(today(getLocalTimeZone()));
                  }}
                >
                  Today
                </Button>
              </div>
            )}

            <AriaCalendarGrid weekdayStyle="short" className="w-full">
              <AriaCalendarGridHeader>
                {(day) => (
                  <AriaCalendarHeaderCell className="p-0 pb-2">
                    <div className="flex size-8 items-center justify-center text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      {day.slice(0, 2)}
                    </div>
                  </AriaCalendarHeaderCell>
                )}
              </AriaCalendarGridHeader>
              <AriaCalendarGridBody className="[&_td]:p-0">
                {(date) => (
                  <CalendarCell
                    date={date}
                    isHighlighted={highlightedDates?.some(
                      (highlightedDate) => date.compare(highlightedDate) === 0,
                    )}
                  />
                )}
              </AriaCalendarGridBody>
            </AriaCalendarGrid>
          </>
        )}
      </AriaCalendar>
    </ContextWrapper>
  );
};
