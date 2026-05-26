import { useQuery } from "@tanstack/react-query";
import { pricingService } from "@/services/pricing.service";

export const usePricing = () => {
  return useQuery({
    queryKey: ["pricing-plans"],
    queryFn: () => pricingService.getPlans(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
