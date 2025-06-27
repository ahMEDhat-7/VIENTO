import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Category } from '../types/store';
import { useEffect } from "react";
import { apiClient } from "../config/api";

interface ProductsState {
  products: Product[];
  categories: Category[];
  brands: string[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      brands: [],
      setProducts: (products) => set({ products }),
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set(state => ({ products: [...state.products, newProduct] }));
      },
      updateProduct: (id, updates) => {
        set(state => ({
          products: state.products.map(p =>
            p.id === id
              ? { ...p, ...updates, updatedAt: new Date().toISOString() }
              : p
          )
        }));
      },
      deleteProduct: (id) => {
        set(state => ({
          products: state.products.filter(p => p.id !== id)
        }));
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
