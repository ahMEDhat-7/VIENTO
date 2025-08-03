import { apiClient, ENDPOINTS } from '../config/api';
import { User } from '../types/store';

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
}

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get(ENDPOINTS.USERS);
    return Array.isArray(response) ? response : [];
  },

  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get(`${ENDPOINTS.USERS}/${id}`);
    return response as User;
  },

  async createUser(userData: CreateUserData): Promise<User> {
    const response = await apiClient.post(ENDPOINTS.USERS, userData);
    return response as User;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const response = await apiClient.patch(`${ENDPOINTS.USERS}/${id}`, updates);
    return response as User;
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.USERS}/${id}`);
  }
};