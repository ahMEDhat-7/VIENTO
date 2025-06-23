
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useOrderStore } from '../stores/useOrderStore';
import { CheckCircle, Package, Truck, MapPin, CreditCard } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrderStore();
  
  const order = orderId ? getOrderById(orderId) : null;

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Order not found</h2>
          <Link to="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-300 mb-2">Thank you for your purchase</p>
          <p className="text-lg text-amber-400">Order #{order.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Order Details
            </h2>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.product.name}</h3>
                    <p className="text-gray-400 text-sm">{item.selectedSize} • {item.selectedColor}</p>
                    <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-amber-400 font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 mt-6 pt-4 space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{order.subtotal > 50 ? 'Free' : '$5.99'}</span>
              </div>
              <div className="border-t border-gray-600 pt-2">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Shipping Address
              </h3>
              <div className="text-gray-300">
                <p className="font-semibold">{order.customerInfo.name}</p>
                <p>{order.customerInfo.address}</p>
                <p>{order.customerInfo.phone}</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Method
              </h3>
              <p className="text-gray-300">{order.paymentMethod}</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Delivery Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Order confirmed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-400">Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-400">Shipped</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-400">Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-300">
            We'll send you a confirmation email with tracking information once your order ships.
          </p>
          <div className="space-x-4">
            <Link to="/products">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline">
                View Order History
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
