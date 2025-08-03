import { apiClient, ENDPOINTS } from '../config/api';
import { User } from '../types/store';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return response as AuthResponse;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, {
      username: userData.name,
      email: userData.email,
      password: userData.password,
    });
    return response as AuthResponse;
  },

  async registerAdmin(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER_ADMIN, {
      username: userData.name,
      email: userData.email,
      password: userData.password,
    });
    return response as AuthResponse;
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get(ENDPOINTS.AUTH.PROFILE);
    return response as User;
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post(ENDPOINTS.AUTH.REFRESH, {});
    return response as AuthResponse;
  },

  async logout(): Promise<void> {
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT, {});
  }
};