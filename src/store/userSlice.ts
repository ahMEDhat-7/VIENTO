
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Order } from '../types/store';

interface UserState {
  currentUser: User | null;
  orders: Order[];
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  orders: [],
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.orders = [];
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const { login, logout, addOrder } = userSlice.actions;
export default userSlice.reducer;
