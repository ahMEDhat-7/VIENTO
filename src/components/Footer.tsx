
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl rotate-12"></div>
                <div className="absolute inset-1 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">V</span>
                </div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                VIENTO
              </span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Experience the wind of style with our premium collection of caps and hats. 
              Quality craftsmanship meets contemporary design.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <a
                href="https://facebook.com/viento"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/10 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-6 h-6 text-white group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://instagram.com/viento"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-6 h-6 text-white group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/10 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
              >
                <MessageCircle className="w-6 h-6 text-white group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 inline-block">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 inline-block">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 inline-block">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Contact
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>support@viento.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Fashion Street<br />Style City, SC 12345</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 VIENTO. All rights reserved.
          </p>
          <div className="flex space-x-6 text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
