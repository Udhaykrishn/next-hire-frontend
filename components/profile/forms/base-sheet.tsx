"use client";

import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
} from "@/components/animate-ui/primitives/radix/sheet";

interface BaseSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const BaseSheet = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}: BaseSheetProps) => (
  <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetPortal>
      <SheetOverlay className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" />
      <SheetContent
        side="right"
        className="fixed inset-y-0 right-0 z-[101] w-full max-w-2xl bg-white shadow-2xl flex flex-col border-l border-gray-100"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="p-8 md:p-10 border-b border-gray-50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">
                  {title}
                </SheetTitle>
                <SheetDescription className="text-gray-500 font-bold text-sm">
                  {description ||
                    "Fill in the details below to update your professional profile."}
                </SheetDescription>
              </div>
              <button
                type="button"
                onClick={() => onClose()}
                aria-label="Close"
                title="Close"
                className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all border border-gray-100 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-8 md:p-10 scrollbar-hide">
            {children}
          </div>
        </div>
      </SheetContent>
    </SheetPortal>
  </Sheet>
);
