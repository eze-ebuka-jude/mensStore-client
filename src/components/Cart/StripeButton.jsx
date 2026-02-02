import {
  CheckoutProvider,
  PaymentElement,
} from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
// import { useMemo } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const StripeButton = ({
  details,
  amount,
  checkoutId,
  handleFinalizeCheckout,
}) => {
  // const promise = useMemo(async() => {
  //   const res = await axios.put(`${baseUrl}/v1/checkout/pay`,  { headers: {
  //       Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  //       'Content-Type': 'application/json'
  //     }}, JSON.stringify({
  //       paymentStatus: "paid",
  //       paymentDetails: details
  //     }))
  //   // })
  //   //   .then((res) => {
  //   //     res.json()
  //   //     if(res.status === 200) {
  //   //       handleFinalizeCheckout(checkoutId)
  //   //     }
  //   //   })
  //   //   .then((data) => data.clientSecret);
  console.log(amount);
  const promise = async () => {
    try {
      const res = await axios.put(
        `${baseUrl}/v1/checkout/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (res.status === 200) {
        await handleFinalizeCheckout(checkoutId);
      } else {
        console.error(res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
