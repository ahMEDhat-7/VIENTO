import React from 'react';
import { Link } from 'react-router-dom';
import { Wind, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Wind className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                VIENTO
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Where style meets the wind. Premium headwear for every adventure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=baseball" className="text-muted-foreground hover:text-foreground">Baseball Caps</Link></li>
              <li><Link to="/products?category=snapback" className="text-muted-foreground hover:text-foreground">Snapbacks</Link></li>
              <li><Link to="/products?category=bucket" className="text-muted-foreground hover:text-foreground">Bucket Hats</Link></li>
              <li><Link to="/products?category=beanie" className="text-muted-foreground hover:text-foreground">Beanies</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h4 className="font-semibold">Help & Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Size Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Care Instructions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Shipping Info</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Returns</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 VIENTO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;