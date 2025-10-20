import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  return (
    <div
      onClick={() => onProductClick(product)}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Only {product.stock} left
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-bold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${Number(product.price).toFixed(2)}
          </span>
          {product.colors.length > 0 && (
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border-2 border-gray-200"
                  style={{
                    backgroundColor: color.toLowerCase().includes('white') ? '#ffffff' :
                                   color.toLowerCase().includes('black') ? '#000000' :
                                   color.toLowerCase().includes('blue') ? '#3b82f6' :
                                   color.toLowerCase().includes('red') ? '#ef4444' :
                                   color.toLowerCase().includes('gray') || color.toLowerCase().includes('grey') ? '#6b7280' :
                                   color.toLowerCase().includes('beige') || color.toLowerCase().includes('tan') ? '#d2b48c' :
                                   color.toLowerCase().includes('pink') ? '#ec4899' :
                                   color.toLowerCase().includes('navy') ? '#1e3a8a' :
                                   '#94a3b8'
                  }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
