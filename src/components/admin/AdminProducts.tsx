
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProductStore } from '../../stores/useProductStore';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminProducts: React.FC = () => {
  const { toast } = useToast();
  const { products, addProduct, deleteProduct } = useProductStore();
  
  const [showAddProduct, setShowAddProduct] = useState(false);
  
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
      rating: 0,
      reviewCount: 0,
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

  return (
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
  );
};

export default AdminProducts;
