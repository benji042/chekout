import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem, Product } from '../lib/supabase';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGateway: () => void;
  cartItems: (CartItem & { products: Product })[];
  cartTotal: number;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export function ShoppingCart({
  isOpen,
  onClose,
  onOpenGateway,
  cartItems,
  cartTotal,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: ShoppingCartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <ShoppingBag size={28} />
            <span>Shopping Cart</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={80} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Add some items to get started!
            </p>
            <button
              onClick={onClose}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={item.products?.image_url}
                      alt={item.products?.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">
                        {item.products?.name}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1 mb-2">
                        {item.color && <p>Color: {item.color}</p>}
                        {item.size && <p>Size: {item.size}</p>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 border border-gray-300 rounded hover:bg-white transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 border border-gray-300 rounded hover:bg-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-gray-900">
                            ${(Number(item.products?.price) * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold text-gray-900">Subtotal:</span>
                <span className="font-bold text-2xl text-gray-900">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <button 
                onClick={() => {
                  onClose();
                  onOpenGateway();
                }}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={onClearCart}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
