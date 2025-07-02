import { create } from 'zustand';
import { Product, Category } from '../types/store';
import { useEffect } from 'react';

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  categories: Category[];
  filters: {
    categoryId: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
    search: string;
    inStock: boolean;
    tags: string[];
  };
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating' | 'name' | 'views';
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setFilters: (filters: Partial<ProductsState['filters']>) => void;
  setSortBy: (sortBy: ProductsState['sortBy']) => void;
  applyFilters: () => void;
  searchProducts: (query: string) => void;
  getProductById: (id: string) => Product | undefined;
  incrementViews: (id: string) => void;
}

export const useProductStore = create<ProductsState>((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  filters: {
    categoryId: '',
    brand: '',
    minPrice: 0,
    maxPrice: 1000,
    search: '',
    inStock: false,
    tags: [],
  },
  sortBy: 'newest',
  setProducts: (products) => set({ products, filteredProducts: products }),
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      analytics: {
        views: 0,
        purchases: 0,
        averageRating: 0,
        ratingsCount: 0,
      },
    };
    set(state => ({
      products: [...state.products, newProduct],
      filteredProducts: [...state.filteredProducts, newProduct]
    }));
  },
  updateProduct: (id, updates) => {
    set(state => ({
      products: state.products.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p),
      filteredProducts: state.filteredProducts.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p)
    }));
  },
  deleteProduct: (id) => {
    set(state => ({
      products: state.products.filter(p => p.id !== id),
      filteredProducts: state.filteredProducts.filter(p => p.id !== id)
    }));
  },
  setFilters: (newFilters) => set(state => ({
    filters: { ...state.filters, ...newFilters }
  })),
  setSortBy: (sortBy) => set({ sortBy }),
  searchProducts: (query) => {
    set(state => ({ filters: { ...state.filters, search: query } }));
    get().applyFilters();
  },
  getProductById: (id) => {
    return get().products.find(p => p.id === id);
  },
  incrementViews: (id) => {
    const product = get().products.find(p => p.id === id);
    if (product) {
      get().updateProduct(id, {
        analytics: {
          ...product.analytics,
          views: product.analytics.views + 1,
          lastViewedAt: new Date().toISOString()
        }
      });
    }
  },
  applyFilters: () => {
    const { products, filters, sortBy } = get();
    let filtered = [...products];

    if (filters.categoryId) {
      filtered = filtered.filter(p => p.categoryId === filters.categoryId);
    }
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    if (filters.search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }
    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0 && p.isAvailable);
    }
    if (filters.tags.length > 0) {
      filtered = filtered.filter(p =>
        filters.tags.some(tag => p.tags.includes(tag))
      );
    }
    filtered = filtered.filter(p =>
      p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.analytics.ratingsCount - a.analytics.ratingsCount);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'views':
        filtered.sort((a, b) => b.analytics.views - a.analytics.views);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }

    set({ filteredProducts: filtered });
  },
}));
