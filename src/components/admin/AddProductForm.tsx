import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { setProducts } from '../../store/productsSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, X } from 'lucide-react';
import { Product } from '../../types/store';

const AddProductForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  const categories = useAppSelector(state => state.products.categories);
  const brands = useAppSelector(state => state.products.brands);

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    originalPrice: '',
    description: '',
    images: '',
    sizes: [] as string[],
    colors: [] as string[],
    isNew: false,
    isTrending: false,
    rating: '4.5',
    reviewCount: '0'
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine uploaded images with URL images
    const allImages = [
      ...uploadedImages,
      ...formData.images.split(',').map(url => url.trim()).filter(url => url)
    ];

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      description: formData.description,
      images: allImages,
      sizes: formData.sizes,
      colors: formData.colors,
      isNew: formData.isNew,
      isTrending: formData.isTrending,
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount)
    };

    const updatedProducts = [...products, newProduct];
    dispatch(setProducts(updatedProducts));

    // Reset form
    setFormData({
      name: '',
      brand: '',
      category: '',
      price: '',
      originalPrice: '',
      description: '',
      images: '',
      sizes: [],
      colors: [],
      isNew: false,
      isTrending: false,
      rating: '4.5',
      reviewCount: '0'
    });
    setUploadedImages([]);

    console.log('Adding new product:', newProduct);
    alert('Product added successfully!');
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, sizes: [...prev.sizes, size] }));
    } else {
      setFormData(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== size) }));
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, color] }));
    } else {
      setFormData(prev => ({ ...prev, colors: prev.colors.filter(c => c !== color) }));
    }
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
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
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

            <div>
              <Label htmlFor="originalPrice">Original Price ($) (Optional)</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
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
            
            {/* Upload Button */}
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

            {/* Display Uploaded Images */}
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

            {/* URL Input */}
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

          <div>
            <Label>Available Sizes</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {availableSizes.map(size => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={formData.sizes.includes(size)}
                    onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                  />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Available Colors</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {availableColors.map(color => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={formData.colors.includes(color)}
                    onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                  />
                  <Label htmlFor={`color-${color}`}>{color}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isNew"
                checked={formData.isNew}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isNew: checked as boolean }))}
              />
              <Label htmlFor="isNew">Mark as New</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isTrending"
                checked={formData.isTrending}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isTrending: checked as boolean }))}
              />
              <Label htmlFor="isTrending">Mark as Trending</Label>
            </div>
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
