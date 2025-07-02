import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Category } from '../types/store';
import { apiClient, ENDPOINTS } from "../config/api";

interface ProductsState {
  products: Product[];
  categories: Category[];
  brands: string[];
  loading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  fetchProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      brands: [],
      loading: false,
      error: null,
      setProducts: (products) => set({ products }),
      fetchProducts: async () => {
        try {
          set({ loading: true, error: null });
          const products = await apiClient.get(ENDPOINTS.PRODUCTS);
          set({ products, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch products', loading: false });
          console.error('Failed to fetch products:', error);
        }
      },
      addProduct: async (productData) => {
        try {
          set({ loading: true, error: null });
          const response = await apiClient.post(ENDPOINTS.PRODUCTS, productData);
          if (response) {
            await get().fetchProducts(); // Refresh products list
            set({ loading: false });
            return true;
          }
          return false;
        } catch (error) {
          set({ error: 'Failed to add product', loading: false });
          console.error('Failed to add product:', error);
          return false;
        }
      },
      updateProduct: async (id, updates) => {
        try {
          set({ loading: true, error: null });
          const response = await apiClient.patch(`${ENDPOINTS.PRODUCTS}/${id}`, updates);
          if (response) {
            await get().fetchProducts(); // Refresh products list
            set({ loading: false });
            return true;
          }
          return false;
        } catch (error) {
          set({ error: 'Failed to update product', loading: false });
          console.error('Failed to update product:', error);
          return false;
        }
      },
      deleteProduct: async (id) => {
        try {
          set({ loading: true, error: null });
          await apiClient.delete(`${ENDPOINTS.PRODUCTS}/${id}`);
          await get().fetchProducts(); // Refresh products list
          set({ loading: false });
          return true;
        } catch (error) {
          set({ error: 'Failed to delete product', loading: false });
          console.error('Failed to delete product:', error);
          return false;
        }
      },
      getProductById: (id) => {
        return get().products.find(p => p.id === id);
      },
    }),
    {
      name: 'products-storage',
    }
  )
);
