
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '../stores/useAuthStore';
import { useOrderStore } from '../stores/useOrderStore';
import { useToast } from '@/hooks/use-toast';
import { User, Package, LogOut, Edit, Save, X } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const { user, updateProfile, logout } = useAuthStore();
  const { getUserOrders } = useOrderStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const orders = user ? getUserOrders(user.email) : [];

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'processing': return 'text-blue-400';
      case 'shipped': return 'text-purple-400';
      case 'delivered': return 'text-green-400';
      case 'cancelled': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please log in to access your dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
          <Button
            onClick={logout}
            variant="outline"
            className="text-red-400 border-red-400 hover:bg-red-500/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </h2>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button
                      onClick={handleSaveProfile}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      size="sm"
                      variant="outline"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-700 border-gray-600"
                    />
                  ) : (
                    <p className="text-gray-300 mt-1">{user.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-gray-700 border-gray-600"
                    />
                  ) : (
                    <p className="text-gray-300 mt-1">{user.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-gray-700 border-gray-600"
                    />
                  ) : (
                    <p className="text-gray-300 mt-1">{user.phone || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={editForm.address}
                      onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                      className="bg-gray-700 border-gray-600"
                    />
                  ) : (
                    <p className="text-gray-300 mt-1">{user.address || 'Not provided'}</p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    Role: <span className="text-amber-400 capitalize">{user.role}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Order History
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No orders found</p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold">Order #{order.id}</h3>
                          <p className="text-sm text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-400 font-bold">${order.total.toFixed(2)}</p>
                          <p className={`text-sm capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="text-white text-sm">{item.product.name}</p>
                              <p className="text-gray-400 text-xs">
                                {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
