
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import ProductCard from '../components/ProductCard';

const Index: React.FC = () => {
  const { products } = useProductStore();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            VIENTO
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Where style meets the wind. Discover premium headwear that defines your unique character.
          </p>
          <Link to="/products">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg px-8 py-4"
            >
              Shop Now
              <ChevronRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Free Shipping</h3>
              <p className="text-gray-400">Free shipping on orders over $50</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quality Guarantee</h3>
              <p className="text-gray-400">Premium materials and craftsmanship</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-400">We're here to help anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
              Featured Products
            </h2>
            <p className="text-gray-300 text-lg">Discover our most popular styles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button variant="outline" size="lg" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                text: "The quality is outstanding. My VIENTO cap has become my go-to accessory.",
                rating: 5
              },
              {
                name: "Maria Garcia",
                text: "Fast shipping and excellent customer service. Highly recommended!",
                rating: 5
              },
              {
                name: "David Chen",
                text: "Perfect fit and style. VIENTO knows how to make great headwear.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <p className="text-amber-400 font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
          <p className="text-gray-300 mb-8">Get the latest updates on new products and exclusive offers</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            />
            <Button className="bg-amber-500 hover:bg-amber-600 text-black px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
