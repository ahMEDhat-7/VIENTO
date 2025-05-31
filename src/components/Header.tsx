
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { toggleCart } from '../store/cartSlice';
import { logout } from '../store/userSlice';
import { Search, ShoppingCart, User, Heart, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector(state => state.cart.items);
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const { isAuthenticated, currentUser } = useAppSelector(state => state.user);
  
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isAdmin = isAuthenticated && currentUser?.email === 'admin@viento.com';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', searchQuery);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg border-b sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-xl rotate-12 group-hover:rotate-45 transition-transform duration-500"></div>
              <div className="absolute inset-1 bg-white rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">V</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              VIENTO
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-110 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-110 relative group">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-110 relative group">
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-110 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-primary transition-all duration-300 hover:scale-110 relative group">
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-blue-600" />
              <Input
                type="text"
                placeholder="Search caps and hats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110 group">
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
              className="relative p-2 text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110 group"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartItemsCount}
                </span>
              )}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>

            {/* User */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/dashboard" className="p-2 text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110 group relative">
                  <User className="w-6 h-6" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-110 group relative"
                >
                  <LogOut className="w-6 h-6" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2 text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110 group relative">
                <User className="w-6 h-6" />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
