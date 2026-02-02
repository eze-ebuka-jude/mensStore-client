import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchNewArrivals = async () => {
  try {
    const res = await axios.get(`${baseUrl}/v1/products/new-arrivals`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const handleFinalizeCheckout = async (checkoutId) => {
  try {
    const res = await axios.post(
      `${baseUrl}/v1/checkout/${checkoutId}/finalize`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handlePaymentSuccess = async (details, checkoutId) => {
  try {
    const res = await axios.put(
      `${baseUrl}/v1/checkout/${checkoutId}/pay`,
      { paymentStatus: "paid", paymentDetails: details },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );

    if (res.status === 200) await handleFinalizeCheckout(checkoutId);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleUpload = async (formData) => {
  try {
    const res = await axios.post(`${baseUrl}/v1/upload`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
