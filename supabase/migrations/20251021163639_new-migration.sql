/*
  # E-commerce Schema for Clothes and Shoes Store

  ## Overview
  Creates a complete database schema for an e-commerce application selling clothes and shoes.
  This migration sets up products, categories, and cart functionality with proper security.

  ## New Tables

  ### 1. categories
  Stores product categories (e.g., Men's Clothing, Women's Shoes, etc.)
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Category name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `created_at` (timestamptz) - Creation timestamp

  ### 2. products
  Stores all product information
  - `id` (uuid, primary key) - Unique identifier
  - `category_id` (uuid, foreign key) - Links to categories table
  - `name` (text) - Product name
  - `description` (text) - Product description
  - `price` (decimal) - Product price
  - `image_url` (text) - Product image URL
  - `sizes` (text array) - Available sizes (e.g., ['S', 'M', 'L'] or ['8', '9', '10'])
  - `colors` (text array) - Available colors
  - `stock` (integer) - Current stock quantity
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. cart_items
  Stores shopping cart items for users
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid) - User identifier (for future auth integration)
  - `product_id` (uuid, foreign key) - Links to products table
  - `quantity` (integer) - Number of items
  - `size` (text) - Selected size
  - `color` (text) - Selected color
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - Products and categories are publicly readable (no auth required)
  - Cart items are session-based (no auth required for this implementation)

  ## Initial Data
  - Populates categories with common clothing and shoe categories
  - Adds sample products for demonstration
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price decimal(10, 2) NOT NULL,
  image_url text NOT NULL,
  sizes text[] DEFAULT '{}',
  colors text[] DEFAULT '{}',
  stock integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1,
  size text,
  color text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  USING (true);

-- Products policies (public read)
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  USING (true);

-- Cart items policies (public access for demo)
CREATE POLICY "Cart items are publicly readable"
  ON cart_items FOR SELECT
  USING (true);

CREATE POLICY "Cart items can be inserted publicly"
  ON cart_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Cart items can be updated publicly"
  ON cart_items FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Cart items can be deleted publicly"
  ON cart_items FOR DELETE
  USING (true);

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
  ('Men''s Clothing', 'mens-clothing', 'Stylish and comfortable clothing for men'),
  ('Women''s Clothing', 'womens-clothing', 'Trendy and elegant clothing for women'),
  ('Men''s Shoes', 'mens-shoes', 'Quality footwear for every occasion'),
  ('Women''s Shoes', 'womens-shoes', 'Fashionable shoes for modern women'),
  ('Accessories', 'accessories', 'Complete your look with our accessories')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (category_id, name, description, price, image_url, sizes, colors, stock) 
SELECT 
  c.id,
  'Classic Cotton T-Shirt',
  'Premium quality cotton t-shirt, perfect for everyday wear. Soft, breathable, and durable.',
  9000.00,
  'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['White', 'Black', 'Navy', 'Gray'],
  150
FROM categories c WHERE c.slug = 'mens-clothing'
ON CONFLICT DO NOTHING;

INSERT INTO products (category_id, name, description, price, image_url, sizes, colors, stock) 
SELECT 
  c.id,
  'Slim Fit Denim Jeans',
  'Modern slim fit jeans with stretch comfort. Perfect fit for all-day wear.',
  7000.00,
  'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['28', '30', '32', '34', '36', '38'],
  ARRAY['Dark Blue', 'Light Blue', 'Black'],
  100
FROM categories c WHERE c.slug = 'mens-clothing'
ON CONFLICT DO NOTHING;

INSERT INTO products (category_id, name, description, price, image_url, sizes, colors, stock) 
SELECT 
  c.id,
  'Elegant Summer Dress',
  'Flowing summer dress with floral patterns. Light and comfortable for warm days.',
  8000.00,
  'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['XS', 'S', 'M', 'L', 'XL'],
  ARRAY['Floral Blue', 'Floral Pink', 'Floral White'],
  80
FROM categories c WHERE c.slug = 'womens-clothing'
ON CONFLICT DO NOTHING;

INSERT INTO products (category_id, name, description, price, image_url, sizes, colors, stock) 
SELECT 
  c.id,
  'Casual Blazer',
  'Versatile blazer perfect for office or casual outings. Tailored fit with modern styling.',
  12000.00,
  'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['XS', 'S', 'M', 'L', 'XL'],
  ARRAY['Black', 'Navy', 'Beige'],
  60
FROM categories c WHERE c.slug = 'womens-clothing'
ON CONFLICT DO NOTHING;

INSERT INTO products (category_id, name, description, price, image_url, sizes, colors, stock) 
SELECT 
  c.id,
  'Athletic Running Shoes',
  'High-performance running shoes with superior cushioning and support.',
  11000.00,
  'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['7', '8', '9', '10', '11', '12', '13'],
  ARRAY['Black/White', 'Blue/Gray', 'Red/Black'],
  120
FROM categories c WHERE c.slug = 'mens-shoes'
ON CONFLICT DO NOTHING;

INSERT INTO products (category_id, name, description, price, image_url, sizes, colors, stock) 
SELECT 
  c.id,
  'Leather Oxford Shoes',
  'Classic leather oxford shoes for formal occasions. Timeless style and comfort.',
  14000.00,
  'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['7', '8', '9', '10', '11', '12'],
  ARRAY['Black', 'Brown', 'Tan'],
  75
FROM categories c WHERE c.slug = 'mens-shoes'
ON CONFLICT DO NOTHING;

INSERT INTO products (category_id, name, description, price, image_url, sizes, colors, stock) 
SELECT 
  c.id,
  'Elegant High Heels',
  'Sophisticated high heels perfect for special occasions. Comfortable and stylish.',
  9000.00,
  'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['5', '6', '7', '8', '9', '10'],
  ARRAY['Black', 'Red', 'Nude', 'Silver'],
  90
FROM categories c WHERE c.slug = 'womens-shoes'
ON CONFLICT DO NOTHING;

INSERT INTO products (category_id, name, description, price, image_url, sizes, colors, stock) 
SELECT 
  c.id,
  'Comfortable Sneakers',
  'Versatile sneakers for daily wear. Lightweight and breathable design.',
  7000.00,
  'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['5', '6', '7', '8', '9', '10'],
  ARRAY['White', 'Pink', 'Black', 'Blue'],
  110
FROM categories c WHERE c.slug = 'womens-shoes'
ON CONFLICT DO NOTHING;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);