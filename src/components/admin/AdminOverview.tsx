
import React from 'react';
import { useOrderStore } from '../../stores/useOrderStore';
import { useProductStore } from '../../stores/useProductStore';
import { DollarSign, ShoppingBag, Package } from 'lucide-react';

const AdminOverview: React.FC = () => {
  const { orders } = useOrderStore();
  const { products } = useProductStore();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-white">{totalOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Package className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-white">{totalProducts}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-400">No orders yet</p>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                <div>
                  <p className="text-white font-medium">Order #{order.id}</p>
                  <p className="text-gray-400 text-sm">{order.customerInfo.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 font-bold">${order.total.toFixed(2)}</p>
                  <p className="text-gray-400 text-sm capitalize">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
