import type { PricingPlan } from "@/types/pricing";
import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { pricingService } from "./pricing.service";

// We use `bun:test` but mock setTimeout to resolve immediately for faster tests.
// This is safe since this test only checks the logic and return values.
const originalSetTimeout = global.setTimeout;

describe("pricingService", () => {
  beforeEach(() => {
    // Override setTimeout to resolve immediately
    global.setTimeout = ((fn: Function) =>
      fn()) as unknown as typeof setTimeout;
  });

  afterEach(() => {
    // Restore original setTimeout
    global.setTimeout = originalSetTimeout;
  });

  describe("getPlans", () => {
    it("should return an array of pricing plans after a delay", async () => {
      const plans = await pricingService.getPlans();

      expect(Array.isArray(plans)).toBe(true);
      expect(plans.length).toBe(3);
      expect(plans[0].id).toBe("P001");
      expect(plans[1].id).toBe("P002");
      expect(plans[2].id).toBe("P003");
    });
  });

  describe("createPlan", () => {
    it("should create a new plan with default subscribers and status", async () => {
      const newPlanData: Omit<PricingPlan, "id" | "subscribers" | "status"> = {
        name: "Enterprise",
        type: "recruiter",
        price: "9999",
        period: "/mo",
        iconType: "crown",
        features: ["Unlimited everything"],
        cta: "Contact Us",
        highlight: true,
        description: "Custom enterprise plan",
      };

      const plan = await pricingService.createPlan(newPlanData);

      expect(plan.name).toBe("Enterprise");
      expect(plan.id).toMatch(/^P\d{1,3}$/);
      expect(plan.subscribers).toBe(0);
      expect(plan.status).toBe("Active");
    });
  });

  describe("updatePlan", () => {
    it("should return the updated plan with the same id", async () => {
      const updateData = { name: "Candidate Pro Plus", price: "599" };
      const plan = await pricingService.updatePlan("P001", updateData);

      expect(plan.id).toBe("P001");
      expect(plan.name).toBe("Candidate Pro Plus");
      expect(plan.price).toBe("599");
    });
  });

  describe("deletePlan", () => {
    it("should resolve successfully", async () => {
      await expect(pricingService.deletePlan("P001")).resolves.toBeUndefined();
    });
  });
});
