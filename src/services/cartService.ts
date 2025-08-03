import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '../types/store';

export interface CartData {
  userId: string;
  items: CartItem[];
}

export const cartService = {
  async getCart(): Promise<CartItem[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products(*)
      `)
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    return cartItems?.map(item => ({
      productId: item.product_id,
      quantity: item.quantity,
      selectedSize: item.selected_size,
      selectedColor: item.selected_color,
      product: item.products ? {
        id: item.products.id,
        name: item.products.name,
        description: item.products.description || '',
        price: Number(item.products.price),
        brand: item.products.brand,
        categoryId: item.products.category_id,
        images: item.products.images || [],
        imageUrl: item.products.images?.[0],
        stock: item.products.stock,
        variants: [],
        isAvailable: item.products.is_available,
        tags: item.products.tags || [],
        analytics: { views: 0, purchases: 0, averageRating: 0, ratingsCount: 0 },
        createdAt: item.products.created_at,
        updatedAt: item.products.updated_at,
      } : undefined,
    })) || [];
  },

  async getUserCart(userId: string): Promise<CartItem[]> {
    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products(*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    return cartItems?.map(item => ({
      productId: item.product_id,
      quantity: item.quantity,
      selectedSize: item.selected_size,
      selectedColor: item.selected_color,
      product: item.products ? {
        id: item.products.id,
        name: item.products.name,
        description: item.products.description || '',
        price: Number(item.products.price),
        brand: item.products.brand,
        categoryId: item.products.category_id,
        images: item.products.images || [],
        imageUrl: item.products.images?.[0],
        stock: item.products.stock,
        variants: [],
        isAvailable: item.products.is_available,
        tags: item.products.tags || [],
        analytics: { views: 0, purchases: 0, averageRating: 0, ratingsCount: 0 },
        createdAt: item.products.created_at,
        updatedAt: item.products.updated_at,
      } : undefined,
    })) || [];
  },

  async addToCart(productId: string, quantity: number, selectedSize?: string, selectedColor?: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: user.id,
        product_id: productId,
        quantity,
        selected_size: selectedSize,
        selected_color: selectedColor,
      }, {
        onConflict: 'user_id,product_id,selected_size,selected_color'
      });
    
    if (error) throw error;
  },

  async removeFromCart(productId: string, selectedSize?: string, selectedColor?: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    let query = supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (selectedSize) query = query.eq('selected_size', selectedSize);
    if (selectedColor) query = query.eq('selected_color', selectedColor);

    const { error } = await query;
    if (error) throw error;
  },

  async updateCartItemQuantity(productId: string, quantity: number, selectedSize?: string, selectedColor?: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .eq('selected_size', selectedSize || '')
      .eq('selected_color', selectedColor || '');
    
    if (error) throw error;
  },

  async clearCart(): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);
    
    if (error) throw error;
  },

  async syncCart(cartData: CartData): Promise<void> {
    // This method is for syncing local cart with server
    // Implementation depends on your specific sync strategy
    console.log('Syncing cart:', cartData);
  }
};
