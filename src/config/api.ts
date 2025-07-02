import { Product } from '@/types/store';
import axios from 'axios';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REGISTER_ADMIN: '/auth/register-admin',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  PRODUCTS: '/products',
  USERS: '/users',
  ORDERS: '/orders',
  CART: '/cart',
  REVIEWS: '/reviews',
  NOTIFICATIONS: '/notifications',
} as const;

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem('auth-storage');
    if (authData) {
      try {
        const { state } = JSON.parse(authData);
        if (state?.user?.token) {
          config.headers.Authorization = `Bearer ${state.user.token}`;
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  },

  post: async (endpoint: string, data: {}) => {
    const response = await axiosInstance.post(endpoint, data);
    console.log(response);

    return response.data;
  },

  patch: async (endpoint: string, data: {}) => {
    const response = await axiosInstance.patch(endpoint, data);
    return response.data;
  },

  delete: async (endpoint: string) => {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  },
};
