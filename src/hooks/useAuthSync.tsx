import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCartStore } from '../stores/useCartStore';

export const useAuthSync = () => {
  const { user, loading } = useAuth();
  const { syncWithServer, clearCart } = useCartStore();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is logged in, sync cart with server
        syncWithServer();
      } else {
        // User is logged out, clear cart
        clearCart();
      }
    }
  }, [user, loading, syncWithServer, clearCart]);
};