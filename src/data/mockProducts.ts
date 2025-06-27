
import { Product } from '../types/store';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Baseball Cap',
    description: 'A classic baseball cap perfect for everyday wear. Made with premium cotton and featuring an adjustable strap.',
    price: 29.99,
    categoryId: 'cat-1',
    brand: 'Nike',
    tags: ['classic', 'cotton', 'adjustable'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500'
    ],
    stock: 100,
    variants: [
      { color: 'Black', size: 'S', stock: 25 },
      { color: 'Black', size: 'M', stock: 25 },
      { color: 'Black', size: 'L', stock: 20 },
      { color: 'White', size: 'S', stock: 15 },
      { color: 'White', size: 'M', stock: 15 },
      { color: 'Navy', size: 'L', stock: 10 }
    ],
    isAvailable: true,
    discount: {
      percent: 25,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    analytics: {
      views: 245,
      purchases: 89,
      averageRating: 4.5,
      ratingsCount: 128
    },
    seo: {
      slug: 'classic-baseball-cap',
      metaTitle: 'Classic Baseball Cap - Nike',
      metaDescription: 'A classic baseball cap perfect for everyday wear'
    },
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Premium Snapback',
    description: 'Premium snapback with embroidered logo and flat brim. Perfect for street style and casual wear.',
    price: 45.99,
    categoryId: 'cat-2',
    brand: 'New Era',
    tags: ['premium', 'snapback', 'street'],
    images: [
      'https://images.unsplash.com/photo-1514327605112-b887c0e61c4a?w=500',
      'https://images.unsplash.com/photo-1575428652377-a2d80d209767?w=500'
    ],
    stock: 75,
    variants: [
      { color: 'Black', size: 'One Size', stock: 20 },
      { color: 'Gray', size: 'One Size', stock: 25 },
      { color: 'White', size: 'One Size', stock: 15 },
      { color: 'Blue', size: 'One Size', stock: 15 }
    ],
    isAvailable: true,
    analytics: {
      views: 189,
      purchases: 56,
      averageRating: 4.7,
      ratingsCount: 89
    },
    seo: {
      slug: 'premium-snapback',
      metaTitle: 'Premium Snapback - New Era',
      metaDescription: 'Premium snapback with embroidered logo and flat brim'
    },
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];
