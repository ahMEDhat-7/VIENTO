import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';

const CartSidebar: React.FC = () => {
  const { items, isOpen, toggleCart, removeFromCart, updateQuantity } = useCartStore();

  const total = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + (price * item.quantity);
  }, 0);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-card shadow-xl border-l border-border">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-6">
            <h2 className="text-lg font-medium text-foreground">Cart</h2>
            <button onClick={toggleCart} className="text-muted-foreground hover:text-foreground">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button onClick={toggleCart} asChild>
                  <Link to="/products">Shop Now</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const itemId = `${item.productId}-${item.selectedSize || ''}-${item.selectedColor || ''}`;
                  return (
                  <div key={itemId} className="flex items-center space-x-4 border-b border-border pb-4">
                    <img
                      src={item.product?.images?.[0] || item.product?.imageUrl}
                      alt={item.product?.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium line-clamp-1">
                        {item.product?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.product?.price?.toFixed(2)}
                      </p>
                      {item.selectedSize && (
                        <p className="text-xs text-muted-foreground">
                          Size: {item.selectedSize}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleUpdateQuantity(itemId, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Badge variant="secondary" className="px-2">
                        {item.quantity}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleUpdateQuantity(itemId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-border px-4 py-6 space-y-4">
              <div className="flex items-center justify-between text-base font-medium">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <Button className="w-full" onClick={toggleCart} asChild>
                <Link to="/checkout">Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={toggleCart} asChild>
                <Link to="/cart">View Cart</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;