
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const categories = ['Baseball', 'Snapback', 'Bucket', 'Beanie', 'Trucker'];

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Cinematic Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-white text-gray-900 overflow-hidden min-h-screen flex items-center">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-1000"></div>
        </div>
        
        {/* Cinematic Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-60 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 8}s`
              }}
            />
          ))}
        </div>

        {/* Cinematic Background with Multiple Layers */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(249,250,251,0.8), rgba(243,244,246,0.6)), url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/20 to-gray-100/80"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-10">
          <div className="max-w-6xl text-center mx-auto">
            {/* Rounded Logo Display */}
            <div className="mb-12 animate-fade-in">
              <img 
                src="/lovable-uploads/466f019a-95c3-4fd5-b3e1-f2ac215565b6.png" 
                alt="VIENTO Logo" 
                className="w-64 h-48 mx-auto object-contain filter drop-shadow-2xl animate-pulse-glow rounded-full bg-white/80 backdrop-blur-sm p-4 shadow-2xl"
              />
            </div>
            
            <h1 className="text-7xl md:text-9xl font-bold mb-8 animate-fade-in animation-delay-500">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent animate-pulse-glow text-shadow-lg">
                VIENTO
              </span>
            </h1>
            <p className="text-3xl md:text-4xl mb-16 text-gray-700 animate-fade-in animation-delay-1000 leading-relaxed font-light tracking-wide">
              Experience the wind of style with our premium collection of caps and hats
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center animate-fade-in animation-delay-1500">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transform hover:scale-110 transition-all duration-500 px-12 py-6 text-xl shadow-2xl hover:shadow-amber-500/50 border-0">
                  Explore Collection
                  <ChevronRight className="ml-4 w-7 h-7" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transform hover:scale-110 transition-all duration-500 px-12 py-6 text-xl shadow-2xl hover:shadow-amber-400/30">
                Discover Legacy
              </Button>
            </div>
          </div>
        </div>

        {/* Cinematic Vignette Effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-gray-100/40 pointer-events-none"></div>
      </section>

      {/* Categories Section with Light Feel */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-100/30 to-orange-100/30"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold text-gray-900 mb-8 animate-fade-in">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Legendary Categories
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto animate-fade-in animation-delay-300 leading-relaxed font-light">
              Discover the perfect style for every moment. From classic baseball caps to trendy bucket hats.
            </p>
            <div className="w-40 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-10 rounded-full animate-fade-in animation-delay-500"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {categories.map((category, index) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group text-center p-10 bg-white/60 backdrop-blur-sm rounded-3xl hover:bg-white/80 transition-all duration-700 transform hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/30 animate-fade-in border border-gray-200/50 hover:border-amber-500/50"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-amber-100/40 to-orange-100/40 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-200/60 group-hover:to-orange-200/60 transition-all duration-700 group-hover:rotate-12 backdrop-blur-sm">
                  <span className="text-4xl transform group-hover:scale-125 transition-transform duration-700">🧢</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 group-hover:bg-clip-text transition-all duration-700">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section - Light */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float animation-delay-3000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center animate-fade-in hover:scale-110 transition-all duration-700 group">
              <div className="relative w-32 h-32 mx-auto mb-10">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-700 backdrop-blur-sm shadow-lg">
                  <Truck className="w-12 h-12 text-amber-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Free Shipping</h3>
              <p className="text-gray-600 text-xl">Free shipping on all orders over $50</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-200 hover:scale-110 transition-all duration-700 group">
              <div className="relative w-32 h-32 mx-auto mb-10">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-amber-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-700 backdrop-blur-sm shadow-lg">
                  <RefreshCw className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">Easy Returns</h3>
              <p className="text-gray-600 text-xl">30-day return policy for all items</p>
            </div>
            <div className="text-center animate-fade-in animation-delay-400 hover:scale-110 transition-all duration-700 group">
              <div className="relative w-32 h-32 mx-auto mb-10">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-700 backdrop-blur-sm shadow-lg">
                  <Shield className="w-12 h-12 text-orange-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Quality Guarantee</h3>
              <p className="text-gray-600 text-xl">100% authentic products guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section - Light */}
      <section className="py-32 bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 text-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-50/40 to-orange-50/40 animate-pulse"></div>
          <div className="absolute top-10 right-10 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float animation-delay-2000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-6xl font-bold mb-8 animate-fade-in">
            Ride the <span className="text-amber-700">Wind</span> with Us
          </h2>
          <p className="text-3xl mb-16 text-gray-700 animate-fade-in animation-delay-300 leading-relaxed max-w-4xl mx-auto font-light">
            Get the latest updates on new arrivals, exclusive deals, and style tips delivered with the speed of wind.
          </p>
          <form className="max-w-2xl mx-auto flex gap-8 animate-fade-in animation-delay-600">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/70 backdrop-blur-md text-gray-900 placeholder-gray-500 border-amber-300/50 focus:bg-white/90 focus:border-amber-500 transition-all duration-500 py-6 px-8 text-xl rounded-xl"
            />
            <Button variant="secondary" className="hover:scale-110 transition-all duration-500 px-12 py-6 text-xl font-semibold shadow-2xl hover:shadow-amber-400/30 bg-amber-500 text-white hover:bg-amber-600 rounded-xl">
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
