import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types/store';
import { useCartStore } from '../../stores/useCartStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    // Use default size and color for product card quick add
    addToCart(product, 'One Size', 'Default', 1);

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount.percent / 100)
    : product.price;

  return (
    <Card className="group overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0] || product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
            {product.discount && (
              <Badge variant="destructive" className="text-xs">
                -{product.discount.percent}%
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.analytics.averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.analytics.ratingsCount})
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="font-bold text-primary">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full"
          size="sm"
          disabled={!product.isAvailable || product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;