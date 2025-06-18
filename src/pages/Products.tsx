
import React from 'react';
import { useProductsStore } from '../stores/useProductsStore';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const { filteredProducts: products } = useProductsStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
            All Products
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700 max-w-md mx-auto">
              <div className="text-4xl mb-4">🧢</div>
              <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
              <p className="text-gray-300">Check back soon for new items</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
