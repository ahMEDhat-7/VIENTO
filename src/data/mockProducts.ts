
import { Product } from '../types/store';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Baseball Cap',
    price: 29.99,
    originalPrice: 39.99,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500'
    ],
    category: 'Baseball',
    brand: 'Nike',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy', 'Red'],
    description: 'A classic baseball cap perfect for everyday wear. Made with premium cotton and featuring an adjustable strap.',
    isNew: true,
    isTrending: true,
    rating: 4.5,
    reviewCount: 128
  },
  {
    id: '2',
    name: 'Premium Snapback',
    price: 45.99,
    images: [
      'https://images.unsplash.com/photo-1514327605112-b887c0e61c4a?w=500',
      'https://images.unsplash.com/photo-1575428652377-a2d80d209767?w=500'
    ],
    category: 'Snapback',
    brand: 'New Era',
    sizes: ['One Size'],
    colors: ['Black', 'Gray', 'White', 'Blue'],
    description: 'Premium snapback with embroidered logo and flat brim. Perfect for street style and casual wear.',
    isTrending: true,
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: '3',
    name: 'Bucket Hat Summer',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1566479179817-c47b0bb3c21f?w=500',
      'https://images.unsplash.com/photo-1558618665-fcd25c85cd64?w=500'
    ],
    category: 'Bucket',
    brand: 'Patagonia',
    sizes: ['S/M', 'L/XL'],
    colors: ['Khaki', 'Black', 'Olive', 'Navy'],
    description: 'Lightweight bucket hat perfect for summer adventures. Features UV protection and moisture-wicking fabric.',
    isNew: true,
    rating: 4.3,
    reviewCount: 67
  },
  {
    id: '4',
    name: 'Wool Beanie',
    price: 19.99,
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500',
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500'
    ],
    category: 'Beanie',
    brand: 'Adidas',
    sizes: ['One Size'],
    colors: ['Black', 'Gray', 'Navy', 'Burgundy'],
    description: 'Warm wool beanie perfect for cold weather. Soft, comfortable, and stylish.',
    rating: 4.6,
    reviewCount: 95
  },
  {
    id: '5',
    name: 'Trucker Cap Mesh',
    price: 22.99,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1553981834-a23432ce2cd0?w=500'
    ],
    category: 'Trucker',
    brand: 'Mitchell & Ness',
    sizes: ['One Size'],
    colors: ['Black/White', 'Navy/Gray', 'Red/White'],
    description: 'Classic trucker cap with mesh back for breathability. Perfect for outdoor activities.',
    rating: 4.2,
    reviewCount: 74
  },
  {
    id: '6',
    name: 'Vintage Baseball Cap',
    price: 34.99,
    images: [
      'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=500',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500'
    ],
    category: 'Baseball',
    brand: 'Nike',
    sizes: ['S', 'M', 'L'],
    colors: ['Vintage Brown', 'Olive', 'Cream'],
    description: 'Vintage-style baseball cap with distressed finish. Adds character to any outfit.',
    isNew: true,
    rating: 4.4,
    reviewCount: 52
  }
];
