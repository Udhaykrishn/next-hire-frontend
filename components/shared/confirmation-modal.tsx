"use client";

import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogTitle,
} from "@/components/animate-ui/components/headless/dialog";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "success" | "info" | "danger";
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info",
  isLoading = false,
  children,
}: ConfirmationModalProps) => {
  const variants = {
    destructive: {
      icon: <AlertTriangle className="h-6 w-6 text-destructive" />,
      bg: "bg-destructive/10",
      button: "bg-destructive text-white hover:bg-destructive/90",
    },
    danger: {
      icon: <AlertTriangle className="h-6 w-6 text-destructive" />,
      bg: "bg-destructive/10",
      button: "bg-destructive text-white hover:bg-destructive/90",
    },
    success: {
      icon: <CheckCircle2 className="h-6 w-6 text-[#2f6e44]" />,
      bg: "bg-success/10",
      button: "bg-coral text-white hover:bg-coral-active",
    },
    info: {
      icon: <Info className="h-6 w-6 text-coral" />,
      bg: "bg-coral/10",
      button: "bg-coral text-white hover:bg-coral-active",
    },
  };

  const currentVariant = variants[variant] || variants.info;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogPanel className="max-w-md">
        <div className="flex flex-col items-center space-y-5 text-center">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              currentVariant.bg,
            )}
          >
            {currentVariant.icon}
          </div>

          <DialogHeader className="space-y-1.5">
            <DialogTitle className="text-lg font-semibold tracking-tight text-ink">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-ink">
              {description}
            </DialogDescription>
            {children && (
              <div className="w-full pt-3 text-left">{children}</div>
            )}
          </DialogHeader>

          <DialogFooter className="flex w-full flex-col-reverse gap-2.5 pt-3 sm:flex-row">
            <Button
              variant="ghost"
              onClick={onClose}
              className="h-11 flex-1 rounded-lg border border-hairline bg-white text-sm font-medium text-body hover:bg-surface-soft"
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              className={cn(
                "h-11 flex-1 rounded-lg text-sm font-semibold transition-colors active:translate-y-px",
                currentVariant.button,
              )}
              disabled={isLoading}
            >
              {isLoading ? "Processing…" : confirmText}
            </Button>
          </DialogFooter>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
