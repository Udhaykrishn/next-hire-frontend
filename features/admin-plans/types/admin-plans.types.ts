import type { PricingPlan } from "@/types/pricing";
import { z } from "zod";

export interface PlanCardProps {
  plan: PricingPlan;
  index: number;
  onToggleStatus: (
    id: string,
    status: "Active" | "Archived" | "Draft" | "Inactive",
  ) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const planFormSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  type: z.enum(["candidate", "recruiter"]),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  period: z.string().min(1, "Billing period is required"),
  description: z.string().min(1, "Description is required"),
  features: z
    .array(z.string().min(1, "Feature cannot be empty"))
    .min(1, "At least one feature is required"),
  highlight: z.boolean(),
  cta: z.string().min(1, "Call-to-Action is required"),
  iconType: z.enum(["zap", "crown", "shield"]),
});

export type PlanFormState = z.infer<typeof planFormSchema>;

export interface PlanFormProps {
  title: string;
  subtitle: string;
  defaultValues?: Partial<PlanFormState>;
  onSubmit: (data: PlanFormState) => void;
  isPending: boolean;
  cancel: () => void;
}
