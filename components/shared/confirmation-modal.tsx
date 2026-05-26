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
      icon: <AlertTriangle className="size-8 text-red-600" />,
      bg: "bg-red-50",
      button: "bg-red-600 hover:bg-red-700 text-white shadow-red-200",
      titleColor: "text-red-900",
    },
    danger: {
      icon: <AlertTriangle className="size-8 text-red-600" />,
      bg: "bg-red-50",
      button: "bg-red-600 hover:bg-red-700 text-white shadow-red-200",
      titleColor: "text-red-900",
    },
    success: {
      icon: <CheckCircle2 className="size-8 text-wise-green" />,
      bg: "bg-wise-green/10",
      button:
        "bg-wise-green text-dark-green hover:bg-wise-green/90 shadow-wise-green/20",
      titleColor: "text-near-black",
    },
    info: {
      icon: <Info className="size-8 text-blue-600" />,
      bg: "bg-blue-50",
      button: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200",
      titleColor: "text-blue-900",
    },
  };

  const currentVariant = variants[variant] || variants.info;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogPanel className="max-w-md">
        <div className="flex flex-col items-center text-center space-y-6">
          <div
            className={cn(
              "size-20 rounded-3xl flex items-center justify-center",
              currentVariant.bg,
            )}
          >
            {currentVariant.icon}
          </div>

          <DialogHeader className="space-y-2">
            <DialogTitle
              className={cn(
                "text-2xl font-black tracking-tight",
                currentVariant.titleColor,
              )}
            >
              {title}
            </DialogTitle>
            <DialogDescription className="text-gray-500 font-medium italic leading-relaxed">
              {description}
            </DialogDescription>
            {children && (
              <div className="pt-4 text-left w-full">{children}</div>
            )}
          </DialogHeader>

          <DialogFooter className="w-full flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-14 rounded-2xl text-gray-500 font-black uppercase tracking-wider hover:bg-gray-100"
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              className={cn(
                "flex-1 h-14 rounded-2xl font-black uppercase tracking-wider shadow-lg transition-all active:scale-95",
                currentVariant.button,
              )}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : confirmText}
            </Button>
          </DialogFooter>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
