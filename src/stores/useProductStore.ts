
import { create } from 'zustand';
import { Product } from '../types/store';

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  brands: string[];
  filters: {
    category: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
    search: string;
    inStock: boolean;
  };
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating' | 'name';
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setFilters: (filters: Partial<ProductsState['filters']>) => void;
  setSortBy: (sortBy: ProductsState['sortBy']) => void;
  applyFilters: () => void;
  searchProducts: (query: string) => void;
  getProductById: (id: string) => Product | undefined;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Baseball Cap',
    brand: 'VIENTO',
    category: 'Baseball',
    price: 29.99,
    originalPrice: 39.99,
    description: 'A classic baseball cap perfect for everyday wear. Made with premium cotton.',
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400'],
    sizes: ['One Size'],
    colors: ['Black', 'White', 'Navy'],
    isNew: true,
    isTrending: false,
    rating: 4.5,
    reviewCount: 125,
    stock: 50
  },
  {
    id: '2',
    name: 'Premium Snapback',
    brand: 'VIENTO',
    category: 'Snapback',
    price: 49.99,
    description: 'High-quality snapback with premium materials and adjustable fit.',
    images: ['https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400'],
    sizes: ['One Size'],
    colors: ['Black', 'Gray', 'Red'],
    isNew: false,
    isTrending: true,
    rating: 4.8,
    reviewCount: 89,
    stock: 30
  },
  {
    id: '3',
    name: 'Summer Bucket Hat',
    brand: 'VIENTO',
    category: 'Bucket',
    price: 24.99,
    description: 'Perfect for sunny days. Lightweight and comfortable bucket hat.',
    images: ['https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=400'],
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Navy', 'Olive'],
    isNew: true,
    isTrending: false,
    rating: 4.3,
    reviewCount: 67,
    stock: 45
  },
  {
    id: '4',
    name: 'Winter Beanie',
    brand: 'VIENTO',
    category: 'Beanie',
    price: 19.99,
    description: 'Warm and cozy winter beanie. Perfect for cold weather.',
    images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400'],
    sizes: ['One Size'],
    colors: ['Black', 'Gray', 'Navy', 'Red'],
    isNew: false,
    isTrending: true,
    rating: 4.6,
    reviewCount: 156,
    stock: 60
  }
];

export const useProductStore = create<ProductsState>((set, get) => ({
  products: mockProducts,
  filteredProducts: mockProducts,
  categories: ['Baseball', 'Snapback', 'Bucket', 'Beanie', 'Trucker'],
  brands: ['VIENTO'],
  filters: {
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 1000,
    search: '',
    inStock: false,
  },
  sortBy: 'newest',
  setProducts: (products) => set({ products, filteredProducts: products }),
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      rating: 0,
      reviewCount: 0,
      isNew: true,
      isTrending: false,
    };
    set(state => ({
      products: [...state.products, newProduct],
      filteredProducts: [...state.filteredProducts, newProduct]
    }));
  },
  updateProduct: (id, updates) => {
    set(state => ({
      products: state.products.map(p => p.id === id ? { ...p, ...updates } : p),
      filteredProducts: state.filteredProducts.map(p => p.id === id ? { ...p, ...updates } : p)
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
  applyFilters: () => {
    const { products, filters, sortBy } = get();
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    if (filters.search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.inStock) {
      filtered = filtered.filter(p => (p.stock || 0) > 0);
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
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    set({ filteredProducts: filtered });
  },
}));
