
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
    sizes: string[];
    search?: string;
  };
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating';
  setProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<ProductsState['filters']>) => void;
  setSortBy: (sortBy: ProductsState['sortBy']) => void;
  applyFilters: () => void;
}

// Sample products to get started
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Baseball Cap',
    brand: 'Nike',
    category: 'Baseball',
    price: 29.99,
    originalPrice: 39.99,
    description: 'A classic baseball cap perfect for everyday wear.',
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400'],
    sizes: ['One Size'],
    colors: ['Black', 'White', 'Navy'],
    isNew: true,
    isTrending: false,
    rating: 4.5,
    reviewCount: 125
  },
  {
    id: '2',
    name: 'Premium Snapback',
    brand: 'New Era',
    category: 'Snapback',
    price: 49.99,
    description: 'High-quality snapback with premium materials.',
    images: ['https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400'],
    sizes: ['One Size'],
    colors: ['Black', 'Gray'],
    isNew: false,
    isTrending: true,
    rating: 4.8,
    reviewCount: 89
  }
];

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: sampleProducts,
  filteredProducts: sampleProducts,
  categories: ['Baseball', 'Snapback', 'Bucket', 'Beanie', 'Trucker'],
  brands: ['Nike', 'Adidas', 'New Era', 'Mitchell & Ness', 'Patagonia'],
  filters: {
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 1000,
    sizes: [],
    search: '',
  },
  sortBy: 'newest',
  setProducts: (products) => set({ products, filteredProducts: products }),
  setFilters: (newFilters) => set(state => ({ 
    filters: { ...state.filters, ...newFilters } 
  })),
  setSortBy: (sortBy) => set({ sortBy }),
  applyFilters: () => {
    const { products, filters, sortBy } = get();
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes.some(size => filters.sizes.includes(size))
      );
    }
    if (filters.search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search!.toLowerCase())
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
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    set({ filteredProducts: filtered });
  },
}));
