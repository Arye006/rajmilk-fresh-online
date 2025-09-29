// Temporary database types until Supabase types are updated
export interface Profile {
  id?: string;
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  delivery_address?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id?: string;
  user_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  delivery_notes?: string;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id?: string;
  order_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at?: string;
}