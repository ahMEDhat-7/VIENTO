
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { logout } from '../store/userSlice';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Package, MapPin, CreditCard } from 'lucide-react';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser, orders } = useAppSelector(state => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {currentUser.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <User className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Profile</h3>
              <p className="text-gray-600">Manage your account</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Orders</h3>
              <p className="text-gray-600">{orders.length} total orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Addresses</h3>
              <p className="text-gray-600">{currentUser.addresses.length} saved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-gray-900">{currentUser.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{currentUser.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="border-l-4 border-primary pl-4">
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{order.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleLogout} variant="outline">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
