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
