
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Category } from '../types/store';

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

const brands = ['Nike', 'Adidas', 'New Era', 'Mitchell & Ness', 'VIENTO', 'Patagonia'];

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      categories: mockCategories,
      brands: brands,
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
