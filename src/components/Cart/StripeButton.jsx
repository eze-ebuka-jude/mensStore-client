import {
  CheckoutProvider,
  PaymentElement,
} from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeButton = () => {
  const promise = useMemo(() => {
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{ clientSecret: promise }}
    >
      <PaymentElement />
    </CheckoutProvider>
  );
};

export default StripeButton;
