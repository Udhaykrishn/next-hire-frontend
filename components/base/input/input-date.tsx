"use client";

import { HelpCircle, InfoCircle } from "@untitledui/icons";
import {
  type ComponentType,
  createContext,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  useContext,
} from "react";
import type { DateInputProps as AriaDateInputProps } from "react-aria-components";
import {
  DateField as AriaDateField,
  type DateFieldProps as AriaDateFieldProps,
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
  Group as AriaGroup,
  type DateValue,
} from "react-aria-components";
import { cx, sortCx } from "@/lib/utils/cx";
import { Tooltip, TooltipTrigger } from "../tooltip/tooltip";
import { HintText } from "./hint-text";
import { Label } from "./label";

const DateFieldContext = createContext<{
  size?: "sm" | "md" | "lg";
  wrapperClassName?: string;
  iconClassName?: string;
  tooltipClassName?: string;
  inputClassName?: string;
}>({});

export interface InputDateBaseProps
  extends Omit<AriaDateInputProps, "children"> {
  /** Tooltip message on hover. */
  tooltip?: string;
  /**
   * Input size.
   * @default "sm"
   */
  size?: "sm" | "md" | "lg";
  /** Placeholder text. */
  placeholder?: string;
  /** Class name for the icon. */
  iconClassName?: string;
  /** Class name for the input wrapper. */
  wrapperClassName?: string;
  /** Class name for the tooltip. */
  tooltipClassName?: string;
  /** Keyboard shortcut to display. */
  shortcut?: string | boolean;
  ref?: Ref<HTMLInputElement>;
  groupRef?: Ref<HTMLDivElement>;
  /** Icon component to display on the left side of the input. */
  icon?: ComponentType<HTMLAttributes<HTMLOrSVGElement>>;
  isInvalid?: boolean;
  isDisabled?: boolean;
}

