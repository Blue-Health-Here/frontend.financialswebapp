import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { store } from "@/store/store"; // Import Redux store

// Define the base API instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define the admin-specific API instance
export const axiosAdmin: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies (if needed) are sent with requests
});

// Request Interceptor to attach Authorization token
axiosAdmin.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState(); // Get Redux state
    const token: string | null = state.auth?.token; // Retrieve token from Redux store

    if (!token) {
      return Promise.reject(new Error("Unauthorized: No token found"));
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
