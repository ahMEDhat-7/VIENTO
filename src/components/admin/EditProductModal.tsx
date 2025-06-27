
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Product, ProductVariant } from '../../types/store';
import { useProductsStore } from '../../stores/useProductsStore';

interface EditProductModalProps {
  product: Product;
  onUpdate: (product: Product) => void;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onUpdate, onClose }) => {
  const { categories, brands } = useProductsStore();
  
  const [formData, setFormData] = useState({
    name: product.name,
    brand: product.brand,
    categoryId: product.categoryId,
    price: product.price.toString(),
    description: product.description,
    images: product.images.join(', '),
    variants: [...product.variants],
    isAvailable: product.isAvailable
  });

  const [newVariant, setNewVariant] = useState({ color: '', size: '', stock: '' });

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const availableColors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Gray', 'Navy', 'Brown'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const totalStock = formData.variants.reduce((sum, variant) => sum + variant.stock, 0);

    const updatedProduct: Product = {
      ...product,
      name: formData.name,
      brand: formData.brand,
      categoryId: formData.categoryId,
      price: parseFloat(formData.price),
      description: formData.description,
      images: formData.images.split(',').map(url => url.trim()),
      variants: formData.variants,
      stock: totalStock,
      isAvailable: formData.isAvailable,
      updatedAt: new Date().toISOString()
    };

    onUpdate(updatedProduct);
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
            <Label htmlFor="edit-images">Images (comma separated URLs)</Label>
            <Input
              id="edit-images"
              value={formData.images}
              onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value }))}
            />
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
              id="edit-isAvailable"
              checked={formData.isAvailable}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAvailable: checked as boolean }))}
            />
            <Label htmlFor="edit-isAvailable">Available for sale</Label>
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
