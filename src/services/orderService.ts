<<<<<<< HEAD
import axios from 'axios';

const API_BASE_URL = 'http://localhost:7000/api';

export const getOrders = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const getOrderById = async (id: string, token: string) => {
  const response = await axios.get(`${API_BASE_URL}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const createOrder = async (orderData: any, token: string) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const updateOrder = async (id: string, updates: any, token: string) => {
  const response = await axios.patch(`${API_BASE_URL}/orders/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const deleteOrder = async (id: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
}; 
=======
import { apiClient, ENDPOINTS } from '../config/api';
import { Order, CartItem } from '../types/store';

export interface CreateOrderData {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
}

export const orderService = {
  async createOrder(orderData: CreateOrderData): Promise<{ id: string }> {
    const response = await apiClient.post(ENDPOINTS.ORDERS, orderData);
    return response;
  },

  async getOrders(): Promise<Order[]> {
    const response = await apiClient.get(ENDPOINTS.ORDERS);
    return response;
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const response = await apiClient.get(`${ENDPOINTS.ORDERS}/user/${userId}`);
    return response;
  },

  async getOrderById(id: string): Promise<Order> {
    const response = await apiClient.get(`${ENDPOINTS.ORDERS}/${id}`);
    return response;
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<void> {
    await apiClient.patch(`${ENDPOINTS.ORDERS}/${id}/status`, { status });
  },

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const response = await apiClient.patch(`${ENDPOINTS.ORDERS}/${id}`, updates);
    return response;
  },

  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.ORDERS}/${id}`);
  },

  async getOrderStats(): Promise<OrderStats> {
    const response = await apiClient.get(`${ENDPOINTS.ORDERS}/stats`);
    return response;
  }
};
>>>>>>> 355ed09395a87d6545bc2e077d7df0b70152b5a0
