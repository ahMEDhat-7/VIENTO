
import React from 'react';
import { Product } from '../types/store';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../stores/useCartStore';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  const { addToCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0], 1);
    toast({
      title: "Added to cart",
      description: `${product.name} added to cart`,
    });
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-amber-400">${product.price}</span>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-amber-500 hover:bg-amber-600"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
