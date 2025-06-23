
import React, { useEffect, useState } from 'react';
import { useProductStore } from '../stores/useProductStore';
import ProductCard from '../components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const Products: React.FC = () => {
  const { 
    filteredProducts: products, 
    categories, 
    filters, 
    sortBy,
    setFilters, 
    setSortBy, 
    applyFilters, 
    searchProducts 
  } = useProductStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy, applyFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchProducts(query);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 1000,
      search: '',
      inStock: false,
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
            All Products
          </h1>
          <p className="text-gray-300 text-lg">Discover our complete collection</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12 text-lg"
            />
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-gray-700 text-gray-300"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            {(filters.category || filters.search || filters.inStock) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-red-400 text-red-400 hover:bg-red-500/20"
              >
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ category: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Min Price</label>
                <Input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ minPrice: parseInt(e.target.value) || 0 })}
                  className="bg-gray-700 border-gray-600"
                  placeholder="$0"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Max Price</label>
                <Input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ maxPrice: parseInt(e.target.value) || 1000 })}
                  className="bg-gray-700 border-gray-600"
                  placeholder="$1000"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters({ inStock: e.target.checked })}
                    className="rounded border-gray-600 bg-gray-700 text-amber-500 focus:ring-amber-500"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
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
            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700 max-w-md mx-auto">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
              <p className="text-gray-300 mb-4">Try adjusting your search or filters</p>
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
