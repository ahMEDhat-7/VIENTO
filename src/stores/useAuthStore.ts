
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient, ENDPOINTS } from '../config/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    userData: Omit<User, "id"> & { password: string }
  ) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      login: async (email: string, password: string) => {
        try {
          console.log(`${ENDPOINTS.AUTH}/login`);

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
          console.error("Login error:", error);
        }
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      register: async (userData) => {
        try {
          const response = await apiClient.post(`${ENDPOINTS.AUTH}/register`, {
            username: userData.name,
            email: userData.email,
            password: userData.password,
          });

          if (response.user) {
            set({ user: response.user, isLoggedIn: true });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Registration error:", error);
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
      name: "auth-storage",
    }
  )
);
