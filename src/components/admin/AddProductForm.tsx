import React, { useState } from "react";
import { useProductsStore } from "../../stores/useProductsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Product, ProductVariant } from "../../types/store";
import { apiClient, ENDPOINTS } from "@/config/api";

const AddProductForm: React.FC = () => {
  const { products, categories, brands, setProducts } = useProductsStore();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    imageUrl: "",
    stock: "",
    variants: [] as ProductVariant[],
    isAvailable: true,
  });

  const [newVariant, setNewVariant] = useState({
    color: "",
    size: "",
    stock: "",
  });

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
  const availableColors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Gray",
    "Navy",
    "Brown",
  ];

  const addVariant = () => {
    if (newVariant.color && newVariant.size && newVariant.stock) {
      const exists = formData.variants.some(
        (v) => v.color === newVariant.color && v.size === newVariant.size
      );
      if (!exists) {
        const variant: ProductVariant = {
          color: newVariant.color,
          size: newVariant.size,
          stock: parseInt(newVariant.stock),
        };
        setFormData((prev) => ({
          ...prev,
          variants: [...prev.variants, variant],
        }));
        setNewVariant({ color: "", size: "", stock: "" });
      }
    }
  };

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const totalStock = parseInt(formData.stock) || 0;

    // Only include fields required by CreateProductDto
    const newProductDto = {
      name: formData.name,
      brand: formData.brand,
      price: parseFloat(formData.price),
      description: formData.description,
      imageUrl: formData.imageUrl,
      stock: totalStock,
      variants: formData.variants,
      isAvailable: formData.isAvailable,
      analytics: {
        views: 0,
        purchases: 0,
        averageRating: 0, // Not in DTO, but kept for compatibility
        ratingsCount: 0,
      },
    };

    // Send only the DTO to the backend
    const createdProduct = await apiClient.post(
      ENDPOINTS.PRODUCTS,
      newProductDto
    );
    setProducts([...products, createdProduct]);

    setFormData({
      name: "",
      brand: "",
      price: "",
      description: "",
      imageUrl: "",
      stock: "",
      variants: [],
      isAvailable: true,
    });

    alert("Product added successfully!");
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
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select
                value={formData.brand}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, brand: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
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
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="stock">Total Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, stock: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Product Variants Section */}
          <div className="space-y-4">
            <Label>Product Variants</Label>

            <div className="grid grid-cols-4 gap-2">
              <Select
                value={newVariant.color}
                onValueChange={(value) =>
                  setNewVariant((prev) => ({ ...prev, color: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  {availableColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={newVariant.size}
                onValueChange={(value) =>
                  setNewVariant((prev) => ({ ...prev, size: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {availableSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Stock"
                value={newVariant.stock}
                onChange={(e) =>
                  setNewVariant((prev) => ({ ...prev, stock: e.target.value }))
                }
              />

              <Button type="button" onClick={addVariant}>
                Add
              </Button>
            </div>

            {formData.variants.length > 0 && (
              <div className="space-y-2">
                {formData.variants.map((variant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <span>
                      {variant.color} - {variant.size} (Stock: {variant.stock})
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeVariant(index)}
                    >
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
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  isAvailable: checked as boolean,
                }))
              }
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
