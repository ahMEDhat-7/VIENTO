
import React, { useEffect, useState } from 'react';
import { useProductsStore } from '../stores/useProductsStore';
import ProductCard from '../components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const Products: React.FC = () => {
  const { products: allProducts } = useProductsStore();

  // تعريف الفلاتر
  const [filters, setFilters] = useState({
    categoryId: '',
    brand: '',
    minPrice: 0,
    maxPrice: 1000,
    search: '',
    inStock: false,
    tags: [] as string[],
  });
  const [sortBy, setSortBy] = useState('newest');
  const [categories] = useState([
    { id: '1', name: 'T-Shirts' },
    { id: '2', name: 'Hats' },
    { id: '3', name: 'Accessories' },
  ]);
  const [products, setProducts] = useState(allProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // دالة تطبيق الفلاتر
  const applyFilters = React.useCallback(() => {
    let filtered = allProducts;
    if (filters.categoryId) {
      filtered = filtered.filter(p => p.categoryId === filters.categoryId);
    }
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    // تعديل هنا: إذا كان المنتج يحتوي على stock بدلاً من inStock
    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }
    if (filters.tags.length > 0) {
      filtered = filtered.filter(p =>
        filters.tags.every(tag => p.tags?.includes(tag))
      );
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }
    if (filters.search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    // ترتيب النتائج
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      // يمكن إضافة المزيد حسب الحاجة
      default:
        break;
    }
    setProducts(filtered);
  }, [allProducts, filters, sortBy]);

  // دالة البحث
  const searchProducts = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy, applyFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchProducts(query);
  };

  const clearFilters = () => {
    setFilters({
      categoryId: '',
      brand: '',
      minPrice: 0,
      maxPrice: 1000,
      search: '',
      inStock: false,
      tags: [],
    });
    setSearchQuery('');
  };

  const removeTag = (tagToRemove: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const popularTags = ['classic', 'premium', 'cotton', 'adjustable', 'snapback'];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
            All Products
          </h1>
          <p className="text-muted-foreground text-lg">Discover our complete collection</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 bg-muted/50 border-border h-12 text-lg"
            />
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.categoryId && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {categories.find(c => c.id === filters.categoryId)?.name}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, categoryId: '' }))} />
            </Badge>
          )}
          {filters.brand && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Brand: {filters.brand}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, brand: '' }))} />
            </Badge>
          )}
          {filters.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
            </Badge>
          ))}
          {filters.inStock && (
            <Badge variant="secondary" className="flex items-center gap-1">
              In Stock Only
              <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(prev => ({ ...prev, inStock: false }))} />
            </Badge>
          )}
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-border"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>

            {(filters.categoryId || filters.search || filters.inStock || filters.tags.length > 0) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-red-400 text-red-400 hover:bg-red-500/20"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-background border border-border rounded-md px-3 py-2"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="views">Most Viewed</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-card rounded-lg p-6 border border-border mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-foreground font-medium mb-2">Category</label>
                <select
                  value={filters.categoryId}
                  onChange={(e) => setFilters(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full bg-background border border-border rounded-md px-3 py-2"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-foreground font-medium mb-2">Price Range</label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: parseInt(e.target.value) || 0 }))}
                    className="bg-background border-border"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) || 1000 }))}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="rounded border-border bg-background"
                  />
                  <span className="text-foreground">In Stock Only</span>
                </label>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="mt-6">
              <label className="block text-foreground font-medium mb-2">Popular Tags</label>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={filters.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-amber-500 hover:text-black"
                    onClick={() => {
                      const newTags = filters.tags.includes(tag)
                        ? filters.tags.filter(t => t !== tag)
                        : [...filters.tags, tag];
                      setFilters(prev => ({ ...prev, tags: newTags }));
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
            {filters.search && ` for "${filters.search}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-card rounded-lg p-8 border border-border max-w-md mx-auto">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button onClick={clearFilters} className="bg-amber-500 hover:bg-amber-600 text-black">
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
