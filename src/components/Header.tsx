
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { toggleCart } from '../store/cartSlice';
import { logout } from '../store/userSlice';
import { setFilters, applyFilters } from '../store/productsSlice';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Search, ShoppingCart, User, Heart, LogOut, Moon, Sun } from 'lucide-react';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const cartItems = useAppSelector(state => state.cart.items);
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const { isAuthenticated, currentUser } = useAppSelector(state => state.user);
  
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isAdmin = isAuthenticated && currentUser?.email === 'admin@viento.com';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(setFilters({ search: searchQuery.trim() }));
      dispatch(applyFilters());
      navigate('/products');
      console.log('Search for:', searchQuery);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-black/95 backdrop-blur-md shadow-2xl border-b border-gray-800 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative w-16 h-16 overflow-hidden rounded-full">
              <img 
                src="/lovable-uploads/466f019a-95c3-4fd5-b3e1-f2ac215565b6.png" 
                alt="Logo" 
                className="w-full h-full object-cover filter brightness-110 group-hover:brightness-125 transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse rounded-full"></div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-amber-300 transition-all duration-300 hover:scale-110 relative group text-lg font-medium">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/products" className="text-gray-300 hover:text-amber-300 transition-all duration-300 hover:scale-110 relative group text-lg font-medium">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/categories" className="text-gray-300 hover:text-amber-300 transition-all duration-300 hover:scale-110 relative group text-lg font-medium">
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-amber-300 transition-all duration-300 hover:scale-110 relative group text-lg font-medium">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-300 hover:text-amber-300 transition-all duration-300 hover:scale-110 relative group text-lg font-medium">
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
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

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 text-gray-400 hover:text-amber-300 transition-all duration-300 hover:scale-110 group relative"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-3 text-gray-400 hover:text-amber-300 transition-all duration-300 hover:scale-110 group">
              <Heart className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {wishlistItems.length}
                </span>
              )}
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-red-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>

            {/* Cart */}
            <button
              onClick={() => dispatch(toggleCart())}
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

            {/* User */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/dashboard" className="p-3 text-gray-400 hover:text-amber-300 transition-all duration-300 hover:scale-110 group relative">
                  <User className="w-6 h-6" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-3 text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110 group relative"
                >
                  <LogOut className="w-6 h-6" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-3 text-gray-400 hover:text-amber-300 transition-all duration-300 hover:scale-110 group relative">
                <User className="w-6 h-6" />
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
