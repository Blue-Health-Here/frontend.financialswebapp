// import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
// import { store } from "@/store/store"; // Import Redux store
// import { redirect } from "next/navigation";
// import { signOutAction } from "@/app/actions";

// // Define the base API instance
// const api: AxiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Define the admin-specific API instance
// export const axiosAdmin: AxiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request Interceptor to attach Authorization token
// axiosAdmin.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const state = store.getState(); // Get Redux state
//     const token: string | null = state.auth?.token; // Retrieve token from Redux store

//     if (!token) {
//       return Promise.reject(new Error("Unauthorized: No token found"));
//     }

//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     console.log(error, "error.message");
//     return Promise.reject(error)
//   }
// );

// // Response interceptor to catch 401 and logout
// axiosAdmin.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       signOutAction();
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { store } from "@/store/store";
import Router from "next/router"; // 👈 router for redirecting
import { logout } from "@/store/features/auth/authSlice";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { signOutAction } from "@/app/actions";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAdmin: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token
axiosAdmin.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token: string | null = state.auth?.token;
    if (!token) {
      return Promise.reject(new Error("Unauthorized: No token found"));
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Catch 401 and log out
axiosAdmin.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await signOutAction();
    }
    return Promise.reject(error);
  }
);

export default api;
