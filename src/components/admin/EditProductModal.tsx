
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '../../types/store';

interface EditProductModalProps {
  product: Product;
  onUpdate: (product: Product) => void;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price.toString(),
    originalPrice: product.originalPrice?.toString() || '',
    description: product.description,
    images: product.images.join(', '),
    sizes: product.sizes,
    colors: product.colors,
    isNew: product.isNew || false,
    isTrending: product.isTrending || false,
    rating: product.rating.toString(),
    reviewCount: product.reviewCount.toString()
  });

  const categories = ['Baseball', 'Snapback', 'Bucket', 'Beanie', 'Trucker'];
  const brands = ['Nike', 'Adidas', 'New Era', 'Mitchell & Ness', 'Patagonia'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const availableColors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Gray', 'Navy', 'Brown'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct: Product = {
      ...product,
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      description: formData.description,
      images: formData.images.split(',').map(url => url.trim()),
      sizes: formData.sizes,
      colors: formData.colors,
      isNew: formData.isNew,
      isTrending: formData.isTrending,
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount)
    };

    onUpdate(updatedProduct);
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name">Product Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="edit-brand">Brand</Label>
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
              <Label htmlFor="edit-category">Category</Label>
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
              <Label htmlFor="edit-price">Price ($)</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label>Available Sizes</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {availableSizes.map(size => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-size-${size}`}
                    checked={formData.sizes.includes(size)}
                    onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                  />
                  <Label htmlFor={`edit-size-${size}`}>{size}</Label>
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
                    id={`edit-color-${color}`}
                    checked={formData.colors.includes(color)}
                    onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                  />
                  <Label htmlFor={`edit-color-${color}`}>{color}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-isNew"
                checked={formData.isNew}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isNew: checked as boolean }))}
              />
              <Label htmlFor="edit-isNew">Mark as New</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-isTrending"
                checked={formData.isTrending}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isTrending: checked as boolean }))}
              />
              <Label htmlFor="edit-isTrending">Mark as Trending</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Update Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
