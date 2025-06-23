
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProductStore } from '../stores/useProductStore';
import { useCartStore } from '../stores/useCartStore';
import { useToast } from '@/hooks/use-toast';
import { Star, Plus, Minus, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getProductById } = useProductStore();
  const { addToCart } = useCartStore();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = id ? getProductById(id) : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products')} variant="outline">
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  React.useEffect(() => {
    if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    if (product.colors.length > 0) setSelectedColor(product.colors[0]);
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Please select size and color before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product, selectedSize, selectedColor, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} added to cart`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/products')}
          className="mb-6 text-gray-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-amber-500' : 'border-gray-700'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <p className="text-gray-400 text-lg">{product.brand}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-amber-400">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.stock && product.stock > 0 && (
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  In Stock ({product.stock})
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-gray-300 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Size</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === size
                        ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                        : 'border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedColor === color
                        ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                        : 'border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-semibold text-lg w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>

            {/* Product Features */}
            <div className="border-t border-gray-700 pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Truck className="w-5 h-5 text-amber-400" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Shield className="w-5 h-5 text-amber-400" />
                <span>1-year warranty included</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <RotateCcw className="w-5 h-5 text-amber-400" />
                <span>30-day easy returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section Placeholder */}
        <div className="mt-16 border-t border-gray-700 pt-16">
          <h2 className="text-2xl font-bold text-white mb-8">Customer Reviews</h2>
          <div className="bg-gray-800/50 p-8 rounded-lg text-center">
            <p className="text-gray-400">Reviews coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
