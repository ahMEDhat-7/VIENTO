
import { create } from 'zustand';
import { Product, Category } from '../types/store';

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

const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Baseball Caps',
    slug: 'baseball-caps',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat-2',
    name: 'Snapbacks',
    slug: 'snapbacks',
    image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400',
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat-3',
    name: 'Bucket Hats',
    slug: 'bucket-hats',
    image: 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=400',
    createdAt: new Date().toISOString()
  },
  {
    id: 'cat-4',
    name: 'Beanies',
    slug: 'beanies',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400',
    createdAt: new Date().toISOString()
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Baseball Cap',
    description: 'A classic baseball cap perfect for everyday wear. Made with premium cotton.',
    price: 29.99,
    categoryId: 'cat-1',
    brand: 'VIENTO',
    tags: ['classic', 'cotton', 'adjustable'],
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400'],
    stock: 50,
    variants: [
      { color: 'Black', size: 'One Size', stock: 20 },
      { color: 'White', size: 'One Size', stock: 15 },
      { color: 'Navy', size: 'One Size', stock: 15 }
    ],
    isAvailable: true,
    discount: {
      percent: 25,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    analytics: {
      views: 245,
      purchases: 89,
      averageRating: 4.5,
      ratingsCount: 125,
      lastViewedAt: new Date().toISOString(),
      lastPurchasedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    seo: {
      slug: 'classic-baseball-cap',
      metaTitle: 'Classic Baseball Cap - VIENTO',
      metaDescription: 'Premium cotton baseball cap perfect for everyday wear'
    },
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Premium Snapback',
    description: 'High-quality snapback with premium materials and adjustable fit.',
    price: 49.99,
    categoryId: 'cat-2',
    brand: 'VIENTO',
    tags: ['premium', 'snapback', 'adjustable'],
    images: ['https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400'],
    stock: 30,
    variants: [
      { color: 'Black', size: 'One Size', stock: 10 },
      { color: 'Gray', size: 'One Size', stock: 12 },
      { color: 'Red', size: 'One Size', stock: 8 }
    ],
    isAvailable: true,
    analytics: {
      views: 189,
      purchases: 56,
      averageRating: 4.8,
      ratingsCount: 89,
      lastViewedAt: new Date().toISOString(),
      lastPurchasedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    seo: {
      slug: 'premium-snapback',
      metaTitle: 'Premium Snapback - VIENTO',
      metaDescription: 'High-quality snapback with premium materials'
    },
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const useProductStore = create<ProductsState>((set, get) => ({
  products: mockProducts,
  filteredProducts: mockProducts,
  categories: mockCategories,
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
      seo: {
        slug: productData.name.toLowerCase().replace(/\s+/g, '-'),
        metaTitle: productData.name,
        metaDescription: productData.description
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
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
        filtered.sort((a, b) => b.analytics.averageRating - a.analytics.averageRating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'views':
        filtered.sort((a, b) => b.analytics.views - a.analytics.views);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    set({ filteredProducts: filtered });
  },
}));
