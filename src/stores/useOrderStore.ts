import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Order } from '../types/store';
import { orderService, CreateOrderData } from '../services/orderService';

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  createOrder: (orderData: CreateOrderData) => Promise<string | null>;
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
          const result = await orderService.createOrder(orderData);
          
          // Note: We'll refetch orders instead of manually adding to maintain consistency
          await get().fetchOrders();
          
          return result.id;
        } catch (error) {
          set({ error: 'Failed to create order', loading: false });
          console.error('Failed to create order:', error);
          return null;
        }
      },
      fetchOrders: async () => {
        try {
          set({ loading: true, error: null });
          const fetchedOrders = await orderService.getOrders();
          set({ 
            orders: Array.isArray(fetchedOrders) ? fetchedOrders : [],
            loading: false 
          });
        } catch (error) {
          set({ 
            error: 'Failed to fetch orders',
            loading: false 
          });
        }
      },
      fetchUserOrders: async (userId) => {
        try {
          set({ loading: true, error: null });
          const userOrders = await orderService.getUserOrders(userId);
          set({ 
            orders: Array.isArray(userOrders) ? userOrders : [],
            loading: false 
          });
        } catch (error) {
          set({ 
            error: 'Failed to fetch user orders',
            loading: false 
          });
        }
      },
      getOrderById: (id) => {
        return get().orders.find(order => order.id === id);
      },
      getUserOrders: (email) => {
        return get().orders.filter(order => 
          order.customerInfo && order.customerInfo.email === email
        );
      },
      updateOrderStatus: async (id, status) => {
        try {
          set({ loading: true, error: null });
          await orderService.updateOrderStatus(id, status);
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
