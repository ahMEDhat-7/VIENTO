
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/store';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    userData: { name: string; email: string; password: string }
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
          const response = await authService.login({ email, password });
          if (response.user) {
            set({ user: { ...response.user, token: response.token }, isLoggedIn: true });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Login error:", error);
          return false;
        }
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      register: async (userData) => {
        try {
          const response = await authService.register({ name: userData.name, email: userData.email, password: userData.password });
          if (response.user) {
            set({ user: { ...response.user, token: response.token }, isLoggedIn: true });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Registration error:", error);
          return false;
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
