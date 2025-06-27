import { Product } from '@/types/store';
import axios from 'axios';

export const ENDPOINTS: {
  readonly AUTH: {
    readonly USER: string,
    readonly ADMIN: string
  };
  readonly CART: string;
  readonly PRODUCTS: string;
  readonly PRODUCT: string;
  readonly ORDERS: string;
  readonly USERS: string;
} = {
  AUTH: {
    USER: '/auth',
    ADMIN: '/auth/admin'
  },
  PRODUCTS: '/products',
  PRODUCT: '/products/:id',
  ORDERS: '/orders',
  CART: "/cart",
  USERS: '/users',

};

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  },

  post: async (endpoint: string, data: unknown) => {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  },

  patch: async (endpoint: string, data: any) => {
    const response = await axiosInstance.patch(endpoint, data);
    return response.data;
  },

  delete: async (endpoint: string) => {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  },
};
