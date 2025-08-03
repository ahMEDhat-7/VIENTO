import { apiClient, ENDPOINTS } from '../config/api';
import { Product } from '../types/store';

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  brand: string;
  categoryId: string;
  images: string[];
  imageUrl?: string;
  stock: number;
  variants: Array<{
    color: string;
    size: string;
    stock: number;
  }>;
  tags: string[];
  isAvailable: boolean;
  analytics: {
    views: number;
    purchases: number;
    averageRating: number;
    ratingsCount: number;
  };
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await apiClient.get(ENDPOINTS.PRODUCTS);
    return Array.isArray(response) ? response : [];
  },

  async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get(`${ENDPOINTS.PRODUCTS}/${id}`);
    return response as Product;
  },

  async createProduct(productData: CreateProductData): Promise<Product> {
    const response = await apiClient.post(ENDPOINTS.PRODUCTS, productData);
    return response as Product;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const response = await apiClient.patch(`${ENDPOINTS.PRODUCTS}/${id}`, updates);
    return response as Product;
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.PRODUCTS}/${id}`);
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const response = await apiClient.get(`${ENDPOINTS.PRODUCTS}?categoryId=${categoryId}`);
    return Array.isArray(response) ? response : [];
  },

  async searchProducts(query: string): Promise<Product[]> {
    const response = await apiClient.get(`${ENDPOINTS.PRODUCTS}?search=${query}`);
    return Array.isArray(response) ? response : [];
  }
};
