import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: string | number | undefined | null): string {
  if (!amount) return "0";
  const rawString = String(amount).replace(/\D/g, "");
  if (!rawString) return "0";
  const num = Number(rawString);
  return isNaN(num) ? "0" : num.toLocaleString("en-IN");
}
