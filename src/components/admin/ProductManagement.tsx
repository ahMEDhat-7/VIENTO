import React, { useState, useEffect } from 'react';
import { useProductsStore } from '../../stores/useProductsStore';
import { apiClient, ENDPOINTS } from '../../config/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Search } from 'lucide-react';
import { Product } from '../../types/store';
import EditProductModal from './EditProductModal';

const ProductManagement: React.FC = () => {
  const { products, categories, setProducts } = useProductsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await apiClient.get(ENDPOINTS.PRODUCTS);
        setProducts(Array.isArray(products) ? products : []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, [setProducts]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Unknown';
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCategoryName(product.categoryId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiClient.delete(`${ENDPOINTS.PRODUCTS}/${productId}`);
        const products = await apiClient.get(ENDPOINTS.PRODUCTS);
        setProducts(Array.isArray(products) ? products : []);
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      await apiClient.patch(`${ENDPOINTS.PRODUCTS}/${updatedProduct.id}`, updatedProduct);
      const products = await apiClient.get(ENDPOINTS.PRODUCTS);
      setProducts(Array.isArray(products) ? products : []);
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${product.isAvailable && product.stock > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {product.isAvailable && product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onUpdate={handleUpdateProduct}
            onClose={() => setEditingProduct(null)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProductManagement;
