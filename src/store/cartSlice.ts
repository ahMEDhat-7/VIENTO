
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../types/store';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; size: string; color: string; quantity?: number }>) => {
      const { product, size, color, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(item => 
        `${item.product.id}-${item.selectedSize}-${item.selectedColor}` === action.payload
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => 
        `${item.product.id}-${item.selectedSize}-${item.selectedColor}` === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
