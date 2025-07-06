<<<<<<< HEAD
import axios from 'axios';

const API_BASE_URL = 'http://localhost:7000/api';

export const getCart = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const addToCart = async (item: any, token: string) => {
  const response = await axios.post(`${API_BASE_URL}/cart`, item, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const updateCart = async (item: any, token: string) => {
  const response = await axios.patch(`${API_BASE_URL}/cart`, item, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const removeFromCart = async (itemId: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/cart/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
}; 
=======
import { apiClient, ENDPOINTS } from '../config/api';
import { CartItem } from '../types/store';

export interface CartData {
  userId: string;
  items: CartItem[];
}

export const cartService = {
  async getCart(): Promise<CartItem[]> {
    const response = await apiClient.get(ENDPOINTS.CART);
    return response;
  },

  async getUserCart(userId: string): Promise<CartItem[]> {
    const response = await apiClient.get(`${ENDPOINTS.CART}/user/${userId}`);
    return response;
  },

  async addToCart(productId: string, quantity: number): Promise<void> {
    await apiClient.post(`${ENDPOINTS.CART}/add-item?productId=${productId}&quantity=${quantity}`, {});
  },

  async removeFromCart(productId: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.CART}/remove-item?productId=${productId}`);
  },

  async updateCart(cartId: string, items: CartItem[]): Promise<void> {
    await apiClient.patch(`${ENDPOINTS.CART}/${cartId}`, { items });
  },

  async clearCart(cartId: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.CART}/${cartId}`);
  },

  async syncCart(cartData: CartData): Promise<void> {
    await apiClient.post(ENDPOINTS.CART, cartData);
  }
};
>>>>>>> 355ed09395a87d6545bc2e077d7df0b70152b5a0
