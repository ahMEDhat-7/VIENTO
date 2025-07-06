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