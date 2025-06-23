
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/store';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../stores/useCartStore';
import { ShoppingCart, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  const { addToCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0], 1);
    toast({
      title: "Added to cart",
      description: `${product.name} added to cart`,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-gray-800/50 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.isTrending && (
            <span className="absolute top-2 right-2 bg-amber-500 text-black text-xs px-2 py-1 rounded-full">
              Trending
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-amber-300 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400 text-xs">({product.reviewCount})</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-amber-400">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            {product.stock !== undefined && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                product.stock > 0 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
              </span>
            )}
          </div>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
