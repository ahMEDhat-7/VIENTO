
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <img 
                src="/lovable-uploads/466f019a-95c3-4fd5-b3e1-f2ac215565b6.png" 
                alt="VIENTO Logo" 
                className="w-16 h-12 object-contain filter brightness-110"
              />
              <span className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                VIENTO
              </span>
            </div>
            <p className="text-gray-300 text-xl leading-relaxed mb-8 font-light">
              Experience the wind of style with our premium collection of caps and hats. 
              Quality craftsmanship meets contemporary design in every piece.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-8">
              <a
                href="https://facebook.com/viento"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gray-800/50 rounded-full hover:bg-blue-600 transition-all duration-500 transform hover:scale-110 backdrop-blur-sm border border-gray-700 hover:border-blue-500"
              >
                <Facebook className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://instagram.com/viento"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gray-800/50 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-500 transform hover:scale-110 backdrop-blur-sm border border-gray-700 hover:border-purple-500"
              >
                <Instagram className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gray-800/50 rounded-full hover:bg-green-600 transition-all duration-500 transform hover:scale-110 backdrop-blur-sm border border-gray-700 hover:border-green-500"
              >
                <MessageCircle className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 hover:scale-105 inline-block text-lg">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 hover:scale-105 inline-block text-lg">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 hover:scale-105 inline-block text-lg">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 hover:scale-105 inline-block text-lg">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Contact
            </h3>
            <div className="space-y-4 text-gray-300 text-lg">
              <p className="hover:text-amber-400 transition-colors duration-300">support@viento.com</p>
              <p className="hover:text-amber-400 transition-colors duration-300">+1 (555) 123-4567</p>
              <p className="hover:text-amber-400 transition-colors duration-300">123 Fashion Street<br />Style City, SC 12345</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-6 md:mb-0 text-lg">
            © 2024 VIENTO. All rights reserved.
          </p>
          <div className="flex space-x-8 text-gray-400">
            <Link to="/privacy" className="hover:text-amber-400 transition-colors duration-300 text-lg">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-amber-400 transition-colors duration-300 text-lg">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
