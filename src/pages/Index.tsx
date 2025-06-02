
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const categories = ['Baseball', 'Snapback', 'Bucket', 'Beanie', 'Trucker'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white text-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Rounded Logo */}
            <div className="mb-8">
              <img 
                src="/lovable-uploads/466f019a-95c3-4fd5-b3e1-f2ac215565b6.png" 
                alt="VIENTO Logo" 
                className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-amber-200 shadow-lg"
              />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                VIENTO
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
              Experience the wind of style with our premium collection of caps and hats
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                  Explore Collection
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white">
                Discover Legacy
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Shop by Category
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the perfect style for every moment. From classic baseball caps to trendy bucket hats.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group text-center p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                  <span className="text-2xl">🧢</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-amber-600">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over $50</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-amber-400 rounded-full flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-600">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy for all items</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-600">Quality Guarantee</h3>
              <p className="text-gray-600">100% authentic products guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-amber-100 to-orange-100 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Stay in the <span className="text-amber-700">Loop</span>
          </h2>
          <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">
            Get the latest updates on new arrivals, exclusive deals, and style tips.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white text-gray-900 placeholder-gray-500 border-amber-300 focus:border-amber-500"
            />
            <Button className="bg-amber-500 text-white hover:bg-amber-600">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
