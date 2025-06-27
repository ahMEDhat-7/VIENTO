import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types/store';
import { useEffect } from "react";
import { apiClient } from "@/config/api";

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
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => string;
  getOrderById: (id: string) => Order | undefined;
  getUserOrders: (email: string) => Order[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      createOrder: (orderData) => {
        const orderId = Date.now().toString();
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          createdAt: new Date().toISOString(),
          status: 'pending',
        };
        set(state => ({
          orders: [...state.orders, newOrder]
        }));
        return orderId;
      },
      getOrderById: (id) => {
        return get().orders.find(order => order.id === id);
      },
      getUserOrders: (email) => {
        return get().orders.filter(order => order.customerInfo.email === email);
      },
      updateOrderStatus: (id, status) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === id ? { ...order, status } : order
          )
        }));
      },
    }),
    {
      name: 'order-storage',
    }
  )
);
