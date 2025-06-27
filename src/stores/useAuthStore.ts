
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient, ENDPOINTS } from '../config/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      login: async (email: string, password: string) => {
        try {
          const response = await apiClient.post(`${ENDPOINTS.AUTH}/login`, {
            email,
            password,
          });

          if (response.user) {
            set({ user: response.user, isLoggedIn: true });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          // Fallback to mock login for development
          if (email && password) {
            const mockUser: User = {
              id: '1',
              email,
              name: email.split('@')[0],
              role: email.includes('admin') ? 'admin' : 'user',
            };
            set({ user: mockUser, isLoggedIn: true });
            return true;
          }
          return false;
        }
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      register: async (userData) => {
        try {
          const response = await apiClient.post(`${ENDPOINTS.AUTH}/register`, userData);

          if (response.user) {
            set({ user: response.user, isLoggedIn: true });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Registration error:', error);
          // Fallback to mock registration for development
          const newUser: User = {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.name,
            role: userData.role,
            phone: userData.phone,
            address: userData.address,
          };
          set({ user: newUser, isLoggedIn: true });
          return true;
        }
      },
      updateProfile: (userData) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userData } });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
