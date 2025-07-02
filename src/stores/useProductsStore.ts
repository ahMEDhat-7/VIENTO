import { create } from 'zustand';
import { persist } from 'zustand/middleware';
<<<<<<< HEAD
import { Product, Category } from "../types/store";
=======
import { Product, Category } from '../types/store';
>>>>>>> bf781a570c3647afcbd000b47a734a251de5a479
import { apiClient, ENDPOINTS } from "../config/api";

interface ProductsState {
  products: Product[];
  categories: Category[];
  brands: string[];
  loading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
<<<<<<< HEAD
  fetchProducts: () => Promise<void>;
  addProduct: (
    product: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
=======
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  fetchProducts: () => Promise<void>;
>>>>>>> bf781a570c3647afcbd000b47a734a251de5a479
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
<<<<<<< HEAD
          const data = await apiClient.get(ENDPOINTS.PRODUCTS);
          set({ products: data });
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      },
      addProduct: async (product) => {
        try {
          const newProduct = await apiClient.post(ENDPOINTS.PRODUCTS, product);
          set((state) => ({
            products: [...state.products, newProduct],
          }));
        } catch (error) {
          console.error("Failed to add product:", error);
=======
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
>>>>>>> bf781a570c3647afcbd000b47a734a251de5a479
        }
      },
      updateProduct: async (id, updates) => {
        try {
<<<<<<< HEAD
          const updatedProduct = await apiClient.patch(
            `${ENDPOINTS.PRODUCT}/${id}`,
            updates
          );
          set((state) => ({
            products: state.products.map((p) =>
              p.id === id ? updatedProduct : p
            ),
          }));
        } catch (error) {
          console.error("Failed to update product:", error);
=======
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
>>>>>>> bf781a570c3647afcbd000b47a734a251de5a479
        }
      },
      deleteProduct: async (id) => {
        try {
<<<<<<< HEAD
          await apiClient.delete(`${ENDPOINTS.PRODUCT}/${id}`);
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
          }));
        } catch (error) {
          console.error("Failed to delete product:", error);
=======
          set({ loading: true, error: null });
          await apiClient.delete(`${ENDPOINTS.PRODUCTS}/${id}`);
          await get().fetchProducts(); // Refresh products list
          set({ loading: false });
          return true;
        } catch (error) {
          set({ error: 'Failed to delete product', loading: false });
          console.error('Failed to delete product:', error);
          return false;
>>>>>>> bf781a570c3647afcbd000b47a734a251de5a479
        }
      },
      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
      },
    }),
    {
      name: "products-storage",
    }
  )
);
