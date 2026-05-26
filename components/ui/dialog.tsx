"use client";

import { XIcon } from "lucide-react";
import * as React from "react";
import {
  DialogBackdrop as DialogBackdropPrimitive,
  DialogClose as DialogClosePrimitive,
  DialogDescription as DialogDescriptionPrimitive,
  DialogFooter as DialogFooterPrimitive,
  DialogHeader as DialogHeaderPrimitive,
  DialogPanel as DialogPanelPrimitive,
  Dialog as DialogPrimitive,
  DialogTitle as DialogTitlePrimitive,
} from "@/components/animate-ui/primitives/headless/dialog";
import { cn } from "@/lib/utils";

interface DialogProps
  extends Omit<React.ComponentProps<typeof DialogPrimitive>, "onClose"> {
  onClose?: (open: boolean) => void;
  onOpenChange?: (open: boolean) => void;
}

function Dialog({ open, onOpenChange, onClose, ...props }: DialogProps) {
  const handleClose = React.useCallback(() => {
    if (onClose) {
      onClose(false);
    } else if (onOpenChange) {
      onOpenChange(false);
    }
  }, [onClose, onOpenChange]);

  return <DialogPrimitive open={open} onClose={handleClose} {...props} />;
}

function DialogClose(props: React.ComponentProps<typeof DialogClosePrimitive>) {
  return <DialogClosePrimitive {...props} />;
}

function DialogBackdrop({
  className,
  ...props
}: React.ComponentProps<typeof DialogBackdropPrimitive>) {
  return (
    <DialogBackdropPrimitive
      className={cn(
        "fixed inset-0 z-50 bg-near-black/40 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

function DialogPanel({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPanelPrimitive> & {
  showCloseButton?: boolean;
}) {
  return (
    <>
      <DialogBackdrop />
      <DialogPanelPrimitive
        className={cn(
          "bg-white fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-[2.5rem] border border-gray-100 p-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] sm:max-w-lg outline-none",
          className,
        )}
        {...props}
      >
        {(bag) => (
          <>
            {typeof children === "function" ? children(bag) : children}
            {showCloseButton && (
              <DialogClosePrimitive className="absolute top-4 right-4 p-2 text-gray-400 hover:text-near-black hover:bg-gray-100 rounded-xl transition-all outline-none ring-offset-white focus:ring-2 focus:ring-wise-green/20">
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </DialogClosePrimitive>
            )}
          </>
        )}
      </DialogPanelPrimitive>
    </>
  );
}

function DialogHeader({
  className,
  ...props
}: React.ComponentProps<typeof DialogHeaderPrimitive>) {
  return (
    <DialogHeaderPrimitive
      className={cn("flex flex-col gap-2 text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  ...props
}: React.ComponentProps<typeof DialogFooterPrimitive>) {
  return (
    <DialogFooterPrimitive
      className={cn(
        "flex flex-col-reverse gap-3 pt-6 border-t border-gray-50 sm:flex-row sm:justify-end sm:gap-4",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitlePrimitive>) {
  return (
    <DialogTitlePrimitive
      className={cn(
        "text-2xl font-black text-near-black tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescriptionPrimitive>) {
  return (
    <DialogDescriptionPrimitive
      className={cn("text-gray-500 font-medium italic", className)}
      {...props}
    />
  );
}

// Support for legacy names
const DialogContent = DialogPanel;
const DialogOverlay = DialogBackdrop;

export {
  Dialog,
  DialogClose,
  DialogPanel,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBackdrop,
  DialogContent,
  DialogOverlay,
};
