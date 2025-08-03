import { supabase } from '@/integrations/supabase/client';
import { Order, CartItem } from '../types/store';

export interface CreateOrderData {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
}

export const orderService = {
  async createOrder(orderData: CreateOrderData): Promise<{ id: string }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total: orderData.total,
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        payment_method: orderData.paymentMethod,
        customer_name: orderData.customerInfo.name,
        customer_email: orderData.customerInfo.email,
        customer_phone: orderData.customerInfo.phone,
        customer_address: orderData.customerInfo.address,
      })
      .select()
      .single();
    
    if (error) throw error;

    // Insert order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      name: item.product?.name || 'Unknown Product',
      price: item.product?.price || 0,
      quantity: item.quantity,
      selected_size: item.selectedSize,
      selected_color: item.selectedColor,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) throw itemsError;

    return { id: order.id };
  },

  async getOrders(): Promise<Order[]> {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return orders?.map(order => ({
      id: order.id,
      userId: order.user_id,
      items: order.order_items?.map((item: any) => ({
        productId: item.product_id,
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
        selectedSize: item.selected_size,
        selectedColor: item.selected_color,
      })) || [],
      total: Number(order.total),
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      paymentMethod: order.payment_method,
      paymentStatus: order.payment_status as 'unpaid' | 'paid' | 'refunded',
      status: order.status as 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled',
      customerInfo: {
        name: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone || '',
        address: order.customer_address,
      },
      shippingAddress: {
        id: 'addr-1',
        street: order.customer_address,
        city: 'City',
        country: 'Country',
      },
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    })) || [];
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return orders?.map(order => ({
      id: order.id,
      userId: order.user_id,
      items: order.order_items?.map((item: any) => ({
        productId: item.product_id,
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
        selectedSize: item.selected_size,
        selectedColor: item.selected_color,
      })) || [],
      total: Number(order.total),
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      paymentMethod: order.payment_method,
      paymentStatus: order.payment_status as 'unpaid' | 'paid' | 'refunded',
      status: order.status as 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled',
      customerInfo: {
        name: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone || '',
        address: order.customer_address,
      },
      shippingAddress: {
        id: 'addr-1',
        street: order.customer_address,
        city: 'City',
        country: 'Country',
      },
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    })) || [];
  },

  async getOrderById(id: string): Promise<Order> {
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: order.id,
      userId: order.user_id,
      items: order.order_items?.map((item: any) => ({
        productId: item.product_id,
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
        selectedSize: item.selected_size,
        selectedColor: item.selected_color,
      })) || [],
      total: Number(order.total),
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      paymentMethod: order.payment_method,
      paymentStatus: order.payment_status as 'unpaid' | 'paid' | 'refunded',
      status: order.status as 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled',
      customerInfo: {
        name: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone || '',
        address: order.customer_address,
      },
      shippingAddress: {
        id: 'addr-1',
        street: order.customer_address,
        city: 'City',
        country: 'Country',
      },
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    };
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
  },

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const { error } = await supabase
      .from('orders')
      .update({
        status: updates.status,
        payment_status: updates.paymentStatus,
        notes: updates.notes,
      })
      .eq('id', id);
    
    if (error) throw error;
    
    return this.getOrderById(id);
  },

  async deleteOrder(id: string): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getOrderStats(): Promise<OrderStats> {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('status, total');
    
    if (error) throw error;
    
    const totalOrders = orders?.length || 0;
    const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
    const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0;
    const completedOrders = orders?.filter(order => order.status === 'delivered').length || 0;
    
    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders,
    };
  }
};
