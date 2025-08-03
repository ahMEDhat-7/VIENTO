
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types/store';
import { cartService } from '../services/cartService';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  toggleCart: () => void;
  clearCart: () => Promise<void>;
  syncWithServer: () => Promise<void>;
  getTotal: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      loading: false,
      addToCart: async (product, size, color, quantity = 1) => {
        try {
          set({ loading: true });
          // Add to local state first for immediate UI update
          const { items } = get();
          const existingItem = items.find(
            item => item.productId === product.id && item.selectedSize === size && item.selectedColor === color
          );

          if (existingItem) {
            set({
              items: items.map(item =>
                item.productId === product.id && item.selectedSize === size && item.selectedColor === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            });
          } else {
            set({
              items: [...items, {
                productId: product.id,
                quantity,
                selectedSize: size,
                selectedColor: color,
                product: product,
              }]
            });
          }

          // Sync with server
          try {
            await cartService.addToCart(product.id, quantity, size, color);
          } catch (error) {
            console.warn('Failed to sync cart with server:', error);
          }
          
          set({ loading: false });
        } catch (error) {
          console.error('Failed to add to cart:', error);
          set({ loading: false });
        }
      },
      removeFromCart: async (id) => {
        try {
          set({ loading: true });
          set(state => ({
            items: state.items.filter(item => 
              `${item.productId}-${item.selectedSize}-${item.selectedColor}` !== id
            )
          }));

          // Extract productId from the compound id
          const [productId, selectedSize, selectedColor] = id.split('-');
          try {
            await cartService.removeFromCart(productId, selectedSize, selectedColor);
          } catch (error) {
            console.warn('Failed to sync cart removal with server:', error);
          }
          
          set({ loading: false });
        } catch (error) {
          console.error('Failed to remove from cart:', error);
          set({ loading: false });
        }
      },
      updateQuantity: async (id, quantity) => {
        try {
          set({ loading: true });
          if (quantity <= 0) {
            await get().removeFromCart(id);
            return;
          }
          
          set(state => ({
            items: state.items.map(item => 
              `${item.productId}-${item.selectedSize}-${item.selectedColor}` === id
                ? { ...item, quantity }
                : item
            )
          }));
          set({ loading: false });
        } catch (error) {
          console.error('Failed to update cart quantity:', error);
          set({ loading: false });
        }
      },
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      clearCart: async () => {
        try {
          set({ loading: true });
          set({ items: [] });
          
          try {
            await cartService.clearCart();
          } catch (error) {
            console.warn('Failed to clear cart on server:', error);
          }
          
          set({ loading: false });
        } catch (error) {
          console.error('Failed to clear cart:', error);
          set({ loading: false });
        }
      },
      syncWithServer: async () => {
        try {
          set({ loading: true });
          const serverCart = await cartService.getCart();
          set({ 
            items: Array.isArray(serverCart) ? serverCart : [],
            loading: false 
          });
        } catch (error) {
          console.error('Failed to sync cart with server:', error);
          set({ loading: false });
        }
      },
      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.product?.price || 0;
          return total + (price * item.quantity);
        }, 0);
      },
      getTax: () => {
        return get().getSubtotal() * 0.08; // 8% tax
      },
      getTotal: () => {
        return get().getSubtotal() + get().getTax();
      },
      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
