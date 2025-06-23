
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCartStore } from '../stores/useCartStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useOrderStore } from '../stores/useOrderStore';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, MapPin, User, Phone, Mail, Lock } from 'lucide-react';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, getSubtotal, getTax, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { createOrder } = useOrderStore();

  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderId = createOrder({
      items,
      subtotal: getSubtotal(),
      tax: getTax(),
      total: getTotal() + (getSubtotal() > 50 ? 0 : 5.99),
      customerInfo,
      paymentMethod: 'Credit Card',
    });

    clearCart();
    setIsProcessing(false);
    
    toast({
      title: "Order placed successfully!",
      description: `Order #${orderId} has been placed.`,
    });

    navigate(`/order-confirmation/${orderId}`);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Customer Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  className="bg-gray-700 border-gray-600"
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="address">Shipping Address</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  required
                  className="bg-gray-700 border-gray-600"
                  placeholder="Full address including city, state, zip"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      required
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      required
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 h-fit">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center space-x-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{item.product.name}</p>
                    <p className="text-gray-400 text-xs">{item.selectedSize} • {item.selectedColor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm">×{item.quantity}</p>
                    <p className="text-amber-400 text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4 space-y-2">
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
              <div className="border-t border-gray-600 pt-2">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>${(getTotal() + (getSubtotal() > 50 ? 0 : 5.99)).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              size="lg"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>

            <div className="mt-4 flex items-center justify-center space-x-2 text-gray-400 text-sm">
              <Lock className="w-4 h-4" />
              <span>Secure checkout powered by SSL encryption</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
