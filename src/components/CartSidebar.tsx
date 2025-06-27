
import React from 'react';
import { useCartStore } from '../stores/useCartStore';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

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
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const itemId = `${item.productId}-${item.selectedSize}-${item.selectedColor}`;
                  const product = item.product;
                  
                  if (!product) return null;
                  
                  return (
                    <div key={itemId} className="flex items-center space-x-4 bg-muted/50 p-3 rounded-lg">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ${product.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.selectedSize} • {item.selectedColor}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(itemId, item.quantity - 1)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(itemId, item.quantity + 1)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-border px-4 py-6">
              <div className="flex justify-between text-base font-medium text-foreground mb-4">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
