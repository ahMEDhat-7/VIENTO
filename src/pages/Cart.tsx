
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../stores/useCartStore';
import { Plus, Minus, X, ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getSubtotal, getTax, getTotal, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          <Button variant="outline" onClick={clearCart} className="text-red-400 border-red-400">
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const itemId = `${item.product.id}-${item.selectedSize}-${item.selectedColor}`;
              return (
                <div key={itemId} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{item.product.name}</h3>
                      <p className="text-gray-400">{item.product.brand}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-400">Size: {item.selectedSize}</span>
                        <span className="text-sm text-gray-400">Color: {item.selectedColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(itemId, item.quantity - 1)}
                        className="p-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(itemId, item.quantity + 1)}
                        className="p-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-amber-400 font-bold text-lg">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-gray-400 text-sm">${item.product.price} each</p>
                    </div>

                    <button
                      onClick={() => removeFromCart(itemId)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 h-fit">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{getSubtotal() > 50 ? 'Free' : '$5.99'}</span>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>${(getTotal() + (getSubtotal() > 50 ? 0 : 5.99)).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              size="lg"
            >
              Proceed to Checkout
            </Button>

            <Link to="/products">
              <Button variant="outline" className="w-full mt-3">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
