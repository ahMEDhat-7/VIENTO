
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types/store';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
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
      addToCart: (product, size, color, quantity = 1) => {
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
              product: product, // Store product for UI display
            }]
          });
        }
      },
      removeFromCart: (id) => {
        set(state => ({
          items: state.items.filter(item => 
            `${item.productId}-${item.selectedSize}-${item.selectedColor}` !== id
          )
        }));
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set(state => ({
          items: state.items.map(item => 
            `${item.productId}-${item.selectedSize}-${item.selectedColor}` === id
              ? { ...item, quantity }
              : item
          )
        }));
      },
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      clearCart: () => set({ items: [] }),
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
