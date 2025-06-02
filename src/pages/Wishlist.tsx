
import React from 'react';
import { useAppSelector } from '../hooks/useRedux';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';

const Wishlist: React.FC = () => {
  const wishlistItems = useAppSelector(state => state.wishlist.items);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
            My Wishlist
          </h1>
          <p className="text-gray-300 text-lg">Items you've saved for later</p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12 animate-fade-in animation-delay-300">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-12 border border-gray-700 max-w-md mx-auto">
              <Heart className="mx-auto h-16 w-16 text-gray-400 mb-6" />
              <h3 className="text-2xl font-medium text-white mb-4">Your wishlist is empty</h3>
              <p className="text-gray-300">Start adding items you love to your wishlist</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item, index) => (
              <div 
                key={item.product.id}
                className="animate-fade-in hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={item.product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
