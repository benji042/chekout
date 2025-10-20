import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string;
  sizes: string[];
  colors: string[];
  stock: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string | null;
  product_id: string;
  quantity: number;
  size: string | null;
  color: string | null;
  created_at: string;
  products?: Product;
}
