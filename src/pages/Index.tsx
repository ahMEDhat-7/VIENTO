
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1200)',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Find Your Perfect Cap
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Discover premium caps and hats from top brands. Style meets comfort in our curated collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Shop Now
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  View Collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect style for every occasion. From classic baseball caps to trendy bucket hats.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">🧢</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending Now</h2>
              <p className="text-gray-600">The most popular caps this season</p>
            </div>
            <Link to="/products?trending=true">
              <Button variant="outline">
                View All
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => window.location.href = `/product/${product.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">New Arrivals</h2>
              <p className="text-gray-600">Fresh styles just added to our collection</p>
            </div>
            <Link to="/products?new=true">
              <Button variant="outline">
                View All
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => window.location.href = `/product/${product.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over $50</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy for all items</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">100% authentic products guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-xl mb-8 text-primary-foreground/80">
            Get the latest updates on new arrivals, exclusive deals, and style tips.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white text-gray-900"
            />
            <Button variant="secondary">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
