
import React from 'react';
import { useOrderStore } from '../../stores/useOrderStore';
import { ShoppingBag } from 'lucide-react';

const AdminOrders: React.FC = () => {
  const { orders } = useOrderStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Orders Management</h2>
      
      {orders.length === 0 ? (
        <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">Order #{order.id}</h3>
                  <p className="text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()} • {order.customerInfo.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 font-bold text-lg">${order.total.toFixed(2)}</p>
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm capitalize">
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="text-white text-sm">{item.product.name}</p>
                          <p className="text-gray-400 text-xs">
                            {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Customer Info</h4>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>{order.customerInfo.email}</p>
                    <p>{order.customerInfo.phone}</p>
                    <p>{order.customerInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
