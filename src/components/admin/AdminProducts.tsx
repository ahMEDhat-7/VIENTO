
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProductStore } from '../../stores/useProductStore';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload, X } from 'lucide-react';

const AdminProducts: React.FC = () => {
  const { toast } = useToast();
  const { products, addProduct, deleteProduct } = useProductStore();
  
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  const [productForm, setProductForm] = useState({
    name: '',
    brand: 'VIENTO',
    categoryId: 'cat-1',
    price: '',
    description: '',
    images: [''],
    variants: [{ color: 'Black', size: 'One Size', stock: 0 }],
    stock: '',
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setUploadedImages(prev => [...prev, result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddProduct = () => {
    if (!productForm.name || !productForm.price) {
      toast({
        title: "Please fill required fields",
        description: "Name and price are required",
        variant: "destructive",
      });
      return;
    }

    const now = new Date().toISOString();
    const allImages = [
      ...uploadedImages,
      ...productForm.images.filter(img => img.trim() !== '')
    ];

    addProduct({
      name: productForm.name,
      brand: productForm.brand,
      categoryId: productForm.categoryId,
      price: parseFloat(productForm.price),
      description: productForm.description,
      images: allImages,
      variants: productForm.variants,
      stock: productForm.stock ? parseInt(productForm.stock) : 0,
      tags: [],
      isAvailable: true,
      analytics: {
        views: 0,
        purchases: 0,
        averageRating: 0,
        ratingsCount: 0,
      },
      seo: {
        slug: productForm.name.toLowerCase().replace(/\s+/g, '-'),
        metaTitle: productForm.name,
        metaDescription: productForm.description
      },
      createdAt: now,
      updatedAt: now
    });

    // Reset form
    setProductForm({
      name: '',
      brand: 'VIENTO',
      categoryId: 'cat-1',
      price: '',
      description: '',
      images: [''],
      variants: [{ color: 'Black', size: 'One Size', stock: 0 }],
      stock: '',
    });
    setUploadedImages([]);
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
              <Label htmlFor="categoryId">Category</Label>
              <select
                id="categoryId"
                value={productForm.categoryId}
                onChange={(e) => setProductForm(prev => ({ ...prev, categoryId: e.target.value }))}
                className="w-full h-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              >
                <option value="cat-1">Baseball Caps</option>
                <option value="cat-2">Snapbacks</option>
                <option value="cat-3">Bucket Hats</option>
                <option value="cat-4">Beanies</option>
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
            
            <div className="md:col-span-2 space-y-4">
              <Label>Product Images</Label>
              
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline" className="flex items-center gap-2" asChild>
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4" />
                    Upload Images
                  </label>
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <span className="text-sm text-gray-400">or enter URLs below</span>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => removeUploadedImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div>
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
