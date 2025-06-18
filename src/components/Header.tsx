
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '../stores/useCartStore';
import { useProductsStore } from '../stores/useProductsStore';
import { Search, ShoppingCart, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { items: cartItems, toggleCart } = useCartStore();
  const { setFilters, applyFilters } = useProductsStore();
  
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters({ search: searchQuery.trim() });
      applyFilters();
      navigate('/products');
      console.log('Search for:', searchQuery);
    }
  };

  return (
    <header className="bg-black/95 backdrop-blur-md shadow-2xl border-b border-gray-800 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-amber-300">
              <img
                src="../../public/favicon.ico"
                alt="Logo"
                className="w-full h-full object-cover filter brightness-100 group-hover:brightness-100 transition-all duration-500 group-hover:scale-110"
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-amber-300 transition-all duration-300 hover:scale-110 relative group text-lg font-medium"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/products"
              className="text-gray-300 hover:text-amber-300 transition-all duration-300 hover:scale-110 relative group text-lg font-medium"
            >
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/admin"
              className="text-gray-300 hover:text-amber-300 transition-all duration-300 hover:scale-110 relative group text-lg font-medium"
            >
              <Settings className="w-5 h-5" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-md mx-8"
          >
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-amber-400" />
              <Input
                type="text"
                placeholder="Search caps and hats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-800/70 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
              />
            </div>
          </form>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className="relative p-3 text-gray-400 hover:text-amber-300 transition-all duration-300 hover:scale-110 group"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce font-bold">
                  {cartItemsCount}
                </span>
              )}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
