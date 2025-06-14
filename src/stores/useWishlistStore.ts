
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, WishlistItem } from '../types/store';

interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (product) => {
        const { items } = get();
        const exists = items.find(item => item.product.id === product.id);
        if (!exists) {
          set({ items: [...items, { product }] });
        }
      },
      removeFromWishlist: (productId) => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId)
        }));
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
