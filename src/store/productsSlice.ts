
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  };
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating';
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  categories: ['Baseball', 'Snapback', 'Bucket', 'Beanie', 'Trucker'],
  brands: ['Nike', 'Adidas', 'New Era', 'Mitchell & Ness', 'Patagonia'],
  filters: {
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 1000,
    sizes: [],
  },
  sortBy: 'newest',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action: PayloadAction<ProductsState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    applyFilters: (state) => {
      let filtered = [...state.products];

      if (state.filters.category) {
        filtered = filtered.filter(p => p.category === state.filters.category);
      }
      if (state.filters.brand) {
        filtered = filtered.filter(p => p.brand === state.filters.brand);
      }
      if (state.filters.sizes.length > 0) {
        filtered = filtered.filter(p => 
          p.sizes.some(size => state.filters.sizes.includes(size))
        );
      }
      filtered = filtered.filter(p => 
        p.price >= state.filters.minPrice && p.price <= state.filters.maxPrice
      );

      // Apply sorting
      switch (state.sortBy) {
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

      state.filteredProducts = filtered;
    },
  },
});

export const { setProducts, setFilters, setSortBy, applyFilters } = productsSlice.actions;
export default productsSlice.reducer;
