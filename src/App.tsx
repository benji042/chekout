import { useState } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { ShoppingCart } from './components/ShoppingCart';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { Product } from './lib/supabase';
import { PaymentGateway } from './components/PaymentGateway';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);

  const {
    products,
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useProducts();

  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedCategory
                  ? categories.find((c) => c.id === selectedCategory)?.name
                  : 'All Products'}
              </h2>
              <p className="text-gray-600 mt-1">
                {products.length} {products.length === 1 ? 'product' : 'products'} available
              </p>
            </div>

            <ProductGrid
              products={products}
              loading={loading}
              onProductClick={setSelectedProduct}
            />
          </div>
        </div>
      </main>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenGateway={() => setIsGatewayOpen(true)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      <PaymentGateway
        isOpen={isGatewayOpen}
        onClose={() => setIsGatewayOpen(false)}
        cartTotal={cartTotal}
      />
    </div>
  );
}

export default App;
