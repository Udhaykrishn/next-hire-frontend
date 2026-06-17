export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  iconType: "zap" | "crown" | "shield";
  features: string[];
  cta: string;
  highlight: boolean;
  type: "candidate" | "recruiter";
  status: "Active" | "Archived" | "Draft" | "Inactive";
  subscribers: number;
  stripePriceId?: string;
}
