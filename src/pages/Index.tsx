
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '../components/ProductCard';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setProducts } from '../store/productsSlice';
import { mockProducts } from '../data/mockProducts';
import { ChevronRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';

const Index: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  
  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const categories = ['Baseball', 'Snapback', 'Bucket', 'Beanie', 'Trucker'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div 
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1200)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Adham'sElephant
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in animation-delay-500">
                Discover premium caps and hats from top brands. Style meets comfort in our curated collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-1000">
                <Link to="/products">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                    Shop Now
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300">
                  View Collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section with animations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in animation-delay-300">
              Find the perfect style for every occasion. From classic baseball caps to trendy bucket hats.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group text-center p-6 bg-gray-50 rounded-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                  <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">🧢</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products with staggered animations */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">Trending Now</h2>
              <p className="text-gray-600 animate-fade-in animation-delay-200">The most popular caps this season</p>
            </div>
            <Link to="/products?trending=true">
              <Button variant="outline" className="hover:scale-105 transition-transform duration-300">
                View All
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard
                  product={product}
                  onClick={() => window.location.href = `/product/${product.id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals with animations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">New Arrivals</h2>
              <p className="text-gray-600 animate-fade-in animation-delay-200">Fresh styles just added to our collection</p>
            </div>
            <Link to="/products?new=true">
              <Button variant="outline" className="hover:scale-105 transition-transform duration-300">
                View All
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard
                  product={product}
                  onClick={() => window.location.href = `/product/${product.id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with enhanced animations */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over $50</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-200 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <RefreshCw className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy for all items</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-400 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">100% authentic products guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section with animated background */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/50 to-purple-600/50 animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">Stay in the Loop</h2>
          <p className="text-xl mb-8 text-blue-100 animate-fade-in animation-delay-300">
            Get the latest updates on new arrivals, exclusive deals, and style tips.
          </p>
          <form className="max-w-md mx-auto flex gap-4 animate-fade-in animation-delay-600">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/90 text-gray-900 border-0 focus:bg-white transition-all duration-300"
            />
            <Button variant="secondary" className="hover:scale-105 transition-transform duration-300">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
