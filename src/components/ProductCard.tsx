
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '../stores/useCartStore';
import { useProductsStore } from '../stores/useProductsStore';
import { ShoppingCart, Star, Eye, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  const { addToCart } = useCartStore();
  const { incrementViews } = useProductsStore();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const availableVariant = product.variants.find(v => v.stock > 0);
    if (!availableVariant) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, availableVariant.size, availableVariant.color, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} added to cart`,
    });
  };

  const handleProductClick = () => {
    incrementViews(product.id);
  };

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount.percent / 100)
    : product.price;

  const isOnSale = product.discount && new Date(product.discount.validUntil) > new Date();
  const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
  const isOutOfStock = totalStock === 0 || !product.isAvailable;

  return (
    <Link
      to={`/products/${product.id}`}
      onClick={handleProductClick}
      className="block group"
    >
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-amber-500/50 transition-all duration-300 group-hover:transform group-hover:scale-105 shadow-sm">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isOnSale && (
              <Badge className="bg-red-500 text-white">
                -{product.discount?.percent}%
              </Badge>
            )}
            {product.analytics.views > 100 && (
              <Badge className="bg-blue-500 text-white">Popular</Badge>
            )}
          </div>

          {/* Analytics overlay */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {product.analytics.views}
            </div>
            {product.analytics.purchases > 0 && (
              <div className="bg-green-600/90 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {product.analytics.purchases}
              </div>
            )}
          </div>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-amber-500 transition-colors flex-1">
              {product.name}
            </h3>
            <Badge variant="outline" className="ml-2 text-xs">
              {product.brand}
            </Badge>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.analytics.ratingsCount)
                    ? "text-amber-400 fill-current"
                    : "text-muted-foreground"
                    }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-xs">
              ({product.analytics.ratingsCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-amber-500">
                ${discountedPrice.toFixed(2)}
              </span>
              {isOnSale && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${totalStock > 10
                ? "bg-green-500/20 text-green-400"
                : totalStock > 0
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
                }`}
            >
              {totalStock > 0 ? `${totalStock} left` : "Out of stock"}
            </span>
          </div>

          {/* Variants preview */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-xs text-muted-foreground">Colors:</span>
            {[...new Set(product.variants.map((v) => v.color))]
              .slice(0, 3)
              .map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-border"
                  style={{
                    backgroundColor:
                      color.toLowerCase() === "white"
                        ? "#ffffff"
                        : color.toLowerCase() === "black"
                          ? "#000000"
                          : color.toLowerCase() === "navy"
                            ? "#001f3f"
                            : color.toLowerCase() === "gray"
                              ? "#808080"
                              : color.toLowerCase() === "red"
                                ? "#ff0000"
                                : color.toLowerCase(),
                  }}
                  title={color}
                />
              ))}
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isOutOfStock || !user}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold disabled:opacity-50"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
