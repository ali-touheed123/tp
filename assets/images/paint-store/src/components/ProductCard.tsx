'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Gift } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store';
import WhatsAppButton from './WhatsAppButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="card-luxury group relative">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discount}%
        </div>
      )}

      {/* Loyalty Points Badge */}
      <div className="absolute top-4 right-4 z-10 bg-[#d4af37] text-[#1a1a2e] text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
        <Gift size={12} />
        +{product.loyaltyPoints} pts
      </div>

      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block relative h-56 overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
      </Link>

      {/* Product Info */}
      <div className="p-5">
        <p className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-lg text-gray-800 mb-2 hover:text-[#d4af37] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-[#1a1a2e]">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Coverage & Finish */}
        {(product.coverage || product.finishType) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.coverage && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {product.coverage}
              </span>
            )}
            {product.finishType && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {product.finishType}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
              product.inStock
                ? 'bg-[#1a1a2e] text-white hover:bg-[#d4af37] hover:text-[#1a1a2e]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={18} />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <WhatsAppButton variant="product" productName={product.name} />
        </div>
      </div>
    </div>
  );
}
