
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  categoryId: string;
  images: string[];
  imageUrl?: string; // Keep for backward compatibility
  stock: number;
  variants: ProductVariant[];
  isAvailable: boolean;
  tags: string[];
  discount?: {
    percent: number;
    validUntil?: string;
  };
  analytics: {
    views: number;
    purchases: number;
    averageRating: number;
    ratingsCount: number;
    lastViewedAt?: string;
    lastPurchasedAt?: string;
  };
  seo?: {
    slug: string;
    metaTitle: string;
    metaDescription: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  color: string;
  size: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentCategoryId?: string;
  image: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  product?: Product; // For UI display purposes
}

export interface WishlistItem {
  product: Product;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  status?: 'active' | 'inactive';
  addresses?: Address[];
  wishlist?: string[];
  phone?: string;
  address?: string;
  token?: string;
  lastLogin?: string;
  loginCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  country: string;
  zip?: string;
  label?: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  tracking?: {
    courier: string;
    trackingNumber: string;
    shippedAt: string;
    estimatedDelivery: string;
  };
  shippingAddress: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  product?: Product;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  maxUses: number;
  usedBy: string[];
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order_update' | 'promo' | 'admin_message';
  message: string;
  read: boolean;
  createdAt: string;
}
