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

export const fetchBestSeller = async () => {
  try {
    const res = await axios.get(`${baseUrl}/v1/products/best-seller`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
