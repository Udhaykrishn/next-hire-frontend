"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxOption {
  value: string;
  /** Primary line — e.g. the job title or candidate name. */
  label: string;
  /** Secondary line that disambiguates same-named entries — e.g. company · type · location. */
  description?: string;
  /** Initial shown in the badge (first letter of the company/name). */
  avatarFallback?: string;
  /** Extra terms the search should match on beyond label + description. */
  keywords?: string[];
}

function Avatar({ option }: { option: ComboboxOption }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-coral/10 text-xs font-bold uppercase text-coral">
      {option.avatarFallback || option.label.charAt(0) || "?"}
    </span>
  );
}

function OptionText({ option }: { option: ComboboxOption }) {
  return (
    <span className="flex min-w-0 flex-col">
      <span className="truncate text-sm font-semibold leading-tight text-ink">
        {option.label}
      </span>
      {option.description ? (
        <span className="truncate text-xs leading-tight text-muted-soft">
          {option.description}
        </span>
      ) : null}
    </span>
  );
}

const triggerClasses = (open: boolean) =>
  cn(
    "flex h-11 w-full items-center gap-2.5 rounded-xl border border-hairline bg-white px-3 text-left transition-colors",
    "focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/40",
    "disabled:cursor-not-allowed disabled:opacity-50",
    open && "border-coral ring-2 ring-coral/40",
  );

const matchFilter = (
  itemValue: string,
  search: string,
  keywords?: string[],
) => {
  const haystack = `${itemValue} ${keywords?.join(" ") ?? ""}`.toLowerCase();
  return haystack.includes(search.toLowerCase()) ? 1 : 0;
};

interface SearchableComboboxProps {
  options: ComboboxOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  loading?: boolean;
  /** Show the search input. Defaults to true when there are more than 8 options. */
  searchable?: boolean;
  /** Show the initial badge next to each option. */
  showAvatar?: boolean;
}

export function SearchableCombobox({
  options,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  disabled,
  loading,
  searchable,
  showAvatar = true,
}: SearchableComboboxProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);
  const showSearch = searchable ?? options.length > 8;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        role="combobox"
        disabled={disabled}
        className={triggerClasses(open)}
      >
        {selected ? (
          <>
            {showAvatar ? <Avatar option={selected} /> : null}
            <OptionText option={selected} />
          </>
        ) : (
          <span className="truncate text-sm font-medium text-muted-soft">
            {loading ? "Loading…" : placeholder}
          </span>
        )}
        {loading ? (
          <Loader2 className="ml-auto h-4 w-4 shrink-0 animate-spin text-coral" />
        ) : (
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 text-muted-soft" />
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--anchor-width)] p-0">
        <Command filter={matchFilter}>
          {showSearch ? <CommandInput placeholder={searchPlaceholder} /> : null}
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  keywords={[
                    option.description ?? "",
                    ...(option.keywords ?? []),
                  ]}
                  onSelect={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2.5 py-2"
                >
                  {showAvatar ? <Avatar option={option} /> : null}
                  <OptionText option={option} />
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 shrink-0 text-coral",
                      option.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface MultiSelectComboboxProps {
  options: ComboboxOption[];
  values: string[];
  onValuesChange: (values: string[]) => void;
  placeholder: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  loading?: boolean;
  showAvatar?: boolean;
  /** Word used in the "N x selected" summary, e.g. "interviewer". */
  itemNoun?: string;
}

export function MultiSelectCombobox({
  options,
  values,
  onValuesChange,
  placeholder,
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  disabled,
  loading,
  showAvatar = true,
  itemNoun = "selected",
}: MultiSelectComboboxProps) {
  const [open, setOpen] = useState(false);
  const selectedSet = new Set(values);

  const toggle = (value: string) => {
    if (selectedSet.has(value)) {
      onValuesChange(values.filter((v) => v !== value));
    } else {
      onValuesChange([...values, value]);
    }
  };

  const summary =
    values.length === 0
      ? null
      : values.length === 1
        ? (options.find((o) => o.value === values[0])?.label ?? "1 selected")
        : `${values.length} ${itemNoun}${values.length > 1 ? "s" : ""} selected`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        role="combobox"
        disabled={disabled}
        className={triggerClasses(open)}
      >
        <span
          className={cn(
            "truncate text-sm font-medium",
            summary ? "text-ink" : "text-muted-soft",
          )}
        >
          {summary ?? (loading ? "Loading…" : placeholder)}
        </span>
        {loading ? (
          <Loader2 className="ml-auto h-4 w-4 shrink-0 animate-spin text-coral" />
        ) : (
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 text-muted-soft" />
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--anchor-width)] p-0">
        <Command filter={matchFilter}>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const checked = selectedSet.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    keywords={[
                      option.description ?? "",
                      ...(option.keywords ?? []),
                    ]}
                    onSelect={() => toggle(option.value)}
                    className="flex items-center gap-2.5 py-2"
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                        checked
                          ? "border-coral bg-coral text-white"
                          : "border-hairline bg-white",
                      )}
                    >
                      {checked ? <Check className="h-3 w-3" /> : null}
                    </span>
                    {showAvatar ? <Avatar option={option} /> : null}
                    <OptionText option={option} />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
