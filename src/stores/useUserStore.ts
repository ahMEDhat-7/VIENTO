
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Order } from '../types/store';

interface UserState {
  currentUser: User | null;
  orders: Order[];
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      orders: [],
      isAuthenticated: false,
      login: (user) => set({ currentUser: user, isAuthenticated: true }),
      logout: () => set({ currentUser: null, isAuthenticated: false, orders: [] }),
      addOrder: (order) => set(state => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: 'user-storage',
    }
  )
);
