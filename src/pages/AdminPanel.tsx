
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProductStore } from '../stores/useProductStore';
import { useOrderStore } from '../stores/useOrderStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Package, Users, DollarSign, ShoppingBag } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const { orders } = useOrderStore();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  
  const [productForm, setProductForm] = useState({
    name: '',
    brand: 'VIENTO',
    category: 'Baseball',
    price: '',
    originalPrice: '',
    description: '',
    images: [''],
    sizes: ['One Size'],
    colors: ['Black'],
    stock: '',
  });

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handleAddProduct = () => {
    if (!productForm.name || !productForm.price) {
      toast({
        title: "Please fill required fields",
        description: "Name and price are required",
        variant: "destructive",
      });
      return;
    }

    addProduct({
      name: productForm.name,
      brand: productForm.brand,
      category: productForm.category,
      price: parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined,
      description: productForm.description,
      images: productForm.images.filter(img => img.trim() !== ''),
      sizes: productForm.sizes,
      colors: productForm.colors,
      stock: productForm.stock ? parseInt(productForm.stock) : 0,
    });

    setProductForm({
      name: '',
      brand: 'VIENTO',
      category: 'Baseball',
      price: '',
      originalPrice: '',
      description: '',
      images: [''],
      sizes: ['One Size'],
      colors: ['Black'],
      stock: '',
    });
    setShowAddProduct(false);
    
    toast({
      title: "Product added",
      description: "Product has been added successfully",
    });
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    toast({
      title: "Product deleted",
      description: "Product has been deleted successfully",
    });
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Panel</h1>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: DollarSign },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === id
                  ? 'bg-amber-500 text-black'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
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
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Products Management</h2>
              <Button
                onClick={() => setShowAddProduct(true)}
                className="bg-amber-500 hover:bg-amber-600 text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Add Product Form */}
            {showAddProduct && (
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Add New Product</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={productForm.category}
                      onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      <option value="Baseball">Baseball</option>
                      <option value="Snapback">Snapback</option>
                      <option value="Bucket">Bucket</option>
                      <option value="Beanie">Beanie</option>
                      <option value="Trucker">Trucker</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={productForm.stock}
                      onChange={(e) => setProductForm(prev => ({ ...prev, stock: e.target.value }))}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full h-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="images">Image URL</Label>
                    <Input
                      id="images"
                      value={productForm.images[0]}
                      onChange={(e) => setProductForm(prev => ({ ...prev, images: [e.target.value] }))}
                      className="bg-gray-700 border-gray-600"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
                    Add Product
                  </Button>
                  <Button onClick={() => setShowAddProduct(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                  <p className="text-amber-400 font-bold mb-2">${product.price}</p>
                  <p className="text-gray-400 text-sm mb-4">Stock: {product.stock || 0}</p>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-400 border-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
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
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
