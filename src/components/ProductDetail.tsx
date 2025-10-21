import { useState } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../lib/supabase';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (productId: string, size: string | null, color: string | null, quantity: number) => Promise<boolean>;
}

export function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors.length > 0 ? product.colors[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    const success = await onAddToCart(product.id, selectedSize, selectedColor, quantity);
    setAdding(false);

    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const getColorStyle = (color: string) => {
    const lowerColor = color.toLowerCase();
    if (lowerColor.includes('white')) return '#ffffff';
    if (lowerColor.includes('black')) return '#000000';
    if (lowerColor.includes('blue')) return '#3b82f6';
    if (lowerColor.includes('red')) return '#ef4444';
    if (lowerColor.includes('gray') || lowerColor.includes('grey')) return '#6b7280';
    if (lowerColor.includes('beige') || lowerColor.includes('tan')) return '#d2b48c';
    if (lowerColor.includes('pink')) return '#ec4899';
    if (lowerColor.includes('navy')) return '#1e3a8a';
    if (lowerColor.includes('silver')) return '#c0c0c0';
    if (lowerColor.includes('nude')) return '#e8beac';
    return '#94a3b8';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full rounded-xl object-cover"
              />
              {product.stock < 10 && product.stock > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  Only {product.stock} left
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-4xl font-bold text-gray-900 mb-4">
                &#8358;{Number(product.price).toFixed(2)}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Color: {selectedColor}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        title={color}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{ backgroundColor: getColorStyle(color) }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Size: {selectedSize}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border-2 rounded-lg font-semibold transition-all ${
                          selectedSize === size
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-auto space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || adding}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={24} />
                  <span>
                    {adding ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </span>
                </button>

                {showSuccess && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center font-semibold">
                    Added to cart successfully!
                  </div>
                )}

                <div className="text-sm text-gray-600 text-center">
                  {product.stock > 0 && (
                    <p>{product.stock} items in stock</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
