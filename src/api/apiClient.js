// src/config/axiosConfig.js
import axios from "axios";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Only access localStorage in browser environment
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log("API Request:", config.method.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log("API Response:", response.status, response.config.url);
    }
    
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login (only in browser)
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          break;
        case 403:
          console.error("Forbidden:", data.message);
          break;
        case 404:
          console.error("Not Found:", data.message);
          break;
        case 500:
          console.error("Server Error:", data.message);
          break;
        default:
          console.error("API Error:", data.message || "Something went wrong");
      }
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error: No response from server");
    } else {
      // Error setting up request
      console.error("Request Error:", error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;