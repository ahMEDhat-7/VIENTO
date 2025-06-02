
import React from 'react';
import { useAppSelector } from '../hooks/useRedux';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';

const Wishlist: React.FC = () => {
  const wishlistItems = useAppSelector(state => state.wishlist.items);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Wishlist</h1>
          <p className="text-gray-600">Items you've saved for later</p>
        </div>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600">Start adding items you love to your wishlist</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <ProductCard key={item.product.id} product={item.product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
