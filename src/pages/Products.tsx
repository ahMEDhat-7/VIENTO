
import React from 'react';
import { useAppSelector } from '../hooks/useRedux';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const products = useAppSelector(state => state.products.filteredProducts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4 animate-fade-in">
            All Products
          </h1>
          <p className="text-gray-300 text-lg animate-fade-in animation-delay-300">
            Discover our complete collection of caps and hats
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-4 rounded-full animate-fade-in animation-delay-500"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in hover-lift transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-12 border border-gray-700 max-w-md mx-auto">
              <div className="text-6xl mb-6">🧢</div>
              <h3 className="text-2xl font-semibold text-white mb-4">No products found</h3>
              <p className="text-gray-300">Try adjusting your filters or search terms</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
