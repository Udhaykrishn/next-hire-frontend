import type { z } from "zod";
import type { jobSchema } from "./schema";

export type JobFormData = z.infer<typeof jobSchema>;

export interface Step {
  id: number;
  label: string;
  icon: React.ReactNode;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  icon: React.ReactNode;
  badge?: string;
  features: string[];
  aiAgent: boolean;
  popular?: boolean;
}
