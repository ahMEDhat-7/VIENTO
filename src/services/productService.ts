import { supabase } from '@/integrations/supabase/client';
import { Product, ProductVariant } from '../types/store';

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  brand: string;
  categoryId: string;
  images: string[];
  imageUrl?: string;
  stock: number;
  variants: Array<{
    color: string;
    size: string;
    stock: number;
  }>;
  tags: string[];
  isAvailable: boolean;
  analytics: {
    views: number;
    purchases: number;
    averageRating: number;
    ratingsCount: number;
  };
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        product_variants(*),
        product_analytics(*),
        categories(name)
      `);
    
    if (error) throw error;
    
    return products?.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      brand: product.brand,
      categoryId: product.category_id,
      images: product.images || [],
      imageUrl: product.images?.[0],
      stock: product.stock,
      variants: product.product_variants || [],
      isAvailable: product.is_available,
      tags: product.tags || [],
      analytics: {
        views: product.product_analytics?.views || 0,
        purchases: product.product_analytics?.purchases || 0,
        averageRating: Number(product.product_analytics?.average_rating || 0),
        ratingsCount: product.product_analytics?.ratings_count || 0,
      },
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    })) || [];
  },

  async getProductById(id: string): Promise<Product> {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        product_variants(*),
        product_analytics(*),
        categories(name)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      brand: product.brand,
      categoryId: product.category_id,
      images: product.images || [],
      imageUrl: product.images?.[0],
      stock: product.stock,
      variants: product.product_variants || [],
      isAvailable: product.is_available,
      tags: product.tags || [],
      analytics: {
        views: product.product_analytics?.views || 0,
        purchases: product.product_analytics?.purchases || 0,
        averageRating: Number(product.product_analytics?.average_rating || 0),
        ratingsCount: product.product_analytics?.ratings_count || 0,
      },
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    };
  },

  async createProduct(productData: CreateProductData): Promise<Product> {
    const { data: product, error } = await supabase
      .from('products')
      .insert({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        brand: productData.brand,
        category_id: productData.categoryId,
        images: productData.images,
        stock: productData.stock,
        is_available: productData.isAvailable,
        tags: productData.tags,
      })
      .select()
      .single();
    
    if (error) throw error;

    // Insert variants
    if (productData.variants.length > 0) {
      const { error: variantsError } = await supabase
        .from('product_variants')
        .insert(
          productData.variants.map(variant => ({
            product_id: product.id,
            color: variant.color,
            size: variant.size,
            stock: variant.stock,
          }))
        );
      
      if (variantsError) throw variantsError;
    }

    // Insert analytics
    const { error: analyticsError } = await supabase
      .from('product_analytics')
      .insert({
        product_id: product.id,
        views: productData.analytics.views,
        purchases: productData.analytics.purchases,
        average_rating: productData.analytics.averageRating,
        ratings_count: productData.analytics.ratingsCount,
      });
    
    if (analyticsError) throw analyticsError;

    return this.getProductById(product.id);
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const { error } = await supabase
      .from('products')
      .update({
        name: updates.name,
        description: updates.description,
        price: updates.price,
        brand: updates.brand,
        category_id: updates.categoryId,
        images: updates.images,
        stock: updates.stock,
        is_available: updates.isAvailable,
        tags: updates.tags,
      })
      .eq('id', id);
    
    if (error) throw error;
    
    return this.getProductById(id);
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        product_variants(*),
        product_analytics(*),
        categories(name)
      `)
      .eq('category_id', categoryId);
    
    if (error) throw error;
    
    return products?.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      brand: product.brand,
      categoryId: product.category_id,
      images: product.images || [],
      imageUrl: product.images?.[0],
      stock: product.stock,
      variants: product.product_variants || [],
      isAvailable: product.is_available,
      tags: product.tags || [],
      analytics: {
        views: product.product_analytics?.views || 0,
        purchases: product.product_analytics?.purchases || 0,
        averageRating: Number(product.product_analytics?.average_rating || 0),
        ratingsCount: product.product_analytics?.ratings_count || 0,
      },
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    })) || [];
  },

  async searchProducts(query: string): Promise<Product[]> {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        product_variants(*),
        product_analytics(*),
        categories(name)
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`);
    
    if (error) throw error;
    
    return products?.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      brand: product.brand,
      categoryId: product.category_id,
      images: product.images || [],
      imageUrl: product.images?.[0],
      stock: product.stock,
      variants: product.product_variants || [],
      isAvailable: product.is_available,
      tags: product.tags || [],
      analytics: {
        views: product.product_analytics?.views || 0,
        purchases: product.product_analytics?.purchases || 0,
        averageRating: Number(product.product_analytics?.average_rating || 0),
        ratingsCount: product.product_analytics?.ratings_count || 0,
      },
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    })) || [];
  }
};
