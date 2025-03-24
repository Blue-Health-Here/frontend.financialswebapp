import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { store } from "@/store/store"; // Import Redux store (if using authentication)

export const axiosPharmacy: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add Authorization if required for client requests
axiosPharmacy.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token: string | null = state.auth?.token; // Retrieve token from Redux

    console.log("Client API Token:", token); // Debugging

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPharmacy;


