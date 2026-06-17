import { useMutation } from "@tanstack/react-query";
import { stripeService } from "../services/stripe.api";

export const useCheckout = () => {
  return useMutation({
    mutationFn: (data: {
      priceId: string;
      userId: string;
      email: string;
      role: string;
    }) => stripeService.createCheckoutSession(data),
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      console.error("Failed to create checkout session", error);
      // You can add a toast notification here if you have a toast library configured
    },
  });
};
