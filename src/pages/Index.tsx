
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';

const Index: React.FC = () => {
  const categories = ['Baseball', 'Snapback', 'Bucket', 'Beanie', 'Trucker'];

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      {/* Enhanced Hero Section with Cool Effects */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-1000"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 border-2 border-white rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-32 left-32 w-24 h-24 border-2 border-purple-300 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 transform rotate-12 animate-bounce"></div>
        </div>

        <div 
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1200)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="max-w-4xl text-center mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse-glow">
                  VIENTO
                </span>
              </h1>
              <p className="text-2xl md:text-3xl mb-12 text-gray-200 animate-fade-in animation-delay-500 leading-relaxed">
                Experience the wind of style with our premium collection of caps and hats
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in animation-delay-1000">
                <Link to="/products">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/50">
                    Explore Collection
                    <ChevronRight className="ml-3 w-6 h-6" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 transform hover:scale-110 transition-all duration-500 px-8 py-4 text-lg shadow-2xl hover:shadow-white/30">
                  Discover More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section with Enhanced Animations */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Shop by Category
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-300 leading-relaxed">
              Discover the perfect style for every moment. From classic baseball caps to trendy bucket hats.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-8 rounded-full animate-fade-in animation-delay-500"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group text-center p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:bg-gradient-to-br hover:from-blue-100 hover:to-purple-100 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-200/50 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-500 group-hover:rotate-12">
                  <span className="text-3xl transform group-hover:scale-125 transition-transform duration-500">🧢</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-500">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-3000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-fade-in hover:scale-110 transition-all duration-500 group">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <Truck className="w-10 h-10 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Free Shipping</h3>
              <p className="text-gray-600 text-lg">Free shipping on all orders over $50</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-200 hover:scale-110 transition-all duration-500 group">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <RefreshCw className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Easy Returns</h3>
              <p className="text-gray-600 text-lg">30-day return policy for all items</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-400 hover:scale-110 transition-all duration-500 group">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <Shield className="w-10 h-10 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Quality Guarantee</h3>
              <p className="text-gray-600 text-lg">100% authentic products guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/60 to-purple-600/60 animate-pulse"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-float animation-delay-2000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6 animate-fade-in">
            Ride the <span className="text-cyan-300">Wind</span> with Us
          </h2>
          <p className="text-2xl mb-12 text-blue-100 animate-fade-in animation-delay-300 leading-relaxed max-w-3xl mx-auto">
            Get the latest updates on new arrivals, exclusive deals, and style tips delivered with the speed of wind.
          </p>
          <form className="max-w-lg mx-auto flex gap-6 animate-fade-in animation-delay-600">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/20 backdrop-blur-md text-white placeholder-blue-200 border-white/30 focus:bg-white/30 focus:border-cyan-300 transition-all duration-500 py-4 px-6 text-lg"
            />
            <Button variant="secondary" className="hover:scale-110 transition-all duration-500 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-white/30">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
