import type { PricingPlan } from "@/types/pricing";

export const pricingService = {
  getPlans: async (): Promise<PricingPlan[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return [
      {
        id: "P001",
        name: "Candidate Pro",
        type: "candidate",
        price: "499",
        period: "/mo",
        subscribers: 1240,
        status: "Active",
        iconType: "zap",
        features: ["Unlimited Applications", "AI Resume Boost", "Priority DM"],
        cta: "Upgrade to Pro",
        highlight: true,
        description: "Accelerate your career with advanced AI insights.",
      },
      {
        id: "P002",
        name: "Recruiter Basic",
        type: "recruiter",
        price: "0",
        period: "Free",
        subscribers: 5620,
        status: "Active",
        iconType: "shield",
        features: ["2 Active Jobs", "Standard Matching"],
        cta: "Get Started",
        highlight: false,
        description: "Standard job posting for small teams.",
      },
      {
        id: "P003",
        name: "Recruiter Premium",
        type: "recruiter",
        price: "2499",
        period: "/mo",
        subscribers: 842,
        status: "Active",
        iconType: "crown",
        features: ["10 Active Jobs", "Featured Posts", "Advanced AI"],
        cta: "Go Premium",
        highlight: true,
        description: "High-performance hiring with AI calling agent.",
      },
    ];
  },

  createPlan: async (
    plan: Omit<PricingPlan, "id" | "subscribers" | "status">,
  ): Promise<PricingPlan> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      ...plan,
      id: `P${Math.floor(Math.random() * 1000)}`,
      subscribers: 0,
      status: "Active",
    };
  },

  updatePlan: async (
    id: string,
    plan: Partial<PricingPlan>,
  ): Promise<PricingPlan> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { id, ...plan } as PricingPlan;
  },

  deletePlan: async (_id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
  },
};
