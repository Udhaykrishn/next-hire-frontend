"use client";

import { Check, ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  Dialog,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from "@/components/animate-ui/components/headless/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface MultiSelectFieldProps {
  options: string[];
  selected: string[];
  onChange: (vals: string[]) => void;
  placeholder: string;
  label: string;
  id?: string;
}

export const MultiSelectField = ({
  options,
  selected,
  onChange,
  placeholder,
  label,
  id,
}: MultiSelectFieldProps) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (val: string) => {
    const newSelected = selected.includes(val)
      ? selected.filter((s) => s !== val)
      : […selected, val];
    onChange(newSelected);
  };

  return (
    <div className="gap-y-3" id={id}>
      <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
        {label}
      </Label>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "w-full h-14 px-5 bg-white border border-gray-100 rounded-2xl flex items-center justify-between transition-all hover:border-wise-green/50 shadow-sm outline-none focus:ring-2 focus:ring-wise-green/10",
          selected.length > 0
            ? "border-wise-green ring-2 ring-wise-green/5"
            : "",
        )}
      >
        <div className="flex flex-wrap gap-2 items-center">
          {selected.length > 0 ? (
            selected.map((val) => (
              <span
                key={val}
                className="px-3 py-1 bg-wise-green/10 text-dark-green text-xs font-black rounded-lg animate-in zoom-in-95"
              >
                {val}
              </span>
            ))
          ) : (
            <span className="text-gray-400 font-medium text-sm">
              {placeholder}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <div className="size-8 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-wise-green/10 group-hover:text-wise-green transition-all">
            <Plus className="size-4" />
          </div>
          <ChevronDown className="size-4" />
        </div>
      </button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogPanel className="max-w-md p-0 overflow-hidden animate-in zoom-in-95 duration-200">
          <DialogHeader className="p-8 bg-gray-50/50 border-b border-gray-100">
            <DialogTitle className="text-2xl font-black text-near-black tracking-tight uppercase">
              {label}
            </DialogTitle>
          </DialogHeader>
          <Command className="border-none">
            <div className="px-4 py-3 border-b border-gray-50">
              <CommandInput
                placeholder={`Search ${label.toLowerCase()}…`}
                className="h-12 border-none focus:ring-0 font-medium"
              />
            </div>
            <CommandList className="max-h-[300px] p-2 custom-scrollbar">
              <CommandEmpty className="py-8 text-center text-gray-400 font-medium italic">
                No results found.
              </CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    onSelect={() => toggleOption(option)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors data-[selected=true]:bg-gray-50"
                  >
                    <span
                      className={cn(
                        "font-bold transition-all",
                        selected.includes(option)
                          ? "text-near-black translate-x-1"
                          : "text-gray-500",
                      )}
                    >
                      {option}
                    </span>
                    {selected.includes(option) && (
                      <div className="size-6 bg-wise-green rounded-lg flex items-center justify-center animate-in zoom-in-50">
                        <Check className="size-3.5 text-dark-green stroke-[3px]" />
                      </div>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-end">
            <Button
              onClick={() => setOpen(false)}
              className="bg-wise-green text-dark-green rounded-2xl px-10 h-12 text-sm font-black hover:bg-wise-green/90 transition-all active:scale-95 shadow-lg shadow-wise-green/20"
            >
              Apply Selection
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};
