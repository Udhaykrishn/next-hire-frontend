import { ApiStripeRoutes } from "@/constants/api-routes";
import { apiClient } from "@/lib/api-client";

export const stripeService = {
  createCheckoutSession: async (data: {
    priceId: string;
    userId: string;
    email: string;
    role: string;
  }): Promise<{ url: string }> => {
    return await apiClient.post(ApiStripeRoutes.CREATE_CHECKOUT_SESSION, data);
  },
};
