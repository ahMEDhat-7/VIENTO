<<<<<<< HEAD
import axios from 'axios';

const API_BASE_URL = 'http://localhost:7000/api';

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`, {
    withCredentials: true,
  });
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const createProduct = async (productData: any, token: string) => {
  const response = await axios.post(`${API_BASE_URL}/products`, productData, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const updateProduct = async (id: string, updates: any, token: string) => {
  const response = await axios.patch(`${API_BASE_URL}/products/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const deleteProduct = async (id: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
}; 
=======
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
    return response;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get(`${ENDPOINTS.PRODUCTS}/${id}`);
    return response;
  },

  async createProduct(productData: CreateProductData): Promise<Product> {
    const response = await apiClient.post(ENDPOINTS.PRODUCTS, productData);
    return response;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const response = await apiClient.patch(`${ENDPOINTS.PRODUCTS}/${id}`, updates);
    return response;
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.PRODUCTS}/${id}`);
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const response = await apiClient.get(`${ENDPOINTS.PRODUCTS}?categoryId=${categoryId}`);
    return response;
  },

  async searchProducts(query: string): Promise<Product[]> {
    const response = await apiClient.get(`${ENDPOINTS.PRODUCTS}?search=${query}`);
    return response;
  }
};
>>>>>>> 355ed09395a87d6545bc2e077d7df0b70152b5a0
