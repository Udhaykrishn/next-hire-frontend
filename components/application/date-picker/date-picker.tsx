"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { useControlledState } from "@react-stately/utils";
import { Calendar as CalendarIcon } from "@untitledui/icons";
import { useDateFormatter } from "react-aria";
import type {
  DatePickerProps as AriaDatePickerProps,
  DateValue,
} from "react-aria-components";
import {
  DatePicker as AriaDatePicker,
  Dialog as AriaDialog,
  Group as AriaGroup,
  Popover as AriaPopover,
} from "react-aria-components";
import { Button, type ButtonProps } from "@/components/base/buttons/button";
import { cx } from "@/lib/utils/cx";
import { Calendar } from "./calendar";

const highlightedDates = [today(getLocalTimeZone())];

interface DatePickerProps extends AriaDatePickerProps<DateValue> {
  /** The function to call when the apply button is clicked. */
  onApply?: () => void;
  /** The function to call when the cancel button is clicked. */
  onCancel?: () => void;
  size?: ButtonProps["size"];
}

export const DatePicker = ({
  value: valueProp,
  defaultValue,
  onChange,
  onApply,
  onCancel,
  size = "sm",
  ...props
}: DatePickerProps) => {
  const formatter = useDateFormatter({
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const [value, setValue] = useControlledState(
    valueProp,
    defaultValue || null,
    onChange,
  );

  const formattedDate = value
    ? formatter.format(value.toDate(getLocalTimeZone()))
    : "Select date";

  return (
    <AriaDatePicker
      aria-label="Date picker"
      shouldCloseOnSelect={false}
      {...props}
      value={value}
      onChange={setValue}
    >
      <AriaGroup className="w-full">
        <Button
          size={size}
          color="tertiary"
          iconLeading={CalendarIcon}
          className="w-full h-11 bg-gray-50 rounded-xl border border-gray-100 px-4 text-[14px] font-bold hover:bg-gray-100/50 justify-start transition-all"
        >
          {formattedDate}
        </Button>
      </AriaGroup>
      <AriaPopover
        offset={8}
        placement="bottom right"
        className={({ isEntering, isExiting }) =>
          cx(
            "origin-(--trigger-anchor-point) will-change-transform z-50",
            isEntering &&
              "duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
            isExiting &&
              "duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
          )
        }
      >
        <AriaDialog
          aria-label="Date picker"
          className="rounded-2xl bg-white shadow-2xl ring-1 ring-gray-100 border border-gray-100 overflow-hidden outline-none"
        >
          {({ close }) => (
            <>
              <div className="flex px-5 py-4 bg-white">
                <Calendar highlightedDates={highlightedDates} />
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-gray-50 p-3 bg-gray-50/50">
                <Button
                  size="sm"
                  color="tertiary"
                  className="bg-white border border-gray-200 hover:bg-gray-50 rounded-lg font-bold h-9"
                  onClick={() => {
                    onCancel?.();
                    close();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-wise-green text-dark-green hover:opacity-90 rounded-lg font-bold h-9"
                  onClick={() => {
                    onApply?.();
                    close();
                  }}
                >
                  Apply
                </Button>
              </div>
            </>
          )}
        </AriaDialog>
      </AriaPopover>
    </AriaDatePicker>
  );
};
