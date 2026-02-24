'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift } from 'lucide-react';
import { useStore } from '@/store';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, user, getDiscount } = useStore();
  
  const subtotal = getCartTotal();
  const discount = user ? (subtotal * getDiscount()) / 100 : 0;
  const total = subtotal - discount;
  const totalPoints = cart.reduce((sum, item) => sum + item.product.loyaltyPoints * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-gray-400" size={40} />
          </div>
          <h1 className="text-2xl font-bold text-[#1a1a2e] mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven&apos;t added any items yet.</p>
          <Link href="/products" className="btn-luxury inline-flex items-center gap-2">
            Start Shopping
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#1a1a2e] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Shopping Cart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 mt-2"
          >
            {cart.length} item{cart.length > 1 ? 's' : ''} in your cart
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-4 flex gap-4"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#d4af37] font-semibold uppercase">
                    {item.product.brand}
                  </p>
                  <h3 className="font-bold text-[#1a1a2e] truncate">{item.product.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Gift size={14} />
                    +{item.product.loyaltyPoints * item.quantity} points
                  </p>
                  
                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-[#1a1a2e]">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-28"
            >
              <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {user && discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Member Discount ({getDiscount()}%)</span>
                    <span>-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#d4af37]">
                  <span className="flex items-center gap-1">
                    <Gift size={16} />
                    Points to Earn
                  </span>
                  <span>+{totalPoints}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {!user && (
                <div className="bg-[#d4af37]/10 border border-[#d4af37] rounded-lg p-4 mb-6">
                  <p className="text-sm text-[#1a1a2e]">
                    <Link href="/loyalty" className="font-semibold text-[#d4af37] hover:underline">
                      Join our loyalty program
                    </Link>{' '}
                    to earn {totalPoints} points on this order!
                  </p>
                </div>
              )}

              <WhatsAppButton
                variant="full"
                productName={`Order: ${cart.map(i => i.product.name).join(', ')}`}
                className="w-full justify-center mb-4"
              />

              <p className="text-xs text-gray-500 text-center">
                Click to place your order via WhatsApp. Our team will assist you with payment and delivery.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
