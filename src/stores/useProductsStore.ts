import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Category } from "../types/store";
import { apiClient, ENDPOINTS } from "../config/api";

interface ProductsState {
  products: Product[];
  categories: Category[];
  brands: string[];
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  addProduct: (
    product: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      brands: [],
      setProducts: (products) => set({ products }),
      fetchProducts: async () => {
        try {
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
        }
      },
      updateProduct: async (id, updates) => {
        try {
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
        }
      },
      deleteProduct: async (id) => {
        try {
          await apiClient.delete(`${ENDPOINTS.PRODUCT}/${id}`);
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
          }));
        } catch (error) {
          console.error("Failed to delete product:", error);
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