export const InputDateBase = ({
  tooltip,
  shortcut,
  groupRef,
  size = "md",
  isInvalid,
  isDisabled,
  icon: Icon,
  wrapperClassName,
  tooltipClassName,
  iconClassName,
  ...inputProps
}: Omit<InputDateBaseProps, "label" | "hint">) => {
  // Check if the input has a leading icon or tooltip
  const hasTrailingIcon = tooltip || isInvalid;
  const hasLeadingIcon = Icon;

  // If the input is inside a `TextFieldContext`, use its context to simplify applying styles
  const context = useContext(DateFieldContext);

  const inputSize = context?.size || size;

  const sizes = sortCx({
    sm: {
      root: cx(
        "px-3 py-2 text-sm",
        hasTrailingIcon && "pr-9",
        hasLeadingIcon && "pl-8.5",
      ),
      iconLeading: "left-3 size-4 stroke-[2.25px]",
      iconTrailing: "right-3",
      shortcut: "pr-2.5",
    },
    md: {
      root: cx(
        "px-3 py-2 text-md",
        hasTrailingIcon && "pr-9",
        hasLeadingIcon && "pl-10",
      ),
      iconLeading: "left-3 size-5",
      iconTrailing: "right-3",
      shortcut: "pr-2.5",
    },
    lg: {
      root: cx(
        "px-3.5 py-2.5 text-md",
        hasTrailingIcon && "pr-9.5",
        hasLeadingIcon && "pl-10.5",
      ),
      iconLeading: "left-3.5 size-5",
      iconTrailing: "right-3.5",
      shortcut: "pr-3",
    },
  });

  return (
    <AriaGroup
      {...{ isDisabled, isInvalid }}
      ref={groupRef}
      className={({ isFocusWithin, isDisabled, isInvalid }) =>
        cx(
          "group/input relative flex w-full flex-row place-content-center place-items-center rounded-xl bg-gray-50 border border-gray-100 transition-all duration-200 ease-in-out shadow-sm",

          isFocusWithin &&
            !isDisabled &&
            "ring-2 ring-wise-green border-wise-green bg-white",

          // Disabled state styles
          isDisabled &&
            "cursor-not-allowed opacity-50 in-data-input-wrapper:opacity-100",
          "group-disabled:cursor-not-allowed group-disabled:opacity-50 in-data-input-wrapper:group-disabled:opacity-100",

          // Invalid state styles
          isInvalid && "border-red-200 bg-red-50",
          "group-invalid:border-red-200 group-invalid:bg-red-50",

          // Invalid state with focus-within styles
          isInvalid && isFocusWithin && "ring-2 ring-red-500",
          isFocusWithin && "group-invalid:ring-2 group-invalid:ring-red-500",

          context?.wrapperClassName,
          wrapperClassName,
        )
      }
    >
      {/* Leading icon and Payment icon */}
      {Icon && (
        <Icon
          className={cx(
            "pointer-events-none absolute text-gray-400",
            sizes[inputSize].iconLeading,
            context?.iconClassName,
            iconClassName,
          )}
        />
      )}

      {/* Input field */}
      <AriaDateInput
        {...inputProps}
        className={cx(
          "flex w-full",
          sizes[size].root,
          typeof inputProps.className === "string" && inputProps.className,
        )}
      >
        {(segment) => (
          <AriaDateSegment
            segment={segment}
            className={cx(
              "rounded px-0.5 text-gray-900 tabular-nums caret-transparent focus:bg-wise-green focus:font-black focus:text-dark-green focus:outline-none",
              // The placeholder segment.
              segment.isPlaceholder && "text-gray-400 uppercase",
              // The separator "/" segment.
              segment.type === "literal" && "text-gray-400",
            )}
          />
        )}
      </AriaDateInput>

      {/* Tooltip and help icon */}
      {tooltip && (
        <Tooltip title={tooltip} placement="top">
          <TooltipTrigger
            className={cx(
              "absolute cursor-pointer text-gray-400 transition duration-200 group-invalid/input:hidden hover:text-gray-600 focus:text-gray-600",
              sizes[inputSize].iconTrailing,
              context?.tooltipClassName,
              tooltipClassName,
            )}
          >
            <HelpCircle className="size-4 stroke-[2.25px]" />
          </TooltipTrigger>
        </Tooltip>
      )}

      {/* Invalid icon */}
      <InfoCircle
        className={cx(
          "pointer-events-none absolute hidden size-4 stroke-[2.25px] text-red-500 group-invalid/input:block",
          sizes[inputSize].iconTrailing,
          context?.tooltipClassName,
          tooltipClassName,
        )}
      />

      {/* Shortcut */}
      {shortcut && (
        <div
          className={cx(
            "pointer-events-none absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-gradient-to-l from-gray-50 to-transparent to-40% pl-8",
            sizes[inputSize].shortcut,
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none rounded px-1.5 py-0.5 text-[10px] font-black text-gray-500 border border-gray-200 bg-white uppercase tracking-tighter"
          >
            {typeof shortcut === "string" ? shortcut : "⌘K"}
          </span>
        </div>
      )}
    </AriaGroup>
  );
};

interface InputProps
  extends AriaDateFieldProps<DateValue>,
    Pick<
      InputDateBaseProps,
      | "ref"
      | "size"
      | "placeholder"
      | "icon"
      | "shortcut"
      | "tooltip"
      | "groupRef"
      | "iconClassName"
      | "wrapperClassName"
      | "tooltipClassName"
    > {
  /** Label text for the input */
  label?: string;
  /** Helper text displayed below the input */
  hint?: ReactNode;
  /** Whether to hide required indicator from label */
  hideRequiredIndicator?: boolean;
  /** Class name for the input. */
  inputClassName?: string;
}

export const InputDate = ({
  size = "md",
  placeholder,
  icon: Icon,
  label,
  hint,
  shortcut,
  hideRequiredIndicator,
  className,
  ref,
  groupRef,
  tooltip,
  iconClassName,
  inputClassName,
  wrapperClassName,
  tooltipClassName,
  ...props
}: InputProps) => {
  return (
    <AriaDateField
      {...props}
      className={(state) =>
        cx(
          "group flex h-max w-full flex-col items-start justify-start gap-2",
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      {({ isInvalid, state }) => (
        <>
          {label && (
            <Label
              isRequired={
                hideRequiredIndicator
                  ? !hideRequiredIndicator
                  : state.isRequired
              }
              isInvalid={isInvalid}
              className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              {label}
            </Label>
          )}

          <InputDateBase
            className={inputClassName}
            {...{
              ref,
              groupRef,
              size,
              placeholder,
              icon: Icon,
              shortcut,
              iconClassName,
              wrapperClassName,
              tooltipClassName,
              tooltip,
            }}
          />

          {hint && (
            <HintText
              isInvalid={isInvalid}
              className={cx(size === "sm" && "text-xs", "ml-1")}
            >
              {hint}
            </HintText>
          )}
        </>
      )}
    </AriaDateField>
  );
};
