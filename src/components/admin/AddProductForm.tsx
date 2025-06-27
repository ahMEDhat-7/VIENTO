
import React, { useState } from 'react';
import { useProductsStore } from '../../stores/useProductsStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, X } from 'lucide-react';
import { Product, ProductVariant } from '../../types/store';
import { apiClient, ENDPOINTS } from '@/config/api';

const AddProductForm: React.FC = () => {
  const { products, categories, brands, setProducts } = useProductsStore();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    categoryId: '',
    price: '',
    description: '',
    images: '',
    variants: [] as ProductVariant[],
    stock: '0',
    isAvailable: true
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [newVariant, setNewVariant] = useState({ color: '', size: '', stock: '' });

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const availableColors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Gray', 'Navy', 'Brown'];

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

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    if (newVariant.color && newVariant.size && newVariant.stock) {
      const variant: ProductVariant = {
        color: newVariant.color,
        size: newVariant.size,
        stock: parseInt(newVariant.stock)
      };
      setFormData(prev => ({ ...prev, variants: [...prev.variants, variant] }));
      setNewVariant({ color: '', size: '', stock: '' });
    }
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine uploaded images with URL images
    const allImages = [
      ...uploadedImages,
      ...formData.images.split(',').map(url => url.trim()).filter(url => url)
    ];

    const totalStock = formData.variants.reduce((sum, variant) => sum + variant.stock, 0);

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      brand: formData.brand,
      categoryId: formData.categoryId,
      price: parseFloat(formData.price),
      description: formData.description,
      images: allImages,
      tags: [],
      stock: totalStock,
      variants: formData.variants,
      isAvailable: formData.isAvailable,
      analytics: {
        views: 0,
        purchases: 0,
        averageRating: 0,
        ratingsCount: 0
      },
      seo: {
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        metaTitle: formData.name,
        metaDescription: formData.description
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);

    // Reset form
    setFormData({
      name: '',
      brand: '',
      categoryId: '',
      price: '',
      description: '',
      images: '',
      variants: [],
      stock: '0',
      isAvailable: true
    });
    setUploadedImages([]);

    apiClient.post(ENDPOINTS.PRODUCTS, newProduct);
    console.log('Adding new product:', newProduct);
    alert('Product added successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select value={formData.brand} onValueChange={(value) => setFormData(prev => ({ ...prev, brand: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="categoryId">Category</Label>
              <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
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
              <span className="text-sm text-gray-500">or enter URLs below</span>
            </div>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <Label htmlFor="images">Or enter Image URLs (comma separated)</Label>
              <Input
                id="images"
                value={formData.images}
                onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value }))}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
            </div>
          </div>

          {/* Product Variants Section */}
          <div className="space-y-4">
            <Label>Product Variants</Label>

            <div className="grid grid-cols-4 gap-2">
              <Select value={newVariant.color} onValueChange={(value) => setNewVariant(prev => ({ ...prev, color: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  {availableColors.map(color => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={newVariant.size} onValueChange={(value) => setNewVariant(prev => ({ ...prev, size: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {availableSizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Stock"
                value={newVariant.stock}
                onChange={(e) => setNewVariant(prev => ({ ...prev, stock: e.target.value }))}
              />

              <Button type="button" onClick={addVariant}>Add</Button>
            </div>

            {formData.variants.length > 0 && (
              <div className="space-y-2">
                {formData.variants.map((variant, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span>{variant.color} - {variant.size} (Stock: {variant.stock})</span>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeVariant(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAvailable"
              checked={formData.isAvailable}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAvailable: checked as boolean }))}
            />
            <Label htmlFor="isAvailable">Available for sale</Label>
          </div>

          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
