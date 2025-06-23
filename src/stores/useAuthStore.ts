
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        // Mock login logic
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
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      register: async (userData) => {
        // Mock registration logic
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
