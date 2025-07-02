import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types/store';
import { apiClient, ENDPOINTS } from "@/config/api";

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<string | null>;
  fetchOrders: () => Promise<void>;
  fetchUserOrders: (userId: string) => Promise<void>;
  getOrderById: (id: string) => Order | undefined;
  getUserOrders: (email: string) => Order[];
  updateOrderStatus: (id: string, status: Order['status']) => Promise<boolean>;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      loading: false,
      error: null,
      createOrder: async (orderData) => {
        try {
          set({ loading: true, error: null });
          const response = await apiClient.post(ENDPOINTS.ORDERS, orderData);
          if (response?.id) {
            const newOrder: Order = {
              ...orderData,
              id: response.id,
              createdAt: new Date().toISOString(),
              status: 'pending',
            };
            set(state => ({
              orders: [...state.orders, newOrder],
              loading: false
            }));
            return response.id;
          }
          set({ loading: false });
          return null;
        } catch (error) {
          set({ error: 'Failed to create order', loading: false });
          console.error('Failed to create order:', error);
          return null;
        }
      },
      fetchOrders: async () => {
        try {
          set({ loading: true, error: null });
          const orders = await apiClient.get(ENDPOINTS.ORDERS);
          set({ orders: orders || [], loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch orders', loading: false });
          console.error('Failed to fetch orders:', error);
        }
      },
      fetchUserOrders: async (userId) => {
        try {
          set({ loading: true, error: null });
          const orders = await apiClient.get(`${ENDPOINTS.ORDERS}/user/${userId}`);
          set({ orders: orders || [], loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch user orders', loading: false });
          console.error('Failed to fetch user orders:', error);
        }
      },
      getOrderById: (id) => {
        return get().orders.find(order => order.id === id);
      },
      getUserOrders: (email) => {
        return get().orders.filter(order => order.customerInfo.email === email);
      },
      updateOrderStatus: async (id, status) => {
        try {
          set({ loading: true, error: null });
          await apiClient.patch(`${ENDPOINTS.ORDERS}/${id}/status`, { status });
          set(state => ({
            orders: state.orders.map(order =>
              order.id === id ? { ...order, status } : order
            ),
            loading: false
          }));
          return true;
        } catch (error) {
          set({ error: 'Failed to update order status', loading: false });
          console.error('Failed to update order status:', error);
          return false;
        }
      },
    }),
    {
      name: 'order-storage',
    }
  )
);
