
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../stores/useCartStore';
import { ShoppingCart, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  const { items: cartItems, toggleCart } = useCartStore();
  const { user, logout } = useAuth();
  
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
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
          <nav className="flex items-center space-x-8">
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
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="text-gray-300 hover:text-amber-300 transition-all duration-300 hover:scale-110 relative group text-lg font-medium"
              >
                <Settings className="w-5 h-5" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          {/* Auth & Cart */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 text-sm">
                  <User className="w-4 h-4 inline mr-1" />
                  {user.name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-amber-300 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-amber-300 transition-all duration-300 text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-amber-500 text-black px-3 py-1 rounded text-sm hover:bg-amber-400 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
            
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
